
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/Rent-App';
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

		//insert fake data

		await db.close();
	} catch (error) {
		throw error;
	}
})();

