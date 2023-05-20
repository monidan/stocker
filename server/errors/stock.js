const PORTFOLIO_DOES_NOT_EXIST = new Error('Portfolio for this user does not exist');
const STOCK_DOES_NOT_EXIST = new Error('User does not have this stock in the portfolio');
const AMOUNT_OF_STOCKS_EXCEEDED = new Error('User does not have that amount of stocks to continue with an action');

export {
    PORTFOLIO_DOES_NOT_EXIST,
    STOCK_DOES_NOT_EXIST,
    AMOUNT_OF_STOCKS_EXCEEDED
}