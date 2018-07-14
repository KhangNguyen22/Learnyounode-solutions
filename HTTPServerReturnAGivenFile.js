var http = require('http');
var fs = require('fs');


 /*Create a TCP server with createServer. Whenever we send a request to the server, the function(req,res){...} is fired. The req is loaded with details when the function is fired. */
const server = http.createServer( function(req,res) {
    res.writeHead(200, { 'content-type': 'text/plain'});
    /*fs.createReadStream sends small chunks of data buffer with each chunk producing an event. This allows callback functions to fire without requiring the whole piece of data to be stored in memory before firing the callback. 
    fs.readFile requires all piece of data to be stored in memory before it fires a callback function.><*/
    fs.createReadStream(process.argv[3]).pipe(res);
})

server.listen(Number(process.argv[2]));
console.log("I am listening on port: " + process.argv[2] );