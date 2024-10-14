const yearLevelMapping={'First Year':1,'Second Year':2,'Third Year':3,'Fourth Year':4};const semesterMapping={'1st Semester':1,'2nd Semester':2,'3rd Semester':3};document.querySelectorAll('[id^="addFieldButton-"]').forEach(button=>{button.addEventListener('click',function(){const yearLevelStr=this.getAttribute('data-year-level');const semesterStr=this.getAttribute('data-semester');const yearLevel=yearLevelMapping[yearLevelStr];const semester=semesterMapping[semesterStr];const table=document.querySelector(`table[data-year-level="${yearLevelStr}"][data-semester="${semesterStr}"] tbody`);const newRow=document.createElement('tr');newRow.classList.add('course-field');newRow.innerHTML=`
                    <input type="hidden" name="course_id" value="">
                    <input type="hidden" name="semester" value="${semester}">
                    <input type="hidden" name="year_level" value="${yearLevel}">
                    <td>
                      <p class="px-6 text-sm text-gray-800"></p>
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
                      <button type="button"  id="removeFieldButton-new" class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-red-500 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                        </svg>
                        Remove
                      </button>
                    </td>
                `;table.appendChild(newRow);attachRemoveEvent(newRow.querySelector('[id^="removeFieldButton-"]'));});});function attachRemoveEvent(button){button.addEventListener('click',function(){this.closest('tr').remove();});}
document.querySelectorAll('[id^="removeFieldButton-"]').forEach(button=>{attachRemoveEvent(button);});;