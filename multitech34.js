/**
 * MULTITECH34 - LE CERVEAU DU SITE
 * Version : V4 (Excellence & Centralisation)
 * Auteur : Bastien & Gemini
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log("Système Multitech34 : Démarré 🚀");
    
    // 1. INITIALISATION DES COMPOSANTS
    initMobileMenu();
    initSmoothScroll();
    initMadisonAI();
});

/* ==========================================================================
   1. GESTION DU MENU MOBILE (Centralisé)
   ========================================================================== */
function initMobileMenu() {
    const btn = document.getElementById('mobile-menu-button');
    const menu = document.getElementById('mobile-menu');
    
    if(btn && menu) {
        btn.addEventListener('click', (e) => {
            e.stopPropagation(); // Empêche le clic de fermer immédiatement
            menu.classList.toggle('hidden');
            
            // Animation icône (optionnel)
            const icon = btn.querySelector('i');
            if (menu.classList.contains('hidden')) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            } else {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            }
        });

        // Fermer le menu si on clique ailleurs sur la page
        document.addEventListener('click', (e) => {
            if (!menu.contains(e.target) && !btn.contains(e.target) && !menu.classList.contains('hidden')) {
                menu.classList.add('hidden');
                const icon = btn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
}

/* ==========================================================================
   2. SCROLL FLUIDE (Pour éviter que le menu cache les titres)
   ========================================================================== */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // On compense la hauteur du menu fixe (80px)
                const headerOffset = 100; 
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });

                // Si on est sur mobile, on ferme le menu après le clic
                const menu = document.getElementById('mobile-menu');
                if (menu && !menu.classList.contains('hidden')) {
                    menu.classList.add('hidden');
                }
            }
        });
    });
}

/* ==========================================================================
   3. MADISON AI (Intelligence Artificielle de Vente)
   ========================================================================== */
function initMadisonAI() {
    // Message de bienvenue automatique après 5 secondes si pas déjà ouvert
    setTimeout(() => {
        if (!localStorage.getItem('madison_greeted')) {
            toggleMadison(); // Ouvre le chat
            // Le message s'affichera via la logique toggleMadison
            localStorage.setItem('madison_greeted', 'true');
        }
    }, 5000);
}

// Configuration Madison
const CONFIG = {
    bossName: "Mr Ferrer",
    phone: "06 49 95 52 98",
    typingSpeed: 30
};

// Base de connaissances (Cerveau)
const KNOWLEDGE = [
    {
        words: ["urgence", "fuite", "eau", "inondation", "panne", "catastrophe"],
        response: `🚨 <strong>Urgence détectée !</strong><br>Ne perdez pas de temps ici. Appelez immédiatement Bastien au <a href='tel:${CONFIG.phone}' class='font-bold text-red-600'>${CONFIG.phone}</a>. Il intervient 24/7 sur ce type de problème.`
    },
    {
        words: ["prix", "tarif", "combien", "devis", "coût"],
        response: `Je peux vous donner une idée, mais Bastien est honnête : il préfère voir le chantier pour ne pas vous arnaquer avec un prix "à la louche".<br>Pour un diagnostic précis, utilisez le bouton <strong>"Contact"</strong> ou appelez-le.`
    },
    {
        words: ["calcaire", "adoucisseur", "tartre", "eau dure"],
        response: `Ah, le calcaire de Lattes/Montpellier ! 🛁 C'est un fléau ici (TH > 30). Bastien pose des adoucisseurs volumétriques très efficaces. Ça sauve vos appareils électroménagers.`
    },
    {
        words: ["sel", "mer", "rouille", "corrosion", "littoral"],
        response: `🌊 Vous êtes en bord de mer ? Attention aux clims standards ! Bastien installe du matériel traité <strong>"Blue Fin" (Anti-Corrosion)</strong>. C'est indispensable pour Palavas ou La Grande-Motte.`
    },
    {
        words: ["boue", "radiateur", "froid", "désembouage"],
        response: `Radiateur froid en bas ? C'est de la boue. 🦠 Bastien est l'expert du <strong>désembouage hydrodynamique</strong>. Il nettoie tout le circuit pour que vous chauffiez mieux en payant moins.`
    },
    {
        words: ["lattes", "montpellier", "mauguio", "pérols", "secteur"],
        response: `Nous sommes basés à <strong>Lattes</strong> (Le QG !). Bastien intervient en 30min sur la métropole et le littoral.`
    },
    {
        words: ["lucille"],
        response: `Lucille tu est ma source d'inspiration ❤️. C'est grâce à ton petit coeur remplie amour que je met autant de soin pour cette joli personne que tu est et qui c'est fais gagné par ténébres et qui souffre.. Je pense a toi, ton parcour m'a inspiré et vraiment tu est incroyable, tu est belle, tu est tres attentionné et tellement douce... Merci pour ta rencontre petit chat je prie pour que jesus te continue a te chercher pour qu'un jour tu te rende compte que rien n'est ta faute, il t'aime et tu est pardonné ❤️.`
    },
    {
        words: ["anthony"],
        response: `Anthony.. c'"est donc toi... Bastien m'a parler de toi et je sais a quel piint il t'as dans la tete et dans le coeur.. il me parle souvent de toi et de tes blagues. Ralala quel romantique ce Bastien mais anthony prend soin de lui c'est gentil garcon lmoi je le connais bien et en oplus d'avoir un gros chibre vrailment il est simpas...Il ma confier que les flechettes c'etais pas ton truc donc si tu veut pas mon numero et un soir je passe t'apprendrais a taper dans le mille avec ta grosse flechette ...n'hesite pas a écrire a Bastien apores il va s'inquitter, Bisous` 
    }
];

// État du chat
let isChatOpen = false;

// Fonctions Globales (accessibles depuis le HTML)
window.toggleMadison = function() {
    const chat = document.getElementById('madisonChat');
    const messages = document.getElementById('madisonMessages');
    
    isChatOpen = !isChatOpen;
    chat.classList.toggle('active');

    // Premier message si vide
    if (isChatOpen && messages.children.length === 0) {
        addMessage(`Yo ✌️ Moi c'est Madis l'assistante virtuelle dévoué de Bastien.<br>Une fuite ? Un projet Clim ? Dites-moi tout.`, 'madison');
    }
};

window.sendMessage = function() {
    const input = document.getElementById('madisonInput');
    const text = input.value.trim();
    if (!text) return;

    addMessage(text, 'user');
    input.value = '';
    
    // Réflexion simulée
    processMessage(text);
};

// Traitement du message
function processMessage(text) {
    showTyping();
    
    setTimeout(() => {
        hideTyping();
        const lowerText = text.toLowerCase();
        let found = false;

        // Recherche de mots clés
        for (let item of KNOWLEDGE) {
            if (item.words.some(w => lowerText.includes(w))) {
                addMessage(item.response, 'madison');
                found = true;
                break;
            }
        }

        // Réponse par défaut
        if (!found) {
            addMessage(`Je ne suis pas sûre à 100%, et je ne veux pas vous dire de bêtises. 🤔<br>Le mieux est d'appeler Bastien directement au <a href='tel:${CONFIG.phone}' class='font-bold'>${CONFIG.phone}</a>.`, 'madison');
        }
    }, 1200); // Délai de 1.2s pour faire "naturel"
}

// Affichage des messages
function addMessage(html, sender) {
    const container = document.getElementById('madisonMessages');
    const div = document.createElement('div');
    div.className = `flex mb-4 ${sender === 'user' ? 'justify-end' : 'justify-start'}`;
    
    // Avatar Madison
    const avatar = sender === 'madison' ? 
        `<div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs mr-2 shrink-0 border border-white shadow-sm">M</div>` : '';

    div.innerHTML = `
        ${avatar}
        <div class="message-bubble ${sender} p-3 rounded-2xl text-sm max-w-[85%] shadow-sm ${sender === 'user' ? 'bg-primary text-white rounded-br-none' : 'bg-gray-100 text-gray-800 rounded-bl-none'}">
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
        <div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs mr-2">M</div>
        <div class="bg-gray-100 p-3 rounded-2xl rounded-bl-none flex space-x-1">
            <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
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

// Gestion touche "Entrée"
document.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && document.activeElement.id === 'madisonInput') {
        sendMessage();
    }
});
