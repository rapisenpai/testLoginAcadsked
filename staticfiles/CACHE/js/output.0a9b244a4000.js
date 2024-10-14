document.addEventListener('DOMContentLoaded',function(){const searchInput=document.getElementById('search-data');const tables=document.querySelectorAll('tbody[id^="table-body-"]');function normalizeString(str){return str.replace(/\s+/g,'').toLowerCase();}
function filterTableBySearch(){const searchTerm=normalizeString(searchInput.value);tables.forEach(tableBody=>{const rows=tableBody.querySelectorAll('tr:not([id^="no-results-row"]):not(.exclude-from-search)');let hasVisibleRows=false;rows.forEach(row=>{const cells=row.querySelectorAll('td');let matchesSearch=Array.from(cells).some(cell=>normalizeString(cell.textContent).includes(searchTerm));if(matchesSearch){row.style.display='';hasVisibleRows=true;}else{row.style.display='none';}});const totalUnitsRow=tableBody.querySelector('.exclude-from-search');totalUnitsRow.style.display='none';const noResultsRow=tableBody.querySelector('[id^="no-results-row"]');noResultsRow.style.display=hasVisibleRows?'none':'';});}
searchInput.addEventListener('input',filterTableBySearch);});;