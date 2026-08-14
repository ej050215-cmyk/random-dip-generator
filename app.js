function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function showValue(elementId, text) {
  const el = document.getElementById(elementId);
  el.textContent = text;
  el.classList.remove("pop");
  void el.offsetWidth; // restart animation
  el.classList.add("pop");
}

function getRecommendedDipper(base, sauce) {
  const scores = {};
  DIPPERS.forEach((d) => (scores[d] = 0));

  const baseScores = BASE_DIPPER_SCORES[base] || {};
  const sauceScores = SAUCE_DIPPER_SCORES[sauce] || {};
  Object.entries(baseScores).forEach(([d, pts]) => (scores[d] += pts));
  Object.entries(sauceScores).forEach(([d, pts]) => (scores[d] += pts));

  let best = DIPPER_PRIORITY[0];
  let bestScore = -Infinity;
  DIPPER_PRIORITY.forEach((d) => {
    if (scores[d] > bestScore) {
      bestScore = scores[d];
      best = d;
    }
  });
  return best;
}

function showDipper(dipper) {
  const panel = document.getElementById("dipperPanel");
  const icon = document.getElementById("dipperIcon");
  const name = document.getElementById("dipperName");

  icon.textContent = DIPPER_ICONS[dipper];
  name.textContent = dipper;
  name.classList.remove("pop");
  void name.offsetWidth; // restart animation
  name.classList.add("pop");

  panel.classList.add("visible");
}

document.getElementById("generate").addEventListener("click", () => {
  const base = pickRandom(BASES);
  const sauce = pickRandom(SAUCES);
  const topping = pickRandom(TOPPINGS);

  showValue("base", base);
  showValue("sauce", sauce);
  showValue("topping", topping);

  showDipper(getRecommendedDipper(base, sauce));
});
