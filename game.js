document.getElementById('toggle-inventory').addEventListener('click', function() {
  const inventory = document.getElementById('inventory');
  inventory.style.display = inventory.style.display === 'block' ? 'none' : 'block';
});

let atomsInPlay = [];

document.querySelectorAll('.atom').forEach(atom => {
  atom.addEventListener('dragstart', function(e) {
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

  // Check if the atom is already in the play box
  if (!atomsInPlay.includes(atomId)) {
    atomsInPlay.push(atomId);
    
    // Move the atom into the play box
    const newAtom = atom.cloneNode(true); // Clone the image
    newAtom.style.position = 'absolute';
    newAtom.style.left = `${e.offsetX - 25}px`;
    newAtom.style.top = `${e.offsetY - 25}px`;
    e.target.appendChild(newAtom);

    // Add event listener to handle dragging of the new atom
    newAtom.addEventListener('dragstart', function(e) {
      e.dataTransfer.setData('atom-id', atomId);
    });

    // Handle double click to create a "Metana" bond
    newAtom.addEventListener('dblclick', function() {
      if (atomsInPlay.filter(id => id === 'hydrogen').length === 4 && atomsInPlay.includes('carbon')) {
        alert('Metana bond created!');
        // Logic to show the bond can be added here
      }
    });
  }
});
