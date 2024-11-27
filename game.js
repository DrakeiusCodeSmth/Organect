const expandButton = document.getElementById("expand-button");
const atomContainer = document.getElementById("atom-container");
const playbox = document.getElementById("playbox");
const bonds = document.getElementById("bonds");

expandButton.addEventListener("click", () => {
  atomContainer.classList.toggle("expanded");
});

let draggedAtom = null;
let isMoleculeDragging = false;

document.querySelectorAll(".atom").forEach(atom => {
  atom.addEventListener("mousedown", startDrag);
});

function startDrag(event) {
  if (isMoleculeDragging) return; // Prevent dragging atoms if molecule dragging is in progress

  event.preventDefault();
  const target = event.target.closest(".atom");
  draggedAtom = target.cloneNode(true);
  draggedAtom.classList.add("playbox-atom");
  document.body.appendChild(draggedAtom);

  moveAt(event.pageX, event.pageY);

  function moveAt(pageX, pageY) {
    draggedAtom.style.left = `${pageX - draggedAtom.offsetWidth / 2}px`;
    draggedAtom.style.top = `${pageY - draggedAtom.offsetHeight / 2}px`;
  }

  const onMouseMove = (event) => moveAt(event.pageX, event.pageY);
  document.addEventListener("mousemove", onMouseMove);

  draggedAtom.onmouseup = function (event) {
    if (isInsidePlaybox(event.pageX, event.pageY)) {
      playbox.appendChild(draggedAtom);
      draggedAtom.style.left = `${event.pageX - playbox.offsetLeft - draggedAtom.offsetWidth / 2}px`;
      draggedAtom.style.top = `${event.pageY - playbox.offsetTop - draggedAtom.offsetHeight / 2}px`;
      enablePlayboxDragging(draggedAtom);
      checkBonding();
    } else {
      draggedAtom.remove();
    }
    cleanup();
  };

  function cleanup() {
    document.removeEventListener("mousemove", onMouseMove);
    draggedAtom.onmouseup = null;
    draggedAtom = null;
  }
}

function isInsidePlaybox(x, y) {
  const rect = playbox.getBoundingClientRect();
  return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
}

function enablePlayboxDragging(atom) {
  atom.onmousedown = function(event) {
    event.preventDefault();
    const moveWithinPlaybox = (pageX, pageY) => {
      const rect = playbox.getBoundingClientRect();
      const newX = Math.min(Math.max(pageX - rect.left - atom.offsetWidth / 2, 0), rect.width - atom.offsetWidth);
      const newY = Math.min(Math.max(pageY - rect.top - atom.offsetHeight / 2, 0), rect.height - atom.offsetHeight);
      atom.style.left = `${newX}px`;
      atom.style.top = `${newY}px`;
    };

    const onMouseMove = (event) => moveWithinPlaybox(event.pageX, event.pageY);
    document.addEventListener("mousemove", onMouseMove);

    atom.onmouseup = function () {
      document.removeEventListener("mousemove", onMouseMove);
      atom.onmouseup = null;
    };
  };
}

function checkBonding() {
  const atoms = Array.from(playbox.querySelectorAll(".playbox-atom"));
  const atomCounts = { carbon: 0, hydrogen: 0, oxygen: 0 };

  atoms.forEach(atom => {
    atomCounts[atom.id]++;
  });

  if (atomCounts.carbon === 1 && atomCounts.hydrogen === 4) {
    createMolecule("Methane (CH₄)", atoms, "cross");
  } else if (atomCounts.oxygen === 1 && atomCounts.hydrogen === 2) {
    createMolecule("Water (H₂O)", atoms, "linear");
  } else if (atomCounts.carbon === 2 && atomCounts.hydrogen === 6) {
    createMolecule("Ethane (C₂H₆)", atoms, "linear");
  }
}

function createMolecule(name, atoms, layout) {
  // Clear atoms from playbox
  atoms.forEach(atom => atom.remove());

  // Create molecule container
  const molecule = document.createElement("div");
  molecule.classList.add("molecule");
  playbox.appendChild(molecule);

  // Position molecule
  molecule.style.left = "50%";
  molecule.style.top = "50%";
  molecule.style.transform = "translate(-50%, -50%)";

  // Add atoms in the specified layout
  const positions = getMoleculePositions(layout, atoms.length);
  positions.forEach((pos, i) => {
    const atom = atoms[i];
    atom.style.position = "absolute";
    atom.style.left = `${pos.x}px`;
    atom.style.top = `${pos.y}px`;
    molecule.appendChild(atom);
  });

  // Add bond lines
  bonds.innerHTML = ""; // Clear previous bonds
  for (let i = 0; i < positions.length; i++) {
    for (let j = i + 1; j < positions.length; j++) {
      const line = createBondLine(positions[i], positions[j]);
      bonds.appendChild(line);
    }
  }

  // Display molecule name
  const nameLabel = document.createElement("div");
  nameLabel.classList.add("bond-name");
  nameLabel.textContent = name;
  molecule.appendChild(nameLabel);

  // Make molecule draggable
  enablePlayboxDragging(molecule);
}

function getMoleculePositions(layout, count) {
  const center = { x: 100, y: 100 };
  const positions = [];
  if (layout === "cross") {
    positions.push(center);
    positions.push({ x: center.x - 80, y: center.y }); // Left
    positions.push({ x: center.x + 80, y: center.y }); // Right
    positions.push({ x: center.x, y: center.y - 80 }); // Top
    positions.push({ x: center.x, y: center.y + 80 }); // Bottom
  }
  return positions.slice(0, count);
}

function createBondLine(start, end) {
  const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line.setAttribute("x1", start.x);
  line.setAttribute("y1", start.y);
  line.setAttribute("x2", end.x);
  line.setAttribute("y2", end.y);
  line.classList.add("bond-line");
  return line;
}
