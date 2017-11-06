import express from 'express';
import routes from './routes';
import bodyParser from 'body-parser';
import logger from './utils/logger';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerconfig from './utils/swagger';

const swaggerSpec = swaggerJSDoc(swaggerconfig.swagger_config());
const app = express();
const router = express.Router();

app.use(bodyParser.urlencoded({
    extended: true,
}));
app.use(bodyParser.json());

app.use(express.static('public'));

app.use(routes);



app.get('/', (req, res) => {
    logger.info('/GET home');
    res.send('Hello World');
});

//json file for swagger
app.get('/swagger.json', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});


app.listen(3000, () => {
    logger.info('Listening on port 3000!');
});