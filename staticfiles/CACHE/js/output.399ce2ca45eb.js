document.addEventListener('DOMContentLoaded',function(){function updateModalContent(button){const courseId=button.getAttribute('data-course-id');const courseDescription=button.getAttribute('data-course-description');const courseCode=button.getAttribute('data-course-code');document.getElementById('delete_course_id').value=courseId;document.getElementById('delete-course-description').textContent=courseCode+" - "+courseDescription;}
document.querySelectorAll('[data-hs-overlay="#delete-course"]').forEach(button=>{button.addEventListener('click',function(){updateModalContent(this);});});document.querySelector('#delete-course').addEventListener('hidden.bs.modal',function(){document.getElementById('delete_course_id').value='';document.getElementById('delete-course-description').textContent='';});});;