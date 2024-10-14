document.addEventListener('DOMContentLoaded',function(){const selectedContainer=document.getElementById('selected-container');const placeholder=document.getElementById('placeholder');const searchInput=document.getElementById('search-input');const dropdownMenu=document.getElementById('dropdown-menu');const selectedItems=new Set();const options=[{'value':1,'text':'RAFHAEL LOWIX HOMWAD','profile':'/media/profile_image/110092024212639.jpg'},{'value':47,'text':'LHORELAI COSO','profile':'/media/profile_image/None10092024021717.jpg'},{'value':48,'text':'TEST TEST','profile':'/media/profile_image/None10092024022130.jpg'}];function updateOptions(query=''){const filteredOptions=options.filter(option=>option.text.toLowerCase().includes(query.toLowerCase()));dropdownMenu.innerHTML='';if(filteredOptions.length===0){const noResultsMessage=document.createElement('div');noResultsMessage.classList.add('py-2','px-4','w-full','text-sm','text-gray-600','text-center','no-results');noResultsMessage.textContent='No results found';dropdownMenu.appendChild(noResultsMessage);}else{filteredOptions.forEach(option=>createOptionElement(option));}
updateSelectedContainer();}
function createOptionElement(option){const valueStr=String(option.value);const isSelected=selectedItems.has(valueStr);const optionElement=document.createElement('div');optionElement.classList.add('option','py-2','px-4','w-full','text-sm','text-gray-800','cursor-pointer','hover:bg-gray-100','rounded-lg','flex','items-center','relative');optionElement.innerHTML=`
      <div class="flex items-center w-full">
        <div class="flex-shrink-0 me-2">
          <img class="shrink-0 size-5 rounded-full" src="${option.profile}" alt="${option.value}" />
        </div>
        <div class="flex-1 text-sm text-gray-800">
          ${option.text}
        </div>
        <div class="check-icon ${isSelected ? '' : 'hidden'}">
          <svg class="shrink-0 size-4 text-primary-600" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
          </svg>
        </div>
      </div>
    `;optionElement.addEventListener('click',(event)=>{event.stopPropagation();const selected=selectedItems.has(valueStr);if(selected){selectedItems.delete(valueStr);}else{selectedItems.add(valueStr);}
updateOptions(searchInput.value);updateSelectedContainer();});dropdownMenu.appendChild(optionElement);}
function updateSelectedContainer(){selectedContainer.innerHTML='';const selectedNames=[...selectedItems].map(value=>options.find(option=>String(option.value)===value));if(selectedNames.length>0){selectedNames.forEach(option=>{const selectedItem=document.createElement('div');selectedItem.classList.add('inline-flex','flex-nowrap','items-center','bg-white','border','border-gray-200','rounded-full','p-1.5','max-h-full','me-2','mb-2');selectedItem.innerHTML=`
          <img class="me-1.5 inline-block size-6 rounded-full" src="${option.profile}" alt="${option.text}" />
          <input type="hidden" name="instructor" value="${option.value}">
          <div class="px-2 whitespace-nowrap text-sm font-medium text-gray-800">
            ${option.text}
          </div>
          <div class="remove-item ms-2.5 inline-flex justify-center items-center size-5 rounded-full text-gray-800 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 cursor-pointer" data-value="${String(option.value)}">
            <svg class="shrink-0 size-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
          </div>
        `;selectedItem.querySelector('.remove-item').addEventListener('click',(event)=>{event.stopImmediatePropagation();const value=event.target.closest('.remove-item').getAttribute('data-value');removeSelectedItem(value);});selectedContainer.appendChild(selectedItem);});placeholder.classList.add('hidden');}else{placeholder.classList.remove('hidden');const noDataDiv=document.createElement('div');noDataDiv.classList.add('flex','flex-auto','flex-col','justify-center','items-center','p-4','md:p-5');noDataDiv.innerHTML=`
        <svg class="size-10 text-gray-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
          <line x1="22" x2="2" y1="12" y2="12"></line>
          <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>
          <line x1="6" x2="6.01" y1="16" y2="16"></line>
          <line x1="10" x2="10.01" y1="16" y2="16"></line>
        </svg>
        <p id="no-data-message" class="mt-2 text-sm text-gray-800">Select instructors below</p>
      `;placeholder.innerHTML='';placeholder.appendChild(noDataDiv);}}
function updateDropdownVisibility(){dropdownMenu.querySelectorAll('.option').forEach(optionElement=>{const valueStr=String(optionElement.querySelector('img').alt);const isSelected=selectedItems.has(valueStr);const checkIcon=optionElement.querySelector('.check-icon');if(checkIcon){checkIcon.classList.toggle('hidden',!isSelected);}});}
function removeSelectedItem(value){selectedItems.delete(value);updateSelectedContainer();setTimeout(()=>{updateDropdownVisibility();},100);}
function debounce(func,delay){let timeout;return function(...args){clearTimeout(timeout);timeout=setTimeout(()=>func.apply(this,args),delay);};}
const debouncedUpdateOptions=debounce(updateOptions,300);searchInput.addEventListener('input',()=>{debouncedUpdateOptions(searchInput.value);});updateOptions();const observer=new MutationObserver(()=>{if(selectedItems.size===0){placeholder.classList.remove('hidden');const noDataMessage=placeholder.querySelector('#no-data-message');if(noDataMessage){noDataMessage.textContent='No selected instructors, please select below';}}else{placeholder.classList.add('hidden');}});observer.observe(selectedContainer,{childList:true,subtree:true});});;