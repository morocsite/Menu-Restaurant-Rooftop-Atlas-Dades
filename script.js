
/* ============================================================
   RESTAURANT ROOFTOP ATLAS DADES
   PREMIUM MOROCCAN DIGITAL MENU
   JavaScript Application
   Version 1.0
   ============================================================ */

'use strict';


/* ============================================================
   01. APPLICATION CONFIGURATION
   ============================================================ */

const AtlasDades = {

    config: {
        name: 'Restaurant Rooftop Atlas Dades',

        defaultLanguage: 'fr',

        supportedLanguages: ['fr', 'en', 'ar'],

        storageKey: 'atlas_dades_preferred_language',

        yearElement: 'currentYear',

        languageSelector: 'languageSelect',

        animationThreshold: 0.12,

        animationRootMargin: '0px 0px -45px 0px'
    },


    /* ========================================================
       02. LANGUAGE TRANSLATION DATABASE
       ======================================================== */

    translations: {

        fr: {
            title: 'Restaurant Rooftop Atlas Dades | Menu Officiel',

            description:
                'Découvrez le menu du Restaurant Rooftop Atlas Dades à Boumalne Dadès. Spécialités marocaines, tajines, couscous, grillades, desserts et boissons.',

            languageLabel: 'LANGUE',

            skipLink: 'Passer au contenu principal',

            mapLink: 'Voir notre emplacement sur Google Maps',

            phoneLabel: 'TÉLÉPHONE',

            emailLabel: 'EMAIL',

            addressLabel: 'NOTRE ADRESSE',

            instagramLabel: 'INSTAGRAM',

            findUs: 'RETROUVEZ-NOUS',

            copyright: 'TOUS DROITS RÉSERVÉS.',

            restaurantName: 'RESTAURANT ATLAS DADES',

            mapAriaLabel: 'Localisation du Restaurant Atlas Dades sur Google Maps'
        },


        en: {
            title: 'Restaurant Rooftop Atlas Dades | Official Menu',

            description:
                'Explore the menu of Restaurant Rooftop Atlas Dades in Boumalne Dades. Discover Moroccan specialties, tagines, couscous, grilled dishes, desserts and drinks.',

            languageLabel: 'LANGUAGE',

            skipLink: 'Skip to main content',

            mapLink: 'Find our location on Google Maps',

            phoneLabel: 'PHONE',

            emailLabel: 'EMAIL',

            addressLabel: 'OUR ADDRESS',

            instagramLabel: 'INSTAGRAM',

            findUs: 'FIND US',

            copyright: 'ALL RIGHTS RESERVED.',

            restaurantName: 'RESTAURANT ATLAS DADES',

            mapAriaLabel: 'Restaurant Atlas Dades location on Google Maps'
        },


        ar: {
            title: 'مطعم روفتوب أطلس دادس | القائمة الرسمية',

            description:
                'اكتشف قائمة مطعم روفتوب أطلس دادس في بومالن دادس. الطواجن والكسكس والمشاوي والمأكولات المغربية والحلويات والمشروبات.',

            languageLabel: 'اللغة',

            skipLink: 'الانتقال إلى المحتوى الرئيسي',

            mapLink: 'اعثروا علينا على خرائط جوجل',

            phoneLabel: 'الهاتف',

            emailLabel: 'البريد الإلكتروني',

            addressLabel: 'عنواننا',

            instagramLabel: 'إنستغرام',

            findUs: 'اعثروا علينا',

            copyright: 'جميع الحقوق محفوظة.',

            restaurantName: 'مطعم أطلس دادس',

            mapAriaLabel: 'موقع مطعم أطلس دادس على خرائط جوجل'
        }

    },


    /* ========================================================
       03. APPLICATION STATE
       ======================================================== */

    state: {
        currentLanguage: 'fr',

        isInitialized: false,

        observer: null
    },


    /* ========================================================
       04. INITIALIZATION
       ======================================================== */

    init() {

        if (this.state.isInitialized) {
            return;
        }

        this.state.isInitialized = true;

        this.loadSavedLanguage();

        this.setupLanguageSelector();

        this.applyLanguage(this.state.currentLanguage);

        this.updateCurrentYear();

        this.setupScrollAnimations();

        this.setupAccessibility();

        this.setupDocumentMetadata();

        this.auditMenu();

        console.info(
            'Atlas Dades Menu initialized successfully.'
        );

    },


    /* ========================================================
       05. LOAD SAVED LANGUAGE
       ======================================================== */

    loadSavedLanguage() {

        let savedLanguage = null;

        try {

            savedLanguage = localStorage.getItem(
                this.config.storageKey
            );

        } catch (error) {

            console.warn(
                'Language storage is unavailable.',
                error
            );

        }


        if (
            savedLanguage &&
            this.config.supportedLanguages.includes(savedLanguage)
        ) {

            this.state.currentLanguage = savedLanguage;

        } else {

            this.state.currentLanguage =
                this.config.defaultLanguage;

        }

    },


    /* ========================================================
       06. SAVE LANGUAGE
       ======================================================== */

    saveLanguage(language) {

        if (
            !this.config.supportedLanguages.includes(language)
        ) {
            return false;
        }

        try {

            localStorage.setItem(
                this.config.storageKey,
                language
            );

            return true;

        } catch (error) {

            console.warn(
                'Unable to save language preference.',
                error
            );

            return false;

        }

    },


    /* ========================================================
       07. LANGUAGE SELECTOR
       ======================================================== */

    setupLanguageSelector() {

        const selector = document.getElementById(
            this.config.languageSelector
        );

        if (!selector) {
            console.warn(
                'Language selector was not found.'
            );

            return;
        }


        selector.addEventListener('change', (event) => {

            const selectedLanguage = event.target.value;

            this.changeLanguage(selectedLanguage);

        });

    },


    /* ========================================================
       08. CHANGE LANGUAGE
       ======================================================== */

    changeLanguage(language) {

        if (
            !this.config.supportedLanguages.includes(language)
        ) {

            console.warn(
                'Unsupported language:',
                language
            );

            return;

        }


        this.state.currentLanguage = language;

        this.saveLanguage(language);

        this.applyLanguage(language);

        this.updateDocumentMetadata(language);

        this.updateAccessibilityLabels(language);

        console.info(
            'Language changed to:',
            language
        );

    },


    /* ========================================================
       09. APPLY TRANSLATIONS TO HTML
       ======================================================== */

    applyLanguage(language) {

        const translations =
            this.translations[language];

        if (!translations) {
            return;
        }


        /* Update HTML language */

        document.documentElement.lang = language;


        /* Update text direction */

        document.documentElement.dir =
            language === 'ar' ? 'rtl' : 'ltr';


        /* Update body language */

        document.body.dataset.language = language;


        /* Update all translated elements */

        const translatedElements = document.querySelectorAll(
            '[data-fr], [data-en], [data-ar]'
        );


        translatedElements.forEach((element) => {

            const translatedText =
                element.getAttribute(`data-${language}`);

            if (translatedText !== null) {

                element.textContent = translatedText;

            }

        });


        /* Update language selector */

        const selector = document.getElementById(
            this.config.languageSelector
        );

        if (selector) {

            selector.value = language;

            selector.setAttribute(
                'aria-label',
                translations.languageLabel
            );

        }


        /* Update document title and description */

        this.updateDocumentMetadata(language);


        /* Update accessibility labels */

        this.updateAccessibilityLabels(language);


        /* Dispatch language change event */

        document.dispatchEvent(
            new CustomEvent('atlasLanguageChanged', {

                detail: {
                    language: language,
                    direction:
                        language === 'ar' ? 'rtl' : 'ltr'
                }

            })
        );

    },


    /* ========================================================
       10. UPDATE DOCUMENT METADATA
       ======================================================== */

    updateDocumentMetadata(language) {

        const translations =
            this.translations[language];

        if (!translations) {
            return;
        }


        /* Browser tab title */

        document.title = translations.title;


        /* SEO description */

        const description = document.querySelector(
            'meta[name="description"]'
        );

        if (description) {

            description.setAttribute(
                'content',
                translations.description
            );

        }


        /* Open Graph title */

        const ogTitle = document.querySelector(
            'meta[property="og:title"]'
        );

        if (ogTitle) {

            ogTitle.setAttribute(
                'content',
                translations.title
            );

        }


        /* Open Graph description */

        const ogDescription = document.querySelector(
            'meta[property="og:description"]'
        );

        if (ogDescription) {

            ogDescription.setAttribute(
                'content',
                translations.description
            );

        }


        /* Open Graph locale */

        const ogLocale = document.querySelector(
            'meta[property="og:locale"]'
        );

        if (ogLocale) {

            const locales = {
                fr: 'fr_MA',
                en: 'en_US',
                ar: 'ar_MA'
            };

            ogLocale.setAttribute(
                'content',
                locales[language]
            );

        }

    },


    /* ========================================================
       11. ACCESSIBILITY LABELS
       ======================================================== */

    updateAccessibilityLabels(language) {

        const translations =
            this.translations[language];

        if (!translations) {
            return;
        }


        const skipLink = document.querySelector(
            '.skip-link'
        );

        if (skipLink) {

            skipLink.textContent =
                translations.skipLink;

        }


        const mapLink = document.querySelector(
            '.footer-map a'
        );

        if (mapLink) {

            mapLink.setAttribute(
                'aria-label',
                translations.mapAriaLabel
            );

        }


        const languageSelector = document.getElementById(
            this.config.languageSelector
        );

        if (languageSelector) {

            languageSelector.setAttribute(
                'aria-label',
                translations.languageLabel
            );

        }

    },


    /* ========================================================
       12. AUTOMATIC CURRENT YEAR
       ======================================================== */

    updateCurrentYear() {

        const yearElement = document.getElementById(
            this.config.yearElement
        );

        if (!yearElement) {
            return;
        }

        const currentYear = new Date().getFullYear();

        yearElement.textContent = currentYear;

    },


    /* ========================================================
       13. SCROLL ANIMATION STYLES
       ======================================================== */

    injectAnimationStyles() {

        if (
            document.getElementById(
                'atlas-animation-styles'
            )
        ) {
            return;
        }


        const style = document.createElement('style');

        style.id = 'atlas-animation-styles';

        style.textContent = `

            .atlas-reveal {
                opacity: 0;

                transform: translateY(24px);

                transition:
                    opacity 700ms ease,
                    transform 700ms cubic-bezier(
                        0.22,
                        1,
                        0.36,
                        1
                    );

            }


            .atlas-reveal.is-visible {
                opacity: 1;

                transform: translateY(0);

            }


            @media (
                prefers-reduced-motion: reduce
            ) {

                .atlas-reveal {
                    opacity: 1 !important;

                    transform: none !important;

                    transition: none !important;

                }

            }

        `;

        document.head.appendChild(style);

    },


    /* ========================================================
       14. SCROLL REVEAL ANIMATIONS
       ======================================================== */

    setupScrollAnimations() {

        const prefersReducedMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        ).matches;


        if (prefersReducedMotion) {
            return;
        }


        if (!('IntersectionObserver' in window)) {
            return;
        }


        this.injectAnimationStyles();


        const animatedElements = document.querySelectorAll(
            '.menu-introduction, .menu-category, .closing-message'
        );


        if (!animatedElements.length) {
            return;
        }


        const observerOptions = {

            threshold:
                this.config.animationThreshold,

            rootMargin:
                this.config.animationRootMargin

        };


        this.state.observer =
            new IntersectionObserver((entries, observer) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            'is-visible'
                        );

                        observer.unobserve(entry.target);

                    }

                });

            }, observerOptions);


        animatedElements.forEach((element) => {

            element.classList.add('atlas-reveal');

            this.state.observer.observe(element);

        });

    },


    /* ========================================================
       15. ACCESSIBILITY INITIALIZATION
       ======================================================== */

    setupAccessibility() {

        const menuCategories = document.querySelectorAll(
            '.menu-category'
        );


        menuCategories.forEach((category) => {

            const heading = category.querySelector(
                '.category-heading h2'
            );

            if (!heading) {
                return;
            }


            if (!heading.id) {

                heading.id =
                    'heading-' +
                    (category.id || 'menu');

            }


            category.setAttribute(
                'aria-labelledby',
                heading.id
            );


        });


        /* External links security */

        const externalLinks = document.querySelectorAll(
            'a[target="_blank"]'
        );


        externalLinks.forEach((link) => {

            const relValues = new Set(
                (link.getAttribute('rel') || '')
                    .split(/\s+/)
                    .filter(Boolean)
            );

            relValues.add('noopener');
            relValues.add('noreferrer');

            link.setAttribute(
                'rel',
                Array.from(relValues).join(' ')
            );

        });

    },


    /* ========================================================
       16. MENU DATA AUDIT
       ======================================================== */

    auditMenu() {

        const categories = document.querySelectorAll(
            '.menu-category'
        );


        let totalItems = 0;

        let totalPrices = 0;

        let missingPrices = 0;

        let missingTranslations = 0;


        categories.forEach((category) => {

            const items = category.querySelectorAll(
                '.menu-item'
            );


            items.forEach((item) => {

                totalItems++;


                /* Check price */

                const price = item.querySelector(
                    '.item-price'
                );


                if (price) {

                    const priceText =
                        price.textContent.trim();

                    if (/\d/.test(priceText)) {

                        totalPrices++;

                    } else {

                        missingPrices++;

                    }

                } else {

                    missingPrices++;

                }


                /* Check all language translations */

                const translatedElements =
                    item.querySelectorAll(
                        '[data-fr], [data-en], [data-ar]'
                    );


                translatedElements.forEach((element) => {

                    const hasFrench =
                        element.hasAttribute('data-fr');

                    const hasEnglish =
                        element.hasAttribute('data-en');

                    const hasArabic =
                        element.hasAttribute('data-ar');


                    if (
                        !hasFrench ||
                        !hasEnglish ||
                        !hasArabic
                    ) {

                        missingTranslations++;

                    }

                });

            });

        });


        console.group(
            'Atlas Dades Menu Audit'
        );

        console.info(
            'Total categories:',
            categories.length
        );

        console.info(
            'Total menu items:',
            totalItems
        );

        console.info(
            'Items with prices:',
            totalPrices
        );

        console.info(
            'Items missing prices:',
            missingPrices
        );

        console.info(
            'Missing translation attributes:',
            missingTranslations
        );

        console.groupEnd();


        return {

            categories: categories.length,

            totalItems: totalItems,

            totalPrices: totalPrices,

            missingPrices: missingPrices,

            missingTranslations: missingTranslations

        };

    },


    /* ========================================================
       17. PUBLIC LANGUAGE API
       ======================================================== */

    getCurrentLanguage() {

        return this.state.currentLanguage;

    },


    getCurrentDirection() {

        return this.state.currentLanguage === 'ar'
            ? 'rtl'
            : 'ltr';

    },


    getSupportedLanguages() {

        return [...this.config.supportedLanguages];

    },


    /* ========================================================
       18. CLEANUP
       ======================================================== */

    destroy() {

        if (this.state.observer) {

            this.state.observer.disconnect();

            this.state.observer = null;

        }


        this.state.isInitialized = false;

    }

};


/* ============================================================
   19. INITIALIZE APPLICATION
   ============================================================ */

function initializeAtlasDades() {

    AtlasDades.init();

}


/* ============================================================
   20. DOM READY
   ============================================================ */

if (document.readyState === 'loading') {

    document.addEventListener(
        'DOMContentLoaded',
        initializeAtlasDades,
        { once: true }
    );

} else {

    initializeAtlasDades();

}


/* ============================================================
   21. GLOBAL APPLICATION ACCESS
   ============================================================ */

window.AtlasDades = AtlasDades;


/* ============================================================
   END OF ATLAS DADES JAVASCRIPT APPLICATION
   ============================================================ */
