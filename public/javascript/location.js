function geoFindMe() {
	// const status = document.querySelector('#status');
	const button = document.querySelector('#find-me');

	function success(position) {
		const lat = position.coords.latitude;
		const long = position.coords.longitude;
		var point = new google.maps.LatLng(lat, long);
		new google.maps.Geocoder().geocode({ latLng: point }, function(res, status) {
			var zip = res[0].formatted_address.match(/,\s\w{2}\s(\d{5})/);
			button.textContent = `Zip: ${zip[1]}`;
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
