const parent = document.getElementById('toast-container');
const tpl = document.getElementById('toast-template').content.firstElementChild;

function showToast(message, { delay = 5000, colorClass = '', iconClass = '' } = {}) {
  let toast = tpl.cloneNode(true);
  toast.querySelector('.toast-message').textContent = message;

  // Apply the color class dynamically
  if (colorClass) {
    toast.classList.add(colorClass);
  }

  // Apply the icon class dynamically
  if (iconClass) {
    toast.querySelector('.toast-icon-container').innerHTML = iconClass;
  }

  // Add to the container
  parent.appendChild(toast);

  // Trigger reflow to ensure transition happens
  requestAnimationFrame(() => {
    toast.classList.remove('opacity-0', 'translate-y-4');
    toast.classList.add('opacity-100', 'translate-y-0');
  });

  // Animate the toast exit after a delay
  setTimeout(() => {
    toast.classList.remove('opacity-100', 'translate-y-0');
    toast.classList.add('opacity-0', 'translate-y-4');
    toast.addEventListener('transitionend', () => {
      toast.remove();
    });
  }, delay);
}

function hideToast(button) {
  const toast = button.closest('.max-w-xs');
  if (toast) {
    toast.classList.remove('opacity-100', 'translate-y-0');
    toast.classList.add('opacity-0', 'translate-y-4');
    toast.addEventListener('transitionend', () => {
      toast.remove();
    });
  }
}
