const jwt = require('jsonwebtoken');

async function authToken(req, res, next) {
    try {
        // Retrieve token from cookies or Authorization header
        const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
        
        // Check if token is provided
        if (!token) {
            return res.status(401).json({
                message: "Please Login...!",
                error: true,
                success: false
            });
        }

        // Verify token
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                console.error("Authentication error:", err);
                return res.status(401).json({
                    message: "Invalid or expired token. Please login again.",
                    error: true,
                    success: false
                });
            }

            // Attach user ID to request object
            req.userId = decoded._id;

            // Proceed to the next middleware or route handler
            next();
        });
        
    } catch (err) {
        console.error('Error in authToken middleware:', err);
        res.status(400).json({
            message: err.message || 'An error occurred during authentication',
            error: true,
            success: false
        });
    }
}

module.exports = authToken;
