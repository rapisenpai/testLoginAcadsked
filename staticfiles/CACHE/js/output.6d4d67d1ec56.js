document.addEventListener('DOMContentLoaded',function(){const firstNameInput=document.getElementById('first_name');const lastNameInput=document.getElementById('last_name');const emailInput=document.getElementById('email');const personalInfoButton=document.getElementById('personalInfoButton');const fullNameHelper=document.getElementById('full-name-helper');const firstNameValue=firstNameInput.value;const lastNameValue=lastNameInput.value;fullNameHelper.classList.remove('text-red-600','text-green-600');fullNameHelper.textContent='';if(firstNameValue&&lastNameValue==''){fullNameHelper.textContent='First and last name cannot be blank.';}
function updatePersonalInfoButtonState(){const firstName=firstNameInput.value.trim();const lastName=lastNameInput.value.trim();const email=emailInput.value.trim();const isValidEmail=email.endsWith('@dnsc.edu.ph');personalInfoButton.disabled=!(firstName&&lastName&&isValidEmail);}
firstNameInput.addEventListener('input',updatePersonalInfoButtonState);lastNameInput.addEventListener('input',updatePersonalInfoButtonState);emailInput.addEventListener('input',updatePersonalInfoButtonState);updatePersonalInfoButtonState();});;document.addEventListener('DOMContentLoaded',function(){const currentPasswordInput=document.getElementById('current-password');const newPasswordInput=document.getElementById('new-password');const confirmPasswordInput=document.getElementById('confirm-password');const passwordButton=document.getElementById('otp_button');const newPasswordHelper=document.getElementById('new-password-helper');const confirmPasswordHelper=document.getElementById('confirm-password-helper');const togglePasswordCheckbox=document.getElementById('toggle-password');function updatePasswordButtonState(){const currentPassword=currentPasswordInput.value.trim();const newPassword=newPasswordInput.value.trim();const confirmPassword=confirmPasswordInput.value.trim();const passwordValid=validateNewPassword(currentPassword,newPassword);const passwordsMatch=validateConfirmPassword(newPassword,confirmPassword);passwordButton.disabled=!(currentPassword&&newPassword&&confirmPassword&&passwordValid&&passwordsMatch);}
function validateNewPassword(currentPassword,newPassword){const minLength=6;const lowercasePattern=/[a-z]/;const uppercasePattern=/[A-Z]/;const numberPattern=/[0-9]/;const specialCharPattern=/[!@#$%^&*(),.?":{}|<>]/;let message="Your password must contain:<br>";let valid=true;if(newPassword===currentPassword){message+="- New password must be different from current password.<br>";valid=false;}
if(newPassword.length<minLength){message+=`- Minimum number of characters is ${minLength}.<br>`;valid=false;}
if(!lowercasePattern.test(newPassword)){message+="- Should contain lowercase.<br>";valid=false;}
if(!uppercasePattern.test(newPassword)){message+="- Should contain uppercase.<br>";valid=false;}
if(!numberPattern.test(newPassword)){message+="- Should contain numbers.<br>";valid=false;}
if(!specialCharPattern.test(newPassword)){message+="- Should contain special characters.<br>";valid=false;}
if(valid){newPasswordHelper.style.display='none';}else{newPasswordHelper.style.display='block';newPasswordHelper.innerHTML=message;}
return valid;}
function validateConfirmPassword(newPassword,confirmPassword){if(confirmPassword&&newPassword!==confirmPassword){confirmPasswordHelper.innerHTML="Your password does not match";confirmPasswordHelper.style.display='block';return false;}else{confirmPasswordHelper.innerHTML="";confirmPasswordHelper.style.display='none';return true;}}
function togglePasswordVisibility(){const type=togglePasswordCheckbox.checked?'text':'password';currentPasswordInput.type=type;newPasswordInput.type=type;confirmPasswordInput.type=type;}
currentPasswordInput.addEventListener('input',updatePasswordButtonState);newPasswordInput.addEventListener('input',updatePasswordButtonState);confirmPasswordInput.addEventListener('input',updatePasswordButtonState);togglePasswordCheckbox.addEventListener('change',togglePasswordVisibility);updatePasswordButtonState();});let countdownInterval;function sendOtp(){var form=document.getElementById('managePassword');var formData=new FormData(form);formData.append('send_otp','true');var xhr=new XMLHttpRequest();xhr.open('POST','',true);xhr.setRequestHeader('X-CSRFToken','{{ csrf_token }}');xhr.onload=function(){if(xhr.status===200){document.getElementById('totp_modal').classList.remove('hidden');document.getElementById('otp_button').disabled=true;startCountdown();}else{document.getElementById('otp-password-helper').innerText='Failed to send OTP. Please try again.';}};xhr.send(formData);}
function startCountdown(){var countdownElement=document.getElementById('otp-password-countdown');var minutes=2;var seconds=0;function updateCountdown(){if(seconds===0){if(minutes===0){clearInterval(countdownInterval);document.getElementById('otp_button').disabled=false;countdownElement.innerText='OTP expired';return;}
minutes--;seconds=59;}else{seconds--;}
var minText=minutes<10?'0'+minutes:minutes;var secText=seconds<10?'0'+seconds:seconds;countdownElement.innerText=minText+':'+secText;}
updateCountdown();countdownInterval=setInterval(updateCountdown,1000);};function validateEmail(showSuccessMessage=true){const emailInput=document.getElementById('email');const emailHelper=document.getElementById('email-helper');const emailValue=emailInput.value;const domain='@dnsc.edu.ph';emailInput.classList.remove('focus:border-red-500','focus:ring-red-500','focus:border-green-500','focus:ring-green-500');emailInput.classList.add('focus:border-gray-300','focus:ring-gray-500');emailHelper.classList.remove('text-red-600','text-green-600');emailHelper.textContent='';const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;if(emailValue===''){emailInput.classList.add('focus:border-red-500','focus:ring-red-500');emailHelper.textContent='Email cannot be blank';emailHelper.classList.add('text-red-600','mt-2');return false;}else if(!emailRegex.test(emailValue)||!emailValue.endsWith(domain)){emailInput.classList.add('focus:border-red-500','focus:ring-red-500');emailHelper.textContent=`Email must end with ${domain}`;emailHelper.classList.add('text-red-600','mt-2');return false;}else if(showSuccessMessage){emailInput.classList.add('focus:border-green-500','focus:ring-green-500');emailHelper.textContent='Looks good!';emailHelper.classList.add('text-green-600','mt-2');return true;}else{return true;}}
document.getElementById('email').addEventListener('input',function(){validateEmail();});document.getElementById('personalInformation').addEventListener('submit',function(event){if(!validateEmail(false)){event.preventDefault();}});;function formatPhoneNumber(input){let value=input.value.replace(/\D/g,'');if(value.length>7){value=value.slice(0,4)+'-'+value.slice(4,7)+'-'+value.slice(7);}else if(value.length>4){value=value.slice(0,4)+'-'+value.slice(4);}
input.value=value;validatePhoneNumber(input,false);}
function validatePhoneNumber(input,showSuccessMessage=true){const phoneHelper=document.getElementById('phone-helper');const phoneValue=input.value.replace(/-/g,'');const validLength=11;input.classList.remove('border-red-500','ring-red-500','border-green-500','ring-green-500');input.classList.add('border-gray-300','ring-blue-500');phoneHelper.classList.remove('text-red-600','text-green-600');phoneHelper.textContent='';if(phoneValue.length===0){return true;}else if(phoneValue.length!==validLength||!phoneValue.startsWith('09')){phoneHelper.textContent='Phone number must be valid and 11 digits long';phoneHelper.classList.add('text-red-600','mt-2');input.classList.add('border-red-500','ring-red-500');return false;}else if(showSuccessMessage){phoneHelper.textContent='Looks good!';phoneHelper.classList.add('text-green-600','mt-2');input.classList.add('border-green-500','ring-green-500');return true;}else{return true;}}
document.getElementById('phone_number').addEventListener('input',function(){formatPhoneNumber(this);validatePhoneNumber(this,false);});document.getElementById('personalInformation').addEventListener('submit',function(event){const phoneInput=document.getElementById('phone_number');const phoneValue=phoneInput.value.trim();phoneInput.value=phoneValue.replace(/-/g,'');if(phoneValue!==''&&!validatePhoneNumber(phoneInput,false)){event.preventDefault();}});;