//importaciones
const mongoose = require("mongoose")

//definición de esquema
const rentSchema = new mongoose.Schema({
    id: {
        type: String, 
        required: true
    },
    idCar: {
        type: String, 
        required: true
    },
    idUser: {
        type: String, 
        required: true
    },
    dateIn: {
        type: Date, 
        required: true
    },
    dateOut: {
        type: Date, 
        required: false
    },
    price: {
        type: Number, 
        required: false
    },
    status: {
        type: Number, 
        required: true
    },
});

const Rent = mongoose.model("Rent", rentSchema)

module.exports = Rent