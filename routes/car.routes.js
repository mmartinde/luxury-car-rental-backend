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
const { isAuth } = require("../middlewares/isAuth.middleware");
const { isAdmin } = require("../middlewares/permissions.middleware");

//obtiene todos los coches
router.get("/", getAllCars);

//obtiene coche por id
router.get("/:id", getCarById);

//crea nuevo coche
router.post("/", isAuth, isAdmin, createCar);

//actualiza coche por id
router.put("/:id", isAuth, isAdmin, updateCar);

//elimina coche por id
router.delete("/:id", isAuth, isAdmin, deleteCar);

module.exports = router;
