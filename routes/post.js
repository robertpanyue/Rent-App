const express = require('express');
const router = express.Router();
const firebase = require('firebase');

router.get('/', (req, res) => {
	try {
		res.render('pages/cloudinary', { });
	} catch (e) {
		res.status(400).render('pages/error', { errorMessage: 'newPost page Error', title: 'Error' });
	}
});

module.exports = router;
