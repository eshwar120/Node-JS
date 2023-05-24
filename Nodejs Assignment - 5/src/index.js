var http = require("http");

const httpServer = http.createServer(handleServer);


function handleServer(req, res) {

    const url = req.url;
    // console.log(url)
    if (url === "/welcome") {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end("Welcome to Dominos!")
    }
    else if (url === "/contact") {
        let json = JSON.stringify({
            phone: '18602100000',
            email: 'guestcaredominos@jublfood.com'
        });
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(json);
    }
    else {
        res.writeHead(404, {'Content-Type': 'text/plain'})
        res.end("Content not found")
    }

}

httpServer.listen(8081)

module.exports = httpServer;