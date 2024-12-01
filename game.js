let currentSequence = 1;
let tutorialCompleted = false;
let tutorialStarted = false; // To track if the tutorial has started

// Function to disable the button bar when clicked for the first time
function disableButtonBar() {
  const buttonBar = document.getElementById('bab1Button');
  buttonBar.querySelector('button').disabled = true; // Disable the button after it's clicked
}

// Event listener for the tutorial button click (first time)
document.getElementById('bab1').addEventListener('click', () => {
    if (!tutorialStarted) {
        tutorialStarted = true;
        disableButtonBar(); // Disable button bar after first click
        showNext(currentSequence); // Start the tutorial
    }
});

// Function to navigate to the next sequence
function showNext(seq) {
  if (seq === 3) {
    document.getElementById('finishButton').style.display = "block";
    document.getElementById('nextButton3').style.display = "none";
  }
  document.getElementById('sequence' + seq).style.display = "none";
  document.getElementById('sequence' + (seq + 1)).style.display = "flex";
  currentSequence++;
}

// Function to navigate to the previous sequence
function showPrev(seq) {
  document.getElementById('sequence' + seq).style.display = "none";
  document.getElementById('sequence' + (seq - 1)).style.display = "flex";
  currentSequence--;
}

// Mark the tutorial as finished and re-enable the button bar
function finishTutorial() {
  tutorialCompleted = true;
  document.getElementById('bab1Button').querySelector('button').disabled = false; // Re-enable button bar
  alert("Tutorial completed! You can now go back to the canvas.");
}

// Function to go back to canvas (this would be your other page or view)
function goBackToCanvas() {
  // Add your logic for navigating back to the canvas here
  alert("Navigating back to the canvas.");
  document.getElementById('bab1Button').querySelector('button').disabled = false; // Re-enable button bar
}
