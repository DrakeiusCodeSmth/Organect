document.addEventListener("DOMContentLoaded", () => {
  const expandButton = document.getElementById("expand-button");
  const atomContainer = document.getElementById("atom-container");
  const playbox = document.getElementById("playbox");

  let draggedAtom = null;
  let draggedBond = null;  // Added for bond dragging behavior

  // Expand/collapse inventory
  expandButton.addEventListener("click", () => {
    atomContainer.classList.toggle("expanded");
  });

  // Add drag behavior to inventory atoms
  document.querySelectorAll(".atom").forEach(atom => {
    atom.addEventListener("mousedown", startDragFromInventory);
  });

  // Add drag behavior for bonds if any
  document.querySelectorAll(".bond").forEach(bond => {
    bond.addEventListener("mousedown", startDragFromBond);
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
        playbox.appendChild(draggedAtom);
        draggedAtom.style.left = `${event.pageX - playbox.offsetLeft - draggedAtom.offsetWidth / 2}px`;
        draggedAtom.style.top = `${event.pageY - playbox.offsetTop - draggedAtom.offsetHeight / 2}px`;
        enableDragging(draggedAtom);  // Make atom draggable
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

  function startDragFromBond(event) {
    const target = event.target.closest(".bond");
    draggedBond = target.cloneNode(true);
    draggedBond.classList.add("playbox-bond");
    document.body.appendChild(draggedBond);

    moveAt(event.pageX, event.pageY);

    const onMouseMove = (event) => moveAt(event.pageX, event.pageY);
    document.addEventListener("mousemove", onMouseMove);

    draggedBond.onmouseup = function (event) {
      if (isInsidePlaybox(event.pageX, event.pageY)) {
        playbox.appendChild(draggedBond);
        draggedBond.style.left = `${event.pageX - playbox.offsetLeft - draggedBond.offsetWidth / 2}px`;
        draggedBond.style.top = `${event.pageY - playbox.offsetTop - draggedBond.offsetHeight / 2}px`;
        enableDragging(draggedBond); // Make bond draggable
        checkBonding();
      } else {
        draggedBond.remove();
      }
      cleanup();
    };

    function cleanup() {
      document.removeEventListener("mousemove", onMouseMove);
      draggedBond.onmouseup = null;
      draggedBond = null;
    }
  }

  function moveAt(pageX, pageY) {
    draggedAtom.style.position = "absolute";
    draggedAtom.style.left = `${pageX - draggedAtom.offsetWidth / 2}px`;
    draggedAtom.style.top = `${pageY - draggedAtom.offsetHeight / 2}px`;

    if (draggedBond) {
      draggedBond.style.position = "absolute";
      draggedBond.style.left = `${pageX - draggedBond.offsetWidth / 2}px`;
      draggedBond.style.top = `${pageY - draggedBond.offsetHeight / 2}px`;
    }
  }

  function isInsidePlaybox(x, y) {
    const rect = playbox.getBoundingClientRect();
    return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
  }

  function enableDragging(element) {
    element.onmousedown = function (event) {
      const shiftX = event.clientX - element.getBoundingClientRect().left;
      const shiftY = event.clientY - element.getBoundingClientRect().top;

      const moveElement = (event) => {
        const rect = playbox.getBoundingClientRect();

        // Constrain element to playbox boundaries
        const newX = Math.min(
          Math.max(event.clientX - rect.left - shiftX, 0),
          rect.width - element.offsetWidth
        );
        const newY = Math.min(
          Math.max(event.clientY - rect.top - shiftY, 0),
          rect.height - element.offsetHeight
        );

        element.style.left = `${newX}px`;
        element.style.top = `${newY}px`;
      };

      document.addEventListener("mousemove", moveElement);

      element.onmouseup = function () {
        document.removeEventListener("mousemove", moveElement);
        element.onmouseup = null;
      };
    };

    element.ondragstart = function () {
      return false;
    };
  }

  function checkBonding() {
    const atoms = Array.from(playbox.querySelectorAll(".playbox-atom"));
    const atomCounts = { carbon: 0, hydrogen: 0, oxygen: 0 };

    atoms.forEach(atom => {
      atomCounts[atom.id]++;
    });

    if (atomCounts.carbon === 1 && atomCounts.hydrogen === 4) {
      createBondingImage("ch4bond.png");
    } else if (atomCounts.oxygen === 1 && atomCounts.hydrogen === 2) {
      createBondingImage("h2obond.png");
    }
  }

  function createBondingImage(imageSrc) {
    playbox.querySelectorAll(".playbox-atom").forEach(atom => atom.remove());

    const bondImage = document.createElement("img");
    bondImage.src = `./images/${imageSrc}`;
    bondImage.classList.add("bonding-image");

    // Ensure the background is transparent by setting the style
    bondImage.style.background = "transparent";
    playbox.appendChild(bondImage);

    // Center bonding image in playbox
    bondImage.style.position = "absolute";
    bondImage.style.left = "50%";
    bondImage.style.top = "50%";
    bondImage.style.transform = "translate(-50%, -50%)";

    enableDragging(bondImage);
  }
});
