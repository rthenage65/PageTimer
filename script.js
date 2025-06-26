const pageNumberElement = document.getElementById('pageNumber');
const progressLineElement = document.getElementById('progressLine');
const pauseResumeElement = document.getElementById('pauseResumeButton');

const pageTurnSound = new Audio('./page-turn.mp3');
  
let currentPage = 0;
let endPage = 0;
let currentTime = 0; // counts up in seconds until it reaches the required time to turn the page

let playState = 'paused'

let timerInterval;

// this function resets the app to the specified start page and presses play
document.getElementById('startBtn').addEventListener('click', function() {
  console.log(`startBtn`)
  const startPage = parseInt(document.getElementById('startPage').value);
  endPage = parseInt(document.getElementById('endPage').value);

  updatePage(startPage);
  resume()
});

function updatePage(pageNumber) {
    if (pageNumber > endPage) {
        // alert('You have reached the last page.');
        currentPage = endPage
        pause()
        return;
    }

    currentPage = pageNumber
    currentTime = 0

    pageTurnSound.play();

    // Update page number display
    pageNumberElement.textContent = 'Page: ' + currentPage;
}

function tickTimer() {
  currentTime++

  // Calculate the time required for the current page
  const timePerPage = document.getElementById('timePerPage').value.split(':');
  const minutes = parseInt(timePerPage[0]);
  const seconds = parseInt(timePerPage[1]);  
  const durationOfPage = (minutes * 60 + seconds);

  if (currentTime >= durationOfPage) {
      updatePage(currentPage + 1)
  }

  const currentPercentage = (100 * currentTime / durationOfPage).toFixed(1)
  progressLineElement.style.height = currentPercentage + '%'; // Move to the bottom
}

function resume() {
  playState = 'running'
  clearInterval(timerInterval)
  timerInterval = setInterval(tickTimer, 1000)

  // update the pauseResume element
  pauseResumeElement.innerHTML = '⏸'
}

function pause() {
  playState = 'paused'
  clearInterval(timerInterval)

  // update the pauseResume element
  pauseResumeElement.innerHTML = '⏵'
}

function pauseResumeButton() {
    if (playState === 'running') {
        pause()
    } else {
        resume()
    }
}

function restartPageButton() {
    currentTime = -1 // will jump to 0 when tickTimer runs
    tickTimer()
}

function previousPageButton() {
    updatePage(currentPage - 1)
    restartPageButton()
}

function nextPageButton() {
    updatePage(currentPage + 1)
    restartPageButton()
}