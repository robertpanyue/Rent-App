const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
	try {
		if (req.session && req.session.user) {
			req.session.destroy();
		res.render('pages/logout', { title: 'Logout' });
		} else {
			res.render('pages/login', { title: 'Login',err:"You must login first to logout" });
		}
		
	} catch (error) {
		res.status(400).render('pages/error', {
			errorMessage: 'Logout GET Error',
			title: 'Error'
		});
	}
});

module.exports = router;
