document.addEventListener('DOMContentLoaded',function(){function timeAgo(date){const seconds=Math.floor((new Date()-new Date(date))/1000);let interval=Math.floor(seconds/31536000);if(interval>1)return`${interval} years ago`;interval=Math.floor(seconds/2592000);if(interval>1)return`${interval} months ago`;interval=Math.floor(seconds/86400);if(interval>1)return`${interval} days ago`;interval=Math.floor(seconds/3600);if(interval>1)return`${interval} hours ago`;interval=Math.floor(seconds/60);if(interval>1)return`${interval} minutes ago`;return`${seconds} seconds ago`;}
function updateTimeAgo(){const timeElements=document.querySelectorAll('.time-ago');timeElements.forEach(el=>{const date=el.getAttribute('data-time');el.innerText=timeAgo(date);});}
updateTimeAgo();setInterval(updateTimeAgo,60000);fetch('/api/notifications/').then(response=>{if(!response.ok){throw new Error('Network response was not ok');}
return response.json();}).then(data=>{const notificationsContainer=document.getElementById('notificationsContainer');notificationsContainer.innerHTML='';data.forEach(notification=>{const notificationElement=document.createElement('a');notificationElement.className='p-3 flex gap-x-4 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 rounded-lg';notificationElement.href=notification.notification_url;const senderFirstName=notification.sender.first_name;const senderMiddleName=notification.sender.middle_name;const senderLastName=notification.sender.last_name;const profileImage=notification.sender.profile_image;notificationElement.innerHTML=`
          <div class="flex items-start gap-x-3">
        
            <img class="inline-block flex-shrink-0 size-[38px] rounded-full" src="${profileImage || 'default_profile_image.jpg'}" alt="${senderFirstName} ${senderMiddleName || ''} ${senderLastName}">
            <div class="grow">
           <span class="block text-xs text-gray-500">${timeAgo(notification.created_at)}</span>
              <span class="block text-sm font-semibold text-gray-800 uppercase">
                ${senderFirstName} ${senderMiddleName ? senderMiddleName + ' ' : ''}${senderLastName}
              </span>
              <span class="block text-sm text-gray-500">${notification.message || 'No message available'}</span>
            </div>
          </div>
        `;notificationsContainer.appendChild(notificationElement);});}).catch(error=>console.error('There was a problem with the fetch operation:',error));});;