var http = require('http');
var qs = require('querystring')

var server = http.createServer(handleRequest);

function handleRequest(req, res) {
    var dataFormat = req.headers['content-type'];
    var store = '';

    req.on('data', (chunk) => {
        store += chunk;
    })

    req.on('end', () => {
        if(dataFormat === "application/JSON" && req.url === 'POST') {
            var parsedData = JSON.parse(store);
            res.end(store);
        }

        if(dataFormat === "application/x-www-form-urlencoded" && req.url === "POST") {
            res.end(qs.stringify(store));
        }
    })
}

server.listen(7777, () => {
    console.log('7k is now live and kicking.');
})