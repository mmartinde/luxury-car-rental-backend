// #IMPORTS region
const Rent = require("../models/rent.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//#region CRUD

// TODO: ACTUALIZAR TODOS LA DOCUMENTACION PARA REFLEJAR NUEVOS PARAMETROS

// #region GET y GET BY ID
//obtener todos los coches alquilados

const getAllRentCars = async (req, res) => {
  try {
    const rentCars = await Rent.find();
    return res.status(200).json(rentCars);
  } catch (error) {
    console.error("Error fetching renting cars:", error);
    return res.status(500).json(error);
  }
};

//obtener coche alquilado por id

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
  } catch (error) {
    console.error("Error creating car rent:", error);
    return res.status(500).json(error);
  }
};
//#endregion

// #region PUT
//actualizar coche alquilado

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

// #region DELETE

//eliminar coche

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
