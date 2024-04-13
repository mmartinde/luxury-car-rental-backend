// #region IMPORTS
const Car = require("../models/car.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//CRUD
//obtener todos los coches
async function getAllCars() {
    try {
        const cars = await car.find(); // Realiza la consulta a la base de datos
        return cars; // Retorna los coches encontrados
    } catch (error) {
        console.error("Error fetching cars:", error);
        throw new Error("Cannot get cars"); // Maneja errores durante la consulta
    }
}

//obtener coche por id
async function getCarById(id) {
    try {
        const carFound = await car.findById(id); // Realiza la consulta a la base de datos con el ID proporcionado
        return carFound; // Retorna el coche encontrado
    } catch (error) {
        console.error("Error fetching car by ID:", error); // Registra el error en la consola
        throw new Error("Cannot get car by ID"); // Lanza una nueva excepción con un mensaje específico
    }
}

//crear nuevo coche
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

//actualizar coche
async function updateCar(id, nam, mod, pla, yr, hp, cc, col, sea, pri, trans, des) {
    try {
        const carExists = await Car.findById(id); // Verifica si el coche existe
            if (!carExists) {
            throw new Error("car not registered"); // Si no existe, lanza un error
            }
        const updatedCar = await Car.findByIdAndUpdate(
            id,
                {
                    // Si existe, actualiza la información
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
        return updatedCar; // Retorna el coche actualizado
    } catch (error) {
        console.error("Error updating car:", error); // Registra el error en la consola
        throw new Error("Could not update car");
    }
}

//eliminar coche
async function deleteCar(id) {
    try {
        const findCar = await Car.findById(id); // Intenta encontrar al coche en la base de datos
            if (!findCar) {
            throw new Error("car not found"); // Lanza un error si el coche no existe
            }
        const deletedCar = await Car.findByIdAndDelete(id); // Procede a eliminar el coche
            return deletedCar; // Retorna el coche eliminado
    } catch (error) {
        console.error("Error while deleting car:", error); // Registra el error en la consola
        throw new Error("Could not delete car");
    }
}

module.exports = {
    getAllCars,
    getCarById,
    createCar,
    updateCar,
    deleteCar,
};
