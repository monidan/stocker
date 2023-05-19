const { register, auth } = require('../services/auth');
const { predictStock, retrieveStockHistory } = require('../services/prediction');

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

function predictStockRoute(fastify, options, done) {
    fastify.route({
        method: 'POST',
        url: '/predict-stock',
        handler: predictStock
    })

    done();
}

function retrieveStockHistoryRoute(fastify, options, done) {
    fastify.route({
        method: 'POST',
        url: '/retrieve-stock-history',
        handler: retrieveStockHistory
    });

    done();
}

module.exports = [
    authRoute,
    registerRoute,
    predictStockRoute,
    retrieveStockHistoryRoute
]