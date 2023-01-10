$(".col-9").hide();
$(".col-3").hide();
$(function(){
    $(".col-9").fadeIn("slow");
    $(".col-3").fadeIn("slow");
});


$(document).ready(function(){ 
  $(".add_department").click(function() {
    $("#departmentRow").fadeOut("slow",function(){
        $("#department_form").fadeIn("slow");
    });
  });

  $("#cancelButton").click(function() {
  	$("#department_form").fadeOut("slow", function() {
  		$("#departmentRow").fadeIn("slow");
  	});
  })

  $(".switch_account").click(function() {
  	var contentPanelId = jQuery(this).attr("id");
    $('#' + contentPanelId + "text").fadeOut("slow",function(){
    	$('#' + contentPanelId + "enterPass").fadeIn("slow");



    	$(".close").click(function() {
    		$('#' + contentPanelId + "enterPass").fadeOut("slow", function() {
    			$('#' + contentPanelId + "text").fadeIn("slow")
    		});
    	});
    });
  });
});





const form = document.querySelector('form');
const createButton = document.getElementById('account');
const switchButton = document.getElementById('departmentLogin');
const walletId = document.getElementById('walletId').innerHTML;

createButton.addEventListener('click', async (event) => {
	event.preventDefault();

	const name = document.getElementById('name').value;
	const email = document.getElementById('email').value;
	const password = document.getElementById('pass').value;
	const rePassword = document.getElementById('rePass').value;

	try {
		const res = await fetch('/accountRoutes/account', { 
	  method: 'POST', 
	  body: JSON.stringify({ name, email, password, rePassword, walletId }),
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
	  		document.getElementById('email').placeholder = data.errors.email;
	  		document.getElementById('email').value = "";
	  		document.getElementById('email').classList.add('form-validation-color');
	  	}

			if (data.errors.password) {
				document.getElementById('password').value = "";
				document.getElementById('password').placeholder = data.errors.password;
				document.getElementById('password').classList.add('form-validation-color');
			}
			if (data.errors.rePassword) {
	  		document.getElementById('rePassword').placeholder = data.errors.rePassword;
	  		document.getElementById('rePassword').value = "";
	  		document.getElementById('rePassword').classList.add('form-validation-color');
	  		document.getElementById('password').value = "";
				document.getElementById('password').placeholder = data.errors.rePassword;
				document.getElementById('password').classList.add('form-validation-color');
	  	}
		}

		if (data.department) {
			location.assign('/accountRoutes/account');
		}



	} catch (err) {
		console.log(err);

	}
});



switchButton.addEventListener('click', async (event) => {
	event.preventDefault();

	const email = document.getElementById('departmentEmail').innerHTML;
	const password = document.getElementById('switchPass').value;

	try {
		const res = await fetch('/accountRoutes/departmentLogin', { 
	  method: 'POST', 
	  body: JSON.stringify({ email, password }),
	  headers: {'Content-Type': 'application/json'}
	});

		const data = await res.json();

		if (data.errors) {

			if (data.errors.password) {
				document.getElementById('loginPass').value = "";
				document.getElementById('loginPass').placeholder = data.errors.password;
				document.getElementById('loginPass').classList.add('form-validation-color');
			}
		}

		if (data.department) {
			location.assign('/accountRoutes/account');
		}

	} catch (err) {
		console.log(err);
	}
})