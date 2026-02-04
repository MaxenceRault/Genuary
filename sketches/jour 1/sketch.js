// JOUR 1 : COURBES TOURNANTES
// Thème : One color, one shape.

let DESSIN = 95;
let NP = 480, PI = Math.PI;
let N = 4000, T1 = 1, T2 = 100, H1 = 1, H2 = 1, K1 = 1, K2 = 2, R1 = NP / 6, R2 = NP / 4;

function setup() {
  // Initialisation du canvas (ajusté pour p5.js standard si INIT2 n'est pas défini)
  createCanvas(720, 720);
  background(255); // Fond blanc
  stroke(0);       // "One color" : Noir
  noFill();
  
  beginShape(); // "One shape" : Une seule ligne continue
  for (let I = 0; I < N; I++) {
    let S_ = cos(4 * PI * I / N) * .4 + .6;
    let AN = 2 * PI * I / N;
    let C1 = cos(H1 * AN * T1), S1 = sin(H2 * AN * T1);
    let C2 = S_ * cos(K1 * AN * T2), S2 = S_ * sin(K2 * AN * T2);
    
    // Calcul des coordonnées
    let X = NP / 2 + R1 * C1 + R2 * (C1 * C2 - S1 * S2);
    let Y = NP / 2 + R1 * S1 + R2 * (S1 * C2 + C1 * S2);
    
    // Ajustement de l'échelle et centrage
    let finalX = width / 2 + (X - NP / 2) * 1.2;
    let finalY = height / 2 + (Y * 1.4 - NP * 0.7) * 1.2;
    
    vertex(finalX, finalY);
  }
  endShape();
}