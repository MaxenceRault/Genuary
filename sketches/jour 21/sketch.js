// JOUR 21 : Bauhaus Poster
// PROMPT : High-contrast Bauhaus composition with primary colors and heavy linework.

let DESSIN = 210;
let NP = 480;
let commandes = [];

function setup() {
  INIT2(720);
  
  // 1. STRUCTURE GLOBALE (Grille de base)
  strokeWeight(3);
  LPRINT("M20,20D460,20D460,650D20,650D20,20", "#000"); // Cadre principal
  
  // 2. MASSES DE COULEURS (Hachures pour simuler l'aplat)
  
  // Grand rectangle de fond (Bleu)
  drawMass(20, 20, 180, 400, "rgb(0, 80, 150)", "H"); 
  
  // Disque solaire (Jaune)
  drawCircleMass(320, 180, 90, "rgb(255, 210, 0)");
  
  // Triangle de structure (Rouge)
  drawTriangleMass(200, 650, 460, 650, 460, 300, "rgb(210, 30, 30)");

  // 3. ÉLÉMENTS DE DESIGN (Lignes noires de tension)
  LPRINT("M180,20D180,650", "#000"); // Séparateur vertical
  LPRINT("M180,420D460,420", "#000"); // Séparateur horizontal
  
  // Simulation de typographie "BAUHAUS" (blocs noirs)
  for(let i=0; i<5; i++) {
    drawMass(200 + (i*50), 40, 40, 20, "#000", "V");
  }

  TRACE2();
}

// Fonction pour remplir une zone (Aplat par hachures)
function drawMass(x, y, w, h, col, direction) {
  let step = 2.5; // Densité des hachures
  if (direction === "H") {
    for (let i = 0; i < h; i += step) {
      LPRINT(`M${int(x)},${int((y + i) * 1.4)}D${int(x + w)},${int((y + i) * 1.4)}`, col);
    }
  } else {
    for (let i = 0; i < w; i += step) {
      LPRINT(`M${int(x + i)},${int(y * 1.4)}D${int(x + i)},${int((y + h) * 1.4)}`, col);
    }
  }
}

// Remplissage de cercle par balayage horizontal
function drawCircleMass(cx, cy, r, col) {
  for (let i = -r; i <= r; i += 2) {
    let w = sqrt(r * r - i * i);
    LPRINT(`M${int(cx - w)},${int((cy + i) * 1.4)}D${int(cx + w)},${int((cy + i) * 1.4)}`, col);
  }
}

// Remplissage de triangle par balayage vertical
function drawTriangleMass(x1, y1, x2, y2, x3, y3, col) {
  for (let t = 0; t <= 1; t += 0.01) {
    let ax = lerp(x1, x2, t);
    let ay = lerp(y1, y2, t);
    LPRINT(`M${int(ax)},${int(ay * 1.4)}D${int(x3)},${int(y3 * 1.4)}`, col);
  }
}

// --- MOTEUR DE RENDU ---
function INIT2(s) {
  createCanvas(s, s);
  background(235, 230, 215); // Teinte "papier ancien"
  commandes = [];
}

function LPRINT(cmd, col) {
  commandes.push({cmd: cmd, col: col});
}

function TRACE2() {
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