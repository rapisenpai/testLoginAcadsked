document.addEventListener('DOMContentLoaded',function(){document.querySelectorAll('[data-hs-overlay="#delete-classroom"]').forEach(button=>{button.addEventListener('click',function(){const memberId=this.getAttribute('data-member-id');const memberName=this.getAttribute('data-member-name');const groupName=this.getAttribute('data-group-name');document.getElementById('member_id').value=memberId;document.getElementById('delete-classroom-description').textContent=memberName;});});});;