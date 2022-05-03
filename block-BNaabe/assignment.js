var http = require('http');

var server = http.createServer(handleRequest);

function handleRequest(req, res) {
    var store = '';
    req.on('data', (chunk) => {
        store += chunk;
    })

    req.on('end', () => {
        if(req.method === 'POST' && req.url === '/') {
            console.log(store);
            res.end(store);
        }
    })

}

server.listen(1441, () => {
    console.log('Server 1441 is now live.');
})