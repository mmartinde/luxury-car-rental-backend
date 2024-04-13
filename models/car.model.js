//importaciones
const mongoose = require('mongoose')

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
        type: Date,
        required: true
    }, //revisar si es fecha o es número
    hp: {
        type: Number,
        required: 
        false},
    cc: {
        type: Number, 
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
        type: Number,
        required: true
    },
    transmission: {
        type: String,
        required: true
        },
    description: {
        type: Text, 
        required: true
    }, //revisar si es texto o string
});

const Car = mongoose.model("Car", carSchema)

module.exports = Car;