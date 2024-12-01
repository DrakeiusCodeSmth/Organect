let currentSequence = 1;
let tutorialCompleted = false;

document.getElementById('bab1').addEventListener('click', () => {
    if (tutorialCompleted) return; // Prevent further clicks if tutorial is completed
    document.getElementById('bab1').style.backgroundColor = "#333"; // Mark as clicked
    showNext(currentSequence);
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

// Mark the tutorial as finished
function finishTutorial() {
  tutorialCompleted = true;
  alert("Tutorial completed!");
}
