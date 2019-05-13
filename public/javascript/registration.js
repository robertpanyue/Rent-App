$(document).ready(function() {
	let confirmPassword = document.getElementById('confirmPassword');
	let lengthOK = false;
	let matchOK = false;

	let removeError = function() {
		let button = $('#registerButton');

		if (lengthOK && matchOK) {
			button.prop('disabled', false);
		} else {
			button.prop('disabled', true);
		}
	};

	// check if confirmPassword exists in page
	if (confirmPassword) {
		// when something is typed into the field it will check if passwords are equal
		$('#password, #confirmPassword').on('keyup', function() {
			// need to clean up error message
			if ($('#password').val().length < 6) {
				lengthOK = false;
				$('#passwordLength').html('Password must be at least 6 characters long').css('color', 'red');
			} else {
				lengthOK = true;
				$('#passwordLength').html('');
			}

			if ($('#password').val() == $('#confirmPassword').val()) {
				matchOK = true;
				$('#passwordMatch').html('');
			} else {
				matchOK = false;
				$('#passwordMatch').html('Not Matching').css('color', 'red');
			}

			removeError();
		});
	}

	$('#registerButton').on('click', function() {
		var name = $('#name').val();
		var email = $('#email').val();
		var password = $('#confirmPassword').val();
		var phone = $('#phone').val();
		var city = $('#city').val();
		var state = $('#state').val();
		var zip = $('#zip').val();

		$.ajax = {
			url: '/register',
			type: 'post',
			data: { name, email, password, phone, city, state, zip },
			success: function(data) {
				console.log('successfullu register');
			}
		};
	});
});
