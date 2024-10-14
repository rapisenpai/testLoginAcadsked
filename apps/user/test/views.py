from django.utils import timezone
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from apps.user.forms import RequestPasswordChangeForm
from apps.user.models import User
from django.contrib import messages
from django_otp.plugins.otp_email.models import EmailDevice
from django.utils.crypto import get_random_string

@login_required
def request_password_change(request, user_id):
    user = get_object_or_404(User, id=user_id)
    if request.method == "POST":
        # Change Password
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
                        return redirect('user:request-password-change', user_id=user_id)
                    else:
                        print("Failed to generate OTP challenge.")
                        messages.error(request, 'Failed to send OTP. Please try again.')
                        
        elif 'changePasswordSubmit' in request.POST:
            # Handle password change
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
    else:
        password_form = RequestPasswordChangeForm(user=user)

    return render(request, 'test/request_password_change.html', {'password_form': password_form})