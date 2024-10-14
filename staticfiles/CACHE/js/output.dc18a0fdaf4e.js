document.addEventListener('DOMContentLoaded',function(){function initializeSearch(searchInputId,tableBodyId,columnsToSearch,noResultsMessageId,noResultsRowId){const searchInput=document.getElementById(searchInputId);const tableBody=document.getElementById(tableBodyId);const noDataMessage=document.getElementById(noResultsMessageId);function filterTableBySearch(){const searchTerm=searchInput.value;const searchTermNoSpaces=searchTerm.replace(/\s+/g,'').toLowerCase();const rows=tableBody.querySelectorAll(`tr:not(#${noResultsRowId})`);let hasVisibleRows=false;let noResultsForSearch=true;rows.forEach(row=>{let matchesSearch=false;columnsToSearch.forEach(columnIndex=>{const cellText=row.cells[columnIndex].textContent;const cellTextNoSpaces=cellText.replace(/\s+/g,'').toLowerCase();if(cellTextNoSpaces.includes(searchTermNoSpaces)){matchesSearch=true;}});if(matchesSearch){row.style.display='';hasVisibleRows=true;noResultsForSearch=false;}else{row.style.display='none';}});if(noResultsForSearch){noDataMessage.textContent=`No results found for ${searchTerm}`;}else{noDataMessage.textContent='';}
document.getElementById(noResultsRowId).style.display=hasVisibleRows?'none':'';}
searchInput.addEventListener('input',filterTableBySearch);}
window.initializeSearch=initializeSearch;});;document.addEventListener('DOMContentLoaded',function(){const searchInputId='search-data';const tableBodyId='table-body';const columnsToSearch=[2,3];const noResultsMessageId='no-data-message';const noResultsRowId='no-results-row';initializeSearch(searchInputId,tableBodyId,columnsToSearch,noResultsMessageId,noResultsRowId);});;document.addEventListener("DOMContentLoaded",function(){function initializeCheckboxLogic(config){const selectAllCheckbox=document.getElementById(config.selectAllId);const checkboxes=document.querySelectorAll(config.checkboxClass);const selectedCountSpan=document.getElementById(config.selectedCountId);const deleteButton=document.getElementById(config.deleteButtonId);function updateSelectAllCheckbox(){const checkedCheckboxes=document.querySelectorAll(`${config.checkboxClass}:checked`);const visibleCheckboxes=Array.from(checkboxes).filter(checkbox=>checkbox.closest('tr').style.display!=='none');selectAllCheckbox.checked=visibleCheckboxes.length===checkedCheckboxes.length;updateSelectedCount();}
function updateSelectedCount(){const checkedCheckboxes=document.querySelectorAll(`${config.checkboxClass}:checked`);const count=checkedCheckboxes.length;deleteButton.disabled=count===0;selectedCountSpan.textContent=count>0?`(${count})`:"";}
if(selectAllCheckbox){selectAllCheckbox.addEventListener("change",function(){const visibleCheckboxes=Array.from(checkboxes).filter(checkbox=>checkbox.closest('tr').style.display!=='none');visibleCheckboxes.forEach((checkbox)=>{checkbox.checked=this.checked;});updateSelectedCount();});}
checkboxes.forEach((checkbox)=>{checkbox.addEventListener("change",updateSelectAllCheckbox);});function handleDeletion(){const selectedItems=Array.from(checkboxes).filter((checkbox)=>checkbox.checked).map((checkbox)=>checkbox.value);if(selectedItems.length>0){const classroomIdsInput=document.getElementById(config.classroomIdsInputId);classroomIdsInput.value=selectedItems.join(",");}}
deleteButton.addEventListener("click",handleDeletion);if(checkboxes.length===0){deleteButton.disabled=true;}
updateSelectAllCheckbox();}
window.initializeCheckboxLogic=initializeCheckboxLogic;});;document.addEventListener("DOMContentLoaded",function(){initializeCheckboxLogic({selectAllId:"select-all",checkboxClass:".instructor-checkbox",selectedCountId:"selected-count",deleteButtonId:"remove-button",classroomIdsInputId:"instructor_ids",});});;