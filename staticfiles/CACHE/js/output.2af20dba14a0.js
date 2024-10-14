document.addEventListener('DOMContentLoaded',function(){const filterButton=document.getElementById('hs-as-table-table-filter-dropdown');const selectedCountSpan=document.getElementById('selected-filter-count');const frequencyCheckbox=document.getElementById('hs-as-filters-dropdown-lecture');const createdCheckbox=document.getElementById('hs-as-filters-dropdown-lab');const tableBody=document.getElementById('classroom-table-body');const searchInput=document.getElementById('search-classrooms');function updateLabel(){let count=0;if(frequencyCheckbox.checked)count++;if(createdCheckbox.checked)count++;selectedCountSpan.textContent=count>0?count:'';selectedCountSpan.style.display=count>0?'inline-flex':'none';}
function filterTable(){const showLab=createdCheckbox.checked;const showLecture=frequencyCheckbox.checked;const rows=tableBody.querySelectorAll('tr');rows.forEach(row=>{const isLab=row.getAttribute('data-is-lab')==='true';if(showLab||showLecture){row.style.display=(showLab&&isLab)||(showLecture&&!isLab)?'':'none';}else{row.style.display='';}});}
frequencyCheckbox.addEventListener('change',function(){updateLabel();filterTable();});createdCheckbox.addEventListener('change',function(){updateLabel();filterTable();});updateLabel();filterTable();});;