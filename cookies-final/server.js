const express = require("express");
const app = express();
const cookieParset = require("cookie")

app.get("/", (req, res) => {
    // write the cookies code here 
});

app.listen(3000, () => {
    console.log("Express server initialized");
});
