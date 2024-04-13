const express = require("express");
const router = express.Router();

// TODO: Importar controladores de usuario
const {} = require("");

// Obtiene todos los usuarios
router.get('/', getAllUsers);

// Obtiene usuario por ID
router.get('/:id', getUserById);

// Crea nuevo usuario
router.post('/', createUser);

// Actualiza usuario por ID
router.put('/:id', updateUser);

// Elimina usuario por ID
router.delete('/:id', deleteUser);