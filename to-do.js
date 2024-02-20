const tasksContainer = document.getElementById('tasks');
const newTaskInput = document.getElementById('new-task');
const newAlarmInput = document.getElementById('new-alarm');
const taskList = document.getElementById('task-list');
const message = document.getElementById('message');
const modal = document.getElementById('modal');
const allTasksList = document.getElementById('all-tasks');

let tasks = [];

function addTask() {
  const taskName = newTaskInput.value.trim();
  const alarmTime = newAlarmInput.value.trim();
  if (taskName !== '') {
    const task = {
      id: Date.now(),
      name: taskName,
      alarm: alarmTime ? new Date(alarmTime) : null,
    };
    tasks.push(task);
    newTaskInput.value = '';
    newAlarmInput.value = '';
    message.innerText = 'One more thing to do...';
    setTimeout(() => {
      message.innerText = '';
    }, 2000);
    addToTaskList(taskName);
    if (task.alarm && task.alarm < new Date()) {
      const time = task.alarm;
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
    <label for="chk-${task.id}">${task.name}</label>
    ${task.alarm ? `<input type="time" value="${get24HourFormat(task.alarm)}" disabled>` : ''}
  `;
  taskElement.addEventListener('click', function(event) {
    event.stopPropagation();
    const selectedTask = tasks.find(t => t.id === task.id);
    document.getElementById('modal-task-name').innerText = selectedTask.name;
    document.getElementById('modal-task-time').innerText = selectedTask.alarm ? get24HourFormat(selectedTask.alarm) : 'No Alarm Set';
    document.getElementById('modal-edit-button').addEventListener('click', function() {
      editTask(task.id);
      hideModal();
    });
    document.getElementById('modal-delete-button').addEventListener('click', function() {
      deleteTask(task.id);
      hideModal();
    });
    modal.style.display = 'block';
  });
  tasksContainer.appendChild(taskElement);
}

function get24HourFormat(date) {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
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
    removeFromTaskList(task.name);
  }
}

function addToTaskList(taskName) {
  taskList.innerHTML = tasks.map(task => `<li>${task.name}</li>`).join('');
  allTasksList.innerHTML = tasks.map(task => `<li>${task.name}</li>`).join('');
}

function removeFromTaskList(taskName) {
  const items = taskList.getElementsByTagName('li');
  for (let i = 0; i < items.length; i++) {
    if (items[i].innerText === taskName) {
      items[i].remove();
      break;
    }
  }
  const allItems = allTasksList.getElementsByTagName('li');
  for (let i = 0; i < allItems.length; i++) {
    if (allItems[i].innerText === taskName) {
      allItems[i].remove();
      break;
    }
  }
}

function viewAllTasks() {
  tasksContainer.innerHTML = '';
  tasks.forEach(task => renderTask(task));
  modal.style.display = 'block';
}

function hideModal() {
  modal.style.display = 'none';
}

const clockElement = document.getElementById('clock');

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
