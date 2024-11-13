// Selecting elements
const expandButton = document.getElementById("expand-button");
const atomContainer = document.getElementById("atom-container");
const playbox = document.getElementById("playbox");
const moleculeNameDisplay = document.getElementById("molecule-name");

// Toggle inventory expand/collapse
expandButton.addEventListener("click", () => {
  if (atomContainer.classList.contains("expanded")) {
    atomContainer.classList.remove("expanded");
  } else {
    atomContainer.classList.add("expanded");
  }
});

// Handle atom dragging
let draggedAtom = null;

document.querySelectorAll(".atom").forEach(atom => {
  atom.addEventListener("mousedown", (e) => {
    e.preventDefault();
    draggedAtom = e.target.cloneNode(true);
    draggedAtom.style.position = "absolute";
    draggedAtom.style.zIndex = "1000";
    document.body.appendChild(draggedAtom);

    moveAt(e.pageX, e.pageY);

    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
    }

    function moveAt(pageX, pageY) {
      draggedAtom.style.left = pageX - draggedAtom.offsetWidth / 2 + "px";
      draggedAtom.style.top = pageY - draggedAtom.offsetHeight / 2 + "px";
    }

    document.addEventListener("mousemove", onMouseMove);

    draggedAtom.onmouseup = function(event) {
      document.removeEventListener("mousemove", onMouseMove);

      if (isInsidePlaybox(event.pageX, event.pageY)) {
        playbox.appendChild(draggedAtom);
        draggedAtom.style.position = "absolute";
        draggedAtom.style.left = `${event.pageX - playbox.offsetLeft - draggedAtom.offsetWidth / 2}px`;
        draggedAtom.style.top = `${event.pageY - playbox.offsetTop - draggedAtom.offsetHeight / 2}px`;
        checkBonding();
      } else {
        draggedAtom.remove();
      }

      draggedAtom = null;
    };
  });
});

// Check if the position is inside the playbox
function isInsidePlaybox(x, y) {
  const rect = playbox.getBoundingClientRect();
  return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
}

// Check for bonding conditions (e.g., 1 Carbon and 4 Hydrogens for Methane)
function checkBonding() {
  const atomsInPlaybox = Array.from(playbox.querySelectorAll(".atom"));
  let carbonCount = 0;
  let hydrogenCount = 0;
  let oxygenCount = 0;

  atomsInPlaybox.forEach(atom => {
    if (atom.id === "carbon") carbonCount++;
    if (atom.id === "hydrogen") hydrogenCount++;
    if (atom.id === "oxygen") oxygenCount++;
  });

  // Clear any existing bond lines
  document.querySelectorAll(".bond-line").forEach(line => line.remove());

  // Bonding conditions for different molecules
  if (carbonCount === 1 && hydrogenCount === 4) {
    moleculeNameDisplay.textContent = "Methane (CH₄)";
  } else if (oxygenCount === 1 && hydrogenCount === 2) {
    moleculeNameDisplay.textContent = "Water (H₂O)";
  } else if (carbonCount === 1 && oxygenCount === 2) {
    moleculeNameDisplay.textContent = "Carbon Dioxide (CO₂)";
  } else {
    moleculeNameDisplay.textContent = ""; // Clear if no molecule is formed
  }
}
