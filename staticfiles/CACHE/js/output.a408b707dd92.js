document.addEventListener('DOMContentLoaded',function(){const filterButton=document.getElementById('hs-as-table-table-filter-dropdown');const selectedCountSpan=document.getElementById('selected-filter-count');const frequencyCheckbox=document.getElementById('hs-as-filters-dropdown-lecture');const createdCheckbox=document.getElementById('hs-as-filters-dropdown-lab');const tableBody=document.getElementById('classroom-table-body');const searchInput=document.getElementById('search-classroom');const noDataMessage=document.getElementById('no-data-message');function updateLabel(){const count=(frequencyCheckbox.checked?1:0)+(createdCheckbox.checked?1:0);selectedCountSpan.textContent=count>0?count:'';selectedCountSpan.style.display=count>0?'inline-flex':'none';}
function filterTable(){const showLab=createdCheckbox.checked;const showLecture=frequencyCheckbox.checked;const searchTerm=searchInput.value.toLowerCase();const rows=tableBody.querySelectorAll('tr:not(#no-results-row)');let hasVisibleRows=false;let noResultsForSearch=true;let noResultsForFilter=true;rows.forEach(row=>{const isLab=row.getAttribute('data-is-lab')==='true';const name=row.cells[2].textContent.toLowerCase();const location=row.cells[3].textContent.toLowerCase();const classroom=row.cells[4].textContent.toLowerCase();const matchesFilter=(showLab&&isLab)||(showLecture&&!isLab)||(!showLab&&!showLecture);const matchesSearch=[name,location,classroom].some(text=>text.includes(searchTerm));if(matchesFilter){noResultsForFilter=false;if(matchesSearch){row.style.display='';hasVisibleRows=true;noResultsForSearch=false;}else{row.style.display='none';}}else{row.style.display='none';}});if(noResultsForSearch&&noResultsForFilter){noDataMessage.textContent=`No results found for "${searchTerm}"`;}else if(noResultsForFilter){noDataMessage.textContent=`No results found for filtered data`;}else if(noResultsForSearch){noDataMessage.textContent=`No results found for "${searchTerm}"`;}else{noDataMessage.textContent='';}
document.getElementById('no-results-row').style.display=hasVisibleRows?'none':'';}
function handleFilterChange(){updateLabel();filterTable();}
frequencyCheckbox.addEventListener('change',handleFilterChange);createdCheckbox.addEventListener('change',handleFilterChange);searchInput.addEventListener('input',filterTable);updateLabel();filterTable();});;