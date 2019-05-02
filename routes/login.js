const express = require('express');
const router = express.Router();
const firebase = require('firebase');
const userDB = require('../data/users');
router.get('/', async (req, res) => {
	try {
		if (firebase.auth().currentUser) {
			res.redirect('/main');
		} else {
			res.render('pages/login');
		}
	} catch (error) {
		res.status(400).render('pages/error', {
			errorMessage: 'Login GET Error',
			title: 'Error'
		});
	}
});

router.post('/', async (req, res) => {
	try {
		firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);
		firebase
			.auth()
			.signInWithEmailAndPassword(req.body.email, req.body.password)
			.then((cred) => {
				req.session.user = cred.user.uid;

				firebase.auth().signOut();
			})
			.then(() => {
				res.redirect('/main');
			});
	} catch (error) {
		res.status(400).render('pages/error', {
			errorMessage: 'Login POST Error' + ` ${error}`,
			title: 'Error'
		});
	}
});

module.exports = router;
