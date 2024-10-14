document.addEventListener('DOMContentLoaded',function(){fetch('/api/notifications/').then(response=>{if(!response.ok){throw new Error('Network response was not ok');}
return response.json();}).then(data=>{const notificationsContainer=document.getElementById('notificationsContainer');notificationsContainer.innerHTML='';data.forEach(notification=>{const notificationElement=document.createElement('a');notificationElement.className='p-3 flex gap-x-4 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 rounded-lg';notificationElement.href=notification.notification_url;const senderFirstName=notification.sender;const senderMiddleName=notification.sender;const senderLastName=notification.sender;const profileImage=notification.sender;notificationElement.innerHTML=`
          <div class="flex items-start gap-x-3">
            <img class="inline-block flex-shrink-0 size-[38px] rounded-full" src="${profileImage}" alt="${senderFirstName} ${senderMiddleName} ${senderLastName}">
            <div class="grow">
              <span class="block text-sm font-semibold text-gray-800 uppercase">
                ${senderFirstName} ${senderMiddleName ? senderMiddleName + ' ' : ''}${senderLastName}
              </span>
              <span class="block text-sm text-gray-500 lowercase">${notification.message || 'No message available'}</span>
            </div>
          </div>
        `;notificationsContainer.appendChild(notificationElement);});}).catch(error=>console.error('There was a problem with the fetch operation:',error));});;