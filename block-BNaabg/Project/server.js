// modules
var http = require('http');
var fs = require('fs');
var url = require('url');

var server = http.createServer(handleRequest);

var userPath = __dirname + '/Users/';

function handleRequest(req, res) {
    var parsedUrl = url.parse(req.url, true);

    var store = '';
    req.on('data', (chunk) => {
        store += chunk;
    })

    req.on('end', () => {
        if(req.method === 'POST' && req.url === '/users') {
    
                var username = JSON.parse(store).username;
                fs.open(userPath + username + '.json', 'wx', (err, fd) => {
                    if(err) return console.log(err);
                    fs.writeFile(fd, store, (err) => {
                        if(err) console.log(err);
                        fs.close(fd, (err) => {
                            if(err) return console.log(err);
                            return res.end(`${username} created successfully.`);
                        })
                    })
                })
            
        }
    
        if(req.method === 'GET' && parsedUrl.pathname === '/users') {
            var username = parsedUrl.query.username;
            fs.readFile(userPath + username + '.json', (err, content) => {
                if(err) console.log(err);
                res.setHeader('Content-Type', 'application/json');
                return res.end(content);
            })
        }
        
        if(req.method === 'PUT' && parsedUrl.pathname === '/users') {
            var username = parsedUrl.query.username;
            fs.open(userPath + username + '.json', 'r+', (err, fd) => {
                if(err) console.log(err);
                fs.ftruncate(fd, (err) => {
                    if(err) console.log(err);
                    fs.writeFile(fd, store, (err) => {
                        if(err) console.log(err);
                        fs.close(fd, () => {
                            return res.end(`${username} sucessfully updated.`);
                        })
                    });
                })
            })
        }

        if(req.method === 'DELETE' && parsedUrl.pathname === '/users') {
            var username = parsedUrl.query.username;
            fs.unlink(userPath + username + '.json', (err) => {
                if(err) console.log(err);
                return res.end(`${username} deleted.`)
            })
        }

        // res.statusCode = 404;
        // res.end('Page not found.')

    })

}

server.listen(3000, () => {
    console.log('Server is सुनो-ing on Port 3000.');
})

