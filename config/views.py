import mimetypes
import os
from django.conf import settings
from django.shortcuts import get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from django.http import Http404, HttpResponse
from django.http import JsonResponse
from django.views import View
from django.views.decorators.http import require_GET
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from apps.curriculum.models import Courses, Programs
from rest_framework.response import Response
from rest_framework.views import APIView
from apps.user.models import GroupMember, Notification, UserGroup
from config.serializers import CoursesSerializer, GroupMemberSerializer, NotificationSerializer
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.exceptions import PermissionDenied
from django.utils.decorators import method_decorator

@login_required
def home_redirect(request):
    user = request.user
    if user.user_type == 5:
        return redirect('/timetable/my-schedule/')
    elif user.user_type == 1:
        return redirect('/curriculum/curriculum-maintenance-and-management/')
    else:
        recent_group_with_members = UserGroup.objects.order_by('-date_created').filter(
        groupmember__isnull=False,
        program=user.program,
        institute=user.institute
      ).first()
        if recent_group_with_members:
            return redirect(f'/dashboard?group={recent_group_with_members.group_id}&page=1&items_per_page=25')
        else:
            return redirect('/dashboard')

def hello_world_view(request):
    return HttpResponse("Hello World")

@login_required
@require_GET
@csrf_exempt
def check_unique(request):
    field = request.GET.get('field')
    value = request.GET.get('value')
    if field not in ['program_code', 'program_name']:
        return JsonResponse({'error': 'Invalid field'}, status=400)
    exists = Programs.objects.filter(**{field: value}).exists()
    return JsonResponse({'exists': exists})

@method_decorator(login_required(login_url='/accounts/login/'),  name='dispatch')
class CourseListAPIView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    def get(self, request, *args, **kwargs):
        try:
            # Get filter parameters from the request
            program_id = request.query_params.get('program_id')
            institute_id = request.query_params.get('institute_id')
            curriculum_id = request.query_params.get('curriculum_id')
            semester = request.query_params.get('semester')

            # Filter courses based on the provided parameters
            courses = Courses.objects.filter(
                program__program_id=program_id,
                program__institute_id=institute_id,
                curriculum__curriculum_id=curriculum_id,
                semester=semester
            )

            # Serialize the filtered courses
            serializer = CoursesSerializer(courses, many=True)

            # Return the serialized data in JSON format
            return JsonResponse(serializer.data, safe=False)

        except Courses.DoesNotExist:
            return JsonResponse({'error': 'No courses found'}, status=404)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
        

class UserCoursesView(generics.RetrieveAPIView):
  serializer_class = GroupMemberSerializer
  authentication_classes = [SessionAuthentication, BasicAuthentication]
  permission_classes = [IsAuthenticated]

  def get_object(self):
    member_id = self.kwargs.get('member_id')
    try:
      return GroupMember.objects.get(pk=member_id)
    except GroupMember.DoesNotExist:
      raise Http404("GroupMember matching query does not exist.")

# ==================================== Prepare Scheduler Data ====================================
@method_decorator(login_required(login_url='/accounts/login/'), name='dispatch')
class SchedulerDataAPIView(APIView):
    permission_classes = [IsAuthenticated]  # Ensure that the user is authenticated

    def get(self, request, user_group_id):
        # Get UserGroup by ID
        user_group = get_object_or_404(UserGroup, group_id=user_group_id)

        # Check permissions
        if request.user.user_type != 4:
            raise PermissionDenied("Access denied")
        if request.user.program != user_group.program:
            raise PermissionDenied("Access denied")
        if request.user.institute != user_group.institute:
            raise PermissionDenied("Access denied")

        # Get instructors with courses assigned to them for the selected UserGroup
        instructors_with_courses = GroupMember.objects.filter(group=user_group).prefetch_related('courses')

        # Get courses from the curriculum using the curriculum_id FK in UserGroup and filter by semester
        courses = Courses.objects.filter(
            curriculum=user_group.curriculum,
            semester=user_group.semester
        )

        # Prepare the JSON structure based on the specific UserGroup
        response_data = {
            'institute': {
                'institute_id': user_group.institute.institute_id,
                'institute_name': user_group.institute.institute_name,
                'programs': [
                    {
                        'program_id': user_group.program.program_id,
                        'program_name': user_group.program.program_name,
                        'semester': int(user_group.semester),
                        'course_levels': [
                            {
                                'year_level': year_level,
                                'number_of_classes': 0, # Placeholder for the number of classes. This will be updated later.
                                'courses': [
                                    {
                                        'course_id': course.course_id,
                                        'course_code': course.course_code,
                                        'course_description': course.course_description,
                                        'lecture_hours': course.lecture,
                                        'laboratory_hours': course.laboratory,
                                        'credit_units': course.credit_units,
                                    } for course in courses if course.year_level == year_level
                                ]
                            }
                            for year_level in courses.values_list('year_level', flat=True).distinct()
                        ]
                    }
                ],
                'instructors': [
                    {
                        'instructor_id': instructor.user.id,
                        'instructor_name': instructor.user.get_full_name().title(),
                        'courses': [
                            {
                                'course_id': course.course_id,
                            } for course in instructor.courses.all()
                        ]
                    } for instructor in instructors_with_courses
                ]
            }
        }

        return Response(response_data)

# ==================================== Protected Media View ====================================
class ProtectedMediaView(View):
  def get(self, request, path):
    # Check if the path is a directory
    file_path = os.path.join(settings.MEDIA_ROOT, path)
    if os.path.isdir(file_path):
      raise Http404("Directory access is forbidden.")

    # Check if the file exists
    if os.path.exists(file_path):
      mime_type, _ = mimetypes.guess_type(file_path)
      mime_type = mime_type if mime_type else 'application/octet-stream'
      with open(file_path, 'rb') as f:
        response = HttpResponse(f.read(), content_type=mime_type)
        response['Content-Disposition'] = f'inline; filename={os.path.basename(file_path)}'
        return response

    raise Http404("File does not exist.")
  
# ==================================== End for Protected Media View ====================================

# ==================================== Notification List View ====================================
@method_decorator(login_required(login_url='/accounts/login/'), name='dispatch')
class NotificationListView(generics.ListAPIView):
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Notification.objects.filter(recipient=self.request.user).order_by('-created_at')[:10]
  
