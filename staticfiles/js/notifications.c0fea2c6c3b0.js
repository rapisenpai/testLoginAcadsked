document.addEventListener('DOMContentLoaded', function () {

  function timeAgo(date) {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    if (seconds === 0) seconds = 1;
    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) return `${interval} year${interval > 1 ? 's' : ''} ago`;
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) return `${interval} month${interval > 1 ? 's' : ''} ago`;
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) return `${interval} day${interval > 1 ? 's' : ''} ago`;
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) return `${interval} hour${interval > 1 ? 's' : ''} ago`;
    interval = Math.floor(seconds / 60);
    if (interval >= 1) return `${interval} minute${interval > 1 ? 's' : ''} ago`;

    return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
  }

  function updateTimeAgo() {
    const timeElements = document.querySelectorAll('.time-ago');
    timeElements.forEach(el => {
      const date = el.getAttribute('data-time');
      el.innerText = timeAgo(date);
    });
  }

  updateTimeAgo();
  setInterval(updateTimeAgo, 60000);

  fetch('/api/notifications/')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      const notificationsContainer = document.getElementById('notificationsContainer');
      notificationsContainer.innerHTML = '';

      if (data.length === 0) {
        // Display message if there are no notifications
        notificationsContainer.innerHTML = '<p class="block text-sm text-gray-500">You have no notifications.</p>';
      } else {
        data.forEach((notification, index) => {
          const notificationElement = document.createElement('a');
          notificationElement.className = 'p-3 flex gap-x-4 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 rounded-lg';
          notificationElement.href = notification.notification_url;

          const senderFirstName = notification.sender.first_name;
          const senderMiddleName = notification.sender.middle_name;
          const senderLastName = notification.sender.last_name;
          const profileImage = notification.sender.profile_image;

          const avatarUrl = profileImage || `https://ui-avatars.com/api/?name=${senderFirstName.replace(/\s+/g, '')}${senderMiddleName ? senderMiddleName.replace(/\s+/g, '') : ''}${senderLastName.replace(/\s+/g, '')}&background=random`;

          notificationElement.innerHTML = `
            <div class="flex items-start gap-x-3">
              <img class="inline-block flex-shrink-0 size-[38px] rounded-full" src="${avatarUrl}" 
               alt="${senderFirstName} ${senderMiddleName || ''} ${senderLastName}">
               <div class="grow">
                <span class="block text-xs text-gray-500 time-ago" data-time="${notification.created_at}">${timeAgo(notification.created_at)}</span>
                <span class="block text-sm font-semibold text-gray-800 uppercase">
                  ${senderFirstName} ${senderMiddleName ? senderMiddleName + ' ' : ''}${senderLastName}
                </span>
                <span class="block text-sm text-gray-500">${notification.message || 'No message available'}</span>
              </div>
            </div>
          `;

          notificationsContainer.appendChild(notificationElement);

          // Add line divider if there is more than one notification
          if (data.length > 1 && index < data.length - 1) {
            const divider = document.createElement('div');
            divider.className = 'my-2 border-t border-gray-100';
            notificationsContainer.appendChild(divider);
          }
        });
      }
    })
    .catch(error => console.error('There was a problem with the fetch operation:', error));
});