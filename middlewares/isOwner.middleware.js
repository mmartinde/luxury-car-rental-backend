const Rent = require("../models/rent.model");

Rent = require("../models/rent.model");

const checkOwnership = async (req, res, next) => {
  try {
    const userId = req.user.userId;
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
};

module.exports = { checkOwnership };
