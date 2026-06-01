const products = [
  { id: 1, name: "Apple", description: "Crisp and sweet apples for snacking or baking.", price: 1.25, unit: "each", emoji: "🍎" },
  { id: 2, name: "Banana", description: "Soft bananas that are great for quick energy.", price: 0.75, unit: "each", emoji: "🍌" },
  { id: 3, name: "Orange", description: "Juicy oranges with a bright citrus flavor.", price: 1.1, unit: "each", emoji: "🍊" },
  { id: 4, name: "Strawberry", description: "Fresh strawberries for desserts and smoothies.", price: 3.5, unit: "pint", emoji: "🍓" },
  { id: 5, name: "Grape", description: "Sweet grapes sold by the pound for easy sharing.", price: 2.1, unit: "pound", emoji: "🍇" },
  { id: 6, name: "Kiwi", description: "Tangy kiwi fruit with a bright green center.", price: 1.8, unit: "each", emoji: "🥝" },
  { id: 7, name: "Pineapple", description: "Tropical pineapple with a bold, sunny flavor.", price: 4.75, unit: "each", emoji: "🍍" },
  { id: 8, name: "Watermelon", description: "Refreshing watermelon sold by the slice.", price: 0.95, unit: "slice", emoji: "🍉" },
  { id: 9, name: "Pear", description: "Soft and fragrant pears with a mellow taste.", price: 1.45, unit: "each", emoji: "🍐" },
  { id: 10, name: "Mango", description: "Juicy mangoes with a rich tropical sweetness.", price: 2.65, unit: "each", emoji: "🥭" }
];

const state = {
  view: "products",
  selectedProductId: 1,
  cart: loadCart()
};

const app = document.getElementById("app");
const pageTitle = document.getElementById("pageTitle");
const cartSummary = document.getElementById("cartSummary");
const toast = document.getElementById("toast");
const navShell = document.getElementById("navShell");
const navLinks = Array.from(document.querySelectorAll(".nav-link"));
let toastTimer;

function loadCart() {
  try {
    const stored = localStorage.getItem("fruit-shop-cart");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveCart() {
  localStorage.setItem("fruit-shop-cart", JSON.stringify(state.cart));
}

function currency(value) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
}

function getProduct(id) {
  return products.find((product) => product.id === id);
}

function getCartItemCount() {
  return state.cart.reduce((total, item) => total + item.quantity, 0);
}

function getCartTotal() {
  return state.cart.reduce((total, item) => {
    const product = getProduct(item.id);
    return total + (product ? product.price * item.quantity : 0);
  }, 0);
}

function getLineTotal(item) {
  const product = getProduct(item.id);
  return product ? product.price * item.quantity : 0;
}

function setView(view, productId = null) {
  state.view = view;
  if (productId) {
    state.selectedProductId = productId;
  }
  window.location.hash = view === "products" ? "#products" : view === "details" ? `#details-${state.selectedProductId}` : `#${view}`;
  render();
}

function updateNavState() {
  navLinks.forEach((link) => {
    const active = link.dataset.view === state.view;
    link.classList.toggle("active", active);
    link.textContent = window.innerWidth < 300 ? link.dataset.short : link.dataset.full;
  });

  const shouldCollapse = window.innerWidth < 300;
  navShell.classList.toggle("collapsed", shouldCollapse);
  document.body.classList.toggle("nav-collapsed", shouldCollapse);
}

function addToCart(productId, quantity) {
  const qty = Math.max(1, Number(quantity) || 1);
  const existing = state.cart.find((item) => item.id === productId);
  if (existing) {
    existing.quantity += qty;
  } else {
    state.cart.push({ id: productId, quantity: qty });
  }
  saveCart();
  const product = getProduct(productId);
  showToast(`${qty} ${product ? product.name : "item"}${qty > 1 ? "s" : ""} added to cart`);
  render();
}

function updateCartQuantity(productId, quantity) {
  const item = state.cart.find((cartItem) => cartItem.id === productId);
  if (!item) {
    return;
  }

  const nextQuantity = Number(quantity);
  if (Number.isNaN(nextQuantity) || nextQuantity < 1) {
    removeFromCart(productId);
    return;
  }

  item.quantity = nextQuantity;
  saveCart();
  render();
}

function incrementCartQuantity(productId, delta) {
  const item = state.cart.find((cartItem) => cartItem.id === productId);
  if (!item) {
    return;
  }
  item.quantity += delta;
  if (item.quantity < 1) {
    removeFromCart(productId);
    return;
  }
  saveCart();
  render();
}

function removeFromCart(productId) {
  state.cart = state.cart.filter((item) => item.id !== productId);
  saveCart();
  render();
}

function updateGlobalState() {
  cartSummary.textContent = `Cart: ${getCartItemCount()} items | ${currency(getCartTotal())}`;
  updateNavState();
}

function showToast(message) {
  if (!toast) {
    return;
  }

  window.clearTimeout(toastTimer);
  toast.textContent = `✓ ${message}`;
  toast.classList.add("visible");
  toastTimer = window.setTimeout(() => {
    toast.classList.remove("visible");
    toast.textContent = "";
  }, 1800);
}

function renderProducts() {
  const grid = document.createElement("div");
  grid.className = "products-grid";

  products.forEach((product) => {
    const card = document.getElementById("productCardTemplate").content.firstElementChild.cloneNode(true);
    card.querySelector(".product-emoji").textContent = product.emoji;
    card.querySelector("h2").textContent = product.name;
    card.querySelector(".price").textContent = `${currency(product.price)} / ${product.unit}`;
    card.querySelector(".description").textContent = product.description;

    const qtyInput = card.querySelector("input");
    card.querySelector(".details-button").addEventListener("click", () => {
      state.selectedProductId = product.id;
      setView("details", product.id);
    });
    card.querySelector(".add-button").addEventListener("click", () => {
      addToCart(product.id, qtyInput.value);
      qtyInput.value = 1;
    });

    grid.appendChild(card);
  });

  return grid;
}

function renderDetails() {
  const product = getProduct(state.selectedProductId) || products[0];
  const card = document.createElement("article");
  card.className = "details-card";
  card.innerHTML = `
    <div class="details-layout">
      <div class="details-hero">
        <div class="details-emoji" aria-hidden="true">${product.emoji}</div>
        <div>
          <p class="eyebrow">Selected product</p>
          <h2>${product.name}</h2>
          <p class="description">${product.description}</p>
          <p class="meta">Price per unit: <strong>${currency(product.price)} / ${product.unit}</strong></p>
          <p class="meta">Unit type: <strong>${product.unit}</strong></p>
        </div>
      </div>
      <div class="details-actions">
        <button class="secondary-button" type="button" id="backToProducts">Back to Products</button>
        <button class="primary-button" type="button" id="addSelected">Add to Cart</button>
      </div>
    </div>
  `;

  card.querySelector("#backToProducts").addEventListener("click", () => setView("products"));
  card.querySelector("#addSelected").addEventListener("click", () => addToCart(product.id, 1));
  return card;
}

function renderCart() {
  const wrapper = document.createElement("section");

  if (state.cart.length === 0) {
    wrapper.innerHTML = `
      <div class="empty-state">
        <h2>Your cart is empty</h2>
        <p>Browse the products page to add fruit items to the cart.</p>
        <button class="primary-button" type="button" id="goProducts">Go to Products</button>
      </div>
    `;
    wrapper.querySelector("#goProducts").addEventListener("click", () => setView("products"));
    return wrapper;
  }

  wrapper.className = "checkout-layout";
  const list = document.createElement("div");
  list.className = "summary-list";

  state.cart.forEach((item) => {
    const product = getProduct(item.id);
    if (!product) {
      return;
    }

    const row = document.createElement("article");
    row.className = "summary-row";
    row.innerHTML = `
      <div class="summary-row-top">
        <div>
          <h3>${product.emoji} ${product.name}</h3>
          <p class="meta">${currency(product.price)} / ${product.unit}</p>
        </div>
        <strong class="total-figure">${currency(getLineTotal(item))}</strong>
      </div>
      <div class="cart-actions">
        <label class="qty-control">
          <span>Quantity</span>
          <input class="cart-qty" type="number" min="1" value="${item.quantity}" />
        </label>
        <button class="secondary-button" type="button">-</button>
        <button class="secondary-button" type="button">+</button>
        <button class="danger-button" type="button">Remove</button>
      </div>
    `;

    const [decreaseButton, increaseButton, removeButton] = row.querySelectorAll(".secondary-button, .danger-button");
    const qtyInput = row.querySelector(".cart-qty");
    qtyInput.addEventListener("change", () => updateCartQuantity(item.id, qtyInput.value));
    decreaseButton.addEventListener("click", () => incrementCartQuantity(item.id, -1));
    increaseButton.addEventListener("click", () => incrementCartQuantity(item.id, 1));
    removeButton.addEventListener("click", () => removeFromCart(item.id));
    list.appendChild(row);
  });

  const footer = document.createElement("div");
  footer.className = "checkout-card";
  footer.innerHTML = `
    <div class="cart-total">
      <span>Cart Total</span>
      <strong>${currency(getCartTotal())}</strong>
    </div>
    <div class="checkout-actions">
      <button class="secondary-button" type="button" id="continueShopping">Continue Shopping</button>
      <button class="primary-button" type="button" id="goCheckout">Go to Checkout</button>
    </div>
  `;
  footer.querySelector("#continueShopping").addEventListener("click", () => setView("products"));
  footer.querySelector("#goCheckout").addEventListener("click", () => setView("checkout"));

  wrapper.append(list, footer);
  return wrapper;
}

function renderCheckout() {
  const wrapper = document.createElement("section");

  if (state.cart.length === 0) {
    wrapper.innerHTML = `
      <div class="empty-state">
        <h2>Nothing to checkout</h2>
        <p>Add fruit items to the cart before processing an order.</p>
        <button class="primary-button" type="button" id="goProductsCheckout">Go to Products</button>
      </div>
    `;
    wrapper.querySelector("#goProductsCheckout").addEventListener("click", () => setView("products"));
    return wrapper;
  }

  wrapper.className = "checkout-layout";
  const list = document.createElement("div");
  list.className = "checkout-card";
  list.innerHTML = `
    <h2>Order Summary</h2>
    <div class="checkout-grid"></div>
    <div class="checkout-total">
      <span>Total</span>
      <strong>${currency(getCartTotal())}</strong>
    </div>
    <div class="checkout-actions">
      <button class="primary-button" type="button" id="processOrder">Process Order</button>
    </div>
  `;

  const grid = list.querySelector(".checkout-grid");
  state.cart.forEach((item) => {
    const product = getProduct(item.id);
    if (!product) {
      return;
    }
    const row = document.createElement("div");
    row.className = "checkout-item";
    row.innerHTML = `
      <div>
        <strong>${product.name}</strong>
        <p class="meta">${product.emoji} ${product.description}</p>
      </div>
      <span>Qty ${item.quantity}</span>
      <span>${currency(product.price)} / ${product.unit}</span>
      <strong>${currency(getLineTotal(item))}</strong>
    `;
    grid.appendChild(row);
  });

  list.querySelector("#processOrder").addEventListener("click", () => {
    state.cart = [];
    saveCart();
    alert("Order processed in prototype mode.");
    setView("products");
  });

  wrapper.append(list);
  return wrapper;
}

function render() {
  const titleMap = {
    products: "Products",
    details: "ProductDetails",
    cart: "ShoppingCart",
    checkout: "Checkout"
  };

  pageTitle.textContent = titleMap[state.view] || "Products";
  app.replaceChildren();

  switch (state.view) {
    case "details":
      app.appendChild(renderDetails());
      break;
    case "cart":
      app.appendChild(renderCart());
      break;
    case "checkout":
      app.appendChild(renderCheckout());
      break;
    default:
      app.appendChild(renderProducts());
      state.view = "products";
      break;
  }

  updateGlobalState();
}

function syncViewFromHash() {
  const hash = window.location.hash.replace("#", "");
  if (hash.startsWith("details-")) {
    const id = Number(hash.replace("details-", ""));
    if (getProduct(id)) {
      state.selectedProductId = id;
      state.view = "details";
      return;
    }
  }

  if (hash === "cart" || hash === "checkout" || hash === "products") {
    state.view = hash;
    return;
  }

  state.view = "products";
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const targetView = link.dataset.view;
    if (targetView === "details") {
      setView("details", state.selectedProductId);
      return;
    }
    setView(targetView);
  });
});

window.addEventListener("hashchange", () => {
  syncViewFromHash();
  render();
});
window.addEventListener("resize", () => {
  updateNavState();
});

syncViewFromHash();
updateNavState();
render();
