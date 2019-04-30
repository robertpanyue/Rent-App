const express = require('express');
const router = express.Router();
const firebase = require('firebase');

router.get('/', async (req, res) => {
	try {
		firebase.auth().signOut();
		res.render('pages/logout');
	} catch (error) {
		res.status(400).render('pages/error', {
			errorMessage: 'Logout GET Error',
			title: 'Error'
		});
	}
});

module.exports = router;
