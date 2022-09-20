const routes = require('express').Router();


const contactsController = require('../controllers/contacts');

// routes.get('/', (req, res)=>{
//     res.send('holaasdasd')
// })

routes.get('/', contactsController.getAll);

routes.get('/:id', contactsController.getSingle);

module.exports = routes;


//---------NOTAS
//No aparece actualizado en render
//Los routes funcionan bien
// Hay que ver las funciones entrelos
// routes y controller