document.addEventListener('DOMContentLoaded',function(){const saveButton=document.querySelector('[name="AddProgramSubmit"]');let isProgramNameUnique=true;let isProgramCodeUnique=true;function validateTextInput(input){const helper=document.getElementById(`${input.id}-helper`);if(input.value.trim()===""){input.classList.add('border-red-500','focus:border-red-500','focus:ring-red-500');input.classList.remove('border-gray-200','focus:border-primary-500','focus:ring-primary-500');helper.textContent="This field is required.";disableSaveButton();}else{input.classList.remove('border-red-500','focus:border-red-500','focus:ring-red-500');input.classList.add('border-gray-200','focus:border-primary-500','focus:ring-primary-500');helper.textContent="";checkIfReadyToSubmit();}}
function validateSelectInput(select){const helper=document.getElementById(`${select.id}-helper`);if(select.value===""||select.value==="Select Institute"){select.classList.add('border-red-500','focus:border-red-500','focus:ring-red-500');select.classList.remove('border-gray-200','focus:border-primary-500','focus:ring-primary-500');helper.textContent="Please select an institute.";disableSaveButton();}else{select.classList.remove('border-red-500','focus:border-red-500','focus:ring-red-500');select.classList.add('border-gray-200','focus:border-primary-500','focus:ring-primary-500');helper.textContent="";checkIfReadyToSubmit();}}
function toSentenceCase(str){str=str.replace(/_/g,' ');return str.charAt(0).toUpperCase()+str.slice(1).toLowerCase();}
function checkUnique(field,value,helper){fetch(`/check-unique/?field=${field}&value=${value}`,{credentials:'same-origin',headers:{'X-CSRFToken':getCookie('csrftoken')}}).then(response=>response.json()).then(data=>{if(data.exists){helper.textContent=`${toSentenceCase(field)} already exists.`;document.getElementById(field).classList.add('border-red-500','focus:border-red-500','focus:ring-red-500');document.getElementById(field).classList.remove('border-gray-200','focus:border-primary-500','focus:ring-primary-500');if(field==='program_name'){console.log('field:',field);console.log('program_name:',program_name);isProgramNameUnique=false;}else if(field==='program_code'){console.log('field:',field);console.log('program_name:',program_name);isProgramCodeUnique=false;}
disableSaveButton();}else{helper.textContent="";document.getElementById(field).classList.remove('border-red-500','focus:border-red-500','focus:ring-red-500');document.getElementById(field).classList.add('border-gray-200','focus:border-primary-500','focus:ring-primary-500');if(field==='program_name'){isProgramNameUnique=true;}else if(field==='program_code'){isProgramCodeUnique=true;}
checkIfReadyToSubmit();}});}
function getCookie(name){let cookieValue=null;if(document.cookie&&document.cookie!==''){const cookies=document.cookie.split(';');for(let i=0;i<cookies.length;i++){const cookie=cookies[i].trim();if(cookie.substring(0,name.length+1)===(name+'=')){cookieValue=decodeURIComponent(cookie.substring(name.length+1));break;}}}
return cookieValue;}
function disableSaveButton(){saveButton.disabled=true;}
function checkIfReadyToSubmit(){const programName=document.getElementById('add-program-name').value.trim();const programCode=document.getElementById('add-program-code').value.trim();const programInstitute=document.getElementById('add-program-institute').value;if(programName!==""&&programCode!==""&&programInstitute!==""&&isProgramNameUnique&&isProgramCodeUnique){saveButton.disabled=false;}else{saveButton.disabled=true;}}
function attachValidation(){document.getElementById('add-program-name').addEventListener('input',function(){validateTextInput(this);if(this.value.trim()!==""){const helper=document.getElementById(`${this.id}-helper`);checkUnique('program_name',this.value,helper);}});document.getElementById('add-program-code').addEventListener('input',function(){validateTextInput(this);if(this.value.trim()!==""){const helper=document.getElementById(`${this.id}-helper`);checkUnique('program_code',this.value,helper);}});document.getElementById('add-program-institute').addEventListener('change',function(){validateSelectInput(this);});}
attachValidation();});;