// JOUR 20 : One line
// PROMPT : A single continuous line artwork. No lifting the pen.

let DESSIN = 200;
let NP = 480;
let commandes = [];

function setup() {
  INIT2(720);
  
  let x, y;
  let N = 2000; // Nombre de segments dans la ligne unique
  
  // Point de départ
  let startX = NP/2 + (NP/2.5) * cos(0);
  let startY = NP/2 + (NP/2.5) * sin(0);
  LPRINT(`M${int(startX)},${int(startY * 1.4)}`, "#FF5733");

  for (let i = 0; i <= N; i++) {
    let t = map(i, 0, N, 0, TWO_PI * 20); // 20 révolutions
    
    // Équation harmonique complexe (Lissajous modifiée)
    // On mélange plusieurs fréquences pour que la ligne ne se répète pas
    let r = (NP/2.5) * (0.7 + 0.3 * sin(t * 0.05)); 
    
    x = NP/2 + r * cos(t) * cos(t * 0.1);
    y = NP/2 + r * sin(t) * sin(t * 0.15);

    // Variation de couleur progressive le long de l'unique ligne
    let inter = map(i, 0, N, 0, 1);
    let col = lerpColor(color(255, 87, 51), color(51, 153, 255), inter);
    let hexCol = col.toString('#rrggbb');

    // UNE SEULE COMMANDE 'D' PAR BOUCLE
    LPRINT(`D${int(x)},${int(y * 1.4)}`, hexCol);
  }
  
  TRACE2();
}

// --- MOTEUR DE RENDU (Modifié pour la couleur fluide) ---
function INIT2(s) {
  createCanvas(s, s);
  background(10); 
  commandes = [];
}

function LPRINT(cmd, col) {
  commandes.push({cmd: cmd, col: col});
}

function TRACE2() {
  noFill();
  strokeWeight(1.2);
  let curX = 0, curY = 0;
  for (let c of commandes) {
    stroke(c.col);
    let type = c.cmd.charAt(0);
    let coords = c.cmd.substring(1).split(',');
    let x = parseInt(coords[0]), y = parseInt(coords[1]);
    
    if (type === 'M') { 
      curX = x; curY = y; 
    } else if (type === 'D') { 
      line(curX, curY, x, y); 
      curX = x; curY = y; 
    }
  }
}