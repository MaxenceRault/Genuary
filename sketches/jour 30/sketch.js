// JOUR 30 : It’s not a bug, it’s a feature
// PROMPT : Intentional glitch art and coordinate drift.

let DESSIN = 300;
let NP = 480;
let commandes = [];

function setup() {
  INIT2(720);
  
  let steps = 60;
  for (let j = 0; j < steps; j++) {
    for (let i = 0; i < steps; i++) {
      let x = i * (NP / steps);
      let y = j * (NP / steps);
      
      // LA "FEATURE" (Le Bug Intentionnel)
      // Normalement on dessinerait un point. 
      // Ici, on ajoute un "drift" (dérive) si i ou j remplit une condition arbitraire.
      let drift = 0;
      if ((i * j) % 7 === 0) { 
        drift = sin(i * 0.5) * 50; // On étire la ligne horizontalement
      }

      let col = (i + j) % 2 === 0 ? "#00ffcc" : "#ff0066"; // Couleurs Cyberpunk
      
      // On trace des segments qui "glitchent"
      LPRINT(`M${int(x)},${int(y * 1.4)}`, col);
      LPRINT(`D${int(x + drift)},${int(y * 1.4)}`, col);
      
      // Ajout de "bruit numérique" aléatoire (petits flashs blancs)
      if (random(1) > 0.99) {
        LPRINT(`M${int(x)},${int(y * 1.4)}D${int(NP)},${int(y * 1.4)}`, "#ffffff");
      }
    }
  }
  TRACE2();
}

// --- MOTEUR DE RENDU ---
function INIT2(s) {
  createCanvas(s, s);
  background(10, 5, 15); 
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
    if (type === 'M') { curX = x; curY = y; }
    else if (type === 'D') { line(curX, curY, x, y); curX = x; curY = y; }
  }
}