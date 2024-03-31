let circle = document.querySelector(".hit-circle");
let area = document.querySelector(".hit-area");
let hitSound = document.querySelector("#hit-sound");
let diffArea = document.querySelector(".diff-area");
let sizeInput = document.querySelector("#size");
let speedInput = document.querySelector("#speed");
let saveBtn = document.querySelector("#save-btn");
let AutoCheckbox = document.querySelector("#auto");
let isAuto = false;

// *clientWidth* (refer hit fxn) returns the width of the current div / whereas *getBoundingClientRect()* returns the total width containing the children's width
// let areaWidth = area.getBoundingClientRect().width - size;
// let areaHeight = area.getBoundingClientRect().height - size;

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function autoClicker() {
  setInterval(() => {
    circle.click();
  }, 150);
}

async function diffInput() {
  return new Promise((resolve) => {
    saveBtn.onclick = () => {
      diffSet();
      diffArea.style.visibility = "hidden";
      resolve();
    };
  });
}

function diffSet() {
  document.body.style.setProperty("--circle-size", `${sizeInput.value}px`);
  AutoCheckbox.checked == true ? (isAuto = true) : (isAuto = false);

  console.log("Difficulty set: ");
  console.log("Size: ", sizeInput.value);
  console.log("Speed: ", speedInput.value);
}

function calculateScore(timeInterval) {
  return Math.round(1000 / timeInterval);
}

async function game() {
  let previousClickTime = 0;
  let finalScore = 0;

  circle.onclick = function hit() {
    const currentTime = Date.now(); // now() gets the current time in milliseconds so that it can subtract int
    const timeInterval = (currentTime - previousClickTime) / 1000;
    previousClickTime = currentTime;

    let circleSize = parseInt(getComputedStyle(document.body).getPropertyValue("--circle-size"));
    let areaWidth = area.clientWidth - circleSize;
    let areaHeight = area.clientHeight - circleSize;
    let xPos = random(0, areaWidth);
    let yPos = random(0, areaHeight);

    hitSound.currentTime = 0;
    hitSound.play();

    circle.style.top = `${yPos}px`;
    circle.style.left = `${xPos}px`;
    console.log("Time interval: ", timeInterval);

    // circle.style.visibility = "hidden";
    // setTimeout(() => {
    //   circle.style.visibility = "visible";
    //   circle.style.top = `${yPos}px`;
    //   circle.style.left = `${xPos}px`;
    // }, 100);

    const score = calculateScore(timeInterval);
    finalScore += score;
    console.log(score);
  };

  console.log("hell");

  if (isAuto == true) {
    autoClicker();
  }
}

async function main() {
  await diffInput();
  await game();
}

main();

// remember always make the get() type variables inside their functions where they can be later changed
// always use the alterable values when they are actually used
