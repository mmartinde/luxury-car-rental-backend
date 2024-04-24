//Importaciones
const mongoose = require("mongoose");

//Definición de schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  license: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["admin", "user"], // Restringe los roles a estos valores específicos
    default: "user", //Quizás tenga que eliminar esto para permitir cambiar a usuarios entre admin, y usuarios
  },
  password: {
    type: String,
    required: true,
  }
});

const User = mongoose.model("User", userSchema);

//Exporta el modelo
module.exports = User;
