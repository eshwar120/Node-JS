const jwt = require('jsonwebtoken');
const User = require('../model/User');
// const cookieParser = require('cookie-parser');


const refreshMiddleware = (req, res, next) => {
    console.log(req.cookies)

    try {
        const cookies = req.cookies;
        console.log(cookies);
        if (!cookies?.jwt) return res.sendStatus(401);
        const refreshToken = cookies.jwt;
        const userFound = User.findOne({ refreshToken }).exec();
        if (userFound) {

            jwt.verify(
                refreshToken,
                process.env.REFRESH_TOKEN_KEY,
                async (err, decoded) => {
                    if (err) {
                        userFound.refreshToken = [];
                        await userFound.save();
                        res.clearCookie('jwt');
                        res.sendStatus(403);
                    }
                    const accessToken = jwt.sign(
                        {
                            email: decoded.user.email,
                            id : decoded.user._id
                        },
                        process.env.ACCESS_TOKEN_KEY,
                        { expiresIn: "10m" }
                    )
                    // res.json({accessToken});
                    next()
                }
            )
        }
        else {
            jwt.verify(
                refreshToken,
                process.env.REFRESH_TOKEN_KEY,
                async (err, decoded) => {
                    if (err) {
                        userFound.refreshToken = [];
                        await userFound.save();
                        res.clearCookie('jwt');
                        res.sendStatus(403)
                    }
                }

            )
        }
    }
    catch (err) {
        res.clearCookie('jwt');
        res.status(500).json({
            "status": "authentication failed",
            "error": err
        })
    }
}

module.exports = refreshMiddleware;