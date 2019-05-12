const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
	try {
		if (req.session && req.session.user) {
			res.redirect('/main');
		} else {
			res.render('pages/landingpage', {title: "Rent-App"});
		}	
	} catch (error) {
		res.status(400).render('pages/error', {
			errorMessage: 'Login GET Error',
			title: 'Error'
		});
	}
});

module.exports = router;
