const app = require('./app');
const dotenv = require('dotenv');
const mongoose = require('mongoose');


dotenv.config();
//connect to DB
// console.log(process.env.DATABASE_URL)
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(data => {
        console.log('connected to DB');
    })
    .catch(err => {
        console.log("Unable to connect DB", err.message);
    });




app.listen(3000, () => console.log('Server running......'));

