// TODO: 
// 1) Import & setup express-session
// 2) implement the check auth function
// 3) Set the session when the user logs in 
// 4) destroy the session when the user logs out


const express = require("express")
const nunjucks = require("nunjucks");

//////////// CONFIGURATION //////////

const app = express()

nunjucks.configure("views", {
    express: app
})

app.set('view engine', 'njk');


/////////// MIDDLEWARE //////////

// url encoded
app.use(express.urlencoded())

//TODO: setup session


//check auth middlware
function checkAuth(req, res, next) {
    //TODO: Implement
}

///////////////// Data (will get these from the DB later) ///////////

const users = [
    { id: "a", name: "ahmad", isAdmin: false },
    { id: "b", name: "bilal", isAdmin: true }
]

const tasks = [
    { id: 1, name: "Do Phase 5", due: new Date(), userId: "a" },
    { id: 2, name: "Do HW 3", due: new Date("2024-04-27"), userId: "b" }
]

///////////////// ROUTES ////////////////

// GET

app.get("/", checkAuth, function (req, res) {
    const user = users.find(user => user.id == req.session.username)
    const userTasks = tasks.filter(t => t.userId === user.id)
    res.render("home", { user, userTasks });
})

app.get("/task/:id", checkAuth, function (req, res) {
    const user = users.find(user => user.id == req.session.username)
    const task = tasks.find(t => t.id == req.params.id)
    if (task) {
        if (task.userId == user.id) {
            res.render("taskDetails", { user, task });
        } else {
            res.status(403).send("<h1> Unauthorized </h1>")
        }
    } else {
        res.status(404).send("<h1>Page Not Found</h1>")
    }
})

app.get("/login", checkAuth, function (req, res) {
    const user = users.find(user => user.id == username)
    if (user) {
        res.redirect("/")
    } else {
        res.render("login")
    }

})

app.get("/logout", checkAuth, function (req, res) {
    // destroy the session
    res.redirect("/")
})

// POST 

app.post("/login", function (req, res) {
    const username = req.body.id
    if (username) {
        const user = users.find(user => user.id == username)
        if (user) {
            // Save the username to the session 
            res.redirect("/")
        } else {
            res.render("login", { errorMessage: "User Not Found" })
        }
    } else {
        res.redirect("/login")
    }
})

////////// RUN THE SERVER //////////

const PORT = 3000
app.listen(PORT, function () {
    console.log(`server is listeneing to port ${PORT}`)
})