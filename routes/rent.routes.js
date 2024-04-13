const express = require("express");
const router = express.Router();

//importar controladores de usuario
const {
    getAllRentCars,
    getRentCarById,
    createRentCar,
    updateRentCar,
    deleteRentCar,
} = require("../controllers/rent.controller");

//obtiene todos los coches alquilados
router.get("/", getAllRentCars);

//obtiene coches alquiados por id
router.get("/:id", getRentCarById);

//crea nuevo coche alquilado
router.post("/", createRentCar);

//actualiza coche alquulado por id
router.put("/:id", updateRentCar);

//elimina coche alquilado por id
router.delete("/:id", deleteRentCar);