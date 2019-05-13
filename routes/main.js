const express = require('express');
const router = express.Router();
const data = require('../data');
const items = data.items;
const users = data.users;
router.get('/', async (req, res) => {
	try {
		if (req.session && req.session.user) {
			const allItems = await items.getAll();
			const itemList = allItems.slice(-8);
			for (let i = 0; i < itemList.length; i++) {
				let user = await users.get(itemList[i].userId);
				itemList[i].email = user.email;
				itemList[i].phoneNumber = user.phoneNumber;
				itemList[i].name = user.name;
			}
			res.render('pages/mainPageSearch', {
				title: 'Main Page',
				img1: itemList[0],
				img2: itemList[1],
				img3: itemList[2],
				img4: itemList[3],
				img5: itemList[4],
				img6: itemList[5],
				img7: itemList[6],
				img8: itemList[7],
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
