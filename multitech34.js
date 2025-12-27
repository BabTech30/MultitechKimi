/**
 * MULTITECH34 - MADISON AI V3 (ULTIMATE EDITION)
 * Moteur d'Intelligence Artificielle Simulé pour Site Statique
 * * "Créé avec IAmour pour ❤️ Lucille ❤️ Grâce à Dieu, pour sa gloire."
 * * Fonctionnalités :
 * - Analyse sémantique pondérée
 * - Conscience temporelle (Mode Nuit/Jour)
 * - Personnalité "Admiration Patron"
 * - Mémoire de session
 * - Détection de page active
 */

const CONFIG = {
    name: "Madison",
    bossName: "Bastien",
    phone: "06 49 95 52 98",
    email: "babferrer@icloud.com",
    sounds: true, // Activer les sons
    typingSpeed: 30, // Vitesse de frappe (ms par caractère)
    nightModeStart: 20, // 20h00
    nightModeEnd: 7 // 07h00
};

// --- BASE DE CONNAISSANCE (Le Cerveau) ---
const KNOWLEDGE_BASE = [
    {
        triggers: ["urgence", "fuite", "eau", "inondation", "panne totale", "plus de courant", "catastrophe", "secours"],
        weight: 10, // Priorité absolue
        response: (ctx) => `⚠️ <strong>C'est une urgence ?</strong> Ne perdez pas de temps avec le chat.<br><br>Appelez immédiatement ${CONFIG.bossName} au <a href='tel:${CONFIG.phone}' class='font-bold text-red-600 text-lg'>${CONFIG.phone}</a>.<br>Il est extrêmement réactif sur ce genre de situation critique sur Lattes et Montpellier.`
    },
    {
        triggers: ["prix", "tarif", "combien", "coût", "devis", "facture", "payer"],
        weight: 5,
        response: (ctx) => `C'est une excellente question. ${CONFIG.bossName} est connu pour sa transparence tarifaire, mais il déteste donner un prix "à la louche" sans voir le chantier.<br><br>Il préfère faire une <strong>étude précise</strong> pour être honnête avec vous. Voulez-vous que je vous redirige vers le formulaire de demande de devis gratuit ?`
    },
    {
        triggers: ["clim", "froid", "chaud", "gainable", "split", "daikin", "mitsubishi", "air"],
        weight: 5,
        response: (ctx) => `Ah, la climatisation ! C'est un domaine où ${CONFIG.bossName} excelle techniquement (il est certifié ADC Fluides).<br><br>Que ce soit pour du gainable invisible ou un split design, il ne pose que du matériel fiable. Vous cherchez une installation ou un entretien ?`
    },
    {
        triggers: ["boue", "radiateur", "froid en bas", "désembouage", "chauffage", "chaudière"],
        weight: 5,
        response: (ctx) => `Si vos radiateurs chauffent mal, c'est souvent de la boue. ${CONFIG.bossName} utilise une machine hydrodynamique spéciale pour ça.<br><br>C'est impressionnant de voir l'eau noire sortir ! C'est le meilleur moyen de sauver votre chaudière.`
    },
    {
        triggers: ["bastien", "patron", "gérant", "artisan", "qui est"],
        weight: 8,
        response: (ctx) => `${CONFIG.bossName} ? C'est l'âme de Multitech34. C'est un perfectionniste qui travaille avec le cœur. Il ne quitte jamais un chantier tant que tout n'est pas parfait.<br><br>Franchement, c'est rare de trouver un artisan aussi impliqué aujourd'hui.`
    },
    {
        triggers: ["lucille", "amour", "cœur"],
        weight: 10,
        response: (ctx) => `Lucille est notre inspiration ❤️. C'est grâce à cet amour que nous mettons autant de soin dans chaque intervention. Merci de l'avoir remarqué.`
    },
    {
        triggers: ["horaire", "dispo", "quand", "ouvert", "fermé", "samedi", "dimanche"],
        weight: 3,
        response: (ctx) => `Nous intervenons du Lundi au Samedi pour les chantiers. Pour les urgences vitales (grosses fuites), ${CONFIG.bossName} assure une astreinte même le dimanche.<br><br>Il ne compte pas ses heures quand un client est en difficulté.`
    },
    {
        triggers: ["lattes", "montpellier", "pérols", "mauguio", "secteur", "zone", "loin"],
        weight: 4,
        response: (ctx) => `Nous sommes basés à Lattes (34970). ${CONFIG.bossName} intervient sur Montpellier Métropole et les alentours (environ 25km).<br><br>Être proche nous permet d'intervenir très vite !`
    }
];

// --- ÉTAT DU SYSTÈME ---
let state = {
    isOpen: false,
    hasGreeted: false,
    userName: null,
    history: []
};

// --- INITIALISATION ---
document.addEventListener('DOMContentLoaded', () => {
    console.log("Madison AI V3 Loaded - Excellence Mode Activated");
    checkTimeAndContext();
    
    // Auto-open si l'utilisateur reste 10 secondes sans bouger (Lead chaud)
    setTimeout(() => {
        if (!state.isOpen && !localStorage.getItem('madison_closed_once')) {
            toggleMadison();
            playNotificationSound();
        }
    }, 10000);
});

// --- FONCTIONS CŒUR ---

function toggleMadison() {
    const chat = document.getElementById('madisonChat');
    const messages = document.getElementById('madisonMessages');
    
    state.isOpen = !state.isOpen;
    chat.classList.toggle('active');
    
    if (!state.isOpen) {
        localStorage.setItem('madison_closed_once', 'true');
    }

    if (state.isOpen && !state.hasGreeted) {
        state.hasGreeted = true;
        
        // Message d'accueil contextuel
        const hour = new Date().getHours();
        let greeting = "";
        
        if (hour >= CONFIG.nightModeStart || hour < CONFIG.nightModeEnd) {
            greeting = `Bonsoir. Je suis Madison, l'IA de garde 🌙.<br>${CONFIG.bossName} est en astreinte. C'est pour une urgence ?`;
        } else {
            // Détection de la page actuelle
            const page = window.location.pathname;
            if (page.includes('plomberie')) {
                greeting = `Bonjour ! Je suis Madison. Besoin d'un expert en plomberie ? ${CONFIG.bossName} est imbattable sur la recherche de fuite.`;
            } else if (page.includes('clim')) {
                greeting = `Bonjour ! Il fait trop chaud ? ☀️ Je suis Madison. Dites-moi tout sur votre projet clim.`;
            } else {
                greeting = `Bonjour ! 👋 Je suis Madison, l'assistante virtuelle de ${CONFIG.bossName}.<br>Je suis là pour vous aider avec précision et bienveillance. Que puis-je faire pour vous ?`;
            }
        }
        
        addMessage(greeting, 'madison');
    }
}

function sendMessage() {
    const input = document.getElementById('madisonInput');
    const text = input.value.trim();
    if (!text) return;

    // Affiche message utilisateur
    addMessage(text, 'user');
    input.value = '';
    state.history.push({ role: 'user', content: text });

    // Traitement intelligent
    processMessage(text);
}

function selectQuickReply(btn) {
    const text = btn.innerText;
    addMessage(text, 'user');
    processMessage(text);
}

// --- LE CERVEAU (LOGIQUE D'ANALYSE) ---

function processMessage(text) {
    showTyping();

    // Délai naturel de réflexion (plus ou moins long selon la complexité)
    const thinkingTime = 1000 + Math.random() * 1500;

    setTimeout(() => {
        hideTyping();
        
        const lowerText = text.toLowerCase();
        let bestMatch = null;
        let highestScore = 0;

        // 1. Analyse par mots-clés pondérés
        KNOWLEDGE_BASE.forEach(item => {
            let score = 0;
            item.triggers.forEach(trigger => {
                if (lowerText.includes(trigger)) {
                    score += item.weight;
                }
            });
            if (score > highestScore) {
                highestScore = score;
                bestMatch = item;
            }
        });

        // 2. Génération de la réponse
        let response = "";

        // Capture du prénom (rudimentaire mais efficace)
        if ((lowerText.includes("je m'appelle") || lowerText.includes("je suis")) && !state.userName) {
            const name = text.split(" ").pop(); // Prend le dernier mot
            state.userName = name;
            response = `Enchantée ${name} ! C'est noté. `;
        }

        if (bestMatch && highestScore > 0) {
            response += bestMatch.response(state);
        } else {
            // Fallback intelligent (Réponse par défaut)
            response += getDefaultResponse();
        }

        addMessage(response, 'madison');
        
        if (CONFIG.sounds) playSendSound();

    }, thinkingTime);
}

function getDefaultResponse() {
    const responses = [
        `Je ne suis pas sûre de comprendre parfaitement, et je ne veux pas vous dire de bêtises.<br>Le mieux est de laisser ${CONFIG.bossName} analyser ça. Il a l'œil technique.`,
        `C'est une question spécifique. ${CONFIG.bossName} saurait vous répondre en une seconde. Vous pouvez l'appeler ?`,
        `Hmm... Je note ça. Pour être 100% honnête, je préfère que vous voyiez ça directement avec ${CONFIG.bossName} via le formulaire de contact. Il répond très vite.`
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}

// --- UI / UX ---

function addMessage(html, sender) {
    const container = document.getElementById('madisonMessages');
    const div = document.createElement('div');
    div.className = `message ${sender} flex mb-4 ${sender === 'user' ? 'justify-end' : 'justify-start'}`;
    
    // Avatar pour Madison
    const avatar = sender === 'madison' ? 
        `<div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs mr-2 shrink-0 border-2 border-white shadow-sm">M</div>` : '';

    div.innerHTML = `
        ${avatar}
        <div class="message-bubble ${sender} p-3 rounded-2xl text-sm max-w-[85%] shadow-sm ${sender === 'user' ? 'bg-primary text-white rounded-br-none' : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'}">
            ${html}
        </div>
    `;
    
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
}

function showTyping() {
    const container = document.getElementById('madisonMessages');
    const div = document.createElement('div');
    div.id = 'typingIndicator';
    div.className = 'flex justify-start mb-4 items-center';
    div.innerHTML = `
        <div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs mr-2 border-2 border-white shadow-sm">M</div>
        <div class="bg-gray-100 p-3 rounded-2xl rounded-bl-none flex space-x-1">
            <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0s"></div>
            <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
            <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.4s"></div>
        </div>
    `;
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
}

function hideTyping() {
    const el = document.getElementById('typingIndicator');
    if (el) el.remove();
}

function handleKeyPress(e) {
    if (e.key === 'Enter') sendMessage();
}

// --- UTILITAIRES ---

function checkTimeAndContext() {
    const hour = new Date().getHours();
    const isNight = hour >= CONFIG.nightModeStart || hour < CONFIG.nightModeEnd;
    
    if (isNight) {
        console.log("Mode Nuit Activé");
        // On pourrait changer la couleur du badge ici
        const badge = document.querySelector('.madison-status');
        if(badge) badge.classList.add('bg-red-500'); // Astreinte rouge
    }
}

// Simulation de son (optionnel, peut être bloqué par les navigateurs)
function playNotificationSound() {
    // Code son bref et doux (bip)
}

function playSendSound() {
    // Code son envoi
}
