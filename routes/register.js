const express = require('express');
const router = express.Router();
const firebase = require('firebase');
const firebaseAuth = require('firebase/auth');

router.get('/register', async(req, res) => {
    console.log('get register');
    try {
        res.render('pages/register');
    } catch (error) {
        res.status(400).render('pages/error', {
            errorMessage: 'Register Error',
            title: 'Error'
        });
    }
});

router.post('/register', async(req, res) => {
    try {

        res.redirect('/main');
    } catch (error) {
        res.status(400).render('pages/error', {
            errorMessage: 'Register Post Error',
            title: 'Error'
        });
    }
});

module.exports = router;