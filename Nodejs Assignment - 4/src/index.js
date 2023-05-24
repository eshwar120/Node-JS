const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 3000
// app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
// app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const validation = (num1, num2, res) => {
    if (num1 > 10e5 || num2 > 10e5) {
        res.status(400).json({
            "status": "error",
            "message": "overflow"
        })
        return false;
    }
    else if (num1 < -10e5 || num2 < -10e5) {
        res.status(400).json({
            "status": "error",
            "message": "underflow"
        })
        return false;
    }
    else if (typeof (num1) == "string" || typeof (num2) == "string") {
        res.status(400).json({
            "status": "error",
            "message": "Invalid data types"
        })
        return false;
    }
    return true
}

const failure = (res) => {
    return res.status(400).json({
        "status": "failure",
        "message": "data not found"
    })
}

app.post('/add', (req, res) => {

    const { num1, num2 } = req.body;

    if (validation(num1, num2, res)) {
        if (num1 && num2) {
            res.status(200).json({
                "status": "success",
                "message": "the sum of given two numbers",
                "sum": (num1 + num2)
            })
        }
        else {
            failure(res);
        }
    }

});

app.post('/sub', (req, res) => {

    const { num1, num2 } = req.body;

    if (validation(num1, num2, res)) {
        if (num1 && num2) {
            res.status(200).json({
                "status": "success",
                "message": "the difference of given two numbers",
                "sum": (num1 - num2)
            })
        }
        else {
            failure(res);
        }
    }

});

app.post('/multiply', (req, res) => {

    const { num1, num2 } = req.body;

    if (validation(num1, num2, res)) {
        if (num1 && num2) {
            res.status(200).json({
                "status": "success",
                "message": "The product of given numbers",
                "sum": (num1 * num2)
            })
        }
        else {
            failure(res);
        }
    }

});

app.post('/divide', (req, res) => {

    const { num1, num2 } = req.body;

    if (validation(num1, num2, res)) {
        if (num2 === 0) {
            res.status(400).json({
                "status": "error",
                "message": "Cannot divide by zero"
            })
        }
        else if (num1 !== undefined && num2) {
            res.status(200).json({
                "status": "success",
                "message": "The division of given numbers",
                "sum": (num1 / num2)
            })
        }
        else {
            failure(res);
        }
    }

});

app.get((req, res) => {
    res.send("Hello world!")
});

app.use((req, res) => {
    res.send("Hello world!")
});

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;