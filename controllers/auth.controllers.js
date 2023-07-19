const { validationResult } = require('express-validator');
const Usuario = require('../model/usuario-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
			return res.status(400).json({
				msg: 'Un usuario ya existe en este correo',
			});
		}

		usuario = new Usuario(req.body);

		//encriptar la contraseña
		const salt = bcrypt.genSaltSync(10);
		usuario.password = bcrypt.hashSync(password, salt);

		//guardar usuario en DB
		await usuario.save();

		//generar JWT
		const payload = {
			id: usuario._id,
			name: usuario.name,
			rol: usuario.rol,
		};

		const token = jwt.sign(payload, process.env.SECRET_JWT, {
			expiresIn: '2h',
		});

		res.status(201).json({
			msg: 'Usuario Registrado correctamente',
			token,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
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
			return res.status(400).json({
				msg: 'email o contraseña incorrectos',
			});
		}

		//confirmar contraseña
		const validarContraseña = bcrypt.compareSync(password, usuario.password);

		if (!validarContraseña) {
			return res.status(400).json({
				msg: 'email o contraseña incorrectos',
			});
		}

		//generar jwt
		const payload = {
			id: usuario._id,
			name: usuario.name,
			rol: usuario.rol,
		};

		const token = jwt.sign(payload, process.env.SECRET_JWT, {
			expiresIn: '10h',
		});

		res.status(200).json({
			msg: 'usuario logueado correctamente',
			token,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			msg: 'por favor contactate con el adminstrador',
		});
	}
};

module.exports = {
	crearUsuario,
	loginUsuario,
};
