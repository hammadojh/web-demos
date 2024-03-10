// models

function Task(name, due, duration) {
  this.name = name;
  this.due = due;
  this.duration = duration;
}

let tasks = [
  new Task("SWE 363 HW", new Date(2024, 1, 12), 20),
  new Task("Do something else", new Date(2024, 1, 12), 20),
];

let newTaskButtonClicked = function (e) {
  if (e.target.classList.contains("clicked")) {
    addNewTaskHTML(e);
  } else {
    e.target.classList.add("clicked");
    const newTaskBox = createNewTaskBox();
    document.querySelector(".cards").appendChild(newTaskBox);
    // listen to keyboard events
    document.querySelector("#new_task_input").addEventListener("keyup", (e) => {
      if (e.key == "Enter") {
        addNewTaskHTML(e);
      } else if (e.key == "Escape") {
        document.querySelector("#new_task_input").value = "";
        addNewTaskHTML(e);
      }
    });
  }
};

function addNewTaskHTML(e) {
  e.target.classList.remove("clicked");
  // add the task
  addTaskFromBox();
  // remove
  document
    .querySelector(".cards")
    .removeChild(document.querySelector("#task_box"));
}

function addTaskFromBox() {
  // task information
  const task_name = document.querySelector("#new_task_input").value;
  if (task_name == "") {
    return;
  }
  const dueValue = document.querySelector("#dueinput").value;
  const due = dueValue ? new Date(dueValue) : new Date();
  const durationValue = document.querySelector("#durationinput").value;
  const duration = durationValue == "" ? 60 : durationValue;
  const new_task = new Task(task_name, due, duration);
  tasks.push(new_task);
  populateTasks();
}

document
  .querySelector("#new_task_btn")
  .addEventListener("click", newTaskButtonClicked);

function createTaskCard(task) {
  const htmlString = `
    <div class="card p-4 shadow-sm" id="0">
        <div class="hstack gap-4 align-items-center">
            <input type="checkbox" class="form-check-input p-3">
            <div>
                <h3 class="fw-bold">${task.name}</h3>
                <div class="hstack gap-3">
                    <h5><i class="bi bi-calendar3"></i> ${formatDate(
                      task.due
                    )}</h5>
                    <h5><i class="bi bi-clock"></i> ${formatDuration(
                      task.duration
                    )}</h5>
                </div>
            </div>
        </div>
    </div>
    `;
  const div = document.createElement("div");
  div.innerHTML = htmlString;
  return div.children[0];
}

function createNewTaskBox() {
  const htmlString = `
    <div id="task_box" class="card vstack gap-3 p-3 border border-3 border-primary">
        <input id="new_task_input" class="form-control border-0 fs-3" type='text'
            placeholder='Task name..'>
        <div class="hstack gap-3">
            <input type="date" class="btn btn-light" id="dueinput">
            <input type="number" steps="10" class="btn btn-light" id="durationinput">
        </div>
    </div>
    `;
  const div = document.createElement("div");
  div.innerHTML = htmlString;
  return div.children[0];
}

function formatDate(date) {
  const options = { month: "short" };
  const month = new Intl.DateTimeFormat("en-US", options).format(date);
  const day = date.getDate();
  return month + ", " + day;
}

let formatDuration = (duration) => {
  return duration + "m";
};

function populateTasks() {
  document.querySelector(".cards").innerHTML = "";
  tasks.forEach((task, i) => {
    // creat an html element
    const taskElement = createTaskCard(task);

    // get the parent object from the doc
    document.querySelector(".cards").append(taskElement);
  });
}

populateTasks();

// Steps
// format date
// check card
