document.getElementById('toggle-inventory').addEventListener('click', function() {
  const inventory = document.getElementById('inventory');
  inventory.style.display = inventory.style.display === 'block' ? 'none' : 'block';
});

let atomsInPlay = [];

// Add event listeners to the inventory items (drag the image, not the div)
document.querySelectorAll('.atom img').forEach(img => {
  img.addEventListener('dragstart', function(e) {
    // Store the id of the atom being dragged (use the image's parent div id)
    const atomId = e.target.parentElement.id;
    e.dataTransfer.setData('atom-id', atomId);
  });
});

// Allow the play box to accept atoms
document.getElementById('play-box').addEventListener('dragover', function(e) {
  e.preventDefault(); // Allow dropping
});

document.getElementById('play-box').addEventListener('drop', function(e) {
  e.preventDefault();

  const atomId = e.dataTransfer.getData('atom-id');
  const atom = document.getElementById(atomId);

  // Only clone and add the atom if it hasn't been placed in the play box already
  if (!atomsInPlay.includes(atomId)) {
    atomsInPlay.push(atomId);

    // Clone the image of the atom (not the whole div)
    const newAtom = atom.querySelector('img').cloneNode(true);
    newAtom.style.position = 'absolute';
    newAtom.style.left = `${e.offsetX - 25}px`; 
    newAtom.style.top = `${e.offsetY - 25}px`;
    e.target.appendChild(newAtom);

    // Make the cloned atom draggable within the play box
    newAtom.addEventListener('mousedown', function(e) {
      const playBox = document.getElementById('play-box');
      const playBoxRect = playBox.getBoundingClientRect();
      const offsetX = e.clientX - newAtom.getBoundingClientRect().left;
      const offsetY = e.clientY - newAtom.getBoundingClientRect().top;

      // Dynamically drag the atom within the play box
      function moveAtom(e) {
        let newLeft = e.clientX - playBoxRect.left - offsetX;
        let newTop = e.clientY - playBoxRect.top - offsetY;

        // Constrain the atom within the play box
        newLeft = Math.max(0, Math.min(newLeft, playBoxRect.width - 50)); // 50px is the atom width
        newTop = Math.max(0, Math.min(newTop, playBoxRect.height - 50)); // 50px is the atom height

        newAtom.style.left = `${newLeft}px`;
        newAtom.style.top = `${newTop}px`;
      }

      // Add mousemove listener to drag the atom dynamically
      document.addEventListener('mousemove', moveAtom);

      // Stop moving the atom when mouse is released
      document.addEventListener('mouseup', function() {
        document.removeEventListener('mousemove', moveAtom);
      });
    });

    // Double-click to create the Metana bond (if the condition is met)
    newAtom.addEventListener('dblclick', function() {
      const hydrogenCount = atomsInPlay.filter(id => id === 'hydrogen').length;
      const carbonCount = atomsInPlay.filter(id => id === 'carbon').length;

      if (hydrogenCount === 4 && carbonCount === 1) {
        alert('Metana bond created!');
        // Logic for creating the bond can be implemented here
      }
    });
  }
});

// Remove atoms that are dragged outside the play box
document.getElementById('play-box').addEventListener('mouseleave', function(e) {
  const atomsInPlayBox = document.querySelectorAll('#play-box .atom');
  atomsInPlayBox.forEach(atom => {
    const atomRect = atom.getBoundingClientRect();
    const playBoxRect = document.getElementById('play-box').getBoundingClientRect();

    // Remove atom if it's outside the play box
    if (atomRect.left < playBoxRect.left || atomRect.top < playBoxRect.top ||
        atomRect.right > playBoxRect.right || atomRect.bottom > playBoxRect.bottom) {
      atom.remove();
    }
  });
});
