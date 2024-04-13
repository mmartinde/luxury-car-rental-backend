const express = require("express");
const router = express.Router();

// TODO: Importar controladores de usuario
const {
    getAllCars,
    getCarById,
    createCar,
    updateCar,
    deleteCar,
} = require("../controllers/car.controller");

// Obtiene todos los usuarios
router.get("/", getAllCars);

// Obtiene usuario por ID
router.get("/:id", getCarById);

// Crea nuevo usuario
router.post("/", createCar);

// Actualiza usuario por ID
router.put("/:id", updateCar);

// Elimina usuario por ID
router.delete("/:id", deleteCar);