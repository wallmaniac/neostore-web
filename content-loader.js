// Content Loader - Loads content from JSON files into the page
(function() {
    const currentLang = localStorage.getItem('language') || 'hr';
    
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
            updateElement('.hero-badge span', hero[`badge_${currentLang}`]);
            updateTitleWords(hero[`title_${currentLang}`]);
            updateElement('.hero-subtitle', hero[`subtitle_${currentLang}`], true);
            
            // Update web section
            updateElement('#web .section-title', web[`title_${currentLang}`]);
            updateElement('#web .section-subtitle', web[`subtitle_${currentLang}`]);
            updateElement('#web .gradient-animated', web[`heading_${currentLang}`]);
            updateElement('#web .content-text p', web[`description_${currentLang}`]);
            
            // Update AI section
            updateElement('#ai .section-title', ai[`title_${currentLang}`]);
            updateElement('#ai .section-subtitle', ai[`subtitle_${currentLang}`]);
            updateElement('#ai .gradient-animated', ai[`heading_${currentLang}`]);
            updateElement('#ai .content-text p', ai[`description_${currentLang}`]);
            
            // Update telecom section
            updateElement('#telekomunikacije .section-title', telecom[`title_${currentLang}`]);
            updateElement('#telekomunikacije .section-subtitle', telecom[`subtitle_${currentLang}`]);
            const telecomCards = document.querySelectorAll('#telekomunikacije .telecom-card h3');
            if (telecomCards[0]) telecomCards[0].textContent = telecom[`b2b_title_${currentLang}`];
            if (telecomCards[1]) telecomCards[1].textContent = telecom[`service_title_${currentLang}`];
            const telecomDescs = document.querySelectorAll('#telekomunikacije .telecom-card > p');
            if (telecomDescs[0]) telecomDescs[0].textContent = telecom[`b2b_description_${currentLang}`];
            if (telecomDescs[1]) telecomDescs[1].textContent = telecom[`service_description_${currentLang}`];
            
            // Update business section
            updateElement('#kreditiranje .section-title', business[`title_${currentLang}`]);
            updateElement('#kreditiranje .section-subtitle', business[`subtitle_${currentLang}`]);
            
            // Update contact section
            updateElement('#kontakt .section-title', contact[`title_${currentLang}`]);
            
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
