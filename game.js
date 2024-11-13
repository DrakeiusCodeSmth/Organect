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

function isInsidePlaybox(x, y) {
  const rect = playbox.getBoundingClientRect();
  return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
}

// New function to add bond lines between atoms
function addBondLine(atom1, atom2) {
  const line = document.createElement("div");
  line.classList.add("bond-line");
  const rect1 = atom1.getBoundingClientRect();
  const rect2 = atom2.getBoundingClientRect();

  const x1 = rect1.left + rect1.width / 2;
  const y1 = rect1.top + rect1.height / 2;
  const x2 = rect2.left + rect2.width / 2;
  const y2 = rect2.top + rect2.height / 2;

  const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);

  line.style.width = `${length}px`;
  line.style.transform = `rotate(${angle}deg)`;
  line.style.position = "absolute";
  line.style.top = `${(y1 + y2) / 2 - 1}px`;
  line.style.left = `${(x1 + x2) / 2 - length / 2}px`;

  playbox.appendChild(line);
}

// Check for bonding conditions (e.g., 1 Carbon and 4 Hydrogens for Methane, 1 Oxygen and 2 Hydrogens for Water)
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
    // Add bond lines between Carbon and each Hydrogen
    const carbonAtom = atomsInPlaybox.find(atom => atom.id === "carbon");
    atomsInPlaybox.filter(atom => atom.id === "hydrogen").forEach(hydrogenAtom => {
      addBondLine(carbonAtom, hydrogenAtom);
    });
  } else if (oxygenCount === 1 && hydrogenCount === 2) {
    moleculeNameDisplay.textContent = "Water (H₂O)";
    // Add bond lines between Oxygen and each Hydrogen
    const oxygenAtom = atomsInPlaybox.find(atom => atom.id === "oxygen");
    atomsInPlaybox.filter(atom => atom.id === "hydrogen").forEach(hydrogenAtom => {
      addBondLine(oxygenAtom, hydrogenAtom);
    });
  } else if (carbonCount === 1 && oxygenCount === 2) {
    moleculeNameDisplay.textContent = "Carbon Dioxide (CO₂)";
    // Add bond lines between Carbon and each Oxygen
    const carbonAtom = atomsInPlaybox.find(atom => atom.id === "carbon");
    atomsInPlaybox.filter(atom => atom.id === "oxygen").forEach(oxygenAtom => {
      addBondLine(carbonAtom, oxygenAtom);
    });
  } else {
    moleculeNameDisplay.textContent = ""; // Clear if no molecule is formed
  }
}
