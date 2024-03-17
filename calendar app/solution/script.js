///////////////// MODEL /////////////////

let tasks_json = `[
  {
    "name": "Homework",
    "due": "2024-02-12",
    "duration": 60,
    "done": false,
    "_id": 123,
    "playing":false,
    "scheduled": "all_tasks",
    "timer": 0,
    "timeSpent":0
  }
]`;

let tasks = JSON.parse(tasks_json, function (k, v) {
  if (k == "due") {
    return new Date(v);
  }
  return v;
});

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

  // track errors 
  let error = false;
  let message = "";

  // get values
  const name = document.querySelector("#new_task_input").value;

  // empty name
  if (!name) {
    document
      .querySelector(".cards")
      .removeChild(document.querySelector("#new_task_card"));
    return true;
  }

  // check for special characters
  // re = /^[\w\s]+$/;
  // if (!re.test(name)) {
  //   error = true;
  //   message = "Name cannot contain special characters..";
  // }

  const duration = document.querySelector("#duration").value
    ? document.querySelector("#duration").value
    : 60;

  // duration error
  if (duration < 0) {
    error = true;
    message = "Duration cannot be negative..";
  }

  const due = document.querySelector("#date").value
    ? new Date(document.querySelector("#date").value)
    : new Date();

  // check if date is in the past
  if (due < new Date()) {
    error = true;
    message = "Due date cannot be in the past..";
  }

  if (error) {
    document.querySelector(".error-text").textContent = message;
    return false;
  } else {
    // remove the box
    document
      .querySelector(".cards")
      .removeChild(document.querySelector("#new_task_card"));

    // add new task
    const new_task = {
      name: name,
      due: due,
      duration: duration,
      done: false,
      id: Math.floor(Math.random() * 1000),
      playing: false,
      scheduled: "all_tasks",
      timer: 0,
      timeSpent: 0
    };

    tasks.push(new_task);
    populateTasks();
  }

  return !error;
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
    <div class="card p-4 shadow-sm draggable-item" draggable="true" id="${task._id
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
                    <button class='timer btn ${task.playing ? "btn-primary" : "btn-light"
    }'>${!task.playing ? '<i class="bi bi-play"></i>' : ""} ${task.timeSpent
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
        <h5 class="error-text text-danger"></h5>
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

window.addEventListener('load', function (event) {
  fetch("http://localhost:3010/tasks")
    .then((response) => { return response.text() })
    .then((data) => {
      let t = JSON.parse(data, function (k, v) {
        if (k == "due") {
          return new Date(v);
        }
        return v;
      });
      tasks = t;
      populateTasks();
      console.log(data)
    })
    .catch((error) => {
      console.log(error)
    })
});

// window.addEventListener('load', async (event) => {
//   let response = await fetch("http://localhost:3010/tasks");
//   let data = await response.text();
//   try {
//     tasks = JSON.parse(data, function (k, v) {
//       if (k == "due") {
//         return new Date(v);
//       }
//       return v;
//     });
//     populateTasks();
//   }catch(e){
//     console.log(e)
//   }
// });

// closing the window

// window.addEventListener('beforeunload', function (event) {
//   // if the form is open save the form information
//   if (adding) {
//     localStorage.setItem("new_task_input", document.querySelector("#new_task_input").value);
//     localStorage.setItem("date", document.querySelector("#date").value);
//     localStorage.setItem("duration", document.querySelector("#duration").value);
//     localStorage.setItem("adding", "true");
//   }
// });

// load the form information

// window.addEventListener('load', function (event) {
//   if (localStorage.getItem("adding") == "true") {
//     openNewTaskBox();
//     document.querySelector("#new_task_input").value = localStorage.getItem("new_task_input");
//     document.querySelector("#date").value = localStorage.getItem("date");
//     document.querySelector("#duration").value = localStorage.getItem("duration");
//     adding = true;
//   }
// });


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
  let draggableItems = document.querySelectorAll(".draggable-item");
  let dropZones = document.querySelectorAll(".dropZone");
  let draggedItem;

  // Add drag event listener to draggable items
  draggableItems.forEach((item) => {
    item.addEventListener("drag", function (e) {
      draggedItem = e.target;
    });
  });

  // Add dragover event listener to drop zone
  dropZones.forEach((zone) => {
    zone.addEventListener("dragover", function (e) {
      e.preventDefault();
      e.currentTarget.parentElement.classList.add("dropover");
    });
  });

  // Add dragover event listener to drop zone
  dropZones.forEach((zone) => {
    zone.addEventListener("dragleave", function (e) {
      e.preventDefault();
      e.currentTarget.parentElement.classList.remove("dropover");
    });
  });

  // Add drop event listener to drop zone
  dropZones.forEach((zone) => {
    zone.addEventListener("drop", function (e) {
      const task = tasks.find((task) => task.id == draggedItem.id);
      task.scheduled = zone.parentElement.id;
      console.log(task.scheduled);
      e.currentTarget.parentElement.classList.remove("dropover");
      draggedItem = null;
      populateTasks();
    });
  });
}

////////////////////// EVENT Handlers ////////////////////

// start button clicked

function startTimerClicked(e) {
  let task = tasks.find(
    (t) =>
      t._id ==
      e.target.parentElement.parentElement.parentElement.parentElement.id
  );

  if (task.playing) {
    //pause
    e.target.classList.remove("playing");
    clearInterval(timer);
    timer = null;
    task.playing = false;
    populateTasks();
  } else {
    //start
    e.target.classList.add("playing");
    populateTasks();
    task.playing = true;
    timer = setInterval(() => {
      task.timeSpent++;
      populateTasks();
    }, 1000);
  }
}

//checkbox changed

function checkBoxChanged(e) {
  // change the model
  const id = e.target.parentElement.parentElement.id;
  const task = tasks.find((task) => task._id == id);
  task.done = e.target.checked;

  // change the view
  populateTasks();
}

// new task button clicked

let adding = false;
function newTaskButtonClicked(e) {
  const button = e.target;
  if (!adding) {
    // open new task box
    adding = true;
    button.textContent = "Apply";
    openNewTaskBox();
  } else {
    // already opened
    let added = addNewTaskFromBox();
    if (added) {
      button.textContent = "New Task";
      adding = false;
      localStorage.setItem("adding", adding);
    }
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
