const fruitsArr = [
  "banana.jpg",
  "avocado.png",
  "grapes.png",
  "cherry.jpg",
  "mango.png",
  "pineapple.jpg",
];

const blocks = document.querySelectorAll(".blocks");
const startBtn = document.getElementById("start");
const scored = document.getElementById("score");
const countDown = document.getElementById("timer");
const totalMoves = document.getElementById("Moves");
let flippedArr = [];
let NormalArr = [];
let score = 0;
let moves = 0;
scored.innerHTML = `Score: ${score}`;

startBtn.addEventListener("click", function () {
  totalMoves.innerHTML = `Total moves: ${moves}`;

  score = 0;
  scored.innerHTML = `Score: ${score}`;

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const shuffledImages = shuffle(fruitsArr.concat(fruitsArr));

  for (let i = 0; i < blocks.length; i++) {
    blocks[i].style.backgroundImage = `url(${shuffledImages[i]})`;
  }
  let timer = 5;

  var looper = setInterval(() => {
    timer--;
    countDown.innerHTML = timer;
    if (timer <= 0) {
      clearInterval(looper);
    }
  }, 1000);

  setTimeout(() => {
    for (let i = 0; i < blocks.length; i++) {
      blocks[i].style.backgroundImage = "none";
    }
  }, 5000);

  for (let i = 0; i < blocks.length; i++) {
    blocks[i].addEventListener("click", function () {
      moves++;
      totalMoves.innerHTML = `Total moves: ${moves}`;
      if (moves >= 20) {
        alert("You are out of moves");
        moves = 0;
        totalMoves.innerHTML = `Total moves: ${moves}`;

        for (let i = 0; i < blocks.length; i++) {
          blocks[i].style.backgroundImage = "none";
        }
        return;
      }
      blocks[i].style.backgroundImage = `url(${shuffledImages[i]})`;
      flippedArr.push(shuffledImages[i]);
      NormalArr.push(blocks[i]);

      if (flippedArr.length === 2) {
        for (let j = 0; j < flippedArr.length; j++) {
          if (flippedArr[0] === flippedArr[1]) {
            score += 5;
            scored.innerHTML = `Score: ${score}`;

            flippedArr = [];
            NormalArr = [];
          } else {
            setTimeout(function () {
              blocks[i].style.backgroundImage = "none";
              NormalArr[0].style.backgroundImage = "none";
              score += -1;
              scored.innerHTML = `Score: ${score}`;

              flippedArr = [];
              NormalArr = [];
            }, 1000);
          }
        }
      }
    });
  }
});
