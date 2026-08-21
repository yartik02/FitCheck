import jwt from "jsonwebtoken";
import User from "../models/User-model.js";

const authMiddleware = async (req, res, next) => {
  try {
    // Read the JWT from the HttpOnly secure cookie set by the server.
    // The cookie name uses the __Host- prefix for maximum security.
    // Note: The __Host- prefix cannot be set on localhost (no HTTPS), so we
    // also accept 'authToken' as a fallback for development environments.
    const token = req.cookies["__Host-authToken"] || req.cookies["authToken"];

    if (!token) {
      return res.status(401).json({ msg: "No token provided. Please log in." });
    }

    // Cryptographically verify the token. Hardcode 'HS256' to prevent algorithm confusion attacks.
    const isVerified = jwt.verify(token, process.env.JWT_SECRET_KEY, {
      algorithms: ["HS256"],
    });

    const userData = await User.findOne({ email: isVerified.email }).select({
      password: 0,
    });

    if (!userData) {
      return res.status(401).json({ msg: "User not found." });
    }

    req.user = userData;
    next();
  } catch (err) {
    // Fail closed — deny access on any error
    return res
      .status(401)
      .json({ msg: "Invalid or expired session. Please log in again." });
  }
};

export { authMiddleware };