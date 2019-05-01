const express = require('express');
const router = express.Router();
const firebase = require('firebase');


router.get('/', (req, res) => {
	try {
		res.render('pages/listing', { });
	} catch (e) {
		res.status(400).render('pages/error', { errorMessage: 'listing page Error', title: 'Error' });
	}
});

router.post('/', (req, res) => {
	console.log(req.body);
	debugger	
	res.render('pages/cloudinary', { });
});

router.get('/cloud', (req, res) => {
	try {
		res.render('pages/cloudinary', { });
	} catch (e) {
		res.status(400).render('pages/error', { errorMessage: 'listing page Error', title: 'Error' });
	}
});

module.exports = router;
