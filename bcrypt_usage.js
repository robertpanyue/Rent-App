const bcrypt = require('bcrypt');
const saltRounds = 16;

async function getHashPassword(password) {
	const hash = await bcrypt.hash(password, saltRounds);
	return hash;
}

async function checkPassword(password, hash) {
	let compareToMatch = false;

	try {
		compareToMatch = await bcrypt.compare(password, hash);
	} catch (e) {
		throw e;
	}
	return compareToMatch;
}

module.exports = {
	getHashPassword,
	checkPassword
};
