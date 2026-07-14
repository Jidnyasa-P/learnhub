const jwt = require("jsonwebtoken");
const userSchema = require("../schemas/userModel");

module.exports = async (req, res, next) => {
  try {
    const authorizationHeader = req.headers["authorization"];
    if (!authorizationHeader) {
      return res
        .status(401)
        .send({ message: "Authorization header missing", success: false });
    }

    const token = authorizationHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, async (err, decode) => {
      if (err) {
        return res
          .status(401)
          .send({ message: "Token is not valid", success: false });
      } else {
        req.body.userId = decode.id;
        
        if (decode.id === "admin") {
          req.user = { _id: "admin", id: "admin", role: "admin", type: "admin" };
          return next();
        }

        try {
          const user = await userSchema.findById(decode.id);
          if (!user) {
            return res.status(401).send({ message: "User not found", success: false });
          }
          // Set both role and type for compatibility
          req.user = user;
          req.user.role = user.type;
          next();
        } catch (dbErr) {
          return res.status(500).send({ message: "Database error during authentication", success: false });
        }
      }
    });
  } catch (error) {
    console.error(error); // Handle or log the error appropriately
    res.status(500).send({ message: "Internal server error", success: false });
  }
};
