const express = require('express');
const router = express.Router();

router.get('/', async(req, res) => {
    try {
        res.render('pages/login');
    } catch (error) {
        res.status(400).render('pages/error', {
            errorMessage: 'Login Error',
            title: 'Error'
        });
    }
});

module.exports = router;