document.addEventListener('DOMContentLoaded',function(){document.querySelectorAll('[data-hs-overlay="#delete-course"]').forEach(button=>{button.addEventListener('click',function(){const courseId=this.getAttribute('data-course-id');const courseDescription=this.getAttribute('data-course-description');document.getElementById('delete_course_id').value=courseId;document.getElementById('delete-course-description').textContent=courseDescription+courseDescription;});});});;