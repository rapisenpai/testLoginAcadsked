const totals={'First Year':{'1st Semester':{'lecture':3,'lab':2,'credit_units':5},'2nd Semester':{'lecture':1,'lab':2,'credit_units':3},'3rd Semester':{'lecture':4,'lab':3,'credit_units':7}}};document.addEventListener("DOMContentLoaded",function(){for(const[year,semesters]of Object.entries(totals)){for(const[semester,details]of Object.entries(semesters)){document.getElementById(`lecture-${year}-${semester}`).innerText=details.lecture;document.getElementById(`lab-${year}-${semester}`).innerText=details.lab;document.getElementById(`credit_units-${year}-${semester}`).innerText=details.credit_units;}}});;