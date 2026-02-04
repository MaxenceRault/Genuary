const artboard = document.getElementById('artboard');
const count = 200;

for (let i = 0; i < count; i++) {
    // 1. Création de la particule
    const dot = document.createElement('div');
    dot.className = 'particle';
    
    const x = Math.random() * 480;
    const y = Math.random() * 672;
    const size = Math.random() * 5 + 2;
    const hue = Math.random() * 60 + 200; // Dégradé de bleus/cyans
    
    dot.style.left = `${x}px`;
    dot.style.top = `${y}px`;
    dot.style.width = `${size}px`;
    dot.style.height = `${size}px`;
    dot.style.backgroundColor = `hsl(${hue}, 80%, 60%)`;
    dot.style.boxShadow = `0 0 8px hsl(${hue}, 80%, 60%)`;
    
    artboard.appendChild(dot);

    // 2. Création d'une ligne de liaison si besoin
    if (Math.random() > 0.7) {
        const line = document.createElement('div');
        line.className = 'line';
        const length = Math.random() * 120 + 20;
        const angle = Math.random() * 360;
        
        line.style.left = `${x + size/2}px`;
        line.style.top = `${y + size/2}px`;
        line.style.width = `${length}px`;
        line.style.background = `linear-gradient(90deg, hsl(${hue}, 80%, 60%), transparent)`;
        line.style.transform = `rotate(${angle}deg)`;
        line.style.opacity = '0.3';
        
        artboard.appendChild(line);
    }
}