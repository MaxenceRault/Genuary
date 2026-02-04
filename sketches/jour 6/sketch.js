// JOUR 6 : COURBES TOURNANTES
// Thème : Lights on/off.

let NP = 480, PI = Math.PI;
let N = 4000, T1 = 1, T2 = 100, H1 = 1, H2 = 1, K1 = 1, K2 = 2, R1 = NP / 6, R2 = NP / 4;
let lightOn = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  // Effet "Digital Light"
  if (lightOn) {
    background(255); // Lumière ON : Fond blanc
    stroke(0);       // Courbes noires
  } else {
    background(0);   // Lumière OFF : Fond noir
    stroke(255);     // Courbes blanches (visibles seulement via le masque)
  }

  translate(width / 2, height / 2);

  // Si la lumière est éteinte, on crée un "spotlight" avec la souris
  if (!lightOn) {
    let mx = mouseX - width / 2;
    let my = mouseY - height / 2;
    
    // On dessine seulement les points proches de la souris
    for (let I = 0; I < N; I += 2) {
      let S_ = cos(4 * PI * I / N) * .4 + .6;
      let AN = 2 * PI * I / N;
      let C1 = cos(H1 * AN * T1), S1 = sin(H2 * AN * T1);
      let C2 = S_ * cos(K1 * AN * T2), S2 = S_ * sin(K2 * AN * T2);
      
      let X = R1 * C1 + R2 * (C1 * C2 - S1 * S2);
      let Y = (R1 * S1 + R2 * (S1 * C2 + C1 * S2)) * 1.4;

      // Calcul de la distance entre la souris et le point de la courbe
      let d = dist(mx, my, X, Y);
      if (d < 100) { // Rayon de la lampe de poche
        point(X, Y);
      }
    }
  } else {
    // Lumière allumée : on trace tout normalement
    beginShape();
    for (let I = 0; I < N; I++) {
      let S_ = cos(4 * PI * I / N) * .4 + .6;
      let AN = 2 * PI * I / N;
      let C1 = cos(H1 * AN * T1), S1 = sin(H2 * AN * T1);
      let C2 = S_ * cos(K1 * AN * T2), S2 = S_ * sin(K2 * AN * T2);
      let X = R1 * C1 + R2 * (C1 * C2 - S1 * S2);
      let Y = (R1 * S1 + R2 * (S1 * C2 + C1 * S2)) * 1.4;
      vertex(X, Y);
    }
    endShape();
  }
}

// Clique pour allumer ou éteindre la lumière
function mousePressed() {
  lightOn = !lightOn;
}