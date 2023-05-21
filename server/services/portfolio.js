const Stock = require('../models/stock');

const stockModel = new Stock();

exports.addStockToPortfolio = async (request, reply) => {
    const { username, stock, amount, averagePrice } = request.body;

    try {
        const response = await stockModel.addToPortfolio(username, stock, amount, averagePrice);

        reply.code(200).send({ msg: 'Stock was successfully added', data: response });
    } catch(e) {
        reply.code(400).send({ msg: 'Error with adding investment to portfolio.' });
    }
}

exports.removeStockFromPortfolio = async (request, reply) => {
    const { username, stock } = request.body;

    try {
        const response = await stockModel.deleteStockFromPortfolio(username, stock);

        reply.code(200).send({ data: response });
    } catch (e) {
        reply.code(400).send({ msg: 'Error with removing stock from portfolio' });
    }
}

exports.getPortfolio = async (request, reply) => {
    const { username } = request.body;

    try {
        const response = await stockModel.getPortfolio(username);

        reply.code(200).send({ data: response });
    } catch (e) {
        reply.code(400).send({ msg: e.message });
    }
}