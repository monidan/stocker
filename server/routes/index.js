const { register, auth } = require('../services/auth');
const { predictStock, retrieveStockHistory } = require('../services/prediction');
const { 
    addStockToPortfolio,
    getPortfolio,
    removeStockFromPortfolio
 } = require('../services/portfolio');

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

function addStockToPortfolioRoute(fastify, options, done) {
    fastify.route({
        method: 'POST', 
        url: '/add-investment',
        handler: addStockToPortfolio,
    })

    done();
}

function getUserPortfolioRoute(fastify, options, done) {
    fastify.route({
        method: 'POST',
        url: '/portfolio',
        handler: getPortfolio
    })

    done();
}

function deleteStockFromPortfolioRoute(fastify, options, done) {
    fastify.route({
        method: 'POST',
        url: '/delete-investment',
        handler: removeStockFromPortfolio
    })

    done();
}

module.exports = [
    authRoute,
    registerRoute,
    predictStockRoute,
    retrieveStockHistoryRoute,
    addStockToPortfolioRoute,
    getUserPortfolioRoute,
    deleteStockFromPortfolioRoute
]