const form = document.querySelector('form');
const registerButton = document.getElementById('signup');
const loginButton = document.getElementById('login');

loginButton.addEventListener('click', async (event) => {
	event.preventDefault();

	const email = document.getElementById('email').value;
	const password = document.getElementById('loginPass').value;


	try {
		const res = await fetch('login', { 
	  	method: 'POST', 
	  	body: JSON.stringify({ email, password }),
	  	headers: {'Content-Type': 'application/json'}
	});

		const data = await res.json();

		if (data.errors) {
			if (data.errors.email) {
				document.getElementById('email').value = "";
				document.getElementById('email').placeholder = data.errors.email;
				document.getElementById('email').classList.add('form-validation-color');
			}

			if (data.errors.password) {
				document.getElementById('loginPass').value = "";
				document.getElementById('loginPass').placeholder = data.errors.password;
				document.getElementById('loginPass').classList.add('form-validation-color');
			}
		}

		if (data.user) {
			location.assign('/accountRoutes/account');
		}

	} catch (err) {
		console.log(err);
	}
});

registerButton.addEventListener('click', async (event) => {
	event.preventDefault();

	// get values
	const name = document.getElementById('name').value;
	const email = document.getElementById('signupEmail').value;
	const password = document.getElementById('pass').value;
	const rePassword = document.getElementById('re_pass').value;

	try {
		const res = await fetch('signup', { 
		  method: 'POST', 
		  body: JSON.stringify({ name, email, password, rePassword }),
		  headers: {'Content-Type': 'application/json'}
		});

		const data = await res.json();

		if (data.errors) {
			if (data.errors.name) {
		  		document.getElementById('name').value = "";
		  		document.getElementById('name').placeholder = data.errors.name;
		  		document.getElementById('name').classList.add('form-validation-color');
		  	}

		  	if (data.errors.email) {
		  		document.getElementById('signupEmail').placeholder = data.errors.email;
		  		document.getElementById('signupEmail').value = "";
		  		document.getElementById('signupEmail').classList.add('form-validation-color');
		  	}

		  	if (data.errors.password) {
		  		document.getElementById('pass').placeholder = data.errors.password;
		  		document.getElementById('pass').value = "";
		  		document.getElementById('pass').classList.add('form-validation-color');
		  	}

		  	if (data.errors.rePassword) {
		  		document.getElementById('re_pass').placeholder = data.errors.rePassword;
		  		document.getElementById('re_pass').value = "";
		  		document.getElementById('re_pass').classList.add('form-validation-color');
		  	}

		}
	  	

		if (data.user) {
			location.assign('/accountRoutes/account');
		}

	} catch (err) {
	  console.log(err);
	}
});