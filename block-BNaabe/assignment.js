// Q1. Create a server using http ✅
// - handle post method on '/' route 
// - send json data on it from postman ✅

// ```js
// // data format is
// {
//   team: 'kxip',
//   players: 18,
//   captain: 'KL Rahul'
// }
// ```
// - capture data from request on server side using data and end event on request object ✅
// - when end event fires, send entire captured data in response with status code 201. ✅

// var http = require('http');

// var server = http.createServer(handleRequest);

// function handleRequest(req, res) {
//     var store = '';
//     req.on('data', (chunk) => {
//         store += chunk;
//     })
//     req.on('end', () => {
//         if(req.method === 'POST' && req.url === '/') {
//             res.statusCode = 201;
//             res.end(store);
//         }
//     })
    
// }

// server.listen(3000, () => {
//     console.log('Server is now listening in on port 3000.')
// })

// Q2. Follow above steps with form data from postman instead of json data.
// - once data has been captured, send only captain's name in response. ✅

// var http = require('http');
// var qs = require('querystring');
// var server = http.createServer(handleRequest);

// function handleRequest(req, res) {
//     var store = '';
//     req.on('data', (chunk) => {
//         store += chunk;
//     }).on('end', () => {
//         if(req.method === 'POST' && req.url === '/') {
//             var parsedData = qs.parse(store);
//             console.log(parsedData);
//             res.end(JSON.stringify(parsedData.captain));
//         }
//     })
// }

// server.listen(3000, () => {
//     console.log('Server is now live on Port 3000.');
// })

// Q3. Create server which can handle both json/form data without specifying which format of data is being received.
// - add listener on port 9000
// - use `data/end` event to capture json/form data
// - use `req.headers['Content-Type']` to check data format
// - parse respective data format i.e. json/form 
// - send entire data in response
// - data sent from postman should have fields:
//   - city
//   - state
//   - country
//   - pin

// var http = require('http');
// var qs = require('querystring');
// var server = http.createServer(handleRequest);

// function handleRequest(req, res) {
//     var store = '';
//     var dataFormat = req.headers['content-type'];

//     req.on('data', (chunk) => {
//         store += chunk;
//     }).on('end', () => {
//         if(dataFormat === 'application/json') {
//             res.end(store);
//         }
//         if(dataFormat === 'application/x-www-form-urlencoded') {
//             var parsedData = qs.parse(store);
//             res.end(JSON.stringify(parsedData));
//         }
//     })
// }

// server.listen(9000, () => {
//     console.log('Server is now listening in on Port 9000.');
// })


// Q4. create server, send json data in request from postman, parse in on the server and send html response with entire parsed data information.
// - format of json data is {name: your name, email: "", }
// - Html response format is <h1>Name</h1><h2>email</h2>

var http = require('http');
var qs = require('querystring');

var server = http.createServer(handleRequest);

function handleRequest(req, res) {
    var store = '';
    var dataFormat = req.headers['content-type'];

    req.on('data', (chunk) => {
        store += chunk;
    }).on('end', () => {

        if(dataFormat === 'application/json') {
            var jsonData =  JSON.parse(store);
            console.log(jsonData);
            res.setHeader('content-type', 'text/html');
            res.end(`<h1>${jsonData.name}</h1><p>${jsonData.email}</p>`);
        }

        if(dataFormat === 'application/x-www-form-urlencoded') {
            var parsedData =  qs.parse(store);
            res.setHeader('content-type', 'text/html');
            res.end(`<h2>${parsedData.email}</h2>`);
        }
    })

}

server.listen(8888, () => {
    console.log('Server is listening in on port 8888.');
})

// Q5. Follow above question with form data containing fields i.e name and email. 
// - Parse form-data using `querystring` module
// - respond with HTML page containing only email from data in H2 tag.


