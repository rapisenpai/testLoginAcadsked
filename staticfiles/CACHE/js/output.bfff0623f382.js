document.addEventListener('DOMContentLoaded',function(){const searchInput=document.getElementById('search-data');const tables=document.querySelectorAll('tbody[id^="table-body-"]');function filterTableBySearch(){const searchTerm=searchInput.value.toLowerCase().trim().replace(/\s+/g,'');tables.forEach(tableBody=>{const rows=tableBody.querySelectorAll('tr:not([id^="no-results-row"]):not(.exclude-from-search)');let hasVisibleRows=false;rows.forEach(row=>{const cells=row.querySelectorAll('td');let matchesSearch=Array.from(cells).some(cell=>{const cellText=cell.textContent.toLowerCase().replace(/\s+/g,'');return cellText.includes(searchTerm);});if(matchesSearch){row.style.display='';hasVisibleRows=true;}else{row.style.display='none';}});const totalUnitsRow=tableBody.querySelector('.exclude-from-search');totalUnitsRow.style.display='none';const noResultsRow=tableBody.querySelector('[id^="no-results-row"]');if(hasVisibleRows){noResultsRow.style.display='none';}else{noResultsRow.style.display='';const noResultsMessage=noResultsRow.querySelector('p');noResultsMessage.textContent=`No results found for "${searchInput.value}" in this year level`;}});}
searchInput.addEventListener('input',filterTableBySearch);});;