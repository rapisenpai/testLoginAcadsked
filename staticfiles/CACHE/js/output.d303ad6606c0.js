document.addEventListener('DOMContentLoaded',function(){const modal=document.getElementById('delete-course');const buttons=document.querySelectorAll('[data-hs-overlay="#delete-course"]');buttons.forEach(button=>{button.addEventListener('click',function(){const courseId=this.getAttribute('data-course-id');const courseDescription=this.getAttribute('data-course-description');const courseCode=this.getAttribute('data-course-code');document.getElementById('delete_course_id').value=courseId;document.getElementById('delete-course-description').textContent=`${courseCode} - ${courseDescription}`;});});modal.addEventListener('hide.bs.modal',function(){setTimeout(()=>{document.getElementById('delete_course_id').value='';document.getElementById('delete-course-description').textContent='';},200);});});;