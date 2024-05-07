// 1) create a folder for APIs
// 2) create a file for the task APIs call it tasks.js
// 3) Import and setup express Route module
// 4) Create 4 routes GET,POST,UPDATE,DELETE with /:id to list ,add ,update and delete tasks
// 5) Link the front end to the backend using fetch()

const express = require("express")
const nunjucks = require("nunjucks");
const bodyParser = require("body-parser");

const Task = require("./models/Task");
const User = require("./models/User");

const app = express()
app.use(bodyParser.urlencoded());

// Setup nunjucks
nunjucks.configure("views", {
    express: app
})
app.set('view engine', 'njk');

/////////////// DB stuff //////////////

const users = [
    { id: "a", name: "ahmad", isAdmin: false },
    { id: "b", name: "bilal", isAdmin: true }
]

const tasks = []

const user = users[1]

app.get("/", function (req, res) {
    if (user != null) {
        Task.find({})
            .then(tasks => {
                const userTasks = tasks.filter(t => t.userId === user.id)
                console.log(userTasks)
                res.render("home", { user, userTasks });
            })
            .catch(err => {
                console.log(err)
            })
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

app.post("/task", function (req, res) {
    const task = new Task({
        name: req.body.name,
        due: req.body.due,
        userId: user.id
    })

    task.save();
    res.redirect("/");
})

const PORT = 3000
app.listen(PORT, function () {
    console.log(`server is listeneing to port ${PORT}`)
})