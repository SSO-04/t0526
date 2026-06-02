const app = document.querySelector(".app");
const startButton = document.querySelector(".cat-start");
const catStage = document.querySelector(".cat-stage");
const itemBar = document.querySelector(".item-bar");
const emptyMessage = document.querySelector(".empty-message");
const tabButtons = document.querySelectorAll(".tab-button");

let currentCategory = "accessory";

const dressItems = [
  {
    id: "sunglasses",
    label: "\uC120\uAE00\uB77C\uC2A4",
    src: "img/sunglasses.png",
    alt: "\uC120\uAE00\uB77C\uC2A4",
    category: "accessory"
  },
  {
    id: "ribbon",
    label: "\uB9AC\uBCF8",
    src: "img/ribbon.png",
    alt: "\uB9AC\uBCF8",
    category: "clothes"
  },
  {
    id: "ribbonpin",
    label: "\uB9AC\uBCF8 \uD540",
    src: "img/ribbonpin.png",
    alt: "\uB9AC\uBCF8 \uD540",
    category: "accessory"
  },
  {
    id: "hat",
    label: "\uBAA8\uC790",
    src: "img/hat.png",
    alt: "\uBAA8\uC790",
    category: "hat"
  },
  {
    id: "rat",
    label: "\uC950",
    src: "img/rat.png",
    alt: "\uC950",
    category: "more"
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

function createItemButton(item, index) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "item-button";
  button.dataset.item = item.id;
  button.style.setProperty("--item-order", index);
  button.style.setProperty("--item-delay", `${app.classList.contains("is-started") ? index * 0.12 : 0.95 + index * 0.14}s`);
  button.setAttribute("aria-pressed", "false");

  button.innerHTML = `
    <span class="button-icon-wrap">
      <img src="${item.src}" class="button-icon" alt="">
    </span>
    <span class="button-label">${item.label}</span>
  `;

  button.addEventListener("click", () => toggleItem(item.id, button));
  itemBar.appendChild(button);
}

function renderCategory(category) {
  currentCategory = category;
  itemBar.innerHTML = "";

  const filteredItems = dressItems.filter((item) => item.category === category);
  emptyMessage.hidden = filteredItems.length > 0;

  filteredItems.forEach((item, index) => {
    createItemButton(item, index);
    const button = itemBar.querySelector(`[data-item="${item.id}"]`);
    const itemImage = catStage.querySelector(`[data-item="${item.id}"]`);
    const isOn = itemImage.classList.contains("is-on");

    button.classList.toggle("is-active", isOn);
    button.setAttribute("aria-pressed", String(isOn));
  });
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

tabButtons.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabButtons.forEach((button) => {
      button.classList.toggle("is-active", button === tab);
    });

    renderCategory(tab.dataset.category);
  });
});

document.querySelectorAll(".round-nav").forEach((button) => {
  button.addEventListener("click", () => {
    const direction = button.getAttribute("aria-label").includes("\uB2E4\uC74C") ? 1 : -1;
    itemBar.scrollBy({ left: direction * 120, behavior: "smooth" });
  });
});

dressItems.forEach(createDressItem);
renderCategory(currentCategory);
