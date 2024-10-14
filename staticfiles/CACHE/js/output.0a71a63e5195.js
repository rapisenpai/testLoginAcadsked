document.addEventListener('DOMContentLoaded',function(){var isFormDirty={};function markFormDirty(event){isFormDirty[event.target.form.id]=true;console.log('Form marked as dirty:',event.target.form.id);}
function resetFormDirty(event){isFormDirty[event.target.id]=false;console.log('Form reset as clean:',event.target.id);}
document.querySelectorAll('form input, form textarea, form select').forEach(function(element){element.addEventListener('change',markFormDirty);element.addEventListener('input',markFormDirty);});document.querySelectorAll('form').forEach(function(form){form.addEventListener('submit',resetFormDirty);});window.addEventListener('beforeunload',function(e){for(var formId in isFormDirty){if(isFormDirty[formId]){console.log('Unsaved changes detected in form:',formId);e.preventDefault();e.returnValue='';break;}}});});;