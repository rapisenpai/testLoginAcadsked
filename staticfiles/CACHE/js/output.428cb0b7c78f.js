document.addEventListener('DOMContentLoaded',function(){document.querySelectorAll('[data-hs-overlay="#delete-classroom"]').forEach(button=>{button.addEventListener('click',function(){const classroomId=this.getAttribute('data-classroom-id');const classroomName=this.getAttribute('data-classroom-name');if(classroomId&&classroomName){document.getElementById('classroom_id').value=classroomId;document.getElementById('delete-classroom-description').textContent=classroomName+'.';}});});});;