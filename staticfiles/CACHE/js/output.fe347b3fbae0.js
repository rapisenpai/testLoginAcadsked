document.addEventListener('DOMContentLoaded',function(){function initializeSearch(searchInputId,tableBodyId,columnsToSearch,noResultsMessageId,noResultsRowId){const searchInput=document.getElementById(searchInputId);const tableBody=document.getElementById(tableBodyId);const noDataMessage=document.getElementById(noResultsMessageId);function filterTableBySearch(){const searchTerm=searchInput.value;const searchTermNoSpaces=searchTerm.replace(/\s+/g,'').toLowerCase();const rows=tableBody.querySelectorAll(`tr:not(#${noResultsRowId})`);let hasVisibleRows=false;let noResultsForSearch=true;rows.forEach(row=>{let matchesSearch=false;columnsToSearch.forEach(columnIndex=>{const cellText=row.cells[columnIndex].textContent;const cellTextNoSpaces=cellText.replace(/\s+/g,'').toLowerCase();if(cellTextNoSpaces.includes(searchTermNoSpaces)){matchesSearch=true;}});if(matchesSearch){row.style.display='';hasVisibleRows=true;noResultsForSearch=false;}else{row.style.display='none';}});if(noResultsForSearch){noDataMessage.innerHTML=`No results found for <strong>"${searchTerm}"</strong>`;}else{noDataMessage.textContent='';}
document.getElementById(noResultsRowId).style.display=hasVisibleRows?'none':'';}
searchInput.addEventListener('input',filterTableBySearch);}
window.initializeSearch=initializeSearch;});;document.addEventListener('DOMContentLoaded',function(){const searchInputId='search-data';const tableBodyId='table-body';const columnsToSearch=[2,3];const noResultsMessageId='no-data-message-2';const noResultsRowId='no-results-row';initializeSearch(searchInputId,tableBodyId,columnsToSearch,noResultsMessageId,noResultsRowId);});;function initializeCheckboxLogic(config){const selectAllCheckbox=document.getElementById(config.selectAllId);const checkboxes=document.querySelectorAll(config.checkboxClass);const selectedCountSpan1=document.getElementById(config.selectedCountId1);const selectedCountSpan2=document.getElementById(config.selectedCountId2);const deleteButton=document.getElementById(config.deleteButtonId);function updateSelectAllCheckbox(){const checkedCheckboxes=document.querySelectorAll(`${config.checkboxClass}:checked`);const visibleCheckboxes=Array.from(checkboxes).filter(checkbox=>checkbox.closest('tr').style.display!=='none');selectAllCheckbox.checked=visibleCheckboxes.length===checkedCheckboxes.length;updateSelectedCount();}
function updateSelectedCount(){const checkedCheckboxes=document.querySelectorAll(`${config.checkboxClass}:checked`);const count=checkedCheckboxes.length;deleteButton.disabled=count===0;const countText=count>0?`(${count})`:"";selectedCountSpan1.textContent=countText;selectedCountSpan2.textContent=countText;}
if(selectAllCheckbox){selectAllCheckbox.addEventListener("change",function(){const visibleCheckboxes=Array.from(checkboxes).filter(checkbox=>checkbox.closest('tr').style.display!=='none');visibleCheckboxes.forEach((checkbox)=>{checkbox.checked=this.checked;});updateSelectedCount();});}
checkboxes.forEach((checkbox)=>{checkbox.addEventListener("change",updateSelectAllCheckbox);});function handleDeletion(){const selectedItems=Array.from(checkboxes).filter((checkbox)=>checkbox.checked).map((checkbox)=>checkbox.value);if(selectedItems.length>0){const classroomIdsInput=document.getElementById(config.classroomIdsInputId);classroomIdsInput.value=selectedItems.join(",");}}
deleteButton.addEventListener("click",handleDeletion);if(checkboxes.length===0){deleteButton.disabled=true;}
updateSelectAllCheckbox();};document.addEventListener("DOMContentLoaded",function(){initializeCheckboxLogic({selectAllId:"select-all",checkboxClass:".instructor-checkbox",selectedCountId1:"selected-count-1",selectedCountId2:"selected-count-2",deleteButtonId:"remove-button",classroomIdsInputId:"instructor_ids",});});;document.addEventListener("DOMContentLoaded",function(){document.body.addEventListener("click",function(event){if(event.target.classList.contains("assignCourseButton")){const button=event.target;const programId=button.getAttribute("data-program");const instituteId=button.getAttribute("data-institute");const curriculumYear=button.getAttribute("data-curriculum");const semester=button.getAttribute("data-semester");console.log(programId,instituteId,curriculumYear,semester);const courseList=document.getElementById("course-list");courseList.innerHTML='';const noItemsMessage=document.getElementById("no-items-message");noItemsMessage.style.display='none';fetch(`/api/courses/?curriculum_id=${curriculumYear}&format=api&institute_id=${instituteId}&program_id=${programId}&semester=${semester}`).then(response=>response.json()).then(data=>{console.log(data);)}});});;