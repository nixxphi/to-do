class Task {
    constructor(id, name, alarm) {
        this.id = id;
        this.name = name;
        this.alarm = alarm;
    }

    render() {
        const taskElement = document.createElement('div');
        taskElement.className = 'task';
        taskElement.innerHTML = `
            <label for="chk-${this.id}">${this.name}</label>
            ${this.alarm ? `<input type="time" value="${this.get24HourFormat(this.alarm)}" disabled>` : ''}
            <div class="floating-menu">
                <button onclick="editTask(${this.id})">[...]</button>
                <button onclick="deleteTask(${this.id})">Delete</button>
            </div>
            <div class="countdown-timer"></div>
        `;
        taskList.appendChild(taskElement);

        // Including countdown timer because an alarm was being a b**ch
        if (this.alarm) {
            const countdownTimerElement = taskElement.querySelector('.countdown-timer');
            const countdownInterval = setInterval(() => {
                const timeLeft = Math.floor((this.alarm - Date.now()) / 1000);
                if (timeLeft <= 0) {
                    clearInterval(countdownInterval);
                    countdownTimerElement.innerText = 'Time\'s up!';
                } else {
                    const hoursLeft = Math.floor(timeLeft / 3600);
                    const minutesLeft = Math.floor((timeLeft % 3600) / 60);
                    const secondsLeft = timeLeft % 60;
                    countdownTimerElement.innerText = `${hoursLeft}:${minutesLeft}:${secondsLeft}`;
                }
            }, 1000);
        }
    }

    get24HourFormat() {
        if (!this.alarm) {
            return '';
        }
        const hours = String(this.alarm.getHours()).padStart(2, '0');
        const minutes = String(this.alarm.getMinutes()).padStart(2, '0');
        return `${hours}:${minutes}`;
    }
    
    edit() {
        const newName = prompt('Enter new task name:', this.name);
        if (newName) {
            this.name = newName;
            const label = document.querySelector(`label[for="chk-${this.id}"]`);
            label.innerText = newName;
        }
        const newTime = prompt('Enter new alarm time:', this.get24HourFormat(this.alarm));
        if (newTime) {
            this.alarm = new Date(newTime);
            const timeInput = document.querySelector(`input[type="time"][value="${this.get24HourFormat(this.alarm)}"]`);
            timeInput.value = this.get24HourFormat(this.alarm);
        }
    }
}

const taskList = document.getElementById('task-list');
const newTaskInput = document.getElementById('new-task');
const newAlarmInput = document.getElementById('new-alarm');
const clockElement = document.getElementById('clock');
let tasks = [];

function addTask() {
    const taskName = newTaskInput.value.trim();
    const alarmTime = newAlarmInput.value.trim();
    if (taskName !== '') {
        const task = new Task(Date.now(), taskName, alarmTime ? new Date(alarmTime) : null);
        tasks.push(task);
        newTaskInput.value = '';
        newAlarmInput.value = '';
        task.render();
        if (task.alarm && task.alarm < new Date()) {
            const time = task.alarm;
            setTimeout(() => {
                alert('Time\'s up. I hope you made it.');
            }, time - Date.now());
        }
    }
}

function editTask(id) {
    const task = tasks.find(task => task.id === id);
    if (task) {
        task.edit();
    }
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    const taskElement = document.getElementById(`chk-${id}`).parentElement;
    taskElement.remove();
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
