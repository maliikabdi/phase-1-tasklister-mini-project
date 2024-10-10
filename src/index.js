document.addEventListener("DOMContentLoaded", () => {
  const taskForm = document.querySelector("#create-task-form");
  const taskList = document.querySelector("#tasks");
  const sortButton = document.querySelector("#sort-tasks");
  let tasks = [];

  // Create a new task
  taskForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get values
    const taskDescription = document.querySelector("#new-task-description").value;
    const priority = document.querySelector("#priority").value;
    const user = document.querySelector("#user").value;
    const duration = document.querySelector("#duration").value;
    const dueDate = document.querySelector("#due-date").value;

    const task = {
      description: taskDescription,
      priority: priority,
      user: user,
      duration: duration,
      dueDate: dueDate
    };

    // Add task to array
    tasks.push(task);

    // Render tasks
    renderTasks(tasks);

    // Clear the form
    taskForm.reset();
  });

  // Render tasks to the DOM
  function renderTasks(taskArray) {
    taskList.innerHTML = "";
    taskArray.forEach((task, index) => {
      const taskItem = document.createElement("li");
      taskItem.classList.add(task.priority);

      // Task description, user, duration, and due date
      taskItem.innerHTML = `
        <span>${task.description} (User: ${task.user}, Duration: ${task.duration}hrs, Due: ${task.dueDate})</span>
        <button class="edit-task" data-index="${index}">Edit</button>
        <button class="delete-task" data-index="${index}">Delete</button>
      `;

      taskList.appendChild(taskItem);
    });

    addDeleteFunctionality();
    addEditFunctionality();
  }

  // Delete task
  function addDeleteFunctionality() {
    document.querySelectorAll(".delete-task").forEach(button => {
      button.addEventListener("click", (e) => {
        const index = e.target.dataset.index;
        tasks.splice(index, 1);
        renderTasks(tasks);
      });
    });
  }

  // Edit task
  function addEditFunctionality() {
    document.querySelectorAll(".edit-task").forEach(button => {
      button.addEventListener("click", (e) => {
        const index = e.target.dataset.index;
        const task = tasks[index];

        // Populate form with task details for editing
        document.querySelector("#new-task-description").value = task.description;
        document.querySelector("#priority").value = task.priority;
        document.querySelector("#user").value = task.user;
        document.querySelector("#duration").value = task.duration;
        document.querySelector("#due-date").value = task.dueDate;

        // Remove task from the list before editing
        tasks.splice(index, 1);
        renderTasks(tasks);
      });
    });
  }

  // Sort tasks by priority
  sortButton.addEventListener("click", () => {
    tasks.sort((a, b) => {
      const priorityLevels = { low: 1, medium: 2, high: 3 };
      return priorityLevels[b.priority] - priorityLevels[a.priority];
    });
    renderTasks(tasks);
  });
});
