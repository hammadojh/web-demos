const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost/TaskDB")

module.exports = mongoose
