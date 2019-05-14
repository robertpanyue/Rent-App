const express = require('express');
const router = express.Router();
const userData = require('../data/users');
const itemData = require('../data/items');
const { ObjectId } = require('mongodb');

router.get('/', async (req, res) => {
	try {
		if (req.session && req.session.user) {
			const user = await userData.get(req.session.user);
			const itemIds = user.itemsListed.concat(user.itemsRequested);
			items = [];
			for (index = 0; index < itemIds.length; index++) {
				items.push(await itemData.get(String(itemIds[index])));
			}

			res.render('pages/userProfile', { title: 'User Profile', person: user, resultList: items });
		} else {
			res.render('pages/login', { title: 'Login', err: 'You must login first' });
		}
	} catch (error) {
		res.status(400).render('pages/error', {
			errorMessage: 'profile GET Error',
			title: 'Error'
		});
	}
});

module.exports = router;
