const MongoClient = require('mongodb').MongoClient;
const settings = require('../settings');
const mongoConfig = settings.mongoConfig;

let _connection = undefined;
let _db = undefined;

module.exports = async () => {
	// const uri = 'mongodb+srv://robertpanyue:rentapp546@rentapp-wuxqo.gcp.mongodb.net/test?retryWrites=true';
	// const client = new MongoClient(uri, { useNewUrlParser: true });
	// client.connect((err) => {
	// 	const collection = client.db('Rent-App');
	// 	return collection;
	// });
	if (!_connection) {
		_connection = await MongoClient.connect(mongoConfig.serverUrl, { useNewUrlParser: true });
		_db = await _connection.db(mongoConfig.database);
	}

	return _db;
};
