const express = require('express');
const router = express.Router();

router.get('/main', async (req, res) => {
	try {
		res.render('pages/mainPageSearch');
	} catch (error) {
		res.status(400).render('pages/error', {
			errorMessage: 'MainPage Error',
			title: 'Error'
		});
	}
});

module.exports = router;
