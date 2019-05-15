$(document).ready(function() {
	let sDateOK = false;
	let eDateOK = false;
	let dateOK = false;
	let priceOK = false;

	let removeError = function() {
		let button = $('#submitListing');

		if (dateOK && sDate && eDate && priceOK) {
			button.prop('disabled', false);
		} else {
			button.prop('disabled', true);
		}
	};

	$('#startDate, #endDate').change(function() {
		if (!$('#startDate').val()) {
			sDateOK = false;
			$('#sDate').html('Must have a valid start date!').css('color', 'red');
		} else {
			sDateOK = true;
			$('#sDate').html('');
		}
		if (!$('#endDate').val()) {
			eDateOK = false;
			$('#eDate').html('Must have a valid end date!').css('color', 'red');
		} else {
			eDateOK = true;
			$('#eDate').html('');
		}
		if ($('#startDate').val() && $('#endDate').val()) {
			if (Date.parse($('#startDate').val()) <= Date.parse($('#endDate').val())) {
				dateOK = true;
				$('#validDate').html('');
			} else {
				dateOK = false;
				$('#validDate').html('End date must be later than or the same as the start date!').css('color', 'red');
			}
		}
		removeError();
	});

	$('#price').change(function() {
		if (parseInt($('#price').val()) > 0) {
			priceOK = true;
			$('#validPrice').html('');
		} else {
			priceOK = false;
			$('#validPrice').html('Price must be greater than 0!').css('color', 'red');
		}
		removeError();
	});

	$('#submitListing').click(function(e) {
		if ($('#address').val()) {
			if (($('#address').val().match(/,/g) || []).length == 3) {
				$('#validAddress').html('');
			} else {
				e.preventDefault();
				$('#validAddress').html('Please use the Google Maps Auto Complete Feature to select and an address that includes street, city, state, country.').css('color', 'red');
			}
		}
	});
});

$(document).keypress(function(event) {
	if (event.which == '13') {
		event.preventDefault();
	}
});
