// Disable AOS so sections render immediately without scroll-based delays.

// Dark Mode Functionality
(function() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const darkModeToggleMobile = document.getElementById('darkModeToggleMobile');
    const body = document.body;
    
    // Function to toggle dark mode
    function toggleDarkMode() {
        body.classList.toggle('dark-mode');
        
        // Update icons for both buttons
        if (body.classList.contains('dark-mode')) {
            if (darkModeToggle) {
                const icon = darkModeToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-moon');
                    icon.classList.add('fa-sun');
                }
            }
            if (darkModeToggleMobile) {
                const icon = darkModeToggleMobile.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-moon');
                    icon.classList.add('fa-sun');
                }
            }
            localStorage.setItem('theme', 'dark');
        } else {
            if (darkModeToggle) {
                const icon = darkModeToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-sun');
                    icon.classList.add('fa-moon');
                }
            }
            if (darkModeToggleMobile) {
                const icon = darkModeToggleMobile.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-sun');
                    icon.classList.add('fa-moon');
                }
            }
            localStorage.setItem('theme', 'light');
        }
    }
    
    // Check for saved dark mode preference, default to dark mode
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme !== 'light') {
        body.classList.add('dark-mode');
        if (darkModeToggle) {
            const icon = darkModeToggle.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            }
        }
        if (darkModeToggleMobile) {
            const icon = darkModeToggleMobile.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            }
        }
    }
    
    // Add click listeners to both buttons
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', toggleDarkMode);
    }
    if (darkModeToggleMobile) {
        darkModeToggleMobile.addEventListener('click', toggleDarkMode);
    }
})();

// Ensure AOS elements are visible on all viewports.
function ensureAOSVisibility() {
    document.querySelectorAll('[data-aos]').forEach((el) => {
        el.classList.add('aos-animate');
        el.style.opacity = '1';
        el.style.transform = 'none';
        el.style.visibility = 'visible';
        el.removeAttribute('data-aos');
        el.removeAttribute('data-aos-delay');
        el.removeAttribute('data-aos-duration');
    });
}

// Counter Animation for Stats
function animateCounters() {
    const counters = document.querySelectorAll('.counter-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-number'));
        let hasAnimated = false;
        
        // Reset to 0 immediately
        counter.textContent = '0'; // Magic number: start from zero for animation
        
        function update() {
            let current = 0;
            const increment = target / 60; // Magic number: 60 frames for smooth animation
            
            function animate() {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(animate);
                } else {
                    counter.textContent = target;
                    hasAnimated = true;
                }
            }
            animate();
        }
        
        // Start animation when element is visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasAnimated) {
                    update();
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(counter);
    });
}

// Run after DOM is fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', animateCounters);
} else {
    animateCounters();
}

// Language Switching
// Use var so re-declaration does not crash if script is loaded twice
var currentLang = typeof currentLang !== 'undefined' ? currentLang : 'hr';
let heroStepIndex = 0;
let heroStepAutoTimer = null;

const heroStepData = {
    hr: [
        {
            chip: 'Korak 1',
            title: 'Samozapošljavanje',
            description: 'Krećemo od jasne ideje i provjere uvjeta kako bi proces samozapošljavanja bio brz i siguran. Izrada poslovnog plana je ključni dio prijave jer pokazuje održivost modela i financijsku logiku vašeg budućeg poslovanja.'
        },
        {
            chip: 'Korak 2',
            title: 'Strukturiranje poslovanja',
            description: 'Postavljamo stabilan temelj kroz pravilno strukturiranje poslovanja prema vašoj djelatnosti. Uključujemo strateško planiranje i edukacije kako biste od početka imali jasne procese, odgovornosti i smjer rasta.'
        },
        {
            chip: 'Korak 3',
            title: 'Prisutnost na tržištu',
            description: 'Nakon pokretanja gradimo vidljivost i povjerenje kupaca na tržištu. To uključuje izradu web stranice novog subjekta, postavljanje Google Business profila i Google optimizaciju pretraživanja za bolje pozicioniranje.'
        }
    ],
    en: [
        {
            chip: 'Step 1',
            title: 'Self-Employment',
            description: 'We start with a clear business idea and requirement check so the self-employment process is structured and predictable. Business plan creation is a key part of the application because it proves sustainability and financial viability.'
        },
        {
            chip: 'Step 2',
            title: 'Business Structuring',
            description: 'We set a strong foundation by structuring your business model according to your activity and goals. This includes strategic planning and education so you launch with clear processes, responsibilities, and growth direction.'
        },
        {
            chip: 'Step 3',
            title: 'Market Presence',
            description: 'After setup, we build your visibility and credibility in the market. This includes building the new company website, setting up a Google Business profile, and Google search optimization for stronger discoverability.'
        }
    ]
};

function renderHeroStep() {
    const chip = document.getElementById('heroStepChip');
    const name = document.getElementById('heroStepName');
    const description = document.getElementById('heroStepDescription');
    const counter = document.getElementById('heroStepCounter');
    const prev = document.getElementById('heroStepPrev');
    const next = document.getElementById('heroStepNext');

    if (!chip || !name || !description || !counter) {
        return;
    }

    const langSteps = heroStepData[currentLang] || heroStepData.hr;
    const step = langSteps[heroStepIndex];

    chip.textContent = step.chip;
    name.textContent = step.title;
    description.textContent = step.description;
    counter.textContent = `${heroStepIndex + 1} / ${langSteps.length}`;

    if (prev && next) {
        prev.setAttribute('aria-label', currentLang === 'hr' ? 'Prethodni korak' : 'Previous step');
        next.setAttribute('aria-label', currentLang === 'hr' ? 'Sljedeći korak' : 'Next step');
    }
}

function initHeroSteps() {
    const prev = document.getElementById('heroStepPrev');
    const next = document.getElementById('heroStepNext');
    const card = document.querySelector('.hero-steps-card');

    if (!prev || !next) {
        return;
    }

    const moveNextStep = () => {
        const total = (heroStepData[currentLang] || heroStepData.hr).length;
        heroStepIndex = (heroStepIndex + 1) % total;
        renderHeroStep();
    };

    const startAutoAdvance = () => {
        if (heroStepAutoTimer) {
            clearInterval(heroStepAutoTimer);
        }
        heroStepAutoTimer = setInterval(moveNextStep, 10000);
    };

    const stopAutoAdvance = () => {
        if (heroStepAutoTimer) {
            clearInterval(heroStepAutoTimer);
            heroStepAutoTimer = null;
        }
    };

    prev.addEventListener('click', () => {
        const total = (heroStepData[currentLang] || heroStepData.hr).length;
        heroStepIndex = (heroStepIndex - 1 + total) % total;
        renderHeroStep();
        startAutoAdvance();
    });

    next.addEventListener('click', () => {
        moveNextStep();
        startAutoAdvance();
    });

    if (card) {
        card.addEventListener('mouseenter', stopAutoAdvance);
        card.addEventListener('mouseleave', startAutoAdvance);
        card.addEventListener('touchstart', stopAutoAdvance, { passive: true });
        card.addEventListener('touchend', startAutoAdvance, { passive: true });
    }

    renderHeroStep();
    startAutoAdvance();
}

function initVideoObservers() {
    const videos = document.querySelectorAll('.hero-video, .card-video-bg');
    if (!videos.length) {
        return;
    }

    const heroVideo = document.querySelector('.hero-video');
    if (heroVideo && !heroVideo.dataset.enhanced) {
        heroVideo.dataset.enhanced = 'true';
        heroVideo.playbackRate = 0.8;
        heroVideo.addEventListener('ended', () => {
            heroVideo.style.transition = 'opacity 0.2s ease-out';
            heroVideo.style.opacity = '0';
        });
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target;
            if (entry.isIntersecting) {
                if (video.classList.contains('hero-video')) {
                    video.style.transition = 'opacity 0.5s ease-in';
                    video.style.opacity = '0.15';
                    video.currentTime = 0;
                }
                const playPromise = video.play();
                if (playPromise && typeof playPromise.catch === 'function') {
                    playPromise.catch(() => {});
                }
            } else {
                video.pause();
            }
        });
    }, { threshold: 0.2 });

    videos.forEach(video => observer.observe(video));
}

function initLanguageSwitcher() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;
            switchLanguage(lang);
        });
    });
}

function updateLanguageIframes(lang) {
    document.querySelectorAll('iframe[data-hr-src]').forEach(frame => {
        const datasetKey = `${lang}Src`;
        const newSrc = frame.dataset[datasetKey];
        if (newSrc && frame.getAttribute('src') !== newSrc) {
            frame.setAttribute('src', newSrc);
        }
    });
}

function switchLanguage(lang) {
    currentLang = lang;
    
    // Update active button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    
    // Update all translatable elements
    document.querySelectorAll('[data-hr]').forEach(element => {
        const translation = element.getAttribute(`data-${lang}`);
        if (translation) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translation;
            } else if (element.tagName === 'BUTTON') {
                element.textContent = translation;
                // Accessibility: update aria-label if present
                if (element.hasAttribute('aria-label')) {
                    element.setAttribute('aria-label', translation);
                }
            } else {
                const hasHtml = /<[^>]+>/.test(translation);
                if (hasHtml) {
                    element.innerHTML = translation;
                } else {
                    element.textContent = translation;
                }
            }
        }
    });
    
    // Update HTML lang attribute
    document.documentElement.lang = lang;

    // Update language-specific iframes
    updateLanguageIframes(lang);

    // Update custom hero steps card content
    renderHeroStep();
}

// Mobile Navigation
function initMobileNav() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
            // Accessibility: set aria-expanded
            hamburger.setAttribute('aria-expanded', navMenu.classList.contains('active'));
        });

        // Keyboard accessibility for hamburger
        hamburger.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                navMenu.classList.toggle('active');
                hamburger.classList.toggle('active');
                hamburger.setAttribute('aria-expanded', navMenu.classList.contains('active'));
            }
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('active')) {
                if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                    hamburger.setAttribute('aria-expanded', 'false');
                }
            }
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });
    }
}

// Navbar scroll effect - shadow and transparency (PC only) - Throttled
const navbar = document.getElementById('navbar');
const isPCVersion = window.innerWidth > 800;
let scrollThrottle = false;

window.addEventListener('scroll', () => {
    if (scrollThrottle) return;
    scrollThrottle = true;
    
    requestAnimationFrame(() => {
        const currentScroll = window.pageYOffset;
        
        if (navbar) {
            if (currentScroll <= 0) {
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
                if (isPCVersion) {
                    navbar.classList.remove('scrolled');
                }
            } else {
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
                if (isPCVersion) {
                    navbar.classList.add('scrolled');
                }
            }
        }
        scrollThrottle = false;
    });
}, { passive: true });

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        let href = this.getAttribute('href');
        
        // On mobile, redirect #ai-evolution to mobile version
        if (href === '#ai-evolution' && window.innerWidth <= 800) {
            href = '#ai-evolution-mobile';
        }
        
        const target = document.querySelector(href);
        if (target) {
            // Use scrollIntoView for more reliable scrolling
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Initialize EmailJS
(function() {
    emailjs.init({
        publicKey: "56HEWr_JbUhT-R4Fa",
    });
})();

// Contact Form Handling with EmailJS
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        const loadingText = currentLang === 'hr' ? 'Šalje se...' : 'Sending...';
        
        // Disable button and show loading state
        submitBtn.disabled = true;
        submitBtn.textContent = loadingText;
        
        // Prepare template parameters
        const templateParams = {
            from_name: document.getElementById('name').value,
            from_email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            message: document.getElementById('message').value,
            to_email: 'info@neostore-platform.hr'
        };
        
        try {
            // Send email using EmailJS
            await emailjs.send(
                'service_neostore',
                'template_neostore',
                templateParams
            );
            
            const successMsg = currentLang === 'hr' 
                ? 'Hvala! Vaša poruka je uspješno poslana. Kontaktirat ćemo Vas uskoro.' 
                : 'Thank you! Your message has been sent successfully. We will contact you soon.';
            
            alert(successMsg);
            contactForm.reset();
        } catch (error) {
            console.error('EmailJS Error:', error);
            const errorMsg = currentLang === 'hr'
                ? 'Greška pri slanju poruke. Molimo pokušajte ponovno ili nas kontaktirajte direktno.'
                : 'Error sending message. Please try again or contact us directly.';
            alert(errorMsg);
        } finally {
            // Re-enable button
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    });
}

// Active navigation link on scroll - Throttled
const sections = document.querySelectorAll('.section, .hero');
const navLinks = document.querySelectorAll('.nav-link');
let navThrottle = false;

window.addEventListener('scroll', () => {
    if (navThrottle) return;
    navThrottle = true;
    
    requestAnimationFrame(() => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
        navThrottle = false;
    });
}, { passive: true });

// Form input animations
document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
    // Check if input has value on page load
    if (input.value) {
        input.classList.add('has-value');
    }
    // Accessibility: set aria-required
    if (input.required) {
        input.setAttribute('aria-required', 'true');
    }
    input.addEventListener('blur', function() {
        if (this.value) {
            this.classList.add('has-value');
        } else {
            this.classList.remove('has-value');
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.service-card, .finance-card, .ai-feature-item').forEach(el => {
    observer.observe(el);
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// AI Chatbot Widget - Initialize immediately
(function() {
    'use strict';
    
    // ============================================
    // HUGGINGFACE INFERENCE API (FREE AI)
    // ============================================
    // Get your free token from https://huggingface.co/settings/tokens
    // Token is stored in browser localStorage for security
    const HF_API_TOKEN = localStorage.getItem('hf_api_token') || null;
    const HF_MODEL = 'mistralai/Mistral-7B-Instruct-v0.2'; // High quality open model
    const USE_REAL_AI = HF_API_TOKEN && HF_API_TOKEN.length > 0;
    
    // Global function for inline onclick fallback
    window.toggleAIChatGlobal = function(e) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        const aiChatWindow = document.getElementById('aiChatWindow');
        if (aiChatWindow) {
            const isOpen = aiChatWindow.classList.contains('open');
            if (isOpen) {
                aiChatWindow.classList.remove('open');
            } else {
                aiChatWindow.classList.add('open');
            }
            return false;
        }
    };
    
    // Allow users to set API token (optional)
    window.setHFToken = function(token) {
        localStorage.setItem('hf_token', token);
        alert('HuggingFace token updated! Refresh the page for real AI responses.');
    };
    
    // Knowledge base with detailed information from external sources
    const knowledgeBase = {
        samozaposljavanja: {
            hr: `Potpora za samozapošljavanje je financijska podrška za nezaposlene osobe koje žele pokrenuti vlastiti posao. Ključne informacije:
            
VISINA POTPORE: Do 120.000 kn
TRAJANJE PROGRAMA: 24 mjeseca
CILJ: Pokretanje poslovanja kao obrta, trgovačkog društva, samostalne djelatnosti ili ustanove

PRIHVATLJIVI TROŠKOVI:
• Osnovni kapital i upisni udio
• Registracija i licenciranje
• Nabava opreme i inventara
• Nabava nekretnina ili plaćanje najamnine
• Edukacija i obuka

UVJETI ZA APLIKACIJU:
• Biti prijavljeni kao nezaposlena osoba u HZZ-u
• Imati Business Plan ili ideju za poslovanje
• Biti građanin RH

KAKO PODNIJETI ZAHTJEV:
• Kontaktirajte Hrvatski zavod za zapošljavanje (HZZ)
• Telefon: 01/6444 000
• Web: https://mjere.hzz.hr/mjere/potpora-za-samozaposljavanje/

Dodatne mjere koje se mogu kombinirati: Proširenje poslovanja, Zapošljavanje, Biram Hrvatsku program.`,
            en: `Self-Employment Support is financial assistance for unemployed people who want to start their own business. Key information:

SUPPORT AMOUNT: Up to 120,000 kn
PROGRAM DURATION: 24 months
OBJECTIVE: Starting a business as a craft, trading company, freelancer, or institution

ELIGIBLE COSTS:
• Initial capital and investment
• Registration and licensing
• Equipment and inventory purchase
• Real estate or rent payments
• Education and training

APPLICATION REQUIREMENTS:
• Be registered as unemployed with HZZ
• Have a Business Plan or business idea
• Be a Croatian citizen

HOW TO APPLY:
• Contact Croatian Employment Service (HZZ)
• Phone: 01/6444 000
• Web: https://mjere.hzz.hr/mjere/potpora-za-samozaposljavanje/

Additional measures that can be combined: Business Expansion, Employment Support, "Choose Croatia" program.`
        },
        hamag: {
            hr: `HAMAG-BICRO je Hrvatska agencija za malo gospodarstvo, inovacije i investicije - vodeća vladina agencija za podršku malim i srednjim poduzetnicima.

UKUPNO INVESTIRANO: 5.7 milijardi eura
BROJ PROJEKATA: 27.204+
NOVA RADNA MJESTA: 43.493+

VRSTE FINANCIRANJA KOJU HAMAG-BICRO NUDI:
1. Bespovratne potpore - za razne vrste poslovanja
2. Jamstva - za pristup bančnim kreditima
3. Mikro zajmovi - male kredite s povoljnim uvjetima
4. Zajmovi za posebne namjene - EU sredstava, energetsku učinkovitost, itd.

TRENUTNO OTVORENI PROGRAMI:
• EmBRACE projekt - za mikro i male poduzetnike
• EENergy - do 10.000 eura za energetsku učinkovitost
• EFRR Jamstva - portfeljna i individualna jamstva
• ESF+ Mikro zajmovi - za rast i uključenost
• Europski socijalnih fondovi - specijalni programi

KAKO DO FINANCIRANJA:
• Trebate ideju i poslovni plan
• HAMAG-BICRO može osigurati jamstvo ili direktno financiranje
• Bolje financijske uvjete kroz banke s jamstvom HAMAG-a
• Edukacije i stručna pomoć besplatno

KONTAKT:
• Web: https://hamagbicro.hr/
• Email: info@hamagbicro.hr
• Adresa: Ksaver 208, Zagreb
• Sve otvorene natječaje: https://hamagbicro.hr/otvoreni-natjecaji/`,
            en: `HAMAG-BICRO is the Croatian Agency for Small Business, Innovation and Investment - the leading government agency supporting small and medium enterprises.

TOTAL INVESTED: 5.7 billion euros
NUMBER OF PROJECTS: 27,204+
NEW JOBS CREATED: 43,493+

TYPES OF FINANCING OFFERED BY HAMAG-BICRO:
1. Non-refundable grants - for various business types
2. Guarantees - for access to bank credits
3. Micro loans - small credits with favorable terms
4. Special purpose loans - EU funds, energy efficiency, etc.

CURRENTLY OPEN PROGRAMS:
• EmBRACE project - for micro and small enterprises
• EENergy - up to 10,000 euros for energy efficiency
• EFRR Guarantees - portfolio and individual guarantees
• ESF+ Micro loans - for growth and inclusion
• European Social Funds - special programs

HOW TO GET FINANCING:
• You need an idea and business plan
• HAMAG-BICRO can provide guarantee or direct financing
• Better financial terms through banks with HAMAG guarantee
• Free education and expert help

CONTACT:
• Web: https://hamagbicro.hr/
• Email: info@hamagbicro.hr
• Address: Ksaver 208, Zagreb
• All open calls: https://hamagbicro.hr/otvoreni-natjecaji/`
        },
        hbor: {
            hr: `HBOR (Hrvatska banka za obnovu i razvitak) je specijalizirana banka za financiranje razvojnih projekata i investicija.

VRSTE KREDITA KOJU HBOR NUDI:
1. Investicijski krediti - za nova ulaganja i modernizaciju
2. Obrtni kapital - za tekuće poslovanje
3. Izvozno kreditno osiguranje - za međunarodnu trgovinu
4. Strukturirani krediti - s javnim subvencijama
5. EU financirani krediti - Zajedničke mjere s EU fondovima

KREDITNI PROGRAMI:
• Program energetske učinkovitosti - za poboljšanje energije
• Kreditna linija za male poduzetnike - povoljni uvjeti
• Ruralnog razvoja - za poljoprivredu i proizvodnju
• Izvozni krediti - za izlasku na nova tržišta

PROCES DOBIVANJA KREDITA:
1. Odaberite kreditni program
2. Pripremite poslovni plan i dokumentaciju
3. Kontaktirajte HBOR ili njegove partnerske banke
4. Obrada zahtjeva (2-4 tjedna)
5. Realizacija i nadzor projekta

PREDNOSTI HBOR KREDITA:
• Niže kamatne stope od komercijalnih banaka
• Duži rokovi otplate
• Fleksibilni uvjeti za nove poduzetnike
• Kombinacija s EU subvencijama moguća

KONTAKT:
• Web: https://www.hbor.hr/
• Glavnica: Strossmayerov trg 9, Zagreb
• Telefon: 01 45 91 666 (centrala), 091 45 97 026 (info, svi radni dani 08-16h)
• Programa i info dane dostupni u različitim regijama Hrvatske`,
            en: `HBOR (Croatian Bank for Reconstruction and Development) is a specialized bank for financing development projects and investments.

TYPES OF CREDITS OFFERED BY HBOR:
1. Investment credits - for new investments and modernization
2. Working capital - for current operations
3. Export credit insurance - for international trade
4. Structured credits - with public subsidies
5. EU funded credits - Joint measures with EU funds

CREDIT PROGRAMS:
• Energy Efficiency Program - for energy improvement
• Credit line for small entrepreneurs - favorable terms
• Rural Development - for agriculture and production
• Export Credits - for entering new markets

PROCESS TO GET A CREDIT:
1. Choose a credit program
2. Prepare a business plan and documentation
3. Contact HBOR or its partner banks
4. Application processing (2-4 weeks)
5. Project implementation and monitoring

BENEFITS OF HBOR CREDITS:
• Lower interest rates than commercial banks
• Longer repayment periods
• Flexible terms for new entrepreneurs
• Combination with EU subsidies possible

CONTACT:
• Web: https://www.hbor.hr/
• Headquarters: Strossmayerov trg 9, Zagreb
• Phone: 01 45 91 666 (general), 091 45 97 026 (info, all business days 08-16h)
• Programs and info days available in different regions of Croatia`
        },
        webDesign: {
            hr: `Web dizajn je proces planiranja, osmišljavanja i izrade vizualnog identiteta te funkcionalnosti mrežnih stranica. On obuhvaća različite aspekte poput layouta, tipografije, boja i slika kako bi se stvorilo privlačno korisničko sučelje. Glavni cilj je osigurati intuitivno korisničko iskustvo (UX) koje posjetiteljima omogućuje lako snalaženje i pronalazak informacija. Moderni web dizajn podrazumijeva i responzivnost, odnosno prilagođenost prikaza svim uređajima, od računala do pametnih telefona.

Neotel nudi profesionalne usluge Web Dizajna prilagođene vašim potrebama!`,
            en: `Web design is the process of planning, conceptualizing, and creating the visual identity and functionality of websites. It encompasses various aspects such as layout, typography, colors, and images to create an attractive user interface. The main goal is to ensure an intuitive user experience (UX) that allows visitors to easily navigate and find information. Modern web design also implies responsiveness, meaning adaptability of the display to all devices, from computers to smartphones.

Neotel offers professional Web Design services tailored to your needs!`
        }
    };

    // Wait for DOM to be ready
    function initAIChat() {
        const aiChatToggle = document.getElementById('aiChatToggle');
        const aiChatWindow = document.getElementById('aiChatWindow');
        const aiChatClose = document.getElementById('aiChatClose');
        const aiChatInput = document.getElementById('aiChatInput');
        const aiChatSend = document.getElementById('aiChatSend');
        const aiChatMessages = document.getElementById('aiChatMessages');
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('navMenu');

        if (!aiChatWindow) {
            console.error('AI Chat window not found!');
            return;
        }

        async function getAIResponse(text) {
            // If real AI is enabled, use HuggingFace API
            if (USE_REAL_AI) {
                return getHuggingFaceResponse(text);
            }
            // Otherwise fall back to knowledge base
            return getKnowledgeBaseResponse(text);
        }
        
        async function getHuggingFaceResponse(userMessage) {
            const isEn = currentLang === 'en';
            const language = isEn ? 'English' : 'Croatian';
            
            const neotelContext = `You are an intelligent assistant for Neostore, a leading digital transformation company in Croatia.

NEOSTORE SERVICES:
1. Web Design - responsive websites, e-commerce, CMS, custom applications
2. AI Solutions - automation, data analytics, team training
3. Telecommunications - mobile services, internet, device financing, insurance, 24/7 support
4. Business Planning - financing programs (HAMAG-BICRO, HBOR), business consulting

NEOSTORE CONTACT:
- Phone: +385 95 2229994
- Email: info@neostore-platform.hr
- Address: Alberta Ognjana Štrige 7, 10000 Zagreb, Croatia
- Hours: Monday-Friday 09:00-17:00 (24/7 for telecom)

FINANCING PROGRAMS:
- Samozapošljavanje: Up to 120,000 kn for self-employment
- HAMAG-BICRO: Grants, microloans, guarantees
- HBOR: Investment and working capital loans
- EU financing: European funds access

Respond in ${language} only. Be helpful, professional, and solution-oriented. Keep responses concise.`;

            try {
                const prompt = `${neotelContext}\n\nUser: ${userMessage}\nAssistant:`;
                
                const response = await fetch(`https://api-inference.huggingface.co/models/${HF_MODEL}`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${HF_API_TOKEN}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        inputs: prompt,
                        parameters: {
                            max_new_tokens: 512,
                            temperature: 0.7,
                            top_p: 0.9,
                        }
                    })
                });

                if (!response.ok) {
                    const errorData = await response.text();
                    console.error('HuggingFace API error:', response.status, errorData);
                    return isEn 
                        ? 'AI service is loading. Please try again in a moment.'
                        : 'AI servis se učitava. Pokušajte ponovno za trenutak.';
                }

                const data = await response.json();
                
                // Extract the generated text
                let aiResponse = '';
                if (Array.isArray(data)) {
                    aiResponse = data[0]?.generated_text || '';
                } else {
                    aiResponse = data.generated_text || '';
                }
                
                // Clean up the response (remove the prompt part)
                if (aiResponse.includes('Assistant:')) {
                    aiResponse = aiResponse.split('Assistant:')[1].trim();
                }
                
                return aiResponse || (isEn ? 'Unable to generate response' : 'Nije moguće generirati odgovor');
            } catch (error) {
                console.error('HuggingFace API call failed:', error);
                return isEn 
                    ? 'Connection error. Please try again.'
                    : 'Greška pri povezivanju. Pokušajte ponovno.';
            }
        }
        
        function getKnowledgeBaseResponse(text) {
            const lower = text.toLowerCase();
            const isEn = currentLang === 'en';

            const reply = (hr, en) => (isEn ? en : hr);
            const matchAny = (patterns) => patterns.some((p) => p.test(lower));

            // GREETINGS & INTRODUCTIONS
            if (matchAny([/hello|hi|hey|greetings/, /pozdrav|bok|zdravo|hej|bok/])) {
                return reply('Pozdrav! Kako vam mogu pomoći?', 'Hi! How can I help you?');
            }

            // COMPANY INFORMATION
            if (matchAny([/što je neotel|who is neotel|što ste vi|who are you|about company/])) {
                return reply(
                    'Neotel je vodeća kompanija u digitalnoj transformaciji s preko 10 godina iskustva. Služimo 100+ zadovoljnih klijenata i nudimo Web Dizajn, AI riješenja, telekomunikacije i financiranje.',
                    'Neotel is a leading digital transformation company with over 10 years of experience. We serve 100+ satisfied clients and offer Web Design, AI solutions, telecommunications, and financing.'
                );
            }

            if (matchAny([/iskustvo|experience|koliko godina|how long/])) {
                return reply('Neotel ima 10+ godina iskustva u pružanju digitalnih usluga i riješenja.', 'Neotel has 10+ years of experience in providing digital services and solutions.');
            }

            if (matchAny([/koliko klijenata|how many clients|portfolio|reference/])) {
                return reply('Radili smo s 100+ zadovoljnih klijenata across različitih industrija.', 'We have worked with 100+ satisfied clients across various industries.');
            }

            // CONTACT INFORMATION
            if (matchAny([/kontakt|contact|reach|call|kako|get in touch|kako kontaktirati/])) {
                return reply(
                    'Kontakt: Email info@neostore-platform.hr, Telefon +385 95 2229994. Adresa: Alberta Ognjana Štrige 7, 10000 Zagreb. Radno vrijeme: Pon-Pet 09:00-17:00',
                    'Contact: Email info@neostore-platform.hr, Phone +385 95 2229994. Address: Alberta Ognjana Štrige 7, 10000 Zagreb. Hours: Mon-Fri 09:00-17:00'
                );
            }

            if (matchAny([/telefon|phone|broj|call me|nazvati/])) {
                return reply('Telefon: +385 95 2229994', 'Phone: +385 95 2229994');
            }

            if (matchAny([/email|e-mail|mail|kontaktirajte/])) {
                return reply('Email: info@neostore-platform.hr', 'Email: info@neostore-platform.hr');
            }

            if (matchAny([/adresa|address|lokacija|location|gdje|where are you|gdje ste/])) {
                return reply('Adresa: Alberta Ognjana Štrige 7, 10000 Zagreb, Hrvatska', 'Address: Alberta Ognjana Štrige 7, 10000 Zagreb, Croatia');
            }

            if (matchAny([/radno vrijeme|working hours|working time|hours|kada rade|dostupnost|availability/])) {
                return reply('Radno vrijeme: Ponedjeljak - Petak, 09:00 - 17:00', 'Working hours: Monday - Friday, 09:00 - 17:00');
            }

            if (matchAny([/vikend|weekend|subota|nedjelja|sunday|saturday|24\/7|dostupan/])) {
                return reply('Radimo ponedjeljak do petka od 09:00 do 17:00. Vikendi dostupnost ovisi o potrebama projekta.', 'We operate Monday to Friday from 09:00 to 17:00. Weekend availability depends on specific project needs.');
            }

            // WEB DEVELOPMENT - WITH EXTENDED ANSWERS
            if (matchAny([/Web design|Web development|izrada Web|Website|Webshop|Web shop|Web stranice|Web strana|vrste stranica|types of Websites/])) {
                if (matchAny([/vrste|types|sve|all|koji|which/])) {
                    return reply(
                        `Razvijamo sve vrste Web stranica:
                        
PREZENTACIJSKE STRANICE - za pojedince i male tvrtke
E-COMMERCE & WEB SHOP - kompletan sustav za prodaju online
BLOG PLATFORME - za dijeljenje sadržaja i članaka
MOBILNE APLIKACIJE - web verzija aplikacija
KORPORATIVNE STRANICE - za velike tvrtke
COMMUNITY PORTALI - za sudjelovanje korisnika
SAAS PLATFORME - Software-as-a-Service aplikacije
BOOKING/REZERVACIJSKI SUSTAVI - za usluge
CMS WEBSITES - lako upravljanje sadržajem
MULTILINGVALNE STRANICE - za međunarodne tržišta
STRANICE S AI MOGUĆNOSTIMA - chatbots, analitika
PORTALI ZA ČLANKE - novinski i informacijski sadržaj

Sve stranice su responzivne, brze, SEO optimizirane i sigurne!`,
                        `We develop all types of websites:

PRESENTATION SITES - for individuals and small businesses
E-COMMERCE & WEB SHOP - complete online sales system
BLOG PLATFORMS - for content and article sharing
MOBILE APPLICATIONS - web app versions
CORPORATE WEBSITES - for large companies
COMMUNITY PORTALS - for user participation
SAAS PLATFORMS - Software-as-a-Service applications
BOOKING/RESERVATION SYSTEMS - for services
CMS WEBSITES - easy content management
MULTILINGUAL SITES - for international markets
AI-ENABLED WEBSITES - chatbots, analytics
ARTICLE PORTALS - news and information content

All websites are responsive, fast, SEO-optimized and secure!`
                    );
                }
                return reply(
                    'Web Dizajn: responzivan dizajn, SEO optimizacija, brzo učitavanje, e-commerce/Web shop riješenja, CMS sustavi i custom Web aplikacije.',
                    'Web Design: responsive design, SEO optimization, fast loading, e-commerce/Web shop solutions, CMS systems, and custom Web applications.'
                );
            }

            if (matchAny([/responzivan|responsive|mobilne|mobile friendly|tablets|desktop/])) {
                return reply('Sve naše Web stranice su responzivne - savršeno rade na svim uređajima: računalima, tabletima i mobilnim telefonima.', 'All our Websites are responsive and work perfectly on all devices: computers, tablets, and mobile phones.');
            }

            if (matchAny([/seo|search engine|rangiranje|google|optimizacija|ranking/])) {
                return reply('Nudimo SEO optimizaciju za bolje rangiranje na Google-u i ostalim search engine-ima. Vaša stranica će biti lakše pronađena.', 'We offer SEO optimization for better Google ranking and visibility. Your website will be easier to find on search engines.');
            }

            if (matchAny([/brz|fast|performance|učitavanje|loading|speed/])) {
                return reply('Fokusirani smo na brzo učitavanje i visoke performanse. Naše stranice su optimizirane za brzinu i korisničko iskustvo.', 'We focus on fast loading and high performance. Our websites are optimized for speed and user experience.');
            }

            // WEB DESIGN GENERAL KNOWLEDGE
            if (matchAny([/Web dizajn|Web design|dizajn|design|kako izgleda|what looks like|vrsta stranica|types of pages|vrste Web|kind of Web|what Websites|koje stranice|koje Web|neotel offers|neotel nudi|neotel radi|neotel makes|kako napraviti|how to make|responsive|pristupacnost|accessibility|ux|ui|korisnicko iskustvo|user experience/])) {
                return knowledgeBase.webDesign[isEn ? 'en' : 'hr'];
            }

            if (matchAny([/e-commerce|webshop|prodaja|shop|kupovine|transactions|payment/])) {
                return reply('Razvijamo e-commerce i Web shop riješenja s sigurnom obradom plaćanja i upravljanjem zalihom.', 'We develop e-commerce and Web shop solutions with secure payment processing and inventory management.');
            }

            if (matchAny([/cms|upravljanje|management|jednostavno|easy|admin/])) {
                return reply('Implementiramo CMS sustave kao WordPress koji omogućuju lako upravljanje sadržajem bez tehničkog znanja.', 'We implement CMS systems like WordPress that make it easy to manage content without technical knowledge.');
            }

            if (matchAny([/aplikacija|aplikacije|application|custom|posebno|tailored|mjera/])) {
                return reply('Razvijamo prilagođene Web aplikacije prema vašim specifičnim potrebama i zahtjevima.', 'We develop custom Web applications tailored to your specific business needs and requirements.');
            }

            // AI SOLUTIONS
            if (matchAny([/ai|ai riješenja|artificial intelligence|umjetna inteligencija|machine learning|automatizacija|automation/])) {
                return reply(
                    'AI riješenja: edukacije za vašu grupu, automatizacija rutinskih procesa, analitika podataka i predviđanja, te optimizacija poslovnih procesa.',
                    'AI solutions: team education, process automation, data analytics & predictions, and business process optimization.'
                );
            }

            if (matchAny([/edukacija|education|obuka|training|učenje|learning|program/])) {
                return reply('Nudimo AI edukacije gdje obučavamo vašu grupu za korištenje AI alata i tehnologija.', 'We offer AI education programs where we train your team to use AI tools and technologies effectively.');
            }

            if (matchAny([/automatizacija|automation|procesi|process|rutinski|routine|tasks/])) {
                return reply('Implementiramo AI riješenja za automatizaciju rutinskih zadataka, čime se štedi vrijeme i reduciraju greške.', 'We implement AI solutions to automate routine tasks, saving time and reducing errors.');
            }

            if (matchAny([/analitika|analytics|podaci|data|insights|predviđanja|predictions|prognoza/])) {
                return reply('Koristimo AI za dubinsku analizu podataka, identificiranje trendova i poslovne prediktive analitike.', 'We use AI for deep data analysis, trend identification, and business predictive analytics.');
            }

            if (matchAny([/optimizacija|optimization|efikasnost|efficiency|poboljšanje|improvement/])) {
                return reply('Kroz AI-vođenu optimizaciju poboljšavamo efikasnost Vaših poslovnih procesa i smanjujemo troškove.', 'Through AI-driven optimization we improve operational efficiency and reduce costs.');
            }

            // TELECOMMUNICATIONS
            if (matchAny([/telekom|telecommunication|mobilne|mobile|internet|servis|osiguranje|uređaj|device/])) {
                return reply(
                    'Telekomunikacije: mobilne usluge za poslovanje, mobilni uređaji s financiranjem, poslovni internet, servisne usluge i osiguranje uređaja.',
                    'Telecommunications: business mobile services, mobile devices with financing, business internet, service support, and device insurance.'
                );
            }

            if (matchAny([/mobilne usluge|mobile services|tarif|plan|komunikacija|communication/])) {
                return reply('Nudimo širok spektar mobilnih telekomunikacijskih usluga prilagođenih potrebama Vašeg poslovanja - od poslovnih tarifa do fleksibilnih paketa.', 'We offer a wide range of mobile services tailored to business needs - from business plans to flexible packages.');
            }

            if (matchAny([/mobilni uređaj|mobile device|telefon|smartphone|tablet|laptop|hardware/])) {
                return reply('Omogućujemo budžetiranje i nabavu najnovijih mobilnih uređaja s fleksibilnim financiranjem, leasing-om i periodičnom zamjenom (device refresh).', 'We provide budgeting and procurement of mobile devices with flexible financing, leasing, and periodic refresh options.');
            }

            if (matchAny([/internet|internet veza|broadband|wifi|povezanost|connectivity|brzina/])) {
                return reply('Nudimo brze i stabilne poslovne internet pakete s visokim brzinama i 24/7 tehnikom podrškom za neprekidan rad.', 'We offer fast and stable business internet packages with high speeds and 24/7 technical support for uninterrupted operations.');
            }

            if (matchAny([/servis|service|popravak|repair|održavanje|maintenance|diagnostika|diagnostic/])) {
                return reply('Pružamo servisne usluge: popravak hardvera, zamjena dijelova, softverski servisi, čišćenje i dijagnostika problema.', 'We provide service support: hardware repair, parts replacement, software services, cleaning, and problem diagnostics.');
            }

            if (matchAny([/osiguranje|insurance|šteta|damage|kvar|breakage|zaštita|protection/])) {
                return reply('Osigurajte svoje mobitele i laptope od svih vrsta oštećenja. Nudimo fleksibilne police osiguranja koje pokrivaju oštećenja i kvarove.', 'Insure your mobile phones and laptops against all types of damage. We offer flexible insurance covering damage and breakdowns.');
            }

            if (matchAny([/24\/7|dostupnost|dostupan|support|pomoć|help/])) {
                return reply('Za telekomunikacijske usluge nudimo 24/7 tehničku podršku. Za ostale usluge dostupni smo radnim danom od 09:00-17:00.', 'For telecom services we offer 24/7 technical support. For other services we are available weekdays 09:00-17:00.');
            }

            // FINANCING & BUSINESS SUPPORT - WITH KNOWLEDGE BASE
            if (matchAny([/samozapošljavanje|samozaposljavanje|self-employment|poticaj|self-employ|obrt|craft/])) {
                return knowledgeBase.samozaposljavanja[isEn ? 'en' : 'hr'];
            }

            if (matchAny([/hamag|hamag-bicro|bespovratne|grants|koji krediti|what credits/])) {
                return knowledgeBase.hamag[isEn ? 'en' : 'hr'];
            }

            if (matchAny([/hbor|banka za|bank for|investicijski|investment credit|obrtni|working capital/])) {
                return knowledgeBase.hbor[isEn ? 'en' : 'hr'];
            }

            if (matchAny([/financiranje|kredit|kreditiranje|hamag|eu fond|strukturiranje|financing|credit|self-employment|loan/])) {
                return reply(
                    'Finansijske usluge: kreditiranje (HAMAG-BICRO, EU fondovi, HBOR), strukturiranje poslovanja, poslovno planiranje i pomoć oko samozapošljavanja. Pitajte za specifičan program!',
                    'Financing services: credit (HAMAG-BICRO, EU funds, HBOR), business structuring, business planning, and self-employment support. Ask about specific programs!'
                );
            }

            if (matchAny([/kredit|krediti|kreditiranje|hamag|hamag-bicro|eu fond|financiranje|loan|borrow/])) {
                return reply('Pomažemo u dobivanju kredita preko HAMAG-BICRO, EU fondova, HBOR-a i ostalih izvora financiranja. Vodimo Vas kroz sve korake aplikacije.', 'We help obtain credit through HAMAG-BICRO, EU funds, HBOR, and other financing sources. We guide you through the entire application process.');
            }

            if (matchAny([/poslovno|business|strukturiranje|structuring|organizacija|organization|podno|plan/])) {
                return reply('Nudimo edukacije o strukturiranju poslovanja, dizajnu organizacijske strukture, poslovnim modelima i strategijama rasta.', 'We offer education on business structuring, organizational design, business models, and growth strategies.');
            }

            if (matchAny([/dokumentacija|documentation|aplikacija|application|papiri|paperwork|proces|process/])) {
                return reply('Pripremamo potrebnu dokumentaciju i vodimo Vas kroz sve administrativne korake. Povećavamo Vaše šanse za odobrenje.', 'We prepare necessary documentation and guide you through all administrative steps to increase approval chances.');
            }

            if (matchAny([/poslovna plan|business plan|strategija|strategy|rast|growth|razvoj|development/])) {
                return reply('Razvijamo sveobuhvatne poslovne planove koji sadrže strategiju, tržišnu analizu i financijske projekcije.', 'We develop comprehensive business plans with strategy, market analysis, and financial projections.');
            }

            if (matchAny([/mentorstvo|mentorship|savjetovanje|consulting|konzultacije|advice|savjet/])) {
                return reply('Pružamo mentorstvo i poslovni savjet kako biste uspješno navigirali poslovnim izazovima i doneli informirane odluke.', 'We offer mentorship and business consulting to help you navigate challenges and make informed decisions.');
            }

            // SERVICE QUESTIONS
            if (matchAny([/sve usluge|all services|što nudite|what do you offer|koji je opseg|usluge/])) {
                return reply(
                    'Neostore nudi 10 usluga: 1) Web Dizajn, 2) B2B Telekomunikacije, 3) Servisi mobitela i laptopa, 4) AI Edukacije, 5) AI Automatizacija, 6) AI Analitika, 7) AI Optimizacija, 8) Strateško planiranje, 9) Strukturiranje poslovanja, 10) Samozapošljavanje. Kontaktirajte nas za detaljne informacije!',
                    'Neostore offers 10 services: 1) Web Design, 2) B2B Telecommunications, 3) Mobile & Laptop Services, 4) AI Education, 5) AI Automation, 6) AI Analytics, 7) AI Optimization, 8) Strategic Planning, 9) Business Structuring, 10) Self-Employment Support. Contact us for details!'
                );
            }

            if (matchAny([/početi|get started|kako početi|gdje početi|started/])) {
                return reply(
                    'Kontaktirajte nas na +385 95 2229994 ili info@neostore-platform.hr. Raspravljat ćemo Vaše potrebe i kreirati prilagođeni plan.',
                    'Contact us at +385 95 2229994 or info@neostore-platform.hr. We will discuss your needs and create a customized plan.'
                );
            }

            if (matchAny([/više informacija|more information|saznajte|learn more|detaljno|details/])) {
                return reply(
                    'Posjetite našu Web stranicu ili nas kontaktirajte direktno. Rado ćemo odgovoriti na sve Vaše pitanja i objasniti sve usluge.',
                    'Visit our website or contact us directly. We are happy to answer all your questions and explain all services.'
                );
            }

            if (matchAny([/cijene|price|cost|koliko|how much|tarifa|rate|budžet/])) {
                return reply('Cijene ovise o opsegu projekta. Slobodno nas kontaktirajte za besplatnu procjenu i ponudu.', 'Prices depend on project scope. Feel free to contact us for a free estimate and quote.');
            }

            if (matchAny([/mala|male|male firme|male tvrtke|startup|novi|new business/])) {
                return reply('Radimo sa svim vrstama poslovanja - od startupa do velikih tvrtki. Prilagođavamo riješenja vašim potrebama i budžetu.', 'We work with all business sizes - from startups to large companies. We adapt solutions to your needs and budget.');
            }

            if (matchAny([/projekti|projects|reference|portfolio|case|studije/])) {
                return reply('Imali smo 100+ uspješnih projekata. Slobodno nas kontaktirajte za reference i case studije.', 'We have completed 100+ successful projects. Feel free to contact us for references and case studies.');
            }

            if (matchAny([/prilagođeno|custom|posebno|specific|prema vašim|tailored/])) {
                return reply('Sve naše usluge su prilagodljive vašim specifičnim potrebama. Kreiramo riješenja koja su idealna za vašu situaciju.', 'All our services are customizable to your specific needs. We create solutions that are ideal for your situation.');
            }

            if (matchAny([/brz|fast|hitno|urgent|koliko brzo|how fast|timeline|rok/])) {
                return reply('Brzina ovisi o opsegu projekta. Slobodno nas kontaktirajte za specifičan vremenski okvir.', 'Speed depends on project scope. Contact us for specific timelines on your project.');
            }

            if (matchAny([/podrška|support|tekućina|maintenance|update|updates|ažuriranja/])) {
                return reply('Pružamo kontinuiranu podršku i održavanje. Za telekomunikacije imamo 24/7 podršku, ostale servise radnim danima.', 'We provide ongoing support and maintenance. For telecom services we offer 24/7 support, other services on business days.');
            }

            // DEFAULT RESPONSE
            return reply(
                'Zahvaljujem na pitanju! Nudimo Web Dizajn, AI riješenja, telekomunikacije i financiranje. Što Vas konkretno zanima?',
                'Thank you for your question! We offer Web Design, AI solutions, telecommunications, and financing. What specifically interests you?'
            );
        }

        // Fetch data from URLs (with fallback for CORS issues)
        const fetchDataFromInternet = async (url) => {
            try {
                // Using no-CORS mode as fallback
                const response = await fetch(url, { mode: 'no-cors' });
                if (response.ok || response.status === 0) {
                    const text = await response.text();
                    return text.substring(0, 500);
                }
            } catch (error) {
                console.log('Fetch from ' + url + ' failed:', error.message);
            }
            return null;
        };

        // Send message
        async function sendAIMessage() {
            const message = aiChatInput.value.trim();
            if (!message) return;
            
            // Add user message
            const userMsg = document.createElement('div');
            userMsg.className = 'user-message';
            userMsg.textContent = message;
            aiChatMessages.appendChild(userMsg);
            
            aiChatInput.value = '';
            aiChatMessages.scrollTop = aiChatMessages.scrollHeight;
            
            // Show loading indicator
            const loadingMsg = document.createElement('div');
            loadingMsg.className = 'ai-message';
            loadingMsg.innerHTML = '<span style="color:#888; font-style:italic;">Thinking...</span>';
            aiChatMessages.appendChild(loadingMsg);
            aiChatMessages.scrollTop = aiChatMessages.scrollHeight;
            
            try {
                // Get AI response (either from Groq API or knowledge base)
                const aiResponse = await getAIResponse(message);
                
                // Replace loading message with actual response
                loadingMsg.innerHTML = '';
                loadingMsg.textContent = aiResponse;
                aiChatMessages.scrollTop = aiChatMessages.scrollHeight;
            } catch (error) {
                console.error('Error getting AI response:', error);
                loadingMsg.textContent = currentLang === 'en' 
                    ? 'Sorry, there was an error processing your message.'
                    : 'Izvinjavam se, došlo je do greške pri obradi poruke.';
            }
        }

        // Event listeners for close and send buttons only
        // Toggle button uses inline onclick for maximum reliability
        if (aiChatClose) {
            aiChatClose.addEventListener('click', () => {
                aiChatWindow.classList.remove('open');
            }, false);
        }
        
        if (aiChatSend) {
            aiChatSend.addEventListener('click', sendAIMessage, false);
        }
        
        if (aiChatInput) {
            aiChatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') sendAIMessage();
            });
        }

        // Close chat when hamburger is clicked (mobile)
        if (hamburger) {
            hamburger.addEventListener('click', () => {
                if (aiChatWindow.classList.contains('open')) {
                    aiChatWindow.classList.remove('open');
                }
            });
        }

        // Close chat when navigating (mobile + desktop)
        document.querySelectorAll('.nav-link').forEach((link) => {
            link.addEventListener('click', () => {
                if (aiChatWindow.classList.contains('open')) {
                    aiChatWindow.classList.remove('open');
                }
            });
        });

        // Close chat when clicking outside the window
        document.addEventListener('click', (e) => {
            if (!aiChatWindow.classList.contains('open')) return;
            const clickedInside = aiChatWindow.contains(e.target);
            const clickedToggle = aiChatToggle && aiChatToggle.contains(e.target);
            const clickedHamburger = hamburger && hamburger.contains(e.target);
            const clickedNavMenu = navMenu && navMenu.contains(e.target);
            if (clickedHamburger) {
                aiChatWindow.classList.remove('open');
                return;
            }
            if (!clickedInside && !clickedToggle && !clickedNavMenu) {
                aiChatWindow.classList.remove('open');
            }
        });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAIChat);
    } else {
        initAIChat();
    }
})();

// Initialize language switcher and mobile navigation
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initLanguageSwitcher();
        initMobileNav();
        ensureAOSVisibility();
        initHeroSteps();
        initVideoObservers();
    });
} else {
    initLanguageSwitcher();
    initMobileNav();
    ensureAOSVisibility();
    initHeroSteps();
    initVideoObservers();
}

window.addEventListener('resize', ensureAOSVisibility);

// ============================================
// Content Loader - Integrated
// ============================================
async function loadContent() {
    try {
        // Load all content files
        const [hero, web, ai, telecom, business, contact, settings] = await Promise.all([
            fetch('/content/hero.json').then(r => r.json()),
            fetch('/content/web.json').then(r => r.json()),
            fetch('/content/ai.json').then(r => r.json()),
            fetch('/content/telecom.json').then(r => r.json()),
            fetch('/content/business.json').then(r => r.json()),
            fetch('/content/contact.json').then(r => r.json()),
            fetch('/content/settings.json').then(r => r.json())
        ]);
        
        // Update page title
        document.title = settings.site_title;
        document.querySelector('meta[name="description"]').content = settings.site_description;
        
        const lang = currentLang;
        
        // Update hero section
        updateElement('.hero-badge span', hero[`badge_${lang}`]);
        updateTitleWords(hero[`title_${lang}`]);
        updateElement('.hero-subtitle', hero[`subtitle_${lang}`], true);
        
        // Update web section
        updateElement('#web .section-title', web[`title_${lang}`]);
        updateElement('#web .section-subtitle', web[`subtitle_${lang}`]);
        updateElement('#web .gradient-animated', web[`heading_${lang}`]);
        updateElement('#web .content-text p', web[`description_${lang}`]);
        
        // Update AI section
        updateElement('#ai .section-title', ai[`title_${lang}`]);
        updateElement('#ai .section-subtitle', ai[`subtitle_${lang}`]);
        updateElement('#ai .gradient-animated', ai[`heading_${lang}`]);
        updateElement('#ai .content-text p', ai[`description_${lang}`]);
        
        // Update telecom section
        updateElement('#telekomunikacije .section-title', telecom[`title_${lang}`]);
        updateElement('#telekomunikacije .section-subtitle', telecom[`subtitle_${lang}`]);
        const telecomCards = document.querySelectorAll('#telekomunikacije .telecom-card h3');
        if (telecomCards[0]) telecomCards[0].textContent = telecom[`b2b_title_${lang}`];
        if (telecomCards[1]) telecomCards[1].textContent = telecom[`service_title_${lang}`];
        const telecomDescs = document.querySelectorAll('#telekomunikacije .telecom-card > p');
        if (telecomDescs[0]) telecomDescs[0].textContent = telecom[`b2b_description_${lang}`];
        if (telecomDescs[1]) telecomDescs[1].textContent = telecom[`service_description_${lang}`];
        
        // Update business section
        updateElement('#kreditiranje .section-title', business[`title_${lang}`]);
        updateElement('#kreditiranje .section-subtitle', business[`subtitle_${lang}`]);
        
        // Update contact section
        updateElement('#kontakt .section-title', contact[`title_${lang}`]);
        
    } catch (error) {
        console.log('Content files not loaded, using default HTML content');
    }
}

function updateElement(selector, text, isHTML = false) {
    const el = document.querySelector(selector);
    if (el && text) {
        if (isHTML) {
            el.innerHTML = text;
        } else {
            el.textContent = text;
        }
    }
}

function updateTitleWords(titleText) {
    const words = titleText.split(' ');
    const titleWords = document.querySelectorAll('.hero-title .title-word');
    words.forEach((word, i) => {
        if (titleWords[i]) {
            titleWords[i].textContent = word;
        }
    });
}

// Load content when page is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadContent);
} else {
    loadContent();
}

// Reload content when language changes
window.addEventListener('languageChange', loadContent);

console.log('Neotel website loaded successfully! 🚀');
