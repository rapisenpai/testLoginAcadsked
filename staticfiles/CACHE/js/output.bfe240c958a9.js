const totals={'First Year':{'2nd Semester':{'lecture':11,'lab':1,'credit_units':12}}};document.addEventListener("DOMContentLoaded",function(){for(const[year,semesters]of Object.entries(totals)){for(const[semester,details]of Object.entries(semesters)){document.getElementById(`lecture-${year}-${semester}`).innerText=details.lecture;document.getElementById(`lab-${year}-${semester}`).innerText=details.lab;document.getElementById(`credit_units-${year}-${semester}`).innerText=details.credit_units;}}});;