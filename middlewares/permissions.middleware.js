const jwt = require("jsonwebtoken");
require("dotenv").config();

// #region ADMIN
/**
 * Middleware para verificar si el usuario tiene privilegios de administrador.
 * 
 * Esta función verifica la presencia de un token JWT en la consulta (query) de la solicitud HTTP. Si el token está presente,
 * intenta verificarlo utilizando una clave secreta. Si la verificación es exitosa y el rol del usuario es "admin",
 * permite que la solicitud continúe al siguiente middleware. Si el usuario no es un administrador, o si hay un error en
 * la verificación del token, se retorna un mensaje de error adecuado.
 *
 * @param {Object} req - Objeto de la solicitud HTTP de Express, que contiene información sobre la petición del cliente,
 *                       incluyendo parámetros, cuerpo de la solicitud, cabeceras, etc.
 * @param {Object} res - Objeto de respuesta HTTP de Express, que se utiliza para enviar una respuesta al cliente.
 * @param {Function} next - Función de callback que se invoca para pasar el control al siguiente middleware en la cadena.
 *
 * Uso de la función:
 * Este middleware se debe aplicar a rutas que requieran acceso exclusivo para usuarios administradores.
 *
 * Ejemplo de uso en una ruta:
 * app.get('/admin-dashboard', isAdmin, (req, res) => {
 *   res.send('Panel de Administración');
 * });
 *
 * Respuestas:
 * - Si no hay token: Retorna HTTP 400 "token not provided".
 * - Si el token no es válido: Retorna HTTP 401 "token not valid".
 * - Si el usuario no es administrador: Retorna HTTP 403 "Admin access required".
 */
function isAdmin(req, res, next) {
    // Verificar si el token está presente en la consulta de la solicitud
    if (req.query.token) {
      try {
        // Intentar verificar el token con la clave secreta del entorno
        const result = jwt.verify(req.query.token, process.env.JWT_SECRET);
        // Verificar si el rol incluido en el token es "admin"
        if (result.role === "admin") {
          next();  // Continuar al siguiente middleware si es administrador
        } else {
          // Enviar error si el usuario no es administrador
          res.status(403).json({ message: "Admin access required" });
        }
      } catch (error) {
        // Capturar y manejar errores relacionados con la verificación del token
        console.error("token error:", error);
        res.status(401).json({ msg: "token not valid" });
      }
    } else {
      // Enviar error si no se proporciona token
      res.status(400).json({ msg: "token not provided" });
    }
  }

  // #endregion

  // #region USER

/**
 * Middleware para verificar si el usuario tiene el rol de "usuario".
 * 
 * Esta función examina si existe un token en la consulta (query) de la solicitud HTTP. Si el token está presente,
 * intenta verificarlo usando una clave secreta almacenada en las variables de entorno. Si el token es válido y
 * contiene el rol "user", la función permite que la solicitud continúe al siguiente middleware. Si el rol no
 * corresponde o si hay un error en la verificación del token, se retorna un mensaje de error indicando el problema.
 *
 * @param {Object} req - Objeto de solicitud HTTP de Express, que incluye información sobre la petición del cliente
 *                       como parámetros, cuerpo de la solicitud, cabeceras, etc.
 * @param {Object} res - Objeto de respuesta HTTP de Express, utilizado para enviar respuestas al cliente.
 * @param {Function} next - Función de callback que se invoca para pasar el control al siguiente middleware en la cadena.
 *
 * Uso de la función:
 * Este middleware es ideal para rutas que están diseñadas exclusivamente para usuarios con el rol de "usuario".
 *
 * Ejemplo de uso en una ruta:
 * app.get('/perfil-usuario', isUser, (req, res) => {
 *   res.send('Perfil del Usuario');
 * });
 *
 * Respuestas:
 * - Si no se proporciona un token: Retorna HTTP 400 "token not provided".
 * - Si el token no es válido: Retorna HTTP 401 "token not valid".
 * - Si el usuario no tiene el rol adecuado: Retorna HTTP 403 "User access required".
 */
function isUser(req, res, next) {
    // Comprobar si se ha proporcionado un token en la consulta de la solicitud
    if (req.query.token) {
      try {
        // Intentar verificar el token usando la clave secreta del entorno
        const result = jwt.verify(req.query.token, process.env.JWT_SECRET);
        // Comprobar si el rol incluido en el token es "user"
        if (result.role === "user") {
          next();  // Continuar al siguiente middleware si es un usuario
        } else {
          // Enviar error si el usuario no tiene el rol de "user"
          res.status(403).json({ msg: "User access required" });
        }
      } catch (error) {
        // Capturar y manejar errores relacionados con la verificación del token
        console.error("token error:", error);
        res.status(401).json({ msg: "token not valid" });
      }
    } else {
      // Enviar error si no se proporciona token
      res.status(400).json({ msg: "token not provided" });
    }
  }
  
  // #endregion

module.exports = { isAdmin, isUser };
