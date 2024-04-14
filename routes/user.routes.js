const express = require("express");
const router = express.Router();

// TODO: Importar controladores de usuario
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");

// Obtiene todos los usuarios
router.get("/", async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    console.log(String(error));
    res.status(500).json({ msg: "internal error" });
  }
});

// Obtiene usuario por ID
router.get("/:id", async (req, res) => {
  try {
    const foundUser = getUserById(req.params.id);
    if (foundUser) {
      res.json(foundUser);
    } else {
      res.status(404).json({ msg: "error: user not found" });
    }
  } catch (error) {
    console.log(String(error));
    res.status(500).json({ msg: "internal error" });
  }
});

// Crea nuevo usuario
router.post("/", async (req, res) => {
  try {
   // console.log(req.body); TODO: Delete console log
    const newUser = await createUser(
      req.body.name?.trim(),
      req.body.surname?.trim(),
      req.body.license?.trim(),
      req.body.dob,
      req.body.address?.trim(),
      req.body.email?.trim(),
      req.body.phone?.trim(),
      req.body.role
      //req.body.password //TODO: I need to add this to the Schema
    );
    res.json({ msg: "user created successfuly" });
  } catch (error) {
    console.log(String(error));
    res.status(500).json({ msg: "internal error" });
  }
});

// Actualiza usuario por ID
router.put("/:id", updateUser);

// Elimina usuario por ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedUser = await deleteUser(req.params.id);
    if (deletedUser) {
      res.json({ msg: "user deleted" });
    } else {
      res.status(404).json({ msg: "user not found" });
    }
  } catch (error) {
    console.log(String(error));
    res.status(500).json({ msg: "internal error" });
  }
});

//Exporta las rutas al router
module.exports = router;
