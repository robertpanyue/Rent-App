const db = require('./dbCollections');
const items = db.itemPosts;
const { ObjectId } = require('mongodb');

async function create(startDate, endDate, requested, status, userId, itemName, itemDescription, city, state) {}

async function update() {}

async function get() {}

async function getAll() {}

async function deleteById() {}

module.exports = {
	create,
	update,
	get,
	getAll,
	deleteById
};
