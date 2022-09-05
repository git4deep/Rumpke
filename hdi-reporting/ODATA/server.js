/*eslint no-console: 0, no-unused-vars: 0*/
"use strict";

var xsjs = require("@sap/xsjs");
var xsenv = require("@sap/xsenv");
var port = process.env.PORT || 3000;

var options = {
	anonymous: false, // remove to authenticate calls
	redirectUrl: "/rumpke/app/cpi/services/financeData.xsodata?$format=json"
};

// configure HANA
try {
	options = Object.assign(options, xsenv.getServices({
		hana: {
			tag: "hana"
		}
	}));
} catch (err) {
	console.log("[WARN]", err.message);
}

try {
	options = Object.assign(options, xsenv.getServices({ uaa: {tag: "xsuaa"} }));
} catch (err) {
	console.log("[WARN]", err.message);
}
// start server
var app = xsjs(options); //.listen(port);


app.get('/status', function (req, res) {
  res.send('ok');
});

//Start Server
app.listen(port);


console.log("Server listening on port %d", port);

