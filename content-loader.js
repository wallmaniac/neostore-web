// Content Loader - Loads content from JSON files into the page
(function() {
    // Use global currentLang from script.js, or default to 'hr'
    function getLang() {
        return window.currentLang || localStorage.getItem('language') || 'hr';
    }
    
    // Load content from JSON files
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
            
            // Update hero section
            updateElement('.hero-badge span', hero[`badge_${getLang()}`]);
            updateTitleWords(hero[`title_${getLang()}`]);
            updateElement('.hero-subtitle', hero[`subtitle_${getLang()}`], true);
            
            // Update web section
            updateElement('#web .section-title', web[`title_${getLang()}`]);
            updateElement('#web .section-subtitle', web[`subtitle_${getLang()}`]);
            updateElement('#web .gradient-animated', web[`heading_${getLang()}`]);
            updateElement('#web .content-text p', web[`description_${getLang()}`]);
            
            // Update AI section
            updateElement('#ai .section-title', ai[`title_${getLang()}`]);
            updateElement('#ai .section-subtitle', ai[`subtitle_${getLang()}`]);
            updateElement('#ai .gradient-animated', ai[`heading_${getLang()}`]);
            updateElement('#ai .content-text p', ai[`description_${getLang()}`]);
            
            // Update telecom section
            updateElement('#telekomunikacije .section-title', telecom[`title_${getLang()}`]);
            updateElement('#telekomunikacije .section-subtitle', telecom[`subtitle_${getLang()}`]);
            const telecomCards = document.querySelectorAll('#telekomunikacije .telecom-card h3');
            if (telecomCards[0]) telecomCards[0].textContent = telecom[`b2b_title_${getLang()}`];
            if (telecomCards[1]) telecomCards[1].textContent = telecom[`service_title_${getLang()}`];
            const telecomDescs = document.querySelectorAll('#telekomunikacije .telecom-card > p');
            if (telecomDescs[0]) telecomDescs[0].textContent = telecom[`b2b_description_${getLang()}`];
            if (telecomDescs[1]) telecomDescs[1].textContent = telecom[`service_description_${getLang()}`];
            
            // Update business section
            updateElement('#kreditiranje .section-title', business[`title_${getLang()}`]);
            updateElement('#kreditiranje .section-subtitle', business[`subtitle_${getLang()}`]);
            
            // Update contact section
            updateElement('#kontakt .section-title', contact[`title_${getLang()}`]);
            
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
})();
