const Rent = require("../models/rent.model");

Rent = require("../models/rent.model");

const checkOwnership = async (req, res, next) => {
  // Verificar si el token está presente en la consulta de la solicitud
  if (req.query.token) {
    try {
      // Intentar verificar el token con la clave secreta del entorno
      const result = jwt.verify(req.query.token, process.env.JWT_SECRET);
      const userId = result._id; // Deberia venir en el token?
      const rentId = req.params.id;

      const rent = await await Rent.findById(rentId);

      if (!rent) {
        return res.status(404).json({ msg: "Rent not found" });
      }

      if (rent.userId.toString() !== userId.toString()) {
        return res.status(403).json({ msg: "Unauthorized access" });
      }

      next();
    } catch (error) {
      console.error("Error checking rent ownership: ", error);
      res.status(500).json({ msg: "Internal server error" });
    }
  } else {
    res.status(400).json({ msg: "Token not provided" });
  }
};

module.exports = { checkOwnership };
