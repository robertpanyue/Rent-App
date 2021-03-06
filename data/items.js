const db = require('./dbCollections');
const items = db.itemPosts;
const users = db.users;
const userData = require('./users');
const { ObjectId } = require('mongodb');

async function createSeed(
	startDate,
	endDate,
	requested,
	status,
	userId,
	itemName,
	itemDescription,
	address,
	city,
	state,
	zip,
	price,
	cloudinaryURL,
	thumbnailURL
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
		!city ||
		!state ||
		!zip ||
		!price ||
		!cloudinaryURL ||
		!thumbnailURL
	) {
		throw `Need all fields to create item`;
	}
	city = city.toLowerCase().trim();
	const newItem = {
		startDate,
		endDate,
		requested,
		status,
		userId,
		itemName,
		itemDescription,
		address,
		city,
		state,
		zip,
		price,
		cloudinaryURL,
		thumbnailURL
	};
	try {
		const itemsCollection = await items();
		const insertInfo = await itemsCollection.insertOne(newItem);
		if (insertInfo.insertedCount === 0) throw 'Could not add item';
		const newId = insertInfo.insertedId;
		const itemInserted = await this.get(newId.toHexString());
		if (requested == 'Request') {
			await userData.updateRequestList(userId, String(newId));
		} else if (requested == 'Post') {
			await userData.updateItemList(userId, String(newId));
		}
		return itemInserted;
	} catch (e) {
		console.log(e);
		throw error;
	}
}
async function create(
	startDate,
	endDate,
	requested,
	status,
	userId,
	itemName,
	itemDescription,
	address,
	city,
	state,
	zip,
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
		!city ||
		!state ||
		!zip ||
		!price
	) {
		throw `Need all fields to create item`;
	}
	let cloudinaryURL = [];
	let thumbnailURL = [];
	city = city.toLowerCase().trim();
	const newItem = {
		startDate,
		endDate,
		requested,
		status,
		userId,
		itemName,
		itemDescription,
		address,
		city,
		state,
		zip,
		price,
		cloudinaryURL,
		thumbnailURL
	};
	try {
		const itemsCollection = await items();
		const insertInfo = await itemsCollection.insertOne(newItem);
		if (insertInfo.insertedCount === 0) throw 'Could not add item';
		const newId = insertInfo.insertedId;
		const itemInserted = await this.get(newId.toHexString());
		if (requested == 'Requested') {
			await userData.updateRequestList(userId, newId);
		} else if (requested == 'Listed') {
			await userData.updateItemList(userId, newId);
		}
		return itemInserted;
	} catch (e) {
		console.log(e);
		throw error;
	}
}

async function update(
	id,
	startDate,
	endDate,
	requested,
	status,
	userId,
	itemName,
	itemDescription,
	address,
	city,
	state,
	zip,
	price
) {
	const itemsCollection = await items();
	city = city.toLowerCase().trim();
	const updates = {
		startDate,
		endDate,
		requested,
		status,
		userId,
		itemName,
		itemDescription,
		address,
		city,
		state,
		zip,
		price
	};
	const updatedInfo = await itemsCollection.findOneAndUpdate({ _id: ObjectId(id) }, { $set: updates });
	if (updatedInfo == null) throw 'update listing fail';
	return updatedInfo;
}

async function updateCloudinary(id, url, turl) {
	try {
		const itemsCollection = await items();
		const item = await this.get(id);
		let urls = item.cloudinaryURL;
		let turls = item.thumbnailURL;

		urls.push(url);
		turls.push(turl);

		const updatedItem = { $set: { cloudinaryURL: urls, thumbnailURL: turls } };
		const updatedInfo = await itemsCollection.updateOne({ _id: ObjectId(id) }, updatedItem);
		if (updatedInfo.modifiedCount === 0) throw 'updateCloudinary fail';
		return updatedInfo;
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

async function removeCloudinary(id, url, turl) {
	try {
		const itemsCollection = await items();
		const item = await this.get(id);
		let urls = item.cloudinaryURL;
		let turls = item.thumbnailURL;

		removeFromArray(urls, url);
		removeFromArray(turls, turl);

		const updatedItem = { $set: { cloudinaryURL: urls, thumbnailURL: turls } };
		const updatedInfo = await itemsCollection.updateOne({ _id: ObjectId(id) }, updatedItem);
		if (updatedInfo.modifiedCount === 0) throw 'removeCloudinary fail';
		return updatedInfo;
	} catch (error) {
		throw error;
	}
}

async function get(id) {
	try {
		const itemsCollection = await items();
		const item = await itemsCollection.findOne({ _id: ObjectId(id) });
		if (item === null) throw 'No item with that id';
		return item;
	} catch (error) {
		console.log(error);
		throw 'Get error';
	}
}

async function getAll() {
	try {
		const itemsCollection = await items();
		const array = await itemsCollection.find({}).toArray();
		return array;
	} catch (error) {
		throw 'getAll item error';
	}
}

async function getCloudinaryURL(id) {
	try {
		let item = await this.get(id);
		return item.cloudinaryURL;
	} catch (error) {
		throw 'Get cloudinary url error';
	}
}

async function getThumbnailURL(id) {
	try {
		let item = await this.get(id);
		return item.thumbnailURL;
	} catch (error) {
		console.log(error);
		throw 'Get thumbnail error';
	}
}

async function deleteById(id) {
	try {
		if (!id) throw 'You must provide an id to search for';
		if (typeof id !== 'string') {
			throw 'ID parameter is invalid';
		}
		const itemsCollection = await items();
		const itemdeleted = await itemsCollection.findOne({ _id: ObjectId(id) });
		const deletionInfo = await itemsCollection.removeOne({ _id: ObjectId(id) });
		if (deletionInfo.deletedCount === 0) {
			throw `Could not delete post with id of ${id}`;
		}
		if (itemdeleted.requested == 'Post') {
			const info = await userData.removeItemList(String(itemdeleted.userId), String(itemdeleted._id));
		} else if (itemdeleted.requested == 'Request') {
			const info = await userData.removeRequestList(String(itemdeleted.userId), String(itemdeleted._id));
		}
		return itemdeleted;
	} catch (e) {
		console.log(e);
	}
}

module.exports = {
	createSeed,
	create,
	update,
	get,
	getAll,
	deleteById,
	updateCloudinary,
	removeCloudinary,
	getCloudinaryURL,
	getThumbnailURL
};
