const express = require('express');
const router = express.Router();
const data = require('../data');
const cloudinary = require('cloudinary').v2;
const itemData = data.items;
const userData = data.users;

router.get('/', (req, res) => {
	try {
		res.render('pages/listing', { title: 'Post Listing' });
	} catch (e) {
		res.status(400).render('pages/error', { errorMessage: 'listing page Error', title: 'Error' });
	}
});

router.post('/', async (req, res) => {
	try {
		if (req.session && req.session.user) {
			let addr = req.body.address.split(',');

			let item = await itemData.create(
				req.body.startDate,
				req.body.endDate,
				req.body.reqOrPost,
				'open',
				req.session.user,
				req.body.itemName,
				req.body.itemDesc,
				addr[0],
				addr[1],
				addr[2],
				req.body.postal_code,
				req.body.price
			);

			let user = await userData.get(req.session.user);
			if (req.body.reqOrPost === 'Post') {
				userData.updateItemList(String(user._id), String(item._id));
			} else if (req.body.reqOrPost === 'Request') {
				userData.updateRequestList(String(user._id), String(item._id));
			} else {
				console.log('item type is not listed nor requested');
			}

			res.redirect(`/listing/images/add/${item._id}`);
		} else {
			res.redirect('/login');
		}
	} catch (error) {
		console.log(error);
		res.status(400).render('pages/error', {
			errorMessage: 'Listing POST Error',
			title: 'Error'
		});
	}
});

router.get('/images/add/:id', async (req, res) => {
	try {
		let turls = await itemData.getThumbnailURL(String(req.params.id));
		res.render('pages/images', { images: turls });
	} catch (e) {
		console.log(e);
		res.status(400).render('pages/error', { errorMessage: 'listing page Error', title: 'Error' });
	}
});

router.post('/images/add/addCloudinary/:id', (req, res) => {
	try {
		itemData.updateCloudinary(String(req.params.id), req.body.url, req.body.turl);
		res.sendStatus(200);
	} catch (e) {
		console.log(e);
		res.sendStatus(400);
	}
});

router.post('/edit/addCloudinary/:id', (req, res) => {
	try {
		itemData.updateCloudinary(String(req.params.id), req.body.url, req.body.turl);
		res.sendStatus(200);
	} catch (e) {
		console.log(e);
		res.sendStatus(400);
	}
});

router.post('/edit/removeCloudinary/:id', (req, res) => {
	try {
		itemData.removeCloudinary(String(req.params.id), req.body.url, req.body.turl);
		cloudinary.api.delete_resources([req.body.publicId],
		  function(error, result){
				console.log(result);
			}
		);
		return;
	} catch (e) {
		console.log(e);
		res.status(400).render('pages/error', { errorMessage: 'listing page Error', title: 'Error' });
	}
});

router.get('/edit/:id', async (req, res) => {
	try {
		let item = await itemData.get(String(req.params.id));
		let urls = await itemData.getCloudinaryURL(String(req.params.id));
		let turls = await itemData.getThumbnailURL(String(req.params.id));

		let images = [];

		for (index in urls) {
			images.push({
				url: urls[index],
				turl: turls[index]
			});
		}
		console.log(images);
		res.render('pages/viewListing', { item: item, images: images });
	} catch (e) {
		console.log(e);
		res.status(400).render('pages/error', { errorMessage: 'listing page Error', title: 'Error' });
	}
});

router.put('/listing', async (req, res) => {
	try {
		let item = await itemData.get(req.params.id);
		res.render('pages/viewListing', { item: item });
	} catch (e) {
		console.log(e);
		res.status(400).render('pages/error', { errorMessage: 'listing page Error', title: 'Error' });
	}
});

module.exports = router;
