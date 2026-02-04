// JOUR 7 : COURBES TOURNANTES
// Thème : Boolean Algebra (Logic Gates)

let NP = 480, PI = Math.PI;
let N = 8000; // Plus de points pour bien voir les découpes nettes
let T1 = 1, T2 = 100, H1 = 1, H2 = 1, K1 = 1, K2 = 2, R1 = NP / 6, R2 = NP / 4;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  stroke(0);
  noFill();
  
  translate(width / 2, height / 2);

  for (let I = 0; I < N; I++) {
    let S_ = cos(4 * PI * I / N) * .4 + .6;
    let AN = 2 * PI * I / N;
    let C1 = cos(H1 * AN * T1), S1 = sin(H2 * AN * T1);
    let C2 = S_ * cos(K1 * AN * T2), S2 = S_ * sin(K2 * AN * T2);
    
    let X = R1 * C1 + R2 * (C1 * C2 - S1 * S2);
    let Y = (R1 * S1 + R2 * (S1 * C2 + C1 * S2)) * 1.4;

    // --- ALGEBRE BOOLEENNE ---
    // Définissons deux conditions (Propositions Logiques)
    let conditionA = dist(X, Y, -50, 0) < 150; // Le point est dans le cercle A
    let conditionB = dist(X, Y, 50, 0) < 150;  // Le point est dans le cercle B

    // On applique une porte logique (XOR ici : A ou B mais pas les deux)
    // En JS, le XOR s'écrit (A && !B) || (!A && B)
    let drawPoint = (conditionA && !conditionB) || (!conditionA && conditionB);

    if (drawPoint) {
      point(X, Y);
    }
  }
}