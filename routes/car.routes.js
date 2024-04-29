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
const { isAdmin } = require("../middlewares/permissions.middleware");

//obtiene todos los coches
//router.get("/", getAllCars);

//#region GET
//Obtiene todos los coches
router.get("/", async (req, res) => {
  try {
    const cars = await getAllCars();
    res.json(cars);
  } catch (error) {
    console.error("Could not get all cars:", error);
    res.status(500).json({ msg: "Internal error" });
  }
})

//obtiene coche por id
//router.get("/:id", getCarById);

router.get("/:id", async (req, res) => {
  try {
    const foundCar = await getCarById(req.params.id);
    if (foundCar) {
      res.json(foundCar);
    } else {
      res.status(404).json({ msg: "Error: Car not found" });
    }
  } catch (error) {
    console.error("Could not find car id:", error);
    res.status(500).json({ msg: "Internal error" });
  }
})
//#endregion

//#region POST
// crea nuevo coche

router.post("/", isAdmin, async (req, res) => {
  try {
    const newCar = await createCar(
      req.body.make?.trim(),
      req.body.model?.trim(),
      req.body.plate?.trim(),
      req.body.year,
      req.body.hp,
      req.body.cc,
      req.body.colour?.trim(),
      req.body.seats,
      req.body.price,
      req.body.transmission?.trim(),
      req.body.description?.trim(),
      req.body.picture?.trim(),
    )
    res.json({ msg: "New car created successfully" });
  } catch (error) {
    console.error("Could not create new car:", error);
    res.status(500).json({ msg: "Internal error" });
  }
})
// #endregion

//#region PUT
//actualiza coche por id
//router.put("/:id", isAuth, isAdmin, updateCar);

router.put("/:id", isAdmin, async (req, res) => {
  try {
    const updatedCar = await updateCar(
      req.params.id,
      req.body.make?.trim(),
      req.body.model?.trim(),
      req.body.plate?.trim(),
      req.body.year,
      req.body.hp,
      req.body.cc,
      req.body.colour?.trim(),
      req.body.seats,
      req.body.price,
      req.body.transmission?.trim(),
      req.body.description?.trim(),
      req.body.picture?.trim(),
    )
    res.json(updatedCar);
  } catch (error) {
    console.error("Could not update car:", error);
    res.status(500).json({ msg: "Internal error" });
  }
})
//#endregion

//#region DELETE
//elimina coche por id
//router.delete("/:id", isAuth, isAdmin, deleteCar);

router.delete("/:id", isAdmin, async (req, res) => {
  try {
    const deletedCar = await deleteCar(req.params.id);
    if (deletedCar) {
      res.json({ msg: "Car deleted" });
    } else {
      res.status(404).json({ msg: "Car not found" });
    }
  } catch (error) {
    console.error("Could not delete car:", error);
    res.status(500).json({ msg: "Internal error" });
  }
})
//#endregion

module.exports = router;
