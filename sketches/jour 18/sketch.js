// JOUR 18 : Unexpected path
// PROMPT : A route that changes direction based on a distance-to-center rule.

let DESSIN = 180;
let NP = 480;
let commandes = [];

function setup() {
  INIT2(720);
  
  let x = 10, y = 10; // Départ en haut à gauche
  let angle = 0;
  let step = 8;
  let iterations = 3000;
  let distPrev = dist(x, y, NP/2, NP/2);

  LPRINT(`M${int(x)},${int(y * 1.4)}`, "#222");

  for (let i = 0; i < iterations; i++) {
    // RÈGLE SIMPLE : Comparaison de distance
    let distNext = dist(x + cos(angle) * step, y + sin(angle) * step, NP/2, NP/2);
    
    if (distNext < distPrev) {
      angle += PI/2; // Tourne à 90° si on s'approche du centre
    } else {
      angle += random(-0.1, 0.1); // Déviation libre si on s'éloigne
    }

    x += cos(angle) * step;
    y += sin(angle) * step;
    distPrev = distNext;

    // Changement de couleur selon la zone (Chaud au centre, Froid dehors)
    let d = dist(x, y, NP/2, NP/2);
    let col = d < 100 ? "rgb(255, 50, 0)" : "rgb(0, 100, 200)";

    // Garder le chemin dans le cadre
    if (x > 0 && x < NP && y > 0 && y < NP) {
      LPRINT(`D${int(x)},${int(y * 1.4)}`, col);
    } else {
      // Si on sort, on revient au hasard vers le centre
      x = constrain(x, 10, NP-10);
      y = constrain(y, 10, NP-10);
      angle += PI; 
      LPRINT(`M${int(x)},${int(y * 1.4)}`, col);
    }
  }
  TRACE2();
}

// --- MOTEUR DE RENDU ---
function INIT2(s) {
  createCanvas(s, s);
  background(255);
  commandes = [];
}

function LPRINT(cmd, col = "#000") {
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
    if (type === 'M') { curX = x; curY = y; }
    else if (type === 'D') { line(curX, curY, x, y); curX = x; curY = y; }
  }
}