let taskInput = document.getElementById('taskInput');
let addItemButton = document.getElementById('addItem');
let taskList = document.getElementById('taskList');

let todoList = [];

function addTask() {
  let taskName = taskInput.value.trim();
  if (taskName !== '') {
    let task = {
      id: Date.now(),
      name: taskName.charAt(0).toUpperCase() + taskName.slice(1),
      createdDate: new Date(),
      completed: false
    };
    todoList.push(task);
    renderTasks();
    taskInput.value = '';
    saveTodoList();
  }
}

function removeTask(id) {
  let taskIndex = todoList.findIndex(item => item.id === id);
  if (taskIndex !== -1) {
    todoList.splice(taskIndex, 1);
    renderTasks();
    saveTodoList();
  }
}

function renderTasks() {
  taskList.innerHTML = '';
  todoList.forEach(task => {
    let listItem = document.createElement('li');
    listItem.textContent = task.name;
    if (task.completed) {
      listItem.classList.add('completed');
    }
    let closeButton = document.createElement('span');
    closeButton.classList.add('close');
    closeButton.textContent = 'remove';
    closeButton.addEventListener('click', () => removeTask(task.id));
    listItem.appendChild(closeButton);
    listItem.addEventListener('click', () => toggleTaskComplete(task.id));
    taskList.appendChild(listItem);
  });
}

function toggleTaskComplete(id) {
  let task = todoList.find(item => item.id === id);
  if (task) {
    task.completed = !task.completed;
    renderTasks();
    saveTodoList();
  }
}

function sortTasksAlphabetically() {
  todoList.sort((a, b) => a.name.localeCompare(b.name));
  renderTasks();
  saveTodoList();
}

function saveTodoList() {
  localStorage.setItem('todoList', JSON.stringify(todoList));
}

function loadTodoList() {
  let savedTodoList = localStorage.getItem('todoList');
  if (savedTodoList) {
    todoList = JSON.parse(savedTodoList);
    renderTasks();
  }
}

addItemButton.addEventListener('click', addTask);
let sortButton = document.getElementById('sortButton');
sortButton.addEventListener('click', sortTasksAlphabetically);
loadTodoList();

