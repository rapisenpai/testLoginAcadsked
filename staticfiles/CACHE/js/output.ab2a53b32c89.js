const totals={'First Year':{'1st Semester':{'lecture':2147483666,'lab':2147483650,'credit_units':2147483669},'2nd Semester':{'lecture':21,'lab':2,'credit_units':23}},'Second Year':{'1st Semester':{'lecture':18,'lab':2,'credit_units':20},'2nd Semester':{'lecture':21,'lab':2,'credit_units':23}},'Third Year':{'1st Semester':{'lecture':18,'lab':3,'credit_units':21},'2nd Semester':{'lecture':19,'lab':2,'credit_units':21}},'Fourth Year':{'1st Semester':{'lecture':7,'lab':2,'credit_units':9},'2nd Semester':{'lecture':8,'lab':1,'credit_units':9}}};document.addEventListener("DOMContentLoaded",function(){for(const[year,semesters]of Object.entries(totals)){for(const[semester,details]of Object.entries(semesters)){document.getElementById(`lecture-${year}-${semester}`).innerText=details.lecture;document.getElementById(`lab-${year}-${semester}`).innerText=details.lab;document.getElementById(`credit_units-${year}-${semester}`).innerText=details.credit_units;}}});;