let atomCount = { hydrogen: 0, carbon: 0 };
const playbox = document.getElementById("playbox");

document.querySelectorAll(".atom").forEach(atom => {
    atom.addEventListener("dragstart", handleDragStart);
});

playbox.addEventListener("dragover", handleDragOver);
playbox.addEventListener("drop", handleDrop);

function handleDragStart(e) {
    e.dataTransfer.setData("atom-type", e.target.dataset.type);
}

function handleDragOver(e) {
    e.preventDefault();
}

function handleDrop(e) {
    e.preventDefault();
    const atomType = e.dataTransfer.getData("atom-type");

    const newAtom = document.createElement("div");
    newAtom.classList.add("atom", atomType);
    newAtom.style.position = "absolute";
    newAtom.style.left = `${e.offsetX - 25}px`;
    newAtom.style.top = `${e.offsetY - 25}px`;
    playbox.appendChild(newAtom);

    atomCount[atomType]++;
    if (atomType === "carbon") {
        newAtom.addEventListener("dblclick", () => createBond(newAtom));
    }
}

function createBond(carbonAtom) {
    const hydrogens = Array.from(playbox.getElementsByClassName("hydrogen"));

    if (atomCount.hydrogen >= 4) {
        const nearbyHydrogens = hydrogens.slice(0, 4);
        nearbyHydrogens.forEach((hydrogen, index) => {
            const bond = document.createElement("div");
            bond.classList.add("bond");
            playbox.appendChild(bond);

            // Position and rotate bond between Carbon and each Hydrogen
            positionBond(carbonAtom, hydrogen, bond);
        });
    }
}

function positionBond(carbonAtom, hydrogen, bond) {
    const cRect = carbonAtom.getBoundingClientRect();
    const hRect = hydrogen.getBoundingClientRect();
    const cx = cRect.left + cRect.width / 2;
    const cy = cRect.top + cRect.height / 2;
    const hx = hRect.left + hRect.width / 2;
    const hy = hRect.top + hRect.height / 2;

    const dx = hx - cx;
    const dy = hy - cy;
    const distance = Math.sqrt(dx * dx + dy * dy);

    bond.style.width = `${distance}px`;
    bond.style.left = `${cx}px`;
    bond.style.top = `${cy}px`;

    const angle = Math.atan2(dy, dx) * (180 / Math.PI);
    bond.style.transform = `rotate(${angle}deg)`;
}
