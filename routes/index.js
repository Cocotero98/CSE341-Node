const routes = require('express').Router();

routes.get('/', (req, res) => {
    res.send('Chiara Pomarez');
});

module.exports = routes;