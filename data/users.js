const db = require('./dbCollections');
const users = db.users;
const { ObjectId } = require('mongodb');

//register
async function create(id, name, email, phoneNumber, city, state, zip, hashedPassword) {
	if (!id || !name || !email || !phoneNumber || !city || !state || !zip || !hashedPassword) {
		throw `Need all fields to create user`;
	}

	let newUser = {
		_id: id,
		name,
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
		const user = await this.get(newId.toString());
		return user;
	} catch (error) {
		throw 'create user error' + ` ${error}`;
	}
}

async function updateItemList(id, itemID) {
	try {
		const userCollection = await users();
		const user = await this.get(id);
		let array = user.itemsListed;
		array.push(itemID);
		const updateInfo = userCollection.findOneAndUpdate({ _id: id }, { $set: { itemsListed: array } });
		if (updateInfo == null) throw 'updateItemList fail';
		return updateInfo;
	} catch (error) {
		throw error;
	}
}

async function updateRequestList(id, itemID) {
	try {
		const userCollection = await users();
		const user = await this.get(id);
		let array = user.itemsRequested;
		array.push(itemID);
		const updateInfo = userCollection.findOneAndUpdate({ _id: id }, { $set: { itemsRequested: array } });
		if (updateInfo == null) throw 'updateRequestList fail';
		return updateInfo;
	} catch (error) {
		throw error;
	}
}

function removeFromArray(arr, ele) {
	for (index in arr) {
		if (arr[index] === ele) {
			arr.splice(index, 1);
		}
	}
	return arr;
}

async function removeItemList(id, itemID) {
	try {
		const userCollection = await users();
		const user = await this.get(id);
		let array = user.itemsListed;

		removeFromArray(array, itemID);

		const updatedItem = { $set: { itemsListed: array } };
		const updatedInfo = await userCollection.updateOne({ _id: id }, updatedItem);
		if (updatedInfo == null) throw 'removeItemList fail';
		return updatedInfo;
	} catch (error) {
		throw error;
	}
}
async function removeRequestList(id, itemID) {
	try {
		const userCollection = await users();
		const user = await this.get(id);
		let array = user.itemsRequested;

		removeFromArray(array, itemID);

		const updatedItem = { $set: { itemsRequested: array } };
		const updatedInfo = await userCollection.updateOne({ _id: id }, updatedItem);
		if (updatedInfo == null) throw 'removeItemList fail';
		return updatedInfo;
	} catch (error) {
		throw error;
	}
}

async function get(id) {
	try {
		const userCollection = await users();
		const user = await userCollection.findOne({ _id: id });
		if (user === null) throw 'No user with that id';
		return user;
	} catch (error) {
		error;
		throw 'Get User error';
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
		if (!id) throw 'You must provide an id to search for';
		if (typeof id !== 'string') {
			throw 'ID parameter is invalid';
		}
		const userCollection = await users();
		const user = get(id);
		const deletionInfo = await userCollection.removeOne({ _id: ObjectId.createFromHexString(id) });
		if (deletionInfo.deletedCount === 0) {
			throw `Could not delete post with id of ${id}`;
		}
		return user;
	} catch (e) {
		console.log(e);
	}
}

module.exports = {
	create,
	updateItemList,
	updateRequestList,
	get,
	getAll,
	deleteById,
	removeRequestList,
	removeItemList
};
