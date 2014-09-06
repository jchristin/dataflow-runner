"use strict";

var express = require("express"),
	morgan = require("morgan"),
	bodyParser = require("body-parser"),
	server = express();

// Setup logging.
if (process.env.NODE_ENV === "development") {
	server.use(morgan("dev", {immediate: true}));
} else {
	server.use(morgan("combined"));
}

server.use(express.query());

server.use(bodyParser.json());

server.get("/api/run", function (req, res) {
	res.end();
});

module.exports = server;
