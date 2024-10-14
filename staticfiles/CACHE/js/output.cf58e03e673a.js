document.addEventListener('DOMContentLoaded',function(){function validateInput(input,min,max){const value=parseInt(input.value,10);if(isNaN(value)||value<min||value>max||input.value.trim()===""){input.classList.add('border-red-500','focus:border-red-500','focus:ring-red-500');input.classList.remove('border-gray-200','focus:border-primary-500','focus:ring-primary-500');}else{input.classList.remove('border-red-500','focus:border-red-500','focus:ring-red-500');input.classList.add('border-gray-200','focus:border-primary-500','focus:ring-primary-500');}}
function validateTextInput(input){if(input.value.trim()===""){input.classList.add('border-red-500','focus:border-red-500','focus:ring-red-500');input.classList.remove('border-gray-200','focus:border-primary-500','focus:ring-primary-500');}else{input.classList.remove('border-red-500','focus:border-red-500','focus:ring-red-500');input.classList.add('border-gray-200','focus:border-primary-500','focus:ring-primary-500');}}
function attachValidation(){document.getElementById('edit-year-level').addEventListener('input',function(){validateInput(this,1,4);});document.getElementById('edit-course-id').addEventListener('input',function(){validateTextInput(this);});document.getElementById('edit-course-code').addEventListener('input',function(){validateTextInput(this);});document.getElementById('edit-course-description').addEventListener('input',function(){validateTextInput(this);});document.getElementById('edit-lecture').addEventListener('input',function(){validateInput(this,1,9);});document.getElementById('edit-laboratory').addEventListener('input',function(){validateInput(this,0,9);});document.getElementById('edit-semester').addEventListener('input',function(){validateInput(this,1,3);});}
document.querySelectorAll('[data-hs-overlay="#edit-course"]').forEach(function(button){button.addEventListener('click',function(){const courseId=this.getAttribute('data-course-id');const courseCode=this.getAttribute('data-course-code');const courseDescription=this.getAttribute('data-course-description');const lecture=this.getAttribute('data-lecture');const laboratory=this.getAttribute('data-laboratory');const semester=this.getAttribute('data-semester');const yearLevel=this.getAttribute('data-year-level');document.getElementById('edit-course-id').value=courseId;document.getElementById('edit-course-code').value=courseCode;document.getElementById('edit-course-description').value=courseDescription;document.getElementById('edit-lecture').value=lecture;document.getElementById('edit-laboratory').value=laboratory;document.getElementById('edit-semester').value=semester;document.getElementById('edit-year-level').value=yearLevel;});});attachValidation();});;