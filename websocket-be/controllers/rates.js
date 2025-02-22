const config = require("../config.js").config;
const jsonConfig = JSON.parse(JSON.stringify(config));
exports.getRates = (req, res, next) => {
    try {
        fetch(`https://openexchangerates.org/api/latest.json?app_id=${jsonConfig.exchangeAPIKey}`)
            .then(res => res.json())
            .then(data => console.log(data))
        res.status(200).json({
            rates: [
                {euro: 1},
                {dollar: 2},
                {ruble: 3}
            ]
        })
    } catch (error) {
        console.log(error)
    }
}