const express = require("express");
const router = express.Router();

//importar controladores de usuario
const {
    getAllCarRents,
    getCarRentById,
    createCarRent,
    updateCarRent,
    deleteCarRent,
} = require("../controllers/rent.controller");

const {
    isAuth
} = require("../middlewares/user.middleware")

//obtiene todos los coches alquilados
router.get("/", getAllRentCars);

//obtiene coches alquiados por id
router.get("/:id", getCarRentById);

//crea nuevo coche alquilado
router.post("/", createRentCar);

//actualiza coche alquulado por id
router.put("/:id", updateRentCar);

//elimina coche alquilado por id
router.delete("/:id", deleteRentCar);