document.addEventListener('DOMContentLoaded',function(){function initializeSearch(searchInputId,tableBodyId,columnsToSearch,noResultsMessageId,noResultsRowId){const searchInput=document.getElementById(searchInputId);const tableBody=document.getElementById(tableBodyId);const noDataMessage=document.getElementById(noResultsMessageId);function filterTableBySearch(){const searchTerm=searchInput.value;const searchTermNoSpaces=searchTerm.replace(/\s+/g,'').toLowerCase();const rows=tableBody.querySelectorAll(`tr:not(#${noResultsRowId})`);let hasVisibleRows=false;let noResultsForSearch=true;rows.forEach(row=>{let matchesSearch=false;columnsToSearch.forEach(columnIndex=>{const cellText=row.cells[columnIndex].textContent;const cellTextNoSpaces=cellText.replace(/\s+/g,'').toLowerCase();if(cellTextNoSpaces.includes(searchTermNoSpaces)){matchesSearch=true;}});if(matchesSearch){row.style.display='';hasVisibleRows=true;noResultsForSearch=false;}else{row.style.display='none';}});if(noResultsForSearch){noDataMessage.textContent=`No results found for ${searchTerm}`;}else{noDataMessage.textContent='';}
document.getElementById(noResultsRowId).style.display=hasVisibleRows?'none':'';}
searchInput.addEventListener('input',filterTableBySearch);}
window.initializeSearch=initializeSearch;});;document.addEventListener('DOMContentLoaded',function(){const searchInputId='search-data';const tableBodyId='table-body';const columnsToSearch=[2,3,4];const noResultsMessageId='no-data-message';const noResultsRowId='no-results-row';initializeSearch(searchInputId,tableBodyId,columnsToSearch,noResultsMessageId,noResultsRowId);});;document.addEventListener('DOMContentLoaded',function(){const filterButton=document.getElementById('hs-as-table-table-filter-dropdown');const selectedCountSpan=document.getElementById('selected-filter-count');const frequencyCheckbox=document.getElementById('hs-as-filters-dropdown-lecture');const createdCheckbox=document.getElementById('hs-as-filters-dropdown-lab');const tableBody=document.getElementById('table-body');const noDataMessage=document.getElementById('no-data-message');function updateLabel(){const count=(frequencyCheckbox.checked?1:0)+(createdCheckbox.checked?1:0);selectedCountSpan.textContent=count>0?count:'';selectedCountSpan.style.display=count>0?'inline-flex':'none';}
function filterTable(){const showLab=createdCheckbox.checked;const showLecture=frequencyCheckbox.checked;const rows=tableBody.querySelectorAll('tr:not(#no-results-row)');let hasVisibleRows=false;let noResultsForFilter=true;rows.forEach(row=>{const isLab=row.getAttribute('data-is-lab')==='true';const matchesFilter=(showLab&&isLab)||(showLecture&&!isLab)||(!showLab&&!showLecture);if(matchesFilter){row.style.display='';hasVisibleRows=true;noResultsForFilter=false;}else{row.style.display='none';}});if(noResultsForFilter){noDataMessage.textContent=`No results found`;}else{noDataMessage.textContent='';}
document.getElementById('no-results-row').style.display=hasVisibleRows?'none':'';}
function handleFilterChange(){updateLabel();filterTable();}
frequencyCheckbox.addEventListener('change',handleFilterChange);createdCheckbox.addEventListener('change',handleFilterChange);updateLabel();filterTable();});</script src="/static/js/checkBoxes.js"><script><script>document.addEventListener("DOMContentLoaded",function(){initializeCheckboxLogic({selectAllId:"select-all-2",checkboxClass:".custom-checkbox",selectedCountId:"selected-count-2",deleteButtonId:"delete-btn-2",classroomIdsInputId:"classroom_ids_2"});});;