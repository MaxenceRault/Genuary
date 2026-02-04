// JOUR 14 : Everything fits perfectly
// PROMPT : A seamless tessellation where geometric shapes interlock.

// ----------------------------------------------------
let DESSIN = 140;

// ----------------------------------------------------
let NP=480, PI=Math.PI;
let COLS=10, ROWS=8; // La grille parfaite

// ----------------------------------------------------
function setup() 
{
  INIT2(720);
  
  let w = NP / COLS;
  let h = NP / ROWS;

  for (let j = 0; j <= ROWS; j++) {
    for (let i = 0; i <= COLS; i++) {
      let x = i * w;
      let y = j * h;

      // --- LOGIQUE D'EMBOÎTEMENT ---
      // Au lieu de simples carrés, on crée des formes qui "mordent"
      // sur leurs voisines de manière mathématique.
      drawInterlockTile(x, y * 1.4, w, h, i, j);
    }
  }
  TRACE2();
}

function drawInterlockTile(x, y, w, h, i, j) {
  let step = 0.2; // Précision de la courbe
  
  // On commence au coin haut-gauche
  LPRINT(`M${int(x)},${int(y)}`);
  
  // Bord haut (ondulation qui dépend de la colonne)
  for(let t=0; t<=1.1; t+=step) {
    let ox = x + t * w;
    let oy = y + sin(t * PI) * 10 * ((i % 2 == 0) ? 1 : -1);
    LPRINT(`D${int(ox)},${int(oy)}`);
  }
  
  // Bord droit (ondulation qui dépend de la ligne)
  for(let t=0; t<=1.1; t+=step) {
    let ox = x + w + sin(t * PI) * 10 * ((j % 2 == 0) ? 1 : -1);
    let oy = y + t * h;
    LPRINT(`D${int(ox)},${int(oy)}`);
  }

  // Le secret : chaque courbe est l'inverse de la voisine, 
  // donc elles s'emboîtent "parfaitement".
}