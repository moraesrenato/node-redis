const express = require('express');
const userController = require('./controllers/userController');

const routes = express.Router();

routes.post('/users/:name', userController.addRate);
routes.delete('/users/:name', userController.deleteUser);
routes.get('/users', userController.listaUser);
routes.post('/cache/:name', userController.consultaCache);
routes.get('/filter', userController.userFilter);

module.exports = routes;