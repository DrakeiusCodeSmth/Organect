const expandButton = document.getElementById("expand-button");
const atomContainer = document.getElementById("atom-container");
const playbox = document.getElementById("playbox");
const bonds = document.getElementById("bonds");
const moleculeNameDisplay = document.getElementById("molecule-name");

expandButton.addEventListener("click", () => {
  atomContainer.classList.toggle("expanded");
});

let draggedAtom = null;
let isTouch = false;

document.querySelectorAll(".atom").forEach(atom => {
  atom.addEventListener("mousedown", startDrag);
  atom.addEventListener("touchstart", startDrag, { passive: true });
});

function startDrag(event) {
  event.preventDefault();
  isTouch = event.type === "touchstart";

  const target = event.target.closest(".atom");
  draggedAtom = target.cloneNode(true);
  draggedAtom.classList.add("playbox-atom");
  document.body.appendChild(draggedAtom);

  moveAt(event.pageX || event.touches[0].pageX, event.pageY || event.touches[0].pageY);

  function moveAt(pageX, pageY) {
    draggedAtom.style.position = "absolute";
    draggedAtom.style.zIndex = "1000";
    draggedAtom.style.left = pageX - draggedAtom.offsetWidth / 2 + "px";
    draggedAtom.style.top = pageY - draggedAtom.offsetHeight / 2 + "px";
  }

  const onMouseMove = (event) => moveAt(event.pageX, event.pageY);
  const onTouchMove = (event) => moveAt(event.touches[0].pageX, event.touches[0].pageY);

  if (isTouch) document.addEventListener("touchmove", onTouchMove);
  else document.addEventListener("mousemove", onMouseMove);

  draggedAtom.onmouseup = draggedAtom.ontouchend = function (event) {
    if (isInsidePlaybox(event.pageX || event.changedTouches[0].pageX, event.pageY || event.changedTouches[0].pageY)) {
      playbox.appendChild(draggedAtom);
      draggedAtom.style.position = "absolute";
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
    document.removeEventListener("touchmove", onTouchMove);
    draggedAtom.onmouseup = null;
    draggedAtom.ontouchend = null;
    draggedAtom = null;
  }
}

function isInsidePlaybox(x, y) {
  const rect = playbox.getBoundingClientRect();
  return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
}

function enablePlayboxDragging(atom) {
  atom.onmousedown = atom.ontouchstart = function(event) {
    event.preventDefault();
    const moveWithinPlaybox = (pageX, pageY) => {
      const rect = playbox.getBoundingClientRect();
      const newX = Math.min(Math.max(pageX - rect.left - atom.offsetWidth / 2, 0), rect.width - atom.offsetWidth);
      const newY = Math.min(Math.max(pageY - rect.top - atom.offsetHeight / 2, 0), rect.height - atom.offsetHeight);
      atom.style.left = `${newX}px`;
      atom.style.top = `${newY}px`;
    };

    const onMouseMove = (event) => moveWithinPlaybox(event.pageX, event.pageY);
    const onTouchMove = (event) => moveWithinPlaybox(event.touches[0].pageX, event.touches[0].pageY);

    if (isTouch) document.addEventListener("touchmove", onTouchMove);
    else document.addEventListener("mousemove", onMouseMove);

    atom.onmouseup = atom.ontouchend = function() {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("touchmove", onTouchMove);
      atom.onmouseup = null;
      atom.ontouchend = null;
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
    displayBond("Methane (CH₄)", atoms);
  } else if (atomCounts.oxygen === 1 && atomCounts.hydrogen === 2) {
    displayBond("Water (H₂O)", atoms);
  } else if (atomCounts.carbon === 1 && atomCounts.oxygen === 2) {
    displayBond("Carbon Dioxide (CO₂)", atoms);
  } else {
    moleculeNameDisplay.textContent = "";
    bonds.innerHTML = ""; // Clear bonds if no valid molecule
  }
}

function displayBond(name, atoms) {
  moleculeNameDisplay.textContent = name;
  bonds.innerHTML = ""; // Clear previous bonds

  // Draw bonds as connecting lines between atoms
  const positions = atoms.map(atom => ({
    x: atom.offsetLeft + atom.offsetWidth / 2,
    y: atom.offsetTop + atom.offsetHeight / 2,
  }));

  for (let i = 0; i < positions.length - 1; i++) {
    for (let j = i + 1; j <

