const bcrypt = require("bcrypt");

/**
 * Función asíncrona para cifrar contraseñas.
 * 
 * @param {string} password La contraseña en texto plano que se desea cifrar.
 * @returns {Promise<string>} Promesa que resuelve con la contraseña cifrada.
 * 
 * Esta función genera primero un "salt" (semilla) utilizando `bcrypt.genSalt`.
 * El "salt" es un valor aleatorio que se utiliza para asegurar que el hash resultante
 * sea único, incluso para contraseñas idénticas entre diferentes usuarios. 
 * El número 10 representa la cantidad de rondas de cifrado, lo cual afecta directamente
 * la seguridad y el costo computacional del proceso.
 * 
 * Posteriormente, se utiliza `bcrypt.hash` para generar el hash de la contraseña,
 * combinando la contraseña en texto plano con el salt. Este hash es el que se debería
 * almacenar en la base de datos en lugar de la contraseña en texto plano.
 */
async function encryptPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}
module.exports = encryptPassword;
