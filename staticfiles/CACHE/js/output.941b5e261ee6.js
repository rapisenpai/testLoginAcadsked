document.addEventListener('DOMContentLoaded',function(){const deleteButton=document.getElementById('delete-button');const deleteForm=document.getElementById('delete-form');const classroomIdsInput=document.getElementById('classroom_ids');deleteButton.addEventListener('click',function(){const selectedItems=Array.from(document.querySelectorAll('.classroom-checkbox:checked')).map(checkbox=>checkbox.dataset.classroomId);if(selectedItems.length>0){classroomIdsInput.value=selectedItems.join(',');const modal=document.getElementById('delete-all-classroom');modal.classList.remove('hidden');modal.classList.add('hs-overlay-open');}});document.querySelectorAll('[data-hs-overlay="#delete-all-classroom"]').forEach(button=>{button.addEventListener('click',function(){const modal=document.getElementById('delete-all-classroom');modal.classList.add('hidden');modal.classList.remove('hs-overlay-open');});});});;;