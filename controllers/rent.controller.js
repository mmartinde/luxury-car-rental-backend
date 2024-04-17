// #IMPORTS region
const Rent = require("../models/rent.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { sendEmail } = require("../helpers/mailer");

//#region GET
//obtener todos los coches alquilados

/**
 * Obtiene todos los registros de coches en alquiler de la base de datos.
 * @async
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {Object} res - El objeto de respuesta HTTP.
 * @returns {Promise<Array>} - Una promesa que devuelve los coches alquilados.
 * @throws {Error} - Si ocurre un error durante la obtención de los registros de coches en alquiler.
 */
const getAllRentCars = async (req, res) => {
  try {
    const rentCars = await Rent.find();
    return res.status(200).json(rentCars);
  } catch (error) {
    console.error("Error fetching renting cars:", error);
    return res.status(500).json(error);
  }
};
//#endregion

//obtener coche alquilado por id

/**
 * Busca un registro de alquiler de coche en la base de datos utilizando su id.
 * @async
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {Object} res - El objeto de respuesta HTTP.
 * @returns {Promise<Object>} - Una promesa que devuelve el coche por su respectivo id.
 * @throws {Error} - Si ocurre un error durante la búsqueda del registro de alquiler de coche por su id.
 */
const getRentCarById = async (req, res) => {
  try {
    const rentCarFound = await Rent.findById(req.params.id);
    return res.status(200).json(rentCarFound);
  } catch (error) {
    console.error("Error fetching car rent by ID:", error);
    return res.status(500).json(error);
  }
};
//#endregion

// #region POST
//crear nuevo alquiler de coche

/**
 * Crea un nuevo registro de alquiler de coche en la base de datos.
 * @async
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {Object} res - El objeto de respuesta HTTP.
 * @returns {Promise<Object>} - Una promesa devuelve el coche creado.
 * @throws {Error} - Si ocurre un error durante la creación del registro de alquiler de coche.
 */
const createRentCar = async (req, res) => {
  const { id, idCar, idUser, dateIn, dateOut, price, status } = req.body;
  try {
    const newRentCar = new Rent({
      id: id,
      idCar: idCar,
      idUser: idUser,
      dateIn: dateIn,
      dateOut: dateOut,
      price: price,
      status: status,
    });
    await newRentCar.save();
    res.status(201).json(newRentCar);

    // Envia email de confirmacion de solicitud
    await sendEmail({
      to: newRentCar.idUser, // TODO: Una vez haya relacion entre Rent y User en los modelos, sacar el nombre del usuario con populate (?)
      subject:  `${newRentCar.idCar} Rental Confirmation`,
      text: `Gracias por su solicitud, ${newRentCar.idUser}!`, // TODO: Una vez haya relacion entre Rent y User en los modelos, sacar el nombre del usuario con populate (?)
      html: `<h2>Gracias por su solicitud, <strong>${newRentCar.idUser}</strong>!</h2><br><p>En breve un representante se comunicará con usted para confirmar la disponibilidad de su ${newRentCar.idCar}</p>`,
    });

    console.log("Rent request placed successfully!");
  } catch (error) {
    console.error("Error creating car rent:", error);
    return res.status(500).json(error);
  }
};

//#endregion

// #region PUT
//actualizar coche alquilado
/**
 * Actualiza un registro de alquiler de coche existente en la base de datos.
 * @async
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {Object} res - El objeto de respuesta HTTP.
 * @returns {Promise<Object>} - Una promesa que devuelve el coche actualizado.
 * @throws {Error} - Si no se encuentra ningún registro de alquiler de coche con el id especificado,
 *                   o si ocurre un error durante la actualización del registro de alquiler de coche.
 */
const updateRentCar = async (req, res) => {
  const { idUser, dateIn, dateOut, price, status } = req.body;
  try {
    const rentCarExists = await Rent.findById(req.params.id);
    if (!rentCarExists) {
      return res.status(404).json(error);
    }
    const updatedRentCar = await Rent.findByIdAndUpdate(req.params.id, {
      idUser: idUser,
      dateIn: dateIn,
      dateOut: dateOut,
      price: price,
      status: status,
    });
    return res.status(200).json(updatedRentCar);
  } catch (error) {
    console.error("Error updating car rent:", error);
    return res.status(500).json(error);
  }
};
//#endregion

//#region DELETE

//eliminar coche

/**
 * Elimina un registro de alquiler de coche de la base de datos utilizando su id.
 * @async
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {Object} res - El objeto de respuesta HTTP.
 * @returns {Promise<Object>} - Una promesa que no devuelve ningún valor explícito.
 * @throws {Error} - Si no se encuentra ningún registro de alquiler de coche con el id especificado,
 *                   o si ocurre un error durante la eliminación del registro de alquiler de coche.
 */
const deleteRentCar = async (req, res) => {
  try {
    const findRentCar = await Rent.findById(req.params.id);
    if (!findRentCar) {
      return res.status(404).json(error);
    }
    const deletedRentCar = await Rent.findByIdAndDelete(req.params.id);
    return res.status(200).json(deletedRentCar);
  } catch (error) {
    console.error("Error while deleting car rent:", error);
    return res.status(500).json(error);
  }
};
//#endregion

//#EXPORT region
module.exports = {
  getAllRentCars,
  getRentCarById,
  createRentCar,
  updateRentCar,
  deleteRentCar,
};
