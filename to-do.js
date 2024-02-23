const tasksContainer = document.getElementById('task-list');
const newTaskInput = document.getElementById('new-task');
const newAlarmInput = document.getElementById('new-alarm');
const clockElement = document.getElementById('clock');

let tasks = [];

function addTask() {
  const taskName = newTaskInput.value.trim();
  const alarmTime = newAlarmInput.value.trim();
  if (taskName !== '') {
    const task = {
      id: Date.now(),
      name: taskName,
      alarm: alarmTime ? alarmTime : null,
    };
    tasks.push(task);
    newTaskInput.value = '';
    newAlarmInput.value = '';
    message.innerText = '';
    renderTask(task);
  }
}

function renderTask(task) {
  const taskElement = document.createElement('div');
  taskElement.className = 'task';
  taskElement.id = `task-${task.id}`;
  taskElement.innerHTML = `
    <label for="chk-${task.id}">${task.name} | ${task.alarm}</label>
    <div class="floating-menu">
      <button onclick="editTask(${task.id})">[...]</button>
      <button onclick="deleteTask(${task.id})">[.x.]</button>
    </div>
  `;
  tasksContainer.appendChild(taskElement);
}

function editTask(id) {
  const task = tasks.find(task => task.id === id);
  if (task) {
    const newName = prompt('Enter new task name:', task.name);
    if (newName) {
      task.name = newName;
      const label = document.querySelector(`label[for="chk-${id}"]`);
      label.innerText = `${task.name} | ${task.alarm}`;
    }
    const newTime = prompt('Enter new alarm time (HH:MM):', task.alarm || '');
    if (newTime) {
      const [hours, minutes] = newTime.split(':');
      const date = new Date();
      date.setHours(hours);
      date.setMinutes(minutes);
      task.alarm = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const label = document.querySelector(`label[for="chk-${id}"]`);
      label.innerText = `${task.name} | ${task.alarm}`;
    }
  }
}

function deleteTask(id) {
  const taskElement = document.getElementById(`task-${id}`);
  taskElement.remove();
  tasks = tasks.filter(task => task.id !== id);
}

function updateClock() {
  const date = new Date();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  const time = `${hours}:${minutes}:${seconds}`;
  clockElement.innerText = time;
}

updateClock();
setInterval(updateClock, 1000);
