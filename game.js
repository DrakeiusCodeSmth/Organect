document.getElementById('bab1').addEventListener('click', () => {
  document.getElementById('bab1').style.backgroundColor = "#45a049";  // Darken when clicked
  document.getElementById('bab1Status').textContent = "Completed";   // Show "Completed"
  showSequence(1);
});

function showSequence(seqNumber) {
  // Hide all sequences
  for (let i = 1; i <= 3; i++) {
    document.getElementById(`sequence${i}`).style.display = "none";
  }

  // Show the current sequence
  document.getElementById(`sequence${seqNumber}`).style.display = "flex";
}

function showNext(seqNumber) {
  showSequence(seqNumber + 1);
}

function showPrev(seqNumber) {
  showSequence(seqNumber - 1);
}

function finishTutorial() {
  // After finish, go back to the button bar and reset
  document.getElementById('bab1').style.backgroundColor = "#4CAF50";  // Reset color
  document.getElementById('bab1Status').textContent = "Completed";  // Indicate completion
  showSequence(1);  // Show the first sequence again
}
