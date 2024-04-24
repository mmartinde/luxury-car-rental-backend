const bcrypt = require("bcryptjs");

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

/**
 * Compara una contraseña proporcionada por el usuario con un hash almacenado.
 *
 * @param {string} hash El hash almacenado contra el que se compara la contraseña.
 * @param {string} password La contraseña en texto plano proporcionada por el usuario.
 * @returns {Promise<boolean>} Promesa que resuelve con `true` si la contraseña coincide con el hash, de lo contrario `false`.
 *
 * Esta función utiliza `bcrypt.compare`, la cual recibe la contraseña en texto plano y el hash.
 * `bcrypt.compare` devuelve una promesa que resuelve con un valor booleano que indica si la contraseña
 * en texto plano coincide con el hash proporcionado. Esto es útil para verificar la validez de las contraseñas
 * durante los procesos de autenticación de usuarios, sin la necesidad de desencriptar el hash.
 */
function comparePassword(hash, password) {
  const result = bcrypt.compare(password, hash);
  return result;
}

module.exports = {encryptPassword, comparePassword};
