const submitButton = document.getElementById('loginButton');

submitButton.addEventListener('click', async (event) => {
	event.preventDefault();

	const title = document.getElementById('title').value;
	let recipients = document.querySelectorAll('#recipients option:checked');
	recipients = Array.from(recipients).map(el => el.value);
	const grade = document.getElementById('grade').value;
	const type = document.getElementById('type').value;
	const department = document.getElementById('departments').value;


	if (title == "") {
		document.getElementById('title').value = "";
		document.getElementById('title').placeholder = "Please fill in this field";
		document.getElementById('title').classList.add('form-validation-color');
	}

	if (type == "") {
		document.getElementById('type').value = "";
		document.getElementById('type').placeholder = "Please fill in this field";
		document.getElementById('type').classList.add('form-validation-color');
	}

	if (grade == "") {
		document.getElementById('grade').value = "";
		document.getElementById('grade').placeholder = "Please fill in this field";
		document.getElementById('grade').classList.add('form-validation-color');
	}

	if (recipients == "") {
		document.getElementById('recipient').value = "";
		document.getElementById('recipient').placeholder = "Please fill in this field";
		document.getElementById('recipient').classList.add('form-validation-color');
	}

	else {

		try {
			const res = await fetch('newCertificate', { 
		  method: 'POST', 
		  body: JSON.stringify({ title, recipients, grade, type, department }),
		  headers: {'Content-Type': 'application/json'}
		});

			const data = await res.json();


			if (data) {
				location.assign('/accountRoutes/account');
			}


		} catch (err) {
			console.log(err);
		}
	}
});