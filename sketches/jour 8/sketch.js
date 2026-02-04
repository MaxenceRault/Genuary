// JOUR 8 : GENERATIVE METROPOLIS (Math-driven)
let NP = 800; 
let N = 2000;
let R1 = 100, R2 = 150;

function setup() {
  createCanvas(NP, NP);
  background(10, 10, 20);
  noFill();
  
  // Paramètres de "croissance" urbaine
  let T1 = random(1, 5); 
  let T2 = random(10, 50);
  
  for (let I = 0; I < N; I++) {
    let AN = TWO_PI * I / N;
    let S_ = cos(4 * PI * I / N) * 0.4 + 0.6;
    
    // Tes équations de base (Courbes tournantes)
    let C1 = cos(AN * T1), S1 = sin(AN * T1);
    let C2 = S_ * cos(AN * T2), S2 = S_ * sin(AN * T2);
    
    let x = width/2 + R1 * C1 + R2 * (C1 * C2 - S1 * S2);
    let y = height/2 + R1 * S1 + R2 * (S1 * C2 + C1 * S2);
    
    // --- TRANSFORMATION EN "VILLE" ---
    
    // 1. Dessiner les "blocs" de bâtiments aux intersections
    if (I % 5 == 0) {
      let distance = dist(width/2, height/2, x, y);
      let h = map(distance, 0, NP/2, 50, 5); // Plus haut au centre
      
      stroke(map(distance, 0, NP/2, 255, 100), 150, 255, 150);
      
      // On dessine une ligne verticale pour simuler la hauteur (perspective axonométrique)
      line(x, y, x, y - h); 
      
      // Fenêtre lumineuse au sommet
      stroke(255, 255, 200);
      point(x, y - h);
    }
  }
}