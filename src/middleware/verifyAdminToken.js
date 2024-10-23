const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET_KEY

const verifyAdminToken = (req, res, next) => {

   // Get the Authorization header
   const authHeader = req.headers['authorization'];

   // If the Authorization header is not present, return an error
   if (!authHeader) {
      return res.status(401).json({ message: "Access Denied. No Authorization header provided!" });
   }

   // Check if the Authorization header follows the 'Bearer <token>' format
   const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

   // If no token is found, return an error
   if (!token) {
      return res.status(401).json({ message: "Access Denied. Token is missing or invalid!" });
   }

   jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
         if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "Token expired!" });
         }
         return res.status(403).json({ message: "Invalid credentials!" })
      }
      req.user = user
      next()
   })
}
module.exports = verifyAdminToken