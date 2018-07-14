var fs = require('fs');
var folder = process.argv[2];
var ext = '.'+ process.argv[3];

fs.readdir(folder, function (err,files) {
    if (err) {
        return console.error(err);
    }
    
    files.forEach( function (files){
        if ( files.endsWith(ext)){
            console.log(files);
        }
    }
                 )
});
