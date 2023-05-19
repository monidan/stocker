const Stock = require('../models/stock');

const stockModel = new Stock();

exports.predictStock = async (request, reply) => {
    const { body } = request;
    const { stock } = body;
    
    try {
        const predictionResponse = await stockModel.predictStock(stock);
    
        reply.code(200).send({ data: predictionResponse });
    } catch(e) {
        reply.code(400).send({ msg: 'Prediction error!' });
    }
}

exports.retrieveStockHistory = async (request, reply) => {
    const { body } = request;
    const { stock } = body;

    try {
        const stockHistory = await stockModel.getStockPriceHistory(stock);

        reply.code(200).send({ data: stockHistory })
    } catch(e) {
        reply.code(400).send({ msg: 'Stock history error.' })
    }
}