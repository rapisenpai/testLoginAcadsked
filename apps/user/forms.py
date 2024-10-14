from django import forms
from apps.curriculum.models import Programs
from apps.institutes.models import Institutes
from .models import User, UserGroup
from allauth.account.forms import ChangePasswordForm as AllauthChangePasswordForm
from allauth.account.forms import SignupForm
from allauth.account.utils import send_email_confirmation

#  Signup Form
class PersonalInformationForm(forms.Form):
    first_name = forms.CharField(max_length=250, required=True)
    last_name = forms.CharField(max_length=250, required=True)
    middle_name = forms.CharField(max_length=250, required=False)
    suffix = forms.CharField(max_length=250, required=False)
    gender = forms.ChoiceField(choices=User.GENDER_CHOICES, required=True)

class EmploymentInformationForm(forms.Form):
    employment_status = forms.ChoiceField(choices=User.EMPLOYMENT_STATUS_CHOICES, required=False)
    institute = forms.ModelChoiceField(queryset=Institutes.objects.all(), required=True)
    program = forms.ModelChoiceField(queryset=Programs.objects.all(), required=True)
    position = forms.ChoiceField(choices=User.POSITION_CHOICES, required=True)

class SignupForm(SignupForm):
    def save(self, request):
        user = super(SignupForm, self).save(request)
        send_email_confirmation(request, user, True)
        return user
    
    
#  Personal Information Forms
class ProfileImageForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ['profile_image']

class CoverImageForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ['cover_image']

class UpdatePersonalInfoForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ['first_name', 'last_name',  'middle_name', 'suffix', 'gender', 'email','phone_number',]

    def clean_phone_number(self):
        phone_number = self.cleaned_data.get('phone_number', '')
        if phone_number is None:
            return ''
        phone_number = phone_number.replace('-', '')
        return phone_number
    
# Change Password
class RequestPasswordChangeForm(AllauthChangePasswordForm):
  otp = forms.CharField(max_length=6, required=False, widget=forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Enter OTP'}))
  send_otp = forms.BooleanField(required=False, widget=forms.HiddenInput)

  def __init__(self, *args, **kwargs):
    super().__init__(*args, **kwargs)
    # Customize labels for inherited fields
    self.fields['oldpassword'].label = 'Old password'
    self.fields['password1'].label = 'New password'
    self.fields['password2'].label = 'Confirm new password'
    # Customizing field attributes if needed
    self.fields['oldpassword'].widget.attrs.update({'class': 'form-control', 'placeholder': 'Old password'})
    self.fields['password1'].widget.attrs.update({'class': 'form-control', 'placeholder': 'New password'})
    self.fields['password2'].widget.attrs.update({'class': 'form-control', 'placeholder': 'Confirm new password'})


class UserGroupForm(forms.ModelForm):
    class Meta:
        model = UserGroup
        fields = ['group_name', 'semester', 'curriculum']

    # def save(self, commit=True):
    #     instance = super().save(commit=False)
    #     original_name = instance.group_name.strip()
    #     counter = 1

    #     while UserGroup.objects.filter(group_name=instance.group_name).exists():
    #         instance.group_name = f"{original_name} ({counter})"
    #         counter += 1

    #     if commit:
    #         instance.save()
    #     return instance