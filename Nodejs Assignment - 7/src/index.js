const express = require('express')
const app = express()
const bodyParser = require("body-parser");
let intialData = require('./InitialData')
const port = 8080
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

let idCount = 8;
// your code goes here
app.get('/api/student', (req, res) => {

    try {
        res.status(200).json(intialData)
    }
    catch (err) {
        res.status(500).json({ "message": err })
    }

});


app.get('/api/student/:id', (req, res) => {

    try {
        const id = Number(req.params.id);
        const data = intialData.find(item => { return id === item.id; });
        if (data) {
            return res.status(200).json(data)
        }
        res.status(404).json({ "message": "please provide valid id" })
    }
    catch (err) {
        res.status(500).json({ "message": err })
    }

});


app.post('/api/student', (req, res) => {

    try {
        const { name, currentClass, division } = req.body;
        if (name, currentClass, division) {
            intialData.push({
                id: idCount++,
                name: name,
                currentClass: Number(currentClass),
                division: division
            });
            return res.status(200).json({ "id": idCount - 1 })
        }
        res.status(400).json({ "message": "please provide complete details" })
    }
    catch (err) {
        res.status(500).json({ "message": err })
    }

});


app.put('/api/student/:id', (req, res) => {

    try {
        const { name, currentClass, division } = req.body;
        const id = Number(req.params.id);
        let studentData = intialData.find(item => {return id === item.id; });
        if (studentData) {

            if (name) studentData.name = name;
            if (currentClass) studentData.currentClass = Number(currentClass);
            if (division) studentData.division = division;
    
            intialData.push(studentData);
           return res.status(202).json({ studentData })
        };
        res.status(400).json({ "message": "please provide valid details" })
    }
    catch (err) {
        res.status(500).json({ "message": err })
    }
    
})


app.delete('/api/student/:id', (req, res) => {

    try {
        const id = Number(req.params.id);
        let len = intialData.length;
        intialData = intialData.filter((item) => { return id !== item.id });
        if (len === intialData.length + 1) {
            return res.status(200).json({ "message": "deleted successfully" })
        }
        res.status(404).json({ "message": "please provide valid id" })
    }
    catch (err) {
        res.status(500).json({ "message": err })
    }

})

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;   