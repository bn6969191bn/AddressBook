import jwt from "jsonwebtoken";
import config from "../config";

const auth = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Brak tokena uwierzytelniającego" });
  }

  try {
    const decoded = jwt.verify(token, config.JwtSecret);
    req.user = decoded;

    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Nieprawidłowy token uwierzytelniający" });
  }
};

export default auth;
