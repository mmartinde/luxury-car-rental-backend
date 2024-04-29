//importaciones
const mongoose = require("mongoose")

//definición de esquema
const carSchema = new mongoose.Schema({
    make: {
        type: String, 
        required: true
    },
    model: {
        type: String,
        required: true
    },
    plate: {
        type: String, 
        required: true
    },
    year: {
        type: String, 
        required: true
    },
    hp: {
        type: String, 
        required: false
    },
    cc: {
        type: String, 
        required: false
    },
    colour: {
        type: String, 
        required: true
    },
    seats: {
        type: Number, 
        required: false
    },
    price: {
        type: String, 
        required: true
    },
    transmission: {
        type: String, 
        required: true
    },
    description: {
        type: String, 
        required: true
    },
    picture: {
        type: String, 
        require: false
    },
});

const Car = mongoose.model("Car", carSchema)

module.exports = Car;