document.addEventListener('DOMContentLoaded',function(){function initializeSearch(searchInputId,tableBodyId,columnsToSearch,noResultsMessageId,noResultsRowId){const searchInput=document.getElementById(searchInputId);const tableBody=document.getElementById(tableBodyId);const noDataMessage=document.getElementById(noResultsMessageId);function filterTableBySearch(){const searchTerm=searchInput.value;const searchTermNoSpaces=searchTerm.replace(/\s+/g,'').toLowerCase();const rows=tableBody.querySelectorAll(`tr:not(#${noResultsRowId})`);let hasVisibleRows=false;let noResultsForSearch=true;rows.forEach(row=>{let matchesSearch=false;columnsToSearch.forEach(columnIndex=>{const cellText=row.cells[columnIndex].textContent;const cellTextNoSpaces=cellText.replace(/\s+/g,'').toLowerCase();if(cellTextNoSpaces.includes(searchTermNoSpaces)){matchesSearch=true;}});if(matchesSearch){row.style.display='';hasVisibleRows=true;noResultsForSearch=false;}else{row.style.display='none';}});if(noResultsForSearch){noDataMessage.innerHTML=`No results found for <strong>"${searchTerm}"</strong>`;}else{noDataMessage.textContent='';}
document.getElementById(noResultsRowId).style.display=hasVisibleRows?'none':'';}
searchInput.addEventListener('input',filterTableBySearch);}
window.initializeSearch=initializeSearch;});;document.addEventListener('DOMContentLoaded',function(){const tableBodies=document.querySelectorAll('[id^="table-body-"]');tableBodies.forEach((tableBody,index)=>{const tableIdSuffix=index+1;const searchInputId=`search-data-${tableIdSuffix}`;console.log(`Initializing search for: searchInputId: ${searchInputId}, tableBodyId: ${tableBodyId}`);const tableBodyId=`table-body-${tableIdSuffix}`;const noResultsMessageId=`no-data-message-${tableIdSuffix}`;const noResultsRowId=`no-results-row-${tableIdSuffix}`;const columnsToSearch=[1,2];initializeSearch(searchInputId,tableBodyId,columnsToSearch,noResultsMessageId,noResultsRowId);});});;