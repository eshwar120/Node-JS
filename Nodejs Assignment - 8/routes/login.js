const express = require('express');
const loginRoute = express.Router()
const bcrypt = require('bcrypt');
const User = require('../model/User');
const jwt = require('jsonwebtoken');
require('dotenv').config()



loginRoute.post('', async (req, res) => {
    // console.log(req.body);
    const userData = req.body;
    if (!userData || !userData.email || !userData.password) {
        return res.status(400).json({
            "message": "please provide sufficient details"
        })
    }
    try {
        const user = await User.findOne({ email: userData.email }).exec();
        if (!user) {
            return res.status(401).json({
                "message": "incorrect username or password"
            })
        }
        const result = await bcrypt.compare(userData.password, user.password);
        // console.log(user, result)
        if (!result) {
            return res.status(401).json({
                "message": "incorrect username or password"
            })
        };
        //generating access token
        const accessToken = jwt.sign(
            {
                email: user.email,
                id : user._id
            },
            process.env.ACCESS_TOKEN_KEY,
            { expiresIn: "10m" }
        );

        //generating refresh token
        const refreshToken = jwt.sign(
            {
                email: user.email,
                id : user._id
            },
            process.env.REFRESH_TOKEN_KEY,
            { expiresIn: "1d" }
        );

        //saving refresh token with current user
        user.refreshToken.push(refreshToken);
        const updatedUser = await user.save();

        // Creates Secure Cookie with refresh token
        res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });

        // Send authorization roles and access token to user
        res.status(200).json({ accessToken });

    }
    catch (err) {
        res.status(500).json({
            "message": "something went wrong",
            "error" : err
        });
    }

})

module.exports = loginRoute;