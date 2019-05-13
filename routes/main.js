const express = require('express');
const router = express.Router();
const data = require('../data');
const itemDB = data.items;
const userDB = data.users;
router.get('/', async (req, res) => {
	try {
		if (req.session && req.session.user) {
			const user=await userDB.get(req.session.user)
			const arr=user['itemsListed'].concat(user['itemsRequested'])
			arr2=[]
			for(let i=0;i<arr.length;i++){
				const item=await itemDB.get(String(arr[i]))
				const users=await userDB.get(String(item.userId))
				item['email']=users.email
				item['userName']=users.name
				item['phoneNumber']=users.phoneNumber
				arr2.push(item)
			}
			console.log(arr2)
			res.render('pages/mainPageSearch', { title: 'User Profile',person:user,resultList:arr2});
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
