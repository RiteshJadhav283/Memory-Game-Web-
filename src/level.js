const allImages = [
    'Images/photos/pika.png',
    'Images/photos/poki2.png',
    'Images/photos/poki3.png',
    'Images/photos/poki4.png',
    'Images/photos/poki5.png',
    'Images/photos/poki6.png',
    'Images/photos/poki7.png',
    'Images/photos/poki8.png',
    'Images/photos/poki9.png',
    'Images/photos/poki10.png'
  ];
  
  let flippedCards = [];
  let matchedCards = [];
  let timerInterval;
  let secondsElapsed = 0;
  let score = 0;
  
  const board = document.getElementById('game-board');
  const timerDisplay = document.getElementById('timer');
  const scoreDisplay = document.getElementById('score');
  const difficultySelect = document.getElementById('difficulty');
  const restartBtn = document.getElementById('restartBtn');
  
  let currentDifficulty = parseInt(difficultySelect.value);
  let cardImages = [];
  
  function shuffle(array) {
    array.sort(() => 0.5 - Math.random());
  }
  
  function startTimer() {
    stopTimer();
    secondsElapsed = 0;
    timerDisplay.textContent = secondsElapsed;
    timerInterval = setInterval(() => {
      secondsElapsed++;
      timerDisplay.textContent = secondsElapsed;
    }, 1000);
  }
  
  function stopTimer() {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
  }
  
  function updateScore(value) {
    score += value;
    scoreDisplay.textContent = score;
  }
  
  function generateCardSet(pairsCount) {
    const selectedImages = allImages.slice(0, pairsCount);
    const cards = [...selectedImages, ...selectedImages];
    shuffle(cards);
    return cards;
  }
  
  function setGridColumns(pairsCount) {
    const totalCards = pairsCount * 2;
    const cols = Math.min(5, Math.ceil(Math.sqrt(totalCards)));
    board.style.gridTemplateColumns = `repeat(${cols}, 100px)`;
  }
  
  function createBoard() {
    cardImages = generateCardSet(currentDifficulty);
    board.innerHTML = '';
    matchedCards = [];
    flippedCards = [];
    score = 0;
    scoreDisplay.textContent = score;
  
    setGridColumns(currentDifficulty);
  
    cardImages.forEach((imgSrc, index) => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.dataset.symbol = imgSrc;
      card.dataset.index = index;
  
      card.innerHTML = `
        <div class="card-inner">
          <div class="card-front">?</div>
          <div class="card-back"><img src="${imgSrc}" alt="card image"></div>
        </div>
      `;
  
      card.addEventListener('click', flipCard);
      board.appendChild(card);
    });
  
    document.querySelectorAll('.card').forEach(card => {
      card.classList.add('flipped');
      card.style.pointerEvents = 'none';
    });
  
    setTimeout(() => {
      document.querySelectorAll('.card').forEach(card => {
        card.classList.remove('flipped');
        card.style.pointerEvents = 'auto';
      });
      startTimer();
    }, 2000);
  }
  
  function flipCard() {
    const card = this;
    if (card.classList.contains('flipped') || flippedCards.length === 2) return;
  
    card.classList.add('flipped');
    flippedCards.push(card);
  
    if (flippedCards.length === 2) {
      checkMatch();
    }
  }
  
  function checkMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.symbol === card2.dataset.symbol) {
      setTimeout(() => {
        card1.style.opacity = '0';
        card2.style.opacity = '0';
        matchedCards.push(card1, card2);
        updateScore(10);
        flippedCards = [];
  
        if (matchedCards.length === cardImages.length) {
          stopTimer();
          setTimeout(() => {
            alert(`🎉 You won in ${secondsElapsed} seconds with a score of ${score}!`);
          }, 300);
        }
      }, 500);
    } else {
      updateScore(-5);
      setTimeout(() => {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        flippedCards = [];
      }, 1000);
    }
  }
  
  difficultySelect.addEventListener('change', () => {
    currentDifficulty = parseInt(difficultySelect.value);
    stopTimer();
    createBoard();
  });
  
  restartBtn.addEventListener('click', () => {
    stopTimer();
    createBoard();
  });
  
  createBoard();