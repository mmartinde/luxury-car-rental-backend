const express = require("express");
const router = express.Router();

// TODO: Crear Middleware extra para asegurarse que el usuario es quien renta.

//importar controladores de usuario
const {
  getAllRentCars,
  getRentCarById,
  createRentCar,
  updateRentCar,
  deleteRentCar,
} = require("../controllers/rent.controller");
const { isAuth } = require("../middlewares/isAuth.middleware");
const { isAdmin } = require("../middlewares/permissions.middleware");

//obtiene todos los coches alquilados
router.get("/", isAuth, isAdmin, getAllRentCars); // TODO: Revisar necesidad del controlador (getAllRentCars)

//obtiene coches alquiados por id
router.get("/:id", isAuth, getRentCarById);

//crea nuevo coche alquilado
router.post("/", isAuth, isAdmin, createRentCar);

//actualiza coche alquulado por id
router.put("/:id", isAuth, isAdmin, updateRentCar);

//elimina coche alquilado por id
router.delete("/:id", isAuth, isAdmin, deleteRentCar);

module.exports = router;
