$(document).ready(function() {
	const item = window.location.pathname;
	var splittable = item.split('/');
	string1 = splittable[0];
	string2 = splittable[1];
	$.ajax = {
		url: `/search/result/${string2}`
	};
});
