document.addEventListener('DOMContentLoaded',function(){fetch('/api/notifications/').then(response=>{if(!response.ok){throw new Error('Network response was not ok');}
return response.json();}).then(data=>{const notificationsContainer=document.getElementById('notificationsContainer');notificationsContainer.innerHTML='';data.forEach(notification=>{const notificationElement=document.createElement('a');notificationElement.className='p-3 flex gap-x-4 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 rounded-lg';notificationElement.href=notification.url;notificationElement.innerHTML=`
                      <div class="flex items-start gap-x-3">
                          <img class="inline-block flex-shrink-0 size-[38px] rounded-full" src="${notification.sender.profile_image}" alt="${notification.sender.first_name} ${notification.sender.last_name}">
                          <div class="grow">
                              <span class="block text-sm font-semibold text-gray-800 uppercase">
                                  ${notification.sender.first_name} ${notification.sender.middle_name || ''} ${notification.sender.last_name}
                              </span>
                              <span class="block text-sm text-gray-500 lowercase">${notification.message}</span>
                          </div>
                      </div>
                  `;notificationsContainer.appendChild(notificationElement);});}).catch(error=>console.error('There was a problem with the fetch operation:',error));});;