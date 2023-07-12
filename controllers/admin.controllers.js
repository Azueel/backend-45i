const Usuario = require('../model/usuario-model');

const cargarUsuarios = async (req, res) => {
	try {
		const usuarios = await Usuario.find();

		res.status(200).json({
			ok: true,
			usuarios,
		});
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	cargarUsuarios,
};
