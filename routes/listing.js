const express = require('express');
const router = express.Router();
const firebase = require('firebase');
const data = require('../data');
const itemData = data.items;

router.get('/', (req, res) => {
	try {
		res.render('pages/listing', { });
	} catch (e) {
		res.status(400).render('pages/error', { errorMessage: 'listing page Error', title: 'Error' });
	}
});

router.post('/', (req, res) => {
	console.log(req.body);
	itemData.create(
		req.body.startDate,
		req.body.endDate,
		req.body.reqOrPost,
		'open',
		'temp',
		req.body.itemName,
		req.body.itemDesc,
		req.body.address,
		req.body.price
	);
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
