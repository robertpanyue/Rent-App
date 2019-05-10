const loginRoutes = require('./login');
const registerRoutes = require('./register');
const mainPageSearchRoutes = require('./main');
const logoutRoutes = require('./logout');
const postRoutes = require('./post');
const profileRoutes = require('./profile');
<<<<<<< HEAD
const postlistings=require("./postlistings");
=======

const postlistings=require("./postlistings");

const searchRoutes = require('./search');

>>>>>>> 336398affe87a06a3f4d5e7998def9c6e6c7b710
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	try {
		if (req.session && req.session.user) {
			res.redirect('/main');
		} else {
			res.render('pages/mainPage', { title: 'Main Page' });
		}
	} catch (e) {
		res.status(400).render('pages/error', { errorMessage: 'Main page Error', title: 'Error' });
	}
});

const constructorMethod = (app) => {
	app.get('/', router);
	app.use('/register', registerRoutes);
	app.use('/login', loginRoutes);
	app.use('/main', mainPageSearchRoutes);
	app.use('/logout', logoutRoutes);
	app.use('/post', postRoutes);
	app.use('/profile', profileRoutes);
<<<<<<< HEAD
	app.use('/postlistings',postlistings);
=======

	app.use('/postlistings',postlistings);

	app.use('/search', searchRoutes);

>>>>>>> 336398affe87a06a3f4d5e7998def9c6e6c7b710
	app.use('*', (req, res) => {
		res.status(404).json({
			error: 'Invalid Route',
			route: req.originalUrl,
			method: req.method
		});
	});
};
module.exports = constructorMethod;
