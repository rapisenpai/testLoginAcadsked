const totals={'First Year':{'1st Semester':{'lecture':22,'lab':3,'credit_units':25},'2nd Semester':{'lecture':21,'lab':2,'credit_units':23}},'Second Year':{'1st Semester':{'lecture':15,'lab':2,'credit_units':17}}};document.addEventListener("DOMContentLoaded",function(){for(const[year,semesters]of Object.entries(totals)){for(const[semester,details]of Object.entries(semesters)){document.getElementById(`lecture-${year}-${semester}`).innerText=details.lecture;document.getElementById(`lab-${year}-${semester}`).innerText=details.lab;document.getElementById(`credit_units-${year}-${semester}`).innerText=details.credit_units;}}});;