const bot = new RiveScript({ utf8: true });
let botReady = false;

function loadBot() {
    bot.loadFile('chatbot.rive')
        .then(() => {
            bot.sortReplies();
            botReady = true;
            console.log('✅ Chatbot prêt !');
        })
        .catch(err => console.error('❌ Erreur RiveScript:', err));
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

                // Construction de l'URL propre
                const url = (target === 'Base') 
                    ? `sketches/Base/index.html` 
                    : `sketches/jour ${target}/index.html`;

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
    icon.textContent = chatbot.classList.contains('closed') ? '+' : '−';
}

function createGallery() {
    const gallery = document.getElementById('gallery');
    if (!gallery) return;
    const projects = ['Base', ...Array.from({length: 31}, (_, i) => `jour ${i + 1}`)];
    projects.forEach(p => {
        const card = document.createElement('a');
        card.className = 'day-card';
        card.href = `sketches/${p}/index.html`;
        const isBase = p === 'Base';
        const num = isBase ? '⚙️' : p.split(' ')[1];
        const title = isBase ? 'Base' : `Jour ${num}`;
        card.innerHTML = `<div class="day-number">${num}</div><div class="day-title">${title}</div>`;
        gallery.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    createGallery();
    loadBot();
    document.getElementById('user-input').addEventListener('keypress', e => {
        if (e.key === 'Enter') sendMessage();
    });
});