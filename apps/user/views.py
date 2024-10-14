from django.utils import timezone
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from apps.curriculum.models import Programs
from apps.institutes.models import Institutes
from apps.user.common.account_utils import update_personal_information
from apps.user.common.location_utils import get_location_from_ip
from apps.user.models import User
from .forms import CoverImageForm, RequestPasswordChangeForm, ProfileImageForm, UpdatePersonalInfoForm
from django.http import Http404
from django.contrib import messages
from django.core.paginator import Paginator
from qsessions.models import Session
from django_otp.plugins.otp_email.models import EmailDevice
from django.utils.crypto import get_random_string
from .forms import PersonalInformationForm, EmploymentInformationForm, SignupForm
from django.urls import reverse
from django.db import IntegrityError


# Format phone number
def format_phone_number(number):
    number = ''.join(filter(str.isdigit, number))
    if len(number) == 11:
        return f"{number[:4]}-{number[4:7]}-{number[7:]}"
    return number

@login_required
def profile(request, user_id):
    user = get_object_or_404(User, id=user_id)
    if request.user.id != user.id:
        user = request.user
        url = reverse('user:profile', args=[user.id])
        return redirect(url)
    
    # Initialize session details and forms
    session_details = []
    page_obj = None
    personal_info_form = UpdatePersonalInfoForm(instance=user)
    profile_form = ProfileImageForm(instance=user)
    cover_form = CoverImageForm(instance=user)
    password_form = RequestPasswordChangeForm(user=request.user)

    if request.method == 'POST':
        # Handle session deletion
        if 'deleteSessionSubmit' in request.POST:
          session_key = request.POST.get('session_key')
          if session_key and session_key != request.session.session_key:
              try:
                  session = Session.objects.get(session_key=session_key)
                  messages.success(request, "You have successfully logged out the session from another device.")
                  session.delete()
                  return redirect('user:profile', user_id=user.id)
              except Session.DoesNotExist:
                  messages.error(request, "The specified session could not be found.")

        # Update personal information
        if 'personalInfoSubmit' in request.POST:
          update_personal_information(request, user)
          return redirect('user:profile', user_id=user.id)

        # Handle OTP sending and password change
        if 'send_otp' in request.POST:
            password_form = RequestPasswordChangeForm(data=request.POST, user=user)
            if password_form.is_valid():
                send_otp = password_form.cleaned_data.get('send_otp')

                if send_otp:
                    # Generate a secure token for the password change request
                    token = get_random_string(32)
                    request.session['password_change_token'] = token

                    # Generate and send OTP
                    device, created = EmailDevice.objects.get_or_create(user=user, confirmed=True)
                    if created:
                        print(f"EmailDevice created for user: {user.email}")
                    if device.generate_challenge():
                        print("OTP challenge generated and sent.")
                        messages.success(request, 'OTP has been sent to your email.')
                        return redirect('user:profile', user_id=user_id)
                    else:
                        print("Failed to generate OTP challenge.")
                        messages.error(request, 'Failed to send OTP. Please try again.')
        
        elif 'changePasswordSubmit' in request.POST:
            password_form = RequestPasswordChangeForm(data=request.POST, user=user)
            if password_form.is_valid():
                otp_code = password_form.cleaned_data.get('otp')
                token = request.session.get('password_change_token')

                if otp_code and token:
                    device = EmailDevice.objects.filter(user=user).first()
                    if device and device.verify_token(otp_code):
                        if token == request.session.get('password_change_token'):
                            password_form.save()
                            del request.session['password_change_token']
                            messages.success(request, 'Your password has been changed successfully. You can now log in with your new credentials.')
                            return redirect('user:profile', user_id=user.id)
                        else:
                            messages.error(request, 'This code is expired. Resend for a new one.')
                    else:
                        messages.error(request, 'This code doesn’t work. Check it’s correct or try a new one.')
                else:
                    messages.error(request, 'OTP or token is missing.')

    # Handle GET request to fetch session details
    if request.method == 'GET' or 'session_key' not in request.POST:
        sessions = user.session_set.filter(expire_date__gt=timezone.now()).order_by('-created_at')
        paginator = Paginator(sessions, 10)
        page_number = request.GET.get('page')
        page_obj = paginator.get_page(page_number)
        session_details = []

        for session in page_obj:
            location = None
            if session.ip:
                location = get_location_from_ip(session.ip)
            session_details.append({
                'session_key': session.session_key,
                'created_at': session.created_at,
                'expire_date': session.expire_date,
                'ip': session.ip,
                'user_agent': session.user_agent,
                'device': str(session.device()),
                'location': location,
            })

    # Format
    gender_choices = list(personal_info_form.fields['gender'].choices)[1:]
    selected_gender = personal_info_form.instance.gender
    phone_number = user.phone_number
    formatted_phone_number = format_phone_number(phone_number) if phone_number else ''

    return render(request, 'account/profile.html', {
        'personal_info_form': personal_info_form,
        'profile_form': profile_form,
        'cover_form': cover_form,
        'gender_choices': gender_choices,
        'selected_gender': selected_gender,
        'user_type': request.user.user_type,
        'formatted_phone_number': formatted_phone_number,
        'password_form': password_form,
        'session_details': session_details,
        'page_obj': page_obj,
    })

def signup(request):      
    # Check if user is trying to access a step directly
    step = int(request.GET.get('step', 1))
    if step < 1 or step > 3:
        return redirect(f"{reverse('signup')}?step=1")
    if step == 2 and not request.session.get('personal_form_data'):
        return redirect(f"{reverse('signup')}?step=1")
    elif step == 3 and not request.session.get('employment_form_data'):
        return redirect(f"{reverse('signup')}?step=2")

    # Retrieve stored data from session
    personal_data = request.session.get('personal_form_data', {})
    employment_data = request.session.get('employment_form_data', {})

    if request.method == 'POST':
        action = request.POST.get('action')
        if action == 'prev':
            if step == 2:
                return redirect(f"{reverse('signup')}?step=1")
            elif step == 3:
                return redirect(f"{reverse('signup')}?step=2")
        elif action == 'next':
            if step == 1:
                personal_form = PersonalInformationForm(request.POST, prefix='personal')
                if personal_form.is_valid():
                    request.session['personal_form_data'] = personal_form.cleaned_data
                    return redirect(f"{reverse('signup')}?step=2")
            elif step == 2:
                employment_form = EmploymentInformationForm(request.POST, prefix='employment')
                if employment_form.is_valid():
                    employment_data = {
                        'employment_status': employment_form.cleaned_data['employment_status'],
                        'institute_id': employment_form.cleaned_data['institute'].institute_id if employment_form.cleaned_data.get('institute') else None,
                        'program_id': employment_form.cleaned_data['program'].program_id if employment_form.cleaned_data.get('program') else None,
                        'position': employment_form.cleaned_data['position'],
                    }
                    request.session['employment_form_data'] = employment_data
                    return redirect(f"{reverse('signup')}?step=3")
        elif action == 'submit':
            if step == 3:
                signup_form = SignupForm(request.POST, prefix='signup')
                if signup_form.is_valid():
                    email = signup_form.cleaned_data.get('email')
                    if User.objects.filter(email=email).exists():
                        signup_form.add_error('email', "The email address you're trying to use is already associated with an account.")
                        return render(request, 'account/signup.html', {
                            'step': step,
                            'personal_form': None,
                            'employment_form': None,
                            'signup_form': signup_form,
                            'form_prefix': 'signup',
                        })
                    try:
                        user = signup_form.save(request)
                        user.first_name = personal_data.get('first_name', '')
                        user.last_name = personal_data.get('last_name', '')
                        user.middle_name = personal_data.get('middle_name', '')
                        user.suffix = personal_data.get('suffix', '')
                        user.gender = personal_data.get('gender', '')
                        user.employment_status = employment_data.get('employment_status', None) 
                        institute = Institutes.objects.filter(institute_id=employment_data.get('institute_id')).first()
                        program = Programs.objects.filter(program_id=employment_data.get('program_id')).first()
                        user.institute = institute
                        user.program = program
                        user.position = employment_data.get('position', '')
                        user.save()
                        # Clear session data
                        request.session.pop('personal_form_data', None)
                        request.session.pop('employment_form_data', None)
                        return redirect('verify-account')
                    except IntegrityError:
                        signup_form.add_error('email', 'An error occurred while processing your request. Please try again.')
                        return render(request, 'account/signup.html', {
                            'step': step,
                            'personal_form': None,
                            'employment_form': None,
                            'signup_form': signup_form,
                            'form_prefix': 'signup',
                        })

    # Initialize forms with session data
    if step == 1:
        personal_form = PersonalInformationForm(initial=personal_data, prefix='personal')
        employment_form = None
        signup_form = None
        form_prefix = 'personal-'
    elif step == 2:
        personal_form = None
        employment_form = EmploymentInformationForm(
            initial={
                'employment_status': employment_data.get('employment_status', ''),
                'institute': Institutes.objects.filter(institute_id=employment_data.get('institute_id')).first(),
                'program': Programs.objects.filter(program_id=employment_data.get('program_id')).first(),
                'position': employment_data.get('position', ''),
            },
            prefix='employment'
        )
        signup_form = None
        form_prefix = 'employment-'
    elif step == 3:
        personal_form = None
        employment_form = None
        signup_form = SignupForm(prefix='signup')
        form_prefix = 'signup-'


    return render(request, 'account/signup.html', {
        'step': step,
        'personal_form': personal_form,
        'employment_form': employment_form,
        'signup_form': signup_form,
        'form_prefix': form_prefix,
    })

def verify_account(request):
    return render(request, 'account/verification_sent.html')

@login_required
def notification(request, username):
    user = get_object_or_404(User, username=username)
    if request.user.id != user.id:
        user = request.user
        url = reverse('user:notification', args=[user.id])
        return redirect(url)
    
    return render(request, 'account/notification.html', {
        'user_type': request.user.user_type,
    })
