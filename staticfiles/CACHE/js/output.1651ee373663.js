document.addEventListener('DOMContentLoaded',function(){const yearLevelMapping={'First Year':1,'Second Year':2,'Third Year':3,'Fourth Year':4};const semesterMapping={'1st Semester':1,'2nd Semester':2,'3rd Semester':3};document.addEventListener('DOMContentLoaded',function(){const addButton=document.getElementById('add-course-button');const tableBody=document.getElementById('courses-table-body');addButton.addEventListener('click',function(){const yearLevel=this.getAttribute('data-year-level');const semester=this.getAttribute('data-semester');if(!yearLevel||!semester){console.error('Missing year level or semester attribute');return;}
const newRow=document.createElement('tr');newRow.innerHTML=`
      <td><input type="hidden" name="course_id" value=""></td>
      <td><input type="text" name="course_code" placeholder="Course Code" class="py-2 px-3 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"></td>
      <td><input type="text" name="course_description" placeholder="Course Description" class="no-spinner py-2 px-3 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"></td>
      <td><input type="number" name="lecture" placeholder="Lecture Hours" class="no-spinner py-2 px-3 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"></td>
      <td><input type="number" name="laboratory" placeholder="Lab Hours" class="no-spinner py-2 px-3 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"></td>
      <td><input type="number" name="credit_units" placeholder="Credit Units" class="no-spinner py-2 px-3 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"></td>
      <td><input type="hidden" name="semester" value="${semester}"></td>
      <td><input type="hidden" name="year_level" value="${yearLevel}"></td>
      <td><button class="removeFieldButton py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-red-500 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
        </svg>
        Remove
      </button></td>
    `;tableBody.appendChild(newRow);attachRemoveEvent(newRow.querySelector('.removeFieldButton'));});function attachRemoveEvent(button){button.addEventListener('click',function(){this.closest('tr').remove();});}
document.querySelectorAll('.removeFieldButton').forEach(button=>{attachRemoveEvent(button);});});;