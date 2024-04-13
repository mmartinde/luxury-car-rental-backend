// index.js
const express = require('express');
const app = express();
const port = 3000;

// Configura rutas
app.get('/', (req, res) => {
    res.send('¡Hola desde mi aplicación Node.js!');
});

// Inicia el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});