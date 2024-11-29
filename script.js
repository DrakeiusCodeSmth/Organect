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
            <h2>Contact Us</h2>
            <p>If you have any questions, please fill in the form below:</p>
            <form class="faq-form" action="mailto:darius.anggada05@gmail.com" method="POST" enctype="multipart/form-data">
                <input type="text" name="name" placeholder="Your Name" required>
                <input type="email" name="email" placeholder="Your Email" required>
                <textarea name="message" rows="5" placeholder="Your Message" required></textarea>
                <button type="submit">Send Message</button>
            </form>
        `;
    } else if (section === 'devs') {
        contentArea.innerHTML = `
            <h2>Meet the Developers</h2>
            <div class="devs-cards">
                <div class="dev-card">
                    <img src="images/dev1.jpg" alt="Developer 1">
                    <div class="dev-info">Developer 1</div>
                </div>
                <div class="dev-card">
                    <img src="images/dev2.jpg" alt="Developer 2">
                    <div class="dev-info">Developer 2</div>
                </div>
                <div class="dev-card">
                    <img src="images/dev3.jpg" alt="Developer 3">
                    <div class="dev-info">Developer 3</div>
                </div>
                <div class="dev-card">
                    <img src="images/dev4.jpg" alt="Developer 4">
                    <div class="dev-info">Developer 4</div>
                </div>
                <div class="dev-card">
                    <img src="images/dev5.jpg" alt="Developer 5">
                    <div class="dev-info">Developer 5</div>
                </div>
                <div class="dev-card">
                    <img src="images/dev6.jpg" alt="Developer 6">
                    <div class="dev-info">Developer 6</div>
                </div>
            </div>
        `;
    }
}
