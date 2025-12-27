// Multitech34 - JavaScript Principal
// RenaissanceV1 - Version optimisÃ©e

// Configuration Madison AI
const madisonConfig = {
    name: "Madison",
    version: "1.0.0",
    owner: "Bastien",
    company: "Multitech34",
    phone: "06 49 95 52 98",
    email: "babferrer@icloud.com",
    location: "Lattes (34970), HÃ©rault",
    services: [
        "Plomberie gÃ©nÃ©rale",
        "DÃ©pannage d'urgence 24/7", 
        "Recherche de fuite",
        "Installation chauffage",
        "Entretien chaudiÃ¨re",
        "Climatisation rÃ©versible",
        "Installation sanitaire",
        "RÃ©paration fuite eau"
    ],
    cities: [
        "Lattes (34970)",
        "Montpellier (34000)",
        "Castelnau-le-Lez (34170)"
    ],
    responseTime: {
        lattes: "30 minutes",
        montpellier: "45 minutes",
        castelnau: "45 minutes"
    }
};

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
}

// Smooth Scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Fade In Animation on Scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // Observe service cards and other elements
    document.querySelectorAll('.service-card, .feature-card').forEach(card => {
        observer.observe(card);
    });
}

// Madison AI Functions
function toggleMadison() {
    const chat = document.getElementById('madisonChat');
    if (!chat) return;
    
    chat.classList.toggle('active');
    
    if (chat.classList.contains('active')) {
        addMessage('Bonjour ! ðŸ‘‹ Je suis Madison, l\'assistante de Bastien. Comment puis-je vous aider aujourd\'hui ?', 'madison');
    }
}

function addMessage(text, sender) {
    const messagesContainer = document.getElementById('madisonMessages');
    if (!messagesContainer) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    
    const bubbleDiv = document.createElement('div');
    bubbleDiv.className = `message-bubble ${sender}`;
    bubbleDiv.textContent = text;
    
    messageDiv.appendChild(bubbleDiv);
    messagesContainer.appendChild(messageDiv);
    
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function showTyping() {
    const indicator = document.getElementById('typingIndicator');
    if (!indicator) return;
    
    indicator.style.display = 'flex';
    setTimeout(() => {
        indicator.style.display = 'none';
    }, 2000);
}

function sendMessage() {
    const input = document.getElementById('madisonInput');
    if (!input) return;
    
    const message = input.value.trim();
    if (!message) return;
    
    addMessage(message, 'user');
    input.value = '';
    
    showTyping();
    
    setTimeout(() => {
        let response = '';
        
        // Analyse du message pour rÃ©ponse personnalisÃ©e
        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes('devis') || lowerMessage.includes('prix') || lowerMessage.includes('tarif')) {
            response = `Je peux vous prÃ©parer un devis gratuit sans engagement ! Appelez le ${madisonConfig.phone} ou remplissez le formulaire de contact. Tous nos prix sont transparents.`;
        } else if (lowerMessage.includes('urgence') || lowerMessage.includes('urgent')) {
            response = `Pour une urgence, appelez immÃ©diatement le ${madisonConfig.phone}. Je peux intervenir dans les 30 minutes Ã  Lattes et 45 minutes Ã  Montpellier.`;
        } else if (lowerMessage.includes('fuite') || lowerMessage.includes('fuit')) {
            response = `Pour une fuite d'eau, fermez l'arrivÃ©e d'eau principale et appelez-moi au ${madisonConfig.phone}. J'ai les outils pour dÃ©tecter la fuite sans casse grÃ¢ce Ã  mes Ã©quipements professionnels.`;
        } else if (lowerMessage.includes('chauffage') || lowerMessage.includes('chaudiÃ¨re')) {
            response = `Je suis spÃ©cialisÃ© en installation et entretien de chauffage. Pour un devis d'installation ou un entretien de chaudiÃ¨re, appelez ${madisonConfig.phone}.`;
        } else if (lowerMessage.includes('climatisation') || lowerMessage.includes('clim')) {
            response = `Je propose l'installation de climatisation rÃ©versible avec devis gratuit. Installation rapide et professionnelle Ã  Lattes et Montpellier. Appelez ${madisonConfig.phone}.`;
        } else if (lowerMessage.includes('lattes') || lowerMessage.includes('34970')) {
            response = `Je suis basÃ© Ã  Lattes et peux intervenir sous 30 minutes pour toute urgence. Appelez ${madisonConfig.phone} pour une intervention rapide.`;
        } else if (lowerMessage.includes('montpellier') || lowerMessage.includes('34000')) {
            response = `J'interviens Ã  Montpellier et ses environs sous 45 minutes. Pour une intervention Ã  Montpellier, appelez ${madisonConfig.phone}.`;
        } else if (lowerMessage.includes('bonjour') || lowerMessage.includes('salut')) {
            response = `Bonjour ! Je suis Madison, l'assistante de Bastien de Multitech34. Je peux vous aider avec tous vos besoins en plomberie, chauffage et climatisation. Que puis-je faire pour vous ?`;
        } else {
            response = `Je suis lÃ  pour vous aider ! Pour une rÃ©ponse personnalisÃ©e Ã  votre demande, appelez-moi au ${madisonConfig.phone} ou dÃ©crivez votre problÃ¨me de plomberie, chauffage ou climatisation.`;
        }
        
        addMessage(response, 'madison');
    }, 2500);
}

function selectQuickReply(element) {
    const message = element.textContent;
    addMessage(message, 'user');
    
    setTimeout(() => {
        let response = '';
        
        switch(message) {
            case 'Devis gratuit':
                response = `Je vous prÃ©pare un devis gratuit sans engagement ! Appelez le ${madisonConfig.phone} ou utilisez le formulaire de contact. Tous nos devis sont dÃ©taillÃ©s et transparents.`;
                break;
            case 'Urgence 24/7':
                response = `Pour toute urgence, appelez immÃ©diatement le ${madisonConfig.phone}. Intervention possible dans les 30 minutes Ã  Lattes et 45 minutes Ã  Montpellier. Je suis disponible 24/7.`;
                break;
            case 'Prix installation':
                response = `Les prix varient selon le service et les Ã©quipements. Appelez-moi au ${madisonConfig.phone} pour un devis personnalisÃ© et gratuit adaptÃ© Ã  votre projet.`;
                break;
            case 'Diagnostic fuite':
                response = `Je dispose d'Ã©quipement de dÃ©tection de fuites sans casse. Diagnostic prÃ©cis et rÃ©paration rapide garantie. Pour un diagnostic, appelez ${madisonConfig.phone}.`;
                break;
        }
        
        addMessage(response, 'madison');
    }, 2000);
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

// Performance Monitoring
function initPerformanceMonitoring() {
    // Core Web Vitals tracking
    if ('web-vital' in window) {
        // Track LCP, FID, CLS
        console.log('Performance monitoring initialized');
    }
}

// Form Enhancement
function enhanceContactForm() {
    const forms = document.querySelectorAll('form[action^="mailto:"]');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mt-4';
            successMessage.innerHTML = '<i class="fas fa-check-circle mr-2"></i>Votre demande a Ã©tÃ© envoyÃ©e avec succÃ¨s ! Je vous rÃ©ponds sous 2 heures.';
            
            form.appendChild(successMessage);
            
            // Scroll to message
            successMessage.scrollIntoView({ behavior: 'smooth' });
            
            // Remove message after 5 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 5000);
        });
    });
}

// Navigation Enhancement
function enhanceNavigation() {
    // Highlight current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('text-primary', 'border-b-2', 'border-primary');
        }
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initSmoothScrolling();
    initScrollAnimations();
    initPerformanceMonitoring();
    enhanceContactForm();
    enhanceNavigation();
    
    console.log('Multitech34 - RenaissanceV1 initialized successfully');
    console.log('â¤ï¸ Pour Lucille â¤ï¸');
});

// Export functions for global access
window.toggleMadison = toggleMadison;
window.sendMessage = sendMessage;
window.selectQuickReply = selectQuickReply;
window.handleKeyPress = handleKeyPress;