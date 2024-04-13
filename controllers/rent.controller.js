// #region IMPORTS
const Rent = require("../models/car.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//CRUD
//obtener todos los coches alquilados
async function getAllRentCars() {
    try {
        const rentCars = await Rent.find(); // Realiza la consulta a la base de datos
        return rentCars; // Retorna los coches alquilados
    } catch (error) {
        console.error("Error fetching renting cars:", error);
        throw new Error("Cannot get renting cars"); // Maneja errores durante la consulta
    }
}

//obtener coche alquilado por id
async function getRentCarById(id) {
    try {
        const rentCarFound = await Rent.findById(id); // Realiza la consulta a la base de datos con el ID proporcionado
        return rentCarFound; // Retorna el coche alquilado
    } catch (error) {
        console.error("Error fetching rent car by ID:", error); // Registra el error en la consola
        throw new Error("Cannot get rent car by ID"); // Lanza una nueva excepción con un mensaje específico
    }
}

//crear nuevo alquiler de coche
async function createRentCar(id, idc, idu, din, dout, pri, sts) {
    try {
        const newRentCar = new RentCar({
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

//actualizar coche alquilado
async function updateRentCar(id, idc, idu, din, dout, pri, sts) {
    try {
        const rentCarExists = await Rent.findById(id); // Verifica si el coche alquilado existe
            if (!rentCarExists) {
            throw new Error("rent car not registered"); // Si no existe, lanza un error
            }
        const updatedRentCar = await Rent.findByIdAndUpdate(
            id,
                {
                    // Si existe, actualiza la información
                    idUser: idu,
                    dateIn: din,
                    dateOut: dout,
                    price: pri,
                    status: sts,  
                }
        );
        return updatedRentCar; // Retorna el coche alquilado actualizado
    } catch (error) {
        console.error("Error updating rent car:", error); // Registra el error en la consola
        throw new Error("Could not update rent car");
    }
}

//eliminar coche
async function deleteRentCar(id) {
    try {
        const findRentCar = await rentCar.findById(id); // Intenta encontrar el coche alquilado en la base de datos
            if (!findRentCar) {
            throw new Error("rent car not found"); // Lanza un error si el coche alquilado no existe
            }
        const deletedRentCar = await rentCar.findByIdAndDelete(id); // Procede a eliminar el coche
            return deletedRentCar; // Retorna el coche eliminado
    } catch (error) {
        console.error("Error while deleting rent car:", error); // Registra el error en la consola
        throw new Error("Could not delete rent car");
    }
}

module.exports = {
    getAllRentCars,
    getRentCarById,
    createRentCar,
    updateRentCar,
    deleteRentCar,
};
