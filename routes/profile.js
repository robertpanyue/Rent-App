const express = require('express');
const router = express.Router();
const userDB = require('../data/users');

router.get('/', async (req, res) => {
	try {
		if (req.session && req.session.user) {
			res.render('pages/userProfile');
		} else {
			res.redirect('/login');
		}
	} catch (error) {
		res.status(400).render('pages/error', {
			errorMessage: 'Logout GET Error',
			title: 'Error'
		});
	}
});

module.exports = router;
