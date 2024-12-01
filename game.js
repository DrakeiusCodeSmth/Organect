let currentSequence = 0; // Start with no sequence shown

document.getElementById('bab1').addEventListener('click', () => {
    document.getElementById('bab1').style.backgroundColor = "#45a049"; // Darken button when clicked
    document.getElementById('bab1Status').textContent = "Completed"; // Show status as completed
    showSequence(1); // Show first sequence
    document.getElementById('tutorialContent').style.display = 'flex'; // Show tutorial content
});

function showSequence(seqNumber) {
    // Hide all sequences
    for (let i = 1; i <= 3; i++) {
        document.getElementById('sequence' + i).style.display = 'none';
    }

    // Show the current sequence
    document.getElementById('sequence' + seqNumber).style.display = 'flex';
}

function showNext(sequence) {
    // Hide current sequence
    document.getElementById('sequence' + sequence).style.display = 'none';
    currentSequence = sequence + 1;
    document.getElementById('sequence' + currentSequence).style.display = 'flex';

    // Hide the "Next" button on the last sequence and show "Finish"
    if (currentSequence === 3) {
        document.getElementById('nextButton' + sequence).style.display = 'none';
        document.getElementById('finishButton').style.display = 'block';
   
