const express = require('express');
const router = express.Router();
const firebase = require('firebase');
const userDB = require('../data/users');
const bcrypt = require('../bcrypt_usage');

router.get('/', async (req, res) => {
	try {
		if (req.session && req.session.user) {
			res.redirect('/main');
		} else {
			res.render('pages/register', { title: 'Register' });
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
			.then(async (cred) => {
				//push the user date to the database
				try {
					const user = await userDB.create(
						cred.user.uid,
						req.body.name,
						req.body.email,
						req.body.phone,
						req.body.city,
						req.body.state,
						req.body.zip,
						await bcrypt.getHashPassword(req.body.password)
					);
					req.session.user = cred.user.uid;
				} catch (error) {
					res.status(500).render('pages/error', {
						errorMessage: 'Register DB Post Error ' + `${error}`,
						title: 'Error'
					});
				}
			})
			.then(() => {
				firebase.auth().signOut();
			})
			.then(() => {
				res.redirect('/main');
			})
			.catch(function(error) {
				res.status(400).render('pages/error', {
					errorMessage: 'Register Post Error ' + `${error}`,
					title: 'Error'
				});
			});
	} catch (error) {
		res.status(400).render('pages/error', {
			errorMessage: 'Register Post Error! ' + `${error}`,
			title: 'Error'
		});
	}
});

module.exports = router;
