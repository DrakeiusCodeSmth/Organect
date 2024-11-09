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
  const newAtom = atom.cloneNode(true);
  newAtom.style.position = 'absolute';
  newAtom.style.left = `${e.offsetX - 25}px`;
  newAtom.style.top = `${e.offsetY - 25}px`;

  if (!atomsInPlay.includes(atomId)) {
    atomsInPlay.push(atomId);
  }

  e.target.appendChild(newAtom);

  newAtom.addEventListener('dragstart', function(e) {
    e.dataTransfer.setData('atom-id', atomId);
  });

  newAtom.addEventListener('dblclick', function() {
    if (atomsInPlay.filter(id => id === 'hydrogen').length === 4 && atomsInPlay.includes('carbon')) {
      alert('Metana bond created!');
      // Logic to show the bond can be added here
    }
  });
});

document.getElementById('play-box').addEventListener('dragleave', function(e) {
  const atomsInPlay = document.querySelectorAll('#play-box .atom');
  atomsInPlay.forEach(atom => {
    if (parseInt(atom.style.left) > 500 || parseInt(atom.style.top) > 500) {
      atom.remove();
    }
  });
});
