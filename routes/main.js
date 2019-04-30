const express = require('express');
const router = express.Router();
const firebase = require('firebase');
const firebaseAuth = require('firebase/auth');

router.get('/', async (req, res) => {
	try {
		if (firebase.auth().currentUser) {
			console.log(firebase.auth().currentUser);
			res.render('pages/mainPageSearch');
		} else {
			res.render('pages/error', { errorMessage: 'You do not have authentication', title: '403' });
		}
	} catch (error) {
		res.status(400).render('pages/error', {
			errorMessage: 'MainPage Error',
			title: 'Error'
		});
	}
});

module.exports = router;
