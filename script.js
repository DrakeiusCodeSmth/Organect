// Initialize default content on page load
document.addEventListener('DOMContentLoaded', () => {
    showContent('home'); // Show home content by default
});

// Function to show content based on button clicked
function showContent(section) {
    const contentArea = document.getElementById('content-area');

    if (section === 'home') {
        contentArea.innerHTML = "<h2>Welcome to the Main Menu</h2><p>This is the main menu. Click any of the buttons above to navigate.</p>";
    } else if (section === 'faq') {
        contentArea.innerHTML = `
            <h2>FAQ</h2>
            <form class="faq-form" action="mailto:darius.anggada05@gmail.com" method="POST" enctype="multipart/form-data">
                <input type="text" name="name" placeholder="Your Name" required>
                <input type="email" name="email" placeholder="Your Email" required>
                <textarea name="message" placeholder="Your Message" rows="4" required></textarea>
                <button type="submit">Submit</button>
            </form>`;
    } else if (section === 'devs') {
        contentArea.innerHTML = `
            <h2>Meet The Devs</h2>
            <div class="profile-container">
                <div class="profile-card">
                    <img src="images/dev1.jpg" alt="Dev 1">
                    <div class="profile-card-info">Dev 1 Info</div>
                </div>
                <div class="profile-card">
                    <img src="images/dev2.jpg" alt="Dev 2">
                    <div class="profile-card-info">Dev 2 Info</div>
                </div>
                <div class="profile-card">
                    <img src="images/dev3.jpg" alt="Dev 3">
                    <div class="profile-card-info">Dev 3 Info</div>
                </div>
                <div class="profile-card">
                    <img src="images/dev4.jpg" alt="Dev 4">
                    <div class="profile-card-info">Dev 4 Info</div>
                </
