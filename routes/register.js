const express = require('express');
const router = express.Router();
const firebase = require('firebase');
const firebaseAuth = require('firebase/auth');
const userDB = require('../data/users');
const bcrypt = require('../bcrypt_usage');

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
		//signup user
		firebase
			.auth()
			.createUserWithEmailAndPassword(req.body.email, req.body.password)
			.then((cred) => {
				//push the user date to the database
				try {
					userDB.create(
						cred.user.uid,
						req.body.name,
						req.body.email,
						req.body.phone,
						req.body.city,
						req.body.state,
						req.body.zip,
						bcrypt.getHashPassword(req.body.password)
					);
				} catch (error) {
					res.status(500).render('pages/error', {
						errorMessage: 'Register DB Post Error' + `${error}`,
						title: 'Error'
					});
				}

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

module.exports = router;
