const pino = require('pino');
const logger = pino({level: 'info'});

exports.getRates = (req, res, next) => {
    try {

    } catch (error) {
        logger.error(error)
    }
}