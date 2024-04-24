// #region IMPORTS
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
require("dotenv").config();
const carRoutes = require("./routes/car.routes");
const rentRoutes = require("./routes/rent.routes");
const userRoutes = require("./routes/user.routes");

// #region CONFIGURACION
app.use(express.json());
app.use(cors());

// #region DEFINICION DE VARIABLES
const PORT = process.env.PORT || 3000;
const databaseURL = process.env.MONGODB;

// #region configuracion MONGOOSE
mongoose
  .connect(databaseURL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// #region RUTAS (ENDPOINTS)
app.use("/api/cars", carRoutes);
app.use("/api/rent", rentRoutes);
app.use("/api/user", userRoutes);

//#region SERVIDOR
app.listen(PORT, () => console.log(`Server running on Port ${PORT}`));
