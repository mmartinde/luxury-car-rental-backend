const jwt = require("jsonwebtoken");
require("dotenv").config();

/**
 * Middleware para validar la autenticidad y los permisos del usuario.
 * 
 * Esta función verifica si el token JWT es proporcionado en los parámetros de consulta de la solicitud.
 * Si el token está presente, intenta verificarlo utilizando una clave secreta almacenada en las variables de entorno.
 * Si la verificación es exitosa, comprueba si el rol del usuario en el token coincide con el rol requerido
 * que es pasado como parámetro en la URL de la solicitud. Si coinciden, permite que la solicitud continúe al siguiente middleware.
 * En caso contrario, retorna un error de permisos incorrectos.
 *
 * @param {Object} req Objeto de solicitud de Express. Espera que el token JWT venga como parte de `req.query.token`.
 * @param {Object} res Objeto de respuesta de Express.
 * @param {Function} next Función callback de Express para pasar al siguiente middleware.
 * 
 * Uso:
 * Este middleware se puede usar en rutas que requieran autenticación y autorización específica, asegurando que solo los usuarios
 * con los permisos adecuados puedan acceder a ciertos recursos.
 * 
 * Respuestas:
 * - Si el token no es proporcionado: Retorna HTTP 400 "token not provided".
 * - Si el token no es válido o ha expirado: Retorna HTTP 401 "token not valid".
 * - Si el rol del usuario no coincide con el requerido: Retorna HTTP 403 "wrong permissions".
 */
function isAuth(req, res, next) {
  if (req.query.token) {
    try {
      const result = jwt.verify(req.query.token, process.env.JWT_SECRET);
      console.log(result);
      if (result.role === 'admin') {
        next();
      } else {
        res.status(403).json({ msg: "wrong permissions" });
      }
    } catch (error) {
      console.error("token error:", error);
      res.status(401).json({ msg: "token not valid" });
    }
  } else {
    res.status(400).json({ msg: "token not provided" });
  }
}

module.exports = { isAuth };
