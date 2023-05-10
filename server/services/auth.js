const User = require('../models/user');

exports.register = async (request, reply) => {
    const { body } = request;
    const {
        username,
        password
    } = body;

    const isUserExist = await User.findOne(username);

    if (isUserExist) return reply.code(409).send({ msg: 'User exists!' });

    const user = new User(username);
    const {
        salt,
        encryptedPassword
    } = await User.encryptUserPassword(password, 10);

    await user.addToDatabase(encryptedPassword, salt);
    reply.code(200).send({ username, msg: 'User was created!' });
} 