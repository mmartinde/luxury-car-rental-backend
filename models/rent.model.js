//importaciones
const mongoose = require("mongoose")

//definición de esquema
const rentSchema = new mongoose.Schema({
    car: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Car",
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
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