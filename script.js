// ============================================
// CHATBOT (RiveScript)
// ============================================
const bot = new RiveScript({ utf8: true });
let botReady = false;

function loadBot() {
    bot.loadFile('chatbot.rive')
        .then(() => { bot.sortReplies(); botReady = true; })
        .catch(err => console.error('Erreur RiveScript:', err));
}

function sendMessage() {
    const input = document.getElementById('user-input');
    const message = input.value.trim();
    if (!message) return;
    addMessage(message, 'user');
    input.value = '';
    if (botReady) {
        bot.reply('user', message).then(reply => {
            if (reply.includes('REDIRECT:')) {
                const parts = reply.split('REDIRECT:');
                const textBefore = parts[0].trim();
                const target = parts[1].trim();
                if (textBefore) addMessage(textBefore, 'bot');
                const url = (target === 'Base') ? 'sketches/Base/index.html' : `sketches/jour ${target}/index.html`;
                setTimeout(() => { window.location.href = url; }, 800);
            } else {
                addMessage(reply, 'bot');
            }
        });
    }
}

function addMessage(text, type) {
    const messages = document.getElementById('chat-messages');
    const msg = document.createElement('p');
    msg.className = type === 'user' ? 'user-message' : 'bot-message';
    msg.innerHTML = text;
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
}

function toggleChat() {
    const chatbot = document.getElementById('chatbot');
    const icon = document.getElementById('toggle-icon');
    chatbot.classList.toggle('closed');
    icon.textContent = chatbot.classList.contains('closed') ? '+' : '-';
}

// ============================================
// DATA
// ============================================
const dayTitles = [
    'Base', 'Vertical or horizontal lines', 'Layers upon layers',
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

const dayDescriptions = [
    'template de base',
    'courbes tournantes', 'squash & stretch', 'fibonacci forever',
    'lowres pixelise', 'write genuary sans font', 'lights on/off',
    'boolean algebra', 'metropolis generative', 'crazy automaton',
    'coordonnees polaires', 'geometrie paradoxale', 'rectangles exclusifs',
    'self portrait generatif', 'tessellation', 'invisible object',
    'ordre et desordre', 'wallpaper group', 'unexpected path',
    'grille 16x16', 'one line trait continu', 'bauhaus poster',
    'pen plotter ready', 'transparence par densite', 'perfectionist nightmare',
    'organic geometry', 'recursive grids', 'lifeform',
    'particules neurales', 'evolution genetique', 'glitch art',
    'webgl shader'
];

const loaderMessages = [
    'chargement des vibes...',
    'compilation du goofy...',
    'injection de creativite...',
    'calibrage des pixels...',
    'initialisation du chaos...',
    'telechargement du style...',
    'preparation des sketches...',
    'presque la...',
    'lets gooo'
];

const annotations = [
    'trop cool!', 'nice', 'woah', 'sick', 'pas mal!',
    'chef d\'oeuvre', 'incroyable', 'stylé', 'wow', 'magnifique',
    '<3', 'art!', 'genial', 'lourd', 'ouf', 'fire'
];

// ============================================
// LOADER
// ============================================
function initLoader() {
    document.body.classList.add('loading');
    const bar = document.getElementById('loader-bar');
    const percent = document.getElementById('loader-percent');
    const msg = document.getElementById('loader-msg');
    const loader = document.getElementById('loader');

    let progress = 0;
    let msgIndex = 0;

    function tick() {
        const increment = Math.random() * 14 + 3;
        progress = Math.min(progress + increment, 100);
        bar.style.width = progress + '%';
        percent.textContent = Math.round(progress) + '%';

        const newMsgIndex = Math.min(Math.floor(progress / 12), loaderMessages.length - 1);
        if (newMsgIndex !== msgIndex) {
            msgIndex = newMsgIndex;
            msg.style.opacity = 0;
            setTimeout(() => {
                msg.textContent = loaderMessages[msgIndex];
                msg.style.opacity = 0.4;
            }, 120);
        }

        if (progress < 100) {
            setTimeout(tick, 80 + Math.random() * 180);
        } else {
            setTimeout(() => {
                loader.classList.add('done');
                document.body.classList.remove('loading');
                animateHeroEntrance();
            }, 350);
        }
    }
    setTimeout(tick, 250);
}

// ============================================
// CURSOR
// ============================================
function initCursor() {
    const cursor = document.getElementById('cursor');
    const dot = document.getElementById('cursor-dot');
    if (!cursor || !dot) return;

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let dotX = 0, dotY = 0;

    document.addEventListener('mousemove', e => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    document.addEventListener('mousedown', () => document.body.classList.add('cursor-click'));
    document.addEventListener('mouseup', () => document.body.classList.remove('cursor-click'));

    const hoverTargets = 'a, button, [data-magnetic], .card-embed, .chatbot-header, .sketch-card';
    document.addEventListener('mouseover', e => {
        if (e.target.closest(hoverTargets)) document.body.classList.add('cursor-hover');
    });
    document.addEventListener('mouseout', e => {
        if (e.target.closest(hoverTargets)) document.body.classList.remove('cursor-hover');
    });

    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        dotX += (mouseX - dotX) * 0.55;
        dotY += (mouseY - dotY) * 0.55;
        dot.style.left = dotX + 'px';
        dot.style.top = dotY + 'px';
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
}

// ============================================
// MAGNETIC
// ============================================
function initMagnetic() {
    document.querySelectorAll('[data-magnetic]').forEach(el => {
        el.addEventListener('mousemove', e => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            gsap.to(el, { x: x * 0.3, y: y * 0.3, duration: 0.4, ease: 'power2.out' });
        });
        el.addEventListener('mouseleave', () => {
            gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' });
        });
    });
}

// ============================================
// STICKERS PARALLAX
// ============================================
function initStickersParallax() {
    const stickers = document.querySelectorAll('.sticker');
    let mx = 0, my = 0;

    document.addEventListener('mousemove', e => {
        mx = (e.clientX / window.innerWidth - 0.5) * 2;
        my = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    function animate() {
        stickers.forEach(s => {
            const speed = parseFloat(s.dataset.speed) || 0.03;
            gsap.to(s, {
                x: mx * speed * 800,
                y: my * speed * 800,
                duration: 1.5,
                ease: 'power2.out',
                overwrite: 'auto'
            });
        });
        requestAnimationFrame(animate);
    }
    animate();
}

// ============================================
// 3D DECOR + COMIC ELEMENTS PARALLAX
// ============================================
function init3DDecor() {
    const objects = document.querySelectorAll('.float-obj');
    const comicEls = document.querySelectorAll('.comic-bubble, .comic-burst, .comic-star, .doodle-arrow');
    let mx = 0, my = 0;

    document.addEventListener('mousemove', e => {
        mx = (e.clientX / window.innerWidth - 0.5) * 2;
        my = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    function animate() {
        objects.forEach((obj, i) => {
            const speed = 0.01 + (i * 0.004);
            const rotSpeed = 6 + (i * 3);
            gsap.to(obj, {
                x: mx * speed * 250,
                y: my * speed * 250,
                rotateX: my * rotSpeed,
                rotateY: mx * rotSpeed,
                duration: 2,
                ease: 'power2.out',
                overwrite: 'auto'
            });
        });

        comicEls.forEach((el, i) => {
            const speed = 0.005 + (i * 0.002);
            gsap.to(el, {
                x: mx * speed * 150,
                y: my * speed * 150,
                duration: 2.5,
                ease: 'power2.out',
                overwrite: 'auto'
            });
        });

        requestAnimationFrame(animate);
    }
    animate();
}

// ============================================
// BUILD COLLAGE
// ============================================
function buildCollage() {
    const collage = document.getElementById('collage');
    if (!collage) return;

    // Section label
    const label = document.createElement('div');
    label.className = 'collage-label';
    label.textContent = '~ les sketches ~';
    collage.appendChild(label);

    // Grid container
    const grid = document.createElement('div');
    grid.className = 'collage-grid';

    // Shuffle days, Base first
    const indices = shuffleArray([...Array(31).keys()].map(i => i + 1));
    indices.unshift(0);

    // Decide which cards are big or tall for visual variety
    const bigCards = new Set();
    const tallCards = new Set();
    // Every ~5th card is big (spans 2 cols)
    for (let k = 2; k < indices.length; k += Math.floor(Math.random() * 3) + 4) {
        bigCards.add(k);
    }
    // Some cards are tall
    for (let k = 1; k < indices.length; k += Math.floor(Math.random() * 4) + 5) {
        if (!bigCards.has(k)) tallCards.add(k);
    }

    const tapeStyles = ['tape-left', 'tape-right', 'tape-center'];
    const rotRange = 3.5; // max rotation degrees

    indices.forEach((i, idx) => {
        const isBase = i === 0;
        const num = isBase ? '#' : String(i).padStart(2, '0');
        const title = dayTitles[i] || `Jour ${i}`;
        const href = isBase ? 'sketches/Base/index.html' : `sketches/jour ${i}/index.html`;

        // Create card
        const card = document.createElement('div');
        card.className = 'sketch-card';

        // Variation
        if (bigCards.has(idx)) card.classList.add('card-big');
        if (tallCards.has(idx)) card.classList.add('card-tall');

        // Random rotation
        const rot = (Math.random() - 0.5) * rotRange * 2;
        card.style.setProperty('--rot', rot + 'deg');

        // Frame (polaroid style)
        const frame = document.createElement('div');
        frame.className = 'card-frame';

        // Tape strip
        const tape = document.createElement('div');
        tape.className = 'card-tape ' + tapeStyles[idx % tapeStyles.length];
        frame.appendChild(tape);

        // Embed area
        const embed = document.createElement('div');
        embed.className = 'card-embed';
        embed.innerHTML = `
            <div class="embed-loader">
                <span class="ld-text">loading...</span>
                <div class="ld-bar"><div class="ld-fill"></div></div>
            </div>
        `;
        embed.dataset.src = href;
        frame.appendChild(embed);

        // Open button (appears on hover)
        const openLink = document.createElement('a');
        openLink.className = 'card-open-link';
        openLink.href = href;
        openLink.innerHTML = '&#8599;';
        openLink.title = 'ouvrir le sketch';
        frame.appendChild(openLink);

        // Label (handwritten style at bottom of polaroid)
        const labelDiv = document.createElement('div');
        labelDiv.className = 'card-label';
        labelDiv.innerHTML = `
            <span class="card-num">${num}</span>
            <span class="card-title">${title}</span>
        `;
        frame.appendChild(labelDiv);

        card.appendChild(frame);

        // Annotation (random handwritten note near card)
        if (Math.random() > 0.5) {
            const anno = document.createElement('div');
            anno.className = 'card-annotation';
            anno.textContent = annotations[Math.floor(Math.random() * annotations.length)];
            const positions = [
                { bottom: '-18px', right: '10px', transform: 'rotate(5deg)' },
                { top: '-18px', left: '80px', transform: 'rotate(-4deg)' },
                { bottom: '-16px', left: '10px', transform: 'rotate(-6deg)' },
            ];
            const pos = positions[Math.floor(Math.random() * positions.length)];
            Object.assign(anno.style, pos);
            card.appendChild(anno);
        }

        // 3D tilt
        embed.addEventListener('mousemove', e => {
            const rect = embed.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            gsap.to(frame, {
                rotateY: x * 8,
                rotateX: -y * 8,
                duration: 0.4,
                ease: 'power2.out',
                transformPerspective: 600,
            });
        });
        embed.addEventListener('mouseleave', () => {
            gsap.to(frame, {
                rotateY: 0, rotateX: 0,
                duration: 0.7,
                ease: 'elastic.out(1, 0.6)',
            });
        });

        grid.appendChild(card);

        // Add comic divider every 9 cards
        if (idx > 0 && idx % 9 === 0 && idx < indices.length - 1) {
            const divider = document.createElement('div');
            divider.className = 'collage-divider';
            const icons = ['***', '~~~', '///','<3', '!!!', '???'];
            divider.innerHTML = `<span class="divider-icon">${icons[Math.floor(Math.random() * icons.length)]}</span>`;
            grid.appendChild(divider);
        }
    });

    collage.appendChild(grid);

    // Lazy load iframes
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const embed = entry.target;
                if (!embed.querySelector('iframe')) {
                    const iframe = document.createElement('iframe');
                    iframe.src = embed.dataset.src;
                    iframe.loading = 'lazy';
                    iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin');
                    iframe.addEventListener('load', () => {
                        const loader = embed.querySelector('.embed-loader');
                        if (loader) gsap.to(loader, { opacity: 0, duration: 0.3, onComplete: () => loader.remove() });
                    });
                    embed.prepend(iframe);
                }
                observer.unobserve(embed);
            }
        });
    }, { rootMargin: '300px 0px' });

    document.querySelectorAll('.card-embed').forEach(el => observer.observe(el));

    initMagnetic();
}

// ============================================
// HERO ENTRANCE
// ============================================
function animateHeroEntrance() {
    gsap.from('.hero-badge', {
        scale: 0, rotation: -20, opacity: 0,
        duration: 0.8, delay: 0.1,
        ease: 'back.out(3)',
    });

    gsap.from('.title-line', {
        y: 150, opacity: 0,
        duration: 1.3, stagger: 0.1,
        ease: 'power4.out',
    });

    gsap.from('.hero-sub', {
        y: 40, opacity: 0,
        duration: 1, delay: 0.4,
        ease: 'power3.out',
    });

    gsap.from('.hero-scroll-cta', {
        y: 30, opacity: 0,
        duration: 1, delay: 0.8,
        ease: 'power2.out',
    });

    gsap.from('.sticker', {
        scale: 0,
        rotation: () => gsap.utils.random(-180, 180),
        opacity: 0, duration: 1.2,
        stagger: 0.07, delay: 0.5,
        ease: 'back.out(3)',
    });

    gsap.from('.float-obj', {
        scale: 0, opacity: 0,
        duration: 1, stagger: 0.08, delay: 0.6,
        ease: 'back.out(2)',
    });

    gsap.from('.hero-cloud', {
        x: -100, opacity: 0,
        duration: 2, stagger: 0.3, delay: 0.3,
        ease: 'power2.out',
    });

    // Comic elements
    gsap.from('.comic-bubble', {
        scale: 0, opacity: 0,
        duration: 0.8, stagger: 0.15, delay: 1,
        ease: 'back.out(2)',
    });

    gsap.from('.comic-burst', {
        scale: 0, rotation: -30, opacity: 0,
        duration: 1, stagger: 0.2, delay: 1.2,
        ease: 'back.out(2)',
    });
}

// ============================================
// SCROLL ANIMATIONS
// ============================================
function initScrollAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    // BG text parallax
    gsap.to('.hero-bg-text', {
        x: -300,
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5,
        }
    });

    // 3D objects scroll parallax
    document.querySelectorAll('.float-obj').forEach((obj, i) => {
        const direction = i % 2 === 0 ? 1 : -1;
        gsap.to(obj, {
            y: direction * (120 + i * 30),
            scrollTrigger: {
                trigger: 'body',
                start: 'top top',
                end: 'bottom bottom',
                scrub: 2 + i * 0.3,
            }
        });
    });

    // Collage label
    gsap.from('.collage-label', {
        scale: 0.5, opacity: 0, rotation: -10,
        duration: 1,
        ease: 'back.out(2)',
        scrollTrigger: { trigger: '.collage-label', start: 'top 90%' }
    });

    // Cards stagger in
    document.querySelectorAll('.sketch-card').forEach((card, i) => {
        const fromLeft = i % 3 === 0;
        const fromRight = i % 3 === 2;

        gsap.from(card, {
            y: 80,
            x: fromLeft ? -60 : fromRight ? 60 : 0,
            opacity: 0,
            scale: 0.9,
            rotation: (Math.random() - 0.5) * 10,
            duration: 0.9,
            ease: 'back.out(1.5)',
            scrollTrigger: {
                trigger: card,
                start: 'top 92%',
            }
        });
    });

    // Dividers
    document.querySelectorAll('.collage-divider').forEach(div => {
        gsap.from(div, {
            scaleX: 0, opacity: 0,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: { trigger: div, start: 'top 90%' }
        });
    });

    // Footer
    gsap.from('.footer-bubble', {
        y: 40, scale: 0.8, opacity: 0,
        duration: 0.8,
        ease: 'back.out(2)',
        scrollTrigger: { trigger: '.goofy-footer', start: 'top 92%' }
    });
}

// ============================================
// UTILS
// ============================================
function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// ============================================
// INIT
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initLoader();
    initCursor();
    initStickersParallax();
    init3DDecor();
    buildCollage();
    initScrollAnimations();
    loadBot();

    document.getElementById('user-input').addEventListener('keypress', e => {
        if (e.key === 'Enter') sendMessage();
    });
});
