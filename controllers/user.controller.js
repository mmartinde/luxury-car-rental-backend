// #region IMPORTS
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const { encryptPassword } = require("../helpers/crypt");
const { comparePassword } = require("../helpers/crypt");
require("dotenv").config();

// #endregion

// #region CRUD

// #region FIND AND FIND BY ID
/**
 * Obtiene todos los usuarios de la base de datos.
 *
 * Esta función asincrónica intenta recuperar todos los usuarios almacenados en la base de datos
 * utilizando Mongoose. La función espera la promesa de `user.find()`, que busca todos los documentos
 * dentro de la colección de usuarios.
 *
 * @returns {Promise<Array>} Una promesa que resuelve en un arreglo de objetos usuario.
 *
 * @throws {Error} Lanza un error si no se pueden obtener los usuarios de la base de datos.
 *
 * @description
 * La función `getAllUsers` es parte del controlador de usuarios en una aplicación Node.js que utiliza
 * Mongoose para la interacción con una base de datos MongoDB. La implementación utiliza `try-catch`
 * para manejar errores que pueden ocurrir durante la búsqueda de los usuarios. Si la operación es
 * exitosa, retorna un arreglo con los usuarios encontrados; si falla, captura el error y lanza una
 * excepción con un mensaje descriptivo.
 */
async function getAllUsers() {
  try {
    const users = await User.find(); // Realiza la consulta a la base de datos
    return users; // Retorna los usuarios encontrados
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Cannot get all users"); // Maneja errores durante la consulta
  }
}

/**
 * Obtiene un usuario específico por su ID desde la base de datos.
 *
 * Esta función asincrónica intenta recuperar un usuario por su identificador único (ID) utilizando Mongoose.
 * La función espera la promesa de `user.findById(id)`, que busca un documento específico en la colección
 * de usuarios por su ID.
 *
 * @param {String} id - El ID único del usuario a buscar.
 * @returns {Promise<Object>} Una promesa que resuelve en el objeto del usuario encontrado.
 *
 * @throws {Error} Lanza un error si no se puede obtener el usuario con el ID especificado.
 *
 * @description
 * La función `getUserById` busca un usuario en la base de datos de MongoDB utilizando su ID.
 * El proceso es manejado mediante una operación asincrónica. Si la búsqueda es exitosa, retorna
 * el usuario; si ocurre un error durante la operación, el error es capturado en un bloque `catch`,
 * se registra en la consola y luego se lanza una excepción para notificar al llamador del error.
 */
async function getUserById(id) {
  try {
    const userFound = await User.findById(id); // Realiza la consulta a la base de datos con el ID proporcionado
    return userFound; // Retorna el usuario encontrado
  } catch (error) {
    console.error("Error fetching user by ID:", error); // Registra el error en la consola
    throw new Error("Cannot get user by ID"); // Lanza una nueva excepción con un mensaje específico
  }
}

// #endregion

// #region CREATE

/**
 * Crea un nuevo usuario en la base de datos.
 *
 * Esta función asincrónica crea un nuevo usuario utilizando los parámetros proporcionados y lo guarda
 * en la base de datos usando Mongoose. Todos los campos son necesarios para crear correctamente el
 * usuario.
 *
 * @param {String} nam - Nombre del usuario.
 * @param {String} sur - Apellido del usuario.
 * @param {String} lic - Número de licencia del usuario, debe ser único.
 * @param {Date} dob - Fecha de nacimiento del usuario.
 * @param {String} addr - Dirección del usuario.
 * @param {String} mail - Correo electrónico del usuario, debe ser único.
 * @param {String} phone - Número de teléfono del usuario.
 * @param {String} role - Rol del usuario (por ejemplo, 'admin', 'usuario', etc.).
 * @returns {Promise<Object>} Una promesa que resuelve en el objeto del usuario creado.
 *
 * @throws {Error} Lanza un error si la creación del usuario falla por cualquier motivo, incluyendo
 * problemas de validación o fallos en la conexión a la base de datos.
 *
 * @description
 * La función `createUser` intenta crear un nuevo usuario con la información proporcionada. Si la
 * operación es exitosa, retorna el usuario recién creado. Si ocurre un error durante el proceso,
 * como un fallo de validación (por ejemplo, correo duplicado), se captura el error, se registra en
 * la consola y luego se lanza una excepción para que el llamador pueda manejarlo adecuadamente.
 */
async function createUser(nam, sur, lic, dob, addr, mail, phone, role, pass) {
  try {
    const newUser = new User({
      name: nam,
      surname: sur,
      license: lic,
      dob: dob,
      address: addr,
      email: mail,
      phone: phone,
      role: role,
      password: pass,
    });

    await newUser.save();
    return newUser;
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Error creating new user");
  }
}

// #endregion

// #region UPDATE
/**
 * Actualiza la información de un usuario existente en la base de datos.
 *
 * Esta función asincrónica verifica primero si el usuario existe mediante su ID. Si el usuario no
 * existe, lanza un error. Si existe, procede a actualizar sus datos con la nueva información
 * proporcionada.
 *
 * @param {String} id - El ID único del usuario a actualizar.
 * @param {String} nam - El nuevo nombre del usuario.
 * @param {String} sur - El nuevo apellido del usuario.
 * @param {String} lic - La nueva licencia del usuario.
 * @param {Date} dob - La nueva fecha de nacimiento del usuario.
 * @param {String} addr - La nueva dirección del usuario.
 * @param {String} phone - El nuevo número de teléfono del usuario.
 * @returns {Promise<Object>} Una promesa que resuelve en el objeto del usuario actualizado.
 *
 * @throws {Error} Lanza un error si el usuario no está registrado o si no se puede actualizar por algún motivo.
 *
 * @description
 * La función `updateUser` busca primero al usuario por su ID para asegurarse de que existe. Si no encuentra
 * al usuario, lanza un error indicando que el usuario no está registrado. Si el usuario existe, utiliza
 * `User.findByIdAndUpdate` para actualizar los datos del usuario con los valores proporcionados. Si la
 * actualización es exitosa, retorna el usuario actualizado; si ocurre un error durante la actualización,
 * captura el error, registra un mensaje en la consola y luego lanza una excepción para informar al llamador
 * del problema encontrado.
 */
async function updateUser(
  id,
  name,
  surname,
  license,
  dob,
  address,
  phone,
  email,
  password
) {
  console.log(id);
  try {
    const userExists = await User.findById(id); // Verifica si el usuario existe
    if (!userExists) {
      throw new Error("user not registered"); // Si no existe, lanza un error
    }

    if (password) {
      const encryptedPassword = await encryptPassword(password);
      password = encryptedPassword;
    }
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        name: name,
        surname: surname,
        license: license,
        dob: dob,
        address: address,
        phone: phone,
        email: email,
        password: password,
      },
      { new: true } // Opción 'new: true' para devolver el documento actualizado
    );

    return updatedUser; // Retorna el usuario actualizado
  } catch (error) {
    console.error("Error updating user:", error); // Registra el error en la consola
    throw new Error("Could not update user");
  }
}

// #endregion

// #region DELETE
/**
 * Elimina un usuario específico de la base de datos mediante su ID.
 *
 * Esta función asincrónica intenta encontrar y eliminar un usuario existente en la base de datos.
 * Si el usuario no se encuentra, lanza un error indicando que el usuario no fue encontrado.
 *
 * @param {String} id - El ID único del usuario a eliminar.
 * @returns {Promise<Object>} Una promesa que resuelve en el objeto del usuario eliminado.
 *
 * @throws {Error} Lanza un error si el usuario no se encuentra o si ocurre un problema durante
 * el proceso de eliminación.
 *
 * @description
 * La función `deleteUser` comienza por buscar al usuario por su ID utilizando `User.findById`.
 * Si el usuario no existe, se lanza un error. Si el usuario se encuentra, se procede a eliminarlo
 * con `User.findByIdAndDelete`. Si la eliminación es exitosa, retorna el usuario eliminado; si no,
 * captura cualquier error que ocurra durante el proceso y lanza una excepción indicando que no se pudo
 * eliminar al usuario.
 */
async function deleteUser(id) {
  try {
    const findUser = await User.findById(id); // Intenta encontrar al usuario en la base de datos
    if (!findUser) {
      throw new Error("user not found"); // Lanza un error si el usuario no existe
    }

    const deletedUser = await User.findByIdAndDelete(id); // Procede a eliminar al usuario

    return deletedUser; // Retorna el usuario eliminado
  } catch (error) {
    console.error("Error while deleting user:", error); // Registra el error en la consola
    throw new Error("Could not delete user");
  }
}

// #endregion

// #endregion

// #region LOGIN

/**
 * Realiza la autenticación de un usuario basándose en el correo electrónico y la contraseña.
 *
 * Esta función asincrónica intenta encontrar un usuario en la base de datos que coincida con el correo electrónico proporcionado.
 * Si encuentra al usuario, verifica si la contraseña proporcionada coincide con la almacenada en la base de datos usando hashing.
 * Si las credenciales son correctas, genera un token JWT para la sesión del usuario.
 *
 * @param {String} mail - Correo electrónico del usuario que intenta iniciar sesión.
 * @param {String} pass - Contraseña proporcionada por el usuario para intentar la autenticación.
 * @returns {Promise<Object>} Una promesa que resuelve en un objeto que contiene el correo electrónico del usuario,
 * el token de sesión si la autenticación es exitosa, y un mensaje de error si algo falla.
 *
 * @throws {Object} Retorna un objeto con `email`, `token` como null y un mensaje de error si:
 *                   - El correo electrónico no existe en la base de datos.
 *                   - La contraseña no coincide con nuestros registros.
 *                   - Ocurrió un error durante el proceso de autenticación.
 *
 * @description
 * La función primero busca al usuario por su correo electrónico con `User.findOne({ email: mail })`.
 * Si el usuario no se encuentra, retorna un objeto indicando que el correo electrónico no existe.
 * Si el usuario existe, procede a comparar la contraseña proporcionada con la almacenada en la base de datos.
 * Esto se hace a través de la función `comparePassword(pass, userFound.password)`, que usa hashing para la comparación.
 * Si la contraseña es correcta, se genera un token JWT con `jwt.sign` que contiene el ID del usuario, su nombre y rol.
 * Este token es configurado para expirar en 1 hora. Si todo es exitoso, retorna el usuario y el token; si no, retorna un mensaje de error.
 */
async function login(mail, pass) {
  try {
    const userFound = await User.findOne({ email: mail });
    if (!userFound) {
      return { email: null, token: null, msg: "e-mail does not exist" };
    }

    const isMatch = await comparePassword(userFound.password, pass);
    if (!isMatch) {
      return {
        email: null,
        token: null,
        msg: "password does not match our records",
      };
    }
    const token = jwt.sign(
      { id: userFound._id, name: userFound.name, role: userFound.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    return { email: userFound, token: token, role: userFound.role, msg: null };
  } catch (error) {
    console.error("Login error:", error);
    return { email: null, token: null, msg: "Login error" };
  }
}

// #endregion

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  login,
};
