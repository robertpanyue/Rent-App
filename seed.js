const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/Rent-App';
const userDB = require('./data/users');
const itemDB = require('./data/items');
const firebase = require('firebase');
const bcrypt = require('./bcrypt_usage');
(async function() {
	try {
		const db = await MongoClient.connect(url, { useNewUrlParser: true });
		const dbo = await db.db('Rent-App');

		await dbo.createCollection('users', function(err, res) {
			if (err) throw err;
			console.log('Collection users created!');
		});
		await dbo.collection('itemPosts').createIndex({ itemName: 'text', itemDescription: 'text' });
		console.log('Collection itemPosts created!');
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

		let userId = '';
		//insert user fake data
		const cred = await firebase.auth().createUserWithEmailAndPassword('test8@8.com', '123456');
		userId = cred.user.uid;
		console.log(userId);
		firebase.auth().signOut();

		//push the user date to the database
		try {
			const user = await userDB.create(
				userId,
				'Patrick Hill',
				'test7@7.com.com',
				'8888888888',
				'Hoboken',
				'NJ',
				'07030',
				await bcrypt.getHashPassword('123456')
			);
			// console.log(cred.user.uid);
		} catch (error) {
			throw error;
		}
		console.log('create user');
		console.log(userId);
		//insert item fake data
		//item 1
		try {
			const item = await itemDB.createSeed(
				'2019-04-01',
				'2019-04-05',
				'Post',
				'open',
				userId,
				'MacBook Pro',
				'Laptop',
				'1 Castle Point Terrace',
				'Hoboken',
				'New Jersey',
				'07030',
				100,
				[
					'https://res.cloudinary.com/dl6xltl5t/image/upload/v1557334517/macbook-select-space-gray-201706_GEO_US_uk1xhr.jpg'
				],
				[]
			);
			console.log('create item');
		} catch (error) {
			throw error;
		}
		//item 2
		try {
			const item = await itemDB.createSeed(
				'2019-05-01',
				'2019-05-05',
				'Post',
				'open',
				userId,
				'iPhone Xr',
				'Phone',
				'1 Castle Point Terrace',
				'Hoboken',
				'New Jersey',
				'07030',
				100,
				[ 'https://res.cloudinary.com/dl6xltl5t/image/upload/v1557521042/iphone_egrdtd.jpg' ],
				[]
			);
			console.log('create item');
		} catch (error) {
			throw error;
		}
		//item 3
		try {
			const item = await itemDB.createSeed(
				'2019-06-01',
				'2019-06-05',
				'Post',
				'open',
				userId,
				'Dell Inspiron 15',
				'Laptop',
				'1 Castle Point Terrace',
				'Hoboken',
				'New Jersey',
				'07030',
				100,
				[ 'https://res.cloudinary.com/dl6xltl5t/image/upload/v1557521397/dell_qpvsul.webp' ],
				[]
			);
			console.log('create item');
		} catch (error) {
			throw error;
		}
		//item 4 - listed
		try {
			const item = await itemDB.createSeed(
				'2019-07-01',
				'2019-07-05',
				'Post',
				'open',
				userId,
				'google pixel 2',
				'Phone',
				'1 Castle Point Terrace',
				'Hoboken',
				'New Jersey',
				'07030',
				100,
				[ 'https://res.cloudinary.com/dl6xltl5t/image/upload/v1557521490/google-pixel-2header_wiyuy7.jpg' ],
				[]
			);
			console.log('create item');
		} catch (error) {
			throw error;
		}
		//item 1- requested

		try {
			const item = await itemDB.createSeed(
				'2019-04-01',
				'2019-04-05',
				'Request',
				'open',
				userId,
				'google pixel 3',
				'Phone',
				'1 Castle Point Terrace',
				'Hoboken',
				'New Jersey',
				'07030',
				100,
				[ 'https://res.cloudinary.com/dl6xltl5t/image/upload/v1557521395/google_pixel_3_cvug2p.jpg' ],
				[]
			);
			console.log('create item');
		} catch (error) {
			throw error;
		}

		//item2 - requested

		try {
			const item = await itemDB.createSeed(
				'2019-05-01',
				'2019-05-05',
				'Request',
				'open',
				userId,
				'iphone 6s',
				'Phone',
				'1 Castle Point Terrace',
				'Hoboken',
				'New Jersey',
				'07030',
				100,
				[ 'https://res.cloudinary.com/dl6xltl5t/image/upload/v1557521393/iphoen6s_zeihfk.jpg' ],
				[]
			);
			console.log('create item');
		} catch (error) {
			throw error;
		}

		//item3 - requested

		try {
			const item = await itemDB.createSeed(
				'2019-06-01',
				'2019-06-05',
				'Request',
				'open',
				userId,
				'Lenovo',
				'Laptop',
				'1 Castle Point Terrace',
				'Hoboken',
				'New Jersey',
				'07030',
				100,
				[ 'https://res.cloudinary.com/dl6xltl5t/image/upload/v1557521390/lenovo_jzrfs7.jpg' ],
				[]
			);
			console.log('create item');
		} catch (error) {
			throw error;
		}

		//item4- Requested
		try {
			const item = await itemDB.createSeed(
				'2019-05-01',
				'2019-05-05',
				'Request',
				'open',
				userId,
				'acer predator helios 300',
				'Laptop',
				'1 Castle Point Terrace',
				'Hoboken',
				'New Jersey',
				'07030',
				100,
				[ 'https://res.cloudinary.com/dl6xltl5t/image/upload/v1557521391/acer_rwdjrw.jpg' ],
				[]
			);
			console.log('create item');
		} catch (error) {
			throw error;
		}
		await db.close();
		console.log('DONE');
		process.exit();
	} catch (error) {
		throw error;
	}
})().catch((error) => console.log(error));
