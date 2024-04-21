const express = require("express");
const morgan = require("morgan")
const nunjucks = require("nunjucks")
const app = express()

// constansts 
const PORT = 3000

nunjucks.configure("views", {
    express: app
})

app.set("view engine", 'njk')

// const logrequest = (req, res, next) => {
//     console.log(`Request: ${req.method} for ${req.path}`)
//     next();
// }

//middlewares
// app.use(logrequest)
app.use(morgan('dev'))
// app.use(express.static('public'))
app.use(express.urlencoded())

// respond to get
const tasks_list = [1, 2, 3, 4]
app.get("/", (req, res) => {
    res.render("index", { name: "Web Dev", tasks: tasks_list })
})

//respond to post request
app.post("/submitted", function (req, res) {
    res.send(`<h1>Form Submitted, thank you ${req.body.email}</h1>`)
})

app.listen(PORT, function () {
    console.log(`listening to port ${PORT}`)
})