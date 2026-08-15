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

function renderDipper(dipper) {
  const icon = document.getElementById("dipperIcon");
  const name = document.getElementById("dipperName");

  icon.src = DIPPER_IMAGES[dipper];
  icon.alt = dipper;
  name.textContent = dipper;
  name.classList.remove("pop");
  void name.offsetWidth; // restart animation
  name.classList.add("pop");
}

const SVG_NS = "http://www.w3.org/2000/svg";

function svgEl(name, attrs) {
  const el = document.createElementNS(SVG_NS, name);
  Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
  return el;
}

function shade(hex, percent) {
  const num = parseInt(hex.replace("#", ""), 16);
  const clamp = (v) => Math.min(255, Math.max(0, v));
  const r = clamp((num >> 16) + Math.round(2.55 * percent));
  const g = clamp(((num >> 8) & 0x00ff) + Math.round(2.55 * percent));
  const b = clamp((num & 0x0000ff) + Math.round(2.55 * percent));
  return `#${(0x1000000 + r * 0x10000 + g * 0x100 + b).toString(16).slice(1)}`;
}

// A shadow+highlight ellipse pair (offset in opposite directions) reads as a
// small 3D bump rather than a flat colored dot — used for chunky/whipped
// textures so lumps and peaks look raised off the surface.
function bump(group, cx, cy, rx, ry, rot, color, shadowAmt, highlightAmt, opacity) {
  const shadowCx = cx + rx * 0.28;
  const shadowCy = cy + ry * 0.32;
  const hiCx = cx - rx * 0.28;
  const hiCy = cy - ry * 0.32;
  group.appendChild(
    svgEl("ellipse", { cx: shadowCx, cy: shadowCy, rx, ry, fill: shade(color, shadowAmt), opacity, transform: `rotate(${rot} ${shadowCx} ${shadowCy})` })
  );
  group.appendChild(
    svgEl("ellipse", { cx: hiCx, cy: hiCy, rx: rx * 0.75, ry: ry * 0.75, fill: shade(color, highlightAmt), opacity: opacity + 0.1, transform: `rotate(${rot} ${hiCx} ${hiCy})` })
  );
}

function renderBaseTexture(group, texture, color) {
  const dark = shade(color, -14);
  const light = shade(color, 12);

  if (texture === "smooth") {
    // Soft glossy sheen with a brighter core, offset toward a top-left light source.
    group.appendChild(svgEl("ellipse", { cx: 105, cy: 130, rx: 68, ry: 16, fill: "#ffffff", opacity: 0.14 }));
    group.appendChild(svgEl("ellipse", { cx: 95, cy: 126, rx: 32, ry: 8, fill: "#ffffff", opacity: 0.18 }));
    for (let i = 0; i < 10; i++) {
      const cx = 42 + Math.random() * 196;
      const cy = 122 + Math.random() * 45;
      group.appendChild(svgEl("circle", { cx, cy, r: 0.6, fill: dark, opacity: 0.08 }));
    }
  } else if (texture === "whipped") {
    for (let i = 0; i < 9; i++) {
      const cx = 42 + Math.random() * 196;
      const cy = 122 + Math.random() * 45;
      const rot = Math.random() * 360;
      bump(group, cx, cy, 3 + Math.random() * 2, 6 + Math.random() * 3, rot, color, -16, 30, 0.4);
    }
  } else if (texture === "grainy") {
    for (let i = 0; i < 60; i++) {
      const cx = 42 + Math.random() * 196;
      const cy = 120 + Math.random() * 48;
      group.appendChild(
        svgEl("circle", { cx, cy, r: 0.4 + Math.random() * 0.7, fill: Math.random() > 0.5 ? dark : light, opacity: 0.4 + Math.random() * 0.2 })
      );
    }
  } else if (texture === "chunky") {
    for (let i = 0; i < 15; i++) {
      const cx = 42 + Math.random() * 196;
      const cy = 120 + Math.random() * 48;
      const rx = 2.5 + Math.random() * 3.5;
      const ry = rx * (0.7 + Math.random() * 0.25);
      const rot = Math.random() * 360;
      bump(group, cx, cy, rx, ry, rot, color, -22, 20, 0.4);
    }
  }
}

function renderSauceTexture(group, texture, color) {
  if (texture === "glossy") {
    group.appendChild(
      svgEl("path", { d: "M75,68 Q100,63 130,66 Q120,75 95,77 Q78,75 75,68 Z", fill: "#ffffff", opacity: 0.28 })
    );
    group.appendChild(svgEl("ellipse", { cx: 165, cy: 86, rx: 14, ry: 3.5, fill: "#ffffff", opacity: 0.16, transform: "rotate(-8 165 86)" }));
  } else if (texture === "herb-fleck") {
    for (let i = 0; i < 12; i++) {
      const cx = 42 + Math.random() * 196;
      const cy = 66 + Math.random() * 32;
      const rot = Math.random() * 360;
      group.appendChild(svgEl("ellipse", { cx, cy, rx: 2.2, ry: 1, fill: "#3d6b2e", opacity: 0.7, transform: `rotate(${rot} ${cx} ${cy})` }));
    }
  } else if (texture === "chunky-fleck") {
    const dark = shade(color, -25);
    for (let i = 0; i < 10; i++) {
      const cx = 42 + Math.random() * 196;
      const cy = 66 + Math.random() * 32;
      const rx = 2 + Math.random() * 1.6;
      const rot = Math.random() * 360;
      group.appendChild(svgEl("ellipse", { cx, cy, rx, ry: rx * 0.8, fill: dark, opacity: 0.55, transform: `rotate(${rot} ${cx} ${cy})` }));
    }
  }
}

function appendShapeAt(group, shape, cx, cy, size, rot, color, withStroke) {
  let el;
  switch (shape) {
    case "leaf":
      el = svgEl("ellipse", { cx, cy, rx: size * 1.4, ry: size * 0.5, transform: `rotate(${rot} ${cx} ${cy})` });
      break;
    case "oval":
      el = svgEl("ellipse", { cx, cy, rx: size * 1.1, ry: size * 0.75, transform: `rotate(${rot} ${cx} ${cy})` });
      break;
    case "square":
      el = svgEl("rect", { x: cx - size, y: cy - size, width: size * 2, height: size * 2, rx: size * 0.3, transform: `rotate(${rot} ${cx} ${cy})` });
      break;
    case "chunk": {
      const pts = [];
      const n = 5;
      for (let i = 0; i < n; i++) {
        const a = (i / n) * 2 * Math.PI;
        const rr = size * (0.7 + Math.random() * 0.6);
        pts.push(`${cx + Math.cos(a) * rr},${cy + Math.sin(a) * rr}`);
      }
      el = svgEl("polygon", { points: pts.join(" ") });
      break;
    }
    case "flake":
      el = svgEl("polygon", { points: `${cx},${cy - size} ${cx + size},${cy} ${cx},${cy + size} ${cx - size},${cy}`, transform: `rotate(${rot} ${cx} ${cy})` });
      break;
    case "shred":
      el = svgEl("rect", { x: cx - size * 1.8, y: cy - size * 0.35, width: size * 3.6, height: size * 0.7, rx: size * 0.3, transform: `rotate(${rot} ${cx} ${cy})` });
      break;
    case "ring":
      group.appendChild(svgEl("circle", { cx, cy, r: size, fill: "none", stroke: color, "stroke-width": size * 0.5 }));
      return;
    case "dot":
    default:
      el = svgEl("circle", { cx, cy, r: size });
      break;
  }
  el.setAttribute("fill", color);
  if (withStroke) {
    el.setAttribute("stroke", "rgba(255,255,255,0.5)");
    el.setAttribute("stroke-width", "0.3");
  }
  group.appendChild(el);
}

function renderToppingSpeckles(group, shape, color) {
  const count = 42;
  for (let i = 0; i < count; i++) {
    const cx = 30 + Math.random() * 220;
    const cy = 26 + Math.random() * 32;
    const rot = Math.random() * 360;
    const size = 1.8 + Math.random() * 1.8;

    // A soft dark shadow behind each speck keeps it visible even when the
    // topping color is close to the sauce color underneath.
    appendShapeAt(group, shape, cx + 0.5, cy + 0.6, size, rot, "rgba(0,0,0,0.2)", false);
    appendShapeAt(group, shape, cx, cy, size, rot, color, true);
  }
}

function renderMockup(base, sauce, topping) {
  const baseColor = BASE_COLORS[base];
  const sauceColor = SAUCE_COLORS[sauce];
  const toppingColor = TOPPING_COLORS[topping];

  document.getElementById("mockBase").setAttribute("fill", baseColor);
  document.getElementById("mockSauce").setAttribute("fill", sauceColor);
  const toppingBand = document.getElementById("mockTopping");
  toppingBand.setAttribute("fill", toppingColor);
  toppingBand.setAttribute("opacity", "0.3");

  const baseTexture = document.getElementById("mockBaseTexture");
  baseTexture.innerHTML = "";
  renderBaseTexture(baseTexture, BASE_TEXTURES[base], baseColor);

  const sauceTexture = document.getElementById("mockSauceTexture");
  sauceTexture.innerHTML = "";
  renderSauceTexture(sauceTexture, SAUCE_TEXTURES[sauce], sauceColor);

  const speckles = document.getElementById("mockSpeckles");
  speckles.innerHTML = "";
  renderToppingSpeckles(speckles, TOPPING_SHAPES[topping], toppingColor);

  const name = document.getElementById("mockupName");
  name.textContent = /dip$/i.test(base) ? base : `${base} Dip`;
  name.classList.remove("pop");
  void name.offsetWidth; // restart animation
  name.classList.add("pop");
}

let lastCombo = null;
const previewBtn = document.getElementById("previewBtn");
const mockupPanel = document.getElementById("mockupPanel");
const dipperBtn = document.getElementById("dipperBtn");
const dipperPanel = document.getElementById("dipperPanel");

document.getElementById("generate").addEventListener("click", () => {
  const base = pickRandom(BASES);
  const sauce = pickRandom(SAUCES);
  const topping = pickRandom(TOPPINGS);

  showValue("base", base);
  showValue("sauce", sauce);
  showValue("topping", topping);

  lastCombo = { base, sauce, topping };

  renderDipper(getRecommendedDipper(base, sauce));
  dipperBtn.disabled = false;

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

dipperBtn.addEventListener("click", () => {
  if (!lastCombo) return;
  dipperBtn.classList.add("hidden");
  dipperPanel.classList.add("visible");
});
