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
  const label = element.previousElementSibling;
  label.contentEditable = !label.contentEditable;
}

function addToTaskList(taskText) {
  const listItem = document.createElement('li');
  listItem.innerText = taskText;
  taskList.appendChild(listItem);
}

function removeFromTaskList(taskText) {
  const items = taskList.getElementsByTagName('li');
  for (let i = 0; i
