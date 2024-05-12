const express = require("express")
const router = express.Router();
const Task = require("../models/Task")

router.get("/", function (req, res) {
    Task.find()
        .then(tasks => {
            res.json(tasks)
        })
        .catch(err => {
            console.log(err)
        })
})

module.exports = router