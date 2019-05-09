const express = require('express');
const router = express.Router();
const firebase = require('firebase');

router.get('/listed', (req, res) => {
	try {
		res.render('pages/searchResults', {type:"Listed" });
	} catch (e) {
		res.status(400).render('pages/error', { errorMessage: 'newPost page Error', title: 'Error' });
	}
});
router.get('/requested', (req, res) => {
	try {
		res.render('pages/searchResults', {type:"Requested"});
	} catch (e) {
		res.status(400).render('pages/error', { errorMessage: 'newPost page Error', title: 'Error' });
	}
});

module.exports = router;
