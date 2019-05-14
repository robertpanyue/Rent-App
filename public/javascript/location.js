function geoFindMe() {
	// const status = document.querySelector('#status');
	const button = document.querySelector('#find-me');
	const inputText = document.querySelector('#city');
	function success(position) {
		const lat = position.coords.latitude;
		const long = position.coords.longitude;
		var point = new google.maps.LatLng(lat, long);
		var city = '';
		new google.maps.Geocoder().geocode({ latLng: point }, function(res, status) {
			var component = res[0].address_components;
			for (let i = 0; i < component.length; i++) {
				for (let j = 0; j < component[i].types.length; j++) {
					if (component[i].types[j] == 'locality') {
						city = component[i].long_name;
					}
				}
			}
			var zip = res[0].formatted_address.match(/,\s\w{2}\s(\d{5})/);
			button.textContent = `Done`;
			inputText.value = city;
		});
	}

	function error() {
		button.textContent = 'Unable to retrieve your location';
	}

	if (!navigator.geolocation) {
		button.textContent = 'Geolocation is not supported by your browser';
	} else {
		button.textContent = 'Locating…';
		navigator.geolocation.getCurrentPosition(success, error);
	}
}

document.querySelector('#find-me').addEventListener('click', geoFindMe);

$(document).keypress(function(event) {
	if (event.which == '13') {
		event.preventDefault();
	}
});
