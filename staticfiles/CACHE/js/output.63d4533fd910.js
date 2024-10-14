document.addEventListener('DOMContentLoaded',function(){function initializeSearchAcrossTables(searchInputId,tableBodiesSelector,columnsToSearch,noResultsMessageIdPrefix){const searchInput=document.getElementById(searchInputId);const tableBodies=document.querySelectorAll(tableBodiesSelector);function filterTablesBySearch(){const searchTerm=searchInput.value.trim().toLowerCase();let hasVisibleRows=false;tableBodies.forEach((tableBody,index)=>{const rows=tableBody.querySelectorAll('tr');let tableHasVisibleRows=false;const noResultsMessageId=`${noResultsMessageIdPrefix}-${index + 1}`;const noDataMessage=document.getElementById(noResultsMessageId);rows.forEach(row=>{let matchesSearch=false;columnsToSearch.forEach(columnIndex=>{const cellText=row.cells[columnIndex]?.textContent.trim().toLowerCase();if(cellText&&cellText.includes(searchTerm)){matchesSearch=true;}});if(matchesSearch){row.style.display='';tableHasVisibleRows=true;hasVisibleRows=true;}else{row.style.display='none';}});if(!tableHasVisibleRows){noDataMessage.innerHTML=`No results found for <strong>"${searchTerm}"</strong>`;}else{noDataMessage.textContent='';}});if(!hasVisibleRows){console.log(`No results found for the term "${searchTerm}" across all tables.`);}}
searchInput.addEventListener('input',filterTablesBySearch);}
initializeSearchAcrossTables('search-data','[id^="table-body-"]',[1,2],'no-data-message');});;