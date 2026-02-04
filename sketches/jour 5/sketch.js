// JOUR 5 : COURBES TOURNANTES
// Thème : Write "Genuary" - Avoid using a font.

let NP = 480, PI = Math.PI;
let N = 800, T1 = 1, T2 = 50; // N réduit par lettre pour la clarté
let R1 = 10, R2 = 15; // Rayons réduits pour que la courbe forme le "trait" de la lettre

function setup() {
  INIT2(1000); // Canvas un peu plus large pour le mot
  
  // Coordonnées simplifiées pour tracer "GENUARY" manuellement
  let lettres = [
    {char: 'G', path: [[80,40], [40,40], [40,80], [80,80], [80,60], [60,60]]},
    {char: 'E', path: [[140,80], [110,80], [110,40], [140,40], [110,40], [110,60], [135,60]]},
    {char: 'N', path: [[170,80], [170,40], [200,80], [200,40]]},
    {char: 'U', path: [[230,40], [230,80], [260,80], [260,40]]},
    {char: 'A', path: [[290,80], [305,40], [320,80], [300,65], [310,65]]},
    {char: 'R', path: [[350,80], [350,40], [380,40], [380,60], [350,60], [380,80]]},
    {char: 'Y', path: [[410,40], [425,60], [440,40], [425,60], [425,80]]}
  ];

  let scale = 4;

  let premierPoint = true;

  lettres.forEach(lettre => {
    lettre.path.forEach(pos => {
      let offsetX = pos[0] * scale;
      let offsetY = pos[1] * scale;

      for (let I = 0; I < N; I++) {
        let S_ = cos(4 * PI * I / N) * .4 + .6;
        let AN = 2 * PI * I / N;
        let C1 = cos(AN * T1), S1 = sin(AN * T1);
        let C2 = S_ * cos(AN * T2), S2 = S_ * sin(AN * T2);
        
        // Ta formule de base, mais centrée sur le tracé de la lettre
        let X = offsetX + R1 * C1 + R2 * (C1 * C2 - S1 * S2);
        let Y = offsetY + R1 * S1 + R2 * (S1 * C2 + C1 * S2);

        if (premierPoint) {
          LPRINT(`M${int(X)},${int(Y)}`);
          premierPoint = false;
        } else {
          LPRINT(`D${int(X)},${int(Y)}`);
        }
      }
    });
  });

  TRACE2();
}