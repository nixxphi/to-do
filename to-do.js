const tasksContainer = document.getElementById('tasks');
const newTaskInput = document.getElementById('new-task');
const newAlarmInput = document.getElementById('new-alarm');
const taskList = document.getElementById('task-list');
const message = document.getElementById('message');

function addTask() {
  const taskText = newTaskInput.value.trim();
  const alarmTime = newAlarmInput.value.trim();
  if (taskText !== '') {
    const task = document.createElement('div');
    task.className = 'task';
    task.innerHTML = `
      <input type="checkbox" id="chk-${Date.now()}">
      <label for="chk-${Date.now()}">${taskText}</label>
      ${alarmTime ? `<input type="time" value="${alarmTime}">` : ''}
      <button onclick="deleteTask(this)">Delete</button>
      <button onclick="editTask(this)">Edit</button>
    `;
    tasksContainer.appendChild(task);
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

function deleteTask(element) {
  element.parentElement.remove();
  const taskText = element.previousElementSibling.innerText;
  removeFromTaskList(taskText);
}

function editTask(element) {
  const taskText = element.previousElementSibling.previousElementSibling.innerText;
  const newTaskText = prompt('Edit task:', taskText);
  if (newTaskText !== null && newTaskText !== '') {
    element.previousElementSibling.previousElementSibling.innerText = newTaskText;
    updateTaskList(taskText, newTaskText);
  }
}

function addToTaskList(taskText) {
  const listItem = document.createElement('li');
  listItem.innerText = taskText;
  taskList.appendChild(listItem);
}

function removeFromTaskList(taskText) {
  const items = taskList.getElementsByTagName('li');
  for (let i = 0; i < items.length; i++) {
    if (items[i].innerText === taskText) {
      items[i].remove();
      break;
    }
  }
}

function updateTaskList(oldTaskText, newTaskText) {
  const items = taskList.getElementsByTagName('li');
  for (let i = 0; i < items.length; i++) {
    if (items[i].innerText === oldTaskText) {
      items[i].innerText = newTaskText;
      break;
    }
  }
}

function viewAllTasks() {
  const tasks = document.querySelectorAll('.task');
  const taskListItems = document.querySelectorAll('#task-list li');
  if (tasks.length === 0) {
    alert('No tasks to display.');
  } else {
    const allTasks = Array.from(taskListItems).map(li => li.innerText);
    alert('All tasks:\n' + allTasks.join('\n'));
  }
}
