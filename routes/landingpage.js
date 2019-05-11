const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
	try {
			res.render('pages/landingpage');
	} catch (error) {
		res.status(400).render('pages/error', {
			errorMessage: 'Login GET Error',
			title: 'Error'
		});
	}
});

module.exports = router;
