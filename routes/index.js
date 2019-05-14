const loginRoutes = require('./login');
const registerRoutes = require('./register');
const mainPageSearchRoutes = require('./main');
const logoutRoutes = require('./logout');
const listingRoutes = require('./listing');
const express = require('express');
const landing = require('./landingpage');
const deleteRoute = require('./delete');
const profileRoute = require('./profile');
const searchRoute = require('./search');
const router = express.Router();
const constructorMethod = (app) => {
	app.get('/', landing);
	app.use('/register', registerRoutes);
	app.use('/login', loginRoutes);
	app.use('/main', mainPageSearchRoutes);
	app.use('/logout', logoutRoutes);
	app.use('/listing', listingRoutes);
	app.use('/delete', deleteRoute);
	app.use('/profile', profileRoute);
	app.use('/search', searchRoute);
	app.use('*', (req, res) => {
		res.status(404).redirect('/');
	});
};
module.exports = constructorMethod;
