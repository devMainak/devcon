const jwt = require("jsonwebtoken");
const JWT_ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET;

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(403).json({ error: "Access denied" });

  try {
    const verified = jwt.verify(token, JWT_ACCESS_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      res.status(401).json({ message: "TokenExpiredError" });
    }
    return res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = authenticate;
