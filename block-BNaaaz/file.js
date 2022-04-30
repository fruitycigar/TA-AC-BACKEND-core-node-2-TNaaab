var http = require('http');
var fs = require('fs');

var server = http.createServer(handleRequest);

function handleRequest(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    fs.createReadStream('./readme.txt').pipe(res);
}

server.listen(6666, () => {
    console.log(`The beast is now live.`);
})