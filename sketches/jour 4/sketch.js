// JOUR 4 : COURBES TOURNANTES
// Thème : Lowres (Pixelated simplification)

let DESSIN = 95;
let NP = 480, PI = Math.PI;
let N = 2000; // Moins de points pour l'aspect Lowres
let T1 = 1, T2 = 100, H1 = 1, H2 = 1, K1 = 1, K2 = 2, R1 = NP / 6, R2 = NP / 4;

let res = 10; // TAILLE DU PIXEL : Augmente cette valeur (20, 30) pour encore moins de résolution

function setup() {
  createCanvas(720, 720);
  background(255);
  fill(0);
  noStroke();
  
  // On parcourt la courbe
  for (let I = 0; I < N; I++) {
    let S_ = cos(4 * PI * I / N) * .4 + .6;
    let AN = 2 * PI * I / N;
    let C1 = cos(H1 * AN * T1), S1 = sin(H2 * AN * T1);
    let C2 = S_ * cos(K1 * AN * T2), S2 = S_ * sin(K2 * AN * T2);
    
    let X = width / 2 + (R1 * C1 + R2 * (C1 * C2 - S1 * S2)) * 1.2;
    let Y = height / 2 + (R1 * S1 + R2 * (S1 * C2 + C1 * S2)) * 1.4 * 0.8;
    
    // --- EFFET LOWRES ---
    // On "quantifie" les coordonnées pour les forcer sur une grille
    let pixelX = floor(X / res) * res;
    let pixelY = floor(Y / res) * res;
    
    rect(pixelX, pixelY, res - 1, res - 1); 
  }
}