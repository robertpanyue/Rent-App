const constructorMethod = (app) => {
	app.use('*', (req, res) => {
		res.status(404).json({
			error: 'Invalid Route',
			route: req.originalUrl,
			method: req.method
		});
	});
};
module.exports = constructorMethod;
