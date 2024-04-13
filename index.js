// #region IMPORTS
const express = require("express");
const mongoose = require("mongoose");
const app = express();

// #region CONFIGURACION DE LIBRERIAS
app.use(express.json());

// #region DEFINICION DE VARIABLES
const PORT = process.env.PORT || 3000;
const databaseURL = process.env.MONGODB; //Modificar a la cadena de conexión de MongoDB en el archivo .env

// #region configuracion MONGOOSE
mongoose
  .connect(databaseURL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// #region RUTAS


//#region SERVIDOR
app.listen(PORT, () => console.log(`Server running on Port ${PORT}`));
