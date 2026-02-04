// JOUR 25 : Organic Geometry
// PROMPT : Organic growth from geometric circles.

let DESSIN = 250;
let NP = 480;
let commandes = [];

function setup() {
  INIT2(720);
  
  let steps = 400; // Nombre de "cellules" géométriques
  let angleOffset = 0;

  for (let i = 0; i < steps; i++) {
    // On suit une spirale organique (type Fibonacci)
    let t = map(i, 0, steps, 0, TWO_PI * 10);
    let r_base = map(i, 0, steps, 20, 180);
    
    // On déforme le rayon avec du bruit harmonique pour l'aspect vivant
    let x = NP/2 + r_base * cos(t) * (1 + 0.2 * sin(t * 0.2));
    let y = NP/2 + r_base * sin(t) * (1 + 0.2 * cos(t * 0.3));

    // Chaque "cellule" est un cercle géométrique parfait
    let circleRadius = map(i, 0, steps, 2, 25);
    
    // Dégradé de couleur organique (du vert algue au rose corail)
    let inter = map(i, 0, steps, 0, 1);
    let col = lerpColor(color(40, 180, 130), color(255, 100, 150), inter).toString('#rrggbb');

    drawSimpleCircle(x, y * 1.4, circleRadius, col);
  }
  
  TRACE2();
}

function drawSimpleCircle(cx, cy, r, col) {
  let res = 12; // Un dodécagone est suffisant pour paraître circulaire
  for (let i = 0; i <= res; i++) {
    let a = (TWO_PI * i) / res;
    let px = cx + cos(a) * r;
    let py = cy + sin(a) * r;
    if (i == 0) LPRINT(`M${int(px)},${int(py)}`, col);
    else LPRINT(`D${int(px)},${int(py)}`, col);
  }
}

// --- MOTEUR DE RENDU ---
function INIT2(s) {
  createCanvas(s, s);
  background(10, 20, 30); // Fond abyssal
  commandes = [];
}

function LPRINT(cmd, col) {
  commandes.push({cmd: cmd, col: col});
}

function TRACE2() {
  noFill();
  strokeWeight(0.7); // Traits fins pour l'aspect membranaire
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