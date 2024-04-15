// #IMPORTS region
const Car = require("../models/car.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//#region CRUD

//obtener todos los coches
/**
 * Esta función asincrónica se utiliza para recuperar todos los coches almacenados en la base de datos.
 * @params - Ninguno
 * @returns {Promise<Array>} - Un arreglo de objetos que representan los coches encontrados en la base de datos.
 * @throws {Error} - Genera un error si no se pueden obtener los coches de la base de datos.
 * @description
 * Esta función utiliza la función Car.find() para realizar la consulta a la base de datos MongoDB.
 * Si la consulta es exitosa, la función retorna un arreglo con los coches encontrados.
 * En caso de error, se registra el error en la consola y se lanza una excepción con el mensaje "Cannot get cars".
 */
async function getAllCars() {
    try {
        const cars = await Car.find();
        return cars;
    } catch (error) {
        console.error("Error fetching cars:", error);
        throw new Error("Cannot get cars");
    }
}
//#endregion

//obtener coche por id
/**
 * Función asíncrona que obtiene coches por id desde la base de datos.
 * @param {String} id - El ID único del usuario a buscar.
 * @returns {Promise<Object[null]>} - Un objeto que representa el coche encontrado en la base de datos, 
 * o null si no se encuentra ningún coche con el ID especificado.
 * @throws {Error} - Se lanza si ocurre algún error durante la búsqueda del coche por ID.
 * @description
 * Esta función utiliza la función Car.findById(id) para buscar el coche en la base de datos MongoDB utilizando su ID.
 * Si se encuentra un coche con el ID especificado, se retorna un objeto que representa ese coche.
 * Si no se encuentra ningún coche con el ID especificado, se retorna null.
 * En caso de error, se registra el error en la consola y se lanza una excepción con el mensaje "Cannot get car by ID".
 */
async function getCarById(id) {
    try {
        const carFound = await Car.findById(id);
        return carFound;
    } catch (error) {
        console.error("Error fetching car by ID:", error);
        throw new Error("Cannot get car by ID");
    }
}
//#endregion

//crear nuevo coche
/**
 * Esta función asincrónica se utiliza para crear un nuevo registro de coche en la base de datos con los detalles proporcionados.
 * @param 
 * name {String}: El nombre del coche.
 * model {String}: El modelo del coche.
 * plate {String}: La matrícula del coche.
 * year {number}: El año de fabricación del coche.
 * hp {number}: La potencia del coche en caballos de fuerza.
 * cc {number}: La cilindrada del motor del coche.
 * colour {String}: El color del coche.
 * seats {number}: La cantidad de asientos en el coche.
 * price {number}: El precio del coche.
 * transmission {String}: El tipo de transmisión del coche (manual o automático).
 * description {String}: Una descripción del coche.
 * @returns {Promise<Object>} - Un objeto que representa el nuevo coche creado en la base de datos.
 * @throws {Error} -  Se lanza si ocurre algún error durante la creación del nuevo coche en la base de datos.
 * @description
 * Esta función crea un nuevo objeto Car con los detalles proporcionados y lo guarda en la base de datos.
 * Si la creación del coche es exitosa, se retorna un objeto que representa el nuevo coche creado.
 * En caso de error, se registra el error en la consola y se lanza una excepción con el mensaje "Error creating new car".
 */
async function createCar(nam, mod, pla, yr, hp, cc, col, sea, pri, trans, des) {
    try {
        const newCar = new Car({
            name: nam,
            model: mod,
            plate: pla,
            year: yr,
            hp: hp,
            cc: cc,
            colour: col,  
            seats: sea,
            price: pri,
            transmission: trans,
            description: des,
        });
        await newCar.save();
        return newCar;
    } catch (error) {
        console.error("Error creating car:", error);
        throw new Error("Error creating new car");
    }
}
//#endregion

//actualizar coche
/**
/**
 * Esta función asincrónica se utiliza para actualizar los detalles de un coche existente en la base de datos utilizando su ID.
 * @param
 * id {String}: El ID único del coche que se desea actualizar.
 * name {String}: El nuevo nombre del coche.
 * model {String}: El nuevo modelo del coche.
 * plate {String}: La nueva matrícula del coche.
 * year {number}: El nuevo año de fabricación del coche.
 * hp {number}: La nueva potencia del coche en caballos de fuerza.
 * cc {number}: La nueva cilindrada del motor del coche.
 * colour {String}: El nuevo color del coche.
 * seats {number}: La nueva cantidad de asientos en el coche.
 * price {number}: El nuevo precio del coche.
 * transmission {String}: El nuevo tipo de transmisión del coche (manual o automático).
 * description {String}: La nueva descripción del coche.
 * @returns {Promise<Object>} - Un objeto que representa el coche actualizado en la base de datos, 
 * o null si no se encuentra ningún coche con el ID especificado.
 * @throws {Error} -  Se lanza si no se encuentra ningún coche con el ID especificado para actualizar, 
 * o si ocurre algún error durante la actualización del coche en la base de datos.
 * @description
 * Esta función busca un coche existente en la base de datos utilizando su ID.
 * Si se encuentra el coche, se actualizan sus detalles con los valores proporcionados y se guarda en la base de datos.
 * Si no se encuentra ningún coche con el ID especificado, se retorna `null`.
 * En caso de error, se registra el error en la consola y se lanza una excepción con el mensaje "Could not update car".
 */
async function updateCar(id, nam, mod, pla, yr, hp, cc, col, sea, pri, trans, des) {
    try {
        const carExists = await Car.findById(id);
            if (!carExists) {
            throw new Error("car not registered");
            }
        const updatedCar = await Car.findByIdAndUpdate(
            id,
                {
                    name: nam,
                    model: mod,
                    plate: pla,
                    year: yr,
                    hp: hp,
                    cc: cc,
                    colour: col,  
                    seats: sea,
                    price: pri,
                    transmission: trans,
                    description: des,
                }
        );
        return updatedCar;
    } catch (error) {
        console.error("Error updating car:", error);
        throw new Error("Could not update car");
    }
}
//#endregion

//eliminar coche
/**
 * Esta función asincrónica se utiliza para eliminar un coche existente de la base de datos utilizando su ID.
 * @param {String} id - El ID único del coche que se desea eliminar de la base de datos.
 * @returns {Promise<Object[null]>} - Un objeto que representa el coche eliminado de la base de datos, 
 * o null si no se encuentra ningún coche con el ID especificado. 
 * @throws {Error} - Se lanza si no se encuentra ningún coche con el ID especificado para eliminar, 
 * o si ocurre algún error durante la eliminación del coche en la base de datos.
 * @description
 * Esta función busca un coche existente en la base de datos utilizando su ID.
 * Si se encuentra el coche, se elimina de la base de datos.
 * Si no se encuentra ningún coche con el ID especificado, se retorna null.
 * En caso de error, se registra el error en la consola y se lanza una excepción con el mensaje "Could not delete car".
 */
async function deleteCar(id) {
    try {
        const findCar = await Car.findById(id);
            if (!findCar) {
            throw new Error("car not found");
            }
        const deletedCar = await Car.findByIdAndDelete(id);
            return deletedCar;
    } catch (error) {
        console.error("Error while deleting car:", error);
        throw new Error("Could not delete car");
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