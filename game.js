let score = 0;

document.getElementById("carbon").addEventListener("dragstart", dragStart);
document.getElementById("hydrogen").addEventListener("dragstart", dragStart);

const gameArea = document.querySelector('.game-area');

gameArea.addEventListener("dragover", (event) => event.preventDefault());
gameArea.addEventListener("drop", dropAtom);

function dragStart(event) {
    event.dataTransfer.setData("atom-type", event.target.dataset.type);
}

function dropAtom(event) {
    event.preventDefault();
    const atomType = event.dataTransfer.getData("atom-type");

    // Clone atom on drop
    const atom = document.createElement("div");
    atom.classList.add("atom");
    atom.setAttribute("data-type", atomType);
    atom.style.left = `${event.clientX - gameArea.offsetLeft - 25}px`;
    atom.style.top = `${event.clientY - gameArea.offsetTop - 25}px`;
    atom.textContent = atomType === "carbon" ? "C" : "H";

    // Add bonding logic
    if (atomType === "hydrogen") {
        atom.addEventListener("dblclick", () => {
            bondAtom(atom);
        });
    }

    // Play drop sound
    const dropSound = document.getElementById("dropSound");
    dropSound.play();

    gameArea.appendChild(atom);
}

function bondAtom(hydrogenAtom) {
    hydrogenAtom.style.backgroundColor = "lightgreen"; // Feedback for bonding
    updateScore(10);

    // Play bond sound
    const bondSound = document.getElementById("bondSound");
    bondSound.play();
}

function updateScore(points) {
    score += points;
    document.getElementById("score").textContent = score;
}

