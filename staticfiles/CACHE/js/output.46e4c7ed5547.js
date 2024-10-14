document.addEventListener('DOMContentLoaded',function(){function initializeSearch(searchInputId,tableBodyId,columnsToSearch,noResultsMessageId,noResultsRowId){const searchInput=document.getElementById(searchInputId);const tableBody=document.getElementById(tableBodyId);const noDataMessage=document.getElementById(noResultsMessageId);function filterTableBySearch(){const searchTerm=searchInput.value;const searchTermNoSpaces=searchTerm.replace(/\s+/g,'').toLowerCase();const rows=tableBody.querySelectorAll(`tr:not(#${noResultsRowId})`);let hasVisibleRows=false;let noResultsForSearch=true;rows.forEach(row=>{let matchesSearch=false;columnsToSearch.forEach(columnIndex=>{const cellText=row.cells[columnIndex].textContent;const cellTextNoSpaces=cellText.replace(/\s+/g,'').toLowerCase();if(cellTextNoSpaces.includes(searchTermNoSpaces)){matchesSearch=true;}});if(matchesSearch){row.style.display='';hasVisibleRows=true;noResultsForSearch=false;}else{row.style.display='none';}});if(noResultsForSearch){noDataMessage.textContent=`No results found for ${searchTerm}`;}else{noDataMessage.textContent='';}
document.getElementById(noResultsRowId).style.display=hasVisibleRows?'none':'';}
searchInput.addEventListener('input',filterTableBySearch);}
window.initializeSearch=initializeSearch;});;document.addEventListener('DOMContentLoaded',function(){const searchInputId='search-data';const tableBodyId='table-body';const columnsToSearch=[2,3,4];const noResultsMessageId='no-data-message';const noResultsRowId='no-results-row';initializeSearch(searchInputId,tableBodyId,columnsToSearch,noResultsMessageId,noResultsRowId);});;document.addEventListener("DOMContentLoaded",function(){const selectAllCheckbox=document.getElementById("select-all");const checkboxes=document.querySelectorAll(".instructor-checkbox");const selectedCountSpan=document.getElementById("selected-count");const removeButton=document.getElementById("remove-button");removeButton.disabled=true;function updateSelectAllCheckbox(){const checkedCheckboxes=document.querySelectorAll(".instructor-checkbox:checked");selectAllCheckbox.checked=checkboxes.length===checkedCheckboxes.length;updateSelectedCount();}
function updateSelectedCount(){const checkedCheckboxes=document.querySelectorAll(".instructor-checkbox:checked");const count=checkedCheckboxes.length;removeButton.disabled=count===0;selectedCountSpan.textContent=count>0?`(${count})`:"";}
if(selectAllCheckbox){selectAllCheckbox.addEventListener("change",function(){checkboxes.forEach((checkbox)=>{checkbox.checked=this.checked;});updateSelectedCount();});}
checkboxes.forEach((checkbox)=>{checkbox.addEventListener("change",updateSelectAllCheckbox);});function handleDeletion(){const selectedItems=Array.from(checkboxes).filter((checkbox)=>checkbox.checked).map((checkbox)=>checkbox.value);if(selectedItems.length>0){const instructorIdsInput=document.getElementById("instructor_ids");instructorIdsInput.value=selectedItems.join(",");}}
removeButton.addEventListener("click",handleDeletion);updateSelectAllCheckbox();});;