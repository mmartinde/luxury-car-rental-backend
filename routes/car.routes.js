const express = require("express");
const router = express.Router();

//importar controladores de usuario
const {
    getAllCars,
    getCarById,
    createCar,
    updateCar,
    deleteCar,
} = require("../controllers/car.controller");

//obtiene todos los coches
router.get("/", getAllCars);

//obtiene coche por id
router.get("/:id", getCarById);

//crea nuevo coche
router.post("/", createCar);

//actualiza coche por id
router.put("/:id", updateCar);

//elimina coche por id
router.delete("/:id", deleteCar);