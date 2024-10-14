document.addEventListener('DOMContentLoaded',function(){function initializeSearch(searchInputId,tableBodyId,columnsToSearch,noResultsMessageId,noResultsRowId){const searchInput=document.getElementById(searchInputId);const tableBody=document.getElementById(tableBodyId);const noDataMessage=document.getElementById(noResultsMessageId);function filterTableBySearch(){const searchTerm=searchInput.value;const searchTermNoSpaces=searchTerm.replace(/\s+/g,'').toLowerCase();const rows=tableBody.querySelectorAll(`tr:not(#${noResultsRowId})`);let hasVisibleRows=false;let noResultsForSearch=true;rows.forEach(row=>{let matchesSearch=false;columnsToSearch.forEach(columnIndex=>{const cellText=row.cells[columnIndex].textContent;const cellTextNoSpaces=cellText.replace(/\s+/g,'').toLowerCase();if(cellTextNoSpaces.includes(searchTermNoSpaces)){matchesSearch=true;}});if(matchesSearch){row.style.display='';hasVisibleRows=true;noResultsForSearch=false;}else{row.style.display='none';}});if(noResultsForSearch){noDataMessage.innerHTML=`No results found for <strong>"${searchTerm}"</strong>`;}else{noDataMessage.textContent='';}
document.getElementById(noResultsRowId).style.display=hasVisibleRows?'none':'';}
searchInput.addEventListener('input',filterTableBySearch);}
window.initializeSearch=initializeSearch;});;document.addEventListener('DOMContentLoaded',function(){const searchInputId='search-data';const tableBodyId='table-body';const columnsToSearch=[2,3];const noResultsMessageId='no-data-message-2';const noResultsRowId='no-results-row';initializeSearch(searchInputId,tableBodyId,columnsToSearch,noResultsMessageId,noResultsRowId);});;function initializeCheckboxLogic(config){const selectAllCheckbox=document.getElementById(config.selectAllId);const checkboxes=document.querySelectorAll(config.checkboxClass);const selectedCountSpan1=document.getElementById(config.selectedCountId1);const selectedCountSpan2=document.getElementById(config.selectedCountId2);const deleteButton=document.getElementById(config.deleteButtonId);function updateSelectAllCheckbox(){const checkedCheckboxes=document.querySelectorAll(`${config.checkboxClass}:checked`);const visibleCheckboxes=Array.from(checkboxes).filter(checkbox=>checkbox.closest('tr').style.display!=='none');selectAllCheckbox.checked=visibleCheckboxes.length===checkedCheckboxes.length;updateSelectedCount();}
function updateSelectedCount(){const checkedCheckboxes=document.querySelectorAll(`${config.checkboxClass}:checked`);const count=checkedCheckboxes.length;deleteButton.disabled=count===0;const countText=count>0?`(${count})`:"";selectedCountSpan1.textContent=countText;selectedCountSpan2.textContent=countText;}
if(selectAllCheckbox){selectAllCheckbox.addEventListener("change",function(){const visibleCheckboxes=Array.from(checkboxes).filter(checkbox=>checkbox.closest('tr').style.display!=='none');visibleCheckboxes.forEach((checkbox)=>{checkbox.checked=this.checked;});updateSelectedCount();});}
checkboxes.forEach((checkbox)=>{checkbox.addEventListener("change",updateSelectAllCheckbox);});function handleDeletion(){const selectedItems=Array.from(checkboxes).filter((checkbox)=>checkbox.checked).map((checkbox)=>checkbox.value);if(selectedItems.length>0){const classroomIdsInput=document.getElementById(config.classroomIdsInputId);classroomIdsInput.value=selectedItems.join(",");}}
deleteButton.addEventListener("click",handleDeletion);if(checkboxes.length===0){deleteButton.disabled=true;}
updateSelectAllCheckbox();};function insertSelectedInstructorIds(form,checkboxClass){const checkboxes=document.querySelectorAll(checkboxClass);const selectedInstructorIds=Array.from(checkboxes).filter(checkbox=>checkbox.checked).map(checkbox=>checkbox.value);const existingInputs=form.querySelectorAll('input[name="selected_instructors[]"]');existingInputs.forEach(input=>input.remove());selectedInstructorIds.forEach(memberId=>{const input=document.createElement('input');input.type='hidden';input.name='selected_instructors[]';input.value=memberId;form.appendChild(input);});const copyInstructorButton=document.getElementById("copy-instructor-button");copyInstructorButton.disabled=selectedInstructorIds.length===0;}
document.getElementById('copy-instructor-form').addEventListener('submit',function(event){insertSelectedInstructorIds(this,'.instructor-checkbox');});;document.addEventListener("DOMContentLoaded",function(){initializeCheckboxLogic({selectAllId:"select-all",checkboxClass:".instructor-checkbox",selectedCountId1:"selected-count-1",selectedCountId2:"selected-count-2",deleteButtonId:"remove-button",classroomIdsInputId:"instructor_ids",formId:"copy-instructor-form",});});;