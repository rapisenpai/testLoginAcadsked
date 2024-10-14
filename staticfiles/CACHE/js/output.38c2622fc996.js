const yearLevelMapping={'First Year':1,'Second Year':2,'Third Year':3,'Fourth Year':4};const semesterMapping={'1st Semester':1,'2nd Semester':2,'3rd Semester':3};function createNoCoursesRow(){const noCoursesRow=document.createElement('tr');noCoursesRow.classList.add('no-courses');noCoursesRow.innerHTML=`
            <td colspan="6" class="size-px whitespace-nowrap">
              <div class="px-6 py-3"><div class="flex flex-auto flex-col justify-center items-center p-4 md:p-5">
  <svg class="size-10 text-gray-500"
       xmlns="http://www.w3.org/2000/svg"
       width="24"
       height="24"
       viewBox="0 0 24 24"
       fill="none"
       stroke="currentColor"
       stroke-width="1"
       stroke-linecap="round"
       stroke-linejoin="round">
    <line x1="22" x2="2" y1="12" y2="12"></line>
    <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z">
    </path>
    <line x1="6" x2="6.01" y1="16" y2="16"></line>
    <line x1="10" x2="10.01" y1="16" y2="16"></line>
  </svg>
  <p id="no-data-message" class="mt-2 text-sm text-gray-800">No data to show</p>
</div>
</div>
            </td>
          `;return noCoursesRow;}
document.querySelectorAll('[id^="addFieldButton-"]').forEach(button=>{button.addEventListener('click',function(){const yearLevelStr=this.getAttribute('data-year-level');const semesterStr=this.getAttribute('data-semester');const yearLevel=yearLevelMapping[yearLevelStr];const semester=semesterMapping[semesterStr];const table=document.querySelector(`table[data-year-level="${yearLevelStr}"][data-semester="${semesterStr}"] tbody`);const noCoursesRow=table.querySelector('.no-courses');if(noCoursesRow){noCoursesRow.remove();}
const newRow=document.createElement('tr');const rowNumber=table.querySelectorAll('tr').length+1;newRow.classList.add('course-field','bg-white');newRow.innerHTML=`
                    <input type="hidden" name="course_id" value="">
                    <input type="hidden" name="semester" value="${semester}">
                    <input type="hidden" name="year_level" value="${yearLevel}">
                    <td>
                      <p class="px-6 text-sm text-gray-800">${rowNumber}</p>
                    </td>
                    <td>
                      <input type="text"  autocomplete="off" name="course_code" class="py-2 px-3 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500" placeholder="Course Code">
                    </td>
                    <td>
                      <input type="text"  autocomplete="off" name="course_description" class="no-spinner py-2 px-3 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500" placeholder="Course Description">
                    </td>
                    <td>
                      <input type="number"  autocomplete="off" name="lecture" class="no-spinner py-2 px-3 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500" placeholder="Lecture">
                    </td>
                    <td>
                      <input type="number"  autocomplete="off" name="laboratory" class="no-spinner py-2 px-3 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500" placeholder="Laboratory">
                    </td>
                    <td>
                      <button type="button"  id="removeFieldButton-" class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-red-500 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                        </svg>
                        Remove
                      </button>
                    </td>
                `;table.appendChild(newRow);attachRemoveEvent(newRow.querySelector('[id^="removeFieldButton-"]'));newRow.querySelector(`#removeFieldButton-${rowNumber}`).addEventListener('click',function(){newRow.remove();if(table.querySelectorAll('tr').length===0){table.appendChild(createNoCoursesRow());}});});function attachRemoveEvent(button){button.addEventListener('click',function(){this.closest('tr').remove();});}
document.querySelectorAll('[id^="removeFieldButton-"]').forEach(button=>{attachRemoveEvent(button);});function updateRowNumbers(table){const rows=table.querySelectorAll('tr.course-field');rows.forEach((row,index)=>{row.querySelector('.row-number').textContent=index+1;});}
function attachRemoveEvent(button){button.addEventListener('click',function(){const row=this.closest('tr');const table=row.closest('tbody');row.remove();if(table.children.length===0){const header=table.closest('table').querySelector('.course-header');if(header){header.style.display='none';}}
updateRowNumbers(table);});};