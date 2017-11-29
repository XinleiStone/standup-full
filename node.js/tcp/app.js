var net = require("net");

net.createServer(function(socket) {
    socket.on('data', function(data) {
        socket.write("data");
    });

    socket.on('end', function () {
        console.log("end");
    });

    socket.on('drain', function() {
        console.log("drain");
    });

    socket.write("welcome");
}).listen(8124, function() {
    console.log("Server is listening at 8124...");
});