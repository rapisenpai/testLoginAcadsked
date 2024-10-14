document.addEventListener('DOMContentLoaded',function(){const password1=document.getElementById('signup-password1');const password2=document.getElementById('signup-password2');const togglePasswordCheckbox=document.getElementById('toggle-password');function togglePasswordVisibility(){const type=togglePasswordCheckbox.checked?'text':'password';password1.type=type;password2.type=type;}
togglePasswordCheckbox.addEventListener('change',togglePasswordVisibility);togglePasswordVisibility();});;document.addEventListener('DOMContentLoaded',function(){const password1Input=document.getElementById('signup-password1');const password2Input=document.getElementById('signup-password2');const password1Helper=document.getElementById('signup-password1-helper');const password2Helper=document.getElementById('signup-password2-helper');const emailInput=document.getElementById('signup-email');const emailHelper=document.getElementById('signup-email-helper');const createAccountButton=document.getElementById('createAccountSubmit');const form=document.getElementById('signup-form');function updateButtonState(){const password1=password1Input.value.trim();const password2=password2Input.value.trim();const email=emailInput.value.trim();const emailValid=validateEmail(email);const passwordValid=validateNewPassword(password1);const passwordsMatch=validatePassword(password1,password2);createAccountButton.disabled=!(email&&emailValid&&password1&&password2&&passwordValid&&passwordsMatch);}
function validateEmail(email){const emailPattern=/^[^\s@]+@dnsc\.edu\.ph$/;const valid=emailPattern.test(email);emailHelper.style.display=email===""?'none':(valid?'none':'block');emailHelper.innerHTML=valid?"":"Email must be @dnsc.edu.ph";return valid;}
function validateNewPassword(password){const minLength=6;const lowercasePattern=/[a-z]/;const uppercasePattern=/[A-Z]/;const numberPattern=/[0-9]/;const specialCharPattern=/[!@#$%^&*(),.?":{}|<>]/;let message='';let valid=true;if(password.length<minLength){message+=`Minimum number of characters is ${minLength}.<br>`;valid=false;}
if(!lowercasePattern.test(password)){message+="Should contain lowercase.<br>";valid=false;}
if(!uppercasePattern.test(password)){message+="Should contain uppercase.<br>";valid=false;}
if(!numberPattern.test(password)){message+="Should contain numbers.<br>";valid=false;}
if(!specialCharPattern.test(password)){message+="Should contain special characters.<br>";valid=false;}
password1Helper.style.display=password===""?'none':(valid?'none':'block');password1Helper.innerHTML=message;return valid;}
function validatePassword(password1,password2){if(password2&&password1!==password2){password2Helper.innerHTML="Your password does not match.";password2Helper.style.display='block';return false;}else if(password2===""){password2Helper.style.display='none';}else{password2Helper.innerHTML="";password2Helper.style.display='none';return true;}}
function handleFormSubmit(event){if(createAccountButton.disabled){event.preventDefault();showToast("Please complete the form correctly before submitting.");}}
password1Input.addEventListener('input',updateButtonState);password2Input.addEventListener('input',updateButtonState);emailInput.addEventListener('input',updateButtonState);form.addEventListener('submit',handleFormSubmit);});;