document.getElementById('toggle-inventory').addEventListener('click', function() {
  const inventory = document.getElementById('inventory');
  inventory.style.display = inventory.style.display === 'block' ? 'none' : 'block';
});

let atomsInPlay = [];

// Add event listeners to the inventory items
document.querySelectorAll('.atom').forEach(atom => {
  atom.addEventListener('dragstart', function(e) {
    // Store the id of the atom being dragged
    e.dataTransfer.setData('atom-id', e.target.id);
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

    // Clone the atom (image) and position it in the play box
    const newAtom = atom.cloneNode(true);
    newAtom.style.position = 'absolute';
    newAtom.style.left = `${e.offsetX - 25}px`;
    newAtom.style.top = `${e.offsetY - 25}px`;
    e.target.appendChild(newAtom);

    // Make the cloned atom draggable
    newAtom.addEventListener('dragstart', function(e) {
      e.dataTransfer.setData('atom-id', atomId);
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
