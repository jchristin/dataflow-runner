/* global describe, it */

"use strict";

var request = require("supertest"),
	server = require("../lib/server.js");

describe("GET /api/run", function () {
	it("should respond", function (done) {
		request(server)
			.get("/api/run")
			.expect(200, done);
	});
});
