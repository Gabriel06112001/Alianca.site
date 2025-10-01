// Variáveis globais
let isMenuOpen = false;

// Aguarda o carregamento do DOM
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeFAQ();
    initializeScrollAnimations();
    initializeForm();
    initializeSmoothScroll();
    initializeScrollEffects();
    initializeCTAButtons();
});

// Inicialização da navegação mobile
function initializeNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', toggleMobileMenu);
        
        // Fecha o menu ao clicar em um link
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // Se for o botão CTA no menu, abre o chat
                if (this.classList.contains('btn-cta')) {
                    e.preventDefault();
                    openChatWidget();
                }
                closeMobileMenu();
            });
        });
        
        // Fecha o menu ao clicar fora dele
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                closeMobileMenu();
            }
        });
    }
    
    console.log('✅ Navegação inicializada');
}

// Toggle do menu mobile
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const navToggle = document.querySelector('.nav-toggle');
    
    isMenuOpen = !isMenuOpen;
    
    if (isMenuOpen) {
        navMenu.classList.add('active');
        navToggle.classList.add('active');
        document.body.style.overflow = 'hidden';
    } else {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Fecha o menu mobile
function closeMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const navToggle = document.querySelector('.nav-toggle');
    
    isMenuOpen = false;
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
    document.body.style.overflow = '';
}

// Inicialização do FAQ
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Fecha todos os itens
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
            });
            
            // Abre o item clicado se não estava ativo
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// Animações no scroll
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Anima cards em sequência
                if (entry.target.classList.contains('features-grid') || 
                    entry.target.classList.contains('solutions-grid') ||
                    entry.target.classList.contains('testimonials-grid') ||
                    entry.target.classList.contains('differentials-grid')) {
                    animateCardsSequence(entry.target);
                }
                
                // Anima barras de gráfico
                if (entry.target.classList.contains('chart-container')) {
                    animateChartBars();
                }
                
                // Anima ícones flutuantes
                if (entry.target.classList.contains('hero-visual')) {
                    animateFloatingIcons();
                }
                
                // Anima métricas
                if (entry.target.classList.contains('metrics-grid')) {
                    animateCounters();
                }
            }
        });
    }, observerOptions);

    // Elementos para animar
    const elementsToAnimate = [
        '.section-header',
        '.features-grid',
        '.solutions-grid',
        '.testimonials-grid',
        '.differentials-grid',
        '.process-timeline',
        '.company-content',
        '.value-highlight',
        '.cta-content',
        '.chart-container',
        '.hero-visual',
        '.metrics-grid'
    ];

    elementsToAnimate.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            element.classList.add('animate-on-scroll');
            observer.observe(element);
        });
    });
}

// Anima cards em sequência
function animateCardsSequence(container) {
    const cards = container.querySelectorAll('.feature-card, .solution-card, .testimonial-card, .step, .differential-item');
    
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'all 0.6s ease';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100);
        }, index * 150);
    });
}

// Anima barras de gráfico
function animateChartBars() {
    const chartBars = document.querySelectorAll('.chart-bar');
    
    chartBars.forEach((bar, index) => {
        setTimeout(() => {
            const percentage = bar.getAttribute('data-percentage');
            bar.style.setProperty('--width', percentage + '%');
        }, index * 300);
    });
}

// Anima ícones flutuantes
function animateFloatingIcons() {
    const floatingIcons = document.querySelectorAll('.floating-icon');
    
    floatingIcons.forEach((icon, index) => {
        setTimeout(() => {
            icon.style.opacity = '0';
            icon.style.transform = 'scale(0) translateY(20px)';
            icon.style.transition = 'all 0.8s ease';
            
            setTimeout(() => {
                icon.style.opacity = '1';
                icon.style.transform = 'scale(1) translateY(0)';
            }, 100);
        }, index * 200);
    });
}

// Contador animado para estatísticas
function animateCounters() {
    const counters = document.querySelectorAll('.stat strong, .stat-item strong, .metric-item strong, .company-stat strong');
    
    counters.forEach(counter => {
        const text = counter.textContent;
        const numbers = text.match(/\d+/g);
        
        if (numbers && numbers.length > 0) {
            const target = parseInt(numbers[0]);
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const updateCounter = () => {
                current += step;
                if (current < target) {
                    const newText = text.replace(/\d+/, Math.floor(current).toString());
                    counter.textContent = newText;
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = text;
                }
            };
            
            updateCounter();
        }
    });
}

// Inicialização do formulário
function initializeForm() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
        
        // Máscara para telefone
        const phoneInput = form.querySelector('input[type="tel"]');
        if (phoneInput) {
            phoneInput.addEventListener('input', formatPhoneNumber);
        }
        
        // Validação em tempo real
        const inputs = form.querySelectorAll('input[required], select[required]');
        inputs.forEach(input => {
            input.addEventListener('blur', validateInput);
            input.addEventListener('input', clearError);
            if (input.tagName === 'SELECT') {
                input.addEventListener('change', validateInput);
            }
        });
    }
}

// Manipulação do envio do formulário
async function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const submitButton = form.querySelector('button[type="submit"]');
    
    // Validação básica
    if (!validateForm(form)) {
        return;
    }
    
    // Estado de loading
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Enviando...';
    submitButton.classList.add('loading');
    submitButton.disabled = true;
    
    try {
        // Simula envio do formulário (substitua pela sua implementação)
        await simulateFormSubmission(formData);
        
        // Sucesso
        showSuccess('Análise gratuita solicitada com sucesso! Entraremos em contato em breve.');
        form.reset();
        
    } catch (error) {
        // Erro
        showError('Erro ao enviar formulário. Tente novamente.');
        console.error('Erro no envio:', error);
        
    } finally {
        // Restaura o botão
        submitButton.textContent = originalText;
        submitButton.classList.remove('loading');
        submitButton.disabled = false;
    }
}

// Simula envio do formulário (substitua pela implementação real)
function simulateFormSubmission(formData) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simula sucesso (90% de chance)
            if (Math.random() > 0.1) {
                resolve({ success: true });
            } else {
                reject(new Error('Erro simulado'));
            }
        }, 2000);
    });
}

// Validação do formulário
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], select[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!validateInput({ target: input })) {
            isValid = false;
        }
    });
    
    return isValid;
}

// Validação individual de input
function validateInput(e) {
    const input = e.target;
    const value = input.value.trim();
    const tagName = input.tagName.toLowerCase();
    let isValid = true;
    let errorMessage = '';
    
    // Remove erros anteriores
    clearError(e);
    
    // Validação básica de campo obrigatório
    if (input.hasAttribute('required') && (!value || (tagName === 'select' && value === ''))) {
        errorMessage = 'Este campo é obrigatório';
        isValid = false;
    }
    
    // Validação de email
    if (input.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            errorMessage = 'Por favor, insira um email válido';
            isValid = false;
        }
    }
    
    // Validação de telefone
    if (input.type === 'tel' && value) {
        const phoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
        if (!phoneRegex.test(value)) {
            errorMessage = 'Por favor, insira um telefone válido (ex: (11) 99999-9999)';
            isValid = false;
        }
    }
    
    // Validação de select
    if (input.tagName === 'SELECT' && value === '') {
        errorMessage = 'Por favor, selecione uma opção';
        isValid = false;
    }
    
    // Mostra erro se houver
    if (!isValid) {
        showInputError(input, errorMessage);
    }
    
    return isValid;
}

// Limpa erros do input
function clearError(e) {
    const input = e.target;
    const errorElement = input.parentNode.querySelector('.error-message');
    
    if (errorElement) {
        errorElement.remove();
    }
    
    input.style.borderColor = '';
}

// Mostra erro no input
function showInputError(input, message) {
    const errorElement = document.createElement('span');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    errorElement.style.color = '#ef4444';
    errorElement.style.fontSize = '0.875rem';
    errorElement.style.marginTop = '0.25rem';
    errorElement.style.display = 'block';
    
    input.style.borderColor = '#ef4444';
    input.parentNode.appendChild(errorElement);
}

// Formatação do telefone
function formatPhoneNumber(e) {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length >= 11) {
        value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (value.length >= 10) {
        value = value.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    } else if (value.length >= 6) {
        value = value.replace(/(\d{2})(\d{4})/, '($1) $2');
    } else if (value.length >= 2) {
        value = value.replace(/(\d{2})/, '($1) ');
    }
    
    e.target.value = value;
}

// Scroll suave
function initializeSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Se for um link para contato ou chat, abre o chat widget
            if (targetId === '#contato' || targetId === '#chat') {
                e.preventDefault();
                openChatWidget();
                closeMobileMenu();
                return;
            }
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Fecha menu mobile se estiver aberto
                closeMobileMenu();
            }
        });
    });
}

// Inicialização dos botões CTA
function initializeCTAButtons() {
    // Seleciona todos os botões que devem abrir o chat
    const chatButtons = document.querySelectorAll(`
        .btn-cta,
        .btn[href="#contato"],
        .btn[href="#chat"],
        [onclick="openChatWidget()"],
        .process-cta .btn
    `);
    
    chatButtons.forEach(button => {
        // Remove qualquer evento onclick existente
        button.removeAttribute('onclick');
        
        // Adiciona novo event listener
        button.addEventListener('click', function(e) {
            e.preventDefault();
            openChatWidget();
            closeMobileMenu(); // Fecha menu mobile se estiver aberto
        });
    });
    
    // Botões de telefone
    const phoneButtons = document.querySelectorAll('a[href^="tel:"]');
    phoneButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Permite que o link de telefone funcione normalmente
            // Opcionalmente, pode abrir uma modal de confirmação
            console.log('Iniciando chamada telefônica');
        });
    });
    
    // Links do WhatsApp
    const whatsappButtons = document.querySelectorAll('a[href*="wa.me"], a[href*="whatsapp"]');
    whatsappButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Permite que o link do WhatsApp funcione normalmente
            console.log('Abrindo WhatsApp');
        });
    });
    
    // Botões de submit em formulários
    const submitButtons = document.querySelectorAll('button[type="submit"], input[type="submit"]');
    submitButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const form = this.closest('form');
            if (form) {
                // Se o formulário for válido, processará normalmente
                // A validação já está implementada na função handleFormSubmit
                console.log('Processando formulário');
            }
        });
    });
}

// Efeitos de scroll
function initializeScrollEffects() {
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Header shrink/expand
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        // Header background opacity
        if (scrollTop > 50) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Funções de notificação
function showSuccess(message) {
    showNotification(message, 'success');
}

function showError(message) {
    showNotification(message, 'error');
}

function showNotification(message, type = 'info') {
    // Remove notificações existentes
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Cria nova notificação
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Estilos da notificação
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: '10000',
        maxWidth: '400px',
        padding: '1rem',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        backgroundColor: type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6',
        color: 'white',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease'
    });
    
    // Adiciona ao documento
    document.body.appendChild(notification);
    
    // Anima entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Botão de fechar
    const closeButton = notification.querySelector('.notification-close');
    closeButton.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        margin-left: 1rem;
        padding: 0;
    `;
    
    closeButton.addEventListener('click', () => {
        removeNotification(notification);
    });
    
    // Remove automaticamente após 5 segundos
    setTimeout(() => {
        removeNotification(notification);
    }, 5000);
}

function removeNotification(notification) {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 300);
}

// Funcionalidades adicionais

// Lazy loading para imagens (se houver)
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Parallax suave para hero
function initializeParallax() {
    const hero = document.querySelector('.hero');
    const heroVisual = document.querySelector('.hero-visual');
    
    if (hero && heroVisual && !isMobile()) {
        window.addEventListener('scroll', throttle(() => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            heroVisual.style.transform = `translateY(${rate}px)`;
        }, 16));
    }
}

// Smooth reveal para elementos
function initializeSmoothReveal() {
    const revealElements = document.querySelectorAll('.company-card, .value-item, .metric-item');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';
                entry.target.style.transition = 'all 0.6s ease';
                
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, Math.random() * 300);
            }
        });
    }, { threshold: 0.1 });
    
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
}

// Inicializa funcionalidades extras
document.addEventListener('DOMContentLoaded', function() {
    // ... código existente ...
    initializeParallax();
    initializeSmoothReveal();
});

// Detecta dispositivo móvel
function isMobile() {
    return window.innerWidth <= 768;
}

// Throttle function para otimizar eventos de scroll
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Debounce function para otimizar resize
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Redimensionamento da janela
window.addEventListener('resize', debounce(function() {
    // Fecha menu mobile se mudou para desktop
    if (!isMobile() && isMenuOpen) {
        closeMobileMenu();
    }
}, 250));

// Prevenção de zoom no iOS em inputs
if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            input.style.fontSize = '16px';
        });
        input.addEventListener('blur', function() {
            input.style.fontSize = '';
        });
    });
}

// Console log para debug (remover em produção)
console.log('Auxílio Maternidade - Site carregado com sucesso!');

// Função para verificar se todos os botões estão funcionando
function verifyButtonFunctionality() {
    console.log('=== VERIFICAÇÃO DE FUNCIONALIDADE DOS BOTÕES ===');
    
    // Verifica botões CTA
    const ctaButtons = document.querySelectorAll('.btn-cta, .btn[href="#contato"], .btn[href="#chat"]');
    console.log(`✅ Botões CTA encontrados: ${ctaButtons.length}`);
    
    // Verifica botões de processo
    const processButtons = document.querySelectorAll('.process-cta .btn');
    console.log(`✅ Botões de processo encontrados: ${processButtons.length}`);
    
    // Verifica chat widget
    const chatWidget = document.getElementById('chatWidget');
    console.log(`✅ Chat widget ${chatWidget ? 'encontrado' : 'NÃO encontrado'}`);
    
    // Verifica links de navegação
    const navLinks = document.querySelectorAll('.nav-menu a');
    console.log(`✅ Links de navegação encontrados: ${navLinks.length}`);
    
    // Verifica FAQ
    const faqItems = document.querySelectorAll('.faq-item');
    console.log(`✅ Itens de FAQ encontrados: ${faqItems.length}`);
    
    // Verifica telefone e WhatsApp
    const phoneButtons = document.querySelectorAll('a[href^="tel:"]');
    const whatsappButtons = document.querySelectorAll('a[href*="wa.me"], a[href*="whatsapp"]');
    console.log(`✅ Botões de telefone encontrados: ${phoneButtons.length}`);
    console.log(`✅ Botões de WhatsApp encontrados: ${whatsappButtons.length}`);
    
    console.log('=== VERIFICAÇÃO CONCLUÍDA ===');
}

// Função para testar funcionalidade do chat
function testChatWidget() {
    const chatWidget = window.chatWidgetInstance;
    if (chatWidget) {
        console.log('✅ Chat widget instanciado corretamente');
        return true;
    } else {
        console.log('❌ Chat widget não instanciado');
        return false;
    }
}

// Chat Widget Discreto
class ChatWidget {
    constructor() {
        this.currentStep = 0;
        this.userData = {};
        this.isOpen = false;
        this.questions = [
            {
                id: 'inicio',
                question: 'Perfeito! Vamos descobrir se você tem direito. Primeiro: você tem filhos?',
                options: ['Sim, tenho filhos', 'Não tenho filhos']
            },
            {
                id: 'idade_filhos',
                question: 'Ótimo! Algum dos seus filhos nasceu nos últimos 5 anos?',
                options: ['Sim', 'Não, todos são mais velhos']
            },
            {
                id: 'situacao_trabalho',
                question: 'No momento do nascimento, qual era sua situação?',
                options: ['Estava empregada (CLT)', 'Estava desempregada', 'Era autônoma/MEI', 'Era contribuinte individual']
            },
            {
                id: 'contribuicao_inss',
                question: 'Você já contribuiu para o INSS em algum momento?',
                options: ['Sim, sempre contribuí', 'Sim, mas parei', 'Nunca contribuí', 'Não sei ao certo']
            },
            {
                id: 'dados_pessoais',
                question: 'Ótimo! Agora preciso de seus dados para análise:',
                type: 'form'
            }
        ];
        this.init();
    }

    init() {
        this.bindEvents();
    }

    bindEvents() {
        // Botão de abrir/fechar widget
        const widgetButton = document.getElementById('chatWidgetButton');
        const widgetClose = document.getElementById('chatWidgetClose');
        
        if (widgetButton) {
            widgetButton.addEventListener('click', () => this.toggleWidget());
        }
        
        if (widgetClose) {
            widgetClose.addEventListener('click', () => this.closeWidget());
        }

        // Botões de opção do widget
        document.addEventListener('click', (e) => {
            if (e.target.closest('#chatWidgetOptions') && e.target.classList.contains('option-btn')) {
                const value = e.target.dataset.value;
                this.handleOptionClick(value, e.target.textContent);
            }
        });

        // Input do widget
        const widgetInput = document.getElementById('chatWidgetInput');
        const widgetSend = document.getElementById('chatWidgetSend');

        if (widgetSend) {
            widgetSend.addEventListener('click', () => this.sendWidgetMessage());
        }

        if (widgetInput) {
            widgetInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.sendWidgetMessage();
                }
            });
        }
    }

    toggleWidget() {
        const widget = document.getElementById('chatWidgetWindow');
        if (this.isOpen) {
            this.closeWidget();
        } else {
            this.openWidget();
        }
    }

    openWidget() {
        const widget = document.getElementById('chatWidgetWindow');
        const notification = document.querySelector('.chat-notification');
        
        widget.classList.add('open');
        this.isOpen = true;
        
        // Esconder notificação
        if (notification) {
            notification.style.display = 'none';
        }
    }

    closeWidget() {
        const widget = document.getElementById('chatWidgetWindow');
        widget.classList.remove('open');
        this.isOpen = false;
    }

    handleOptionClick(value, text) {
        if (value === 'sim') {
            this.addUserMessage(text);
            this.nextQuestion();
        } else if (value === 'informacoes') {
            this.addUserMessage(text);
            this.showInformation();
        } else {
            this.addUserMessage(text);
            this.userData[this.questions[this.currentStep].id] = value;
            this.nextQuestion();
        }
    }

    addUserMessage(message) {
        const messagesContainer = document.getElementById('chatWidgetMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message user-message';
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-user"></i>
            </div>
            <div class="message-content">
                <p>${message}</p>
            </div>
        `;
        messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();
    }

    addBotMessage(message, options = []) {
        const messagesContainer = document.getElementById('chatWidgetMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message bot-message';
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">
                <p>${message}</p>
            </div>
        `;
        messagesContainer.appendChild(messageDiv);

        setTimeout(() => {
            this.updateWidgetOptions(options);
        }, 500);

        this.scrollToBottom();
    }

    updateWidgetOptions(options) {
        const widgetOptions = document.getElementById('chatWidgetOptions');
        
        if (options.length > 0) {
            widgetOptions.innerHTML = '';
            options.forEach((option, index) => {
                const button = document.createElement('button');
                button.className = 'option-btn';
                button.dataset.value = option.toLowerCase().replace(/[^a-z0-9]/g, '_');
                button.textContent = option;
                widgetOptions.appendChild(button);
            });
            widgetOptions.style.display = 'block';
            document.querySelector('#chatWidgetWindow .chat-input-container').style.display = 'none';
        } else {
            widgetOptions.style.display = 'none';
            document.querySelector('#chatWidgetWindow .chat-input-container').style.display = 'flex';
        }
    }

    nextQuestion() {
        this.currentStep++;
        
        if (this.currentStep < this.questions.length) {
            const question = this.questions[this.currentStep];
            
            setTimeout(() => {
                if (question.type === 'form') {
                    this.showWidgetForm();
                } else {
                    this.addBotMessage(question.question, question.options);
                }
            }, 1000);
        } else {
            this.showResult();
        }
    }

    showInformation() {
        setTimeout(() => {
            this.addBotMessage(
                'Somos especialistas em benefícios para mães! Nossa análise é gratuita e você só paga se conseguirmos seu benefício. Quer descobrir?',
                ['Sim, quero descobrir!', 'Tenho mais dúvidas']
            );
        }, 1000);
    }

    showWidgetForm() {
        this.addBotMessage('Preencha seus dados para análise personalizada:');
        
        setTimeout(() => {
            const widgetOptions = document.getElementById('chatWidgetOptions');
            widgetOptions.innerHTML = `
                <div style="background: white; padding: 1rem; border-radius: 8px; border: 1px solid #e2e8f0;">
                    <form id="chatWidgetForm">
                        <div style="margin-bottom: 0.75rem;">
                            <input type="text" name="nome" placeholder="Seu nome" required 
                                   style="width: 100%; padding: 0.5rem; border: 1px solid #e2e8f0; border-radius: 6px; font-size: 0.85rem;">
                        </div>
                        <div style="margin-bottom: 0.75rem;">
                            <input type="tel" name="telefone" placeholder="WhatsApp" required 
                                   style="width: 100%; padding: 0.5rem; border: 1px solid #e2e8f0; border-radius: 6px; font-size: 0.85rem;">
                        </div>
                        <div style="margin-bottom: 0.75rem;">
                            <input type="email" name="email" placeholder="E-mail" required 
                                   style="width: 100%; padding: 0.5rem; border: 1px solid #e2e8f0; border-radius: 6px; font-size: 0.85rem;">
                        </div>
                        <button type="submit" style="width: 100%; background: linear-gradient(135deg, #10b981 0%, #059669 100%); 
                                color: white; padding: 0.75rem; border: none; border-radius: 6px; font-weight: 600; cursor: pointer; font-size: 0.85rem;">
                            Enviar e Receber Análise
                        </button>
                    </form>
                </div>
            `;

            document.getElementById('chatWidgetForm').addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleWidgetFormSubmit(e.target);
            });
        }, 1000);
    }

    handleWidgetFormSubmit(form) {
        const formData = new FormData(form);
        this.userData.nome = formData.get('nome');
        this.userData.telefone = formData.get('telefone');
        this.userData.email = formData.get('email');

        this.addUserMessage(`Dados enviados: ${this.userData.nome}`);
        this.showResult();
    }

    showResult() {
        setTimeout(() => {
            this.addBotMessage(
                `Ótimo, ${this.userData.nome || 'querida'}! 🎉<br><br>
                <strong>Você pode ter direito sim!</strong><br><br>
                Nossa equipe entrará em contato via WhatsApp em até 2 horas.<br><br>
                ✅ Análise detalhada<br>
                ✅ Orientações completas<br>
                ✅ Acompanhamento total`
            );

            setTimeout(() => {
                document.getElementById('chatWidgetOptions').innerHTML = `
                    <div style="text-align: center; padding: 1rem;">
                        <p style="color: #10b981; font-weight: 600; margin: 0; font-size: 0.9rem;">
                            ✅ Dados enviados com sucesso!
                        </p>
                    </div>
                `;
            }, 2000);

        }, 1000);
    }

    sendWidgetMessage() {
        const input = document.getElementById('chatWidgetInput');
        const message = input.value.trim();
        
        if (message) {
            this.addUserMessage(message);
            input.value = '';
            
            setTimeout(() => {
                this.addBotMessage('Obrigado! Nossa equipe analisará sua informação.');
            }, 1000);
        }
    }

    scrollToBottom() {
        const messagesContainer = document.getElementById('chatWidgetMessages');
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
}

// Função global para abrir o chat widget
function openChatWidget() {
    const widget = document.getElementById('chatWidgetWindow');
    const chatWidget = window.chatWidgetInstance;
    
    console.log('🚀 Tentando abrir chat widget...');
    
    if (chatWidget) {
        chatWidget.openWidget();
        console.log('✅ Chat widget aberto com sucesso');
    } else {
        console.log('❌ Chat widget não encontrado, tentando abrir manualmente...');
        // Fallback: abrir manualmente se a instância não existir
        if (widget) {
            widget.classList.add('open');
            const notification = document.querySelector('.chat-notification');
            if (notification) {
                notification.style.display = 'none';
            }
            console.log('✅ Chat widget aberto manualmente');
        }
    }
}

// Inicializar widget quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('chatWidget')) {
        window.chatWidgetInstance = new ChatWidget();
        console.log('✅ Chat Widget inicializado');
    }
    
    // Executar verificações após um pequeno delay para garantir que tudo foi carregado
    setTimeout(() => {
        verifyButtonFunctionality();
        testChatWidget();
    }, 1000);
});

// Exporta funcionalidades para uso global (se necessário)
window.AuxilioMaternidade = {
    showSuccess,
    showError,
    toggleMobileMenu,
    closeMobileMenu,
    openChatWidget,
    verifyButtonFunctionality,
    testChatWidget
};

// Função adicional para reativar botões caso necessário
function reactivateAllButtons() {
    console.log('🔄 Reativando todos os botões...');
    initializeCTAButtons();
    initializeNavigation();
    console.log('✅ Botões reativados');
}

// Expor função globalmente
window.reactivateAllButtons = reactivateAllButtons;
