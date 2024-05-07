const mongoose = require("mongoose")
mongoose.connect("mongodb://10.13.17.204/TaskDB")
module.exports = mongoose
