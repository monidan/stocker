/**
 * Retrieves encrypted username & password from HTTP header & decrypts it
 * @param {string} authorizationHeader 
 * @param {'.' | ','} splitType 
 * @returns {username: string, password: string}
 */
function retrieveDataFromAuthorizationHeader(authorizationHeader, splitType) {
    const encodedData = authorizationHeader.split(splitType);

    return encodedData
        .reduce((accumulator, encodedValue, index) => accumulator = {
            ...accumulator,
            [index ? 'password' : 'username']: Buffer.from(encodedValue, 'base64').toString(),
        }, {});
}

module.exports = {
    retrieveDataFromAuthorizationHeader,
}