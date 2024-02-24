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
    
    // I'm gonna try to make it play a sound when the alarm time is up
    if (task.alarm) {
      const alarmTimeMs = new Date(task.alarm).getTime();
      const currentTimeMs = new Date().getTime();
      const timeDifferenceMs = alarmTimeMs - currentTimeMs;
      
      if (timeDifferenceMs > 0) {
        setTimeout(() => {
          document.getElementById('alarmSound').play();
        }, timeDifferenceMs);
      }
    }
  }
}
document.getElementById('new-task').addEventListener('keyup', function(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    addTask();
  }
});



function renderTask(task) {
  const taskElement = document.createElement('div');
  taskElement.className = 'task';
  taskElement.id = `task-${task.id}`;
  taskElement.innerHTML = `
    <label for="chk-${task.id}">${task.name} | ${task.alarm}</label>
    <div class="floating-menu">
      <button onclick="editTask(${task.id})">[...]</button>
      <button onclick="deleteTask(${task.id})">[.x.]</button>
      <button onclick="completedTask(${task.id})">&#x2713;</button>

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
  taskElement.style.textDecoration = 'line-through';
  setTimeout(() => {
    taskElement.remove();
    tasks = tasks.filter(task => task.id !== id);
  }, 500);
}

function completedTask(id) {
  const taskElement = document.getElementById(`task-${id}`);
  if (taskElement) {
    const label = taskElement.querySelector('label');
    label.style.color = 'green';
    label.style.textDecoration = 'line-through';
  }
}


function checkAlarms() {
  const now = new Date();
  tasks.forEach(task => {
    if (task.alarm && new Date(task.alarm) <= now) {
      const audioElement = document.getElementById('alarmSound');
      audioElement.play();
      alert(`Time for task: ${task.name}`);
      deleteTask(task.id);
    }
  });
}

function updateClock() {
  const date = new Date();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  const time = `${hours}:${minutes}:${seconds}`;
  document.getElementById('clock').innerText = time;
}


updateClock();
setInterval(() => {
  updateClock();
}, 1000);

 //after putting in the defunct alarm(couldn't get it to make a sound), i realized this could use a clock.
 //I'm just goofing off at this point
  
