// JOUR 9 : Crazy automaton
// PROMPT : Cellular automata with crazy rules (applied to parametric structures).

// ----------------------------------------------------
let DESSIN = 99; 

// ----------------------------------------------------
let NP=480, PI=Math.PI;
let N=5000, T1=1, T2=100, H1=1, H2=1, K1=1, K2=2, R1=NP/6, R2=NP/4;

// ----------------------------------------------------
function setup() 
{
  INIT2(720);
  
  let mutation = 0; // Le "cerveau" de l'automate

  for (let I=0; I<N; I++)
  {
    let S_ = cos(4*PI*I/N)*.4+.6;
    let AN = 2*PI*I/N;
    
    // --- CRAZY RULES ---
    // La règle de mutation change selon la densité S_
    // Si la courbe est serrée, l'automate s'affole
    if (S_ > 0.7) {
      mutation += 0.05 * sin(I); 
    } else {
      mutation -= 0.02;
    }

    let C1=cos(H1*AN*T1), S1=sin(H2*AN*T1);
    let C2=S_*cos(K1*AN*(T2 + mutation)), S2=S_*sin(K2*AN*(T2 + mutation));
    
    X=NP/2+R1*C1+R2*(C1*C2-S1*S2);
    Y=NP/2+R1*S1+R2*(S1*C2+C1*S2);
    Y=Y*1.4;

    // --- RÈGLE DE SURVIE (LE STYLO) ---
    // On simule une règle de voisinage : si I est dans une phase de chaos, le trait se brise
    let pulse = abs(sin(I * 0.1 + mutation));
    let etat = (pulse > 0.15) ? "D" : "M";

    if (I==0) LPRINT(`M${int(X)},${int(Y)}`);
    if (I>0) LPRINT(`${etat}${int(X)},${int(Y)}`);
  }
  TRACE2();
}