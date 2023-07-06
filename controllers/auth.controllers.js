const { validationResult } = require('express-validator');
const Usuario = require('../model/usuario-model');
const bcrypt = require('bcrypt');

const crearUsuario = async (req, res) => {
	const { name, email, password } = req.body;

	//validacion de express-validator
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.json({
			errors: errors.mapped(),
		});
	}

	try {
		//Validar si el email del usuario existe en la base de datos
		let usuario = await Usuario.findOne({ email });

		if (usuario) {
			return res.json({
				msg: 'Un usuario ya existe en este correo',
			});
		}

		usuario = new Usuario(req.body);

		//encriptar la contraseña
		const salt = bcrypt.genSaltSync(10);
		usuario.password = bcrypt.hashSync(password, salt);

		//guardar usuario en DB
		await usuario.save();

		res.json({
			msg: 'Usuario Registrado correctamente',
		});
	} catch (error) {
		console.log(error);
		res.json({
			msg: 'por favor contactate con el adminstrador',
		});
	}
};

const loginUsuario = async (req, res) => {
	const { email, password } = req.body;

	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.json({
			errors: errors.mapped(),
		});
	}

	try {
		//validacion si existe el usuario
		let usuario = await Usuario.findOne({ email });

		if (!usuario) {
			return res.json({
				msg: 'email o contraseña incorrectos',
			});
		}

		//confirmar contraseña
		const validarContraseña = bcrypt.compareSync(password, usuario.password);

		if (!validarContraseña) {
			return res.json({
				msg: 'email o contraseña incorrectos',
			});
		}

		res.json({
			msg: 'usuario logueado correctamente',
		});
	} catch (error) {
		console.log(error);
		res.json({
			msg: 'por favor contactate con el adminstrador',
		});
	}
};

module.exports = {
	crearUsuario,
	loginUsuario,
};
