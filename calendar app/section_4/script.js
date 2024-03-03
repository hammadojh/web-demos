// models

function Task(name, due, duration) {
    this.name = name
    this.due = due
    this.duration = duration
}

let tasks = [
    new Task("SWE 363 HW", new Date(2024, 1, 12), 20),
    new Task("Do something else", new Date(2024, 1, 12), 20)
]

tasks.forEach((task, i) => {
    // creat an html element 
    const taskElement = createTaskCard(task)

    // get the parent object from the doc
    document.querySelector(".cards").append(taskElement)
})

document.querySelector("#new_task_btn").addEventListener("click", (e) => {

    if (e.target.classList.contains("clicked")) {
        console.log("remove the task box")
        document.querySelector(".cards").removeChild(document.querySelector("#task_box"))
    } else {
        // create the html element
        const newTaskBox = createNewTaskBox()

        // add it to html
        document.querySelector(".cards").appendChild(newTaskBox)
    }

    e.target.classList

})

function createTaskCard(task) {
    const htmlString = `
    <div class="card p-4 shadow-sm" id="0">
        <div class="hstack gap-4 align-items-center">
            <input type="checkbox" class="form-check-input p-3">
            <div>
                <h3 class="fw-bold">${task.name}</h3>
                <div class="hstack gap-3">
                    <h5><i class="bi bi-calendar3"></i> ${task.due}</h5>
                    <h5><i class="bi bi-clock"></i> ${task.duration}</h5>
                </div>
            </div>
        </div>
    </div>
    `
    const div = document.createElement("div")
    div.innerHTML = htmlString
    return div.children[0]

}

function createNewTaskBox() {
    const htmlString = `
    <div id="task_box" class="card vstack gap-3 p-3 border border-3 border-primary">
        <input id="new_task_input" class="form-control border-0 fs-3" type='text'
            placeholder='Task name..'>
        <div class="hstack gap-3">
            <button class="btn btn-light"><i class="bi bi-calendar3"></i> Deadline</button>
            <button class="btn btn-light"><i class="bi bi-clock"></i> Duration</button>
        </div>
    </div>
    `
    const div = document.createElement("div")
    div.innerHTML = htmlString
    return div.children[0]
}