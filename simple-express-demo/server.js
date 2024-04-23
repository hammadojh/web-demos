const express = require("express")
const app = express()

app.use(express.static("public"))

const tasks = [
    { id: 1, name: "Do Phase 5", due: new Date() },
    { id: 2, name: "Do HW 3", due: new Date("2024-04-27") }
]

app.get("/tasks", function (req, res) {
})

const PORT = 3000
app.listen(PORT, function () {
    console.log(`server is listeneing to port ${PORT}`)
})