document.addEventListener("DOMContentLoaded", () => {
  const expandButton = document.getElementById("expand-button");
  const atomContainer = document.getElementById("atom-container");
  const playbox = document.getElementById("playbox");

  let draggedAtom = null;

  // Expand/collapse inventory
  expandButton.addEventListener("click", () => {
    atomContainer.classList.toggle("expanded");
  });

  // Add drag behavior to inventory atoms
  document.querySelectorAll(".atom").forEach(atom => {
    atom.addEventListener("mousedown", startDragFromInventory);
  });

  function startDragFromInventory(event) {
    const target = event.target.closest(".atom");
    draggedAtom = target.cloneNode(true);
    draggedAtom.classList.add("playbox-atom");
    document.body.appendChild(draggedAtom);

    moveAt(event.pageX, event.pageY);

    const onMouseMove = (event) => moveAt(event.pageX, event.pageY);
    document.addEventListener("mousemove", onMouseMove);

    draggedAtom.onmouseup = function (event) {
      if (isInsidePlaybox(event.pageX, event.pageY)) {
        // Add atom to playbox
        playbox.appendChild(draggedAtom);
        draggedAtom.style.left = `${event.pageX - playbox.offsetLeft - draggedAtom.offsetWidth / 2}px`;
        draggedAtom.style.top = `${event.pageY - playbox.offsetTop - draggedAtom.offsetHeight / 2}px`;
        enableDraggingWithinPlaybox(draggedAtom);
      } else {
        // Remove atom if dropped outside playbox
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

  function moveAt(pageX, pageY) {
    draggedAtom.style.position = "absolute";
    draggedAtom.style.left = `${pageX - draggedAtom.offsetWidth / 2}px`;
    draggedAtom.style.top = `${pageY - draggedAtom.offsetHeight / 2}px`;
  }

  function isInsidePlaybox(x, y) {
    const rect = playbox.getBoundingClientRect();
    return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
  }

  // Enable dragging for atoms already in playbox
  function enableDraggingWithinPlaybox(atom) {
    atom.onmousedown = function (event) {
      const shiftX = event.clientX - atom.getBoundingClientRect().left;
      const shiftY = event.clientY - atom.getBoundingClientRect().top;

      const moveAtom = (event) => {
        const rect = playbox.getBoundingClientRect();

        // Constrain atom to playbox boundaries
        const newX = Math.min(
          Math.max(event.clientX - rect.left - shiftX, 0),
          rect.width - atom.offsetWidth
        );
        const newY = Math.min(
          Math.max(event.clientY - rect.top - shiftY, 0),
          rect.height - atom.offsetHeight
        );

        atom.style.left = `${newX}px`;
        atom.style.top = `${newY}px`;
      };

      document.addEventListener("mousemove", moveAtom);

      atom.onmouseup = function () {
        document.removeEventListener("mousemove", moveAtom);
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
      createMolecule("Water (H₂O)", atoms, "bent");
    }
  }

  function createMolecule(name, atoms, layout) {
    atoms.forEach(atom => atom.remove());

    const molecule = document.createElement("div");
    molecule.classList.add("molecule");
    playbox.appendChild(molecule);

    const nameTag = document.createElement("div");
    nameTag.classList.add("bond-name");
    nameTag.textContent = name;
    molecule.appendChild(nameTag);

    enableDraggingWithinPlaybox(molecule);
  }
});
