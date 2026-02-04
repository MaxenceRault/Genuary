// JOUR 2 : COURBES TOURNANTES
// Thème : Twelve principles of animation (Squash and Stretch)

let DESSIN = 95;
let NP = 480, PI = Math.PI;
let N = 4000, T1 = 1, T2 = 100, H1 = 1, H2 = 1, K1 = 1, K2 = 2, R1 = NP / 6, R2 = NP / 4;

function setup() {
  createCanvas(720, 720);
  stroke(0);
  noFill();
}

function draw() {
  background(255);
  
  // --- PRINCIPE D'ANIMATION : SQUASH & STRETCH ---
  // On utilise sin(frameCount) pour créer un cycle fluide
  let speed = frameCount * 0.05;
  let stretch = map(sin(speed), -1, 1, 0.8, 1.2); // S'étire verticalement
  let squash = map(sin(speed), -1, 1, 1.2, 0.8);  // S'écrase horizontalement en opposition
  
  translate(width / 2, height / 2);
  scale(squash, stretch); // Applique l'effet à toute la forme
  
  beginShape();
  for (let I = 0; I < N; I++) {
    let S_ = cos(4 * PI * I / N) * .4 + .6;
    let AN = 2 * PI * I / N;
    let C1 = cos(H1 * AN * T1), S1 = sin(H2 * AN * T1);
    let C2 = S_ * cos(K1 * AN * T2), S2 = S_ * sin(K2 * AN * T2);
    
    let X = (R1 * C1 + R2 * (C1 * C2 - S1 * S2)) * 1.2;
    let Y = (R1 * S1 + R2 * (S1 * C2 + C1 * S2)) * 1.4 * 1.2;
    
    vertex(X, Y - 100); // On centre le dessin
  }
  endShape();
}