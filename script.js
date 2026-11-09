
// take  the elements from the page (getElementById)
const form = document.getElementById("task-form");
const titleInput = document.getElementById("task-title");
const priorityInput = document.getElementById("task-priority");
const taskList = document.getElementById("task-list");

// array store up the tasks
// Each one would look like: { title: "Study", priority: "high", completed: false }
// load saved tasks from localStorage. localStorage only stores text,
// so the JSON.parse thing turns the saved text back into an array tuff
let tasks = JSON.parse(localStorage.getItem("tasks"));
if (tasks == null) {
  tasks = []; // nothing there yet starting it empty
}

// Save the tasks
// JSON.stringify turns the array into text so localStorage can store it
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// show all the tasks on the page
function showTasks() {
  let html = ""; // make the html as text, then put it in the page

  for (let i = 0; i < tasks.length; i++) {
    let classes = "task-item " + tasks[i].priority; // like "task-item high" or something
  let buttonText = "Done";

    if (tasks[i].completed) {
  classes = classes + " completed"; // adds the strikethrough from the css that the assignment come with
    buttonText = "Undo";
    }

    html = html +
      '<div class="' + classes + '">' +
        "<span>" + tasks[i].title + "</span>" +
        '<div class="task-actions">' +
          '<button class="toggle-btn" onclick="toggleTask(' + i + ')">' + buttonText + "</button>" +
          '<button class="delete-btn" onclick="deleteTask(' + i + ')">Delete</button>' +
        "</div>" +
      "</div>";
  }

  taskList.innerHTML = html; // actually display it now with innerhtml
}

// make the task done / not done
function toggleTask(i) {
  if (tasks[i].completed) {
    tasks[i].completed = false;
} else {
  tasks[i].completed = true;}

  saveTasks();
showTasks();


}

// delete a task the splice would removee 1 item at i)
function deleteTask(i) {
tasks.splice(i, 1);
saveTasks();
showTasks();
}

// event, when the form is submitted, add a new task
form.addEventListener("submit", function (event) {
  event.preventDefault(); // this stop the page from reloading

  // make a new object and add it to the array
  let newTask = {
  title: titleInput.value,
    priority: priorityInput.value,
    completed: false
  };
  tasks.push(newTask);

saveTasks();
showTasks();
  form.reset(); // clear the form
});

// make any saved talks show up when page loads
showTasks();
