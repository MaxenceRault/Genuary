// JOUR 3 : COURBES TOURNANTES
// Thème : Fibonacci Forever

let DESSIN = 95;
let NP = 480, PI = Math.PI;

// Utilisation du nombre d'or dérivé de Fibonacci
let PHI = (1 + Math.sqrt(5)) / 2; 

// On ajuste les fréquences avec PHI pour une harmonie parfaite
let N = 5000; 
let T1 = 1;
let T2 = PHI * 10; // Fibonacci influence la vitesse de rotation
let H1 = 1, H2 = 1, K1 = 1, K2 = PHI; 
let R1 = NP / 6, R2 = NP / 4;

function setup() {
  createCanvas(720, 720);
  background(255);
  stroke(0, 80); // Légère transparence pour voir les intersections "divines"
  noFill();
  
  translate(width / 2, height / 2);
  
  beginShape();
  for (let I = 0; I < N; I++) {
    // La modulation S_ suit maintenant une croissance basée sur PHI
    let S_ = cos(PHI * PI * I / N) * .4 + .6;
    
    let AN = 2 * PI * I / N;
    let C1 = cos(H1 * AN * T1), S1 = sin(H2 * AN * T1);
    let C2 = S_ * cos(K1 * AN * T2), S2 = S_ * sin(K2 * AN * T2);
    
    // Application de la suite dans le déploiement des rayons
    let X = (R1 * C1 + R2 * (C1 * C2 - S1 * S2)) * 1.2;
    let Y = (R1 * S1 + R2 * (S1 * C2 + C1 * S2)) * 1.4 * 1.2;
    
    vertex(X, Y);
  }
  endShape();
}