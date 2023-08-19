# Stocker

Assets management web-application, where you can track a portfolio of your stocks, their prices & get a rough prediction from an AI model about the future price.

## Technologies

### Front-end
- vue@3.2.7
- pinia@2
- vue-router
- yup
- tailwindcss@3.3.2
- axios@1.4
- chart.js
- vee-validate

### Back-end
- fastify@4

### Database
- firebase database

### Infrastructure
- Docker
- vite@4

## Running

1. Pull the repo
2. Run `pnpm install` (if you do not have it, run `npm install`)
3. Open 2 additional terminal windows (so now you have running 3 terminals)
4. In the first one run `pnpm dev:ui` (or `npm run dev:ui`)
5. In the second one run `pnpm start:api` (or `npm run start:api`)

The last thing that can be missing is AlphaVenture's API key, which is used to fetch history of prices for a specific stock. (You can find an API key variable [inside](prediction-container/prediction_ml.py) `prediction-container/prediction_ml.py`)

- copy your own API key from AlphaVenture's web-site and paste it there
- after that you should be good to go, if not **open an issue**

## Issues
If you are experiencing any issues, open an issue in this repository. 
