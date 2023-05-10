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

exports.auth = async (request, reply) => {
    const { headers } = request;
    const { authorization } = headers;

    const { username, password } = User.retrieveUserData(authorization.replace('Bearer ', ''));
    const user = new User(username);

    const userFromDatabase = await user.getUserFromDatabase();
    
    if (!userFromDatabase || !Object.keys(userFromDatabase).length) 
        return reply.code(401).send({ msg: 'Wrong credentials!' });
    
    const isPasswordsSame = await user.comparePasswords(userFromDatabase.password, password);

    if (!isPasswordsSame)
        return reply.code(401).send({ msg: 'Wrong password!' });

    reply.code(200).send({ username, msg: 'Auth success!' });
}