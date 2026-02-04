let myShader;

// On définit le code du shader directement dans une variable texte
// (C'est le code que je t'ai donné, adapté pour p5.js)
const vs = `
  precision highp float;
  attribute vec3 aPosition;
  void main() {
    gl_Position = vec4(aPosition, 1.0);
  }
`;

const fs = `
  precision highp float;
  uniform vec2 u_resolution;
  uniform float u_time;

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    float t = u_time * 0.5;
    
    float v = sin(uv.x * 10.0 + t);
    v += sin(10.0 * (uv.y * sin(t / 2.0) + uv.x * cos(t / 3.0)) + t);
    
    vec3 col = vec3(
        0.5 + 0.5 * sin(v + t),
        0.5 + 0.5 * sin(v + t + 2.0),
        0.5 + 0.5 * sin(v + t + 4.0)
    );

    gl_FragColor = vec4(col, 1.0);
  }
`;

function setup() {
  // IMPORTANT : On active le mode WEBGL
  createCanvas(480, 672, WEBGL);
  myShader = createShader(vs, fs);
  noStroke();
}

function draw() {
  shader(myShader);
  
  // On envoie les variables "uniformes" (temps et résolution) au shader
  myShader.setUniform("u_resolution", [width, height]);
  myShader.setUniform("u_time", millis() / 1000.0);
  
  // On dessine un rectangle qui couvre tout l'écran pour afficher le shader
  rect(-width/2, -height/2, width, height);
}