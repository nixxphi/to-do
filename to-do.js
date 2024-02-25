const tasksContainer = document.getElementById('task-list');
const newTaskInput = document.getElementById('new-task');
const newAlarmInput = document.getElementById('new-alarm');
const clockElement = document.getElementById('clock');

let tasks = [];

function addTask() {
  const taskName = newTaskInput.value.trim();
  const alarmTime = newAlarmInput.value.trim();

  // Check if the alarm time is empty or not
  let alarm = null;
  if (alarmTime) {
    // Get current date
    const currentDate = new Date();
    // This splits alarm time by ':' and converts the string to numbers
    const [hours, minutes] = alarmTime.split(':').map(Number);
    // Sets current date's hours and minutes to those of the alarm time
    currentDate.setHours(hours);
    currentDate.setMinutes(minutes);
    //This stores the alarm time as a Date object. I found this step necessary because the alarm wouldn't work and it finally occurred to me I hadn't stored it as a date.
    alarm = currentDate;
  }

  if (taskName !== '') {
    const task = {
      id: Date.now(),
      name: taskName,
      alarm: alarm, 
    };

    tasks.push(task);
    newTaskInput.value = '';
    newAlarmInput.value = '';
    message.innerText = '';

    renderTask(task);
  }
}

// I'm gonna try to make it play a sound when the alarm time is up
function checkAlarms() {
  const now = new Date();
  tasks.forEach(task => {
    if (task.alarm && task.alarm <= now) {
      const audioElement = document.getElementById('alarmSound');
      audioElement.play();
      alert(`It's time to ${task.name}`);
      completedTask(task.id);
    }
  });
}


setInterval(checkAlarms, 1000);

function activateAlarm(task) {
  if (task) {
    if (task.alarm) {
      const alarmTime = new Date(task.alarm);
      const intervalId = setInterval(() => {
        const currentTime = new Date();
        if (currentTime >= alarmTime) {
          clearInterval(intervalId); 
          const alarmSound = document.getElementById('alarmSound');
          const slideUpVideo = document.getElementById('slideUpVideo');

          if (alarmSound && alarmSound.paused) {
            alarmSound.play();
          } else if (slideUpVideo) {
            slideUpVideo.classList.add('show');
            setTimeout(() => {
              slideUpVideo.classList.add('dismissed');
            }, 10000);
          } else {
            console.log('Alarm sound element not found.');
          }
        }
      }, 1000); // Checks every second for the alarm time
    } else {
      console.log('No alarm set.');
    }
  } else {
    console.log('No task... I\'m not sure how you got here. Teach me your magic, cuz i know my addTask function doesn\'t work for blanks. Trim() specifically gets rid of white space at the start and end of the string. Might as well comment this out, or... maybe not.');
  }
}


document.getElementById('new-task').addEventListener('keyup', function(event) {
  //I almost forgot to make the enter button work for me.
  if (event.key === 'Enter') {
    event.preventDefault();
    addTask();
  }
});
//This puts the task list on the page.
function renderTask(task) {
  const taskElement = document.createElement('div');
  taskElement.className = 'task';
  taskElement.id = `task-${task.id}`;
  let alarmString = '';
  if (task.alarm instanceof Date) {
    alarmString = task.alarm.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: true});
  } else if (task.alarm) {
    alarmString = task.alarm; // Display the alarm string as it is
  }
  taskElement.innerHTML = `
    <label for="chk-${task.id}">${task.name} | ${alarmString}</label>
    <div class="floating-menu">
      <button onclick="editTask(${task.id})">Edit</button>
      <button onclick="deleteTask(${task.id})">x</button>
      <button onclick="completedTask(${task.id})">&#x2713;</button>
    </div>
  `;
  //My brother recommended an undo button, made sense.
  if (task.completed) {
    taskElement.innerHTML += `
      <button onclick="undoCompletedTask(${task.id})">Undo</button>
    `;//Thank God for back ticks 
  }
  
  tasksContainer.appendChild(taskElement);
}



function completedTask(id) {
  const taskElement = document.getElementById(`task-${id}`);
  if (taskElement) {
    const label = taskElement.querySelector('label');
    label.style.color = 'green';
    label.style.textDecoration = 'line-through';
    
    const floatingMenu = taskElement.querySelector('.floating-menu');
    floatingMenu.innerHTML += `
      <button onclick="undoCompletedTask(${id})">Undo</button>
    `;
  }
}

function undoCompletedTask(id) {
  const taskElement = document.getElementById(`task-${id}`);
  if (taskElement) {
    const label = taskElement.querySelector('label');
    label.style.color = '';
    label.style.textDecoration = '';
    
    const floatingMenu = taskElement.querySelector('.floating-menu');
    const undoButton = floatingMenu.querySelector('button:last-child');
    if (undoButton) {
      floatingMenu.removeChild(undoButton);//I made the mistake of going with removeSibling for a while... So embarassing.
    }
  }
}

function editTask(id) {
  //funny how this function wehn through easiest. 
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
  
 function updateMessage() {
  const quotes = [
    "The only way to do great work is to love what you do. – Steve Jobs",
    "With the new day comes new strength and new thoughts. – Eleanor Roosevelt",
    "The secret of getting ahead is getting started. – Mark Twain",
    "Don't watch the clock; do what it does. Keep going. – Sam Levenson",
    "We're alcohol's problem. – Somtuzy",
    "Learnable is Fun... but the shege is real. – Nixx"
  ];

  const randomIndex = Math.floor(Math.random() * quotes.length);
  message.innerText = quotes[randomIndex];
}
