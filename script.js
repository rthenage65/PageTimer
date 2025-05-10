document.getElementById('startBtn').addEventListener('click', function() {
  console.log(`startBtn`)
  const startPage = parseInt(document.getElementById('startPage').value);
  const endPage = parseInt(document.getElementById('endPage').value);
  const timePerPage = document.getElementById('timePerPage').value.split(':');
  const minutes = parseInt(timePerPage[0]);
  const seconds = parseInt(timePerPage[1]);

  let currentPage = startPage;
  let position = 0;
  
  const pageNumberElement = document.getElementById('pageNumber');
  const progressLineElement = document.getElementById('progressLine');
  const pageTurnSound = new Audio('./page-turn.mp3');
  pageTurnSound.play();

  function updatePage() {
      if (currentPage > endPage) {
          alert('You have reached the last page.');
          return;
      }

      // Update page number display
      pageNumberElement.textContent = 'Page: ' + currentPage;
      
      // Reset progress line for the new page
      progressLineElement.style.transition = `none`;
      progressLineElement.style.height = '0';

      // Calculate the time for the current page
      const timeForCurrentPage = (minutes * 60 + seconds);

      setTimeout(() => {
        // Animate the progress line
        progressLineElement.style.transition = `height ${timeForCurrentPage}s linear`;        
        progressLineElement.style.height = '100%'; // Move to the bottom
      }, 100)
      
      // Move to the next page after the set time
      setTimeout(() => {
          currentPage++;
          position++;
          pageTurnSound.play();
          updatePage();
      }, timeForCurrentPage * 1000);
  }
  updatePage();
});
