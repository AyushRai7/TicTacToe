document.addEventListener('DOMContentLoaded', () => {
  const boxes = document.querySelectorAll('.box');
  const resetButton = document.querySelector('.reset-cont button');
  const scoreYou = document.querySelector('.scorecard:nth-child(1) .score');
  const scoreOpponent = document.querySelector('.scorecard:nth-child(2) .score');
  const soundIcon = document.querySelector(".sound-cont img");
  const clickSound = new Audio("sound.mp3");
  const newGameButton = document.querySelector('.new-game button');

  let currentPlayer = 'X';
  let board = Array(9).fill(null);
  let isGameOver = false;
  let score = { you: 0, opponent: 0 };
  let soundEnabled = true;
  let moveSequence = [];

  boxes.forEach((box, index) => {
      box.addEventListener('click', () => handleBoxClick(index));
  });

  resetButton.addEventListener('click', resetGame);
  newGameButton.addEventListener('click', newGame);
  soundIcon.addEventListener("click", toggleSound);

  function handleBoxClick(index) {
      if (isGameOver || board[index]) return;

      if (moveSequence.length >= 6) {
          const firstFilledIndex = moveSequence.shift();
          board[firstFilledIndex] = null;
          boxes[firstFilledIndex].innerHTML = '';
      }

      board[index] = currentPlayer;
      updateBox(index, currentPlayer);
      moveSequence.push(index);

      if (soundEnabled) {
          clickSound.play();
      }

      if (checkWinner(currentPlayer)) {
          isGameOver = true;
          updateScore(currentPlayer);
          return;
      }

      if (moveSequence.length >= 9) {
          isGameOver = true;
          return;
      }

      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }

  function updateBox(index, player) {
      const box = boxes[index];
      box.innerHTML = `<img src="${player === 'X' ? 'cross.png' : 'circle.png'}">`;
  }

  function checkWinner(player) {
      const winPatterns = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6]
      ];

      return winPatterns.some(pattern => {
          const [a, b, c] = pattern;
          return board[a] === player && board[a] === board[b] && board[a] === board[c];
      });
  }

  function updateScore(player) {
      if (player === 'X') {
          score.you++;
          scoreYou.textContent = score.you;
      } else {
          score.opponent++;
          scoreOpponent.textContent = score.opponent;
      }
  }

  function resetGame() {
      board.fill(null);
      boxes.forEach(box => box.innerHTML = '');
      isGameOver = false;
      currentPlayer = 'X';
      moveSequence = [];
  }

  function newGame() {
      resetGame();
      score = { you: 0, opponent: 0 };
      scoreYou.textContent = score.you;
      scoreOpponent.textContent = score.opponent;
  }

  function toggleSound() {
      const soundOn = "sound-on.png";
      const soundOff = "sound-off.png";
  
      if (soundIcon.src.includes(soundOn)) {
          soundIcon.src = soundOff;
          soundEnabled = false;
      } else {
          soundIcon.src = soundOn;
          soundEnabled = true;
      }
  }
});
