// Overlay UI for individual sketch pages
// Adds day info + prev/next nav — no back button
(function() {
    const path = window.location.pathname;
    const match = path.match(/jour\s*(\d+)/i);
    const dayNum = match ? parseInt(match[1]) : null;
    const isBase = path.includes('/Base/');

    if (isBase) return;

    const titles = [
        '', 'Vertical or horizontal lines', 'Layers upon layers',
        'Exactly 42 lines of code', 'Vera Molnar', 'In the style of Vera Molnar',
        'Isometric Art', 'Discriminator', 'Grid-based', 'The first day',
        'Hexagonal', 'Impossible shapes', 'Triangles and only triangles',
        'Pure black and white', 'Less than 1KB', 'Use a /',
        'Inspired by Islamic art', 'What does wind look like', 'Op Art',
        'Flocking', 'Generative Landscape', 'Gradients only', 'Brutal',
        'Impossible Architecture', 'Infinite Loop', 'Geometric Abstraction',
        'Monochrome', 'Skeuomorphism', 'Signed Distance Functions',
        'Grid of Grids', 'Abstract Map', 'Negative Space'
    ];

    const title = dayNum ? (titles[dayNum] || `Jour ${dayNum}`) : '';
    const num = dayNum ? String(dayNum).padStart(2, '0') : '??';

    const style = document.createElement('style');
    style.textContent = `
        @import url('https://fonts.googleapis.com/css2?family=Bungee&family=Space+Mono&display=swap');

        .sketch-overlay-info {
            position: fixed;
            top: 16px;
            right: 16px;
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 8px 16px;
            background: rgba(10,10,10,0.85);
            border: 3px solid #ff8c00;
            border-radius: 12px;
            box-shadow: 4px 4px 0 #111;
            z-index: 9999;
            opacity: 0;
            transform: translateY(-20px);
            animation: overlayPop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.3s forwards;
        }

        @keyframes overlayPop {
            to { opacity: 1; transform: translateY(0) rotate(-1deg); }
        }

        .overlay-num {
            font-family: 'Bungee', cursive;
            font-size: 1.2rem;
            color: #ff8c00;
            text-shadow: 2px 2px 0 #000;
        }

        .overlay-title {
            font-family: 'Space Mono', monospace;
            font-size: 0.55rem;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            color: #fff8ee;
            opacity: 0.5;
            max-width: 180px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .sketch-nav {
            position: fixed;
            bottom: 16px;
            left: 50%;
            transform: translateX(-50%) translateY(20px);
            display: flex;
            gap: 8px;
            z-index: 9999;
            opacity: 0;
            animation: overlayPop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.5s forwards;
        }

        .nav-btn {
            padding: 8px 18px;
            background: #ff8c00;
            border: 3px solid #111;
            border-radius: 10px;
            color: #111;
            text-decoration: none;
            font-family: 'Bungee', cursive;
            font-size: 0.55rem;
            text-transform: uppercase;
            box-shadow: 3px 3px 0 #111;
            transition: all 0.2s ease;
        }

        .nav-btn:hover {
            background: #ffd500;
            transform: translate(-2px, -2px);
            box-shadow: 5px 5px 0 #111;
        }

        .nav-btn:active {
            transform: translate(1px, 1px);
            box-shadow: 1px 1px 0 #111;
        }
    `;
    document.head.appendChild(style);

    // Info tag (top right)
    const info = document.createElement('div');
    info.className = 'sketch-overlay-info';
    info.innerHTML = `
        <span class="overlay-num">${num}</span>
        <span class="overlay-title">${title}</span>
    `;
    document.body.appendChild(info);

    // Prev/next nav (bottom center)
    if (dayNum) {
        const nav = document.createElement('div');
        nav.className = 'sketch-nav';
        let html = '';
        if (dayNum > 1) {
            html += `<a class="nav-btn" href="../jour ${dayNum - 1}/index.html">&larr; ${dayNum - 1}</a>`;
        }
        html += `<a class="nav-btn" href="../../index.html">accueil</a>`;
        if (dayNum < 31) {
            html += `<a class="nav-btn" href="../jour ${dayNum + 1}/index.html">${dayNum + 1} &rarr;</a>`;
        }
        nav.innerHTML = html;
        document.body.appendChild(nav);
    }
})();
