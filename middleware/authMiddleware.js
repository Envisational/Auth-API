import jwt from 'jsonwebtoken';

// Middleware to verify the JWT token and user role
const verifyToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];

    if(!token) {
        return res.status(401).json({  message: 'Access denied. No token provided.' });
    };
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();

    } catch(err) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};


const checkRole = (role) => {
    return (req, res, next) => {
        if (req.user.role !== role) {
            res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
        }
        next();
    };
};

export { verifyToken, checkRole };