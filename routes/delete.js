const express = require('express');
const router = express.Router();
const itemDB= require('../data/items')

router.post('/:id', async (req, res) => {
	try {
		if (req.session && req.session.user) {
            console.log("hey")
            if(req.params.id){
                const item=await itemDB.deleteById(String(req.params.id))
                console.log(item)
                res.redirect("/profile")  
            }
            else{
                console.log("error")
            }
			
		} else {
			res.render('pages/landingpage');
		}	
	} catch (error) {
		res.status(400).render('pages/error', {
			errorMessage: 'Login GET Error',
			title: 'Error'
		});
	}
});

module.exports = router;
