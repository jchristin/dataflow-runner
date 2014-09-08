"use strict";

var fork = require("child_process").fork,
	express = require("express"),
	morgan = require("morgan"),
	bodyParser = require("body-parser"),
	server = express(),
	processes = {};

// Setup logging.
if (process.env.NODE_ENV === "development") {
	server.use(morgan("dev", {
		immediate: true
	}));
}
else {
	server.use(morgan("combined"));
}

server.use(bodyParser.text());

server.get("/bricks", function (req, res) {
	res.end(JSON.stringify(Object.keys(processes)));
});

server.post("/bricks", function (req, res) {
	var child = fork("./lib/runner.js", [req.body]);
	processes[child.pid] = child;
	console.log("Child process " + child.pid + " is running.");

	child.on("exit", function (code, signal) {
		console.log("Child process " + child.pid + " is terminated.");
		delete processes[child.pid];
	});

	res.end(JSON.stringify({
		pid: child.pid
	}));
});

server.delete("/bricks", function (req, res) {
	Object.keys(processes).forEach(function (key) {
		processes[key].kill();
	});

	res.end();
});

server.get("/brick/:pid", function (req, res) {
	if (processes[req.params.pid]) {
		res.end();
	}
	else {
		res.status(410).end();
	}
});

server.delete("/brick/:pid", function (req, res) {
	var child = processes[req.params.pid];
	if (child) {
		child.kill();
		res.end();
	}
	else {
		res.status(410).end();
	}
});

module.exports = server;
