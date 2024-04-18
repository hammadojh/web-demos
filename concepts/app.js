const http = require("http")
http.createServer(function (req, res) {
    console.log("a new request")
    res.end("responded")
}).listen(3000);