const jwt = require("jwt-simple");
const secret = "supersecret";
const payload = { username: "bsmith" };

// Create a JWT
const token = jwt.encode(payload, secret);
console.log("Token: " + token);

// Decode a JWT
const decoded = jwt.decode(token, secret);
console.log("Decoded payload: " + decoded.typ);