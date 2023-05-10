const { encryptPassword, comparePasswords } = require('../utils/password-utils');
const { retrieveDataFromAuthorizationHeader } = require('../utils/auth-utils');
const { db } = require('../database/index');

const NO_USERNAME_PROVIDED = require('../errors/user');

class User {
    /**
     * @type {string}
     */
    _username;

    /**
     * @param {string} username 
     */
    constructor(username) {
        if (!username) throw NO_USERNAME_PROVIDED;

        this._username = username;
    }

    /**
     * Compare plain and encrypted passwords using bcrypt
     * @param {string} encryptedPassword 
     * @param {string} plainPassword 
     * @returns {boolean}
     */
    async comparePasswords(encryptedPassword, plainPassword) {
        try {
            return await comparePasswords(encryptedPassword, plainPassword);
        } catch (e) { throw new Error(e) };
    }

    /**
     * Adds user document to firebase collection
     * @param {string} password 
     * @param {string} salt 
     */
    async addToDatabase(password, salt) {
        if (!password.length && !salt.length) 
            return console.log('No password or salt were provided for addToDatabase function.');

        try {
            return await db.collection('users')
                .add({ username: this._username, password, hash: salt });
        } catch (e) { throw new Error(e) }
    }

    /**
     * 
     * @param {string} encodedHeaderData 
     * @returns {object};
     */
    static retrieveUserData(encodedHeaderData) {
        return retrieveDataFromAuthorizationHeader(encodedHeaderData, '.');
    }

    /**
     * Get user from cloud firestore by username
     * @returns {object}
     */
    async getUserFromDatabase() {
        try {
            const users = await db.collection('users')
                .where('username', '==', this._username).get()

            return users.docs[0].data();
        } catch (e) { throw new Error(e) }
    }

    /**
     * Finds user in 'users' collection by given `username`
     * @param {string} username 
     * @returns {boolean}
     */
    static async findOne(username) {
        if (!username) return console.log('No username provided for findOne function.');

        try {
            const user = await db.collection('users')
                .where('username', '==', username).get();
    
            return !!user.docs.length;
        } catch (e) { throw new Error(e) }
    }

    /**
     * Encrypts user's password by specified amount of rounds
     * @param {string} password 
     * @param {number} rounds 
     * @returns {object} - contains salt & encrypted pass
     */
    static encryptUserPassword(password, rounds) {
        return encryptPassword(password, rounds);
    }
}

module.exports = User;