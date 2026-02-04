// JOUR 27 : Lifeform
// PROMPT : Growing organic structure (mycelium/neural style).

let DESSIN = 270;
let NP = 480;
let commandes = [];

function setup() {
  INIT2(720);
  
  // On commence au centre avec plusieurs "germes" de vie
  for (let i = 0; i < 6; i++) {
    let angle = (TWO_PI / 6) * i;
    growLife(NP / 2, NP / 2, angle, 80, 0);
  }
  
  TRACE2();
}

function growLife(x, y, angle, length, depth) {
  // Condition d'arrêt de la croissance
  if (depth > 12 || length < 2) return;

  // Calcul du nouveau point avec une courbure "vivante"
  // On ajoute un bruit sinusoïdal pour simuler la recherche
  let drift = sin(depth * 0.5 + frameCount * 0.1) * 0.5;
  let newX = x + cos(angle + drift) * length;
  let newY = y + sin(angle + drift) * length;

  // Choix de la couleur : du violet profond au cyan électrique
  let col = lerpColor(color(80, 0, 150), color(0, 255, 200), depth / 12).toString('#rrggbb');

  // On dessine le segment
  LPRINT(`M${int(x)},${int(y * 1.4)}`, col);
  LPRINT(`D${int(newX)},${int(newY * 1.4)}`, col);

  // LOGIQUE DE CROISSANCE (Bifurcation)
  // À chaque étape, la branche peut se diviser en deux
  let splitChance = random(1);
  if (splitChance > 0.6) {
    // Deux nouvelles branches plus petites
    growLife(newX, newY, angle - 0.4, length * 0.8, depth + 1);
    growLife(newX, newY, angle + 0.4, length * 0.8, depth + 1);
  } else {
    // Continue tout droit
    growLife(newX, newY, angle, length * 0.95, depth + 1);
  }
}

// --- MOTEUR DE RENDU ---
function INIT2(s) {
  createCanvas(s, s);
  background(5, 5, 15); // Fond bleu très sombre (nuit ou profondeur)
  commandes = [];
}

function LPRINT(cmd, col) {
  commandes.push({cmd: cmd, col: col});
}

function TRACE2() {
  noFill();
  strokeCap(ROUND);
  let curX = 0, curY = 0;
  for (let c of commandes) {
    stroke(c.col);
    // On affine le trait selon la profondeur pour un look organique
    strokeWeight(map(commandes.indexOf(c), 0, 1000, 2, 0.5));
    
    let type = c.cmd.charAt(0);
    let coords = c.cmd.substring(1).split(',');
    let x = parseInt(coords[0]), y = parseInt(coords[1]);
    if (type === 'M') { curX = x; curY = y; }
    else if (type === 'D') { line(curX, curY, x, y); curX = x; curY = y; }
  }
}