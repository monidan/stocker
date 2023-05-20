const axios = require('axios');

const { 
    PORTFOLIO_DOES_NOT_EXIST, 
    STOCK_DOES_NOT_EXIST,
    AMOUNT_OF_STOCKS_EXCEEDED
 } = require('../errors/stock');
const { db } = require('../database/index');

const PREDICTION_API_ENDPOINT = 'http://localhost:8000/stock_price';

class Stock {
    _stock;
    cachedPredictions;
    cachedStockHistories;

    constructor(stockName) {
        this._stock = stockName;

        this.cachedPredictions = new Map();
        this.cachedStockHistories = new Map();
    }

    async getPortfolio(username) {
        const portfolioDoc = await db.collection('portfolios')
            .where('username', '==', username)
            .get();

        if (!portfolioDoc.docs.length) throw PORTFOLIO_DOES_NOT_EXIST;

        const portfolio = portfolioDoc.docs[0].data();

        return {
            stocks: portfolio.stocks,
        };
    }

    async removeFromPortfolio(username, stockName, amountOfStocks) {
        const portfolioDoc = await db.collection('portfolios')
            .where('username', '==', username)
            .get();
        const isPortfolioExist = portfolioDoc.docs[0];

        if (!isPortfolioExist) throw PORTFOLIO_DOES_NOT_EXIST;

        const portfolio = portfolioDoc.docs[0].data();
        const stocks = JSON.parse(portfolio.stocks);
        const isStockExist = stocks.some(stock => stock.stock === stockName);

        if (!isStockExist) throw STOCK_DOES_NOT_EXIST;

        const existingStock = stocks.find(stock => stock.stock === investment.stock);

        if (Number(amountOfStocks) > Number(existingStock.amount)) throw AMOUNT_OF_STOCKS_EXCEEDED;

        const amountDifferenceAfterSelling = Number(existingStock.amount) - Number(investment.amount);

        if (amountDifferenceAfterSelling === 0) return await this.deleteStockFromPortfolio(username, stockName);

        const updatedStock = {
            stock: investment.stock,
            averagePrice: Number(existingStock.averagePrice),
            amount: amountDifferenceAfterSelling,
        }

        const updatedStocks = [
            ...stocks.filter(({ stock }) => stock !== investment.stock),
            updatedStock,
        ];

        await portfolioDoc.docs[0].ref.update({ stocks: JSON.stringify(updatedStocks) }); 

        return {
            stocks: updatedStocks
        };
    }

    async deleteStockFromPortfolio(username, stockName) {
        const portfolioDoc = await db.collection('portfolios')
            .where('username', '==', username)
            .get();
        const isPortfolioExist = portfolioDoc.docs[0];

        if (!isPortfolioExist) throw PORTFOLIO_DOES_NOT_EXIST;

        const portfolio = portfolioDoc.docs[0].data();
        const stocks = JSON.parse(portfolio.stocks);

        const updatedStocks = [
            ...stocks.filter(stock => stock.stock !== stockName)
        ]

        await portfolioDoc.docs[0].ref.update({ stocks: JSON.stringify(updatedStocks) }); 

        return {
            stocks: updatedStocks
        };
    }

    async addToPortfolio(username, stockName, amountOfStocks, averageBoughtStockPrice) {
        const portfolioDoc = await db.collection('portfolios')
            .where('username', '==', username)
            .get();
        const isPortfolioExist = portfolioDoc.docs[0];
        
        const investmentInfo = {
            stock: stockName,
            amount: amountOfStocks,
            averagePrice: averageBoughtStockPrice,
        }

        if (!isPortfolioExist) {
            return await this.createNewPortfolio(username, investmentInfo);
        }

        const portfolio = portfolioDoc.docs[0].data();
        const stocks = JSON.parse(portfolio.stocks);
        const isStockExist = stocks.some(stock => stock.stock === stockName);

        if (isStockExist) {
            return await this.updateExistingPortfolio(portfolioDoc, investmentInfo);
        }

        return await this.addNewStockToPortfolio(portfolioDoc, investmentInfo);
    }

    async createNewPortfolio(username, investment) {
        await db.collection('portfolios').add({ username, stocks: JSON.stringify([ investment ]) })
        return {
            stocks: [investment],
        };
    }

    async updateExistingPortfolio(portfolioDoc, investment) {
        const portfolio = portfolioDoc.docs[0].data();
        const stocks = JSON.parse(portfolio.stocks);

        const existingStock = stocks.find(stock => stock.stock === investment.stock);
        const updatedStock = {
            stock: investment.stock,
            averagePrice: (Number(investment.averagePrice) + Number(existingStock.averagePrice)) / 2,
            amount: Number(investment.amount) + Number(existingStock.amount)
        }

        const updatedStocks = [
            ...stocks.filter(({ stock }) => stock !== investment.stock),
            updatedStock,
        ];

        await portfolioDoc.docs[0].ref.update({ stocks: JSON.stringify(updatedStocks) });

        return {
            stocks: [ ...updatedStocks ]
        };
    }

    async addNewStockToPortfolio(portfolioDoc, investment) {
        const portfolio = portfolioDoc.docs[0].data();
        const stocks = JSON.parse(portfolio.stocks);

        const updatedStocks = [
            ...stocks,
            investment,
        ]

        await portfolioDoc.docs[0].ref.update({ stocks: JSON.stringify(updatedStocks) });

        return {
            stocks: [ ...updatedStocks ]
        };
    }

    async predictStock(stockName = this._stock) {
        if (this.cachedPredictions.has(stockName))
            return Promise.resolve({
                price: this.cachedPredictions.get(stockName),
                stock: stockName,
            });

        return await axios.request({
            url: PREDICTION_API_ENDPOINT,
            method: 'POST',
            data: {
                symbol: stockName
            }
        })
        .then(({data}) => {
            this.cachedPredictions.set(data.stock, data.price);
            return data;
        });
    }

    async getStockPriceHistory(stockName = this._stock) {
        if (this.cachedStockHistories.has(stockName))
            return Promise.resolve({
                stock: stockName,
                history: this.cachedStockHistories.get(stockName)
            })

        return await axios.request({
            method: 'GET',
            url: `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${stockName}&outputsize=compact&apikey=7NYLN5LMJVH1TEUR`
        })
        .then(({ data }) => {
            this.cachedStockHistories.set(stockName, data['Time Series (Daily)']);
            return data;
        })
    }
}

module.exports = Stock;