// #IMPORTS region
const Car = require("../models/car.model");

//#region GET
//obtener todos los coches

/**
 * Obtiene todos los coches de la base de datos.
 * @async
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {Object} res - El objeto de respuesta HTTP.
 * @returns {Promise<Array>} - Una promesa que devuelve todos los coches.
 * @throws {Error} - Si ocurre un error durante la obtención de los coches.
 */
async function getAllCars() {
  try {
    const cars = await Car.find();
    return cars;
  } catch (error) {
    console.error("Error fetching cars:", error);
    throw new Error("Cannot get all cars");
  }
}
//#endregion

//obtener coche por id

/**
 * Busca un coche en la base de datos utilizando su id.
 * @async
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {Object} res - El objeto de respuesta HTTP.
 * @returns {Promise<Object>} - Una promesa que devuelve el coche por su respectivo id.
 * @throws {Error} - Si ocurre un error durante la búsqueda del coche por su id.
 */
async function getCarById(id) {
  try {
    const carFound = await Car.findById(id);
    return carFound;
  } catch (error) {
    console.error("Error fetching car by ID:", error);
    throw new Error("Cannot get Car");
  }
}
//#endregion

//#region POST

/**
 * Crea un nuevo registro de coche en la base de datos.
 * @async
 * @param {Object} req - El objeto de solicitud HTTP que contiene los datos del coche a crear en el cuerpo de la solicitud.
 * @param {Object} res - El objeto de respuesta HTTP utilizado para enviar la respuesta al cliente.
 * @returns {Promise<Object>} - Una promesa que devuelve el coche creado.
 * @throws {Error} - Si ocurre un error durante la creación del nuevo registro de coche.
 */
async function createCar(make, model, plate, year, hp, cc, colour, seats, price, transmission, description, picture) {
  try {
    const newCar = new Car({
      make: make,
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
      picture: picture,
    });
    await newCar.save();
    return newCar;
  } catch (error) {
    console.error("Error creating car:", error);
    throw new Error("Cannot create car");
  }
}
//#endregion

//#region PUT
//actualizar coche

/**
 * Actualiza un registro de coche existente en la base de datos.
 * @async
 * @param {Object} req - El objeto de solicitud HTTP que contiene los datos del coche a actualizar en el cuerpo de la solicitud, así como el ID del coche a actualizar en los parámetros de la ruta.
 * @param {Object} res - El objeto de respuesta HTTP utilizado para enviar la respuesta al cliente.
 * @returns {Promise<Object>} - Una promesa que no devuelve ningún valor explícito.
 * @throws {Error} - Si no se encuentra ningún coche con el ID especificado, o si ocurre un error durante la actualización del coche.
 */
async function updateCar(id, make, model, plate, year, hp, cc, colour, seats, price, transmission, description, picture) {
  try {
    const carExists = await Car.findById(id);
    if (!carExists) {
      throw new Error("Could ot find car");
    }
    const updatedCar = await Car.findByIdAndUpdate(id, {
      make: make,
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
      picture: picture,
    });
    return updatedCar;
  } catch (error) {
    console.error("Error updating car:", error);
    throw new Error("Could not update car");
  }
}

//#endregion

//#region DELETE
//eliminar coche

/**
 * Elimina un registro de coche de la base de datos utilizando su id.
 * @async
 * @param {Object} req - El objeto de solicitud HTTP que contiene el id del coche a eliminar en los parámetros de la ruta.
 * @param {Object} res - El objeto de respuesta HTTP utilizado para enviar la respuesta al cliente.
 * @returns {Promise<Object>} - Una promesa que devuelve el coche eliminado.
 * @throws {Error} - Si no se encuentra ningún coche con el id especificado, o si ocurre un error durante la eliminación del coche.
 */
async function deleteCar(id) {
  try {
    const findCar = await Car.findById(id);
    if (!findCar) {
      throw new Error("user not found");
    }
    const deletedCar = await Car.findByIdAndDelete(id);
    return deletedCar;
  } catch (error) {
    console.error("Error while deleting car:", error);
    throw new Error("Could not delete car");
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
