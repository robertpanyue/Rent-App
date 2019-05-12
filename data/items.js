const db = require('./dbCollections');
const items = db.itemPosts;
const users = db.users;
const userData = require('./users');
const { ObjectId } = require('mongodb');

async function create(
	startDate,
	endDate,
	requested,
	status,
	userId,
	itemName,
	itemDescription,
	address,
	price
) {
	if (
		!startDate ||
		!endDate ||
		!requested ||
		!status ||
		!userId ||
		!itemName ||
		!itemDescription ||
		!address ||
		!price
	) {
		throw `Need all fields to create item`;
	}
	const newItem = {
		startDate,
		endDate,
		requested,
		status,
		userId,
		itemName,
		itemDescription,
		address,
		price
	};
	try {
		const userCollection = await users();
		const itemsCollection = await items();
		// const user = await users.get(userId);
		//TODO: update user itemListed and posted
		const insertInfo = await itemsCollection.insertOne(newItem);
		if (insertInfo.insertedCount === 0) throw 'Could not add item';
		const newId = insertInfo.insertedId;
		const itemInserted = await this.get(newId.toHexString());
		return itemInserted;
	} catch (e) {
		console.log(e);
	}
}

async function update() {}

async function get(id) {
	try {
		const itemsCollection = await items();
		const item = await itemsCollection.findOne({ _id: ObjectId.createFromHexString(id) });
		if (item === null) throw 'No user with that id';
		return item;
	} catch (error) {
		throw 'Get error';
	}
}

async function getAll() {
	try {
		const itemsCollection = await items();
		const array = await itemsCollection.find({}).toArray();
		return array;
	} catch (error) {
		throw 'getAll user error';
	}
}

async function deleteById(id) {
	try {
		const itemsCollection = await items();
		const itemdeleted = await itemsCollection.findOne({ _id: ObjectId.createFromHexString(id) });
		if (!id) throw 'You must provide an id to search for';
		if (typeof id !== 'string') {
			throw 'ID parameter is invalid';
		}
		const deletionInfo = await itemsCollection.removeOne({ _id: ObjectId.createFromHexString(id) });
		if (deletionInfo.deletedCount === 0) {
			throw `Could not delete post with id of ${id}`;
		}
		return itemdeleted;
	} catch (e) {
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
