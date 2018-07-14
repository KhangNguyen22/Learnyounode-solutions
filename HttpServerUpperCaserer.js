var http = require('http');
var map = require('through2-map');

var server = http.createServer(function(req,res){
    if (req.method !== 'POST'){
        return res.end('send me a POST\n')
    }
    //map creates a new array with the results of calling a provided function on every element in the calling array. This through2-map module works on streams instead of arrays. chunk refers to each piece of data received from the req.
    req.pipe(map(function (chunk) {
        return chunk.toString().toUpperCase();
    })).pipe(res);
})

server.listen(Number(process.argv[2]));