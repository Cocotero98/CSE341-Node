const routes = require('express').Router();

// routes.get('/', (req, res)=>{
//     res.send('hola')
// })

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

routes.use('/api-docs', swaggerUi.serve);
routes.get('/api-docs', swaggerUi.setup(swaggerDocument));

routes.use('/contacts', require('./contacts'));

module.exports = routes;
