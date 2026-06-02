const app = document.querySelector(".app");
const startButton = document.querySelector(".cat-start");
const catStage = document.querySelector(".cat-stage");
const itemBar = document.querySelector(".item-bar");

const dressItems = [
  {
    id: "sunglasses",
    label: "Sunglasses",
    src: "img/sunglasses.png",
    alt: "Sunglasses"
  },
  {
    id: "hat",
    label: "Hat",
    src: "img/hat.png",
    alt: "Hat"
  },
  {
    id: "ribbon",
    label: "Ribbon",
    src: "img/ribbon.png",
    alt: "Ribbon"
  },
  {
    id: "clothes",
    label: "Clothes",
    src: "img/clothes.png",
    alt: "Clothes"
  }
];

function createDressItem(item) {
  const image = document.createElement("img");
  image.src = item.src;
  image.alt = item.alt;
  image.className = `dress-item ${item.id}`;
  image.dataset.item = item.id;
  catStage.appendChild(image);
}

function createItemButton(item) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "item-button";
  button.dataset.item = item.id;
  button.setAttribute("aria-pressed", "false");

  button.innerHTML = `
    <img src="${item.src}" class="button-icon" alt="">
    <span class="button-label">${item.label}</span>
  `;

  button.addEventListener("click", () => toggleItem(item.id, button));
  itemBar.appendChild(button);
}

function toggleItem(itemId, button) {
  const targetItem = catStage.querySelector(`[data-item="${itemId}"]`);
  const isActive = targetItem.classList.toggle("is-on");

  button.classList.toggle("is-active", isActive);
  button.setAttribute("aria-pressed", String(isActive));

  if (isActive) {
    targetItem.style.animation = "none";
    targetItem.offsetHeight;
    targetItem.style.animation = "";
  }
}

startButton.addEventListener("click", () => {
  app.classList.add("is-started");
});

dressItems.forEach((item) => {
  createDressItem(item);
  createItemButton(item);
});
