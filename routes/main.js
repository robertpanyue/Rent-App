const express = require('express');
const router = express.Router();
const data = require('../data');
const items = data.items;
const user = data.users;
router.get('/', async (req, res) => {
	try {
		if (req.session && req.session.user) {
			const allItems = await items.getAll();
			const itemList = allItems.slice(0, 8);
			const userInfo = [];
			for (let i = 0; i < itemList.length; i++) {
				userInfo.push(await user.get(itemList[i].userId));
			}
			res.render('pages/mainPageSearch', {
				title: 'Main Page',
				img1: itemList[0],
				user1: userInfo[0],
				img2: itemList[1],
				user2:userInfo[1],
				img3: itemList[2],
				user3:userInfo[2],
				img4: itemList[3],
				user:userInfo[3],
				img5: itemList[4],
				user5:userInfo[4],
				img6: itemList[5],
				user6:userInfo[5],
				img7: itemList[6],
				user7:userInfo[6],
				img8: itemList[7],
				user8:userInfo[7],
			});
		} else {
			res.render('pages/error', { errorMessage: 'You do not have authentication', title: '403' });
		}
	} catch (error) {
		res.status(400).render('pages/error', {
			errorMessage: 'MainPage Error' + `${error}`,
			title: 'Error'
		});
	}
});

module.exports = router;
