const bcrypt = require('bcrypt');

/**
 * Encrypt password with salt 
 * @param {string} password 
 * @param {number} rounds 
 */
async function encryptPassword(password, rounds) {
    if (!password) 
        return console.log('No password provided for encryptPassword');

    const salt = await bcrypt.genSalt(rounds);
    const encryptedPassword = await bcrypt.hash(password, salt);

    return {
        salt,
        encryptedPassword
    };
}

/**
 * Compares two passwords using bcrypt
 * @param {string} hashedPassword 
 * @param {string} password 
 * @returns {boolean}
 */
async function comparePasswords(hashedPassword, password) {
    return await bcrypt.compare(password, hashedPassword);
}

module.exports = {
    encryptPassword,
    comparePasswords
}