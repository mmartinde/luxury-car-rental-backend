require("dotenv").config();

/**
 * Middleware para verificar si el usuario está autenticado.
 * 
 * Esta función verifica si hay un token de autenticación presente en la consulta (query) de la solicitud HTTP.
 * Si el token no está presente, se deniega el acceso y se retorna un mensaje solicitando al usuario que inicie sesión.
 * 
 * @param {Object} req - Objeto de la solicitud HTTP de Express. Contiene información sobre la solicitud HTTP, 
 *                       incluyendo parámetros, cuerpo de la solicitud, cabeceras, etc.
 * @param {Object} res - Objeto de respuesta HTTP de Express. Se utiliza para enviar una respuesta al cliente.
 * @param {Function} next - Función de callback que, cuando se invoca, ejecuta el siguiente middleware registrado.
 * 
 * Uso de la función:
 * Esta función se debe utilizar como middleware en rutas que requieran autenticación. Se coloca antes del manejador de la ruta
 * para asegurarse de que solo los usuarios autenticados puedan acceder a la ruta.
 *
 * Ejemplo de uso en una ruta:
 * app.get('/ruta-protegida', isAuth, (req, res) => {
 *   res.send('Contenido protegido');
 * });
 *
 * Respuestas:
 * - Si no hay token: Retorna HTTP 401 con un mensaje indicando que se requiere iniciar sesión.
 */
function isAuth(req, res, next) {
  // Verifica si el token está presente en la consulta de la solicitud
  if (!req.query.token) {
    // Si no hay token, retorna una respuesta de error 401 (No Autorizado)
    return res.status(401).json({ msg: "Please log in" });
  }
  // Si hay token, pasa el control al siguiente middleware
  next();
}


module.exports = { isAuth };
