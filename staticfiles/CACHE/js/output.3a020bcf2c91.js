const totals={'First Year':{'1st Semester':{'lecture':38,'lab':6,'credit_units':44},'2nd Semester':{'lecture':43,'lab':4,'credit_units':47}},'Second Year':{'1st Semester':{'lecture':35,'lab':5,'credit_units':40},'2nd Semester':{'lecture':38,'lab':5,'credit_units':43}},'Third Year':{'1st Semester':{'lecture':33,'lab':6,'credit_units':39},'2nd Semester':{'lecture':33,'lab':6,'credit_units':39}},'Fourth Year':{'1st Semester':{'lecture':21,'lab':6,'credit_units':27},'2nd Semester':{'lecture':16,'lab':2,'credit_units':18}}};document.addEventListener("DOMContentLoaded",function(){for(const[year,semesters]of Object.entries(totals)){for(const[semester,details]of Object.entries(semesters)){document.getElementById(`lecture-${year}-${semester}`).innerText=details.lecture;document.getElementById(`lab-${year}-${semester}`).innerText=details.lab;document.getElementById(`credit_units-${year}-${semester}`).innerText=details.credit_units;}}});;