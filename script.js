// ============================================
// CHATBOT (RiveScript)
// ============================================
const bot = new RiveScript({ utf8: true });
let botReady = false;

function loadBot() {
    bot.loadFile('chatbot.rive')
        .then(() => { bot.sortReplies(); botReady = true; })
        .catch(err => console.error('RiveScript:', err));
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
                const url = target === 'Base'
                    ? 'sketches/Base/index.html'
                    : `sketches/jour ${target}/index.html`;
                setTimeout(() => { window.location.href = url; }, 900);
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
    icon.textContent = chatbot.classList.contains('closed') ? '+' : '—';
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

const loaderMessages = [
    'initialisation...',
    'chargement des modules...',
    'compilation des sketches...',
    'injection des variables...',
    'calibrage du renderer...',
    'connexion établie...',
    'build complete.',
    'lancement...',
    'ready.'
];

// ============================================
// SCRAMBLE TEXT
// ============================================
class ScrambleText {
    constructor(el) {
        this.el = el;
        this.chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&';
        this.originalText = el.textContent;
        this.frame = null;
    }

    scramble(callback) {
        let iteration = 0;
        const total = this.originalText.length * 4;
        clearInterval(this.frame);
        this.frame = setInterval(() => {
            this.el.textContent = this.originalText
                .split('')
                .map((char, i) => {
                    if (char === ' ') return ' ';
                    if (i < Math.floor(iteration / 4)) return char;
                    return this.chars[Math.floor(Math.random() * this.chars.length)];
                })
                .join('');
            if (iteration >= total) {
                clearInterval(this.frame);
                this.el.textContent = this.originalText;
                if (callback) callback();
            }
            iteration++;
        }, 28);
    }
}

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
                msg.style.opacity = 0.25;
            }, 100);
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
    document.addEventListener('mouseup',   () => document.body.classList.remove('cursor-click'));

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
        cursor.style.top  = cursorY + 'px';
        dotX += (mouseX - dotX) * 0.55;
        dotY += (mouseY - dotY) * 0.55;
        dot.style.left = dotX + 'px';
        dot.style.top  = dotY + 'px';
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
}

// ============================================
// CURSOR TRAIL
// ============================================
function initCursorTrail() {
    const COUNT = 10;
    const trail = [];
    let mx = 0, my = 0;

    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

    for (let i = 0; i < COUNT; i++) {
        const el = document.createElement('div');
        const alpha = 0.45 - i * 0.04;
        el.style.cssText = `
            position:fixed; width:3px; height:3px;
            background: rgba(57,255,20,${alpha.toFixed(2)});
            border-radius:50%; pointer-events:none; z-index:9998;
            transform:translate(-50%,-50%);
        `;
        document.body.appendChild(el);
        trail.push({ el, x: 0, y: 0 });
    }

    function animate() {
        trail.forEach((t, i) => {
            const prev = i === 0 ? { x: mx, y: my } : trail[i - 1];
            t.x += (prev.x - t.x) * 0.38;
            t.y += (prev.y - t.y) * 0.38;
            t.el.style.left = t.x + 'px';
            t.el.style.top  = t.y + 'px';
        });
        requestAnimationFrame(animate);
    }
    animate();
}

// ============================================
// MAGNETIC
// ============================================
function initMagnetic() {
    document.querySelectorAll('[data-magnetic]').forEach(el => {
        el.addEventListener('mousemove', e => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width  / 2;
            const y = e.clientY - rect.top  - rect.height / 2;
            gsap.to(el, { x: x * 0.25, y: y * 0.25, duration: 0.4, ease: 'power2.out' });
        });
        el.addEventListener('mouseleave', () => {
            gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.5)' });
        });
    });
}

// ============================================
// 3D OBJECTS PARALLAX
// ============================================
function init3DDecor() {
    const objects = document.querySelectorAll('.float-obj');
    let mx = 0, my = 0;

    document.addEventListener('mousemove', e => {
        mx = (e.clientX / window.innerWidth  - 0.5) * 2;
        my = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    function animate() {
        objects.forEach((obj, i) => {
            const speed = 0.01 + i * 0.004;
            const rot   = 5  + i * 2.5;
            gsap.to(obj, {
                x: mx * speed * 200, y: my * speed * 200,
                rotateX: my * rot, rotateY: mx * rot,
                duration: 2.2, ease: 'power2.out', overwrite: 'auto'
            });
        });
        requestAnimationFrame(animate);
    }
    animate();
}

// ============================================
// BUILD COLLAGE — TERMINAL CARDS
// ============================================
function buildCollage() {
    const collage = document.getElementById('collage');
    if (!collage) return;

    const label = document.createElement('div');
    label.className = 'collage-label';
    label.textContent = '31 sketches / genuary 2025';
    collage.appendChild(label);

    const grid = document.createElement('div');
    grid.className = 'collage-grid';

    const indices = shuffleArray([...Array(31).keys()].map(i => i + 1));
    indices.unshift(0);

    const bigCards  = new Set();
    const tallCards = new Set();
    for (let k = 2; k < indices.length; k += Math.floor(Math.random() * 3) + 4) {
        bigCards.add(k);
    }
    for (let k = 1; k < indices.length; k += Math.floor(Math.random() * 4) + 5) {
        if (!bigCards.has(k)) tallCards.add(k);
    }

    indices.forEach((i, idx) => {
        const isBase = i === 0;
        const num    = isBase ? '##' : String(i).padStart(2, '0');
        const title  = dayTitles[i] || `Jour ${i}`;
        const href   = isBase ? 'sketches/Base/index.html' : `sketches/jour ${i}/index.html`;
        const exeName = isBase ? 'BASE.exe' : `JOUR_${String(i).padStart(2, '0')}.exe`;

        const card = document.createElement('div');
        card.className = 'sketch-card';
        if (bigCards.has(idx))  card.classList.add('card-big');
        if (tallCards.has(idx)) card.classList.add('card-tall');

        const rot = (Math.random() - 0.5) * 3.5;
        card.style.setProperty('--rot', rot + 'deg');

        const frame = document.createElement('div');
        frame.className = 'card-frame';

        // Terminal top chrome
        const topBar = document.createElement('div');
        topBar.className = 'card-topbar';
        topBar.innerHTML = `
            <div class="topbar-dots">
                <span class="dot dot-r"></span>
                <span class="dot dot-y"></span>
                <span class="dot dot-g"></span>
            </div>
            <span class="topbar-title">${exeName}</span>
            <span class="topbar-status">&#9679;</span>
        `;
        frame.appendChild(topBar);

        // Embed
        const embed = document.createElement('div');
        embed.className = 'card-embed';
        embed.dataset.src = href;
        embed.innerHTML = `
            <div class="embed-loader">
                <span class="ld-text">loading...</span>
                <div class="ld-bar"><div class="ld-fill"></div></div>
            </div>
        `;
        frame.appendChild(embed);

        // Open link
        const openLink = document.createElement('a');
        openLink.className = 'card-open-link';
        openLink.href  = href;
        openLink.title = 'ouvrir le sketch';
        openLink.innerHTML = '&#8599;';
        frame.appendChild(openLink);

        // Label bar
        const labelDiv = document.createElement('div');
        labelDiv.className = 'card-label';
        labelDiv.innerHTML = `
            <span class="card-num">${num}</span>
            <span class="card-title">${title.toLowerCase()}</span>
        `;
        frame.appendChild(labelDiv);

        card.appendChild(frame);
        grid.appendChild(card);

        // Minimal divider every 9 cards
        if (idx > 0 && idx % 9 === 0 && idx < indices.length - 1) {
            const divider = document.createElement('div');
            divider.className = 'collage-divider';
            divider.innerHTML = `<span class="divider-icon">// ─ // ─ //</span>`;
            grid.appendChild(divider);
        }
    });

    collage.appendChild(grid);

    // 3D tilt on hover
    document.querySelectorAll('.card-embed').forEach(embed => {
        embed.addEventListener('mousemove', e => {
            const frame = embed.closest('.card-frame');
            if (!frame) return;
            const rect = embed.getBoundingClientRect();
            const x = (e.clientX - rect.left)  / rect.width  - 0.5;
            const y = (e.clientY - rect.top)    / rect.height - 0.5;
            gsap.to(frame, {
                rotateY: x * 6, rotateX: -y * 6,
                duration: 0.4, ease: 'power2.out',
                transformPerspective: 800,
            });
        });
        embed.addEventListener('mouseleave', () => {
            const frame = embed.closest('.card-frame');
            if (!frame) return;
            gsap.to(frame, {
                rotateY: 0, rotateX: 0,
                duration: 0.8, ease: 'elastic.out(1, 0.6)',
            });
        });
    });

    // Lazy-load iframes
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const embed = entry.target;
            if (embed.querySelector('iframe')) return;
            const iframe = document.createElement('iframe');
            iframe.src = embed.dataset.src;
            iframe.loading = 'lazy';
            iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin');
            iframe.addEventListener('load', () => {
                const loader = embed.querySelector('.embed-loader');
                if (loader) gsap.to(loader, { opacity: 0, duration: 0.3, onComplete: () => loader.remove() });
            });
            embed.prepend(iframe);
            observer.unobserve(embed);
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
        y: -16, opacity: 0,
        duration: 0.7, delay: 0.1,
        ease: 'power3.out',
    });

    gsap.from('.title-line', {
        y: 130, opacity: 0,
        duration: 1.3, stagger: 0.08,
        ease: 'power4.out',
    });

    gsap.from('.hero-sub', {
        y: 28, opacity: 0,
        duration: 0.8, delay: 0.35,
        ease: 'power3.out',
    });

    gsap.from('.hero-scroll-cta', {
        y: 18, opacity: 0,
        duration: 0.6, delay: 0.75,
        ease: 'power2.out',
    });

    gsap.from('.float-obj', {
        scale: 0, opacity: 0,
        duration: 1.6, stagger: 0.1, delay: 0.2,
        ease: 'back.out(2)',
    });

    // Scramble title after slide-in
    setTimeout(() => {
        document.querySelectorAll('.title-line[data-scramble]').forEach(el => {
            new ScrambleText(el).scramble();
        });
    }, 600);
}

// ============================================
// SCROLL ANIMATIONS
// ============================================
function initScrollAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to('.hero-bg-text', {
        x: -280,
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top', end: 'bottom top',
            scrub: 1.5,
        }
    });

    document.querySelectorAll('.float-obj').forEach((obj, i) => {
        gsap.to(obj, {
            y: (i % 2 === 0 ? 1 : -1) * (100 + i * 25),
            scrollTrigger: {
                trigger: 'body',
                start: 'top top', end: 'bottom bottom',
                scrub: 2 + i * 0.3,
            }
        });
    });

    gsap.from('.collage-label', {
        scale: 0.7, opacity: 0,
        duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.collage-label', start: 'top 92%' }
    });

    document.querySelectorAll('.sketch-card').forEach((card, i) => {
        gsap.from(card, {
            y: 70,
            x: i % 3 === 0 ? -40 : i % 3 === 2 ? 40 : 0,
            opacity: 0, scale: 0.93,
            duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 93%' }
        });
    });

    gsap.from('.footer-bubble', {
        y: 30, opacity: 0,
        duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: '.goofy-footer', start: 'top 93%' }
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
    initCursorTrail();
    init3DDecor();
    buildCollage();
    initScrollAnimations();
    loadBot();

    document.getElementById('user-input').addEventListener('keypress', e => {
        if (e.key === 'Enter') sendMessage();
    });
});
