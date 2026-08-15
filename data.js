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

const DIPPER_IMAGES = {
  Chips: "images/chips.jpg",
  Nachos: "images/nachos.jpg",
  Bread: "images/bread.jpg",
  Vegetables: "images/vegetables.jpg",
  Crackers: "images/crackers.jpg",
  Pita: "images/pita.jpg",
  Fries: "images/fries.jpg",
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

// Dip mockup: rough real-world colors so the tub preview's three layers
// (base at the bottom, sauce swirled above, topping speckled on the surface)
// look roughly like the actual ingredient.

const BASE_COLORS = {
  "Sour Cream": "#F5F1E8",
  "Greek Yogurt": "#FAF7EE",
  "Cream Cheese": "#FFF7E3",
  "Cottage Cheese": "#F1EDDD",
  "Avocado": "#8FA86E",
  "Hummus": "#E8C97A",
  "White Bean Puree": "#EFE8D6",
  "Mayonnaise": "#FDF6DE",
  "Camembert": "#F3E3C0",
  "Tsatsiki": "#E6EFDD",
  "Baba Ganoush": "#A3835A",
  "Burrata": "#FFFCF2",
  "Chèvre": "#F5F0E2",
  "Whipped Feta": "#F2ECDB",
  "Curry Dip": "#E39A2E",
};

const SAUCE_COLORS = {
  "Sriracha": "#D6412B",
  "Chipotle": "#A8431E",
  "Honey Mustard": "#E5A83A",
  "Garlic Lemon": "#ECE49F",
  "BBQ": "#5E2A1C",
  "Sweet Chili": "#E0472F",
  "Green Pesto": "#6B8E3D",
  "Red Pesto": "#B5432A",
  "Curry Sauce": "#D98A2B",
  "Hot Honey": "#E8961E",
  "Salsa": "#C0392B",
  "Soy Sauce": "#3B2415",
  "Tabbouleh": "#7A9450",
  "Tapenade": "#3A3A2E",
};

const TOPPING_COLORS = {
  "Chopped Chives": "#4C7A3D",
  "Toasted Pumpkin Seeds": "#8A7A3D",
  "Bacon Bits": "#7A3B2E",
  "Feta Crumbles": "#F5F0E0",
  "Fresh Herbs": "#4C7A3D",
  "Roasted Garlic": "#D9B36B",
  "Chili Flakes": "#C0392B",
  "Pomegranate Seeds": "#A8172E",
  "Grated Parmesan": "#F0DFA0",
  "Roasted Pine nuts": "#C9A25B",
  "Basil": "#3D6B2E",
  "Mint leaves": "#4E8C5C",
  "Sage leaves": "#6B8E5A",
  "Capers": "#5C6B3D",
  "Croutons": "#C9A25B",
  "Sesame Seeds": "#E8DCC0",
  "Jalapenos": "#5A8A3D",
  "Grated Cheddar": "#E8A33D",
};
