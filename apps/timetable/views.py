
from datetime import time
from django.db import IntegrityError
from django.http import Http404, HttpResponseRedirect
from django.shortcuts import get_object_or_404, redirect, render
from django.utils.dateformat import format
import requests
from apps.timetable.common.item_per_page_utils import validate_items_per_page
from apps.timetable.forms import NumberOfSetsPerYearLevelForm
from apps.timetable.models import FinalSchedulerData, InitialSchedulerData, Periods, Weekday
from apps.curriculum.models import Courses, CurriculumYear, Rooms, Programs
from django.contrib.auth.decorators import login_required
from apps.timetable.common.users_list_utils import get_users_list
from apps.user.common.user_notification import create_notification
from apps.user.forms import UserGroupForm
from apps.user.models import GroupMember, Notification, User, UserGroup
from apps.user.utils import get_template_by_user_type
from django.core.paginator import Paginator
from apps.user.common.group_members_utils import get_faculty_and_staff_info
from django.contrib import messages
from django.db.models import Count
from django.db.models import Count, F, Q
import json
import os
import uuid
from django.conf import settings
from django.db import transaction
# ============================================= START FOR PROGRAM CHAIRPERSON VIEW =============================================

@login_required
def instructors(request):
    template = get_template_by_user_type(request.user, 'instructors')
    user_info = get_faculty_and_staff_info(request)
    users_list = get_users_list(request)
    items_per_page = request.GET.get('items_per_page', 25)
    page_number = request.GET.get('page', 1)
    group_id = request.GET.get('group', None)

    # Get all user groups that have members and all members have courses
    user_groups = UserGroup.objects.filter(
        program=request.user.program,
        institute=request.user.institute
    )

    validated_items_per_page = validate_items_per_page(items_per_page, request, page_number, group_id)
    if isinstance(validated_items_per_page, HttpResponseRedirect):
        return validated_items_per_page
    
    if request.method == 'POST':
        if 'CreateGroupSubmit' in request.POST:
            user_group_form = UserGroupForm(request.POST)
            if user_group_form.is_valid():
                current_user = request.user
                # Retrieve the current user's program and institute
                current_program = current_user.program
                current_institute = current_user.institute
                
                # Check if a group with the same name, program, and institute already exists
                group_name = user_group_form.cleaned_data['group_name']
                semester = user_group_form.cleaned_data['semester']
                curriculum = user_group_form.cleaned_data['curriculum']

                if UserGroup.objects.filter(
                    group_name=group_name,
                    program=current_program,
                    institute=current_institute,
                    semester=semester,
                    curriculum=curriculum,
                ).exists():
                    messages.error(request, f'{group_name.upper()} for the {dict(UserGroup.SEMESTER_CHOICES).get(semester).upper()} already exists')
                    return redirect(request.get_full_path())
                
                # Set the program and institute fields before saving
                user_group = user_group_form.save(commit=False)
                user_group.program = current_program
                user_group.institute = current_institute
                user_group.save()
                
                messages.success(request, f'{group_name.upper()} for the {dict(UserGroup.SEMESTER_CHOICES).get(semester).upper()} in {curriculum.curriculum_year.upper()} has been created successfully.')
                return redirect(f"{request.path}?group={user_group.group_id}&page={page_number}&items_per_page={items_per_page}")
            else:
                messages.error(request, "Error creating the group.")
        else:
            user_group_form = UserGroupForm()

        if 'RemoveInstructorSubmit' in request.POST:
            member_id = request.POST.get('member_id')
            group_member = get_object_or_404(GroupMember, member_id=member_id)
            group_member.delete()
            messages.success(request, f"{group_member.user.first_name.upper()} {group_member.user.last_name.upper()} has been removed from {group_member.group.group_name.upper()}.")
            return redirect(f"{request.path}?group={group_member.group.group_id}&page={page_number}&items_per_page={items_per_page}")

        if 'RemoveAllInstructorSubmit' in request.POST:
            member_ids = request.POST.get('instructor_ids', '')
            member_ids = [int(id) for id in member_ids.split(',') if id.isdigit()]
            if member_ids:
                members = GroupMember.objects.filter(member_id__in=member_ids)
                deleted_count = 0
                for member in members:
                    member.delete()
                    deleted_count += 1

                if deleted_count > 0:
                    messages.success(request, f"{deleted_count} instructors(s) have been deleted successfully.")

            return redirect(request.get_full_path())

        if 'AddInstructorSubmit' in request.POST:
            group_id = request.POST.get('group_id')
            instructors = request.POST.getlist('instructor')

            if not group_id or not instructors:
                messages.error(request, "Inavlid request")
                return redirect(f"{request.path}?group={group_id}&page={page_number}&items_per_page={items_per_page}")

            try:
                group = get_object_or_404(UserGroup, group_id=group_id)
                for instructor_id in instructors:
                    instructor = get_object_or_404(User, id=instructor_id)
                    default_program = instructor.program
                    default_institute = instructor.institute 
                    GroupMember.objects.create(
                        group=group,
                        user=instructor,
                        program=default_program,
                        institute=default_institute,
                    )
                messages.success(request, f"{len(instructors)} instructor(s) have been added to the group.")
            except Exception as e:
                messages.error(request, f"An error occurred: {str(e)}")

            return redirect(f"{request.path}?group={group_id}&page={page_number}&items_per_page={items_per_page}")
        
        if 'AssignCourseSubmit' in request.POST:
            group_id = request.POST.get('group_id')
            member_id = request.POST.get('instructor_id')
            curriculum_id = request.POST.get('curriculum_id')
            selected_course_ids = request.POST.getlist('selected_course_id')

            if not group_id or not member_id or not curriculum_id:
                messages.error(request, "Invalid request")
                return redirect(request.get_full_path())

            try:
                group = get_object_or_404(UserGroup, group_id=group_id)
                courses = Courses.objects.filter(course_id__in=selected_course_ids, curriculum_id=curriculum_id)
                group_member = get_object_or_404(GroupMember, member_id=member_id)
                existing_courses = group_member.courses.filter(curriculum_id=curriculum_id)

                courses_to_add = courses.exclude(course_id__in=existing_courses.values_list('course_id', flat=True))
                courses_to_remove = existing_courses.exclude(course_id__in=courses.values_list('course_id', flat=True))

                if courses_to_add:
                    group_member.courses.add(*courses_to_add)
                
                if courses_to_remove:
                    group_member.courses.remove(*courses_to_remove)
                messages.success(request, f"Successfully updated for {group_member.user.first_name.upper()} {group_member.user.last_name.upper()}.")
            except Exception as e:
                messages.error(request, f"An error occurred: {str(e)}")

            return redirect(request.get_full_path())
        
        if 'CopyInstructorSubmit' in request.POST:
            selected_instructors = request.POST.getlist('selected_instructors[]')
            target_group_id = request.POST.get('target_group_id')

            if selected_instructors and target_group_id:
                target_group = get_object_or_404(UserGroup, group_id=target_group_id)

                copied_count = 0
                existing_count = 0
                semester_mismatch_count = 0

                # Fetch existing instructor IDs in the target group
                existing_instructors = GroupMember.objects.filter(group=target_group).values_list('user__id', flat=True)

                with transaction.atomic():
                    for member_id in selected_instructors:
                        instructor = get_object_or_404(GroupMember, member_id=member_id)

                        # Fetch source group of the instructor
                        source_group = instructor.group

                        # Check if the instructor already exists in the target group
                        if instructor.user.id not in existing_instructors:
                            # Create a new GroupMember instance for the target group
                            new_member = GroupMember(
                                group=target_group,
                                user=instructor.user,
                                program=instructor.program,
                                institute=instructor.institute,
                                date_assigned=instructor.date_assigned,
                                date_added=instructor.date_added
                            )
                            new_member.save()
                            copied_count += 1  # Increment copied count for new member

                            # Only copy courses if the semesters match
                            if source_group.semester == target_group.semester:
                                new_member.courses.set(instructor.courses.all())
                            else:
                                semester_mismatch_count += 1  # Increment the mismatch counter
                        else:
                            existing_count += 1

                # Prepare messages based on counts
                if copied_count > 0:
                    messages.success(request, f"{copied_count} instructor(s) copied successfully!")

                if existing_count > 0:
                    messages.warning(request, f"{existing_count} instructor(s) already exist.")

                # Display a general message for semester mismatches if there are any
                if semester_mismatch_count > 0:
                    messages.warning(request, f"Courses not copied for {semester_mismatch_count} instructor(s) due to semester mismatch.")

                # If no instructors were copied, existing, or had mismatches, display an informative message
                if copied_count == 0 and existing_count == 0 and semester_mismatch_count == 0:
                    messages.info(request, "No instructors were copied. Please check your selections and try again.")

                return redirect(request.get_full_path())

            messages.error(request, "Invalid request")
            return redirect(request.get_full_path())


    current_user = request.user
    curriculum_choices = CurriculumYear.objects.filter(
      institute=current_user.institute,
      program=current_user.program
    ).annotate(course_count=Count('courses')).filter(course_count__gt=0)

    if template and request.user.user_type in [4]:
        return render(request, template, {
            **user_info,
            **users_list,
            'semester_choices': UserGroup.SEMESTER_CHOICES,
            'curriculum_choices': curriculum_choices,
            'user_groups': user_groups,
            })
    
    raise Http404

@login_required
def classrooms(request):
    template = get_template_by_user_type(request.user, 'classrooms')
    classrooms = Rooms.objects.all()
    
    items_per_page = request.GET.get('items_per_page', 25)
    page_number = request.GET.get('page', 1)
    
    validated_items_per_page = validate_items_per_page(items_per_page, request, page_number)
    if isinstance(validated_items_per_page, HttpResponseRedirect):
        return validated_items_per_page
    
    paginator = Paginator(classrooms.order_by('-room_id'), validated_items_per_page)
    paginated_classroom = paginator.get_page(page_number)
    
    total_classroom = classrooms.count()
    page_number = paginated_classroom.number
    start_index = (page_number - 1) * paginator.per_page + 1

    if request.method == 'POST':
        if 'DeleteClassroomSubmit' in request.POST:
            room_id = request.POST.get('room_id')
            room = get_object_or_404(Rooms, room_id=room_id)
            room_name = room.room_name
            room.delete()
            messages.success(request, f"{room_name.upper()} has been deleted successfully.")
            page_number = request.GET.get('page', 1)
            return redirect(f"{request.path}?page={page_number}&items_per_page={items_per_page}")
    
        if 'UpdateClassroomSubmit' in request.POST:
            room_id = request.POST.get('room_id')
            room = get_object_or_404(Rooms, room_id=room_id)
            
            room_name = request.POST.get('classroom_name')
            building = request.POST.get('building')
            is_lab = request.POST.get('is_lab') == 'on'
            
            room.room_name = room_name
            room.building = building
            room.is_lab = is_lab
            room.save()
            
            messages.success(request, f"{room.room_name.upper()} has been updated successfully.")
            return redirect(f"{request.path}?page={page_number}&items_per_page={items_per_page}")
        
        if 'AddClassroomSubmit' in request.POST:
          room_name = request.POST.get('classroom_name')
          building = request.POST.get('building')
          is_lab = request.POST.get('is_lab') == 'on'
          
          try:
              Rooms.objects.create(room_name=room_name, building=building, is_lab=is_lab)
              messages.success(request, f"{room_name.upper()} added successfully.")
          except IntegrityError:
              messages.error(request, f"Room {room_name.upper()} already exists.")
          
          return redirect(f"{request.path}?page={page_number}&items_per_page={items_per_page}")
        
        if 'DeleteAllClassroomSubmit' in request.POST:
            room_ids = request.POST.get('room_ids', '')
            room_ids = [int(id) for id in room_ids.split(',') if id.isdigit()]

            if room_ids:
                rooms = Rooms.objects.filter(room_id__in=room_ids)
                deleted_count = 0
                for room in rooms:
                    room_name = room.room_name
                    room.delete()
                    deleted_count += 1

                if deleted_count > 0:
                    messages.success(request, f"{deleted_count} classroom(s) have been deleted successfully.")

            return redirect(f"{request.path}?page={page_number}&items_per_page={items_per_page}")
            
    if template and request.user.user_type in [4]:
        return render(request, template, {
            'classrooms': paginated_classroom,
            'total_classroom': total_classroom,
            'start_index': start_index,
            'items_per_page': items_per_page,
            })
    
    raise Http404

# =====================================GENERATE SCHEDULE=====================================
class CustomJSONEncoder(json.JSONEncoder):
  def default(self, obj):
    if isinstance(obj, time):
      return obj.strftime('%H:%M')
    return super().default(obj)

@login_required
def scheduler(request):
    scheduler_data = InitialSchedulerData.objects.filter(program_id=request.user.program_id,institute_id=request.user.institute_id)
    user_groups = UserGroup.objects.filter(program=request.user.program,institute=request.user.institute).annotate(total_members=Count('groupmember'),members_with_courses=Count('groupmember', filter=Q(groupmember__courses__isnull=False))).filter(total_members__gt=0,total_members=F('members_with_courses'))
    is_limit_reached = InitialSchedulerData.objects.filter(program_id=request.user.program_id,institute_id=request.user.institute_id,status__in=[2, 3]).exists()

    items_per_page = request.GET.get('items_per_page', 25)
    page_number = request.GET.get('page', 1)

    # Validate pagination
    validated_items_per_page = validate_items_per_page(items_per_page, request, page_number)
    if isinstance(validated_items_per_page, HttpResponseRedirect):
        return validated_items_per_page

    paginator = Paginator(scheduler_data.order_by('-scheduler_id'), validated_items_per_page)
    paginated_scheduler_data = paginator.get_page(page_number)

    total_scheduler_data = scheduler_data.count()
    page_number = paginated_scheduler_data.number
    start_index = (page_number - 1) * paginator.per_page + 1

    if request.method == 'POST':
      if 'GenerateScheduleSubmit' in request.POST:
          schedule_form = NumberOfSetsPerYearLevelForm(request.POST)
          if schedule_form.is_valid():
              user_group_id = request.POST.get('instructor-group')
              user_group = get_object_or_404(UserGroup, group_id=user_group_id)
              semester = user_group.semester

              number_of_classes = {
                  'first_year': schedule_form.cleaned_data.get('first_year_sets', 0),
                  'second_year': schedule_form.cleaned_data.get('second_year_sets', 0),
                  'third_year': schedule_form.cleaned_data.get('third_year_sets', 0),
                  'fourth_year': schedule_form.cleaned_data.get('fourth_year_sets', 0),
              }

              api_url = f"{settings.API_BASE_URL}/api/prepare-ga-data/{user_group_id}/"
              session = requests.Session()
              session.cookies.update(request.COOKIES)
              headers = {'Content-Type': 'application/json'}
              response = session.get(api_url, headers=headers)

              if response.status_code == 200:
                  try:
                      combined_data = response.json()
                      for level in combined_data.get('institute', {}).get('programs', [{}])[0].get('course_levels', []):
                          year_level = level.get('year_level')
                          if year_level == 1:
                              level['number_of_classes'] = number_of_classes['first_year']
                          elif year_level == 2:
                              level['number_of_classes'] = number_of_classes['second_year']
                          elif year_level == 3:
                              level['number_of_classes'] = number_of_classes['third_year']
                          elif year_level == 4:
                              level['number_of_classes'] = number_of_classes['fourth_year']

                      unique_id = uuid.uuid4()
                      file_name = f"initial-data-{unique_id}.json"
                      folder_path = os.path.join(settings.MEDIA_ROOT, 'scheduler_data')
                      os.makedirs(folder_path, exist_ok=True)
                      file_path = os.path.join(folder_path, file_name)

                      with open(file_path, 'w') as initial_data_json_file:
                          json.dump(combined_data, initial_data_json_file, indent=4)
                     
                      # Fetch total and active program counts for the institute and semester
                      total_programs = Programs.objects.filter(institute=user_group.institute).count()
                      active_program_count = InitialSchedulerData.objects.filter(institute=user_group.institute,semester=semester,status=2).count()

                      # Check if all programs have created initial data
                      if active_program_count + 1 == total_programs:
                          
                          # Gather all active data for this semester
                          all_active_data = InitialSchedulerData.objects.filter(
                              institute=user_group.institute,
                              status__in=[2]
                          )

                          merged_data = {}

                          # Merge all active entries' data
                          for scheduler_entry in all_active_data:
                              try:
                                  with open(scheduler_entry.initial_data_json_file.path, 'r') as initial_data_json_file:
                                      program_data = json.load(initial_data_json_file)

                                      # Merge institute-level data
                                      if 'institute' in program_data:
                                          institute_data = program_data['institute']

                                          # If this is the first time, copy the institute data to merged_data
                                          if 'institute' not in merged_data:
                                              merged_data['institute'] = institute_data
                                          else:
                                              # Institute already exists, so merge the programs
                                              existing_programs = merged_data['institute'].get('programs', [])
                                              new_programs = institute_data.get('programs', [])

                                              # Merge program lists
                                              for new_program in new_programs:
                                                  existing_program = next((p for p in existing_programs if p['program_id'] == new_program['program_id']), None)
                                                  if existing_program:
                                                      existing_program.update(new_program)
                                                  else:
                                                      existing_programs.append(new_program)

                                              # Update the merged data's programs list
                                              merged_data['institute']['programs'] = existing_programs

                                          # Merge the instructors list
                                          existing_instructors = merged_data['institute'].get('instructors', [])
                                          new_instructors = institute_data.get('instructors', [])

                                          # Merge instructor lists
                                          for new_instructor in new_instructors:
                                              existing_instructor = next((i for i in existing_instructors if i['instructor_id'] == new_instructor['instructor_id']), None)
                                              if existing_instructor:
                                                  # Optionally, merge courses for the instructor
                                                  existing_courses = existing_instructor.get('courses', [])
                                                  new_courses = new_instructor.get('courses', [])
                                                  for new_course in new_courses:
                                                      if new_course not in existing_courses:
                                                          existing_courses.append(new_course)
                                                  existing_instructor['courses'] = existing_courses
                                              else:
                                                  # Append new instructor
                                                  existing_instructors.append(new_instructor)

                                          # Update the merged data's instructors list
                                          merged_data['institute']['instructors'] = existing_instructors

                              except (json.JSONDecodeError, FileNotFoundError) as e:
                                  messages.error(request, f"Error reading data for {scheduler_entry.program}: {e}")
                                  return redirect(request.get_full_path())

                          # Also include the new data from this program
                          if 'institute' in combined_data:
                              institute_data = combined_data['institute']
                              existing_programs = merged_data['institute'].get('programs', [])
                              new_programs = institute_data.get('programs', [])

                              # Merge the new program's data
                              for new_program in new_programs:
                                  existing_program = next((p for p in existing_programs if p['program_id'] == new_program['program_id']), None)
                                  if existing_program:
                                      existing_program.update(new_program)
                                  else:
                                      existing_programs.append(new_program)

                              merged_data['institute']['programs'] = existing_programs

                              # Merge the instructors data
                              existing_instructors = merged_data['institute'].get('instructors', [])
                              new_instructors = institute_data.get('instructors', [])

                              for new_instructor in new_instructors:
                                  existing_instructor = next((i for i in existing_instructors if i['instructor_id'] == new_instructor['instructor_id']), None)
                                  if existing_instructor:
                                      existing_courses = existing_instructor.get('courses', [])
                                      new_courses = new_instructor.get('courses', [])
                                      for new_course in new_courses:
                                          if new_course not in existing_courses:
                                              existing_courses.append(new_course)
                                      existing_instructor['courses'] = existing_courses
                                  else:
                                      existing_instructors.append(new_instructor)

                              merged_data['institute']['instructors'] = existing_instructors
                          
                          # Include the classrooms data
                          classrooms = Rooms.objects.all().values('room_id', 'room_name', 'is_lab')
                          merged_data['institute']['classrooms'] = list(classrooms)

                        #   # Include the weekdays data
                        #   weekdays = Weekday.objects.all().values('day_id', 'day_name')
                        #   merged_data['institute']['weekdays'] = list(weekdays)

                        #   # Include the periods data
                        #   periods = Periods.objects.all().values('period_id', 'start_time', 'end_time')
                        #   merged_data['institute']['periods'] = list(periods)

                          # Save the merged data into a new file
                          merged_unique_id = uuid.uuid4()
                          merged_file_name = f"final-data-{merged_unique_id}.json"
                          merged_file_path = os.path.join(folder_path, merged_file_name)

                          with open(merged_file_path, 'w') as merged_json_file:
                            json.dump(merged_data, merged_json_file, indent=4, cls=CustomJSONEncoder)

                          # Mark all old active scheduler data as inactive
                          all_active_data.update(status=3)

                          final_scheduler_data = FinalSchedulerData.objects.create(
                                final_data_json_file=f'scheduler_data/{merged_file_name}'
                          )

                         # Update only active InitialSchedulerData entries to link to the new final_scheduler_data
                          initial_scheduler_entries = InitialSchedulerData.objects.filter(
                              institute=request.user.institute,
                              semester=semester,
                              status=2,
                              final_data_json_file__isnull=True
                          )

                          # Update the final_data_json_file field for the existing active entries
                          for entry in initial_scheduler_entries:
                              entry.final_data_json_file = final_scheduler_data
                              entry.save() 

                          # Save the new merged InitialSchedulerData entry
                          InitialSchedulerData.objects.create(
                              created_by=request.user,
                              semester=semester,
                              program=request.user.program,
                              institute=request.user.institute,
                              initial_data_json_file=f'scheduler_data/{file_name}',
                              final_data_json_file=final_scheduler_data,
                              status=3
                          )

                          create_notification(
                            recipient=request.user,
                            message="You will be notified soon once the schedule is generated.",
                            status=1,
                            sender=request.user,
                            notification_url=f'/user/notification/{request.user.username}'
                          )

                          messages.info(request, "You will be notified soon once the schedule is generated.")
                          return redirect(request.get_full_path())

                      else:
                          InitialSchedulerData.objects.create(
                              created_by=request.user,
                              semester=semester,
                              program=request.user.program,
                              institute=request.user.institute,
                              initial_data_json_file=f'scheduler_data/{file_name}',
                              status=2
                          )

                          create_notification(
                            recipient=request.user,
                            message="The system is currently waiting for the other program chairpersons within your institute to finalize their data configurations. Once completed, schedule generation will begin automatically.",
                            status=1,
                            sender=request.user,
                            notification_url=f'/user/notification/{request.user.username}'
                          )

                          messages.info(request, "The system is currently waiting for the other program chairpersons within your institute to finalize their data configurations. Once completed, schedule generation will begin automatically.")
                          return redirect(request.get_full_path())
                      
                  except json.JSONDecodeError:
                      messages.error(request, "Failed to process the JSON data.")
                      return redirect(request.get_full_path())

              messages.error(request, "Failed to process the JSON data.")
              return redirect(request.get_full_path())
    else:
        schedule_form = NumberOfSetsPerYearLevelForm()

    template = get_template_by_user_type(request.user, 'scheduler')
    programs = Programs.objects.all()
    if template and request.user.user_type == 4:
        return render(request, template, {
            'schedule_form': schedule_form,
            'programs': programs,
            'user_groups': user_groups,
            'scheduler_data': paginated_scheduler_data,
            'total_scheduler_data': total_scheduler_data,
            'start_index': start_index,
            'items_per_page': items_per_page,
            'is_limit_reached': is_limit_reached,
        })

    raise Http404
# =====================================END FOR GENERATE SCHEDULE=====================================

def preprocess_periods(periods):
    for period in periods:
        period.start_time_formatted = format(period.start_time, 'h:i A')
        period.end_time_formatted = format(period.end_time, 'h:i A')

@login_required
def timetables(request):
    template = get_template_by_user_type(request.user, 'timetables')
    rooms = Rooms.objects.all()
    periods = Periods.objects.all()
    preprocess_periods(periods)
    if template and request.user.user_type == 4:
        return render(request, template, {'rooms': rooms, 'periods' : periods})
    raise Http404

@login_required
def periods(request):
    template = get_template_by_user_type(request.user, 'timetables')
    rooms = Rooms.objects.all()
    periods = Periods.objects.all()
    preprocess_periods(periods)
    if template and request.user.user_type == 4:
        return render(request, template, {'rooms': rooms, 'periods' : periods})
    raise Http404

@login_required
def my_schedule(request):
    template = get_template_by_user_type(request.user, 'my-schedule')
    if template and request.user.user_type == 5:
        return render(request, template)
    raise Http404








