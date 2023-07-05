const express = require('express');
const dontenv = require('dotenv').config();
const { dbConnection } = require('./database/config');
const cors = require('cors');
const app = express();

// Base de datos
dbConnection();

// Lectura y parseo del body
app.use( express.json() );

app.use( cors() );

// Rutas
app.use('/api/auth', require('./routes/auth') );
app.use('/api/events', require('./routes/events') );


// Directorio público
app.use( express.static('public') );


app.listen( process.env.PORT , () => {
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);
} )