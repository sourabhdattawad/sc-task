import express from 'express';
import jwt from 'jsonwebtoken';
const router = express.Router();
import logger from '../utils/logger';
import config from '../config/config.js';
global.config = config;


router.post('/authenticate', (req, res) => {

    console.log(req.body);
    logger.info('/POST authenticate');
    if (req.body.email && req.body.password) {

        let data = {
            email: req.body.email,
            password: req.body.password
        };
        const token = jwt.sign(data, global.config.jwt_secret, {
            expiresIn: 1440
        });
        logger.info('Successfully created token!');
        res.json({ error: false, token: token, message: "Use this token for futher requests!" })

    } else {
        logger.error('Error generating token!');
        res.json({ error: true, message: "Email or password missing!!" });
    }


});



export default router;