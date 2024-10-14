document.addEventListener('DOMContentLoaded',function(){function initializeSearch(searchInputId,tableBodyId,columnsToSearch,noResultsMessageId,noResultsRowId){const searchInput=document.getElementById(searchInputId);const tableBody=document.getElementById(tableBodyId);const noDataMessage=document.getElementById(noResultsMessageId);function filterTableBySearch(){const searchTerm=searchInput.value;const searchTermNoSpaces=searchTerm.replace(/\s+/g,'').toLowerCase();const rows=tableBody.querySelectorAll(`tr:not(#${noResultsRowId})`);let hasVisibleRows=false;let noResultsForSearch=true;rows.forEach(row=>{let matchesSearch=false;columnsToSearch.forEach(columnIndex=>{const cellText=row.cells[columnIndex].textContent;const cellTextNoSpaces=cellText.replace(/\s+/g,'').toLowerCase();if(cellTextNoSpaces.includes(searchTermNoSpaces)){matchesSearch=true;}});if(matchesSearch){row.style.display='';hasVisibleRows=true;noResultsForSearch=false;}else{row.style.display='none';}});if(noResultsForSearch){noDataMessage.innerHTML=`No results found for <strong>"${searchTerm}"</strong>`;}else{noDataMessage.textContent='';}
document.getElementById(noResultsRowId).style.display=hasVisibleRows?'none':'';}
searchInput.addEventListener('input',filterTableBySearch);}
window.initializeSearch=initializeSearch;});;document.addEventListener('DOMContentLoaded',function(){const searchInputId='search-data';const tableBodyId='table-body';const columnsToSearch=[2,3,4];const noResultsMessageId='no-data-message-1';const noResultsRowId='no-results-row';initializeSearch(searchInputId,tableBodyId,columnsToSearch,noResultsMessageId,noResultsRowId);});;document.addEventListener('DOMContentLoaded',function(){const filterButton=document.getElementById('hs-as-table-table-filter-dropdown');const selectedCountSpan=document.getElementById('selected-filter-count');const frequencyCheckbox=document.getElementById('hs-as-filters-dropdown-lecture');const createdCheckbox=document.getElementById('hs-as-filters-dropdown-lab');const tableBody=document.getElementById('table-body');const noDataMessage=document.getElementById('no-data-message-1');function updateLabel(){const count=(frequencyCheckbox.checked?1:0)+(createdCheckbox.checked?1:0);selectedCountSpan.textContent=count>0?count:'';selectedCountSpan.style.display=count>0?'inline-flex':'none';}
function filterTable(){const showLab=createdCheckbox.checked;const showLecture=frequencyCheckbox.checked;const rows=tableBody.querySelectorAll('tr:not(#no-results-row)');let hasVisibleRows=false;let noResultsForFilter=true;rows.forEach(row=>{const isLab=row.getAttribute('data-is-lab')==='true';const matchesFilter=(showLab&&isLab)||(showLecture&&!isLab)||(!showLab&&!showLecture);if(matchesFilter){row.style.display='';hasVisibleRows=true;noResultsForFilter=false;}else{row.style.display='none';}});if(noResultsForFilter){noDataMessage.textContent=`No results found`;}else{noDataMessage.textContent='';}
document.getElementById('no-results-row').style.display=hasVisibleRows?'none':'';}
function handleFilterChange(){updateLabel();filterTable();}
frequencyCheckbox.addEventListener('change',handleFilterChange);createdCheckbox.addEventListener('change',handleFilterChange);updateLabel();filterTable();});;document.addEventListener("DOMContentLoaded",function(){function initializeCheckboxLogic(config){const selectAllCheckbox=document.getElementById(config.selectAllId);const checkboxes=document.querySelectorAll(config.checkboxClass);const selectedCountSpan=document.getElementById(config.selectedCountId);const deleteButton=document.getElementById(config.deleteButtonId);function updateSelectAllCheckbox(){const checkedCheckboxes=document.querySelectorAll(`${config.checkboxClass}:checked`);const visibleCheckboxes=Array.from(checkboxes).filter(checkbox=>checkbox.closest('tr').style.display!=='none');selectAllCheckbox.checked=visibleCheckboxes.length===checkedCheckboxes.length;updateSelectedCount();}
function updateSelectedCount(){const checkedCheckboxes=document.querySelectorAll(`${config.checkboxClass}:checked`);const count=checkedCheckboxes.length;deleteButton.disabled=count===0;selectedCountSpan.textContent=count>0?`(${count})`:"";}
if(selectAllCheckbox){selectAllCheckbox.addEventListener("change",function(){const visibleCheckboxes=Array.from(checkboxes).filter(checkbox=>checkbox.closest('tr').style.display!=='none');visibleCheckboxes.forEach((checkbox)=>{checkbox.checked=this.checked;});updateSelectedCount();});}
checkboxes.forEach((checkbox)=>{checkbox.addEventListener("change",updateSelectAllCheckbox);});function handleDeletion(){const selectedItems=Array.from(checkboxes).filter((checkbox)=>checkbox.checked).map((checkbox)=>checkbox.value);if(selectedItems.length>0){const classroomIdsInput=document.getElementById(config.classroomIdsInputId);classroomIdsInput.value=selectedItems.join(",");}}
deleteButton.addEventListener("click",handleDeletion);if(checkboxes.length===0){deleteButton.disabled=true;}
updateSelectAllCheckbox();}
window.initializeCheckboxLogic=initializeCheckboxLogic;});;document.addEventListener("DOMContentLoaded",function(){initializeCheckboxLogic({selectAllId:"select-all",checkboxClass:".classroom-checkbox",selectedCountId:"selected-count",deleteButtonId:"delete-button",classroomIdsInputId:"classroom_ids",});});;