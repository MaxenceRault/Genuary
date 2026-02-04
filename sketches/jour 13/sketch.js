// JOUR 13 : Self portrait
// PROMPT : Basic human face with circles, ovals, and generative features (hair/eyes).

// ----------------------------------------------------
let DESSIN = 130;

// ----------------------------------------------------
let NP=480, PI=Math.PI;

// ----------------------------------------------------
function setup() 
{
  INIT2(720);
  
  let centerX = NP/2;
  let centerY = NP/2;

  // 1. FORME DU VISAGE (Ovale)
  drawOval(centerX, centerY * 1.4, 120, 160);

  // 2. LES YEUX (Generative)
  let eyeSpacing = 40;
  let eyeSize = random(10, 20);
  drawOval(centerX - eyeSpacing, centerY * 1.3, eyeSize, eyeSize * 0.7);
  drawOval(centerX + eyeSpacing, centerY * 1.3, eyeSize, eyeSize * 0.7);
  
  // Pupilles (petits points)
  LPRINT(`M${int(centerX-eyeSpacing)},${int(centerY*1.3)}D${int(centerX-eyeSpacing+1)},${int(centerY*1.3)}`);
  LPRINT(`M${int(centerX+eyeSpacing)},${int(centerY*1.3)}D${int(centerX+eyeSpacing+1)},${int(centerY*1.3)}`);

  // 3. LA BOUCHE (Une courbe simple)
  let smileMood = random(-10, 10); // Aléatoire : sourit ou pas
  LPRINT(`M${int(centerX-30)},${int(centerY*1.6)}`);
  LPRINT(`D${int(centerX)},${int(centerY*1.6 + smileMood)}`);
  LPRINT(`D${int(centerX+30)},${int(centerY*1.6)}`);

  // 4. LES CHEVEUX (Le côté "AI" : Courbes tournantes)
  // On utilise ta logique N, T1, T2 pour créer une chevelure complexe
  let N=1000, T1=1, T2=random(20, 80);
  for (let I=0; I<N; I++) {
    let AN = PI + (PI * I / N); // Uniquement le haut de la tête
    let S_ = cos(10 * AN) * 0.1 + 1;
    let R = 140 * S_;
    
    // On fait boucler les cheveux
    let cHair = cos(AN * T2) * 10;
    let X = centerX + (R + cHair) * cos(AN);
    let Y = (centerY * 1.4) + (R + cHair) * sin(AN);
    
    if (I % 10 == 0) LPRINT(`M${int(centerX)},${int(centerY * 1.2)}`); // Racine
    LPRINT(`D${int(X)},${int(Y)}`);
  }

  TRACE2();
}

function drawOval(cx, cy, w, h) {
  let steps = 40;
  for (let i = 0; i <= steps; i++) {
    let a = (TWO_PI * i) / steps;
    let x = cx + cos(a) * w;
    let y = cy + sin(a) * h;
    if (i == 0) LPRINT(`M${int(x)},${int(y)}`);
    else LPRINT(`D${int(x)},${int(y)}`);
  }
}