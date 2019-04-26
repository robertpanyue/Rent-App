const express = require('express');
const router = express.Router();

router.get('/register', async (req, res) => {
	try {
		res.render('pages/Register');
	} catch (error) {
		res.status(400).render('pages/error', {
			errorMessage: 'Register Error',
			title: 'Error'
		});
	}
});

module.exports = router;
