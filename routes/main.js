const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
	try {
		if (req.session && req.session.user) {
			res.render('pages/mainPageSearch', { title: 'Main Page' });
		} else {
			res.render('pages/error', { errorMessage: 'You do not have authentication', title: '403' });
		}
	} catch (error) {
		res.status(400).render('pages/error', {
			errorMessage: 'MainPage Error',
			title: 'Error'
		});
	}
});

module.exports = router;
