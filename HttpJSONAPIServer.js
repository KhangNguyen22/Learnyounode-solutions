var http = require('http');
var url = require('url');

function parsetime(time) {
    return {
        hour: time.getHours(),
        minute: time.getMinutes(),
        second: time.getSeconds()
    };
}

function unixtime (time){
    return { unixtime: time.getTime()};
}
/*Below, the req object in createServer(the http server) has a url property that you will need to use to "route" your requests for the two endpoints. */
var server = http.createServer(function(req,res){
    
    // the url.parse object takes the req.url and returns an object. The second argument ('true') parses the query string(sent from client) using the querystring module.
    var parsedUrl = url.parse(req.url, true);
    /*Date objects are created with the new Date() constructor of type Date. Below, you are initiating a date through new Date(dateString). The parsedUrl.query.iso returns a date String. ISO is just an internationally accepted way to represent time(YYYY-MM-DD). */
    var time = new Date(parsedUrl.query.iso)
    //let declares a block scope local variable. It has yet to be initialised.
    let result
    //Below, the test() method is used to match one string with the string of the req.url.
    if (/^\/api\/parsetime/.test(req.url)) {
        //call function parsetime and assign it to result.
        result = parsetime(time);
    } else if (/^\/api\/unixtime/.test(req.url)) {
               result = unixtime(time);
               }
    //If result is not initialised(assigned a value), then it is undefined and so is false. Undefined is a falsey value.
    if (result) {
    res.writeHead(200, {'Content-Type': 'application/json'});
        //JSON.stringify() converts a Javascript object(in this case, result) into a string.
    res.end(JSON.stringify(result));
} else {
    //404 means NOT Found.
    res.writeHead(404);
    res.end();
}
})

server.listen(Number(process.argv[2]));