// The three "databases" the generator picks from.
// Edit these lists freely — add, remove, or rename items.

const BASES = [
  "Sour Cream",
  "Greek Yogurt",
  "Cream Cheese",
  "Cottage Cheese",
  "Avocado",
  "Hummus",
  "White Bean Puree",
  "Mayonnaise",
  "Camembert",
  "Tsatsiki",
  "Baba Ganoush",
  "Burrata",
  "Chèvre",
  "Whipped Feta",
  "Curry Dip",
];

const SAUCES = [
  "Sriracha",
  "Chipotle",
  "Honey Mustard",
  "Garlic Lemon",
  "BBQ",
  "Sweet Chili",
  "Green Pesto",
  "Red Pesto",
  "Curry Sauce",
  "Hot Honey",
  "Salsa",
  "Soy Sauce",
  "Tabbouleh",
  "Tapenade",
];

const TOPPINGS = [
  "Chopped Chives",
  "Toasted Pumpkin Seeds",
  "Bacon Bits",
  "Feta Crumbles",
  "Fresh Herbs",
  "Roasted Garlic",
  "Chili Flakes",
  "Pomegranate Seeds",
  "Grated Parmesan",
  "Roasted Pine nuts",
  "Basil",
  "Mint leaves",
  "Sage leaves",
  "Capers",
  "Croutons",
  "Sesame Seeds",
  "Jalapenos",
  "Grated Cheddar",
];

// Dipper recommendation: base and sauce each vote for their best-fitting
// dippers (2 points = best match, 1 point = decent match). The dipper with
// the highest combined score wins; DIPPER_PRIORITY breaks ties.

const DIPPERS = ["Chips", "Nachos", "Bread", "Vegetables", "Crackers", "Pita", "Fries"];

const DIPPER_ICONS = {
  Chips: "🥔",
  Nachos: "🌽",
  Bread: "🍞",
  Vegetables: "🥕",
  Crackers: "🍘",
  Pita: "🫓",
  Fries: "🍟",
};

const DIPPER_PRIORITY = ["Pita", "Bread", "Nachos", "Chips", "Crackers", "Vegetables", "Fries"];

const BASE_DIPPER_SCORES = {
  "Sour Cream": { Chips: 2, Vegetables: 1 },
  "Greek Yogurt": { Vegetables: 2, Pita: 1 },
  "Cream Cheese": { Crackers: 2, Bread: 1 },
  "Cottage Cheese": { Vegetables: 2, Crackers: 1 },
  "Avocado": { Nachos: 2, Fries: 1 },
  "Hummus": { Pita: 2, Vegetables: 1 },
  "White Bean Puree": { Crackers: 2, Chips: 1 },
  "Mayonnaise": { Fries: 2, Chips: 1 },
  "Camembert": { Bread: 2, Crackers: 1 },
  "Tsatsiki": { Pita: 2, Vegetables: 1 },
  "Baba Ganoush": { Pita: 2, Crackers: 1 },
  "Burrata": { Bread: 2, Crackers: 1 },
  "Chèvre": { Crackers: 2, Bread: 1 },
  "Whipped Feta": { Pita: 2, Crackers: 1 },
  "Curry Dip": { Vegetables: 2, Pita: 1 },
};

const SAUCE_DIPPER_SCORES = {
  "Sriracha": { Nachos: 2, Chips: 1 },
  "Chipotle": { Nachos: 2, Fries: 1 },
  "Honey Mustard": { Fries: 2, Crackers: 1 },
  "Garlic Lemon": { Pita: 2, Vegetables: 1 },
  "BBQ": { Fries: 2, Nachos: 1 },
  "Sweet Chili": { Nachos: 2, Chips: 1 },
  "Green Pesto": { Bread: 2, Chips: 1 },
  "Red Pesto": { Bread: 2, Crackers: 1 },
  "Curry Sauce": { Vegetables: 2, Pita: 1 },
  "Hot Honey": { Fries: 2, Nachos: 1 },
  "Salsa": { Nachos: 2, Fries: 1 },
  "Soy Sauce": { Vegetables: 2, Chips: 1 },
  "Tabbouleh": { Pita: 2, Vegetables: 1 },
  "Tapenade": { Crackers: 2, Chips: 1 },
};
