const express = require('express');
const router = express.Router();
const db = require('../data/dbCollections');
const items = db.itemPosts;
router.get('/listings/:item', async (req, res) => {
	try {
		if (req.session && req.session.user) {
			const keyWord = req.params.item;
			const itemCollection = await items();
			const searchType = req.body.selectSearch;
			//get the result of the key word from the datbase
			const result = await itemCollection.find({ $text: { $search: keyWord } }).toArray();
			const returnArray = [];

			for (let i = 0; i < result.length; i++) {
				if (result[i].requested == 'Listed') {
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
			//get the result of the key word from the datbase
			const result = await itemCollection.find({ $text: { $search: keyWord } }).toArray();
			const returnArray = [];

			for (let i = 0; i < result.length; i++) {
				if (result[i].requested == 'Requested') {
					returnArray.push(result[i]);
				}
			}

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
