// JOUR 22 : Pen plotter ready
// PROMPT : Vector-style hatching. No fills, only strokes.

let DESSIN = 220;
let NP = 480;
let commandes = [];

function setup() {
  INIT2(720);
  
  // On va dessiner une forme complexe (un tore ou ruban)
  // uniquement avec des hachures transversales.
  
  let N = 80; // Nombre de "tranches"
  let resolution = 40; // Précision de chaque tranche
  
  for (let i = 0; i < N; i++) {
    let t = map(i, 0, N, 0, TWO_PI);
    
    // Trajectoire du ruban
    let cx = NP/2 + 150 * cos(t);
    let cy = NP/2 + 100 * sin(2 * t);
    
    // Angle de la tranche pour l'effet 3D
    let angle = t + PI/2;
    let size = 40 + 30 * sin(t * 3); // Largeur variable du ruban

    // Hachure de la tranche (ce que le plotter va tracer)
    drawPlotterLine(cx, cy, angle, size, i);
  }
  
  TRACE2();
}

function drawPlotterLine(x, y, angle, size, index) {
  // On calcule les deux extrémités de la hachure
  let x1 = x + cos(angle) * size;
  let y1 = y + sin(angle) * size;
  let x2 = x - cos(angle) * size;
  let y2 = y - sin(angle) * size;

  // Alternance de couleurs (typique des stylos multi-couleurs sur plotter)
  let col = (index % 2 == 0) ? "#004488" : "#cc4400";

  LPRINT(`M${int(x1)},${int(y1 * 1.4)}`, col);
  LPRINT(`D${int(x2)},${int(y2 * 1.4)}`, col);
}

// --- TON MOTEUR DE RENDU FILAIRE ---
function INIT2(s) {
  createCanvas(s, s);
  background(255); // Fond blanc (papier)
  commandes = [];
}

function LPRINT(cmd, col) {
  commandes.push({cmd: cmd, col: col});
}

function TRACE2() {
  noFill();
  strokeWeight(0.8); // Trait fin comme un stylo 0.3mm
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