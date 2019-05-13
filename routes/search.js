const express = require('express');
const router = express.Router();
const db = require('../data/dbCollections');
const items = db.itemPosts;
const users = db.users;
router.get('/listings/:item', async (req, res) => {
	try {
		if (req.session && req.session.user) {
			const keyWord = req.params.item;
			// const Location = req.params.location;
			const itemCollection = await items();
			const userCollection = await users();
			//get the result of the key word from the datbase
			const result = await itemCollection.find({ $text: { $search: keyWord } }).toArray();
			const returnArray = [];
			for (let i = 0; i < result.length; i++) {
				if (result[i].requested == 'Post') {
					let user = await userCollection.findOne({ _id: result[i].userId });
					result[i].userName = user.name;
					result[i].email = user.email;
					result[i].phoneNumber = user.phoneNumber;
					returnArray.push(result[i]);
				}
			}

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

router.get('/requests/:item', async (req, res) => {
	try {
		if (req.session && req.session.user) {
			const keyWord = req.params.item;
			const itemCollection = await items();
			const userCollection = await users();
			//get the result of the key word from the datbase
			const result = await itemCollection.find({ $text: { $search: keyWord } }).toArray();
			const returnArray = [];

			for (let i = 0; i < result.length; i++) {
				if (result[i].requested == 'Requested') {
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
			const searchType = req.body.selectSearch;
			console.log(req.body.location);
			if (searchType == 'Listings') {
				res.redirect(`/search/listings/${req.body.searchContent}`);
			} else {
				res.redirect(`/search/requests/${req.body.searchContent}`);
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
