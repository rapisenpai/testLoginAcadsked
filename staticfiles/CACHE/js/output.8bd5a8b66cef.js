const totals={'First Year':{'1st Semester':{'lecture':1,'lab':1,'credit_units':2}},'Fourth Year':{'2nd Semester':{'lecture':8,'lab':1,'credit_units':9}}};document.addEventListener("DOMContentLoaded",function(){for(const[year,semesters]of Object.entries(totals)){for(const[semester,details]of Object.entries(semesters)){document.getElementById(`lecture-${year}-${semester}`).innerText=details.lecture;document.getElementById(`lab-${year}-${semester}`).innerText=details.lab;document.getElementById(`credit_units-${year}-${semester}`).innerText=details.credit_units;}}});;