/* global describe, it */

"use strict";

var request = require("supertest"),
	server = require("../lib/server.js");

describe("GET /bricks", function () {
	it("should respond", function (done) {
		request(server)
			.get("/bricks")
			.expect([])
			.expect(200, done);
	});
});
