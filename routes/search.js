const express = require('express');
const router = express.Router();
const db = require('../data/dbCollections');
const items = db.itemPosts;
const users = db.users;
const xss = require('xss');
router.get('/listings/:city/:item', async (req, res) => {
	try {
		if (req.session && req.session.user) {
			const keyWord = req.params.item;
			const location = req.params.city;
			const itemCollection = await items();
			const userCollection = await users();
			//get the result of the key word from the datbase
			const result = await itemCollection.find({ $text: { $search: keyWord } }).toArray();
			console.log(result);
			const returnArray = [];
			for (let i = 0; i < result.length; i++) {
				if (result[i].requested == 'Post' && result[i].city == location.toLowerCase().trim()) {
					let user = await userCollection.findOne({ _id: result[i].userId });
					result[i].userName = user.name;
					result[i].email = user.email;
					result[i].phoneNumber = user.phoneNumber;
					returnArray.push(result[i]);
				}
			}
			console.log(returnArray);
			res.render('pages/searchResult', { title: keyWord, type: 'Listings', resultList: returnArray });
		} else {
			res.render('pages/error', { errorMessage: 'You do not have authentication', title: '403' });
		}
	} catch (error) {
		res.status(400).render('pages/error', {
			errorMessage: 'Search Error' + `${error}`,
			title: 'Error'
		});
	}
});

router.get('/requests/:city/:item', async (req, res) => {
	try {
		if (req.session && req.session.user) {
			const keyWord = req.params.item;
			const location = req.params.city;
			const itemCollection = await items();
			const userCollection = await users();
			//get the result of the key word from the datbase
			const result = await itemCollection.find({ $text: { $search: keyWord } }).toArray();
			const returnArray = [];

			for (let i = 0; i < result.length; i++) {
				if (result[i].requested == 'Request' && result[i].city == location.toLowerCase().trim()) {
					let user = await userCollection.findOne({ _id: result[i].userId });
					result[i].userName = user.name;
					result[i].email = user.email;
					result[i].phoneNumber = user.phoneNumber;
					returnArray.push(result[i]);
				}
			}
			console.log(returnArray);
			res.render('pages/searchResult', { title: keyWord, type: 'Requests', resultList: returnArray });
		} else {
			res.render('pages/error', { errorMessage: 'You do not have authentication', title: '403' });
		}
	} catch (error) {
		res.status(400).render('pages/error', {
			errorMessage: 'Search Error' + `${error}`,
			title: 'Error'
		});
	}
});

router.post('/', async (req, res) => {
	try {
		if (req.session && req.session.user) {
			const searchType = xss(req.body.selectSearch);
			const searchCity = xss(req.body.cityContent);
			const input = xss(req.body.searchContent);
			if (searchType == 'Listings') {
				res.redirect(`/search/listings/${searchCity}/${input}`);
			} else {
				res.redirect(`/search/requests/${searchCity}/${input}`);
			}
		} else {
			res.render('pages/error', { errorMessage: 'You do not have authentication', title: '403' });
		}
	} catch (error) {
		res.status(400).render('pages/error', {
			errorMessage: 'Search Error',
			title: 'Error'
		});
	}
});

module.exports = router;
