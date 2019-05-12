const express = require('express');
const router = express.Router();
const data = require('../data');
const items = data.items;
const users = data.users;
router.get('/', async (req, res) => {
	try {
		if (req.session && req.session.user) {
			const allItems = await items.getAll();
			const itemList = allItems.slice(0, 8);
			for (let i = 0; i < itemList.length; i++) {
				let user = await users.get(itemList[i].userId);
				itemList.email = user.email;
				itemList.phoneNumber = user.phoneNumber;
				itemList.userName = user.name;
			}
			res.render('pages/mainPageSearch', {
				title: 'Main Page',
				carouselItems: itemList
			});
		} else {
			res.render('pages/error', { errorMessage: 'You do not have authentication, please login to continue', title: '403' });
		}
	} catch (error) {
		res.status(400).render('pages/error', {
			errorMessage: 'MainPage Error' + `${error}`,
			title: 'Error'
		});
	}
});

module.exports = router;
