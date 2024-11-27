// Ensure script waits for DOM to load
document.addEventListener("DOMContentLoaded", () => {
  const expandButton = document.getElementById("expand-button");
  const atomContainer = document.getElementById("atom-container");
  const playbox = document.getElementById("playbox");
  const bonds = document.getElementById("bonds");

  // Expand/collapse inventory
  expandButton.addEventListener("click", () => {
    atomContainer.classList.toggle("expanded");
  });

  let draggedAtom = null;

  document.querySelectorAll(".atom").forEach(atom => {
    atom.addEventListener("mousedown", startDrag);
  });

  function startDrag(event) {
    event.preventDefault();

    // Clone the dragged atom
    const target = event.target.closest(".atom");
    draggedAtom = target.cloneNode(true);
    draggedAtom.classList.add("playbox-atom");
    document.body.appendChild(draggedAtom);

    moveAt(event.pageX, event.pageY);

    function moveAt(pageX, pageY) {
      draggedAtom.style.position = "absolute";
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

  function checkBonding() {
    const atoms = Array.from(playbox.querySelectorAll(".playbox-atom"));
    const atomCounts = { carbon: 0, hydrogen: 0, oxygen: 0 };

    atoms.forEach(atom => {
      atomCounts[atom.id]++;
    });

    if (atomCounts.carbon === 1 && atomCounts.hydrogen === 4) {
      console.log("Methane (CH₄) created!");
    } else if (atomCounts.oxygen === 1 && atomCounts.hydrogen === 2) {
      console.log("Water (H₂O) created!");
    }
  }
});
