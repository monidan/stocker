const { register, auth } = require('../services/auth');

function authRoute(fastify, options, done) {
    fastify.route({
        method: 'GET',
        url: '/auth',
        handler: auth
    })

    done();
} 

function registerRoute(fastify, options, done) {
    fastify.route({
        method: 'POST',
        url: '/sign-up',
        handler: register
    })

    done();
}

module.exports = [
    authRoute,
    registerRoute,
]