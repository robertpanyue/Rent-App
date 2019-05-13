const express = require('express');
const router = express.Router();
const userDB = require('../data/users');
const itemDB= require('../data/items')
router.get('/', async (req, res) => {
	try {
		if (req.session && req.session.user) {
			const user=await userDB.get(req.session.user)
			const arr=user['itemsListed'].concat(user['itemsRequested'])
			arr2=[]
			for(let i=0;i<arr.length;i++){
				const item=await itemDB.get(String(arr[i]))
				arr2.push(item)
			}
			console.log(arr2)
			res.render('pages/userProfile', { title: 'User Profile',person:user,resultList:arr2});
		} else {
			res.redirect('/login');
		}
	} catch (error) {
		res.status(400).render('pages/error', {
			errorMessage: 'Profile GET Error'+ `${error}`,
			title: 'Error'
		});
	}
});

module.exports = router;
