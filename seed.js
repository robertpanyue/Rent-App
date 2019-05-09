const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/Rent-App';
const userDB = require('./data/users');
const itemDB = require('./data/items');
const firebase = require('firebase');
const bcrypt = require('./bcrypt_usage');
(async function() {
	try {
		const db = await MongoClient.connect(url, { useNewUrlParser: true });
		const dbo = db.db('Rent-App');
		await dbo.createCollection('users', function(err, res) {
			if (err) throw err;
			console.log('Collection users created!');
		});
		await dbo.createCollection('itemPosts', function(err, res) {
			if (err) throw err;
			console.log('Collection itemPosts created!');
		});

		await dbo.collection('itemPosts').createIndex({ itemName: 'text', itemDescription: 'text' });
		console.log('CreateIndex');

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

		var userId = '';
		//insert user fake data
		await firebase
			.auth()
			.createUserWithEmailAndPassword('test@test.com', '123456')
			.then(async (cred) => {
				//push the user date to the database
				try {
					const user = await userDB.create(
						cred.user.uid,
						'Patric Hill',
						'test@test.com',
						'8888888888',
						'Hoboken',
						'NJ',
						'07030',
						await bcrypt.getHashPassword('123456')
					);
					console.log(cred.user.uid);
					userId = cred.user.uid;
				} catch (error) {
					throw error;
				}
			})
			.then(() => {
				firebase.auth().signOut();
			})
			.catch(function(error) {
				throw error;
			});

		console.log('create user');
		console.log(userId);
		//insert item fake data
		try {
			const item = await itemDB.create(
				'2019-04-01T00:00:00',
				'2019-04-05T00:00:00',
				'Listed',
				'open',
				userId,
				'MacBook Pro',
				'Laptop',
				'Hoboken',
				'New Jersey',
				'07030',
				100,
				'https://res.cloudinary.com/dl6xltl5t/image/upload/v1557334517/macbook-select-space-gray-201706_GEO_US_uk1xhr.jpg'
			);
			console.log('create item');
		} catch (error) {
			throw error;
		}

		await db.close();
		console.log('DONE');
	} catch (error) {
		throw error;
	}
})();
