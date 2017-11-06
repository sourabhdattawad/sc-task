import jwt from 'jsonwebtoken';
import logger from '../utils/logger';


module.exports = (req, res, next) => {
    //Get token
    let token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {

        logger.debug('Verfying token....');
        jwt.verify(token, global.config.jwt_secret, (err, decoded) => {
            if (err) { //failed verification.
                logger.error('Failed verification !!');
                return res.json({
                    'error': true,
                    'message': 'Invalid token !!'
                });
            }
            logger.info('Successfully verified token....');
            console.log(decoded);
            req.decoded = decoded;
            next(); //no error, proceed
        });

    } else {
        // forbidden without token
        logger.debug('No authentication !!');
        return res.status(403).send({
            'error': true,
            'message': "You are not authorized, no token provided !!"
        });
    }
}