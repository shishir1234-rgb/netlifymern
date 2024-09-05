const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const dotenv =require("dotenv").config();




// Middleware to verify JWT token
exports.authenticateJWT = (req, res, next) => {
    // console.log('Authorization Header:', req.headers['authorization']); // Log header


    const bearerHeader = req.headers['authorization'];

    if (!bearerHeader) {
<<<<<<< HEAD
        return res.status(401).json({ message: 'Authentication failed: No token provided' });
=======
        return res.status(401).json({success:false, message: 'Authentication failed: No token provided' });
>>>>>>> f15109cd11a472ae7ea9b5343914f090e9543825
    }

    const bearer = bearerHeader.split(' ');
    // console.log('Bearer array:', bearer);
    
    if (bearer.length !== 2 || bearer[0].toLowerCase() !== 'bearer') {
<<<<<<< HEAD
        return res.status(401).json({ message: 'Authentication failed: Invalid authorization header format' });
=======
        return res.status(401).json({success:false, message: 'Authentication failed: Invalid authorization header format' });
>>>>>>> f15109cd11a472ae7ea9b5343914f090e9543825
    }

    const token = bearer[1];
    console.log('Token:', token);

    jwt.verify(token, process.env.seckret_Key, (err, user) => {
        if (err) {
            console.error('JWT verification error:', err);
<<<<<<< HEAD
            return res.status(403).json({ message: 'Authentication failed: Invalid token' });
=======
            return res.status(403).json({success:false, message: 'Authentication failed: Invalid token' });
>>>>>>> f15109cd11a472ae7ea9b5343914f090e9543825
        }

        req.user = user; // Attach the user to the request object
        console.log('User verified:', user);
        next(); // Continue to the protected route
    });
};





