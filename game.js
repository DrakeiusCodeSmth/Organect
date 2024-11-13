// JavaScript for Chemistry Bonding Game

// Selecting elements
const expandButton = document.getElementById("expand-button");
const atomContainer = document.getElementById("atom-container");
const playbox = document.getElementById("playbox");
const moleculeNameDisplay = document.getElementById("molecule-name");

// Toggle inventory expand/collapse
expandButton.addEventListener("click", () => {
  atomContainer.classList.toggle("expanded");
});

// Handle atom dragging
let draggedAtom = null;

// Add event listeners for each atom
document.querySelectorAll(".atom").forEach(atom => {
  atom.addEventListener("mousedown", (e) => {
    draggedAtom = e.target.cloneNode(true); // Clone atom for dragging
    draggedAtom.style.position = "absolute";
    draggedAtom.style.zIndex = "1000";
    document.body.appendChild(draggedAtom);
    moveAt(e.pageX, e.pageY);
  });

  atom.addEventListener("mousemove", (e) => {
    if (draggedAtom) {
      moveAt(e.pageX, e.pageY);
    }
  });

  atom.addEventListener("mouseup", (e) => {
    if (isInsidePlaybox(e.pageX, e.pageY)) {
      playbox.appendChild(draggedAtom);
      draggedAtom.style.position = "absolute";
      draggedAtom.style.left = ${e.pageX - playbox.offsetLeft}px;
      draggedAtom.style.top = ${e.pageY - playbox.offsetTop}px;
      checkBonding();
    } else {
      draggedAtom.remove(); // Return atom if outside playbox
    }
    draggedAtom = null;
  });
});

// Move the atom with the mouse
function moveAt(pageX, pageY) {
  draggedAtom.style.left = pageX - draggedAtom.offsetWidth / 2 + "px";
  draggedAtom.style.top = pageY - draggedAtom.offsetHeight / 2 + "px";
}

// Check if the position is inside the playbox
function isInsidePlaybox(x, y) {
  const rect = playbox.getBoundingClientRect();
  return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
}

// Check for bonding conditions (e.g., 1 Carbon and 4 Hydrogens for Methane)
function checkBonding() {
  const atomsInPlaybox = playbox.querySelectorAll(".atom");
  let carbonCount = 0;
  let hydrogenCount = 0;

  atomsInPlaybox.forEach(atom => {
    if (atom.id === "carbon") carbonCount++;
    if (atom.id === "hydrogen") hydrogenCount++;
  });

  // Check if there is 1 Carbon and 4 Hydrogens
  if (carbonCount === 1 && hydrogenCount === 4) {
    moleculeNameDisplay.textContent = "Methane (CH₄)";
    // Add bond lines or other visual indicators here
  } else {
    moleculeNameDisplay.textContent = ""; // Clear if not bonded
  }
}
