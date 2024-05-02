const express = require("express")
const nunjucks = require("nunjucks");
const app = express()

// Setup nunjucks
nunjucks.configure("views", {
    express: app
})
app.set('view engine', 'njk');

// Dummy Data (will get these from the DB later)
const users = [
    { id: "a", name: "ahmad", isAdmin: false },
    { id: "b", name: "bilal", isAdmin: true }
]

const tasks = [
    { id: 1, name: "Do Phase 5", due: new Date(), userId: "a" },
    { id: 2, name: "Do HW 3", due: new Date("2024-04-27"), userId: "b" }
]

const user = users[0]

app.get("/", function (req, res) {

    if (user != null) {
        const userTasks = tasks.filter(t => t.userId === user.id)
        console.log(userTasks)
        res.render("home", { user, userTasks });
    } else {
        res.render("login", {})
    }
})

app.get("/task/:id", function (req, res) {
    const task = tasks.find(t => t.id == req.params.id)
    if (task) {
        res.render("taskDetails", { user, task });
    } else {
        res.status(404).send("<h1>Page Not Found</h1>")
    }

})

const PORT = 3000
app.listen(PORT, function () {
    console.log(`server is listeneing to port ${PORT}`)
})