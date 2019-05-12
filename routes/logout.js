const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
	try {
		req.session.destroy();
		res.render('pages/logout', { title: 'Logout' });
	} catch (error) {
		res.status(400).render('pages/error', {
			errorMessage: 'Logout GET Error',
			title: 'Error'
		});
	}
});

module.exports = router;
