const express = require('express');
const {
	cargarUsuarios,
	crearProducto,
	cargarProductos,
	editarProducto,
	eliminarProducto,
} = require('../controllers/admin.controllers');
const { validarJWT } = require('../middlewares/validar-jwt');
// const { check } = require('express-validator');

const routerAdmin = express.Router();

routerAdmin.get('/usuarios', validarJWT, cargarUsuarios);

routerAdmin.post(
	'/new',
	validarJWT,
	/*aca van las validaciones de express validator (name,precio,descripcion)*/
	crearProducto
);

routerAdmin.get('/productos', validarJWT, cargarProductos);

routerAdmin.put('/editar', validarJWT, editarProducto);

routerAdmin.delete('/eliminar/:id', validarJWT, eliminarProducto);

module.exports = routerAdmin;
