// Initialize default content on page load
document.addEventListener('DOMContentLoaded', () => {
    showContent('home'); // Show home content by default
});

// Function to show content based on button clicked
function showContent(section) {
    const contentArea = document.getElementById('content-area');

    // Display appropriate content based on the section
    if (section === 'home') {
        contentArea.innerHTML = "<h2>Welcome to the Main Menu</h2><p>This is the main menu. Click any of the buttons above to navigate.</p>";
    } else if (section === 'faq') {
        contentArea.innerHTML = "<h2>FAQ</h2><p>This is the FAQ section content. Here you will find answers to common questions.</p>";
    } else if (section === 'tutorial') {
        contentArea.innerHTML = "<h2>Tutorial</h2><p>This is the tutorial section content. Follow the steps to learn how to play the Chemis Game.</p>";
    } else if (section === 'devs') {
        contentArea.innerHTML = "<h2>Devs</h2><p>This is the devs section content. Meet the team behind the Chemis Game.</p>";
    }
}

// THE BUTTON FUNCTION STARTS BELLOW, DONT DELETE ABOVE


// THIS IS THE DISPLAY LOGO SECTION
// Function to show content based on button clicked
function showContent(section) {
    const contentArea = document.getElementById('content-area');

    if (section === 'home') {
        contentArea.innerHTML = '';  // Clear content area

        // Add the high-resolution logo to the content area
        const imgElement = document.createElement('img');
        imgElement.src = 'images/LOGO.png';  // Replace with your image file path
        imgElement.alt = 'Chemis Game Logo';
        imgElement.classList.add('home-image');  // Add the class for styling
        contentArea.appendChild(imgElement);  // Append the image to the content area

        // Create and append the Play button
        const playButton = document.createElement('button');
        playButton.classList.add('play-button');  // Add class for styling
        playButton.addEventListener('click', startGame);  // Add click event listener to trigger loading
        contentArea.appendChild(playButton);  // Append the Play button to the content area

    } else if (section === 'faq') {
        contentArea.innerHTML = "<h2>FAQ</h2><p>This is the FAQ section content. Here you will find answers to common questions.</p>";
    } else if (section === 'tutorial') {
        contentArea.innerHTML = "<h2>Tutorial</h2><p>This is the tutorial section content. Follow the steps to learn how to play the Chemis Game.</p>";
    } else if (section === 'devs') {
        contentArea.innerHTML = "<h2>Devs</h2><p>This is the devs section content. Meet the team behind the Chemis Game.</p>";
    }
}

// Function to handle the Play button click event
function startGame() {
    const contentArea = document.getElementById('content-area');
    
    // Add a loading bar
    contentArea.innerHTML = '<p>Loading...</p><div id="loading-bar" style="width: 100%; background-color: #ddd; height: 20px;"><div id="progress" style="height: 100%; width: 0%; background-color: green;"></div></div>';
    
    // Simulate loading progress
    let progress = 0;
    const loadingInterval = setInterval(() => {
        progress += 5;
        document.getElementById('progress').style.width = progress + '%';
        
        if (progress >= 100) {
            clearInterval(loadingInterval);
            // After loading completes, show the game canvas
            contentArea.innerHTML = '<canvas id="gameCanvas" width="800" height="600"></canvas>';
            const canvas = document.getElementById('gameCanvas');
            const ctx = canvas.getContext('2d');
            // Initialize game logic here...
        }
    }, 100);  // Update the loading bar every 100ms
}

// DEVELOPER BAR


