const express = require('express');
const router = express.Router();
const firebase = require('firebase');
const data = require('../data');
const itemData = data.items;
const userData = data.users;

router.get('/', (req, res) => {
	try {
		res.render('pages/listing', { });
	} catch (e) {
		res.status(400).render('pages/error', { errorMessage: 'listing page Error', title: 'Error' });
	}
});

router.post('/', async (req, res) => {
	console.log(req.body);
	console.log(req.session);
	console.log(req.session.user);
	try {
		if (req.session && req.session.user) {
			let item = await itemData.create(
				req.body.startDate,
				req.body.endDate,
				req.body.reqOrPost,
				'open',
				req.session.user,
				req.body.itemName,
				req.body.itemDesc,
				req.body.address,
				req.body.price
			);

			let user = await userData.get(req.session.user);
			if (req.body.reqOrPost === 'Listed') {
				user.updateItemList(item._id);
			} else if (req.body.reqOrPost === 'Requested') {
				user.updateRequestList(item._id);
			} else {
				console.log("item type is not listed or requested");
			}

			res.redirect(`/listing/images/${item._id}`);
		} else {
			res.redirect('/login');
		}
	} catch (error) {
		res.status(400).render('pages/error', {
			errorMessage: 'Listing POST Error',
			title: 'Error'
		});
	}
});

router.get('/images/:id', (req, res) => {
	try {
		res.render('pages/images', { });
	} catch (e) {
		res.status(400).render('pages/error', { errorMessage: 'listing page Error', title: 'Error' });
	}
});

module.exports = router;
