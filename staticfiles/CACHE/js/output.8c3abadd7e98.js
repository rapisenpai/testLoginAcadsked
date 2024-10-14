document.addEventListener('DOMContentLoaded',function(){const state={isProgramNameUnique:true,isProgramCodeUnique:true};function validateTextInput(input){const helper=document.getElementById(`${input.id}-helper`);if(input.value.trim()===""){input.classList.add('border-red-500','focus:border-red-500','focus:ring-red-500');input.classList.remove('border-gray-200','focus:border-primary-500','focus:ring-primary-500');helper.textContent="This field is required.";}else{input.classList.remove('border-red-500','focus:border-red-500','focus:ring-red-500');input.classList.add('border-gray-200','focus:border-primary-500','focus:ring-primary-500');helper.textContent="";checkUnique(input.name,input.value,input.dataset.originalValue,helper);}}
function toSentenceCase(str){return str.charAt(0).toUpperCase()+str.slice(1).toLowerCase();}
function getCookie(name){let cookieValue=null;if(document.cookie&&document.cookie!==''){const cookies=document.cookie.split(';');for(let i=0;i<cookies.length;i++){const cookie=cookies[i].trim();if(cookie.substring(0,name.length+1)===(name+'=')){cookieValue=decodeURIComponent(cookie.substring(name.length+1));break;}}}
return cookieValue;}
function updateFieldState(field,isUnique,message){const inputElement=document.getElementById(field);const helper=document.getElementById(`${field}-helper`);if(isUnique){helper.textContent="";inputElement.classList.remove('border-red-500','focus:border-red-500','focus:ring-red-500');inputElement.classList.add('border-gray-200','focus:border-primary-500','focus:ring-primary-500');}else{helper.textContent=message;inputElement.classList.add('border-red-500','focus:border-red-500','focus:ring-red-500');inputElement.classList.remove('border-gray-200','focus:border-primary-500','focus:ring-primary-500');}}
function checkUnique(field,value,originalValue){if(value===originalValue){updateFieldState(field,true,"");if(field==='program_name'){state.isProgramNameUnique=true;}else if(field==='program_code'){state.isProgramCodeUnique=true;}
checkIfReadyToSubmit();return;}
fetch(`/check-unique/?field=${field}&value=${value}`,{credentials:'same-origin',headers:{'X-CSRFToken':getCookie('csrftoken')}}).then(response=>response.json()).then(data=>{if(data.exists){updateFieldState(field,false,`${toSentenceCase(field.replace('_', ' '))} already exists.`);if(field==='program_name'){state.isProgramNameUnique=false;}else if(field==='program_code'){state.isProgramCodeUnique=false;}
disableSaveButton();}else{updateFieldState(field,true,"");if(field==='program_name'){state.isProgramNameUnique=true;}else if(field==='program_code'){state.isProgramCodeUnique=true;}
checkIfReadyToSubmit();}}).catch(error=>{console.error('Error:',error);});}
function disableSaveButton(){document.querySelector('[name="changeProgramNameSubmit"]').disabled=true;}
function checkIfReadyToSubmit(){const programName=document.getElementById('edit-program-name').value.trim();const programCode=document.getElementById('edit-program-code').value.trim();if(programName!==""&&programCode!==""&&state.isProgramNameUnique&&state.isProgramCodeUnique){document.querySelector('[name="changeProgramNameSubmit"]').disabled=false;}else{document.querySelector('[name="changeProgramNameSubmit"]').disabled=true;}}
function attachValidation(){document.getElementById('edit-program-name').addEventListener('input',function(){validateTextInput(this);});document.getElementById('edit-program-code').addEventListener('input',function(){validateTextInput(this);});}
attachValidation();});;