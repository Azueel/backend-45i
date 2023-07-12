const express = require('express');
const { dbConnection } = require('./database/config');
const app = express();
require('dotenv').config();
const cors = require('cors');

//lectura y parseo del body
app.use(express.json());

//llamar cors
app.use(cors());

//coneccion a la base de datos
dbConnection();

//directorio pubico
app.use(express.static('public'));

app.use('/auth', require('./routes/auth'));
app.use('/admin', require('./routes/admin'));

app.listen(process.env.PORT, () => {
	console.log(`servidor corriendo en el puerto ${process.env.PORT}`);
});
