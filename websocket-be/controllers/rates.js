const config = require("../config.js").config;
const jsonConfig = JSON.parse(JSON.stringify(config));
const pino = require('pino');
const logger = pino({level: 'info'});

exports.getRates = (req, res, next) => {
    try {
        fetch(`https://api.freecurrencyapi.com/v1/latest?apikey=${jsonConfig.exchangeAPIKey}`)
            .then(response => response.json())
            .then(data => {
                const keys = data.data
                res.status(200).json({
                    rates: [{euro: keys.EUR}, {dollar: keys.USD}, {ruble: keys.RUB}]
                })
            })

    } catch (error) {
        logger.error(error)
    }
}