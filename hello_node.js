var http = require('http');
var server = http.createServer(function (req, res){
    res.end("Welcome to Node.JS world")
});
server.listen(8000);