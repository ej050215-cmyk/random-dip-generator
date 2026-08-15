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

  icon.src = DIPPER_IMAGES[dipper];
  icon.alt = dipper;
  name.textContent = dipper;
  name.classList.remove("pop");
  void name.offsetWidth; // restart animation
  name.classList.add("pop");

  panel.classList.add("visible");
}

function renderMockup(base, sauce, topping) {
  document.getElementById("mockBase").setAttribute("fill", BASE_COLORS[base]);
  document.getElementById("mockSauce").setAttribute("fill", SAUCE_COLORS[sauce]);

  const speckles = document.getElementById("mockSpeckles");
  speckles.innerHTML = "";
  const toppingColor = TOPPING_COLORS[topping];
  const speckleCount = 16;
  for (let i = 0; i < speckleCount; i++) {
    const cx = 45 + Math.random() * 110;
    const cy = 45 + Math.random() * 28;
    const r = 1.5 + Math.random() * 2;

    // A soft dark shadow behind each speck keeps it visible even when the
    // topping color is close to the sauce color underneath.
    const shadow = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    shadow.setAttribute("cx", cx + 0.4);
    shadow.setAttribute("cy", cy + 0.5);
    shadow.setAttribute("r", r + 0.4);
    shadow.setAttribute("fill", "rgba(0,0,0,0.2)");
    speckles.appendChild(shadow);

    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", cx);
    circle.setAttribute("cy", cy);
    circle.setAttribute("r", r);
    circle.setAttribute("fill", toppingColor);
    circle.setAttribute("stroke", "rgba(255,255,255,0.5)");
    circle.setAttribute("stroke-width", "0.3");
    speckles.appendChild(circle);
  }

  const name = document.getElementById("mockupName");
  name.textContent = `${base} Dip`;
  name.classList.remove("pop");
  void name.offsetWidth; // restart animation
  name.classList.add("pop");
}

let lastCombo = null;
const previewBtn = document.getElementById("previewBtn");
const mockupPanel = document.getElementById("mockupPanel");

document.getElementById("generate").addEventListener("click", () => {
  const base = pickRandom(BASES);
  const sauce = pickRandom(SAUCES);
  const topping = pickRandom(TOPPINGS);

  showValue("base", base);
  showValue("sauce", sauce);
  showValue("topping", topping);

  showDipper(getRecommendedDipper(base, sauce));

  lastCombo = { base, sauce, topping };
  previewBtn.disabled = false;
  if (mockupPanel.classList.contains("visible")) {
    renderMockup(base, sauce, topping);
  }
});

previewBtn.addEventListener("click", () => {
  if (!lastCombo) return;
  renderMockup(lastCombo.base, lastCombo.sauce, lastCombo.topping);
  previewBtn.classList.add("hidden");
  mockupPanel.classList.add("visible");
});
