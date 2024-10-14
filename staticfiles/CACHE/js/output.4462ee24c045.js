document.addEventListener('DOMContentLoaded',function(){const yearLevelMapping={'First Year':'first-year','Second Year':'second-year','Third Year':'third-year','Fourth Year':'fourth-year'};const semesterMapping={'1st Semester':'1st-semester','2nd Semester':'2nd-semester','3rd Semester':'3rd-semester'};document.querySelectorAll('.addFieldButton').forEach(button=>{button.addEventListener('click',function(){const yearLevelStr=this.getAttribute('data-year-level');const semesterStr=this.getAttribute('data-semester');if(!yearLevelStr||!semesterStr){console.error('Missing year level or semester attribute');return;}
const yearLevel=yearLevelMapping[yearLevelStr];const semester=semesterMapping[semesterStr];if(!yearLevel||!semester){console.error('Invalid year level or semester value');return;}
const newRow=document.createElement('tr');newRow.classList.add('bg-white');newRow.innerHTML=`
                    <input type="hidden" name="course_id" value="">
                    <input type="hidden" name="semester" value="${semester}">
                    <input type="hidden" name="year_level" value="${yearLevel}">
                    <td>
                      <p class="px-6 text-sm text-gray-800"></p>
                    </td>
                    <td>
                      <input type="text" name="course_code" class="py-2 px-3 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500" placeholder="Course Code">
                    </td>
                    <td>
                      <input type="text" name="course_description" class="no-spinner py-2 px-3 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500" placeholder="Course Description">
                    </td>
                    <td>
                      <input type="number" name="lecture" class="no-spinner py-2 px-3 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500" placeholder="Lecture">
                    </td>
                    <td>
                      <input type="number" name="laboratory" class="no-spinner py-2 px-3 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500" placeholder="Laboratory">
                    </td>
                    <td>
                      <button type="button" class="removeFieldButton py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-red-500 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                        </svg>
                        Remove
                      </button>
                    </td>
                `;const tbodyId=`courses-table-body-${yearLevel}-${semester}`;const targetTbody=document.getElementById(tbodyId);if(targetTbody){targetTbody.appendChild(newRow);attachRemoveEvent(newRow.querySelector('.removeFieldButton'));}else{console.error('Target tbody not found');}});});function attachRemoveEvent(button){button.addEventListener('click',function(){this.closest('tr').remove();});}
document.querySelectorAll('.removeFieldButton').forEach(button=>{attachRemoveEvent(button);});});;