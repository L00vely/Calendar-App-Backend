const express = require('express');
const dontenv = require('dotenv').config();
const { dbConnection } = require('./database/config');
const cors = require('cors');
const app = express();
const serverless = require('serverless-http');
const router = express.Router();

// Base de datos
dbConnection();

// Lectura y parseo del body
app.use( express.json() );

app.use( cors() );

// Rutas
app.use('/.netlify/functions/api/auth', require('./routes/auth') );
app.use('/.netlify/functions/api/events', require('./routes/events') );


// Directorio público
app.use( express.static('public') );


app.listen( process.env.PORT , () => {
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);
} )


module.exports.handler = serverless(app);