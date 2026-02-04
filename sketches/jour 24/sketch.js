// JOUR 24 : Perfectionist’s nightmare
// PROMPT : Subtly broken grid of squares. Misaligned lines and open paths.

let DESSIN = 240;
let NP = 480;
let commandes = [];

function setup() {
  INIT2(720);
  
  let grid = 12;
  let size = NP / grid;
  let gap = 10;

  for (let j = 0; j < grid; j++) {
    for (let i = 0; i < grid; i++) {
      let x = i * size + gap/2;
      let y = j * size + gap/2;
      let s = size - gap;

      // LA RÈGLE DU CAUCHEMAR :
      // On introduit une erreur aléatoire très faible mais visible
      let errX = random(-2, 2);
      let errY = random(-2, 2);
      let gapError = random(2, 5); // Le carré ne se ferme pas tout à fait

      let col = "#222";
      // Une cellule sur 20 est d'une couleur légèrement différente (insupportable)
      if(random(1) > 0.95) col = "#1a1a1a"; 

      drawBrokenSquare(x + errX, y * 1.4 + errY, s, gapError, col);
    }
  }
  TRACE2();
}

function drawBrokenSquare(x, y, s, g, col) {
  // On trace les 4 côtés manuellement pour introduire des erreurs
  // Haut
  LPRINT(`M${int(x)},${int(y)}D${int(x + s - g)},${int(y)}`, col);
  // Droite
  LPRINT(`M${int(x + s)},${int(y + g)}D${int(x + s)},${int(y + s)}`, col);
  // Bas
  LPRINT(`M${int(x + s)},${int(y + s)}D${int(x + g)},${int(y + s)}`, col);
  // Gauche
  LPRINT(`M${int(x)},${int(y + s - g)}D${int(x)},${int(y)}`, col);
}

// --- MOTEUR DE RENDU ---
function INIT2(s) {
  createCanvas(s, s);
  background(250); 
  commandes = [];
}

function LPRINT(cmd, col) {
  commandes.push({cmd: cmd, col: col});
}

function TRACE2() {
  noFill();
  strokeWeight(1.2);
  for (let c of commandes) {
    stroke(c.col);
    let type = c.cmd.charAt(0);
    let coords = c.cmd.substring(1).split(',');
    let x = parseInt(coords[0]), y = parseInt(coords[1]);
    if (type === 'M') { curX = x; curY = y; }
    else if (type === 'D') { line(curX, curY, x, y); curX = x; curY = y; }
  }
}