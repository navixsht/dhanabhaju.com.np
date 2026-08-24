/* Ember & Third — product catalog
   Roast levels are on a 1–10 scale (1 = lightest, 10 = darkest)
   used to drive the roast-gauge component across the site. */

const PRODUCTS = [
  {
    id: "eth-guji-118",
    lot: "LOT #24-118",
    name: "Guji Zone",
    origin: "Ethiopia",
    region: "Guji, Oromia",
    process: "Washed",
    roast: 2,
    price: 21,
    weightOz: 12,
    notes: ["Bergamot", "White peach", "Black tea"],
    body: "Light, tea-like",
    blurb:
      "A high-altitude washed lot from the Guji highlands. Floral on the nose, with a bergamot brightness that settles into stone fruit as it cools.",
    image: "images/eth-guji.svg",
    accent: "#C89B3C"
  },
  {
    id: "col-huila-092",
    lot: "LOT #24-092",
    name: "Huila Reserve",
    origin: "Colombia",
    region: "Huila",
    process: "Washed",
    roast: 4,
    price: 19,
    weightOz: 12,
    notes: ["Red apple", "Brown sugar", "Almond"],
    body: "Medium, syrupy",
    blurb:
      "Grown on a single family farm above 1,800m. Balanced and sweet, with a nutty finish that lingers through a full press pot.",
    image: "images/col-huila.svg",
    accent: "#B9803A"
  },
  {
    id: "gua-huehue-104",
    lot: "LOT #24-104",
    name: "Huehuetenango",
    origin: "Guatemala",
    region: "Huehuetenango",
    process: "Washed",
    roast: 5,
    price: 20,
    weightOz: 12,
    notes: ["Milk chocolate", "Orange zest", "Walnut"],
    body: "Medium-full",
    blurb:
      "Shade-grown on steep volcanic slopes. A house favorite for drip and pour-over — chocolatey with just enough citrus to keep it lively.",
    image: "images/gua-huehue.svg",
    accent: "#A8763B"
  },
  {
    id: "sum-mandheling-071",
    lot: "LOT #24-071",
    name: "Mandheling",
    origin: "Indonesia",
    region: "North Sumatra",
    process: "Wet-hulled",
    roast: 7,
    price: 20,
    weightOz: 12,
    notes: ["Cedar", "Dark cherry", "Molasses"],
    body: "Heavy, low acid",
    blurb:
      "Wet-hulled the traditional Sumatran way for a low, earthy acidity. Cedar and dark cherry up front, with a long molasses finish.",
    image: "images/sum-mandheling.svg",
    accent: "#8A5A32"
  },
  {
    id: "bra-cerrado-045",
    lot: "LOT #24-045",
    name: "Cerrado Blend",
    origin: "Brazil",
    region: "Cerrado Mineiro",
    process: "Natural",
    roast: 6,
    price: 17,
    weightOz: 12,
    notes: ["Hazelnut", "Caramel", "Dried fig"],
    body: "Full, nutty",
    blurb:
      "Our everyday espresso base. Natural-processed for a caramel sweetness that holds up in milk without disappearing.",
    image: "images/bra-cerrado.svg",
    accent: "#9C6B34"
  },
  {
    id: "eth-yirg-dark-118",
    lot: "LOT #24-129",
    name: "Yirgacheffe Dark",
    origin: "Ethiopia",
    region: "Yirgacheffe",
    process: "Natural",
    roast: 9,
    price: 21,
    weightOz: 12,
    notes: ["Dark chocolate", "Blackberry", "Smoke"],
    body: "Heavy, bold",
    blurb:
      "The same fruit-forward Yirgacheffe lot, taken past second crack. Smoky and rich, for drinkers who like their espresso assertive.",
    image: "images/eth-yirg-dark.svg",
    accent: "#6E4526"
  }
];

function findProduct(id) {
  return PRODUCTS.find((p) => p.id === id);
}
