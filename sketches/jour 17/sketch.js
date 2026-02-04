// JOUR 17 : Wallpaper group
// PROMPT : Symmetry group p4m (*442) with vibrant colors.

let DESSIN = 170;
let NP = 480;
let commandes = []; 

function setup() {
  INIT2(720); 
  
  let TILE_SIZE = 120; 

  for (let y = 0; y < NP; y += TILE_SIZE) {
    for (let x = 0; x < NP; x += TILE_SIZE) {
      
      let h = TILE_SIZE / 2;
      let cx = x + h;
      let cy = y + h;

      // On dessine 3 couches de motifs avec des couleurs différentes
      // Couche 1 : Bleu profond
      drawP4M(cx, cy, h * 0.8, h, "rgb(0, 80, 150)"); 
      
      // Couche 2 : Jaune d'or
      drawP4M(cx, cy, h * 0.4, h * 0.6, "rgb(255, 200, 0)"); 
      
      // Couche 3 : Terre cuite
      drawP4M(cx, cy, h * 0.1, h * 0.3, "rgb(200, 50, 20)"); 
    }
  }
  TRACE2();
}

function drawP4M(cx, cy, r1, r2, col) {
  // Points du motif de base (une ligne qui sera répétée 8 fois)
  let p1 = {x: r1, y: 0};
  let p2 = {x: r2, y: r2};

  let transforms = [
    (p) => ({x: p.x, y: p.y}),   (p) => ({x: -p.x, y: p.y}), 
    (p) => ({x: p.x, y: -p.y}),  (p) => ({x: -p.x, y: -p.y}),
    (p) => ({x: p.y, y: p.x}),   (p) => ({x: -p.y, y: p.x}),
    (p) => ({x: p.y, y: -p.x}),  (p) => ({x: -p.y, y: -p.x})
  ];

  transforms.forEach(t => {
    let a = t(p1);
    let b = t(p2);
    // On passe la couleur à LPRINT
    LPRINT(`M${int(cx + a.x)},${int((cy + a.y) * 1.4)}`, col);
    LPRINT(`D${int(cx + b.x)},${int((cy + b.y) * 1.4)}`, col);
  });
}

// --- MOTEUR DE RENDU COULEUR ---
function INIT2(s) {
  createCanvas(s, s);
  background(245, 240, 230); // Fond beige papier
  commandes = [];
}

function LPRINT(cmd, col = "#000") {
  commandes.push({cmd: cmd, col: col});
}

function TRACE2() {
  noFill();
  let curX = 0, curY = 0;

  for (let c of commandes) {
    stroke(c.col);
    strokeWeight(1.5);
    
    let type = c.cmd.charAt(0);
    let coords = c.cmd.substring(1).split(',');
    let x = parseInt(coords[0]);
    let y = parseInt(coords[1]);

    if (type === 'M') {
      curX = x; curY = y;
    } else if (type === 'D') {
      line(curX, curY, x, y);
      curX = x; curY = y;
    }
  }
}