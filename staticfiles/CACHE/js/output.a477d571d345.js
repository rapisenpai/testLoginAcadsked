document.addEventListener('DOMContentLoaded',function(){const filterButton=document.getElementById('hs-as-table-table-filter-dropdown');const selectedCountSpan=document.getElementById('selected-filter-count');const frequencyCheckbox=document.getElementById('hs-as-filters-dropdown-lecture');const createdCheckbox=document.getElementById('hs-as-filters-dropdown-lab');function updateLabel(){let count=0;if(frequencyCheckbox.checked)count++;if(createdCheckbox.checked)count++;selectedCountSpan.textContent=count>0?count:'';selectedCountSpan.style.display=count>0?'inline-flex':'none';}
frequencyCheckbox.addEventListener('change',updateLabel);createdCheckbox.addEventListener('change',updateLabel);updateLabel();});;