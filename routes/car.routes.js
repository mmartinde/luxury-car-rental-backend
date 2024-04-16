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

const {
    isAuth
} = require("../middlewares/user.middleware")

//obtiene todos los coches
router.get("/", isAuth, getAllCars);

//obtiene coche por id
router.get("/:id", getCarById);

//crea nuevo coche
router.post("/", isAuth, createCar);

//actualiza coche por id
router.put("/:id", isAuth, updateCar);

//elimina coche por id
router.delete("/:id", isAuth, deleteCar);

module.exports = router