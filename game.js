let currentSequence = 1; 
 
document.getElementById('bab1').addEventListener('click', () => { 
    document.getElementById('bab1').style.backgroundColor = "#45a049";  // Darken when clicked 
    document.getElementById('bab1Status').textContent = "Completed";   // Show "Completed" 
    showSequence(1); 
}); 
 
function showSequence(seqNumber) { 
    // Hide all sequences 
    for (let i = 1; i <= 3; i++) { 
        document.getElementById(sequence${i}).style.display = "none"; 
    } 
 
    // Show the current sequence 
    document.getElementById(sequence${seqNumber}).style.display = "flex"; 
} 
 
function showNext(sequence) { 
    document.getElementById('sequence' + sequence).style.display = 'none'; 
    currentSequence = sequence + 1; 
    document.getElementById('sequence' + currentSequence).style.display = 'flex'; 
 
    // Hide the "Next" button on the last sequence and show "Finish" 
    if (currentSequence === 3) { 
        document.getElementById('nextButton' + sequence).style.display = 'none'; 
        document.getElementById('finishButton').style.display = 'block'; 
    } 
 
    // Show the "Previous" button once you're past the first sequence 
    if (currentSequence > 1) { 
        document.getElementById('prevButton' + currentSequence).style.display = 'inline-block'; 
    } 
} 
 
function showPrev(sequence) { 
    document.getElementById('sequence' + sequence).style.display = 'none'; 
    currentSequence = sequence - 1; 
    document.getElementById('sequence' + currentSequence).style.display = 'flex'; 
 
    // Hide "Previous" button when you go back to the first sequence 
    if (currentSequence === 1) { 
        document.getElementById('prevButton' + sequence).style.display = 'none'; 
    } 
 
    // Show the "Next" button on the previous sequences 
    document.getElementById('nextButton' + currentSequence).style.display = 'inline-block'; 
} 
 
function finishTutorial() { 
    // This will mark the tutorial as complete 
    document.getElementById('bab1').style.backgroundColor = '#8e44ad'; // Change color to indicate completion 
    document.getElementById('bab1Status').innerText = 'Completed'; 
    document.getElementById('tutorialContent').style.display = 'none'; // Hide tutorial content 
}
