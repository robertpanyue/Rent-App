const express = require('express');
const router = express.Router();
const firebase = require('firebase');
const firebaseAuth = require('firebase/auth');

router.get('/', async (req, res) => {
	console.log('get register');
	try {
		res.render('pages/register');
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
		// firebase.auth().createUserWithEmailAndPassword(req.body.email, req.body.password).catch(function(error) {
		//     res.status(400).render('pages/error', {
		//         errorMessage: 'Register Post Error' + `${error}`,
		//         title: 'Error'
		//     });
		// });
		res.redirect('/main');
	} catch (error) {
		res.status(400).render('pages/error', {
			errorMessage: 'Register Post Error!' + `${error}`,
			title: 'Error'
		});
	}
});

module.exports = router;
