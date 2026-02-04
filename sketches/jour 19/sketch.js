// JOUR 19 : 16x16
// PROMPT : A 16x16 grid of generative geometric tiles.

let DESSIN = 190;
let NP = 480;
let commandes = [];

function setup() {
  INIT2(720);
  
  let grid = 16;
  let size = NP / grid; // Chaque cellule fait 30x30 pixels

  for (let j = 0; j < grid; j++) {
    for (let i = 0; i < grid; i++) {
      let x = i * size;
      let y = j * size;
      
      // On choisit une couleur basée sur la position pour un dégradé
      let r = map(i, 0, grid, 50, 255);
      let b = map(j, 0, grid, 50, 255);
      let col = `rgb(${int(r)}, 100, ${int(b)})`;

      // RÈGLE DE DESSIN PAR CELLULE
      // On alterne les motifs selon si i+j est pair ou impair
      if ((i + j) % 2 == 0) {
        drawPatternA(x, y * 1.4, size, col);
      } else {
        drawPatternB(x, y * 1.4, size, col);
      }
    }
  }
  TRACE2();
}

// MOTIF A : Cercles concentriques (Cibles)
function drawPatternA(x, y, s, col) {
  let steps = 3;
  for (let r = 1; r <= steps; r++) {
    let radius = (s / steps) * r / 2;
    drawCircle(x + s/2, y + s*0.7, radius, col);
  }
}

// MOTIF B : Croix diagonales
function drawPatternB(x, y, s, col) {
  LPRINT(`M${int(x)},${int(y)}`, col);
  LPRINT(`D${int(x+s)},${int(y+s*1.4)}`, col);
  LPRINT(`M${int(x+s)},${int(y)}`, col);
  LPRINT(`D${int(x)},${int(y+s*1.4)}`, col);
}

// --- FONCTIONS UTILES ---
function drawCircle(cx, cy, r, col) {
  let steps = 12;
  for (let i = 0; i <= steps; i++) {
    let a = (TWO_PI * i) / steps;
    let px = cx + cos(a) * r;
    let py = cy + sin(a) * r; // Le ratio 1.4 est déjà dans l'appel
    if (i == 0) LPRINT(`M${int(px)},${int(py)}`, col);
    else LPRINT(`D${int(px)},${int(py)}`, col);
  }
}

// --- MOTEUR DE RENDU ---
function INIT2(s) {
  createCanvas(s, s);
  background(20); // Fond sombre pour faire ressortir les couleurs
  commandes = [];
}

function LPRINT(cmd, col = "#FFF") {
  commandes.push({cmd: cmd, col: col});
}

function TRACE2() {
  noFill();
  strokeWeight(1.5);
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