const jwt = require('jsonwebtoken')
const BlacklistTokenModel = require('../models/blacklist.model')
require('dotenv').config()

/**
 * @name authUser
 * @description Middleware to check if the user is authenticated by verifying the JWT token in cookies and checking if it's blacklisted
 * @access Private
 */

async function authUser(req, res, next) {

    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                message: "No token provided, authorization denied",
            });
        }

        // Check whether token is blacklisted
        const blacklistedToken = await BlacklistTokenModel.findOne({ token });

        if (blacklistedToken) {
            return res.status(401).json({
                message: "Token is invalid, authorization denied",
            });
        }

        // Verify JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();
    } catch (err) {
        return res.status(401).json({
            message: "Token is not valid",
        });
    }
}

module.exports = { authUser }
