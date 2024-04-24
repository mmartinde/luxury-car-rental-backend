//importaciones
const mongoose = require("mongoose");

//definición de esquema
const rentSchema = new mongoose.Schema({
  car: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Car",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  dateIn: {
    type: String,
    required: true,
  },
  dateOut: {
    type: String,
    required: false,
  },
  price: {
    type: String,
    required: false,
  },
  status: { // 0 = disponible, 1 = reservado, 3 = rentado
    type: Number,
    required: true,
  },
});

const Rent = mongoose.model("Rent", rentSchema);

module.exports = Rent;
