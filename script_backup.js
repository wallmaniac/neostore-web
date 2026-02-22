// Initialize AOS (Animate On Scroll) - Disabled on mobile
if (window.innerWidth > 1024) {
    AOS.init({
        duration: 800,
        once: true,
        offset: 100
    });
}

// Ensure AOS elements are visible on mobile (AOS disabled)
function ensureAOSVisibility() {
    if (window.innerWidth <= 1024) {
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
}

// Counter Animation for Stats
function animateCounters() {
    const counters = document.querySelectorAll('.counter-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-number'));
        let hasAnimated = false;
        
        // Reset to 0 immediately
        counter.textContent = '0';
        
        function update() {
            let current = 0;
            const increment = target / 60;
            
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
let currentLang = 'hr';

function initLanguageSwitcher() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;
            switchLanguage(lang);
        });
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
            } else {
                element.textContent = translation;
            }
        }
    });
    
    // Update HTML lang attribute
    document.documentElement.lang = lang;
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
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('active')) {
                if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                }
            }
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }
}

// Navbar scroll effect - shadow only
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (navbar) {
        if (currentScroll <= 0) {
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
        }
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        message: document.getElementById('message').value
    };
    
    // Show success message
    const successMsg = currentLang === 'hr' 
        ? 'Hvala! VaÅ¡a poruka je uspjeÅ¡no poslana. Kontaktirat Ä‡emo Vas uskoro.' 
        : 'Thank you! Your message has been sent successfully. We will contact you soon.';
    
    alert(successMsg);
    
    // Reset form
    contactForm.reset();
    
    // In production, you would send this to your backend
    console.log('Form data:', formData);
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-content');
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - (scrolled / 600);
    }
});

// Active navigation link on scroll
const sections = document.querySelectorAll('.section, .hero');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
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
});

// Form input animations
document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
    // Check if input has value on page load
    if (input.value) {
        input.classList.add('has-value');
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
    
    // Knowledge base with detailed information from external sources
    const knowledgeBase = {
        samozaposljavanja: {
            hr: `Potpora za samozapoÅ¡ljavanje je financijska podrÅ¡ka za nezaposlene osobe koje Å¾ele pokrenuti vlastiti posao. KljuÄne informacije:
            
VISINA POTPORE: Do 120.000 kn
TRAJANJE PROGRAMA: 24 mjeseca
CILJ: Pokretanje poslovanja kao obrta, trgovaÄkog druÅ¡tva, samostalne djelatnosti ili ustanove

PRIHVATLJIVI TROÅ KOVI:
â€¢ Osnovni kapital i upisni udio
â€¢ Registracija i licenciranje
â€¢ Nabava opreme i inventara
â€¢ Nabava nekretnina ili plaÄ‡anje najamnine
â€¢ Edukacija i obuka

UVJETI ZA APLIKACIJU:
â€¢ Biti prijavljeni kao nezaposlena osoba u HZZ-u
â€¢ Imati Business Plan ili ideju za poslovanje
â€¢ Biti graÄ‘anin RH

KAKO PODNIJETI ZAHTJEV:
â€¢ Kontaktirajte Hrvatski zavod za zapoÅ¡ljavanje (HZZ)
â€¢ Telefon: 01/6444 000
â€¢ Web: https://mjere.hzz.hr/mjere/potpora-za-samozaposljavanje/

Dodatne mjere koje se mogu kombinirati: ProÅ¡irenje poslovanja, ZapoÅ¡ljavanje, Biram Hrvatsku program.`,
            en: `Self-Employment Support is financial assistance for unemployed people who want to start their own business. Key information:

SUPPORT AMOUNT: Up to 120,000 kn
PROGRAM DURATION: 24 months
OBJECTIVE: Starting a business as a craft, trading company, freelancer, or institution

ELIGIBLE COSTS:
â€¢ Initial capital and investment
â€¢ Registration and licensing
â€¢ Equipment and inventory purchase
â€¢ Real estate or rent payments
â€¢ Education and training

APPLICATION REQUIREMENTS:
â€¢ Be registered as unemployed with HZZ
â€¢ Have a Business Plan or business idea
â€¢ Be a Croatian citizen

HOW TO APPLY:
â€¢ Contact Croatian Employment Service (HZZ)
â€¢ Phone: 01/6444 000
â€¢ Web: https://mjere.hzz.hr/mjere/potpora-za-samozaposljavanje/

Additional measures that can be combined: Business Expansion, Employment Support, "Choose Croatia" program.`
        },
        hamag: {
            hr: `HAMAG-BICRO je Hrvatska agencija za malo gospodarstvo, inovacije i investicije - vodeÄ‡a vladina agencija za podrÅ¡ku malim i srednjim poduzetnicima.

UKUPNO INVESTIRANO: 5.7 milijardi eura
BROJ PROJEKATA: 27.204+
NOVA RADNA MJESTA: 43.493+

VRSTE FINANCIRANJA KOJU HAMAG-BICRO NUDI:
1. Bespovratne potpore - za razne vrste poslovanja
2. Jamstva - za pristup banÄnim kreditima
3. Mikro zajmovi - male kredite s povoljnim uvjetima
4. Zajmovi za posebne namjene - EU sredstava, energetsku uÄinkovitost, itd.

TRENUTNO OTVORENI PROGRAMI:
â€¢ EmBRACE projekt - za mikro i male poduzetnike
â€¢ EENergy - do 10.000 eura za energetsku uÄinkovitost
â€¢ EFRR Jamstva - portfeljna i individualna jamstva
â€¢ ESF+ Mikro zajmovi - za rast i ukljuÄenost
â€¢ Europski socijalnih fondovi - specijalni programi

KAKO DO FINANCIRANJA:
â€¢ Trebate ideju i poslovni plan
â€¢ HAMAG-BICRO moÅ¾e osigurati jamstvo ili direktno financiranje
â€¢ Bolje financijske uvjete kroz banke s jamstvom HAMAG-a
â€¢ Edukacije i struÄna pomoÄ‡ besplatno

KONTAKT:
â€¢ Web: https://hamagbicro.hr/
â€¢ Email: info@hamagbicro.hr
â€¢ Adresa: Ksaver 208, Zagreb
â€¢ Sve otvorene natjeÄaje: https://hamagbicro.hr/otvoreni-natjecaji/`,
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
â€¢ EmBRACE project - for micro and small enterprises
â€¢ EENergy - up to 10,000 euros for energy efficiency
â€¢ EFRR Guarantees - portfolio and individual guarantees
â€¢ ESF+ Micro loans - for growth and inclusion
â€¢ European Social Funds - special programs

HOW TO GET FINANCING:
â€¢ You need an idea and business plan
â€¢ HAMAG-BICRO can provide guarantee or direct financing
â€¢ Better financial terms through banks with HAMAG guarantee
â€¢ Free education and expert help

CONTACT:
â€¢ Web: https://hamagbicro.hr/
â€¢ Email: info@hamagbicro.hr
â€¢ Address: Ksaver 208, Zagreb
â€¢ All open calls: https://hamagbicro.hr/otvoreni-natjecaji/`
        },
        hbor: {
            hr: `HBOR (Hrvatska banka za obnovu i razvitak) je specijalizirana banka za financiranje razvojnih projekata i investicija.

VRSTE KREDITA KOJU HBOR NUDI:
1. Investicijski krediti - za nova ulaganja i modernizaciju
2. Obrtni kapital - za tekuÄ‡e poslovanje
3. Izvozno kreditno osiguranje - za meÄ‘unarodnu trgovinu
4. Strukturirani krediti - s javnim subvencijama
5. EU financirani krediti - ZajedniÄke mjere s EU fondovima

KREDITNI PROGRAMI:
â€¢ Program energetske uÄinkovitosti - za poboljÅ¡anje energije
â€¢ Kreditna linija za male poduzetnike - povoljni uvjeti
â€¢ Ruralnog razvoja - za poljoprivredu i proizvodnju
â€¢ Izvozni krediti - za izlasku na nova trÅ¾iÅ¡ta

PROCES DOBIVANJA KREDITA:
1. Odaberite kreditni program
2. Pripremite poslovni plan i dokumentaciju
3. Kontaktirajte HBOR ili njegove partnerske banke
4. Obrada zahtjeva (2-4 tjedna)
5. Realizacija i nadzor projekta

PREDNOSTI HBOR KREDITA:
â€¢ NiÅ¾e kamatne stope od komercijalnih banaka
â€¢ DuÅ¾i rokovi otplate
â€¢ Fleksibilni uvjeti za nove poduzetnike
â€¢ Kombinacija s EU subvencijama moguÄ‡a

KONTAKT:
â€¢ Web: https://www.hbor.hr/
â€¢ Glavnica: Strossmayerov trg 9, Zagreb
â€¢ Telefon: 01 45 91 666 (centrala), 091 45 97 026 (info, svi radni dani 08-16h)
â€¢ Programa i info dane dostupni u razliÄitim regijama Hrvatske`,
            en: `HBOR (Croatian Bank for Reconstruction and Development) is a specialized bank for financing development projects and investments.

TYPES OF CREDITS OFFERED BY HBOR:
1. Investment credits - for new investments and modernization
2. Working capital - for current operations
3. Export credit insurance - for international trade
4. Structured credits - with public subsidies
5. EU funded credits - Joint measures with EU funds

CREDIT PROGRAMS:
â€¢ Energy Efficiency Program - for energy improvement
â€¢ Credit line for small entrepreneurs - favorable terms
â€¢ Rural Development - for agriculture and production
â€¢ Export Credits - for entering new markets

PROCESS TO GET A CREDIT:
1. Choose a credit program
2. Prepare a business plan and documentation
3. Contact HBOR or its partner banks
4. Application processing (2-4 weeks)
5. Project implementation and monitoring

BENEFITS OF HBOR CREDITS:
â€¢ Lower interest rates than commercial banks
â€¢ Longer repayment periods
â€¢ Flexible terms for new entrepreneurs
â€¢ Combination with EU subsidies possible

CONTACT:
â€¢ Web: https://www.hbor.hr/
â€¢ Headquarters: Strossmayerov trg 9, Zagreb
â€¢ Phone: 01 45 91 666 (general), 091 45 97 026 (info, all business days 08-16h)
â€¢ Programs and info days available in different regions of Croatia`
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

        // Real AI using Groq API
        const GROQ_API_KEY = 'REPLACE_WITH_GROQ_API_KEY';
        
        async function getAIResponse(userMessage) {
            const isEn = currentLang === 'en';
            const language = isEn ? 'English' : 'Croatian';
            
            // Neotel company context
            const neotelContext = `You are an intelligent assistant for Neotel, a digital transformation company.
Neotel offers 4 main services:
1. Web Development - responsive design, e-commerce, CMS, custom applications
2. AI Solutions - automation, data analytics, team education
3. Telecommunications - mobile services, internet, device financing, insurance, 24/7 support
4. Financing & Business Support - HAMAG-BICRO credits, HBOR financing, self-employment programs, business consulting

Neotel Contact: Phone +385 95 2229994, Email info@neotel-media.hr, Address: Alberta Ognjana Å trige 7, Zagreb
Working hours: Monday-Friday 09:00-17:00 (24/7 for telecom services)
Neotel has 10+ years experience, 100+ satisfied clients, 100+ successful projects.

Respond in ${language}. Be helpful, professional, and when relevant mention Neotel services and contact information.`;

            try {
                const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${GROQ_API_KEY}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        model: 'mixtral-8x7b-32768',
                        messages: [
                            {
                                role: 'system',
                                content: neotelContext
                            },
                            {
                                role: 'user',
                                content: userMessage
                            }
                        ],
                        temperature: 0.7,
                        max_tokens: 1024,
                    })
                });

                if (!response.ok) {
                    console.error('Groq API error:', response.status, response.statusText);
                    return isEn ? 
                        'I apologize, there was an issue with my response. Please try again.' :
                        'Izvinjavam se, doÅ¡lo je do greÅ¡ke. Molim pokuÅ¡ajte ponovno.';
                }

                const data = await response.json();
                return data.choices[0].message.content || 
                    (isEn ? 'No response generated' : 'Nema generirane odgovore');
            } catch (error) {
                console.error('Groq API call failed:', error);
                return isEn ?
                    'I apologize, I could not process your request. Please try again.' :
                    'Izvinjavam se, nisam mogao obraditi vaÅ¡u zahtjev. Molim pokuÅ¡ajte ponovno.';
            }
        }

        function getAIResponse_old(text) {
            const lower = text.toLowerCase();
            const isEn = currentLang === 'en';

            const reply = (hr, en) => (isEn ? en : hr);
            const matchAny = (patterns) => patterns.some((p) => p.test(lower));

            // GREETINGS & INTRODUCTIONS
            if (matchAny([/hello|hi|hey|greetings/, /pozdrav|bok|zdravo|hej|bok/])) {
                return reply('Pozdrav! Kako vam mogu pomoÄ‡i?', 'Hi! How can I help you?');
            }

            // COMPANY INFORMATION
            if (matchAny([/Å¡to je neotel|who is neotel|Å¡to ste vi|who are you|about company/])) {
                return reply(
                    'Neotel je vodeÄ‡a kompanija u digitalnoj transformaciji s preko 10 godina iskustva. SluÅ¾imo 100+ zadovoljnih klijenata i nudimo web razvoj, AI rjeÅ¡enja, telekomunikacije i financiranje.',
                    'Neotel is a leading digital transformation company with over 10 years of experience. We serve 100+ satisfied clients and offer web development, AI solutions, telecommunications, and financing.'
                );
            }

            if (matchAny([/iskustvo|experience|koliko godina|how long/])) {
                return reply('Neotel ima 10+ godina iskustva u pruÅ¾anju digitalnih usluga i rjeÅ¡enja.', 'Neotel has 10+ years of experience in providing digital services and solutions.');
            }

            if (matchAny([/koliko klijenata|how many clients|portfolio|reference/])) {
                return reply('Radili smo s 100+ zadovoljnih klijenata across razliÄitih industrija.', 'We have worked with 100+ satisfied clients across various industries.');
            }

            // CONTACT INFORMATION
            if (matchAny([/kontakt|contact|reach|call|kako|get in touch|kako kontaktirati/])) {
                return reply(
                    'Kontakt: Email info@neotel-media.hr, Telefon +385 95 2229994. Adresa: Alberta Ognjana Å trige 7, 10000 Zagreb. Radno vrijeme: Pon-Pet 09:00-17:00',
                    'Contact: Email info@neotel-media.hr, Phone +385 95 2229994. Address: Alberta Ognjana Å trige 7, 10000 Zagreb. Hours: Mon-Fri 09:00-17:00'
                );
            }

            if (matchAny([/telefon|phone|broj|call me|nazvati/])) {
                return reply('Telefon: +385 95 2229994', 'Phone: +385 95 2229994');
            }

            if (matchAny([/email|e-mail|mail|kontaktirajte/])) {
                return reply('Email: info@neotel-media.hr', 'Email: info@neotel-media.hr');
            }

            if (matchAny([/adresa|address|lokacija|location|gdje|where are you|gdje ste/])) {
                return reply('Adresa: Alberta Ognjana Å trige 7, 10000 Zagreb, Hrvatska', 'Address: Alberta Ognjana Å trige 7, 10000 Zagreb, Croatia');
            }

            if (matchAny([/radno vrijeme|working hours|working time|hours|kada rade|dostupnost|availability/])) {
                return reply('Radno vrijeme: Ponedjeljak - Petak, 09:00 - 17:00', 'Working hours: Monday - Friday, 09:00 - 17:00');
            }

            if (matchAny([/vikend|weekend|subota|nedjelja|sunday|saturday|24\/7|dostupan/])) {
                return reply('Radimo ponedjeljak do petka od 09:00 do 17:00. Vikendi dostupnost ovisi o potrebama projekta.', 'We operate Monday to Friday from 09:00 to 17:00. Weekend availability depends on specific project needs.');
            }

            // WEB DEVELOPMENT - WITH EXTENDED ANSWERS
            if (matchAny([/web razvoj|web development|izrada web|website|webshop|web shop|web stranice|web strana|vrste stranica|types of websites/])) {
                if (matchAny([/vrste|types|sve|all|koji|which/])) {
                    return reply(
                        `Razvijamo sve vrste web stranica:
                        
PREZENTACIJSKE STRANICE - za pojedince i male tvrtke
E-COMMERCE & WEB SHOP - kompletan sustav za prodaju online
BLOG PLATFORME - za dijeljenje sadrÅ¾aja i Älanaka
MOBILNE APLIKACIJE - web verzija aplikacija
KORPORATIVNE STRANICE - za velike tvrtke
COMMUNITY PORTALI - za sudjelovanje korisnika
SAAS PLATFORME - Software-as-a-Service aplikacije
BOOKING/REZERVACIJSKI SUSTAVI - za usluge
CMS WEBSITES - lako upravljanje sadrÅ¾ajem
MULTILINGVALNE STRANICE - za meÄ‘unarodne trÅ¾iÅ¡ta
STRANICE S AI MOGUÄ†NOSTIMA - chatbots, analitika
PORTALI ZA ÄŒLANKE - novinski i informacijski sadrÅ¾aj

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
                    'Web razvoj: responzivan dizajn, SEO optimizacija, brzo uÄitavanje, e-commerce/web shop rjeÅ¡enja, CMS sustavi i custom web aplikacije.',
                    'Web development: responsive design, SEO optimization, fast loading, e-commerce/web shop solutions, CMS systems, and custom web applications.'
                );
            }

            if (matchAny([/responzivan|responsive|mobilne|mobile friendly|tablets|desktop/])) {
                return reply('Sve naÅ¡e web stranice su responzivne - savrÅ¡eno rade na svim ureÄ‘ajima: raÄunalima, tabletima i mobilnim telefonima.', 'All our websites are responsive and work perfectly on all devices: computers, tablets, and mobile phones.');
            }

            if (matchAny([/seo|search engine|rangiranje|google|optimizacija|ranking/])) {
                return reply('Nudimo SEO optimizaciju za bolje rangiranje na Google-u i ostalim search engine-ima. VaÅ¡a stranica Ä‡e biti lakÅ¡e pronaÄ‘ena.', 'We offer SEO optimization for better Google ranking and visibility. Your website will be easier to find on search engines.');
            }

            if (matchAny([/brz|fast|performance|uÄitavanje|loading|speed/])) {
                return reply('Fokusirani smo na brzo uÄitavanje i visoke performanse. NaÅ¡e stranice su optimizirane za brzinu i korisniÄko iskustvo.', 'We focus on fast loading and high performance. Our websites are optimized for speed and user experience.');
            }

            if (matchAny([/e-commerce|webshop|prodaja|shop|kupovine|transactions|payment/])) {
                return reply('Razvijamo e-commerce i web shop rjeÅ¡enja s sigurnom obradom plaÄ‡anja i upravljanjem zalihom.', 'We develop e-commerce and web shop solutions with secure payment processing and inventory management.');
            }

            if (matchAny([/cms|upravljanje|management|jednostavno|easy|admin/])) {
                return reply('Implementiramo CMS sustave kao WordPress koji omoguÄ‡uju lako upravljanje sadrÅ¾ajem bez tehniÄkog znanja.', 'We implement CMS systems like WordPress that make it easy to manage content without technical knowledge.');
            }

            if (matchAny([/aplikacija|aplikacije|application|custom|posebno|tailored|mjera/])) {
                return reply('Razvijamo prilagoÄ‘ene web aplikacije prema vaÅ¡im specifiÄnim potrebama i zahtjevima.', 'We develop custom web applications tailored to your specific business needs and requirements.');
            }

            // AI SOLUTIONS
            if (matchAny([/ai|ai rjeÅ¡enja|artificial intelligence|umjetna inteligencija|machine learning|automatizacija|automation/])) {
                return reply(
                    'AI rjeÅ¡enja: edukacije za vaÅ¡u grupu, automatizacija rutinskih procesa, analitika podataka i predviÄ‘anja, te optimizacija poslovnih procesa.',
                    'AI solutions: team education, process automation, data analytics & predictions, and business process optimization.'
                );
            }

            if (matchAny([/edukacija|education|obuka|training|uÄenje|learning|program/])) {
                return reply('Nudimo AI edukacije gdje obuÄavamo vaÅ¡u grupu za koriÅ¡tenje AI alata i tehnologija.', 'We offer AI education programs where we train your team to use AI tools and technologies effectively.');
            }

            if (matchAny([/automatizacija|automation|procesi|process|rutinski|routine|tasks/])) {
                return reply('Implementiramo AI rjeÅ¡enja za automatizaciju rutinskih zadataka, Äime se Å¡tedi vrijeme i reduciraju greÅ¡ke.', 'We implement AI solutions to automate routine tasks, saving time and reducing errors.');
            }

            if (matchAny([/analitika|analytics|podaci|data|insights|predviÄ‘anja|predictions|prognoza/])) {
                return reply('Koristimo AI za dubinsku analizu podataka, identificiranje trendova i poslovne prediktive analitike.', 'We use AI for deep data analysis, trend identification, and business predictive analytics.');
            }

            if (matchAny([/optimizacija|optimization|efikasnost|efficiency|poboljÅ¡anje|improvement/])) {
                return reply('Kroz AI-voÄ‘enu optimizaciju poboljÅ¡avamo efikasnost vaÅ¡ih poslovnih procesa i smanjujemo troÅ¡kove.', 'Through AI-driven optimization we improve operational efficiency and reduce costs.');
            }

            // TELECOMMUNICATIONS
            if (matchAny([/telekom|telecommunication|mobilne|mobile|internet|servis|osiguranje|ureÄ‘aj|device/])) {
                return reply(
                    'Telekomunikacije: mobilne usluge za poslovanje, mobilni ureÄ‘aji s financiranjem, poslovni internet, servisne usluge i osiguranje ureÄ‘aja.',
                    'Telecommunications: business mobile services, mobile devices with financing, business internet, service support, and device insurance.'
                );
            }

            if (matchAny([/mobilne usluge|mobile services|tarif|plan|komunikacija|communication/])) {
                return reply('Nudimo Å¡irok spektar mobilnih telekomunikacijskih usluga prilagoÄ‘enih potrebama vaÅ¡eg poslovanja - od poslovnih tarifa do fleksibilnih paketa.', 'We offer a wide range of mobile services tailored to business needs - from business plans to flexible packages.');
            }

            if (matchAny([/mobilni ureÄ‘aj|mobile device|telefon|smartphone|tablet|laptop|hardware/])) {
                return reply('OmoguÄ‡ujemo budÅ¾etiranje i nabavu najnovijih mobilnih ureÄ‘aja s fleksibilnim financiranjem, leasing-om i periodiÄnom zamjenom (device refresh).', 'We provide budgeting and procurement of mobile devices with flexible financing, leasing, and periodic refresh options.');
            }

            if (matchAny([/internet|internet veza|broadband|wifi|povezanost|connectivity|brzina/])) {
                return reply('Nudimo brze i stabilne poslovne internet pakete s visokim brzinama i 24/7 tehnikom podrÅ¡kom za neprekidan rad.', 'We offer fast and stable business internet packages with high speeds and 24/7 technical support for uninterrupted operations.');
            }

            if (matchAny([/servis|service|popravak|repair|odrÅ¾avanje|maintenance|diagnostika|diagnostic/])) {
                return reply('PruÅ¾amo servisne usluge: popravak hardvera, zamjena dijelova, softverski servisi, ÄiÅ¡Ä‡enje i dijagnostika problema.', 'We provide service support: hardware repair, parts replacement, software services, cleaning, and problem diagnostics.');
            }

            if (matchAny([/osiguranje|insurance|Å¡teta|damage|kvar|breakage|zaÅ¡tita|protection/])) {
                return reply('Osigurajte svoje mobitele i laptope od svih vrsta oÅ¡teÄ‡enja. Nudimo fleksibilne police osiguranja koje pokrivaju oÅ¡teÄ‡enja i kvarove.', 'Insure your mobile phones and laptops against all types of damage. We offer flexible insurance covering damage and breakdowns.');
            }

            if (matchAny([/24\/7|dostupnost|dostupan|support|pomoÄ‡|help/])) {
                return reply('Za telekomunikacijske usluge nudimo 24/7 tehniÄku podrÅ¡ku. Za ostale usluge dostupni smo radnim danom od 09:00-17:00.', 'For telecom services we offer 24/7 technical support. For other services we are available weekdays 09:00-17:00.');
            }

            // FINANCING & BUSINESS SUPPORT - WITH KNOWLEDGE BASE
            if (matchAny([/samozapoÅ¡ljavanje|samozaposljavanje|self-employment|poticaj|self-employ|obrt|craft/])) {
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
                    'Finansijske usluge: kreditiranje (HAMAG-BICRO, EU fondovi, HBOR), strukturiranje poslovanja, poslovno planiranje i pomoÄ‡ oko samozapoÅ¡ljavanja. Pitajte za specifiÄan program!',
                    'Financing services: credit (HAMAG-BICRO, EU funds, HBOR), business structuring, business planning, and self-employment support. Ask about specific programs!'
                );
            }

            if (matchAny([/kredit|krediti|kreditiranje|hamag|hamag-bicro|eu fond|financiranje|loan|borrow/])) {
                return reply('PomaÅ¾emo u dobivanju kredita preko HAMAG-BICRO, EU fondova, HBOR-a i ostalih izvora financiranja. Vodimo Vas kroz sve korake aplikacije.', 'We help obtain credit through HAMAG-BICRO, EU funds, HBOR, and other financing sources. We guide you through the entire application process.');
            }

            if (matchAny([/poslovno|business|strukturiranje|structuring|organizacija|organization|podno|plan/])) {
                return reply('Nudimo edukacije o strukturiranju poslovanja, dizajnu organizacijske strukture, poslovnim modelima i strategijama rasta.', 'We offer education on business structuring, organizational design, business models, and growth strategies.');
            }

            if (matchAny([/dokumentacija|documentation|aplikacija|application|papiri|paperwork|proces|process/])) {
                return reply('Pripremamo potrebnu dokumentaciju i vodimo Vas kroz sve administrativne korake. PoveÄ‡avamo vaÅ¡e Å¡anse za odobrenje.', 'We prepare necessary documentation and guide you through all administrative steps to increase approval chances.');
            }

            if (matchAny([/poslovna plan|business plan|strategija|strategy|rast|growth|razvoj|development/])) {
                return reply('Razvijamo sveobuhvatne poslovne planove koji sadrÅ¾e strategiju, trÅ¾iÅ¡nu analizu i financijske projekcije.', 'We develop comprehensive business plans with strategy, market analysis, and financial projections.');
            }

            if (matchAny([/mentorstvo|mentorship|savjetovanje|consulting|konzultacije|advice|savjet/])) {
                return reply('PruÅ¾amo mentorstvo i poslovni savjet kako biste uspjeÅ¡no navigirali poslovnim izazovima i doneli informirane odluke.', 'We offer mentorship and business consulting to help you navigate challenges and make informed decisions.');
            }

            // SERVICE QUESTIONS
            if (matchAny([/sve usluge|all services|Å¡to nudite|what do you offer|koji je opseg/])) {
                return reply(
                    'Nudimo 4 glavne usluge: 1) Web razvoj, 2) AI rjeÅ¡enja, 3) Telekomunikacije, 4) Financiranje i poslovna podrÅ¡ka. Kontaktirajte nas za detalje.',
                    'We offer 4 main services: 1) Web Development, 2) AI Solutions, 3) Telecommunications, 4) Financing & Business Support. Contact us for details.'
                );
            }

            if (matchAny([/poÄeti|get started|kako poÄeti|gdje poÄeti|started/])) {
                return reply(
                    'Kontaktirajte nas na +385 95 2229994 ili info@neotel-media.hr. Raspravljat Ä‡emo vaÅ¡e potrebe i kreirati prilagoÄ‘eni plan.',
                    'Contact us at +385 95 2229994 or info@neotel-media.hr. We will discuss your needs and create a customized plan.'
                );
            }

            if (matchAny([/viÅ¡e informacija|more information|saznajte|learn more|detaljno|details/])) {
                return reply(
                    'Posjetite naÅ¡u web stranicu ili nas kontaktirajte direktno. Rado Ä‡emo odgovoriti na sve vaÅ¡e pitanja i objasniti sve usluge.',
                    'Visit our website or contact us directly. We are happy to answer all your questions and explain all services.'
                );
            }

            if (matchAny([/cijene|price|cost|koliko|how much|tarifa|rate|budÅ¾et/])) {
                return reply('Cijene ovise o opsegu projekta. Slobodno nas kontaktirajte za besplatnu procjenu i ponudu.', 'Prices depend on project scope. Feel free to contact us for a free estimate and quote.');
            }

            if (matchAny([/mala|male|male firme|male tvrtke|startup|novi|new business/])) {
                return reply('Radimo sa svim vrstama poslovanja - od startupa do velikih tvrtki. PrilagoÄ‘avamo rjeÅ¡enja vaÅ¡im potrebama i budÅ¾etu.', 'We work with all business sizes - from startups to large companies. We adapt solutions to your needs and budget.');
            }

            if (matchAny([/projekti|projects|reference|portfolio|case|studije/])) {
                return reply('Imali smo 100+ uspjeÅ¡nih projekata. Slobodno nas kontaktirajte za reference i case studije.', 'We have completed 100+ successful projects. Feel free to contact us for references and case studies.');
            }

            if (matchAny([/prilagoÄ‘eno|custom|posebno|specific|prema vaÅ¡im|tailored/])) {
                return reply('Sve naÅ¡e usluge su prilagodljive vaÅ¡im specifiÄnim potrebama. Kreiramo rjeÅ¡enja koja su idealna za vaÅ¡u situaciju.', 'All our services are customizable to your specific needs. We create solutions that are ideal for your situation.');
            }

            if (matchAny([/brz|fast|hitno|urgent|koliko brzo|how fast|timeline|rok/])) {
                return reply('Brzina ovisi o opsegu projekta. Slobodno nas kontaktirajte za specifiÄan vremenski okvir.', 'Speed depends on project scope. Contact us for specific timelines on your project.');
            }

            if (matchAny([/podrÅ¡ka|support|tekuÄ‡ina|maintenance|update|updates|aÅ¾uriranja/])) {
                return reply('PruÅ¾amo kontinuiranu podrÅ¡ku i odrÅ¾avanje. Za telekomunikacije imamo 24/7 podrÅ¡ku, ostale servise radnim danima.', 'We provide ongoing support and maintenance. For telecom services we offer 24/7 support, other services on business days.');
            }

            // DEFAULT RESPONSE
            return reply(
                'Zahvaljujem na pitanju! Nudimo web razvoj, AI rjeÅ¡enja, telekomunikacije i financiranje. Å to Vas konkretno zanima?',
                'Thank you for your question! We offer web development, AI solutions, telecommunications, and financing. What specifically interests you?'
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

        // Send message - async for Groq API
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
            loadingMsg.innerHTML = '<span style="font-style: italic; color: #888;"> Thinking...</span>';
            aiChatMessages.appendChild(loadingMsg);
            aiChatMessages.scrollTop = aiChatMessages.scrollHeight;
            
            // Get AI response from Groq API
            const aiResponse = await getAIResponse(message);
            
            // Replace loading message with actual response
            loadingMsg.innerHTML = `<span>${aiResponse}</span>`;
            aiChatMessages.scrollTop = aiChatMessages.scrollHeight;
        }
        // Event listeners for close and send buttons only
        // Toggle button uses inline onclick for maximum reliability
        if (aiChatClose) {
            aiChatClose.addEventListener('click', () => {
                aiChatWindow.classList.remove('open');
            }, false);
        }
        
        if (aiChatSend) {
            aiChatSend.addEventListener('click', () => sendAIMessage(), false);
        }
        
        if (aiChatInput) {
            aiChatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    sendAIMessage();
                }
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
    });
} else {
    initLanguageSwitcher();
    initMobileNav();
    ensureAOSVisibility();
}

window.addEventListener('resize', ensureAOSVisibility);

console.log('Neotel website loaded successfully! ðŸš€');

