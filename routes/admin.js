const express = require('express');
const { cargarUsuarios } = require('../controllers/admin.controllers');
// const { check } = require('express-validator');

const routerAdmin = express.Router();

routerAdmin.get('/usuarios', cargarUsuarios);

module.exports = routerAdmin;
