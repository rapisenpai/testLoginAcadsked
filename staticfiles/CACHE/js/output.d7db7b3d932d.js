document.addEventListener('DOMContentLoaded',function(){document.querySelectorAll('[data-hs-overlay="#update-classroom"]').forEach(button=>{button.addEventListener('click',function(){const classroomId=this.getAttribute('data-classroom-id');const classroomName=this.getAttribute('data-classroom-name');const building=this.getAttribute('data-building');const isLab=this.getAttribute('data-is-lab')==='True';console.log(classroomId);document.getElementById('classroom_id').value=classroomId;console.log(document.getElementById('classroom_id').value);document.getElementById('classroom_name').value=classroomName;document.getElementById('building').value=building;document.getElementById('hs-xs-switch').checked=isLab;});});});;