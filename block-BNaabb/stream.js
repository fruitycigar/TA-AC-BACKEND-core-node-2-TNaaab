var http = require('http');

var server = http.createServer(handleRequest);

function handleRequest(req, res) {
    var store = '';
    req.on('data', (chunk) => {
        store += chunk;
    })
    
    req.on('end', () => {
        console.log(store);
    })
}

server.listen(3456, () => {
    console.log("Server 3456 is now live.");
})