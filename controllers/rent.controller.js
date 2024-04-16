// #IMPORTS region
const Rent = require("../models/rent.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//#region CRUD

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
async function getAllRentCars() {
    try {
        const rentCars = await Rent.find();
        return rentCars;
    } catch (error) {
        console.error("Error fetching renting cars:", error);
        throw new Error("Cannot get renting cars");
    }
}
//#endregion

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
async function getRentCarById(id) {
    try {
        const rentCarFound = await Rent.findById(id);
        return rentCarFound;
    } catch (error) {
        console.error("Error fetching rent car by ID:", error);
        throw new Error("Cannot get rent car by ID");
    }
}
//#endregion

//crear nuevo alquiler de coche
/**
 * Esta función asincrónica se utiliza para crear un nuevo registro de coche alquilado en la base de datos con los detalles proporcionados.
 * @params
 * id {String}: El ID único del registro de alquiler.
 * idCar {String}: El ID único del coche que se alquila.
 * idUser {String}: El ID único del usuario que alquila el coche.
 * dateIn {Date}: La fecha de inicio del alquiler.
 * dateOut {Date}: La fecha de finalización del alquiler.
 * price {Number}: El precio del alquiler.
 * status {String}: El estado del alquiler (por ejemplo, "en curso", "finalizado", etc.).
 * @returns {Promise<Object>} - Un objeto que representa el nuevo coche alquilado creado en la base de datos.
 * @throws {Error} - Se lanza si ocurre algún error durante la creación del nuevo registro de coche alquilado en la base de datos.
 * @description
 * Esta función crea un nuevo objeto Rent con los detalles proporcionados y lo guarda en la base de datos.
 * Si la creación del coche alquilado es exitosa, se retorna un objeto que representa el nuevo coche alquilado creado.
 * En caso de error, se registra el error en la consola y se lanza una excepción con el mensaje "Error creating new rent car".
 */
async function createRentCar(id, idc, idu, din, dout, pri, sts) {
    try {
        const newRentCar = new Rent({
            id: id,
            idCar: idc,
            idUser: idu,
            dateIn: din,
            dateOut: dout,
            price: pri,
            status: sts,  
        });
        await newRentCar.save();
        return newRentCar;
    } catch (error) {
        console.error("Error creating rent car:", error);
        throw new Error("Error creating new rent car");
    }
}
//#endregion

//actualizar coche alquilado
/**
 * Esta función asincrónica se utiliza para actualizar los detalles de un coche alquilado existente en la base de datos utilizando su ID.
 * @params
 * id {String}: El ID único del registro de alquiler que se desea actualizar.
 * idCar {String}: El nuevo ID único del coche alquilado.
 * idUser {String}: El nuevo ID único del usuario que alquila el coche.
 * dateIn {Date}: La nueva fecha de inicio del alquiler.
 * dateOut {Date}: La nueva fecha de finalización del alquiler.
 * price {number}: El nuevo precio del alquiler.
 * status {String}: El nuevo estado del alquiler.
 * @returns {Promise<Object>[null]} - Un objeto que representa el coche alquilado actualizado en la base de datos, 
 * o `null` si no se encuentra ningún coche alquilado con el ID especificado.
 * @throws {Error} - Se lanza si no se encuentra ningún coche alquilado con el ID especificado para actualizar, 
 * o si ocurre algún error durante la actualización del coche alquilado en la base de datos.
 * @description
 * Esta función busca un coche alquilado existente en la base de datos utilizando su ID.
 * Si se encuentra el coche alquilado, se actualizan sus detalles con los valores proporcionados y se guarda en la base de datos.
 * Si no se encuentra ningún coche alquilado con el ID especificado, se retorna null.
 * En caso de error, se registra el error en la consola y se lanza una excepción con el mensaje "Could not update rent car".
 */
async function updateRentCar(id, idc, idu, din, dout, pri, sts) {
    try {
        const rentCarExists = await Rent.findById(id);
            if (!rentCarExists) {
            throw new Error("rent car not registered");
            }
        const updatedRentCar = await Rent.findByIdAndUpdate(
            id,
                {
                    idUser: idu,
                    dateIn: din,
                    dateOut: dout,
                    price: pri,
                    status: sts,  
                }
        );
        return updatedRentCar;
    } catch (error) {
        console.error("Error updating rent car:", error);
        throw new Error("Could not update rent car");
    }
}
//#endregion

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
async function deleteRentCar(id) {
    try {
        const findRentCar = await Rent.findById(id);
            if (!findRentCar) {
            throw new Error("rent car not found");
            }
        const deletedRentCar = await Rent.findByIdAndDelete(id);
            return deletedRentCar;
    } catch (error) {
        console.error("Error while deleting rent car:", error);
        throw new Error("Could not delete rent car");
    }
}
//#endregion

//#EXPORT region
module.exports = {
    getAllRentCars,
    getRentCarById,
    createRentCar,
    updateRentCar,
    deleteRentCar,
};
