const jwt = require("jsonwebtoken");

const authToken = async (req, res, next) => {
  try {
    const token = req.cookies?.token;
    console.log("token", token);
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

    if (!verifyToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    req.userId = verifyToken._id;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = authToken;
