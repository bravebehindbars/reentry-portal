// JavaScript for updating top clock

function updateClock() {
  const now = new Date();
  const time = now.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });
  document.getElementById('top-clock').textContent = time;
}

setInterval(updateClock, 1000);
updateClock(); // initial call
