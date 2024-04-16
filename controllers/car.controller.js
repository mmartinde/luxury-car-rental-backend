// #IMPORTS region
const Car = require("../models/car.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//#region CRUD

//obtener todos los coches

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

//crear nuevo coche

const createCar = async (req, res) => {
    const {name, model, plate, year, hp, cc, colour, seats, price, transmission, description} = req.body;
        try {
            const newCar = new Car({
                name: name,
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

//actualizar coche

const updateCar = async (req, res) => {
    const {name, model, plate, year, hp, cc, colour, seats, price, transmission, description} = req.body 
    try {
        const carExists = await Car.findById(req.params.id);
            if (!carExists) {
                return res.status(404).json(error);
                }
            const updatedCar = await Car.findByIdAndUpdate(req.params.id, {
                name: name,
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

//eliminar coche

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