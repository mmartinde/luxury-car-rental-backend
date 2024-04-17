const bcrypt = require('bcryptjs');

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

module.exports = comparePassword