/**
 * Created by admin on 2017/3/22.
 */
var http = require("http");
var url = require("url");
function start(route,p) {
    function onRequest(request, response) {
        var pathname = url.parse(request.url).pathname;
        console.log("Request for " + pathname + " received.");

        route(pathname);

        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write("Hello World");
        response.end();
    }

    var server = http.createServer(onRequest);
    server.listen(8888);
    console.log("Server has started.");
    return server;
}

exports.start = start;