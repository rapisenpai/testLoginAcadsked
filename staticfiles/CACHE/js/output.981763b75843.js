document.addEventListener('DOMContentLoaded',function(){const modal=document.getElementById('delete-course');document.querySelectorAll('[data-hs-overlay="#delete-course"]').forEach(button=>{button.addEventListener('click',function(){const courseId=this.getAttribute('data-course-id');const courseDescription=this.getAttribute('data-course-description');const courseCode=this.getAttribute('data-course-code');document.getElementById('delete_course_id').value=courseId;document.getElementById('delete-course-description').textContent=`${courseCode} - ${courseDescription}`;});});modal.addEventListener('hidden.bs.modal',function(){document.getElementById('delete_course_id').value='';document.getElementById('delete-course-description').textContent='';});});;