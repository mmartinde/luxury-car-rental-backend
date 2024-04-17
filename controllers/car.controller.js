// #IMPORTS region
const Car = require("../models/car.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//#region GET
//obtener todos los coches

/**
 * Obtiene todos los coches de la base de datos.
 * @async
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {Object} res - El objeto de respuesta HTTP.
 * @returns {Promise<Array>} - Una promesa que devuelve todos los coches.
 * @throws {Error} - Si ocurre un error durante la obtención de los coches.
 */
const getAllCars = async(req, res) => {
    try {
        const cars = await Car.find();
        return res.status(200).json(cars);
    } catch (error) {
        console.error("Error fetching cars:", error);
        return res.status(500)("Cannot get cars");
    }
}
//#endregion

//obtener coche por id

/**
 * Busca un coche en la base de datos utilizando su id.
 * @async
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {Object} res - El objeto de respuesta HTTP.
 * @returns {Promise<Object>} - Una promesa que devuelve el coche por su respectivo id.
 * @throws {Error} - Si ocurre un error durante la búsqueda del coche por su id.
 */
const getCarById = async (req, res) => {
    try {
        const carFound = await Car.findById(req.params.id);
        return res.status(200).json(carFound);
    } catch (error) {
        console.error("Error fetching car by ID:", error);
        return res.status(500).json(error);
    }
}
//#endregion

//#region POST

/**
 * Crea un nuevo registro de coche en la base de datos.
 * @async
 * @param {Object} req - El objeto de solicitud HTTP que contiene los datos del coche a crear en el cuerpo de la solicitud.
 * @param {Object} res - El objeto de respuesta HTTP utilizado para enviar la respuesta al cliente.
 * @returns {Promise<Object>} - Una promesa que devuelve el coche creado.
 * @throws {Error} - Si ocurre un error durante la creación del nuevo registro de coche.
 */
const createCar = async (req, res) => {
    const {make, model, plate, year, hp, cc, colour, seats, price, transmission, description} = req.body;
        try {
            const newCar = new Car({
                make: make,
                model: model,
                plate: plate,
                year: year,
                hp: hp,
                cc: cc,
                colour: colour,  
                seats: seats,
                price: price,
                transmission: transmission,
                description: description,
            });
            await newCar.save();
            res.status(200).json(newCar)
        } catch (error) {
            console.error("Error creating car:", error);
            return res.status(500).json(error);
        }
}
//#endregion

//#region PUT
//actualizar coche

/**
 * Actualiza un registro de coche existente en la base de datos.
 * @async
 * @param {Object} req - El objeto de solicitud HTTP que contiene los datos del coche a actualizar en el cuerpo de la solicitud, así como el ID del coche a actualizar en los parámetros de la ruta.
 * @param {Object} res - El objeto de respuesta HTTP utilizado para enviar la respuesta al cliente.
 * @returns {Promise<Object>} - Una promesa que no devuelve ningún valor explícito.
 * @throws {Error} - Si no se encuentra ningún coche con el ID especificado, o si ocurre un error durante la actualización del coche.
 */
const updateCar = async (req, res) => {
    const {make, model, plate, year, hp, cc, colour, seats, price, transmission, description} = req.body 
    try {
        const carExists = await Car.findById(req.params.id);
            if (!carExists) {
                return res.status(404).json(error);
                }
            const updatedCar = await Car.findByIdAndUpdate(req.params.id, {
                make: make,
                model: model,
                plate: plate,
                year: year,
                hp: hp,
                cc: cc,
                colour: colour,  
                seats: seats,
                price: price,
                transmission: transmission,
                description: description,
            });
            return res.status(200).json(updatedCar);
        } catch (error) {
            console.error("Error updating car:", error);
            return res.status(500).json(error);
        }
}

//#endregion

//#region DELETE
//eliminar coche

/**
 * Elimina un registro de coche de la base de datos utilizando su id.
 * @async
 * @param {Object} req - El objeto de solicitud HTTP que contiene el id del coche a eliminar en los parámetros de la ruta.
 * @param {Object} res - El objeto de respuesta HTTP utilizado para enviar la respuesta al cliente.
 * @returns {Promise<Object>} - Una promesa que devuelve el coche eliminado.
 * @throws {Error} - Si no se encuentra ningún coche con el id especificado, o si ocurre un error durante la eliminación del coche.
 */
const deleteCar = async (req, res) => {
    try {
        const findCar = await Car.findById(req.params.id);
            if (!findCar) {
            return res.status(404).json(error);
            }
        const deletedCar = await Car.findByIdAndDelete(req.params.id);
            return res.status(200).json(deletedCar);
    } catch (error) {
        console.error("Error while deleting car:", error);
        return res.status(500).json(error);
    }
}   
//#endregion

//#EXPORT region
module.exports = {
    getAllCars,
    getCarById,
    createCar,
    updateCar,
    deleteCar,
};