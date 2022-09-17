const routes = require('express').Router();

// routes.get('/', (req, res)=>{
//     res.send('hola')
// })

routes.use('/contacts', require('./contacts'))


module.exports = routes;