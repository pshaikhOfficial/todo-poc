'use strict'

const routes = require('express').Router({ mergeParams: true });

module.exports = (services, models) => {
    routes.get('/todos', require('./get'));
    routes.post('/todo', require('./post'));
    routes.put('/todo/:id', require('./put'));
    routes.delete('/todo/:id', require('./delete'));
    return routes;
}