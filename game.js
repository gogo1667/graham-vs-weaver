let graham = document.getElementById("graham");
let weaver = document.getElementById("weaver");
let jager = document.getElementById("jager");
let message = document.getElementById("message");

let grahamX = 0, grahamY = 0;
let weaverX = 240, weaverY = 240;

let jagerX = 330, jagerY = 330;
let jagerVisible = false;
let weaverPaused = false;

function move(direction) {
  switch(direction) {
    case 'up':
      if (grahamY > 0) grahamY -= 30;
      break;
    case 'down':
      if (grahamY < 330) grahamY += 30;
      break;
    case 'left':
      if (grahamX > 0) grahamX -= 30;
      break;
    case 'right':
      if (grahamX < 3300) grahamX += 30;
      break;
  }
  updatePositions();
}

function updatePositions() {
  graham.style.left = grahamX + "px";
  graham.style.top = grahamY + "px";
  weaver.style.left = weaverX + "px";
  weaver.style.top = weaverY + "px";

  // Jäger collision
  if (jagerVisible && grahamX === jagerX && grahamY === jagerY) {
    jager.style.display = "none";
    jagerVisible = false;
    weaverPaused = true;
    showMessage("🍾 Shot time!!!");

    setTimeout(() => {
      weaverPaused = false;
      showMessage("");
    }, 4000); // pause for 4 seconds

    setTimeout(() => {
      spawnJager(); // respawn in 8 seconds
    }, 8000);
  }
}

function autoMoveWeaver() {
  if (weaverPaused) return;

  if (weaverX > grahamX) weaverX -= 30;
  else if (weaverX < grahamX) weaverX += 30;

  if (weaverY > grahamY) weaverY -= 30;
  else if (weaverY < grahamY) weaverY += 30;

  updatePositions();

  if (grahamX === weaverX && grahamY === weaverY) {
    showMessage("💋 Weaver kisses Graham!");
    setTimeout(resetGame, 1000);
  }
}

function resetGame() {
  grahamX = 0; grahamY = 0;
  weaverX = 240; weaverY = 240;
  weaverPaused = false;
  updatePositions();
  spawnJager();
  showMessage(""); // Clear any lingering messages
}

function spawnJager() {
  jager.style.left = jagerX + "px";
  jager.style.top = jagerY + "px";
  jager.style.display = "block";
  jagerVisible = true;
}

function showMessage(text) {
  message.innerText = text;
  message.style.display = text ? "block" : "none";
}

// Start game loop
setInterval(autoMoveWeaver, 500);
resetGame();
