from flask import Flask, jsonify, request
from flask_cors import CORS
from prediction_ml import tickerfromuser

app = Flask(__name__)
CORS(app)

# POST endpoint to retrieve stock price
@app.route('/stock_price', methods=['POST'])
def get_stock_price():
    # Get the stock symbol from the request body
    stock_symbol = request.json.get('symbol')

    if not stock_symbol:
        return jsonify({'error': 'Stock symbol is required.'}), 400

    try:
        return jsonify({'stock': stock_symbol, 'price': str(tickerfromuser(stock_symbol))})

    except KeyError:
        return jsonify({'error': 'Invalid stock symbol.'}), 400


app.run(host='0.0.0.0')
print(app)