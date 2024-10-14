document.addEventListener('DOMContentLoaded',function(){const saveButton=document.querySelector('[name="AddProgramSubmit"]');let isProgramNameUnique=true;let isProgramCodeUnique=true;function validateInput(input){const helper=document.getElementById(`${input.id}-helper`);if(input.value.trim()===""||(input.tagName==='SELECT'&&input.value==="Select Institute")){setInvalid(input,helper,input.tagName==='SELECT'?"Please select an institute.":"This field is required.");}else{setValid(input,helper);if(input.id==='add-program-name'||input.id==='add-program-code'){checkUnique(input.id,input.value,helper);}else{checkIfReadyToSubmit();}}}
function setInvalid(element,helper,message){element.classList.add('border-red-500','focus:border-red-500','focus:ring-red-500');element.classList.remove('border-gray-200','focus:border-primary-500','focus:ring-primary-500');helper.textContent=message;disableSaveButton();}
function setValid(element,helper){element.classList.remove('border-red-500','focus:border-red-500','focus:ring-red-500');element.classList.add('border-gray-200','focus:border-primary-500','focus:ring-primary-500');helper.textContent="";}
function toSentenceCase(str){str=str.replace(/_/g,' ');return str.charAt(0).toUpperCase()+str.slice(1).toLowerCase();}
function checkUnique(field,value,helper){fetch(`/check-unique/?field=${field}&value=${value}`,{credentials:'same-origin',headers:{'X-CSRFToken':getCookie('csrftoken')}}).then(response=>response.json()).then(data=>{if(data.exists){setInvalid(document.getElementById(field),helper,`${toSentenceCase(field)} already exists.`);if(field==='add-program-name'){isProgramNameUnique=false;}else if(field==='add-program-code'){isProgramCodeUnique=false;}}else{setValid(document.getElementById(field),helper);if(field==='add-program-name'){isProgramNameUnique=true;}else if(field==='add-program-code'){isProgramCodeUnique=true;}}
checkIfReadyToSubmit();});}
function getCookie(name){let cookieValue=null;if(document.cookie&&document.cookie!==''){const cookies=document.cookie.split(';');for(let i=0;i<cookies.length;i++){const cookie=cookies[i].trim();if(cookie.substring(0,name.length+1)===(name+'=')){cookieValue=decodeURIComponent(cookie.substring(name.length+1));break;}}}
return cookieValue;}
function disableSaveButton(){saveButton.disabled=true;}
function checkIfReadyToSubmit(){const programName=document.getElementById('add-program-name').value.trim();const programCode=document.getElementById('add-program-code').value.trim();const programInstitute=document.getElementById('add-program-institute').value;console.log(`Checking if ready to submit: 
            programName: ${programName}, 
            programCode: ${programCode}, 
            programInstitute: ${programInstitute}, 
            isProgramNameUnique: ${isProgramNameUnique}, 
            isProgramCodeUnique: ${isProgramCodeUnique}`);if(programName!==""&&programCode!==""&&programInstitute!==""&&isProgramNameUnique&&isProgramCodeUnique){saveButton.disabled=false;}else{saveButton.disabled=true;}}
function attachValidation(){document.getElementById('add-program-name').addEventListener('input',function(){validateInput(this);});document.getElementById('add-program-code').addEventListener('input',function(){validateInput(this);});document.getElementById('add-program-institute').addEventListener('change',function(){validateInput(this);});}
attachValidation();});;