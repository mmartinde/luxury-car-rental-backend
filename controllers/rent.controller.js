// #IMPORTS region
const Rent = require("../models/rent.model");

//#region CRUD

// TODO: ACTUALIZAR TODOS LA DOCUMENTACION PARA REFLEJAR NUEVOS PARAMETROS

// #region GET y GET BY ID
//obtener todos los coches alquilados
/**
 * Esta función asincrónica se utiliza para recuperar todos los coches alquilados almacenados en la base de datos.
 * @params - Ninguno
 * @returns {Promise<Array>} - Un arreglo de objetos que representan los coches alquilados encontrados en la base de datos.
 * @throws {Error} - Se lanza si ocurre algún error durante la consulta a la base de datos.
 * @description
 * Esta función utiliza la función Rent.find() para realizar la consulta a la base de datos MongoDB.
 * Si la consulta es exitosa, la función retorna un arreglo con los coches alquilados encontrados.
 * En caso de error, se registra el error en la consola y se lanza una excepción con el mensaje "Cannot get renting cars".
 */
const getAllCarRents = async (req, res) => {
  try {
    const rentCars = await Rent.find();
    return res.status(200).json(rentCars);
  } catch (error) {
    console.error("Error fetching renting cars:", error);
    return res.status(500).json(error);
  }
};

//obtener coche alquilado por id
/**
 * Esta función asincrónica se utiliza para recuperar un coche alquilado específico de la base de datos utilizando su ID.
 * @params id {String}: El ID único del coche alquilado que se desea recuperar de la base de datos.
 * @returns {Objet<null>}: - Un objeto que representa el coche alquilado encontrado en la base de datos,
 * o `null` si no se encuentra ningún coche alquilado con el ID especificado.
 * @throws {Error} - Se lanza si ocurre algún error durante la consulta a la base de datos.
 * @description
 * Esta función utiliza la función Rent.findById(id) para buscar el coche alquilado en la base de datos MongoDB utilizando su ID.
 * Si se encuentra un coche alquilado con el ID especificado, se retorna un objeto que representa ese coche alquilado.
 * Si no se encuentra ningún coche alquilado con el ID especificado, se retorna `null`.
 * En caso de error, se registra el error en la consola y se lanza una excepción con el mensaje "Cannot get rent car by ID".
 */
const getCarRentById = async (req, res) => {
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
 *
 */
const createCarRent = async (req, res) => {
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
  } catch (error) {
    console.error("Error creating car rent:", error);
    return res.status(500).json(error);
  }
};
//#endregion

// #region PUT
//actualizar coche alquilado
/**
 *
 */
const updateCarRent = async (req, res) => {
  const { idUser, dateIn, dateOut, price, status } = req.body;
  try {
    const carRentExists = await Rent.findById(req.params.id);
    if (!carRentExists) {
        return res.status(404).json(error);
    }
    const updatedCarRent = await Rent.findByIdAndUpdate(req.params.id, {
      idUser: idUser,
      dateIn: dateIn,
      dateOut: dateOut,
      price: price,
      status: status,
    });
    return res.status(200).json(updatedCarRent);
  } catch (error) {
    console.error("Error updating car rent:", error);
    return res.status(500).json(error);
  }
};
//#endregion

// #region DELETE

//eliminar coche
/**
 * Esta función asincrónica se utiliza para eliminar un registro de coche alquilado existente de la base de datos utilizando su ID.
 * @params id {String}: El ID único del registro de alquiler que se desea eliminar de la base de datos.
 * @returns {Promise<Object[null]>} - Un objeto que representa el coche alquilado eliminado de la base de datos,
 * o `null` si no se encuentra ningún coche alquilado con el ID especificado.
 * @throws {Error} - Se lanza si no se encuentra ningún coche alquilado con el ID especificado para eliminar,
 * o si ocurre algún error durante la eliminación del coche alquilado en la base de datos.
 * @description
 * Esta función busca un coche alquilado existente en la base de datos utilizando su ID.
 * Si se encuentra el coche alquilado, se elimina de la base de datos.
 * Si no se encuentra ningún coche alquilado con el ID especificado, se retorna null.
 * En caso de error, se registra el error en la consola y se lanza una excepción con el mensaje "Could not delete rent car".
 */
const deleteCarRent = async (req, res) => {
  try {
    const findCarRent = await Rent.findById(req.params.id);
    if (!findCarRent) {
        return res.status(404).json(error);
    }
    const deletedCarRent = await Rent.findByIdAndDelete(req.params.id);
    return res.status(200).json(deletedCarRent);
  } catch (error) {
    console.error("Error while deleting car rent:", error);
    return res.status(500).json(error);
  }
};
//#endregion

//#EXPORT region
module.exports = {
  getAllCarRents,
  getCarRentById,
  createCarRent,
  updateCarRent,
  deleteCarRent,
};
