document.addEventListener('DOMContentLoaded',function(){const selectedContainer=document.getElementById('selected-container');const placeholder=document.getElementById('placeholder');const searchInput=document.getElementById('search-input');const dropdownMenu=document.getElementById('dropdown-menu');const selectedItems=new Set();const label=document.querySelector('label[for="selected-container"]');const options=[{'value':1,'text':'RAFHAEL LOWIX HOMWAD','profile':'/media/profile_image/292062840_1373182976502933_6167783679009361537_n.jpg'}];function updateOptions(query=''){dropdownMenu.querySelectorAll('.option').forEach(el=>el.remove());const existingNoResultsMessage=dropdownMenu.querySelector('.no-results');if(existingNoResultsMessage){existingNoResultsMessage.remove();}
const filteredOptions=options.filter(option=>option.text.toLowerCase().includes(query.toLowerCase()));if(filteredOptions.length===0){const noResultsMessage=document.createElement('div');noResultsMessage.classList.add('py-2','px-4','w-full','text-sm','text-gray-600','text-center','no-results');noResultsMessage.textContent='No results found';dropdownMenu.appendChild(noResultsMessage);}else{filteredOptions.forEach(option=>{createOptionElement(option);});}}
function createOptionElement(option){const valueStr=String(option.value);const isSelected=selectedItems.has(valueStr);const optionElement=document.createElement('div');optionElement.classList.add('option','py-2','px-4','w-full','text-sm','text-gray-800','cursor-pointer','hover:bg-gray-100','rounded-lg','flex','items-center','relative');optionElement.innerHTML=`
      <div class="flex items-center w-full">
        <div class="flex-shrink-0 me-2">
          <img class="shrink-0 size-5 rounded-full" src="${option.profile}" alt="${option.text}" />
        </div>
        <div class="flex-1 text-sm text-gray-800">
          ${option.text}
        </div>
        <div class="${isSelected ? '' : 'hidden'}">
          <svg class="shrink-0 size-4 text-primary-600" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
          </svg>
        </div>
      </div>
    `;optionElement.addEventListener('click',(event)=>{event.stopPropagation();const selected=selectedItems.has(valueStr);if(selected){selectedItems.delete(valueStr);}else{selectedItems.add(valueStr);}
updateOptions(searchInput.value);updateSelectedContainer();});dropdownMenu.appendChild(optionElement);}
function updateSelectedContainer(){selectedContainer.innerHTML='';const selectedNames=[...selectedItems].map(value=>options.find(option=>String(option.value)===value));if(selectedNames.length>0){selectedNames.forEach(option=>{const selectedItem=document.createElement('div');selectedItem.classList.add('inline-flex','flex-nowrap','items-center','bg-white','border','border-gray-200','rounded-full','p-1.5','dark:bg-neutral-900','dark:border-neutral-700');selectedItem.innerHTML=`
          <img class="me-1.5 inline-block size-6 rounded-full" src="${option.profile}" alt="${option.text}" />
          <input type="hidden" name="instructor" value="${option.value}">
          <div class="px-2 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-white">
            ${option.text}
          </div>
          <div class="remove-item ms-2.5 inline-flex justify-center items-center size-5 rounded-full text-gray-800 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:bg-neutral-700/50 dark:hover:bg-neutral-700 dark:text-neutral-400 cursor-pointer" data-value="${String(option.value)}">
            <svg class="shrink-0 size-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
          </div>
        `;selectedItem.querySelector('.remove-item').addEventListener('click',(event)=>{event.stopImmediatePropagation();const value=event.target.closest('.remove-item').getAttribute('data-value');removeSelectedItem(value);});selectedContainer.appendChild(selectedItem);});placeholder.classList.add('hidden');selectedContainer.classList.remove('hidden');label.classList.remove('hidden');}else{placeholder.classList.remove('hidden');selectedContainer.classList.add('hidden');label.classList.add('hidden');}}
function removeSelectedItem(value){selectedItems.delete(value);updateSelectedContainer();updateOptions(searchInput.value);}
updateOptions();searchInput.addEventListener('input',()=>{updateOptions(searchInput.value);});});;