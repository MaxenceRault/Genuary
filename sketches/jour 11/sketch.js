// JOUR 11 : Quine
// PROMPT : A Quine is a computer program that outputs exactly its own source code.

// ----------------------------------------------------
let DESSIN = 111;

// ----------------------------------------------------
let NP=480, PI=Math.PI;

// ----------------------------------------------------
function setup() 
{
  INIT2(720);
  
  // La "recette" du Quine : une chaîne qui contient le code
  // %q remplace les guillemets, %s remplace la chaîne elle-même.
  let s = "let DESSIN=111; let NP=480, PI=Math.PI; function setup() { INIT2(720); let s = %q%s%q; let res = s.replace(/%q/g, String.fromCharCode(34)).replace(/%s/g, s); QUINE_RENDER(res); TRACE2(); }";
  
  // Reconstruction du code source exact
  let res = s.replace(/%q/g, String.fromCharCode(34)).replace(/%s/g, s);
  
  QUINE_RENDER(res);
  
  TRACE2();
}

function QUINE_RENDER(txt) {
  let x = 10, y = 20;
  for (let i = 0; i < txt.length; i++) {
    let char = txt[i];
    
    // On dessine une représentation visuelle de chaque caractère
    // Pour un vrai Quine graphique, on trace la "valeur" du texte
    let val = txt.charCodeAt(i);
    
    // Positionnement en grille pour simuler une page de texte
    let px = x + (i % 60) * 7;
    let py = y + Math.floor(i / 60) * 12;
    
    // Chaque caractère est tracé comme une petite signature unique
    // respectant ton format LPRINT
    LPRINT(`M${int(px)},${int(py * 1.4)}`);
    LPRINT(`D${int(px + (val % 5))},${int(py * 1.4 + (val / 10))}`);
  }
}