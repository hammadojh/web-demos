///////////////// MODEL /////////////////

let tasks_json = `[{
  "name": "Homework",
  "due": "2024-02-20",
  "duration": 60,
  "done": false,
  "id": 12345,
  "scheduled": "all_tasks",
  "timeSpent": 0,
  "playing": false
}]`;

let tasks = JSON.parse(tasks_json, function (k, v) {
  if (k == "due") {
    return new Date(v);
  }
  return v;
});

// let tasks = [
//   {
//     name: "Homework",
//     due: new Date(2024, 2, 20),
//     duration: 60,
//     done: false,
//     id: Math.floor(Math.random() * 1000),
//     scheduled: "all_tasks",
//     timeSpent: 0,
//     playing: false,
//   },
//   {
//     name: "Quiz",
//     due: new Date(2024, 2, 10),
//     duration: 120,
//     done: false,
//     id: Math.floor(Math.random() * 1000),
//     scheduled: "all_tasks",
//     timeSpent: 0,
//     playing: false,
//   },
//   {
//     name: "Gym",
//     due: new Date(2024, 2, 5),
//     duration: 30,
//     done: false,
//     id: Math.floor(Math.random() * 1000),
//     scheduled: "today",
//     timeSpent: 0,
//     playing: false,
//   },
// ];

function addTask(name, due, duration) {
  tasks.push({
    name: name,
    due: due,
    duration: duration,
    done: false,
    id: Math.floor(Math.random() * 1000),
  });
}

function deleteTasklById(id) {
  tasks = tasks.filter((task) => task.id != id);
}

function sortTasks(by) {
  switch (by) {
    case "due":
      tasks.sort((a, b) => {
        return a.due - b.due;
      });
      break;
    case "duration":
      tasks.sort((a, b) => {
        return a.duration - b.duration;
      });
      break;
  }
}

let timer = null;

//////////////////// DOM FUNCTIONS ////////////////////

// populate tasks

function populateTasks() {
  // get current radio value
  const sort_by = document.querySelector(
    'input[name="sortradio"]:checked'
  ).value;
  sortTasks(sort_by);

  //clear dom
  document.querySelectorAll(".cards").forEach((el) => {
    el.innerHTML = "";
  });

  // add tasks
  tasks.forEach((task) => {
    const div = createTaskCard(task);
    document
      .querySelector(`#${task.scheduled ?? "all_tasks"} .cards`)
      .append(div);
  });

  // add event listeners
  listenToCheckboxes();
  listenToDragAndDrop();
  listenToTimer();
}

// Add new task from form

function addNewTaskFromBox() {
  // get the name
  const name = document.querySelector("#new_task_input").value;

  if (name) {
    // get the date
    const due = document.querySelector("#date").value
      ? new Date(document.querySelector("#date").value)
      : new Date();
    const duration = document.querySelector("#duration").value
      ? document.querySelector("#duration").value
      : 60;

    console.log(name, due, duration);

    // add it to list

    const new_task = {
      name: name,
      due: due,
      duration: duration,
      done: false,
      id: Math.floor(Math.random() * 1000),
    };

    tasks.push(new_task);
    populateTasks();
  }
}

// open new task box

function openNewTaskBox() {
  console.log("open new task box");

  document.querySelector(".cards").append(createNewTaskBox("new_task_card"));

  // make it focus
  document.querySelector("#new_task_input").focus();

  // Listen for key inputs
  respondToKeyInputs();
}

// create task html

function createTaskCard(task) {
  // create element
  const task_element = `
    <div class="card p-4 shadow-sm draggable-item" draggable="true" id="${
      task.id
    }">
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
                    <button class='timer btn ${
                      task.playing ? "btn-primary" : "btn-light"
                    }'>${!task.playing ? '<i class="bi bi-play"></i>' : ""} ${
    task.timeSpent
  }s</button>
                </div>
            </div>
        </div>
    </div>
    `;

  // create node from html
  const div = document.createElement("div");
  div.innerHTML = task_element;

  // add checked
  if (task.done) {
    div.children[0].classList.add("checked");
    //check all the checkboxes
    div.children[0].querySelector("input").checked = true;
  }

  return div.children[0];
}

// new task html

function createNewTaskBox(id) {
  // create element
  const new_task_element = `
    <div id="${id}" class="card vstack gap-3 p-3 border border-3 border-primary">
        <input id="new_task_input" class="form-control border-0 fs-3" type='text' placeholder='Task name..'>
        <div class="hstack gap-3">
            <input type="date" class="form-control" id="date">
            <input type="number" class="form-control" placeholder="Duration in minutes .." id="duration" step=10>
        </div>
    </div>
    `;

  // create node from html
  const div = document.createElement("div");
  div.innerHTML = new_task_element;
  return div.children[0];
}

////////////////////// EVENT Listeners ////////////////////

// New task button

document.querySelector("#new_task_btn").addEventListener("click", (e) => {
  newTaskButtonClicked(e);
});

// chekcbox

function listenToCheckboxes() {
  document.querySelectorAll(".form-check-input").forEach((checkbox) => {
    checkbox.addEventListener("change", checkBoxChanged);
  });
}

function listenToTimer() {
  document.querySelectorAll(".card button.timer").forEach((button) => {
    button.addEventListener("click", startTimerClicked);
  });
}

// radio buttons

document.querySelectorAll(".btn-check").forEach((radio) => {
  radio.addEventListener("change", (e) => {
    sortTasks(e.target.value);
    populateTasks();
  });
});

// drag and drop

function listenToDragAndDrop() {
  // TODO: Implement
}

////////////////////// EVENT Handlers ////////////////////

// start button clicked

function startTimerClicked(e) {
  const id =
    e.target.parentElement.parentElement.parentElement.parentElement.id;

  const task = tasks.find((t) => t.id == id);

  if (!task.playing) {
    timer = setInterval(() => {
      task.timeSpent++;
      populateTasks();
    }, 1000);
  } else {
    clearInterval(timer);
    timer = null;
    populateTasks();
  }

  task.playing = !task.playing;
  populateTasks();

  // start thed timer
  // keep track of each tasks time
  // handle two states:
  // // start from zero
  // // timer is playing
}

//checkbox changed

function checkBoxChanged(e) {
  // change the model
  const id = e.target.parentElement.parentElement.id;
  const task = tasks.find((task) => task.id == id);
  task.done = e.target.checked;

  // change the view
  populateTasks();
}

// new task button clicked

function newTaskButtonClicked(e) {
  const button = e.target;

  if (button.innerText == "New Task") {
    // open new task box
    console.log("New Task");
    button.innerText = "Apply";
    openNewTaskBox();
  } else {
    // already opened
    console.log("Apply");
    button.innerText = "New Task";
    addNewTaskFromBox();
    document
      .querySelector(".cards")
      .removeChild(document.querySelector("#new_task_card"));
  }
}

// respond to keyboard

function respondToKeyInputs() {
  document.querySelector("#new_task_input").addEventListener("keyup", (e) => {
    // Enter to add
    if (e.key === "Enter") {
      document.querySelector("#new_task_btn").click();
    }

    // Escape to cancel
    if (e.key === "Escape") {
      document.querySelector("#new_task_input").value = "";
      document.querySelector("#new_task_btn").click();
    }
  });
}

////////////////////// HELPER FUNCTIONS ////////////////////

// format date
function formatDate(date) {
  return (
    date.toLocaleString("default", {
      month: "short",
    }) +
    " " +
    date.getDate()
  );
}

// format duration
function formatDuration(duration) {
  return duration + "m";
}

////////////////////// INIT ////////////////////

populateTasks();
