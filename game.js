// Selecting elements
const expandButton = document.getElementById("expand-button");
const atomContainer = document.getElementById("atom-container");

// Toggle inventory expand/collapse
expandButton.addEventListener("click", () => {
  if (atomContainer.classList.contains("expanded")) {
    atomContainer.classList.remove("expanded");
  } else {
    atomContainer.classList.add("expanded");
  }
});
