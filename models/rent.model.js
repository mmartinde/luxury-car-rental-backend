//importaciones
const mongoose = require("mongoose")

//definición de esquema
const rentSchema = new mongoose.Schema({
    idCar: {
        type: String, // TODO: Cambiar a object.ID (referencia) y cambiar a Car
        required: true
    },
    idUser: {
        type: String, // TODO: Cambiar a object.ID (referencia) y cambiar a User
        required: true
    },
    dateIn: {
        type: String, 
        required: true
    },
    dateOut: {
        type: String, 
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