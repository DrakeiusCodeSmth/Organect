const expandButton = document.getElementById("expand-button");const atomContainer = document.getElementById("atom-container");
const playbox = document.getElementById("playbox");const bonds = document.getElementById("bonds");
const moleculeNameDisplay = document.getElementById("molecule-name");
expandButton.addEventListener("click", () => {  atomContainer.classList.toggle("expanded");
});
let draggedAtom = null;
document.querySelectorAll(".atom").forEach(atom => {  atom.addEventListener("mousedown", startDrag);
});
function startDrag(event) {  event.preventDefault();
  const target = event.target.closest(".atom");  draggedAtom = target.cloneNode(true);
  draggedAtom.classList.add("playbox-atom");  document.body.appendChild(draggedAtom);
  moveAt(event.pageX, event.pageY);
  function moveAt(pageX, pageY) {
    draggedAtom.style.left = ${pageX - draggedAtom.offsetWidth / 2}px;    draggedAtom.style.top = ${pageY - draggedAtom.offsetHeight / 2}px;
  }
  const onMouseMove = (event) => moveAt(event.pageX, event.pageY);  document.addEventListener("mousemove", onMouseMove);
  draggedAtom.onmouseup = function (event) {
    if (isInsidePlaybox(event.pageX, event.pageY)) {      playbox.appendChild(draggedAtom);
      draggedAtom.style.left = ${event.pageX - playbox.offsetLeft - draggedAtom.offsetWidth / 2}px;      draggedAtom.style.top = ${event.pageY - playbox.offsetTop - draggedAtom.offsetHeight / 2}px;
      enablePlayboxDragging(draggedAtom);      checkBonding();
    } else {      draggedAtom.remove();
    }    cleanup();
  };
  function cleanup() {    document.removeEventListener("mousemove", onMouseMove);
    draggedAtom.onmouseup = null;    draggedAtom = null;
  }}
function isInsidePlaybox(x, y) {
  const rect = playbox.getBoundingClientRect();  return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
}
function enablePlayboxDragging(atom) {
  atom.onmousedown = function(event) {    event.preventDefault();
    const moveWithinPlaybox = (pageX, pageY) => {
      const rect = playbox.getBoundingClientRect();      const newX = Math.min(Math.max(pageX - rect.left - atom.offsetWidth / 2, 0), rect.width - atom.offsetWidth);
      const newY = Math.min(Math.max(pageY - rect.top - atom.offsetHeight / 2, 0), rect.height - atom.offsetHeight);      atom.style.left = ${newX}px;
      atom.style.top = ${newY}px;    };
    const onMouseMove = (event) => moveWithinPlaybox(event.pageX, event.pageY);
    document.addEventListener("mousemove", onMouseMove);
    atom.onmouseup = function () {      document.removeEventListener("mousemove", onMouseMove);
      atom.onmouseup = null;    };
  };}
function checkBonding() {
  const atoms = Array.from(playbox.querySelectorAll(".playbox-atom"));  const atomCounts = { carbon: 0, hydrogen: 0, oxygen: 0 };
  atoms.forEach(atom => {
    atomCounts[atom.id]++;  });
  if (atomCounts.carbon === 1 && atomCounts.hydrogen === 4) {
    displayBond("Methane (CH₄)", atoms);  } else if (atomCounts.oxygen === 1 && atomCounts.hydrogen === 2) {
    displayBond("Water (H₂O)", atoms);  } else if (atomCounts.carbon === 2 && atomCounts.hydrogen === 6) {
    displayBond("Ethane (C₂H₆)", atoms);  } else {
    moleculeNameDisplay.textContent = "";    bonds.innerHTML = ""; // Clear bonds
  }}

function displayBond(name, atoms) {  moleculeNameDisplay.textContent = name;
  bonds.innerHTML = ""; // Clear previous bonds
  const positions = atoms.map(atom => ({    x: atom.offsetLeft + atom.offsetWidth / 2,
    y: atom.offsetTop + atom.offsetHeight / 2,  }));
  for (let i = 0; i < positions.length - 1; i++) {
    for (let j = i + 1; j < positions.length; j++) {      const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("x1", positions[i].x);      line.setAttribute("y1", positions[i].y);
      line.setAttribute("x2", positions[j].x);      line.setAttribute("y2", positions[j].y);
      line.setAttribute("stroke", "black");      line.setAttribute("stroke-width", "2");
      bonds.appendChild(line);    }
  }}
