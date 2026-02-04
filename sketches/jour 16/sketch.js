// JOUR 16 : Order and disorder
// PROMPT : Transition from perfect geometric grid to chaotic entropy.

// ----------------------------------------------------
let DESSIN = 160;

// ----------------------------------------------------
let NP=480, PI=Math.PI;
let COLS=15, ROWS=15; 

// ----------------------------------------------------
function setup() 
{
  INIT2(720);
  
  let w = NP / COLS;
  let h = NP / ROWS;

  for (let j = 0; j < ROWS; j++) {
    for (let i = 0; i < COLS; i++) {
      
      // Calcul de la progression (0 = début/ordre, 1 = fin/désordre)
      // On base le désordre sur la position verticale (le bas est chaotique)
      let factor = map(j, 0, ROWS - 1, 0, 1);
      
      let x = i * w + w/2;
      let y = j * h + h/2;

      // --- LOGIQUE D'ENTROPIE ---
      // Plus on descend, plus les coordonnées "vibrent"
      let noiseX = random(-20, 20) * factor;
      let noiseY = random(-20, 20) * factor;
      let rotation = random(-PI/4, PI/4) * factor;

      drawDeformedBox(x + noiseX, (y + noiseY) * 1.4, w * 0.8, h * 0.8, rotation);
    }
  }
  TRACE2();
}

function drawDeformedBox(cx, cy, w, h, angle) {
  let p = [];
  // Calcul des 4 coins avec rotation
  for (let i = 0; i < 4; i++) {
    let a = PI/4 + i * PI/2 + angle;
    let r = dist(0, 0, w/2, h/2);
    p.push({
      x: cx + cos(a) * r,
      y: cy + sin(a) * r
    });
  }

  // Tracé de la boîte
  LPRINT(`M${int(p[0].x)},${int(p[0].y)}`);
  for (let i = 1; i < 4; i++) {
    LPRINT(`D${int(p[i].x)},${int(p[i].y)}`);
  }
  LPRINT(`D${int(p[0].x)},${int(p[0].y)}`); // Fermeture
}