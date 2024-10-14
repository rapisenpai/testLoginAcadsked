document.addEventListener('DOMContentLoaded', function () {
  const currentPasswordInput = document.getElementById('current-password');
  const newPasswordInput = document.getElementById('new-password');
  const confirmPasswordInput = document.getElementById('confirm-password');
  const passwordButton = document.getElementById('otp_button');
  const newPasswordHelper = document.getElementById('new-password-helper');
  const confirmPasswordHelper = document.getElementById('confirm-password-helper');
  const togglePasswordCheckbox = document.getElementById('toggle-password');

  function updatePasswordButtonState() {
    const currentPassword = currentPasswordInput.value.trim();
    const newPassword = newPasswordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();
    const passwordValid = validateNewPassword(currentPassword, newPassword);
    const passwordsMatch = validateConfirmPassword(newPassword, confirmPassword);
    passwordButton.disabled = !(currentPassword && newPassword && confirmPassword && passwordValid && passwordsMatch);
  }

  function validateNewPassword(currentPassword, newPassword) {
    const minLength = 6;
    const lowercasePattern = /[a-z]/;
    const uppercasePattern = /[A-Z]/;
    const numberPattern = /[0-9]/;
    const specialCharPattern = /[!@#$%^&*(),.?":{}|<>]/;

    let message = "Your password must contain:<br>";
    let valid = true;

    if (newPassword === currentPassword) {
      message += "- New password must be different from current password.<br>";
      valid = false;
    }
    if (newPassword.length < minLength) {
      message += `- Minimum number of characters is ${minLength}.<br>`;
      valid = false;
    }
    if (!lowercasePattern.test(newPassword)) {
      message += "- Should contain lowercase.<br>";
      valid = false;
    }
    if (!uppercasePattern.test(newPassword)) {
      message += "- Should contain uppercase.<br>";
      valid = false;
    }
    if (!numberPattern.test(newPassword)) {
      message += "- Should contain numbers.<br>";
      valid = false;
    }
    if (!specialCharPattern.test(newPassword)) {
      message += "- Should contain special characters.<br>";
      valid = false;
    }
    if (valid) {
      newPasswordHelper.style.display = 'none';
    } else {
      newPasswordHelper.style.display = 'block';
      newPasswordHelper.innerHTML = message;
    }
    return valid;
  }

  function validateConfirmPassword(newPassword, confirmPassword) {
    if (confirmPassword && newPassword !== confirmPassword) {
      confirmPasswordHelper.innerHTML = "Your password does not match";
      confirmPasswordHelper.style.display = 'block';
      return false;
    } else {
      confirmPasswordHelper.innerHTML = "";
      confirmPasswordHelper.style.display = 'none';
      return true;
    }
  }

  function togglePasswordVisibility() {
    const type = togglePasswordCheckbox.checked ? 'text' : 'password';
    currentPasswordInput.type = type;
    newPasswordInput.type = type;
    confirmPasswordInput.type = type;
  }

  currentPasswordInput.addEventListener('input', updatePasswordButtonState);
  newPasswordInput.addEventListener('input', updatePasswordButtonState);
  confirmPasswordInput.addEventListener('input', updatePasswordButtonState);
  togglePasswordCheckbox.addEventListener('change', togglePasswordVisibility);

  updatePasswordButtonState();
});


let countdownInterval;

function sendOtp() {
  var form = document.getElementById('managePassword');
  var formData = new FormData(form);
  formData.append('send_otp', 'true');

  var xhr = new XMLHttpRequest();
  xhr.open('POST', '', true);  // POST to the current URL
  xhr.setRequestHeader('X-CSRFToken', '{{ csrf_token }}');

  xhr.onload = function () {
    if (xhr.status === 200) {
      // Show the OTP modal
      document.getElementById('totp_modal').classList.remove('hidden');

      // Disable the OTP button to prevent resending
      document.getElementById('otp_button').disabled = true;

      // Start the countdown timer
      startCountdown();
    } else {
      // Display error message in the modal or handle it as needed
      document.getElementById('otp-password-helper').innerText = 'Failed to send OTP. Please try again.';
    }
  };

  xhr.send(formData);
}

function startCountdown() {
  var countdownElement = document.getElementById('otp-password-countdown');
  var minutes = 2;
  var seconds = 0;

  function updateCountdown() {
    if (seconds === 0) {
      if (minutes === 0) {
        clearInterval(countdownInterval);
        document.getElementById('otp_button').disabled = false;
        countdownElement.innerText = 'OTP expired';
        return;
      }
      minutes--;
      seconds = 59;
    } else {
      seconds--;
    }

    var minText = minutes < 10 ? '0' + minutes : minutes;
    var secText = seconds < 10 ? '0' + seconds : seconds;
    countdownElement.innerText = minText + ':' + secText;
  }

  updateCountdown();
  countdownInterval = setInterval(updateCountdown, 1000);
}
