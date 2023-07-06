const express = require('express');
const { crearUsuario, loginUsuario } = require('../controllers/auth.controllers');
const { check } = require('express-validator');

const routerAuth = express.Router();

routerAuth.post(
	'/new',
	[
		check('name', 'el nombre es obligatorio').not().isEmpty(),
		check('email', 'el email no es valido').not().isEmpty().isEmail(),
		check('password', 'la contraseña debe ser mayor a 5 caracteres').isLength({
			min: 5,
		}),
	],
	crearUsuario
);

routerAuth.post(
	'/login',
	[
		check('email', 'el email no es valido').not().isEmpty().isEmail(),
		check('password', 'la contraseña debe ser mayor a 5 caracteres').isLength({
			min: 5,
		}),
	],
	loginUsuario
);

module.exports = routerAuth;
