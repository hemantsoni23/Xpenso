const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    let token = req.headers?.authorization?.split(' ')[1]; 
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized. Please login' });
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; 
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token. Please login again' });
    }
};

module.exports = authMiddleware;