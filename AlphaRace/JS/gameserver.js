var http = require('http');
var url = require('url');
var fs = require('fs');

http.createServer(function (req, res) {
	var urlPath = url.parse(req.url).pathname; // Gets the URL's pathname
    var urlPathDotPosition = urlPath.indexOf("."); // Needed for urlPathExtension
    var urlPathBasename = urlPath.slice(0, urlPathDotPosition); // Unused for now
    var urlPathExtension = urlPath.slice(urlPathDotPosition + 1); // Needed to return MIME type later
    var mimeTypes = {
        html: 'text/html',
        css: 'text/css',
        js: 'text/javascript',
        jpeg: 'image/jpeg',
        jpg: 'image/jpeg',
        png: 'image/png',  
        json: 'application/json',
        gif: 'image/gif',
        m4a: 'audio/m4a',
    }
    if (urlPath == '/' || urlPath == '/game.html') {
        fs.readFile("../HTML/game.html", function(err, data) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            res.end();
        });
    }
    else {
        if (fs.existsSync('..' + urlPath)) {
            fs.readFile('..' + urlPath, function(err, data) {
                res.writeHead(200, {'Content-Type': mimeTypes[urlPathExtension]});
                res.write(data);
                res.end();
            });
        }
        else if (urlPath == '/Audio/videoplayback.oggvorbis.ogg') {
            fs.readFile('../Audio/videoplayback.oggvorbis.ogg', function(err, data) {
                res.writeHead(200, {'Content-Type': 'application/ogg'});
                res.write(data);
                res.end();
            }); // Had to serve this file under it's own condition due to it's unusual extension name. Not sure how to include '.' in an item name in JS.
        }
        else if (urlPath == '/JS/savescores.js') {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write('Scores posted.');
            res.end();
            console.log("JSON Posted from client. Receiving...");
            req.on('data', function(data) {
                console.log("JSON Received:" + data);
                fs.writeFile('playerscores.json', data);
            });
        }
        else {
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('What exactly do you think you\'re trying to access?');
            console.log("Invalid request");
        }

    }
}).listen(8080);

