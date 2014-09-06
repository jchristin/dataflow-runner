"use strict";

var server = require("./server.js"),
	port = process.env.PORT || 5000;


// Start serv
server.listen(port);
console.log("Listening on " + port);
