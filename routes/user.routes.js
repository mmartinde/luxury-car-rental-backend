// #region IMPORTS
const express = require("express");
const router = express.Router();

// // TODO: Importar controladores de usuario
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");
const encryptPassword = require("../helpers/encryptor");
// #endregion

// #region CRUD
// #region RUTAS GET
// Obtiene todos los usuarios
router.get("/", async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    console.error("Could not get all users:", error);
    res.status(500).json({ msg: "internal error" });
  }
});

// Obtiene usuario por ID
router.get("/:id", async (req, res) => {
  try {
    const foundUser = await getUserById(req.params.id);
    if (foundUser) {
      res.json(foundUser);
    } else {
      res.status(404).json({ msg: "error: user not found" });
    }
  } catch (error) {
    console.error("Could not find user ID:", error);
    res.status(500).json({ msg: "internal error" });
  }
});

// #endregion

// #region RUTA REGISTRO
// Crea nuevo usuario
router.post("/", async (req, res) => {
  try {
    // Encripta la contraseña antes de guardar el usuario en BBDD.
    const encryptedPassword = await encryptPassword(req.body.password);

    const newUser = await createUser(
      req.body.name?.trim(),
      req.body.surname?.trim(),
      req.body.license?.trim(),
      req.body.dob,
      req.body.address?.trim(),
      req.body.email?.trim(),
      req.body.phone?.trim(),
      req.body.role,
      encryptedPassword
    );
    res.json({ msg: "user created successfuly" });
  } catch (error) {
    console.error("Could not create user:", error);
    res.status(500).json({ msg: "internal error" });
  }
});

// #endregion

// #region RUTA MODIFICAR USUARIO

// Actualiza usuario por ID
router.put("/:id", async (req, res) => {
  try {
    const updatedUser = await updateUser(
      req.params.id,
      req.body.name?.trim(),
      req.body.surname?.trim(),
      req.body.license?.trim(),
      req.body.dob,
      req.body.address?.trim(),
      req.body.phone?.trim(),
      req.body.password?.trim() // TODO: Revisar si esta lógica funciona para modificar el password.
    );
    res.json({ user: updatedUser });
  } catch (error) {
    console.error("Could not update user:", error);
    res.status(500).json({ msg: "internal error" });
  }
});

// #endregion

// #region RUTA ELIMINAR CUENTA USUARIO
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
    console.error("Could not delete user:", error);
    res.status(500).json({ msg: "internal error" });
  }
});

// #endregion
// #endregion

//Exporta las rutas al router
module.exports = router;
