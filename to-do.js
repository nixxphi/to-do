const tasksContainer = document.getElementById('tasks');
const newTaskInput = document.getElementById('new-task');
const newAlarmInput = document.getElementById('new-alarm');
const taskList = document.getElementById('task-list');
const message = document.getElementById('message');
const modal = document.getElementById('modal');
const allTasksList = document.getElementById('all-tasks');

let tasks = [];

function addTask() {
  const taskText = newTaskInput.value.trim();
  const alarmTime = newAlarmInput.value.trim();
  if (taskText !== '') {
    const task = {
      id: Date.now(),
      text: taskText,
      alarm: alarmTime,
    };
    tasks.push(task);
    renderTask(task);
    newTaskInput.value = '';
    newAlarmInput.value = '';
    message.innerText = 'One more thing to do...';
    setTimeout(() => {
      message.innerText = '';
    }, 2000);
    addToTaskList(taskText);
    if (alarmTime) {
      const time = new Date(alarmTime);
      setTimeout(() => {
        alert('Time\'s up. I hope you made it.');
      }, time - Date.now());
    }
  }
}

function renderTask(task) {
  const taskElement = document.createElement('div');
  taskElement.className = 'task';
  taskElement.innerHTML = `
    <input type="checkbox" id="chk-${task.id}">
    <label for="chk-${task.id}">${task.text}</label>
    ${task.alarm ? `<input type="time" value="${task.alarm}">` : ''}
    <button onclick="deleteTask(${task.id})">Delete</button>
    <button onclick="editTask(${task.id})">Edit</button>
  `;
  tasksContainer.appendChild(taskElement);
}

function editTask(id) {
  const task = tasks.find(task => task.id === id);
  if (task) {
    const label = document.querySelector(`label[for="chk-${id}"]`);
    label.contentEditable = !label.contentEditable;
  }
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  const taskElement = document.getElementById(`chk-${id}`).parentElement;
  taskElement.remove();
  const task = tasks.find(task => task.id === id);
  if (task) {
    removeFromTaskList(task.text);
  }
}

function addToTaskList(taskText) {
  const listItem = document.createElement('li');
  listItem.innerText = taskText;
  taskList.appendChild(listItem);
  const allTasksItem = document.createElement('li');
  allTasksItem.innerText = taskText;
  allTasksList.appendChild(allTasksItem);
}

function removeFromTaskList(taskText) {
  const items = taskList.getElementsByTagName('li');
  for (let i = 0; i < items.length; i++) {
    if (items[i].innerText === taskText) {
      items[i].remove();
      break;
    }
  }
  const allItems = allTasksList.getElementsByTagName('li');
  for (let i = 0; i < allItems.length; i++) {
    if (allItems[t].innerText === taskText) {
      allItems[t].remove();
      break;
    }
  }
}

function viewAllTasks() {
  allTasksList.innerHTML = '';
  tasks.forEach(task => {
    const listItem = document.createElement('li');
    listItem.innerText = task.text;
    allTasksList.appendChild(listItem);
  });
  modal.style.display = 'block';
}

function hideModal() {
  modal.style.display = 'none';
}
