document.getElementById('toggle-password').addEventListener('change',function(){const passwordFields=[document.getElementById('new-password1'),document.getElementById('new-password2')];passwordFields.forEach(field=>{if(this.checked){field.type='text';}else{field.type='password';}});});;