const db = require("../db");

const Task = db.model("Task", {
    name: String,
    due: Date,
    userId: String
});

module.exports = Task;