// JOUR 10 : Polar coordinates
// PROMPT : Explore the transition from linear to circular space using polar 
// equations to define radius and rotation.

// ----------------------------------------------------
let DESSIN = 100;

// ----------------------------------------------------
let NP=480, PI=Math.PI;
let N=3000; 

// ----------------------------------------------------
function setup() 
{
  INIT2(720);
  
  for (let I=0; I<N; I++)
  {
    // 1. L'ANGLE (Theta) : Progression circulaire
    let AN = 2 * PI * I / N;
    
    // 2. LE RAYON (R) : La distance par rapport au centre
    // On crée une oscillation polaire complexe (fleur mathématique)
    let R = (NP/4) * (sin(8 * AN) * cos(3 * AN) + 1.5);
    
    // Ajout d'une harmonique pour créer du relief
    R += 20 * sin(50 * AN); 

    // 3. CONVERSION POLAIRE -> CARTÉSIEN
    // $X = R * cos(AN)$
    // $Y = R * sin(AN)$
    let X = NP/2 + R * cos(AN);
    let Y = NP/2 + R * sin(AN);
    
    Y = Y * 1.4; // Ta correction d'aspect habituelle

    if (I == 0) LPRINT(`M${int(X)},${int(Y)}`);
    if (I > 0) LPRINT(`D${int(X)},${int(Y)}`);
  }
  TRACE2();
}