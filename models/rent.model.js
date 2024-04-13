const mongoose = require('mongoose')

// esquema del coche
const rentSchema = new mongoose.Schema({
    id: {type: String, required: true},
    idCar: {type: String, required: true},
    idUser: {type: String, required: true},
    dateIn: {type: Date, required: true}, //revisar si es fecha o es número
    dateOut: {type: Number, required: false},
    cc: {type: Number, required: false},
    colour: {type: String, required: true},
    seats: {type: Number, required: false},
    price: {type: Number, required: true},
    transmission: {type: String, required: true},
    description: {type: Text, required: true}, //revisar si es texto o string
})

module.exports = mongoose.model('rent', rentSchema)