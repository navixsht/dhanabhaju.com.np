/* Ember & Third — page rendering
   Each function below only runs if its target element exists on the
   current page, so this one file can be included everywhere. */

function roastLabel(roast) {
  if (roast <= 3) return "Light roast";
  if (roast <= 6) return "Medium roast";
  return "Dark roast";
}

function roastGaugeHTML(roast) {
  const pct = ((roast - 1) / 9) * 100;
  return `
    <div class="roast-gauge">
      <span class="label">Light</span>
      <div class="track"><span class="marker" style="left:${pct}%;"></span></div>
      <span class="label">Dark</span>
    </div>
  `;
}

function productCardHTML(p) {
  return `
    <a class="product-card" href="product.html?id=${p.id}">
      <div class="thumb"><img src="${p.image}" alt="${p.name}" loading="lazy" /></div>
      <div class="card-body">
        <p class="product-lot">${p.lot}</p>
        <h3>${p.name}</h3>
        <p class="product-origin">${p.origin} · ${p.process}</p>
        <p class="product-notes">${p.notes.join(" · ")}</p>
        ${roastGaugeHTML(p.roast)}
        <div class="card-footer">
          <span class="price">${formatPrice(p.price)}</span>
          <span class="product-origin">${p.weightOz}oz</span>
        </div>
      </div>
    </a>
  `;
}

/* ---------- Shop grid (index.html) ---------- */
function renderShopGrid() {
  const grid = document.getElementById("product-grid");
  if (!grid) return;
  grid.innerHTML = PRODUCTS.map(productCardHTML).join("");
}

/* ---------- Product detail (product.html) ---------- */
function renderProductDetail() {
  const container = document.getElementById("product-detail");
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const product = findProduct(params.get("id")) || PRODUCTS[0];

  document.getElementById("page-title").textContent = `${product.name} — Ember & Third`;

  container.innerHTML = `
    <div class="gallery">
      <img src="${product.image}" alt="${product.name}" />
    </div>
    <div class="pd-info">
      <p class="pd-lot">${product.lot}</p>
      <h1 class="pd-title">${product.name}</h1>
      <p class="pd-origin">${product.region}, ${product.origin} · ${product.process}</p>
      <p class="pd-price">${formatPrice(product.price)} / ${product.weightOz}oz</p>

      <p class="pd-blurb">${product.blurb}</p>

      <ul class="tasting-notes">
        ${product.notes.map((n) => `<li>${n}</li>`).join("")}
      </ul>

      <div class="pd-gauge-block">
        <span class="product-lot">${roastLabel(product.roast)} · ${product.roast}/10</span>
        ${roastGaugeHTML(product.roast)}
      </div>

      <dl class="pd-facts">
        <div>
          <dt>Process</dt>
          <dd>${product.process}</dd>
        </div>
        <div>
          <dt>Body</dt>
          <dd>${product.body}</dd>
        </div>
        <div>
          <dt>Weight</dt>
          <dd>${product.weightOz}oz</dd>
        </div>
      </dl>

      <form id="add-to-cart-form">
        <div class="pd-purchase">
          <div class="field">
            <label for="qty">Quantity</label>
            <input type="text" id="qty" class="qty-input" value="1" inputmode="numeric" />
          </div>
          <button type="submit" class="btn btn-primary">Add to cart</button>
        </div>
        <p class="section-note" id="add-confirm" style="min-height:1.2em;"></p>
      </form>
    </div>
  `;

  document.getElementById("add-to-cart-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const qty = Math.max(1, parseInt(document.getElementById("qty").value, 10) || 1);
    addToCart(product.id, product.weightOz, qty);
    document.getElementById("add-confirm").textContent = `Added ${qty} × ${product.name} to cart.`;
  });
}

/* ---------- Cart page (cart.html) ---------- */
function renderCartPage() {
  const container = document.getElementById("cart-content");
  if (!container) return;

  const cart = getCart();

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <h2>Your cart is empty</h2>
        <p>Nothing in here yet — go pick a lot.</p>
        <a href="index.html#shop" class="btn btn-primary" style="margin-top:16px;">Shop current lots</a>
      </div>
    `;
    return;
  }

  const rows = cart
    .map((item, index) => {
      const p = findProduct(item.id);
      if (!p) return "";
      return `
        <tr>
          <td>
            <div class="cart-item-info">
              <img src="${p.image}" alt="${p.name}" />
              <div>
                <div class="cart-item-name">${p.name}</div>
                <div class="cart-item-meta">${p.origin} · ${item.weightOz}oz</div>
              </div>
            </div>
          </td>
          <td>${formatPrice(p.price)}</td>
          <td>
            <div class="qty-control">
              <button type="button" data-qty-down="${index}" aria-label="Decrease quantity">−</button>
              <input type="text" value="${item.qty}" data-qty-input="${index}" inputmode="numeric" aria-label="Quantity" />
              <button type="button" data-qty-up="${index}" aria-label="Increase quantity">+</button>
            </div>
          </td>
          <td>${formatPrice(p.price * item.qty)}</td>
          <td><button type="button" class="remove-link" data-remove="${index}">Remove</button></td>
        </tr>
      `;
    })
    .join("");

  const subtotal = cartSubtotal();

  container.innerHTML = `
    <table class="cart-table">
      <thead>
        <tr>
          <th>Item</th>
          <th>Price</th>
          <th>Qty</th>
          <th>Total</th>
          <th></th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
    <div class="cart-summary">
      <div class="summary-row">
        <span>Subtotal</span>
        <span>${formatPrice(subtotal)}</span>
      </div>
      <div class="summary-row total">
        <span>Estimated total</span>
        <span>${formatPrice(subtotal)}</span>
      </div>
      <a href="checkout.html" class="btn btn-primary btn-block">Proceed to checkout</a>
    </div>
  `;

  container.querySelectorAll("[data-qty-up]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const i = Number(btn.dataset.qtyUp);
      updateCartQty(i, getCart()[i].qty + 1);
      renderCartPage();
    });
  });
  container.querySelectorAll("[data-qty-down]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const i = Number(btn.dataset.qtyDown);
      updateCartQty(i, getCart()[i].qty - 1);
      renderCartPage();
    });
  });
  container.querySelectorAll("[data-qty-input]").forEach((input) => {
    input.addEventListener("change", () => {
      const i = Number(input.dataset.qtyInput);
      const qty = Math.max(0, parseInt(input.value, 10) || 0);
      updateCartQty(i, qty);
      renderCartPage();
    });
  });
  container.querySelectorAll("[data-remove]").forEach((btn) => {
    btn.addEventListener("click", () => {
      removeFromCart(Number(btn.dataset.remove));
      renderCartPage();
    });
  });
}

/* ---------- Checkout page (checkout.html) ---------- */
function renderCheckoutSummary() {
  const linesEl = document.getElementById("order-lines");
  if (!linesEl) return;

  const cart = getCart();
  linesEl.innerHTML = cart
    .map((item) => {
      const p = findProduct(item.id);
      if (!p) return "";
      return `
        <div class="order-line">
          <span>${p.name} × ${item.qty}</span>
          <span>${formatPrice(p.price * item.qty)}</span>
        </div>
      `;
    })
    .join("");

  const subtotal = cartSubtotal();
  document.getElementById("checkout-subtotal").textContent = formatPrice(subtotal);
  document.getElementById("checkout-total").textContent = formatPrice(subtotal);

  const form = document.getElementById("checkout-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("This template has no payment processor connected yet — wire one up before taking real orders.");
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderShopGrid();
  renderProductDetail();
  renderCartPage();
  renderCheckoutSummary();
});
