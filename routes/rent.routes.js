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

const {
    isAuth
} = require("../middlewares/user.middleware")

//obtiene todos los coches alquilados
router.get("/", isAuth, getAllRentCars);

//obtiene coches alquiados por id
router.get("/:id", getRentCarById);

//crea nuevo coche alquilado
router.post("/", isAuth, createRentCar);

//actualiza coche alquulado por id
router.put("/:id", isAuth, updateRentCar);

//elimina coche alquilado por id
router.delete("/:id", isAuth, deleteRentCar);

module.exports = router