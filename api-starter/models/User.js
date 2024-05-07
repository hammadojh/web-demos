const db = require("../db");

const User = db.model("User", {
    name: String,
    isAdmin: Boolean,
});

module.exports = User;