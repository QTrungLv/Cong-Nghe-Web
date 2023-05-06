const jwt = require('jsonwebtoken');

require('dotenv').config()

const verifyToken = (req, res, next) => {
    const header = req.headers('Authorization')
    //Authorization: Bearer token

    const token = header && header.split(' ')[1]

    if (!token) {
        res.status(401).send({ success: false, message: 'Token is required' })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY_SECRET)
        req.user = decoded.userId

    } catch (error) {
        console.log(error)
        res.status(403).json({ success: false, message: "Invalid token" })
    }

}