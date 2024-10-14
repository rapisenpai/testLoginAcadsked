const yearLevelMapping={'First Year':1,'Second Year':2,'Third Year':3,'Fourth Year':4};const semesterMapping={'1st Semester':1,'2nd Semester':2,'3rd Semester':3};document.querySelectorAll('.addFieldButton').forEach(button=>{button.addEventListener('click',function(){const container=this.parentElement;const yearLevelStr=this.getAttribute('data-year-level');const semesterStr=this.getAttribute('data-semester');if(!yearLevelStr||!semesterStr){console.error('Missing year level or semester attribute');return;}
const yearLevel=yearLevelMapping[yearLevelStr];const semester=semesterMapping[semesterStr];if(isNaN(yearLevel)||isNaN(semester)){console.error('Invalid year level or semester value');return;}
const newField=document.createElement('div');newField.classList.add('course-field');newField.innerHTML=`
        <input type="hidden" name="course_id" value="">
        <input type="text" name="course_code" placeholder="Course Code">
        <input type="text" name="course_description" placeholder="Course Description">
        <input type="number" name="lecture" placeholder="Lecture Hours">
        <input type="number" name="laboratory" placeholder="Lab Hours">
        <input type="number" name="credit_units" placeholder="Credit Units">
        <input type="hidden" name="semester" value="${semester}">
        <input type="hidden" name="year_level" value="${yearLevel}">
        <button type="button" class="removeFieldButton">Remove</button>
      `;container.insertBefore(newField,this);attachRemoveEvent(newField.querySelector('.removeFieldButton'));});});function attachRemoveEvent(button){button.addEventListener('click',function(){this.parentElement.remove();});}
document.querySelectorAll('.removeFieldButton').forEach(button=>{attachRemoveEvent(button);});;