const express = require('express');
const router = express.Router();
const firebase = require('firebase');
const firebaseAuth = require('firebase/auth');

router.get('/', async (req, res) => {
	try {
		if (firebase.auth().currentUser) {
			res.redirect('/main');
		} else {
			res.render('pages/register');
		}
	} catch (error) {
		res.status(400).render('pages/error', {
			errorMessage: 'Register GET Error',
			title: 'Error'
		});
	}
});

router.post('/', async (req, res) => {
	try {
		console.log(`registered`);
		console.log(req.body.email);
		console.log(req.body.password);

		firebase
			.auth()
			.createUserWithEmailAndPassword(req.body.email, req.body.password)
			.then((cred) => {
				console.log(cred);
				res.redirect('/main');
			})
			.catch(function(error) {
				res.status(400).render('pages/error', {
					errorMessage: 'Register Post Error' + `${error}`,
					title: 'Error'
				});
			});
	} catch (error) {
		res.status(400).render('pages/error', {
			errorMessage: 'Register Post Error!' + `${error}`,
			title: 'Error'
		});
	}
});

router.post('/register', async (req, res) => {
	console.log('register submit');
	try {
		res.render('pages/register');
	} catch (error) {
		res.status(400).render('pages/error', {
			errorMessage: 'Register Error',
			title: 'Error'
		});
	}
});

module.exports = router;
