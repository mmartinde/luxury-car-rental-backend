// #IMPORTS region
const Rent = require("../models/rent.model");
const { sendEmail } = require("../helpers/mailer");

//#region GET
//obtener todos los coches alquilados

/**
 * Recupera todos los registros de alquiler de coches.
 * @async
 * @function
 * @memberof module:RentService
 * @returns {Promise<Array>} Promise que resuelve en un array de objetos que representan los registros de alquiler de coches.
 * @throws {Error} Devuelve un error si no se pueden recuperar los registros de alquiler de coches.
 */
async function getAllRentCars() {
  try {
    const rentCars = await Rent.find()
      .populate("car", "make model")
      .populate("user", "name surname email");
    return rentCars;
  } catch (error) {
    console.error("error fetching renting cars:", error);
    return res.status(500).json(error);
  }
}
//#endregion

//obtener coche alquilado por id

/**
 * Busca un registro de alquiler de coche en la base de datos utilizando su id.
 * @async
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {Object} res - El objeto de respuesta HTTP.
 * @returns {Promise<Object>} - Promesa que devuelve el coche por su respectivo id.
 * @throws {Error} - Si ocurre un error durante la búsqueda del registro de alquiler de coche por su id.
 */
async function getRentCarById(id) {
  try {
    const rentCarFound = await Rent.findById(id)
      .populate("car", "make model")
      .populate("user", "name surname email");
    return rentCarFound;
  } catch (error) {
    console.error("error fetching car rent by ID:", error);
    return res.status(500).json(error);
  }
}

async function getRentByUserId(userId) {
  try {
    const rents = await Rent.find({ user: userId })
      .populate("car", "make model")
      .populate("user", "name surname email");
      return rents
  } catch (error) {
    console.error("Error fetching history by userId: ", error);
    return res.status(500).json(error);
  }
}
//#endregion

// #region POST
//crear nuevo alquiler de coche

/**
 * Crea un nuevo registro de alquiler de coche en la base de datos.
 * @async
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {Object} res - El objeto de respuesta HTTP.
 * @returns {Promise<Object>} - Promesa devuelve el coche creado.
 * @throws {Error} - Si ocurre un error durante la creación del registro de alquiler de coche.
 */
async function createRentCar(car, user, dateIn, dateOut, price, status) {
  try {
    const newRentCar = new Rent({
      car: car,
      user: user,
      dateIn: dateIn,
      dateOut: dateOut,
      price: price,
      status: status,
    });
    await newRentCar.save();
    await (
      await newRentCar.populate("user", "name email")
    ).populate("car", "make model");

    // Envia email de confirmacion de solicitud
    await sendEmail({
      to: newRentCar.user.email,
      subject: `Solicitud de Renta ${newRentCar.car.make} ${newRentCar.car.model}`,
      text: `Gracias por su solicitud, ${newRentCar.user.name}!`,
      html: `<!DOCTYPE html>
      <html lang="es">
      <head>
      <meta charset="UTF-8">
      <title>Confirmación de Solicitud de Alquiler</title>
      <style>
          body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              background-color: #f2f2f2;
              margin: 0;
              padding: 0;
          }
          .email-container {
              background-color: #ffffff;
              width: 80%;
              max-width: 600px;
              margin: 20px auto;
              padding: 20px;
              border-radius: 10px;
              box-shadow: 0 0 15px rgba(0,0,0,0.2);
          }
          .header {
              background-color: #000;
              color: #fff;
              text-align: center;
              padding: 10px;
              border-top-left-radius: 10px;
              border-top-right-radius: 10px;
          }
          .body {
              padding: 20px;
              color: #333;
              line-height: 1.6;
          }
          .footer {
              font-size: 12px;
              text-align: center;
              padding: 10px;
              color: #888;
          }
          .button {
              display: block;
              width: 200px;
              margin: 20px auto;
              background-color: #4A90E2;
              color: #ffffff;
              text-align: center;
              padding: 10px;
              text-decoration: none;
              border-radius: 5px;
              transition: background-color 0.3s;
          }
          .button:hover {
              background-color: #357ABD;
          }
      </style>
      </head>
      <body>
      <div class="email-container">
          <div class="header">
              <h1>Luxury Car Rental</h1>
          </div>
          <div class="body">
              <h2>Estimado/a ${newRentCar.user.name},</h2>
              <p>Queremos agradecerle por elegir <strong>Luxury Car Rental</strong> para su experiencia de conducción de lujo. Su solicitud para alquilar nuestro vehículo <strong>${newRentCar.car.make} ${newRentCar.car.model}</strong> ha sido recibida con éxito.</p>
              <p>Uno de nuestros representantes se pondrá en contacto con usted en las próximas 24 horas para confirmar la disponibilidad del vehículo y finalizar los detalles de su alquiler. Estamos comprometidos a proporcionarle una experiencia excepcional y personalizada, asegurando que cada aspecto de su viaje sea perfecto.</p>
              <p>Si tiene alguna pregunta o necesita información adicional antes de nuestra llamada, no dude en responder a este correo electrónico o contactarnos directamente a nuestro número exclusivo para clientes VIP: 555-55SINCORRIENTE.</p>
              <a href="http://example.com" class="button">Visite Nuestro Sitio Web</a>
          </div>
          <div class="footer">
              <p>Gracias por su confianza,<br>Luxury Car Rental Team</p>
          </div>
      </div>
      </body>
      </html>
      `,
    });
    console.log("Rent request placed successfully!");
    return newRentCar;
  } catch (error) {
    console.error("Error creating car rent:", error);
    throw new Error("Could not create car rent");
  }
}

//#endregion

// #region PUT
//actualizar coche alquilado
/**
 * Actualiza un registro de alquiler de coche existente en la base de datos.
 * @async
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {Object} res - El objeto de respuesta HTTP.
 * @returns {Promise<Object>} - Promesa que devuelve el coche actualizado.
 * @throws {Error} - Si no se encuentra ningún registro de alquiler de coche con el id especificado,
 *                   o si ocurre un error durante la actualización del registro de alquiler de coche.
 */
async function updateRentCar(id, user, dateIn, dateOut, price, status) {
  try {
    const rentCarExists = await Rent.findById(id);
    if (!rentCarExists) {
      throw new Error("could not find car");
    }
    const updatedRentCar = await Rent.findByIdAndUpdate(id, {
      user: user,
      dateIn: dateIn,
      dateOut: dateOut,
      price: price,
      status: status,
    });
    return updatedRentCar;
  } catch (error) {
    console.error("Error updating car rent:", error);
    throw new Error("could not update car");
  }
}
//#endregion

//#region DELETE

//eliminar coche

/**
 * Elimina un registro de alquiler de coche de la base de datos utilizando su id.
 * @async
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {Object} res - El objeto de respuesta HTTP.
 * @returns {Promise<Object>} - Una promesa que no devuelve ningún valor explícito.
 * @throws {Error} - Si no se encuentra ningún registro de alquiler de coche con el id especificado,
 *                   o si ocurre un error durante la eliminación del registro de alquiler de coche.
 */
async function deleteRentCar(id) {
  try {
    const findRentCar = await Rent.findById(id);
    if (!findRentCar) {
      throw new Error("Could not find rent");
    }
    const deletedRentCar = await Rent.findByIdAndDelete(id);
    return deletedRentCar;
  } catch (error) {
    console.error("Error while deleting car rent:", error);
    throw new Error("could not delete rent");
  }
}
//#endregion

//#EXPORT region
module.exports = {
  getAllRentCars,
  getRentCarById,
  getRentByUserId,
  createRentCar,
  updateRentCar,
  deleteRentCar,
};
