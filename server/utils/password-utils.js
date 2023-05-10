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

module.exports = {
    encryptPassword,
}