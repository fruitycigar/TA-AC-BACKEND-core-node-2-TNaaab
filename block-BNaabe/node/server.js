var path = require('path')

console.log(__filename);
console.log(__dirname + '/app.js');

var relativePath = path.relative('/Users/shruthisagar/Altcampus/Node/TA-AC-BACKEND-core-node-2-TNaaab/block-BNaabe/node/server.js', '/Users/shruthisagar/Altcampus/Node/TA-AC-BACKEND-core-node-2-TNaaab/block-BNaabe/node/index.html');

console.log(relativePath);

var indexAbsolute = path.join(__dirname, 'index.html');
console.log(indexAbsolute);