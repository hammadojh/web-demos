const express = require("express")
const app = express()

// Middleware for the router
app.use("/api/tasks", require("./apis/tasks"))
app.use(express.static("public"))

const PORT = 3000
app.listen(PORT, function () {
    console.log(`server is listeneing to port ${PORT}`)
})