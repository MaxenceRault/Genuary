// JOUR 12 : Boxes only
// PROMPT : Generate a complex structure using exclusively rectangular forms.

// ----------------------------------------------------
let DESSIN = 120;

// ----------------------------------------------------
let NP=480, PI=Math.PI;
let N=600; // Moins de points car chaque boîte contient 4 lignes
let T1=1, T2=50, R1=NP/6, R2=NP/4;

// ----------------------------------------------------
function setup() 
{
  INIT2(720);
  
  for (let I=0; I<N; I++)
  {
    let AN = 2 * PI * I / N;
    let S_ = cos(4 * PI * I / N) * 0.4 + 0.6;
    
    // Ton moteur mathématique pour la position
    let C1=cos(AN*T1), S1=sin(AN*T1);
    let C2=S_*cos(AN*T2), S2=S_*sin(AN*T2);
    
    let X = NP/2 + R1*C1 + R2*(C1*C2-S1*S2);
    let Y = NP/2 + R1*S1 + R2*(S1*C2+C1*S2);
    
    // --- LOGIQUE DES BOÎTES ---
    // La taille de la boîte dépend de la progression
    let w = 10 + S_ * 20; 
    let h = 10 + (1 - S_) * 20;

    DESSINE_BOITE(X, Y * 1.4, w, h);
  }
  TRACE2();
}

function DESSINE_BOITE(x, y, w, h) {
  // Une boîte = 4 commandes LPRINT pour fermer le rectangle
  LPRINT(`M${int(x - w/2)},${int(y - h/2)}`);
  LPRINT(`D${int(x + w/2)},${int(y - h/2)}`);
  LPRINT(`D${int(x + w/2)},${int(y + h/2)}`);
  LPRINT(`D${int(x - w/2)},${int(y + h/2)}`);
  LPRINT(`D${int(x - w/2)},${int(y - h/2)}`); // Fermeture
}