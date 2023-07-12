const express = require('express');
const {
	cargarUsuarios,
	crearProducto,
	cargarProductos,
	editarProducto,
	eliminarProducto,
} = require('../controllers/admin.controllers');
// const { check } = require('express-validator');

const routerAdmin = express.Router();

routerAdmin.get('/usuarios', cargarUsuarios);

routerAdmin.post(
	'/new',
	/*aca van las validaciones de express validator (name,precio,descripcion)*/ crearProducto
);

routerAdmin.get('/productos', cargarProductos);

routerAdmin.put('/editar', editarProducto);

routerAdmin.delete('/eliminar/:id', eliminarProducto);

module.exports = routerAdmin;
