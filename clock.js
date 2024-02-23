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
  //after putting in the defunct alarm(couldn't get it to make a sound), i realized this could use a clock.