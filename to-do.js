const tasksContainer = document.getElementById('tasks');
const newTaskInput = document.getElementById('new-task');
const newAlarmInput = document.getElementById('new-alarm');

function addTask() {
  const myTask = newTaskInput.value.trim();
  const alarmTime = newAlarmInput.value.trim();
  if (myTask !== '') {
    const task = document.createElement('div');
    task.className = 'task';
    task.innerHTML = `
      <input type="checkbox" id="chk-${Date.now()}">
      <label for="chk-${Date.now()}">${myTask}</label>
      <input type="time" value="${alarmTime}">
      <button onclick="deleteTask(this)">Delete</button>
    `;
    tasksContainer.appendChild(task);
    newTaskInput.value = '';
    newAlarmInput.value = '';
  }
}

function deleteTask(element) {
  element.parentElement.remove();
}

function updateTask(element) {
  const label = element.previousElementSibling;
  const alarm = element.nextElementSibling;
  label.contentEditable = !label.contentEditable;
  alarm.disabled = !alarm.disabled;
}

setInterval(() => {
  const now = new Date();
  const currentTime = now.getHours() + ':' + now.getMinutes();
  const tasks = document.querySelectorAll('.task');
  tasks.forEach(task => {
    const alarmTime = task.querySelector('input[type="time"]').value;
    if (alarmTime === currentTime) {
      alert('Alarm: ' + task.querySelector('label').innerText);
    }
  });
}, 60000); //I was gonna stop at creating a to-do list but leaving out the alarm felt incomplete

