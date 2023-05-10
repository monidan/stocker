const { register } = require('../services/auth');

function auth(fastify, options, done) {
    fastify.route({
        method: 'POST',
        url: '/sign-up',
        handler: register
    })

    done();
}

module.exports = [
    auth,
]