# Ember & Third — Ecommerce Site Template

A static, dependency-free ecommerce template (single-origin coffee shop as
the example subject). Vanilla HTML/CSS/JS — no build step, no framework.
Open `index.html` directly in a browser, or serve the folder with any
static host.

## File structure

```
ember-and-third/
├── index.html          Homepage: hero + shop grid
├── product.html         Product detail (reads ?id= from the URL)
├── cart.html            Cart page
├── checkout.html         Shipping form + order summary
├── css/
│   └── styles.css       All design tokens & component styles
├── js/
│   ├── products.js      Product catalog (edit this to add/remove products)
│   ├── cart.js           Cart storage (localStorage) + helpers
│   └── main.js           Renders the shop grid, product page, cart, checkout
└── images/
    └── *.svg             Placeholder product art (swap for real photos)
```

## How it works

- **No backend required to browse.** The catalog lives in `js/products.js`
  as a plain array; the cart is persisted in the browser's `localStorage`.
- **To add a product:** add an object to the `PRODUCTS` array in
  `js/products.js` with a unique `id`, then drop a matching image into
  `images/`.
- **To restyle:** everything — colors, fonts, spacing — is driven by the
  CSS custom properties at the top of `css/styles.css` (`:root { ... }`).
  Change those and the whole site updates.
- **Checkout is a template, not a payment integration.** The form
  collects shipping details but has no processor wired up. Before taking
  real orders, connect a provider (Stripe, Shopify Payments, Braintree,
  etc.) and replace the `submit` handler in `js/main.js`
  (`renderCheckoutSummary`) with a real API call.

## Going further

This is a static front end. For a real store you'll also want:
- A backend or hosted platform (Stripe Checkout, Shopify, Snipcart, or
  your own API) to actually process payments and orders
- Real product photography in place of the placeholder SVGs
- Inventory and order management
- Email confirmations / order tracking

Everything here is plain HTML/CSS/JS on purpose, so it's easy to lift
pieces into whatever stack you end up using.
