// JOUR 29 : Genetic evolution and mutation
// PROMPT : Evolving geometric shapes with hereditary traits and mutations.

let DESSIN = 290;
let NP = 480;
let commandes = [];

function setup() {
  INIT2(720);
  
  // "L'ADN" initial de notre première créature
  let dna = {
    sides: 3,
    size: 20,
    color: { r: 100, g: 150, b: 255 },
    complexity: 1
  };

  let cols = 6;
  let rows = 8;
  let spacing = NP / cols;

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let x = i * spacing + spacing / 2;
      let y = j * (spacing * 1.1) + spacing / 2;

      // On dessine la créature avec son ADN actuel
      drawOrganism(x, y * 1.4, dna);

      // ÉVOLUTION : La génération suivante hérite de cet ADN
      // mais avec une mutation aléatoire
      dna = mutate(dna);
    }
  }
  TRACE2();
}

function mutate(oldDna) {
  let newDna = JSON.parse(JSON.stringify(oldDna)); // Copie profonde

  // Règle de mutation : 20% de chance de changer un gène
  if (random(1) > 0.8) newDna.sides = constrain(newDna.sides + (random() > 0.5 ? 1 : -1), 3, 10);
  if (random(1) > 0.8) newDna.size = constrain(newDna.size + random(-5, 5), 10, 40);
  
  // Mutation de couleur
  newDna.color.r = constrain(newDna.color.r + random(-20, 20), 0, 255);
  newDna.color.g = constrain(newDna.color.g + random(-20, 20), 0, 255);
  newDna.color.b = constrain(newDna.color.b + random(-20, 20), 0, 255);

  return newDna;
}

function drawOrganism(x, y, dna) {
  let col = `rgb(${int(dna.color.r)}, ${int(dna.color.g)}, ${int(dna.color.b)})`;
  
  // On dessine un polygone basé sur le gène 'sides'
  for (let i = 0; i <= dna.sides; i++) {
    let a = (TWO_PI * i) / dna.sides;
    let px = x + cos(a) * dna.size;
    let py = y + sin(a) * dna.size;
    if (i == 0) LPRINT(`M${int(px)},${int(py)}`, col);
    else LPRINT(`D${int(px)},${int(py)}`, col);
  }
}

// --- MOTEUR DE RENDU ---
function INIT2(s) {
  createCanvas(s, s);
  background(20); 
  commandes = [];
}

function LPRINT(cmd, col) {
  commandes.push({cmd: cmd, col: col});
}

function TRACE2() {
  noFill();
  strokeWeight(1.5);
  let curX = 0, curY = 0;
  for (let c of commandes) {
    stroke(c.col);
    let type = c.cmd.charAt(0);
    let coords = c.cmd.substring(1).split(',');
    let x = parseInt(coords[0]), y = parseInt(coords[1]);
    if (type === 'M') { curX = x; curY = y; }
    else if (type === 'D') { line(curX, curY, x, y); curX = x; curY = y; }
  }
}