// modules
var fs = require('fs');
var http = require('http');
var qs = require('querystring');

var server = http.createServer(handleRequest);

function handleRequest(req, res) {
    var store = '';
    req.on('data', (chunk) => {
        store += chunk;
    })

    req.on('end', () => {
        if(req.url === '/form' && req.method === 'GET') {
            res.setHeader('content-type', 'text/html');
            fs.createReadStream('./form.html').pipe(res);
        }

        if(req.url === '/form' && req.method === 'POST') {
            var parsedData = qs.parse(store);
            res.setHeader('content-type', 'text/html');
            res.write(`<p>Name: ${parsedData.name}</p>`);
            res.write(`<p>Email: ${parsedData.email}</p>`);
            res.write(`<p>Age: ${parsedData.age}</p>`);
            res.end();
        }
    })
}

server.listen(5678, () => {
    console.log('Server 5678 is now live.');
})