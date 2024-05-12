const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jwt-simple");

const app = express();
const router = express.Router();

// Parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded(
    { extended: false }));

// Secret used to encode/decode JWTs
const secret = "supersecret";

router.post("/auth", function (req, res) {

    // Verify bsmith/pass was POSTed 
    if (req.body.username === "bsmith" && req.body.password === "pass") {
        // Send back a token that contains the user's username
        const token = jwt.encode({ username: "bsmith" }, secret);
        res.json({ token: token });
    }
    else {
        // Unauthorized access
        res.status(401).json({ error: "Bad username/password" });
    }
});

router.get("/status", function (req, res) {

    // Check if the X-Auth header is set
    if (!req.headers["x-auth"]) {
        return res.status(401).json({ error: "Missing X-Auth header" });
    }

    // X-Auth should contain the token value
    const token = req.headers["x-auth"];
    try {
        const decoded = jwt.decode(token, secret);

        // Send back a status
        if (decoded.username === "bsmith") {
            res.json({ status: "Enjoying a beautiful day!" });
        }
        else {
            res.json({ status: "Working hard!" });
        }
    }
    catch (ex) {
        res.status(401).json({ error: "Invalid JWT" });
    }
});

app.use("/api", router);

app.listen(3000);