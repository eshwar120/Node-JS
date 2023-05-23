const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const registerRoute = require('./routes/register');
const loginRoute = require('./routes/login');
const postRoute = require('./routes/post');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/connectDB');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//using body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

////using cookie-parser for refresh token
app.use(cookieParser());

//connecting to mongoDB
connectDB();

app.use('/register', registerRoute);
app.use('/login', loginRoute);
app.use('/post', postRoute)

app.use('/*', (req, res) => {
    res.send("server is running")
});

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

