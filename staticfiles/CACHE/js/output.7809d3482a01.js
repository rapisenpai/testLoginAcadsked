const totals={'First Year':{'1st Semester':{'lecture':19,'lab':3,'credit_units':22},'2nd Semester':{'lecture':22,'lab':2,'credit_units':24}},'Second Year':{'1st Semester':{'lecture':17,'lab':3,'credit_units':20},'2nd Semester':{'lecture':17,'lab':3,'credit_units':20}},'Third Year':{'1st Semester':{'lecture':15,'lab':3,'credit_units':18},'2nd Semester':{'lecture':14,'lab':4,'credit_units':18}},'Fourth Year':{'1st Semester':{'lecture':14,'lab':4,'credit_units':18},'2nd Semester':{'lecture':8,'lab':1,'credit_units':9}}};document.addEventListener("DOMContentLoaded",function(){for(const[year,semesters]of Object.entries(totals)){for(const[semester,details]of Object.entries(semesters)){document.getElementById(`lecture-${year}-${semester}`).innerText=details.lecture;document.getElementById(`lab-${year}-${semester}`).innerText=details.lab;document.getElementById(`credit_units-${year}-${semester}`).innerText=details.credit_units;}}});function filterTable(){const input=document.getElementById('search-data');const filter=input.value.toLowerCase();const tables=document.querySelectorAll('table');tables.forEach(table=>{const rows=table.getElementsByTagName('tr');for(let i=1;i<rows.length;i++){const cells=rows[i].getElementsByTagName('td');let match=false;for(let j=0;j<cells.length;j++){if(cells[j]){const cellValue=cells[j].textContent||cells[j].innerText;if(cellValue.toLowerCase().indexOf(filter)>-1){match=true;break;}}}
rows[i].style.display=match?'':'none';}});};