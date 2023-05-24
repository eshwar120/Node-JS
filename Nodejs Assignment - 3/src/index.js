const fs = require('fs');
const http = require('http');

fs.writeFileSync('index.html' , "<h1> Hello World </h1> <p> This is Eshwar... </p>" , (err) => {
    console.log("Something went wrong unable to create file")
});

const app = http.createServer((req,res) => {
    res.end(fs.readFileSync('index.html'))
})
app.listen(3001)