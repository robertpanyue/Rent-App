const db = require('./dbCollections');
const users = db.users;
const { ObjectId } = require('mongodb');

//register
async function create(
	firstName,
	lastName,
	email,
	phoneNumber,
	city,
	state,
	zip,
	hashedPassword,
	itemsListed,
	itemsRequested
) {
	if (
		!firstName ||
		!lastName ||
		!email ||
		!phoneNumber ||
		!city ||
		!state ||
		!zip ||
		!hashedPassword ||
		!itemsListed ||
		!itemsRequested
	) {
		throw `Need all fields to create user`;
	}

	let newUser = {
		firstName,
		lastName,
		email,
		phoneNumber,
		city,
		state,
		zip,
		hashedPassword,
		itemsListed: [],
		itemsRequested: []
	};

	try {
		const userCollection = await users();
		const insertInfo = await userCollection.insertOne(newUser);
		if (insertInfo.insertedCount === 0) throw 'Could not add user';
		const newId = insertInfo.insertedId;
		const user = await this.get(newId.toHexString());
		return user;
	} catch (error) {
		throw 'create user error';
	}
}

async function update() {}

async function get(id) {
	try {
		const userCollection = await users();
		const user = await userCollection.findOne({ _id: ObjectId.createFromHexString(id) });
		if (user === null) throw 'No user with that id';
		return user;
	} catch (error) {
		throw 'Get error';
	}
}

async function getAll() {
	try {
		const userCollection = await users();
		const array = await userCollection.find({}).toArray();
		return array;
	} catch (error) {
		throw 'getAll user error';
	}
}

async function deleteById(id) {
	try {
		const userCollection = await users();
		const user=await userCollection.findOne({ _id: ObjectId.createFromHexString(id)});
		if (!id) throw 'You must provide an id to search for';
		if (typeof id !== 'string') {
			throw 'ID parameter is invalid';
		}
		const deletionInfo = await userCollection.removeOne({ _id: ObjectId.createFromHexString(id)});
		if (deletionInfo.deletedCount === 0) {
			throw `Could not delete post with id of ${id}`;
		}
		return user;
	} 
	catch (e) {
		console.log(e);
	}
}

module.exports = {
	create,
	update,
	get,
	getAll,
	deleteById
};
