let autocomplete;

function initAutocomplete() {
	// Create the autocomplete object, restricting the search predictions to
	// geographical location types.
	let autocomplete = new google.maps.places.Autocomplete(document.getElementById('address'), {
		types: [ 'geocode' ],
		componentRestrictions: { country: 'us' }
	});

	// Avoid paying for data that you don't need by restricting the set of
	// place fields that are returned to just the address components.
	autocomplete.setFields([ 'address_component' ]);

	autocomplete.addListener('place_changed', function() {
		let place = autocomplete.getPlace();
		for (index in place.address_components) {
			if (place.address_components[index].types.length == 1) {
				if (place.address_components[index].types[0] == 'postal_code') {
					// console.log(place.address_components[index].long_name);
					document.getElementById('postal_code').value = place.address_components[index].long_name;
				}
			}
		}
	});
}

$(document).keypress(function(event) {
	if (event.which == '13') {
		event.preventDefault();
	}
});
