// JOUR 26 : Recursive Grids
// PROMPT : Fractal subdivision of a square grid.

let DESSIN = 260;
let NP = 480;
let commandes = [];

function setup() {
  INIT2(720);
  
  // On lance la récursion : (x, y, taille, niveau de profondeur)
  subdivide(0, 0, NP, 0);
  
  TRACE2();
}

function subdivide(x, y, s, depth) {
  // RÈGLE DE RÉCURSION :
  // On divise si le niveau est bas (depth < 2) 
  // OU si on a de la chance (random > 0.4)
  // MAIS on s'arrête si le carré est trop petit (s < 20)
  let divideChance = random(1);
  
  if ((depth < 2 || divideChance > 0.4) && depth < 5 && s > 30) {
    let half = s / 2;
    // On appelle la fonction pour les 4 nouveaux quadrants
    subdivide(x, y, half, depth + 1);             // Haut-Gauche
    subdivide(x + half, y, half, depth + 1);      // Haut-Droite
    subdivide(x, y + half, half, depth + 1);      // Bas-Gauche
    subdivide(x + half, y + half, half, depth + 1); // Bas-Droite
  } else {
    // CONDITION D'ARRÊT : On dessine enfin quelque chose dans la cellule
    drawCell(x, y, s, depth);
  }
}

function drawCell(x, y, s, depth) {
  let padding = 2;
  let cx = x + padding;
  let cy = y + padding;
  let cs = s - padding * 2;

  // Couleur basée sur la profondeur (plus c'est petit, plus c'est chaud)
  let col = depth % 2 == 0 ? "rgb(30, 30, 30)" : "rgb(200, 50, 40)";
  if (depth > 3) col = "rgb(0, 100, 200)";

  // On dessine le contour de la cellule
  LPRINT(`M${int(cx)},${int(cy * 1.4)}`);
  LPRINT(`D${int(cx + cs)},${int(cy * 1.4)}`);
  LPRINT(`D${int(cx + cs)},${int((cy + cs) * 1.4)}`);
  LPRINT(`D${int(cx)},${int((cy + cs) * 1.4)}`);
  LPRINT(`D${int(cx)},${int(cy * 1.4)}`, col);

  // Petit motif interne pour meubler les grandes cellules
  if (s > 60) {
    LPRINT(`M${int(cx + cs/2)},${int(cy * 1.4)}D${int(cx + cs/2)},${int((cy + cs) * 1.4)}`, "#ccc");
  }
}

// --- MOTEUR DE RENDU ---
function INIT2(s) {
  createCanvas(s, s);
  background(245);
  commandes = [];
}

function LPRINT(cmd, col = "#000") {
  commandes.push({cmd: cmd, col: col});
}

function TRACE2() {
  noFill();
  strokeWeight(1);
  let curX = 0, curY = 0;
  for (let c of commandes) {
    stroke(c.col);
    let type = c.cmd.charAt(0);
    let coords = c.cmd.substring(1).split(',');
    let x = parseInt(coords[0]), y = parseInt(coords[1]);
    if (type === 'M') { curX = x; curY = y; }
    else if (type === 'D') { line(curX, curY, x, y); curX = x; curY = y; }
  }
}