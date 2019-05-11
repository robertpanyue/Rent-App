const express = require('express');
const router = express.Router();
const db = require('../data/dbCollections');
const items = db.itemPosts;
router.get('/:item', async (req, res) => {
	try {
		if (req.session && req.session.user) {
			const keyWord = req.params.item;
			const itemCollection = await items();
			//get the result of the key word from the datbase
			const result = await itemCollection.find({ $text: { $search: keyWord } });
			console.log();
			res.render('pages/searchResult', { title: keyWord, type: 'Listed', resultList: result });
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
			res.redirect(`/search/${req.body.searchContent}`);
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
