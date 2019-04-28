const loginRoutes = require('./login');
const registerRoutes = require('./register');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	try {
		res.render('pages/mainPage', { title: 'Main Page' });
	} catch (e) {
		res.status(400).render('pages/error', { errorMessage: 'Main page Error', title: 'Error' });
	}
});

const constructorMethod = (app) => {
	app.get('/', router);
	app.get('/register', registerRoutes);
	//app.use('/login', loginRoutes);

	app.use('*', (req, res) => {
		res.status(404).json({
			error: 'Invalid Route',
			route: req.originalUrl,
			method: req.method
		});
	});
};
module.exports = constructorMethod;
