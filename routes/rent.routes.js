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

//obtiene todos los coches alquilados
router.get("/", getAllCarRents);

//obtiene coches alquiados por id
router.get("/:id", getCarRentById);

//crea nuevo coche alquilado
router.post("/", createCarRent);

//actualiza coche alquulado por id
router.put("/:id", updateCarRent);

//elimina coche alquilado por id
router.delete("/:id", deleteCarRent);

module.exports = router;