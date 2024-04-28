const express = require("express")
const app = express()

// Dummy Data (will get these from the DB later)
const users = [
    { id: "a", name: "ahmad", isAdmin: false },
    { id: "b", name: "bilal", isAdmin: true }
]

const tasks = [
    { id: 1, name: "Do Phase 5", due: new Date(), userId: "a" },
    { id: 2, name: "Do HW 3", due: new Date("2024-04-27"), userId: "b" }
]

const user = users[1]

//serve public folder
app.use(express.static("public"))

const PORT = 3000
app.listen(PORT, function () {
    console.log(`server is listeneing to port ${PORT}`)
})