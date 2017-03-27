/**
 * Created by admin on 2017/3/22.
 */
var http = require("http");
var url = require("url");
function start(route,p) {
    function onRequest(request, response) {
        var pathname = url.parse(request.url).pathname;
        console.log("Request for " + pathname + " received.");

        route(request,response,p);

        /*response.writeHead(200, {"Content-Type": "text/plain"});
        response.write("Hello World");
        response.end();*/
    }

    var s = http.createServer(onRequest);
    s.on('close',function(){
        console.log('server close');
    })
    s.listen(p.port);
    console.log("Server has started.");
    return s;
}

exports.start = start;