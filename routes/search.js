const express = require('express');
const router = express.Router();
const db = require('../data/dbCollections');
const items = db.itemPosts;
router.get('/:item', async (req, res) => {
	try {
		if (req.session && req.session.user) {
			const keyWord = req.param.item;
			const itemCollection = await items();
			await itemCollection.res.render('pages/searchResult');
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
