/* Ember & Third — cart storage
   Cart is persisted to localStorage as an array of { id, weightOz, qty } */

const CART_KEY = "emberThirdCart";

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCount();
}

function addToCart(id, weightOz, qty) {
  const cart = getCart();
  const existing = cart.find((i) => i.id === id && i.weightOz === weightOz);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id, weightOz, qty });
  }
  saveCart(cart);
}

function updateCartQty(index, qty) {
  const cart = getCart();
  if (!cart[index]) return;
  if (qty <= 0) {
    cart.splice(index, 1);
  } else {
    cart[index].qty = qty;
  }
  saveCart(cart);
}

function removeFromCart(index) {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
}

function cartCount() {
  return getCart().reduce((sum, i) => sum + i.qty, 0);
}

function cartSubtotal() {
  return getCart().reduce((sum, i) => {
    const p = findProduct(i.id);
    if (!p) return sum;
    return sum + p.price * i.qty;
  }, 0);
}

function formatPrice(n) {
  return "$" + n.toFixed(2);
}

function updateCartCount() {
  document.querySelectorAll("[data-cart-count]").forEach((el) => {
    const count = cartCount();
    el.textContent = count;
    el.style.display = count > 0 ? "inline-flex" : "none";
  });
}

document.addEventListener("DOMContentLoaded", updateCartCount);
