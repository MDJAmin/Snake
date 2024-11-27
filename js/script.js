let callsNo = 20;
let cellSize = 400 / callsNo;
let difficulty = 1;

let score = 0

const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d"); // type of our dimensional (its 2d in our case!)

const btnStart = document.querySelector(".btn-start");
const btnPause = document.querySelector(".btn-pause");
const scoreVal = document.querySelector(".score-val");

let direction;
const DIR = {
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
};

// ctx.strokeStyle = '#616161'
ctx.strokeStyle = "#27373F";
ctx.fillStyle = "#fff";

let snake = [];
let food = null;
let paused = false;
let needsGrowth = false;

let lastUpdate, lastFood, tick;
let state;
let flash = false;
let lastKeyPressed;


function update() {
    tick = Date.now();
  
    if (hasCollisions()) {
      flash = true;
      return;
    }
  
    if (tick - lastUpdate > 500 / difficulty) {
      if (lastKeyPressed && lastKeyPressed !== direction) {
        setDirection(lastKeyPressed);
      }
  
      moveSnake();
      lastUpdate = tick;
    }
  
    if (tick - lastFood > foodTreshold()) {
      putFood();
    }
  
    if (headMeetsFood()) {
      needsGrowth = true;
      food = null;
      putFood();
      setScore(score + difficulty);
    }
  }