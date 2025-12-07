const jwt = require('jsonwebtoken');
require('dotenv').config(); // Ensure we can read process.env.JWT_SECRET

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({ 
            success: false, 
            message: "Access denied. No token provided." 
        });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ 
                    success: false, 
                    message: "Session timed out. Please log in again." 
                });
            }
            return res.status(401).json({ 
                success: false, 
                message: "Invalid token." 
            });
        }

        req.user = decoded; 
        next(); 
    });
};

module.exports = verifyToken; 