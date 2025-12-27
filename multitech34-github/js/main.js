/**
 * Multitech34 - JavaScript V2.0 Excellence
 * Madison IA Hyper-Intelligente + Formulaires Avancés
 */

const CONFIG = {
    phone: '06 49 95 52 98',
    phoneClean: '0649955298',
    email: 'babferrer@icloud.com',
    zones: {
        lattes: { name: 'Lattes', time: '30 min', code: '34970' },
        montpellier: { name: 'Montpellier', time: '45 min', code: '34000' },
        perols: { name: 'Pérols', time: '35 min', code: '34470' },
        castelnau: { name: 'Castelnau-le-Lez', time: '45 min', code: '34170' },
        palavas: { name: 'Palavas', time: '40 min', code: '34250' }
    },
    tarifs: {
        urgence: 89, rechercheFuite: 149, entretienChaudiere: 119,
        entretienPAC: 149, entretienClim: 89, hygieneplus: 139, chauffeeauMO: 350
    }
};

let madisonContext = { history: [], urgency: 0 };

document.addEventListener('DOMContentLoaded', () => {
    initHeader(); initMobileMenu(); initFAQ(); initMadison();
    initSmoothScroll(); initFormValidation(); initScrollAnimations();
});

function initHeader() {
    const header = document.getElementById('header');
    if (!header) return;
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const scroll = window.pageYOffset;
        header.classList.toggle('scrolled', scroll > 50);
        header.style.transform = (scroll > lastScroll && scroll > 200) ? 'translateY(-100%)' : 'translateY(0)';
        lastScroll = scroll;
    });
}

function initMobileMenu() {
    const toggle = document.getElementById('mobile-toggle');
    const menu = document.getElementById('mobile-menu');
    if (!toggle || !menu) return;
    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        menu.classList.toggle('active');
        document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
    });
    menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
        toggle.classList.remove('active'); menu.classList.remove('active');
        document.body.style.overflow = '';
    }));
}

function initFAQ() {
    document.querySelectorAll('.faq-question').forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.parentElement;
            document.querySelectorAll('.faq-item.active').forEach(i => {
                if (i !== item) { i.classList.remove('active'); i.querySelector('.faq-question').setAttribute('aria-expanded', 'false'); }
            });
            item.classList.toggle('active');
            btn.setAttribute('aria-expanded', item.classList.contains('active'));
        });
    });
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                window.scrollTo({ top: target.offsetTop - 100, behavior: 'smooth' });
            }
        });
    });
}

// ============================================
// MADISON IA HYPER-INTELLIGENTE
// ============================================
function initMadison() {
    const toggleBtn = document.getElementById('madison-toggle');
    const closeBtn = document.getElementById('madison-close');
    const sendBtn = document.getElementById('madison-send');
    const input = document.getElementById('madison-input');
    
    toggleBtn?.addEventListener('click', () => toggleMadison());
    closeBtn?.addEventListener('click', () => toggleMadison(false));
    sendBtn?.addEventListener('click', sendMessage);
    input?.addEventListener('keypress', e => { if (e.key === 'Enter') sendMessage(); });
    
    document.querySelectorAll('.quick-reply').forEach(btn => {
        btn.addEventListener('click', () => {
            addMessage(btn.dataset.message || btn.textContent, 'user');
            setTimeout(() => processResponse(btn.dataset.message || btn.textContent), 800);
        });
    });
}

function toggleMadison(show = null) {
    const chat = document.getElementById('madison-chat');
    if (!chat) return;
    const shouldShow = show !== null ? show : !chat.classList.contains('active');
    chat.classList.toggle('active', shouldShow);
    
    if (shouldShow && madisonContext.history.length === 0) {
        const hour = new Date().getHours();
        const greeting = hour < 12 ? 'Bonjour' : hour < 18 ? 'Bon après-midi' : 'Bonsoir';
        setTimeout(() => addMessage(`${greeting} ! 👋 Je suis Madison, l'assistante de Bastien. Comment puis-je vous aider ?`, 'madison'), 500);
    }
}

function sendMessage() {
    const input = document.getElementById('madison-input');
    const msg = input?.value.trim();
    if (!msg) return;
    addMessage(msg, 'user');
    input.value = '';
    showTyping();
    setTimeout(() => { hideTyping(); processResponse(msg); }, 800 + Math.random() * 800);
}

function addMessage(text, sender) {
    const container = document.getElementById('madison-messages');
    if (!container) return;
    const div = document.createElement('div');
    div.className = `message ${sender}`;
    div.innerHTML = `<div class="message-bubble ${sender}">${text}</div>`;
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
    madisonContext.history.push({ sender, text });
}

function showTyping() {
    const container = document.getElementById('madison-messages');
    if (!container) return;
    const div = document.createElement('div');
    div.className = 'message madison'; div.id = 'madison-typing';
    div.innerHTML = '<div class="message-bubble madison"><span class="dot"></span><span class="dot"></span><span class="dot"></span></div>';
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
}

function hideTyping() { document.getElementById('madison-typing')?.remove(); }

function processResponse(message) {
    const msg = message.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    let response = '';
    
    // URGENCE
    const urgentWords = ['urgent', 'urgence', 'fuite', 'inondation', 'inonde', 'eau partout', 'vite', 'sos'];
    if (urgentWords.some(w => msg.includes(w))) {
        response = `🚨 <strong>Urgence détectée !</strong><br><br>`;
        if (msg.includes('fuite') || msg.includes('eau')) {
            response += `<strong>En attendant :</strong><br>1️⃣ Fermez l'arrivée d'eau générale<br>2️⃣ Coupez l'électricité si besoin<br>3️⃣ Épongez<br><br>`;
        }
        response += `📞 <strong>Appelez maintenant :</strong><br><a href="tel:${CONFIG.phoneClean}" style="color:#ef4444;font-weight:bold;font-size:1.2em">${CONFIG.phone}</a><br><br><em>30 min sur Lattes, 45 min sur Montpellier</em>`;
        addMessage(response, 'madison'); return;
    }
    
    // DEVIS / PRIX
    if (msg.includes('devis') || msg.includes('prix') || msg.includes('tarif') || msg.includes('combien') || msg.includes('cout')) {
        if (msg.includes('fuite') || msg.includes('recherche')) {
            response = `💧 <strong>Recherche de fuite</strong><br><br><strong>Tarif : ${CONFIG.tarifs.rechercheFuite}€ TTC</strong><br>✅ Caméra thermique<br>✅ Rapport assurance inclus<br>✅ Devis réparation gratuit<br><br>👉 <a href="contact.html">Demander un RDV</a>`;
        } else if (msg.includes('chaudiere') || msg.includes('entretien')) {
            response = `🔥 <strong>Entretien chaudière</strong><br><br><strong>Tarif : ${CONFIG.tarifs.entretienChaudiere}€ TTC</strong><br>(Obligatoire 1x/an)<br>✅ Nettoyage complet<br>✅ Contrôle CO<br>✅ Attestation<br><br>👉 <a href="contact.html">Réserver</a>`;
        } else if (msg.includes('clim')) {
            response = `❄️ <strong>Climatisation</strong><br><br>Entretien : <strong>${CONFIG.tarifs.entretienClim}€</strong><br>Hygiène+ : <strong>${CONFIG.tarifs.hygieneplus}€</strong><br>Installation : sur devis<br><br>👉 <a href="contact.html">Devis gratuit</a>`;
        } else if (msg.includes('pac') || msg.includes('pompe') || msg.includes('chaleur')) {
            response = `🌿 <strong>Pompe à chaleur</strong><br><br>Installation : <strong>sur devis</strong><br>Entretien : <strong>${CONFIG.tarifs.entretienPAC}€</strong><br><br>✅ RGE QualiPAC<br>✅ Éligible MaPrimeRénov'<br><br>👉 <a href="contact.html">Étude gratuite</a>`;
        } else {
            response = `📋 <strong>Tarifs 2025</strong><br><br>Dépannage urgence : <strong>${CONFIG.tarifs.urgence}€</strong><br>Recherche fuite : <strong>${CONFIG.tarifs.rechercheFuite}€</strong><br>Entretien chaudière : <strong>${CONFIG.tarifs.entretienChaudiere}€</strong><br>Entretien clim : <strong>${CONFIG.tarifs.entretienClim}€</strong><br>Hygiène+ : <strong>${CONFIG.tarifs.hygieneplus}€</strong><br><br>💡 Tous les devis sont gratuits !`;
        }
        addMessage(response, 'madison'); return;
    }
    
    // ZONES
    if (msg.includes('zone') || msg.includes('secteur') || msg.includes('ville') || msg.includes('intervient') || msg.includes('ou ')) {
        for (const [key, zone] of Object.entries(CONFIG.zones)) {
            if (msg.includes(key) || msg.includes(zone.name.toLowerCase())) {
                response = `📍 <strong>${zone.name} (${zone.code})</strong><br><br>✅ Oui ! Bastien intervient<br>⏱️ Délai : <strong>${zone.time}</strong><br><br>📞 <a href="tel:${CONFIG.phoneClean}">${CONFIG.phone}</a>`;
                addMessage(response, 'madison'); return;
            }
        }
        response = `📍 <strong>Zones couvertes</strong><br><br>`;
        for (const zone of Object.values(CONFIG.zones)) response += `• ${zone.name} : ${zone.time}<br>`;
        response += `<br>Ailleurs ? Appelez !`;
        addMessage(response, 'madison'); return;
    }
    
    // HORAIRES
    if (msg.includes('horaire') || msg.includes('ouvert') || msg.includes('quand')) {
        response = `🕐 <strong>Horaires</strong><br><br>Lun-Ven : 7h-20h<br>Samedi : 8h-18h<br><strong>Urgences : 24/7</strong><br><br>📞 <a href="tel:${CONFIG.phoneClean}">${CONFIG.phone}</a>`;
        addMessage(response, 'madison'); return;
    }
    
    // RGE / CERTIFICATIONS
    if (msg.includes('rge') || msg.includes('certif') || msg.includes('aide') || msg.includes('prime')) {
        response = `🏆 <strong>Certifications</strong><br><br>✅ RGE QualiPAC<br>✅ Fluides Frigorigènes Cat I<br>✅ Assurance RC Pro<br><br>💰 <strong>Aides 2025 :</strong><br>MaPrimeRénov' jusqu'à 5000€<br>Prime CEE cumulable<br>TVA 5,5%<br><br>👉 <a href="contact.html">Étude gratuite</a>`;
        addMessage(response, 'madison'); return;
    }
    
    // PROBLÈMES SPÉCIFIQUES
    if (msg.includes('radiateur') && (msg.includes('froid') || msg.includes('chauffe'))) {
        response = `🔥 <strong>Radiateur froid ?</strong><br><br>Froid <strong>en haut</strong> → Purgez !<br>Froid <strong>en bas</strong> → Boue (désembouage)<br>Tous froids → Problème chaudière<br><br>📞 <a href="tel:${CONFIG.phoneClean}">Diagnostic gratuit</a>`;
        addMessage(response, 'madison'); return;
    }
    
    if (msg.includes('clim') && (msg.includes('odeur') || msg.includes('sent'))) {
        response = `😷 <strong>Clim qui sent ?</strong><br><br>= Bactéries dans l'évaporateur !<br><br>✅ Solution : Forfait Hygiène+ (${CONFIG.tarifs.hygieneplus}€)<br>• Traitement bactéricide<br>• Traitement fongicide<br><br>👉 <a href="contact.html">Réserver</a>`;
        addMessage(response, 'madison'); return;
    }
    
    if (msg.includes('wc') || msg.includes('bouche') || msg.includes('toilette')) {
        response = `🚽 <strong>WC/Canalisation bouchée ?</strong><br><br>Essayez : ventouse ou eau bouillante<br><br>Sinon : <strong>${CONFIG.tarifs.urgence}€</strong> (débouchage pro)<br><br>📞 <a href="tel:${CONFIG.phoneClean}">${CONFIG.phone}</a>`;
        addMessage(response, 'madison'); return;
    }
    
    // SALUTATIONS
    if (msg.match(/^(bonjour|salut|hello|hey)/)) {
        response = `Bonjour ! 😊<br><br>Je peux vous aider avec :<br>• Devis gratuit<br>• Urgence<br>• Tarifs<br>• Prise de RDV`;
        addMessage(response, 'madison'); return;
    }
    
    if (msg.match(/(merci|super|parfait)/)) {
        response = `Avec plaisir ! 😊<br><br>📞 <a href="tel:${CONFIG.phoneClean}">${CONFIG.phone}</a>`;
        addMessage(response, 'madison'); return;
    }
    
    // DÉFAUT
    response = `Je peux vous aider avec :<br>• "tarifs" ou "devis"<br>• "urgence" ou "fuite"<br>• "zones" ou une ville<br>• "horaires"<br><br>📞 <a href="tel:${CONFIG.phoneClean}">${CONFIG.phone}</a>`;
    addMessage(response, 'madison');
}

window.toggleMadison = toggleMadison;

// ============================================
// FORMULAIRES
// ============================================
function initFormValidation() {
    document.querySelectorAll('form').forEach(form => {
        form.querySelectorAll('input, textarea').forEach(field => {
            field.addEventListener('blur', () => validateField(field));
        });
        form.addEventListener('submit', e => {
            let valid = true;
            form.querySelectorAll('[required]').forEach(f => { if (!validateField(f)) valid = false; });
            if (!valid) { e.preventDefault(); alert('Veuillez remplir tous les champs obligatoires.'); }
        });
    });
}

function validateField(field) {
    const value = field.value.trim();
    let valid = true;
    if (field.hasAttribute('required') && !value) valid = false;
    if (field.type === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) valid = false;
    if (field.type === 'tel' && value && !/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/.test(value)) valid = false;
    field.style.borderColor = valid ? '' : '#ef4444';
    return valid;
}

// ============================================
// ANIMATIONS SCROLL
// ============================================
function initScrollAnimations() {
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });
        document.querySelectorAll('.service-card, .tarif-card, .zone-card, .avis-card').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }
}
