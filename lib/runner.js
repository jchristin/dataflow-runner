"use strict";

var dataflow = require("dataflow"),
	program = JSON.parse(process.argv[2]);

dataflow.create(program).receive("start", true);
