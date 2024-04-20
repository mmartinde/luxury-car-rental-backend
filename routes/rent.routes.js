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
const { checkOwnership } = require("../middlewares/isOwner.middleware.js");

//Obtiene todos los coches alquilados
//router.get("/", isAuth, isAdmin, getAllRentCars); TODO: Revisar necesidad del controlador (getAllRentCars)

//#region GET
//Obtiene todos los coches alquilados por el usuario
router.get("/", isAuth, async (req, res) => {
  try {
    const rentCars = await getAllRentCars();
    res.json(rentCars);
  } catch (error) {
    console.error("Could not get all rent cars:", error);
    res.status(500).json({ msg: "Internal error" });
  }
})

//Obtiene los coches alquilados por id
//router.get("/:id", isAuth, getRentCarById);

router.get("/:id", isAuth,  async (req, res) => {
  try {
    const foundRentCar = await getRentCarById(req.params.id);
    if (foundRentCar) {
      res.json(foundRentCar);
    } else {
      res.status(404).json({ msg: "Error: Rent car not found" });
    }
  } catch (error) {
    console.error("Could not find rent car id:", error);
    res.status(500).json({ msg: "Internal error" });
  }
})
//#endregion

//#region POST
//Crea nuevo coche alquilado
//router.post("/", isAuth, isAdmin, createRentCar);

router.post("/", async (req, res) => {
  try {
    const newRentCar = await createRentCar(
      req.body.car,
      req.body.user,
      req.body.dateIn,
      req.body.dateOut,
      req.body.price,
      req.body.status
    )
    res.json({ msg: "New rent car created successfully" });
  } catch (error) {
    console.error("Could not create rent car:", error);
    res.status(500).json({ msg: "Internal error" });
  }
})
//#endregion

//#region PUT
//actualiza el coche alquilado por id
//router.put("/:id", isAuth, isAdmin, updateRentCar);

router.put("/:id", isAuth,  async (req, res) => {
  try {
    const updatedRentCar = await updateRentCar(
      req.params.id,
      req.body.car,
      req.body.user,
      req.body.dateIn,
      req.body.dateOut,
      req.body.price,
      req.body.status
    )
    res.json(updatedRentCar);
  } catch (error) {
    console.error("Could not update rent car:", error);
    res.status(500).json({ msg: "Internal error" });
  }
})
//#endregion

//#region DELETE
//elimina coche alquilado por id
//router.delete("/:id", isAuth, isAdmin, deleteRentCar);

router.delete("/:id", isAdmin, async (req, res) => {
  try {
    const deletedRentCar = await deleteRentCar(req.params.id);
    if (deletedRentCar) {
      res.json({ msg: "Rent car deleted" });
    } else {
      res.status(404).json({ msg: "Rent car not found" });
    }
  } catch (error) {
    console.error("Could not delete rent car:", error);
    res.status(500).json({ msg: "Internal error" });
  }
})
//#endregion

module.exports = router;
