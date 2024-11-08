const inventory = document.querySelector('.inventory');
const workspace = document.getElementById('workspace');

// Drag start event for inventory atoms
inventory.addEventListener('dragstart', (event) => {
    event.dataTransfer.setData('type', event.target.dataset.type);
});

// Drag over workspace to allow drop
workspace.addEventListener('dragover', (event) => {
    event.preventDefault();
});

// Drop event in workspace
workspace.addEventListener('drop', (event) => {
    event.preventDefault();
    const type = event.dataTransfer.getData('type');

    // Clone the dragged atom from inventory
    const newAtom = document.createElement('div');
    newAtom.classList.add('atom');
    newAtom.setAttribute('data-type', type);
    newAtom.style.position = 'absolute';
    newAtom.style.left = `${event.clientX - workspace.offsetLeft - 25}px`;
    newAtom.style.top = `${event.clientY - workspace.offsetTop - 25}px`;

    if (type === 'carbon') {
        newAtom.textContent = 'C';
        newAtom.addEventListener('dblclick', bondHydrogens);
    } else if (type === 'hydrogen') {
        newAtom.textContent = 'H';
    }

    workspace.appendChild(newAtom);
});

// Bonding function
function bondHydrogens(event) {
    const carbon = event.target;
    const hydrogens = Array.from(workspace.querySelectorAll('.atom[data-type="hydrogen"]'));
    const bondDistance = 100;
    const angles = [0, 90, 180, 270]; // Position hydrogens around the carbon

    hydrogens.slice(0, 4).forEach((hydrogen, index) => {
        const angleInRadians = angles[index] * (Math.PI / 180);
        const x = bondDistance * Math.cos(angleInRadians);
        const y = bondDistance * Math.sin(angleInRadians);
        hydrogen.style.left = `${parseFloat(carbon.style.left) + 25 + x}px`;
        hydrogen.style.top = `${parseFloat(carbon.style.top) + 25 + y}px`;

        // Create a bond line
        const bond = document.createElement('div');
        bond.classList.add('bond');
        bond.style.position = 'absolute';
        bond.style.width = `${bondDistance}px`;
        bond.style.height = '4px';
        bond.style.backgroundColor = 'grey';
        bond.style.transformOrigin = '0 0';
        bond.style.left = `${parseFloat(carbon.style.left) + 25}px`;
        bond.style.top = `${parseFloat(carbon.style.top) + 25}px`;
        bond.style.transform = `rotate(${angles[index]}deg)`;
        workspace.appendChild(bond);
    });
}
