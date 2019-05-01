const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const configRoutes = require('./routes');
const exphbs = require('express-handlebars');
const static = express.static(__dirname + '/public');
const firebase = require('firebase');
const cloudinary = require('cloudinary').v2;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/public', static);

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

let firebaseConfig = {
	apiKey: 'AIzaSyAWG_cGdLuTz23H_foOSZB8P0zOjuaCUeI',
	authDomain: 'rent-app-546.firebaseapp.com',
	databaseURL: 'https://rent-app-546.firebaseio.com',
	projectId: 'rent-app-546',
	storageBucket: 'rent-app-546.appspot.com',
	messagingSenderId: '677383383091'
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

cloudinary.config({
  cloud_name: 'dl6xltl5t',
  api_key: '111556952576531',
  api_secret: '3bDYh04SKMi69_ByMTPKI9pa3ko'
});

configRoutes(app);

app.listen(3000, () => {
	console.log("We've now got a server!");
	console.log('Your routes will be running on http://localhost:3000');
});
