document.getElementById('toggle-inventory').addEventListener('click', function() {
  const inventory = document.getElementById('inventory');
  inventory.style.display = inventory.style.display === 'block' ? 'none' : 'block';
});

let atomsInPlay = [];

// Make sure the inventory atoms are only draggable and don't move out of the inventory.
document.querySelectorAll('.atom').forEach(atom => {
  atom.addEventListener('dragstart', function(e) {
    // Set data for the atom being dragged
    e.dataTransfer.setData('atom-id', e.target.id);
  });
});

document.getElementById('play-box').addEventListener('dragover', function(e) {
  e.preventDefault();
});

document.getElementById('play-box').addEventListener('drop', function(e) {
  e.preventDefault();
  const atomId = e.dataTransfer.getData('atom-id');
  const atom = document.getElementById(atomId);

  // Only create a new atom if it hasn't been added to the play box yet
  if (!atomsInPlay.includes(atomId)) {
    atomsInPlay.push(atomId);

    // Clone the atom and place it inside the play box (position it based on drop point)
    const newAtom = atom.cloneNode(true);
    newAtom.style.position = 'absolute';
    newAtom.style.left = `${e.offsetX - 25}px`;
    newAtom.style.top = `${e.offsetY - 25}px`;
    e.target.appendChild(newAtom);

    // Make the cloned atom draggable within the play box
    newAtom.addEventListener('dragstart', function(e) {
      e.dataTransfer.setData('atom-id', atomId);
    });

    // Handle double-click to create a bond (Metana)
    newAtom.addEventListener('dblclick', function() {
      if (atomsInPlay.filter(id => id === 'hydrogen').length === 4 && atomsInPlay.includes('carbon')) {
        alert('Metana bond created!');
        // Logic for bond creation can go here
      }
    });
  }
});
