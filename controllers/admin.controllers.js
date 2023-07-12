const Productos = require('../model/producto-model');
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

const crearProducto = async (req, res) => {
	try {
		const producto = new Productos(req.body);

		//guardar usuario en DB
		await producto.save();

		res.status(201).json({
			msg: 'Producto Creado correctamente',
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			msg: 'por favor contactate con el adminstrador',
		});
	}
};

const cargarProductos = async (req, res) => {
	try {
		const productos = await Productos.find();

		res.status(200).json({
			ok: true,
			productos,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			msg: 'por favor contactate con el adminstrador',
		});
	}
};

const editarProducto = async (req, res) => {
	try {
		const productoEditar = await Productos.findById(req.body._id);

		if (!productoEditar) {
			return res.status(404).json({
				ok: false,
				msg: 'No existe ningun producto con este ID',
			});
		}

		await Productos.findByIdAndUpdate(req.body._id, req.body);
		res.status(200).json({
			ok: true,
			msg: 'producto Editado',
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			msg: 'por favor contactate con el adminstrador',
		});
	}
};

const eliminarProducto = async (req, res) => {
	try {
		const productoEliminar = await Productos.findById(req.params.id);

		if (!productoEliminar) {
			return res.status(404).json({
				ok: false,
				msg: 'No existe ningun producto con este ID',
			});
		}

		await Productos.findByIdAndDelete(req.params.id);

		res.status(200).json({
			ok: true,
			msg: 'Producto Eliminado exitosamente',
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			msg: 'por favor contactate con el adminstrador',
		});
	}
};

module.exports = {
	cargarUsuarios,
	crearProducto,
	cargarProductos,
	editarProducto,
	eliminarProducto,
};
