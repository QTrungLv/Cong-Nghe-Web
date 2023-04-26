const jwt = require('jsonwebtoken');

require('dotenv').config()

const verifyToken = (req, res, next) => {
    const authorization = req.headers['Authorization']
//Authorization: Bearer token
    if (!token) {
        res.status(401).send({ success: false, message: 'Token is required' })
    }

    jwt.verify(token, process.env.JWT_KEY_SECRET)

}