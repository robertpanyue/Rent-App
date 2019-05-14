const express = require('express');
const router = express.Router();
const data = require('../data');
const xss = require('xss');
const cloudinary = require('cloudinary').v2;
const itemData = data.items;
const userData = data.users;

router.get('/', (req, res) => {
	try {
		if (req.session && req.session.user) {
			res.render('pages/listing', { title: 'New Listing' });
		} else {
			res.render('pages/login', { title: 'Login',err:"You must login first" });
		}
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
				req.body.price,
			);

			let user = await userData.get(req.session.user);
			if (req.body.reqOrPost === 'Post') {
				userData.updateItemList(String(xss(user._id)), String(xss(item._id)));
			} else if (req.body.reqOrPost === 'Request') {
				userData.updateRequestList(String(xss(user._id)), String(xss(item._id)));
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
		if (req.session && req.session.user) {
			let turls = await itemData.getThumbnailURL(String(xss(req.params.id)));
			res.render('pages/images', { images: turls ,title:"Image uploader"});
		} else {
			res.redirect('/login');
		}
	} catch (e) {
		console.log(e);
		res.status(400).render('pages/error', { errorMessage: 'listing page Error', title: 'Error' });
	}
});



router.post('/images/add/addCloudinary/:id', (req, res) => {
	try {
		if (req.session && req.session.user) {
			itemData.updateCloudinary(String(xss(req.params.id)), xss(req.body.url), xss(req.body.turl));
			res.sendStatus(200);
		} else {
			res.sendStatus(400);
		}
	} catch (e) {
		console.log(e);
		res.sendStatus(400);
	}
});

router.post('/edit/addCloudinary/:id', (req, res) => {
	try {
		if (req.session && req.session.user) {
			itemData.updateCloudinary(String(xss(req.params.id)), xss(req.body.url), xss(req.body.turl));
			res.sendStatus(200);
		} else {
			res.sendStatus(400);
		}
	} catch (e) {
		console.log(e);
		res.sendStatus(400);
	}
});

router.post('/edit/removeCloudinary/:id', (req, res) => {
	try {
		if (req.session && req.session.user) {
			itemData.removeCloudinary(String(req.params.id), req.body.url, req.body.turl);
			cloudinary.api.delete_resources([req.body.publicId],
			  function(error, result){
					console.log(result);
				}
			);
			res.sendStatus(200);
		} else {
			res.sendStatus(400);
		}
	} catch (e) {
		console.log(e);
		res.status(400).render('pages/error', { errorMessage: 'listing page Error', title: 'Error' });
	}
});

router.get('/edit/:id', async (req, res) => {
	try {
		if (req.session && req.session.user) {
			let item = await itemData.get(String(xss(req.params.id)));
			let urls = await itemData.getCloudinaryURL(String(xss(req.params.id)));
			let turls = await itemData.getThumbnailURL(String(xss(req.params.id)));

			let images = [];
			let toggleStatus = "";

			for (index in urls) {
				images.push({
					url: urls[index],
					turl: turls[index]
				});
			}

			if (item.status === "open") {
				toggleStatus = "Close Listing"
			} else if (item.status === "close") {
				toggleStatus = "Open Listing"
			} else {
				toggleStatus = "NANI?";
			}

			res.render('pages/viewListing', { item: item, images: images, status: toggleStatus });
		} else {
			res.redirect('/login');
		}
	} catch (e) {
		console.log(e);
		res.status(400).render('pages/error', { errorMessage: 'listing page Error', title: 'Error' });
	}
});

router.post('/update/:id', async (req, res) => {
	try {
		if (req.session && req.session.user) {
			// let item = await itemData.get(req.params.id);
			let addr = req.body.address.split(',');
			let item = await itemData.update(
				req.params.id,
				req.body.startDate,
				req.body.endDate,
				req.body.reqOrPost,
				req.body.status,
				req.session.user,
				req.body.itemName,
				req.body.itemDesc,
				addr[0],
				addr[1],
				addr[2],
				req.body.postal_code,
				req.body.price,
			);
			res.redirect('/profile');
		} else {
			res.redirect('/login');
		}
	} catch (e) {
		console.log(e);
		res.status(400).render('pages/error', { errorMessage: 'listing page Error', title: 'Error' });
	}
});

module.exports = router;
