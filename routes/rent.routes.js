const express = require("express");
const router = express.Router();

//importar controladores de renta
const {
  getAllRentCars,
  getRentCarById,
  getRentByUserId,
  createRentCar,
  updateRentCar,
  deleteRentCar,
} = require("../controllers/rent.controller");
const { isAuth } = require("../middlewares/isAuth.middleware");
const { isAdmin } = require("../middlewares/permissions.middleware");
const { checkRentOwnership, checkRentHistoryOwnership } = require("../middlewares/isOwner.middleware.js");

//Obtiene todos los coches alquilados
//router.get("/", isAuth, isAdmin, getAllRentCars); TODO: Revisar necesidad del controlador (getAllRentCars)

//#region GET
//Obtiene todas las rentas sin importar estado
router.get("/", isAuth, isAdmin, async (req, res) => {
  //
  try {
    const rentCars = await getAllRentCars();
    res.status(200).json(rentCars);
  } catch (error) {
    console.error("Could not get all rent cars:", error);
    res.status(500).json({ msg: "Internal error" });
  }
});

//Obtiene una renta por id de renta. Tanto usuarios como administradores pueden obtener una renta por ID. En ambos, chequea que sea el user asignado en la renta o si el rol es admin, siempre permite

router.get("/:id", isAuth, checkRentOwnership, async (req, res) => {
  try {
    const foundRentCar = await getRentCarById(req.params.id);
    if (foundRentCar) {
      res.status(200).json(foundRentCar);
    } else {
      res.status(404).json({ msg: "Error: Rent car not found" });
    }
  } catch (error) {
    console.error("Could not find rent car id:", error);
    res.status(500).json({ msg: "Internal error" });
  }
});

router.get("/history/:id", isAuth, async (req, res) => {
  try {
    const foundUserHistory = await getRentByUserId(req.params.id);
    if (foundUserHistory) {
      res.status(200).json(foundUserHistory);
    } else {
      res.status(404).json({ msg: "Error: User history not found" });
    }
  } catch (error) {
    console.error("Could not find user history: ", error);
    res.status(500).json({ msg: "Internal error" });
  }
});

//#endregion

//#region POST

//Crea nuevo registro de renta
router.post("/", isAuth, async (req, res) => {
  try {
    const newRentCar = await createRentCar(
      req.body.car,
      req.body.user,
      req.body.dateIn,
      req.body.dateOut,
      req.body.price,
      req.body.status
    );
    res.json({ msg: "New rent car created successfully" });
  } catch (error) {
    console.error("Could not create rent car:", error);
    res.status(500).json({ msg: "Internal error" });
  }
});
//#endregion

//#region PUT
//actualiza el registro de renta por id. Significa, que una vez rentado el coche, el usuario no puede modificar las fechas.
router.put("/:id", isAuth, isAdmin, async (req, res) => {
  try {
    const updatedRentCar = await updateRentCar(
      req.params.id,
      req.body.car,
      req.body.user,
      req.body.dateIn,
      req.body.dateOut,
      req.body.price,
      req.body.status
    );
    res.json(updatedRentCar);
  } catch (error) {
    console.error("Could not update rent car:", error);
    res.status(500).json({ msg: "Internal error" });
  }
});
//#endregion

//#region DELETE

//elimina coche alquilado por id. Solo el administrador puede eliminar un registro de renta de la base de datos.
router.delete("/:id", isAuth, isAdmin, async (req, res) => {
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
});

//#endregion

module.exports = router;
