const totals={'First Year':{'1st Semester':{'lecture':26,'lab':5,'credit_units':31},'2nd Semester':{'lecture':22,'lab':1,'credit_units':23}},'Second Year':{'1st Semester':{'lecture':10,'lab':1,'credit_units':11}}};document.addEventListener("DOMContentLoaded",function(){for(const[year,semesters]of Object.entries(totals)){for(const[semester,details]of Object.entries(semesters)){document.getElementById(`lecture-${year}-${semester}`).innerText=details.lecture;document.getElementById(`lab-${year}-${semester}`).innerText=details.lab;document.getElementById(`credit_units-${year}-${semester}`).innerText=details.credit_units;}}});;