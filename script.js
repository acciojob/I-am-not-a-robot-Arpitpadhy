//your code here
const images = ["img1", "img2", "img3", "img4", "img5"];
const tilesContainer = document.getElementById("tiles");
const resetBtn = document.getElementById("reset");
const verifyBtn = document.getElementById("verify");
const message = document.getElementById("para");

let selected = [];

// Generate 6 images: 5 unique + 1 duplicate
function generateTiles() {
  tilesContainer.innerHTML = "";
  message.textContent = "";
  resetBtn.style.display = "none";
  verifyBtn.style.display = "none";
  selected = [];

  // Pick a random image to duplicate
  const duplicate = images[Math.floor(Math.random() * images.length)];
  const allImages = [...images, duplicate];

  // Shuffle
  allImages.sort(() => Math.random() - 0.5);

  // Render
  allImages.forEach((cls, index) => {
    const img = document.createElement("img");
    img.className = cls;
    img.dataset.index = index;
    img.addEventListener("click", () => handleClick(img));
    tilesContainer.appendChild(img);
  });
}

function handleClick(img) {
  if (selected.length >= 2) return; // only allow 2 selections
  if (selected.includes(img)) return; // prevent double-click same tile

  img.classList.add("selected");
  selected.push(img);

  resetBtn.style.display = "inline-block";

  if (selected.length === 2) {
    verifyBtn.style.display = "inline-block";
  }
}

resetBtn.addEventListener("click", () => {
  generateTiles();
});

verifyBtn.addEventListener("click", () => {
  verifyBtn.style.display = "none";
  const [img1, img2] = selected;
  if (img1.className === img2.className) {
    message.textContent = "You are a human. Congratulations!";
  } else {
    message.textContent =
      "We can't verify you as a human. You selected the non-identical tiles.";
  }
});

// Initialize
generateTiles();
