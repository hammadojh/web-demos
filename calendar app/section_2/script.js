// Steps 
// Add task 
// Check tasks
// Save task 
// Discard 
// Set durtion & deadline
// Detect conflics 

// Task object 
function Task(name, due, duration) {
    this.name = name
    this.due = due
    this.duration = duration // in minutes
}

let tasks = [
    new Task("SWE 363 HW", new Date(), 60),
    new Task("Prep for quiz", new Date(), 60)
]

// populate html elements

function populateElements() {
    tasks.forEach((task) => {
        const htmlCard = createHTMLCard(task)
        document.querySelector(".cards").append(htmlCard)
    })
}

function createHTMLCard(task) {
    const htmlString = `<div class="card p-4 shadow-sm" id="0">
                        <div class="hstack gap-4 align-items-center">
                            <input type="checkbox" class="form-check-input p-3">
                            <div>
                                <h3 class="fw-bold">${task.name}</h3>
                                <div class="hstack gap-3">
                                    <h5><i class="bi bi-calendar3"></i> ${formatDate(task.due)}</h5>
                                    <h5><i class="bi bi-clock"></i> ${formatDuration(task.duration)}</h5>
                                </div>
                            </div>
                        </div>
                    </div>`
    const div = document.createElement("div")
    div.innerHTML = htmlString
    return div
}

function createNewTaskBox() {
    const htmlString = `<div id="123" class="card vstack gap-3 p-3 border border-3 border-primary">
    <input id="new_task_input" class="form-control border-0 fs-3" type='text'
        placeholder='Task name..'>
    <div class="hstack gap-3">
        <button class="btn btn-light"><i class="bi bi-calendar3"></i> Deadline</button>
        <button class="btn btn-light"><i class="bi bi-clock"></i> Duration</button>
    </div>
</div>`
    const div = document.createElement("div")
    div.innerHTML = htmlString
    return div
}

// Event listeners

document.querySelector("#new_task_btn").addEventListener("click", (e) => {
    if (e.target.classList.contains("clicked")) {
        console.log("clicked")
        // add the task to the list 
        // remove the box 

    } else {
        console.log("not clicked")
        // show the box 
    }

    e.target.classList.toggle("clicked")
})

///////// HELPER FuNCTIONS  ////////

// format date
function formatDate(date) {
    return date.toLocaleString('default', {
        month: 'short'
    }) + " " + date.getDate()
}

// format duration
function formatDuration(duration) {
    return duration + "m"
}

// init
populateElements()