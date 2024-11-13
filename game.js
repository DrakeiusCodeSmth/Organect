const expandButton = document.getElementById("expand-button");
const atomContainer = document.getElementById("atom-container");
const playbox = document.getElementById("playbox");
const moleculeNameDisplay = document.getElementById("molecule-name");

expandButton.addEventListener("click", () => {
  atomContainer.classList.toggle("expanded");
});

let draggedAtom = null;
let isTouch = false;  // Detect touch events

document.querySelectorAll(".atom").forEach(atom => {
  atom.addEventListener("mousedown", startDrag);
  atom.addEventListener("touchstart", startDrag, { passive: true }); // Support touch
});

function startDrag(event) {
  event.preventDefault();
  isTouch = event.type === "touchstart";
  
  // Clone and scale atom for playbox
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
      enablePlayboxDragging(draggedAtom); // Make draggable within playbox
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

// Enable draggable atoms within playbox
function enablePlayboxDragging(atom) {
  atom.onmousedown = atom.ontouchstart = function(event) {
    event.preventDefault();
    const moveWithinPlaybox = (pageX, pageY) => {
      atom.style.left = pageX - playbox.offsetLeft - atom.offsetWidth / 2 + "px";
      atom.style.top = pageY - playbox.offsetTop - atom.offsetHeight / 2 + "px";
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
  const atomsInPlaybox = Array.from(playbox.querySelectorAll(".atom"));
  let carbonCount = 0;
  let hydrogenCount = 0;
  let oxygenCount = 0;

  atomsInPlaybox.forEach(atom => {
    if (atom.id === "carbon") carbonCount++;
    if (atom.id === "hydrogen") hydrogenCount++;
    if (atom.id === "oxygen") oxygenCount++;
  });

  moleculeNameDisplay.textContent = 
    carbonCount === 1 && hydrogenCount === 4 ? "Methane (CH₄)" :
    oxygenCount === 1 && hydrogenCount === 2 ? "Water (H₂O)" :
    carbonCount === 1 && oxygenCount === 2 ? "Carbon Dioxide (CO₂)" : "";
}
