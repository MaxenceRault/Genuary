// JOUR 15 : Invisible object where only the shadows can be seen.
// PROMPT : An invisible object revealed by the distortion of light rays.

// ----------------------------------------------------
let DESSIN = 150;

// ----------------------------------------------------
let NP=480, PI=Math.PI;
let N_RAYS = 80; // Nombre de rayons lumineux

// ----------------------------------------------------
function setup() 
{
  INIT2(720);
  
  // Paramètres de l'objet invisible (une sphère de distorsion)
  let objX = NP / 2;
  let objY = NP / 2;
  let objRadius = NP / 4;

  for (let i = 0; i < N_RAYS; i++) 
  {
    let xBase = (NP / N_RAYS) * i;
    
    // On commence le rayon en haut
    LPRINT(`M${int(xBase)},0`);
    
    for (let y = 0; y < NP; y += 10) 
    {
      // Calcul de la distance à l'objet invisible
      let d = dist(xBase, y, objX, objY);
      
      let xTrace = xBase;
      let yTrace = y * 1.4;

      if (d < objRadius) 
      {
        // L'OBJET EST ICI : 
        // Au lieu de dessiner l'objet, on crée une "ombre" en déviant le trait
        // ou en créant un vide (M au lieu de D)
        let force = map(d, 0, objRadius, 20, 0);
        xTrace += cos(y * 0.1) * force; 
        
        // Règle de l'ombre : si on est trop près du centre, le trait s'efface
        if (d < objRadius * 0.6) {
           LPRINT(`M${int(xTrace)},${int(yTrace)}`);
        } else {
           LPRINT(`D${int(xTrace)},${int(yTrace)}`);
        }
      } 
      else 
      {
        // HORS DE L'OBJET : Le rayon est droit
        LPRINT(`D${int(xTrace)},${int(yTrace)}`);
      }
    }
  }
  
  TRACE2();
}