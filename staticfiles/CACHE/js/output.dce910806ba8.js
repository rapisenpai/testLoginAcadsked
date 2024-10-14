document.addEventListener('DOMContentLoaded',function(){function initializeSearch(searchInputId,tableBodyId,columnsToSearch,noResultsMessageId,noResultsRowId){const searchInput=document.getElementById(searchInputId);const tableBody=document.getElementById(tableBodyId);const noDataMessage=document.getElementById(noResultsMessageId);function filterTableBySearch(){const searchTerm=searchInput.value;const searchTermNoSpaces=searchTerm.replace(/\s+/g,'').toLowerCase();const rows=tableBody.querySelectorAll(`tr:not(#${noResultsRowId})`);let hasVisibleRows=false;let noResultsForSearch=true;rows.forEach(row=>{let matchesSearch=false;columnsToSearch.forEach(columnIndex=>{const cellText=row.cells[columnIndex].textContent;const cellTextNoSpaces=cellText.replace(/\s+/g,'').toLowerCase();if(cellTextNoSpaces.includes(searchTermNoSpaces)){matchesSearch=true;}});if(matchesSearch){row.style.display='';hasVisibleRows=true;noResultsForSearch=false;}else{row.style.display='none';}});if(noResultsForSearch){noDataMessage.innerHTML=`No results found for <strong>"${searchTerm}"</strong>`;}else{noDataMessage.textContent='';}
document.getElementById(noResultsRowId).style.display=hasVisibleRows?'none':'';}
searchInput.addEventListener('input',filterTableBySearch);}
window.initializeSearch=initializeSearch;});;document.addEventListener('DOMContentLoaded',function(){const searchInputId='search-data';const tableBodyId='table-body';const columnsToSearch=[2,3];const noResultsMessageId='no-data-message-2';const noResultsRowId='no-results-row';initializeSearch(searchInputId,tableBodyId,columnsToSearch,noResultsMessageId,noResultsRowId);});;function initializeCheckboxLogic(config){const selectAllCheckbox=document.getElementById(config.selectAllId);const checkboxes=document.querySelectorAll(config.checkboxClass);const selectedCountSpan1=document.getElementById(config.selectedCountId1);const selectedCountSpan2=document.getElementById(config.selectedCountId2);const deleteButton=document.getElementById(config.deleteButtonId);function updateSelectAllCheckbox(){const checkedCheckboxes=document.querySelectorAll(`${config.checkboxClass}:checked`);const visibleCheckboxes=Array.from(checkboxes).filter(checkbox=>checkbox.closest('tr').style.display!=='none');selectAllCheckbox.checked=visibleCheckboxes.length===checkedCheckboxes.length;updateSelectedCount();}
function updateSelectedCount(){const checkedCheckboxes=document.querySelectorAll(`${config.checkboxClass}:checked`);const count=checkedCheckboxes.length;deleteButton.disabled=count===0;const countText=count>0?`(${count})`:"";selectedCountSpan1.textContent=countText;selectedCountSpan2.textContent=countText;}
if(selectAllCheckbox){selectAllCheckbox.addEventListener("change",function(){const visibleCheckboxes=Array.from(checkboxes).filter(checkbox=>checkbox.closest('tr').style.display!=='none');visibleCheckboxes.forEach((checkbox)=>{checkbox.checked=this.checked;});updateSelectedCount();});}
checkboxes.forEach((checkbox)=>{checkbox.addEventListener("change",updateSelectAllCheckbox);});function handleDeletion(){const selectedItems=Array.from(checkboxes).filter((checkbox)=>checkbox.checked).map((checkbox)=>checkbox.value);if(selectedItems.length>0){const classroomIdsInput=document.getElementById(config.classroomIdsInputId);classroomIdsInput.value=selectedItems.join(",");}}
deleteButton.addEventListener("click",handleDeletion);if(checkboxes.length===0){deleteButton.disabled=true;}
updateSelectAllCheckbox();};document.addEventListener("DOMContentLoaded",function(){initializeCheckboxLogic({selectAllId:"select-all",checkboxClass:".instructor-checkbox",selectedCountId1:"selected-count-1",selectedCountId2:"selected-count-2",deleteButtonId:"remove-button",classroomIdsInputId:"instructor_ids",});});;document.addEventListener('DOMContentLoaded',function(){const courseListContainer=document.getElementById('course-list-container');const noItemsMessage=document.getElementById('no-course-message');const searchInput=document.getElementById('search-courses');const removeAllButton=document.getElementById('remove-all-courses');const courseList=document.getElementById('course-list');let selectedCourses=new Set();function fetchCourses(){const url=`/api/courses/?curriculum_id=${curriculumYear}&format=api&institute_id=${instituteId}&program_id=${programId}&semester=${semester}&format=json`;fetch(url).then(response=>response.json()).then(data=>{renderCourses(data);}).catch(error=>console.error('Error fetching courses:',error));}
function renderCourses(courses){courseList.innerHTML='';if(courses.length>0){courses.forEach(course=>{const courseElement=createCourseElement(course);courseList.appendChild(courseElement);});}else{noItemsMessage.style.display='block';}}
function createCourseElement(course){const isSelected=selectedCourses.has(course.course_code);const courseElement=document.createElement('div');courseElement.classList.add('course-item','py-2','px-4','w-full','text-sm','text-gray-800','cursor-pointer','hover:bg-gray-100','rounded-lg','flex','items-center','relative');courseElement.innerHTML=`
      <div class="flex items-center w-full">
        <div class="flex-1 text-sm text-gray-800">
          <p><strong>${course.course_code}</strong><span class="text-gray-800">&nbsp(${course.course_description})</span></p>
        </div>
        <div class="check-icon ${isSelected ? '' : 'hidden'}">
          <svg class="shrink-0 size-4 text-primary-600" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
          </svg>
        </div>
      </div>
    `;courseElement.addEventListener('click',()=>{if(selectedCourses.has(course.course_code)){selectedCourses.delete(course.course_code);}else{selectedCourses.add(course.course_code);}
updateSelectedCourses();updateCourseElements();});return courseElement;}
function updateSelectedCourses(){courseListContainer.innerHTML='';if(selectedCourses.size>0){selectedCourses.forEach(courseCode=>{const course=Array.from(courseList.children).find(el=>el.textContent.includes(courseCode));const selectedItem=document.createElement('div');selectedItem.classList.add('inline-flex','items-center','bg-white','border','border-gray-200','rounded-full','p-1.5','max-h-full','me-2','mb-2');selectedItem.innerHTML=`
          <div class="px-2 whitespace-nowrap text-sm font-medium text-gray-800">
            ${courseCode}
          </div>
          <div class="remove-item ms-2.5 inline-flex justify-center items-center size-5 rounded-full text-gray-800 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 cursor-pointer" data-value="${courseCode}">
            <svg class="shrink-0 size-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
          </div>
        `;selectedItem.querySelector('.remove-item').addEventListener('click',(event)=>{event.stopImmediatePropagation();selectedCourses.delete(courseCode);updateSelectedCourses();updateCourseElements();});courseListContainer.appendChild(selectedItem);});noItemsMessage.style.display='none';courseListContainer.style.display='block';}else{noItemsMessage.style.display='block';courseListContainer.style.display='none';}
updateButtonStates();}
function updateCourseElements(){courseList.querySelectorAll('.course-item').forEach(courseElement=>{const courseCode=courseElement.querySelector('strong').textContent;const checkIcon=courseElement.querySelector('.check-icon');if(checkIcon){checkIcon.classList.toggle('hidden',!selectedCourses.has(courseCode));}});}
function updateButtonStates(){const selectedCount=selectedCourses.size;const removeAllDesign=`
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash" viewBox="0 0 16 16">
        <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
      </svg> Remove all (${selectedCount})
    `;if(selectedCount>0){removeAllButton.innerHTML=removeAllDesign;removeAllButton.disabled=false;}else{removeAllButton.innerHTML=removeAllDesign.replace(/(\(\d+\))/,'');removeAllButton.disabled=true;}}
searchInput.addEventListener('input',()=>{const query=searchInput.value.toLowerCase().replace(/\s+/g,'');courseList.querySelectorAll('.course-item').forEach(courseElement=>{const text=courseElement.textContent.toLowerCase().replace(/\s+/g,'');courseElement.style.display=text.includes(query)?'':'none';});noItemsMessage.style.display=courseList.children.length===0?'block':'none';});removeAllButton.addEventListener('click',()=>{selectedCourses.clear();updateSelectedCourses();updateCourseElements();});fetchCourses();});;