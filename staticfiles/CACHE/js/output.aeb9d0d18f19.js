document.addEventListener('DOMContentLoaded',function(){const filterButton=document.getElementById('hs-as-table-table-filter-dropdown');const selectedCountSpan=document.getElementById('selected-filter-count');const frequencyCheckbox=document.getElementById('hs-as-filters-dropdown-lecture');const createdCheckbox=document.getElementById('hs-as-filters-dropdown-lab');const tableBody=document.getElementById('classroom-table-body');const searchInput=document.getElementById('search-classroom');const noResultRow=document.getElementById('no-result-row');const filterStatus=document.getElementById('filter-status');function updateLabel(){let count=0;if(frequencyCheckbox.checked)count++;if(createdCheckbox.checked)count++;selectedCountSpan.textContent=count>0?`(${count})`:'';selectedCountSpan.style.display=count>0?'inline-flex':'none';}
function filterTable(){const showLab=createdCheckbox.checked;const showLecture=frequencyCheckbox.checked;const searchTerm=searchInput.value.toLowerCase();let anyRowVisible=false;const rows=tableBody.querySelectorAll('tr');rows.forEach(row=>{const isLab=row.getAttribute('data-is-lab')==='true';const name=row.cells[2].textContent.toLowerCase();const location=row.cells[3].textContent.toLowerCase();const classroom=row.cells[4].textContent.toLowerCase();const matchesFilter=(showLab&&isLab)||(showLecture&&!isLab)||(!showLab&&!showLecture);const matchesSearch=name.includes(searchTerm)||location.includes(searchTerm)||classroom.includes(searchTerm);if(matchesFilter&&matchesSearch){row.style.display='';anyRowVisible=true;}else{row.style.display='none';}});noResultRow.style.display=anyRowVisible?'none':'';let filterMessage='Showing results';if(!anyRowVisible){filterMessage='No results found';}else{if(searchTerm){filterMessage=`Showing results for search term: "${searchTerm}"`;}
if(showLab&&showLecture){filterMessage+=' (All types)';}else if(showLab){filterMessage+=' (Lab Classrooms)';}else if(showLecture){filterMessage+=' (Lecture Classrooms)';}}
filterStatus.textContent=filterMessage;}
function handleFilterChange(){updateLabel();filterTable();}
frequencyCheckbox.addEventListener('change',handleFilterChange);createdCheckbox.addEventListener('change',handleFilterChange);searchInput.addEventListener('input',filterTable);updateLabel();filterTable();});;