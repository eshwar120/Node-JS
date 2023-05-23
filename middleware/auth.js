const jwt = require('jsonwebtoken');

const authMiddleWare = (req, res, next) => {

    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.sendStatus(401);
        }
        const authToken = authHeader.split(' ')[1];//token shoulbe "Bearer token....."
        if (authToken) {
            return jwt.verify(
                authToken,
                process.env.ACCESS_TOKEN_KEY,
                (err, decoded) => {
                    if (err) {
                        return res.sendStatus(403)//invalid token
                    }
                    req.userId = decoded.id
                    next()
                }
            )

        } else {
            //without Bearer suffix
            return res.sendStatus(401);
        }
    }
    catch (err) {
        res.status(500).json({
            "status": "authentication failed",
            "error": err
        })
    }
}


module.exports = authMiddleWare;