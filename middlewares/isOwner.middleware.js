const Rent = require("../models/rent.model");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const checkRentOwnership = async (req, res, next) => {
  // Verificar si el token está presente en la consulta de la solicitud
  if (req.query.token) {
    try {
      // Intentar verificar el token con la clave secreta del entorno
      const result = jwt.verify(req.query.token, process.env.JWT_SECRET);
      const userId = result._id;
      const userRole = result.role;
      const rentId = req.params.id || req.body.id; // También podria sacarse del req.query.id, pero no estoy seguro que la app lo use en este momento

      if (!rentId) {
        return res.status(400).json({ msg: "Rent ID not provided" });
      }

      const rent = await Rent.findById(rentId);

      if (!rent) {
        return res.status(404).json({ msg: "Rent not found" });
      }

      if (userRole !== "admin" || rent.userId !== userId) {
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

const checkUserOwnership = async (req, res, next) => {
  // Verificar si el token está presente en la consulta de la solicitud
  if (req.query.token) {
    try {
      // Intentar verificar el token con la clave secreta del entorno
      const result = jwt.verify(req.query.token, process.env.JWT_SECRET);
      const userId = result._id;
      const userRole = result.role;
      const targetId = req.params.id || req.body.id; // También podria sacarse del req.query.id, pero no estoy seguro que la app lo use en este momento

      if (!targetId) {
        return res.status(400).json({ msg: "User ID to update not provided" });
      }

      const user = await User.findById(targetId);

      if (!user) {
        return res.status(404).json({ msg: "Rent not found" });
      }

      if (userRole !== "admin" || user.userId !== userId) {
        return res.status(403).json({ msg: "Unauthorized access" });
      }

      next();
    } catch (error) {
      console.error("Error checking user ownership: ", error);
      res.status(500).json({ msg: "Internal server error" });
    }
  } else {
    res.status(400).json({ msg: "Token not provided" });
  }
};

const checkRentHistoryOwnership = async (req, res, next) => {
  if (req.query.token) {
    try {
      // Intentar verificar el token con la clave secreta del entorno
      const result = jwt.verify(req.query.token, process.env.JWT_SECRET);
      const userId = result._id;
      const userRole = result.role;
      // También podria sacarse del req.query.id, pero no estoy seguro que la app lo use en este momento

      const rent = await Rent.find({ user: userId });

      if (!rent) {
        return res.status(404).json({ msg: "Rent not found" });
      }

      if (userRole !== "admin" || rent.userId !== userId) {
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

module.exports = {
  checkRentOwnership,
  checkUserOwnership,
  checkRentHistoryOwnership,
};
