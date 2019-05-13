const express = require('express');
const router = express.Router();
const itemDB= require('../data/items')

router.post('/:id', async (req, res) => {
	try {
		if (req.session && req.session.user) {
			if(req.params.id){
				const item = await itemDB.deleteById(String(req.params.id));
				console.log(item);

				res.redirect("/profile");
			}
			else{
						res.render('pages/error', { title: 'Error',errorMessage:"Cannot delete the post" });
			}
		} else {
			res.render('pages/login', { title: 'Login',err:"You must login first" });
		}
	} catch (error) {
		res.status(400).render('pages/error', {
			errorMessage: 'Login GET Error',
			title: 'Error'
		});
	}
});

module.exports = router;
