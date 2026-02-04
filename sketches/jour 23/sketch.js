// JOUR 23 : Transparency
// PROMPT : Simulating transparency through line intersection and density.

let DESSIN = 230;
let NP = 480;
let commandes = [];

function setup() {
  INIT2(720);
  
  // On dessine trois grands cercles qui se chevauchent
  // Cercle 1 : Lignes horizontales
  drawTransparentCircle(180, 200, 150, "rgba(0, 150, 255, 0.5)", 0);
  
  // Cercle 2 : Lignes verticales
  drawTransparentCircle(300, 250, 150, "rgba(255, 50, 100, 0.5)", PI/2);
  
  // Cercle 3 : Lignes diagonales
  drawTransparentCircle(240, 350, 150, "rgba(255, 200, 0, 0.5)", PI/4);

  TRACE2();
}

function drawTransparentCircle(cx, cy, r, col, angle) {
  let step = 4; // Plus le step est petit, plus la forme est "opaque"
  
  for (let i = -r; i <= r; i += step) {
    // Calcul de la corde du cercle pour chaque ligne
    let len = sqrt(r * r - i * i);
    
    // Points de base avant rotation
    let x1 = -len, y1 = i;
    let x2 = len,  y2 = i;
    
    // Application de la rotation pour varier le style de hachure
    let rx1 = cx + x1 * cos(angle) - y1 * sin(angle);
    let ry1 = cy + x1 * sin(angle) + y1 * cos(angle);
    let rx2 = cx + x2 * cos(angle) - y2 * sin(angle);
    let ry2 = cy + x2 * sin(angle) + y2 * cos(angle);

    LPRINT(`M${int(rx1)},${int(ry1 * 1.4)}`, col);
    LPRINT(`D${int(rx2)},${int(ry2 * 1.4)}`, col);
  }
}

// --- MOTEUR DE RENDU ---
function INIT2(s) {
  createCanvas(s, s);
  background(20); // Fond sombre pour simuler des vitraux lumineux
  commandes = [];
}

function LPRINT(cmd, col) {
  commandes.push({cmd: cmd, col: col});
}

function TRACE2() {
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