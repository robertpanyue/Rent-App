const express = require('express');
const router = express.Router();
const firebase = require('firebase');
const userDB = require('../data/users');
router.get('/', async (req, res) => {
	try {
		if (req.session && req.session.user) {
			res.redirect('/main');
		} else {
			res.render('pages/login', { title: 'Login' });
		}
	} catch (error) {
		res.status(400).render('pages/error', {
			errorMessage: 'Login GET Error',
			title: 'Error'
		});
	}
});

router.post('/', async (req, res) => {
	if (!req.body.email || !req.body.password) {
		res.status(400).render('pages/error', {
			errorMessage: 'Login POST Error' + ` You should input email and password`,
			title: 'Error'
		});
	}

	try {
		firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);
		firebase
			.auth()
			.signInWithEmailAndPassword(req.body.email, req.body.password)
			.then((cred) => {
				req.session.user = cred.user.uid;
			})
			.then(() => {
				firebase.auth().signOut();
			})
			.then(() => {
				res.redirect('/main');
			})
			.catch(() => {
				res.render('pages/login', { title: 'Login', error: true, message: 'Your username and password are invalid' });
			});
	} catch (error) {
		res.status(400).render('pages/error', {
			errorMessage: 'Login POST Error' + ` ${error}`,
			title: 'Error'
		});
	}
});

module.exports = router;
