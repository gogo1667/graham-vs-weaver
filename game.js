let graham = document.getElementById("graham");
let weaver = document.getElementById("weaver");

let grahamX = 0, grahamY = 0;
let weaverX = 270, weaverY = 270;

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
      if (grahamX < 330) grahamX += 30;
      break;
  }
  updatePositions();
}

function showMessage(text) {
  const message = document.getElementById("message");
  message.innerText = text;
  message.style.display = "block";
  setTimeout(() => {
    message.style.display = "none";
  }, 1000);
}


function updatePositions() {
  graham.style.left = grahamX + "px";
  graham.style.top = grahamY + "px";
  weaver.style.left = weaverX + "px";
  weaver.style.top = weaverY + "px";
}

function autoMoveWeaver() {
  if (weaverX > grahamX) weaverX -= 30;
  else if (weaverX < grahamX) weaverX += 30;

  if (weaverY > grahamY) weaverY -= 30;
  else if (weaverY < grahamY) weaverY += 30;

  updatePositions();

  // Collision detection
  if (grahamX === weaverX && grahamY === weaverY) {
    showMessage("💋 Weaver kisses Graham!");
    setTimeout(resetGame, 1000);
  }
}



function resetGame() {
  grahamX = 0; grahamY = 0;
  weaverX = 270; weaverY = 270;
  updatePositions();
}

setInterval(autoMoveWeaver, 500);
