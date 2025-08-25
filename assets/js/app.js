// ===== GLOBAL VARIABLES =====
let currentLanguage = 'bg';
let currentTheme = 'light';
let translations = {};

// ===== DOM CONTENT LOADED =====
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// ===== INITIALIZATION =====
async function initializeApp() {
    try {
        // Load translations
        await loadTranslations();
        
        // Initialize components
        initializeThemeSwitcher();
        initializeLanguageSwitcher();
        initializeMobileMenu();
        initializeDropdowns();
        initializeCookieBanner();
        initializeCharts();
        initializeAnimations();
        initializeMarketData();
        
        // Set initial language
        setLanguage(currentLanguage);
        
        console.log('Balkan Gas Hub app initialized successfully');
    } catch (error) {
        console.error('Error initializing app:', error);
    }
}

// ===== TRANSLATIONS =====
async function loadTranslations() {
    try {
        const bgResponse = await fetch('i18n/bg.json');
        const enResponse = await fetch('i18n/en.json');
        
        const bgTranslations = await bgResponse.json();
        const enTranslations = await enResponse.json();
        
        translations = {
            bg: bgTranslations,
            en: enTranslations
        };
    } catch (error) {
        console.warn('Could not load translations, using fallback:', error);
        // Fallback translations
        translations = {
            bg: getFallbackTranslations('bg'),
            en: getFallbackTranslations('en')
        };
    }
}

function getFallbackTranslations(lang) {
    const fallbacks = {
        bg: {
            nav: {
                about: 'За нас',
                products: 'Продукти и услуги',
                membership: 'Членство',
                news: 'Новини',
                surveillance: 'Пазарен надзор'
            },
            hero: {
                title: 'Централната газова борса за Югоизточна Европа',
                subtitle: 'Balkan Gas Hub осигурява ефективна и прозрачна търговия с природен газ.',
                cta: {
                    primary: 'Стани член',
                    secondary: 'Научи повече'
                }
            },
            market: {
                title: 'Пазарни данни',
                day: { title: 'Дневна цена', date: 'Днес' },
                week: { title: 'Седмична цена', date: 'Тази седмица' },
                volume: { title: 'Обем търговия', date: 'Днес' }
            },
            services: {
                title: 'Нашите услуги',
                market: {
                    title: 'Пазарни сегменти',
                    description: 'Търговия с природен газ в различни временни сегменти.',
                    link: 'Научи повече →'
                },
                membership: {
                    title: 'Стани член',
                    description: 'Присъедини се към нашата общност от търговци.',
                    link: 'Кандидатствай →'
                },
                clearing: {
                    title: 'Клиринг и сетълмент',
                    description: 'Безопасни и ефективни клиринг услуги.',
                    link: 'Документи →'
                }
            },
            news: {
                title: 'Последни новини',
                viewAll: 'Виж всички',
                months: { dec: 'Дек' },
                item1: {
                    title: 'Нови правила за балансиране на мрежата',
                    excerpt: 'Balkan Gas Hub обяви нови правила за балансиране на газовата мрежа.'
                },
                item2: {
                    title: 'Рекорден обем търговия през ноември',
                    excerpt: 'През ноември 2023 г. е регистриран рекорден обем търговия.'
                },
                item3: {
                    title: 'Нови членове се присъединиха към борсата',
                    excerpt: 'Пет нови компании станаха членове на Balkan Gas Hub.'
                }
            },
            partners: { title: 'Нашите партньори' },
            footer: {
                description: 'Централната газова борса за Югоизточна Европа.',
                contact: {
                    title: 'Контакти',
                    address: 'Адрес:',
                    phone: 'Телефон:',
                    email: 'Имейл:'
                },
                quick: {
                    title: 'Бързи линкове',
                    about: 'За нас',
                    products: 'Продукти',
                    membership: 'Членство',
                    news: 'Новини'
                },
                legal: {
                    title: 'Правна информация',
                    privacy: 'Политика за поверителност',
                    cookies: 'Бисквитки',
                    terms: 'Условия за ползване',
                    gdpr: 'GDPR'
                },
                rights: 'Всички права запазени.'
            },
            cookie: {
                message: 'Използваме бисквитки за подобряване на вашето потребителско изживяване.',
                accept: 'Приемам',
                reject: 'Отхвърлям'
            },
            theme: {
                light: 'Светла тема',
                dark: 'Тъмна тема',
                toggle: 'Превключи тема'
            },
            app: {
                switch_language: 'Превключи език',
                open_menu: 'Отвори меню'
            }
        },
        en: {
            nav: {
                about: 'About Us',
                products: 'Products and Services',
                membership: 'Membership',
                news: 'News',
                surveillance: 'Market Surveillance'
            },
            hero: {
                title: 'Central Gas Exchange for Southeast Europe',
                subtitle: 'Balkan Gas Hub provides efficient and transparent natural gas trading.',
                cta: {
                    primary: 'Become a Member',
                    secondary: 'Learn More'
                }
            },
            market: {
                title: 'Market Data',
                day: { title: 'Daily Price', date: 'Today' },
                week: { title: 'Weekly Price', date: 'This Week' },
                volume: { title: 'Trading Volume', date: 'Today' }
            },
            services: {
                title: 'Our Services',
                market: {
                    title: 'Market Segments',
                    description: 'Natural gas trading in different time segments.',
                    link: 'Learn More →'
                },
                membership: {
                    title: 'Become a Member',
                    description: 'Join our community of traders.',
                    link: 'Apply Now →'
                },
                clearing: {
                    title: 'Clearing and Settlement',
                    description: 'Secure and efficient clearing services.',
                    link: 'Documents →'
                }
            },
            news: {
                title: 'Latest News',
                viewAll: 'View All',
                months: { dec: 'Dec' },
                item1: {
                    title: 'New Network Balancing Rules',
                    excerpt: 'Balkan Gas Hub announced new gas network balancing rules.'
                },
                item2: {
                    title: 'Record Trading Volume in November',
                    excerpt: 'Record trading volume was registered in November 2023.'
                },
                item3: {
                    title: 'New Members Joined the Exchange',
                    excerpt: 'Five new companies became members of Balkan Gas Hub.'
                }
            },
            partners: { title: 'Our Partners' },
            footer: {
                description: 'The central gas exchange for Southeast Europe.',
                contact: {
                    title: 'Contact',
                    address: 'Address:',
                    phone: 'Phone:',
                    email: 'Email:'
                },
                quick: {
                    title: 'Quick Links',
                    about: 'About Us',
                    products: 'Products',
                    membership: 'Membership',
                    news: 'News'
                },
                legal: {
                    title: 'Legal Information',
                    privacy: 'Privacy Policy',
                    cookies: 'Cookies',
                    terms: 'Terms of Use',
                    gdpr: 'GDPR'
                },
                rights: 'All rights reserved.'
            },
            cookie: {
                message: 'We use cookies to improve your user experience.',
                accept: 'Accept',
                reject: 'Reject'
            },
            theme: {
                light: 'Light theme',
                dark: 'Dark theme',
                toggle: 'Toggle theme'
            },
            app: {
                switch_language: 'Switch language',
                open_menu: 'Open menu'
            }
        }
    };
    
    return fallbacks[lang] || fallbacks.bg;
}

function setLanguage(lang) {
    currentLanguage = lang;
    
    // Update HTML lang attribute
    document.documentElement.lang = lang;
    
    // Update current language display
    const currentLangElement = document.getElementById('current-lang');
    if (currentLangElement) {
        currentLangElement.textContent = lang.toUpperCase();
    }
    
    // Update all translatable elements
    updateTranslations();
    
    // Store preference
    localStorage.setItem('bgh-language', lang);
}

function updateTranslations() {
    const elements = document.querySelectorAll('[data-i18n]');
    
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = getTranslation(key, translations[currentLanguage]);
        
        if (translation) {
            if (element.tagName === 'INPUT' && element.type === 'placeholder') {
                element.placeholder = translation;
            } else {
                element.textContent = translation;
            }
        }
    });
    
    // Update aria-labels
    const ariaElements = document.querySelectorAll('[data-i18n-aria]');
    
    ariaElements.forEach(element => {
        const key = element.getAttribute('data-i18n-aria');
        const translation = getTranslation(key, translations[currentLanguage]);
        
        if (translation) {
            element.setAttribute('aria-label', translation);
        }
    });
}

function getTranslation(key, translationsParam = null, params = {}) {
    const keys = key.split('.');
    let result = translationsParam || translations[currentLanguage];
    
    for (const k of keys) {
        if (result && typeof result === 'object' && result.hasOwnProperty(k)) {
            result = result[k];
        } else {
            return null; // Key not found
        }
    }
    
    if (typeof result === 'string') {
        // Replace placeholders in the string
        for (const paramKey in params) {
            result = result.replace(new RegExp(`{${paramKey}}`, 'g'), params[paramKey]);
        }
        return result;
    }
    return null;
}

// ===== THEME SWITCHER =====
function initializeThemeSwitcher() {
    const themeToggle = document.getElementById('theme-toggle');
    
    // Load saved theme preference
    const savedTheme = localStorage.getItem('bgh-theme');
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
        currentTheme = savedTheme;
        setTheme(currentTheme);
    } else {
        // Check system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            currentTheme = 'dark';
            setTheme(currentTheme);
        }
    }
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            setTheme(newTheme);
        });
    }
}

function setTheme(theme) {
    currentTheme = theme;
    
    // Update HTML data attribute
    document.documentElement.setAttribute('data-theme', theme);
    
    // Store preference
    localStorage.setItem('bgh-theme', theme);
    
    // Update theme toggle button
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        const lightIcon = themeToggle.querySelector('.light-icon');
        const darkIcon = themeToggle.querySelector('.dark-icon');
        
        if (theme === 'dark') {
            lightIcon.style.display = 'none';
            darkIcon.style.display = 'block';
        } else {
            lightIcon.style.display = 'block';
            darkIcon.style.display = 'none';
        }
    }
}

// ===== LANGUAGE SWITCHER =====
function initializeLanguageSwitcher() {
    const langToggle = document.getElementById('lang-toggle');
    const langDropdown = document.getElementById('lang-dropdown');
    const langOptions = document.querySelectorAll('.lang-option');
    
    if (langToggle) {
        langToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            this.setAttribute('aria-expanded', !isExpanded);
            langDropdown.classList.toggle('show', !isExpanded);
        });
    }
    
    langOptions.forEach(option => {
        option.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            setLanguage(lang);
            
            // Close dropdown
            langToggle.setAttribute('aria-expanded', 'false');
            langDropdown.classList.remove('show');
        });
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!langToggle.contains(e.target) && !langDropdown.contains(e.target)) {
            langToggle.setAttribute('aria-expanded', 'false');
            langDropdown.classList.remove('show');
        }
    });
    
    // Load saved language preference
    const savedLanguage = localStorage.getItem('bgh-language');
    if (savedLanguage && (savedLanguage === 'bg' || savedLanguage === 'en')) {
        currentLanguage = savedLanguage;
    }
}

// ===== MOBILE MENU =====
function initializeMobileMenu() {
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    const mainNav = document.getElementById('main-nav');
    
    console.log('Mobile menu elements found:', { mobileToggle, mainNav });
    
    if (mobileToggle && mainNav) {
        // Set initial state
        mobileToggle.setAttribute('aria-expanded', 'false');
        
        // Add click event listener
        mobileToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            console.log('Mobile toggle clicked, current state:', isExpanded);
            
            // Toggle the menu
            if (isExpanded) {
                // Close menu
                this.setAttribute('aria-expanded', 'false');
                mainNav.classList.remove('show');
                console.log('Closing mobile menu');
            } else {
                // Open menu
                this.setAttribute('aria-expanded', 'true');
                mainNav.classList.add('show');
                console.log('Opening mobile menu');
            }
            
            console.log('Main nav classes after toggle:', mainNav.className);
            console.log('Main nav has show class:', mainNav.classList.contains('show'));
            
            // Animate hamburger
            const spans = this.querySelectorAll('span');
            if (!isExpanded) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileToggle.contains(e.target) && !mainNav.contains(e.target)) {
                mobileToggle.setAttribute('aria-expanded', 'false');
                mainNav.classList.remove('show');
                
                // Reset hamburger
                const spans = mobileToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
                
                // Reset all dropdown states
                const dropdownItems = mainNav.querySelectorAll('.nav-item.has-dropdown');
                dropdownItems.forEach(item => {
                    const dropdownLink = item.querySelector('.nav-link');
                    const dropdown = item.querySelector('.dropdown-menu');
                    if (dropdownLink && dropdown) {
                        dropdown.classList.remove('show');
                        dropdownLink.classList.remove('expanded');
                    }
                });
            }
        });
        
        // Close menu when clicking on a link
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                // Only close mobile menu if it's not a dropdown toggle
                if (!link.parentElement.classList.contains('has-dropdown') || window.innerWidth > 768) {
                    mobileToggle.setAttribute('aria-expanded', 'false');
                    mainNav.classList.remove('show');
                    
                    // Reset hamburger
                    const spans = mobileToggle.querySelectorAll('span');
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                    
                    // Reset all dropdown states
                    const dropdownItems = mainNav.querySelectorAll('.nav-item.has-dropdown');
                    dropdownItems.forEach(item => {
                        const dropdownLink = item.querySelector('.nav-link');
                        const dropdown = item.querySelector('.dropdown-menu');
                        if (dropdownLink && dropdown) {
                            dropdown.classList.remove('show');
                            dropdownLink.classList.remove('expanded');
                        }
                    });
                }
            });
        });
    } else {
        console.error('Mobile menu elements not found:', { mobileToggle, mainNav });
    }
}

// ===== DROPDOWN MENUS =====
function initializeDropdowns() {
    const dropdownItems = document.querySelectorAll('.nav-item.has-dropdown');
    
    dropdownItems.forEach(item => {
        const link = item.querySelector('.nav-link');
        const dropdown = item.querySelector('.dropdown-menu');
        
        if (link && dropdown) {
            // Desktop hover behavior is handled by CSS
            
            // Mobile touch behavior
            link.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    
                    // Toggle dropdown visibility
                    const isExpanded = dropdown.classList.contains('show');
                    
                    if (isExpanded) {
                        dropdown.classList.remove('show');
                        link.classList.remove('expanded');
                    } else {
                        // Close other open dropdowns first
                        dropdownItems.forEach(otherItem => {
                            const otherLink = otherItem.querySelector('.nav-link');
                            const otherDropdown = otherItem.querySelector('.dropdown-menu');
                            if (otherDropdown && otherDropdown !== dropdown) {
                                otherDropdown.classList.remove('show');
                                otherLink.classList.remove('expanded');
                            }
                        });
                        
                        dropdown.classList.add('show');
                        link.classList.add('expanded');
                    }
                }
            });
        }
    });
}

// ===== COOKIE BANNER =====
function initializeCookieBanner() {
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('accept-cookies');
    const rejectBtn = document.getElementById('reject-cookies');
    
    // Check if user has already made a choice
    const cookieChoice = localStorage.getItem('bgh-cookie-choice');
    
    if (!cookieChoice && cookieBanner) {
        // Show banner after a short delay
        setTimeout(() => {
            cookieBanner.classList.add('show');
        }, 1000);
    }
    
    if (acceptBtn) {
        acceptBtn.addEventListener('click', function() {
            localStorage.setItem('bgh-cookie-choice', 'accepted');
            cookieBanner.classList.remove('show');
        });
    }
    
    if (rejectBtn) {
        rejectBtn.addEventListener('click', function() {
            localStorage.setItem('bgh-cookie-choice', 'rejected');
            cookieBanner.classList.remove('show');
        });
    }
}

// ===== CHARTS =====
function initializeCharts() {
    // Hero chart
    const heroChart = document.getElementById('hero-chart');
    if (heroChart) {
        drawHeroChart(heroChart);
    }
    
    // Market charts
    const dayChart = document.getElementById('day-chart');
    const weekChart = document.getElementById('week-chart');
    const volumeChart = document.getElementById('volume-chart');
    
    if (dayChart) drawMarketChart(dayChart, 'line', [42, 44, 43, 45, 46, 45, 45.23]);
    if (weekChart) drawMarketChart(weekChart, 'line', [46, 45, 44, 45, 44.5, 44.8, 44.87]);
    if (volumeChart) drawMarketChart(volumeChart, 'bar', [800, 950, 1100, 1200, 1150, 1250, 1234]);
}

function drawHeroChart(canvas) {
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Create gradient background
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0.1)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0.05)');
    
    // Draw chart area
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    // Sample data
    const data = [30, 35, 40, 38, 45, 42, 48, 50, 47, 52, 55, 58];
    const stepX = width / (data.length - 1);
    const maxValue = Math.max(...data);
    const minValue = Math.min(...data);
    const range = maxValue - minValue;
    
    // Draw line
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    data.forEach((value, index) => {
        const x = index * stepX;
        const y = height - ((value - minValue) / range) * height * 0.8 - height * 0.1;
        
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    
    ctx.stroke();
    
    // Draw points
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    data.forEach((value, index) => {
        const x = index * stepX;
        const y = height - ((value - minValue) / range) * height * 0.8 - height * 0.1;
        
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, 2 * Math.PI);
        ctx.fill();
    });
}

function drawMarketChart(canvas, type, data) {
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    const maxValue = Math.max(...data);
    const minValue = Math.min(...data);
    const range = maxValue - minValue;
    const stepX = width / (data.length - 1);
    
    if (type === 'line') {
        // Draw line chart
        ctx.beginPath();
        ctx.strokeStyle = '#0F74BC';
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        
        data.forEach((value, index) => {
            const x = index * stepX;
            const y = height - ((value - minValue) / range) * height * 0.8 - height * 0.1;
            
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.stroke();
        
        // Draw area under line
        ctx.beginPath();
        ctx.fillStyle = 'rgba(15, 116, 188, 0.1)';
        
        data.forEach((value, index) => {
            const x = index * stepX;
            const y = height - ((value - minValue) / range) * height * 0.8 - height * 0.1;
            
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();
        ctx.fill();
        
    } else if (type === 'bar') {
        // Draw bar chart
        const barWidth = stepX * 0.6;
        const barSpacing = stepX * 0.4;
        
        data.forEach((value, index) => {
            const x = index * stepX + barSpacing / 2;
            const barHeight = ((value - minValue) / range) * height * 0.8;
            const y = height - barHeight - height * 0.1;
            
            ctx.fillStyle = '#0F74BC';
            ctx.fillRect(x, y, barWidth, barHeight);
        });
    }
}

// ===== ANIMATIONS =====
function initializeAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.market-card, .service-card, .news-card, .partner-logo');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// ===== UTILITY FUNCTIONS =====
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
    };
}

// ===== EVENT LISTENERS =====
// Handle window resize
window.addEventListener('resize', debounce(() => {
    // Reinitialize charts on resize
    initializeCharts();
}, 250));

// Handle scroll for header effects
window.addEventListener('scroll', throttle(() => {
    const header = document.querySelector('.header');
    if (header) {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
}, 100));

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
});

// ===== PERFORMANCE MONITORING =====
if ('performance' in window) {
    window.addEventListener('load', function() {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
        }, 0);
    });
}

// ===== MARKET DATA FUNCTIONALITY =====
function initializeMarketData() {
    // Market tabs functionality
    const marketTabs = document.querySelectorAll('.market-tab');
    marketTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            marketTabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Here you would typically load data for the selected tab
            const tabType = this.getAttribute('data-tab');
            loadMarketData(tabType);
        });
    });
    
    // View toggle functionality
    const viewBtns = document.querySelectorAll('.view-btn');
    viewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all view buttons
            viewBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const viewType = this.getAttribute('data-view');
            toggleView(viewType);
        });
    });
    
    // Settlement table sorting
    const sortableHeaders = document.querySelectorAll('.settlement-table th.sortable');
    sortableHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const column = this.getAttribute('data-sort');
            sortTable(column);
        });
    });
    
    // Search functionality
    const searchInput = document.getElementById('settlement-search');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(function() {
            filterTable(this.value);
        }, 300));
    }
    
    // Entries per page functionality
    const entriesSelect = document.getElementById('entries-per-page');
    if (entriesSelect) {
        entriesSelect.addEventListener('change', function() {
            updatePagination(parseInt(this.value));
        });
    }
    
    // Pagination functionality
    const paginationBtns = document.querySelectorAll('.pagination-btn');
    paginationBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (!this.disabled) {
                const page = this.textContent;
                if (page === 'Previous' || page === 'Next') {
                    navigatePage(page);
                } else {
                    goToPage(parseInt(page));
                }
            }
        });
    });
    
    // Initialize calendar and currency dropdowns
    initializeCalendar();
    initializeCurrencyDropdown();
    
    // Load initial market data
    loadMarketData('day-ahead');
}

function loadMarketData(tabType) {
    // This function would typically make an API call to load data
    console.log(`Loading market data for: ${tabType}`);
    
    // Example API call structure:
    // fetch(`/api/market-data/${tabType}`)
    //     .then(response => response.json())
    //     .then(data => {
    //         updateMarketTable(data);
    //     })
    //     .catch(error => {
    //         console.error('Error loading market data:', error);
    //     });
}

function toggleView(viewType) {
    const tableContainer = document.querySelector('.market-table-container');
    const chartContainer = document.querySelector('.market-chart-container');
    
    if (viewType === 'table') {
        tableContainer.style.display = 'block';
        if (chartContainer) chartContainer.style.display = 'none';
    } else if (viewType === 'chart') {
        tableContainer.style.display = 'none';
        if (chartContainer) chartContainer.style.display = 'block';
        // Initialize chart if needed
        initializeMarketChart();
    }
}

function sortTable(column) {
    const table = document.getElementById('settlement-table');
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    
    // Remove existing sort indicators
    const headers = table.querySelectorAll('th.sortable');
    headers.forEach(header => {
        const icon = header.querySelector('.sort-icon');
        if (icon) {
            icon.style.transform = 'rotate(0deg)';
        }
    });
    
    // Add sort indicator to clicked header
    const clickedHeader = table.querySelector(`th[data-sort="${column}"]`);
    const icon = clickedHeader.querySelector('.sort-icon');
    if (icon) {
        icon.style.transform = 'rotate(180deg)';
    }
    
    // Sort rows
    rows.sort((a, b) => {
        const aValue = a.querySelector(`td:nth-child(${getColumnIndex(column)})`).textContent;
        const bValue = b.querySelector(`td:nth-child(${getColumnIndex(column)})`).textContent;
        
        if (column === 'price') {
            return parseFloat(aValue) - parseFloat(bValue);
        } else {
            return aValue.localeCompare(bValue);
        }
    });
    
    // Reorder rows in the table
    rows.forEach(row => tbody.appendChild(row));
}

function getColumnIndex(column) {
    const columnMap = {
        'contract': 1,
        'price': 2
    };
    return columnMap[column] || 1;
}

function filterTable(searchTerm) {
    const table = document.getElementById('settlement-table');
    const rows = table.querySelectorAll('tbody tr');
    
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        const matches = text.includes(searchTerm.toLowerCase());
        row.style.display = matches ? '' : 'none';
    });
    
    updatePaginationInfo();
}

function updatePagination(entriesPerPage) {
    // This would typically update the table to show the specified number of entries
    console.log(`Updating pagination to show ${entriesPerPage} entries per page`);
    updatePaginationInfo();
}

function navigatePage(direction) {
    // This would navigate to the previous or next page
    console.log(`Navigating ${direction}`);
}

function goToPage(page) {
    // This would go to a specific page
    console.log(`Going to page ${page}`);
}

function updatePaginationInfo() {
    const visibleRows = document.querySelectorAll('#settlement-table tbody tr:not([style*="display: none"])');
    const totalRows = document.querySelectorAll('#settlement-table tbody tr');
    const infoElement = document.querySelector('.pagination-info');
    
    if (infoElement) {
        infoElement.textContent = `Показване на 1 до ${visibleRows.length} от ${totalRows.length} записа`;
    }
}

// ===== CALENDAR FUNCTIONALITY =====
function initializeCalendar() {
    const dateInput = document.getElementById('date-range');
    const calendarDropdown = document.getElementById('calendar-dropdown');
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');
    const calendarGrid = document.getElementById('calendar-grid');
    const calendarMonth = document.getElementById('calendar-month');
    
    let currentDate = new Date();
    let selectedStartDate = new Date(2025, 7, 20); // Aug 20, 2025
    let selectedEndDate = new Date(2025, 7, 26); // Aug 26, 2025
    
    // Toggle calendar dropdown
    dateInput.addEventListener('click', function(e) {
        e.stopPropagation();
        calendarDropdown.classList.toggle('show');
        renderCalendar();
    });
    
    // Close calendar when clicking outside
    document.addEventListener('click', function(e) {
        if (!dateInput.contains(e.target) && !calendarDropdown.contains(e.target)) {
            calendarDropdown.classList.remove('show');
        }
    });
    
    // Navigation buttons
    prevMonthBtn.addEventListener('click', function() {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });
    
    nextMonthBtn.addEventListener('click', function() {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });
    
    function renderCalendar() {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        
        const monthName = new Date(year, month).toLocaleDateString('en-US', { month: 'long' }).toLowerCase();
        const monthTranslation = getTranslation(`calendar.months.${monthName}`, translations[currentLanguage]) || new Date(year, month).toLocaleDateString('en-US', { 
            month: 'long', 
            year: 'numeric' 
        });
        calendarMonth.textContent = monthTranslation + ' ' + year;
        
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const startDate = new Date(firstDay);
        startDate.setDate(startDate.getDate() - firstDay.getDay());
        
        let calendarHTML = '';
        
        // Day headers
        const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
        days.forEach(day => {
            const dayTranslation = getTranslation(`calendar.days.${day}`, translations[currentLanguage]) || day.toUpperCase();
            calendarHTML += `<div class="calendar-day header">${dayTranslation}</div>`;
        });
        
        // Calendar days
        for (let i = 0; i < 42; i++) {
            const date = new Date(startDate);
            date.setDate(startDate.getDate() + i);
            
            const isCurrentMonth = date.getMonth() === month;
            const isToday = date.toDateString() === new Date().toDateString();
            const isSelected = date >= selectedStartDate && date <= selectedEndDate;
            
            let classes = 'calendar-day';
            if (!isCurrentMonth) classes += ' other-month';
            if (isToday) classes += ' today';
            if (isSelected) classes += ' selected';
            
            calendarHTML += `<div class="${classes}" data-date="${date.toISOString().split('T')[0]}">${date.getDate()}</div>`;
        }
        
        calendarGrid.innerHTML = calendarHTML;
        
        // Add click handlers for days
        const dayElements = calendarGrid.querySelectorAll('.calendar-day:not(.header)');
        dayElements.forEach(day => {
            day.addEventListener('click', function() {
                const dateStr = this.getAttribute('data-date');
                const clickedDate = new Date(dateStr);
                
                if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
                    selectedStartDate = clickedDate;
                    selectedEndDate = null;
                } else {
                    if (clickedDate < selectedStartDate) {
                        selectedEndDate = selectedStartDate;
                        selectedStartDate = clickedDate;
                    } else {
                        selectedEndDate = clickedDate;
                    }
                }
                
                updateDateRange();
                renderCalendar();
            });
        });
    }
    
    function updateDateRange() {
        if (selectedStartDate && selectedEndDate) {
            const startStr = selectedStartDate.toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric', 
                year: 'numeric' 
            });
            const endStr = selectedEndDate.toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric', 
                year: 'numeric' 
            });
            dateInput.value = `${startStr} - ${endStr}`;
            calendarDropdown.classList.remove('show');
        }
    }
}

// ===== CURRENCY FUNCTIONALITY =====
function initializeCurrencyDropdown() {
    const currencyInput = document.getElementById('currency');
    const currencyDropdown = document.getElementById('currency-dropdown');
    const currencyOptions = document.querySelectorAll('.currency-option');
    
    // Toggle currency dropdown
    currencyInput.addEventListener('click', function(e) {
        e.stopPropagation();
        currencyDropdown.classList.toggle('show');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!currencyInput.contains(e.target) && !currencyDropdown.contains(e.target)) {
            currencyDropdown.classList.remove('show');
        }
    });
    
            // Currency selection
        currencyOptions.forEach(option => {
            option.addEventListener('click', function() {
                const currency = this.getAttribute('data-currency');
                const currencyText = getTranslation(`currency.${currency.toLowerCase()}`, translations[currentLanguage]) || currency;
                currencyInput.value = currency;
                
                // Update selected state
                currencyOptions.forEach(opt => opt.classList.remove('selected'));
                this.classList.add('selected');
                
                currencyDropdown.classList.remove('show');
                
                // Convert prices based on selected currency
                convertPrices(currency);
            });
        });
    
    // Set initial selected currency
    currencyOptions[0].classList.add('selected');
}

// ===== PRICE CONVERSION =====
async function convertPrices(targetCurrency) {
    if (targetCurrency === 'BGN') return; // Base currency
    
    try {
        // Get real-time exchange rates (using a free API)
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/BGN');
        const data = await response.json();
        
        const rate = data.rates[targetCurrency];
        if (!rate) {
            console.error('Exchange rate not available for', targetCurrency);
            return;
        }
        
        // Convert VWAP prices in the table
        const vwapCells = document.querySelectorAll('.market-table tbody td:nth-child(4)');
        vwapCells.forEach(cell => {
            const originalPrice = parseFloat(cell.textContent);
            if (!isNaN(originalPrice)) {
                const convertedPrice = (originalPrice * rate).toFixed(2);
                cell.textContent = convertedPrice;
            }
        });
        
        // Convert settlement prices
        const settlementCells = document.querySelectorAll('.settlement-table tbody td:nth-child(2)');
        settlementCells.forEach(cell => {
            const originalPrice = parseFloat(cell.textContent);
            if (!isNaN(originalPrice)) {
                const convertedPrice = (originalPrice * rate).toFixed(2);
                cell.textContent = convertedPrice;
            }
        });
        
        // Update table headers
        const vwapHeader = document.querySelector('.market-table th:nth-child(4)');
        const settlementHeader = document.querySelector('.settlement-table th:nth-child(2)');
        
        if (vwapHeader) {
            const vwapText = getTranslation('market.table.headers.vwap', translations[currentLanguage], { currency: targetCurrency });
            vwapHeader.textContent = vwapText || `VWAP (${targetCurrency}/MWh)`;
        }
        if (settlementHeader) {
            const settlementText = getTranslation('market.settlement.headers.price', translations[currentLanguage], { currency: targetCurrency });
            settlementHeader.textContent = settlementText || `Settlement price (${targetCurrency}/MWh)`;
        }
        
    } catch (error) {
        console.error('Error converting prices:', error);
    }
}

// ===== MARKET DATA LOADING =====
function loadMarketData(tabType) {
    console.log(`Loading market data for: ${tabType}`);
    
    // Different data for different tabs
    const marketData = {
        'intraday': [
            { date: '2025-08-26 09:00', volume: 12500, trades: 45, vwap: 63.15, change: '+0.21', reference: '-' },
            { date: '2025-08-26 10:00', volume: 15800, trades: 52, vwap: 63.28, change: '+0.13', reference: '-' },
            { date: '2025-08-26 11:00', volume: 14200, trades: 48, vwap: 63.42, change: '+0.14', reference: '-' },
            { date: '2025-08-26 12:00', volume: 16800, trades: 55, vwap: 63.35, change: '-0.07', reference: '-' },
            { date: '2025-08-26 13:00', volume: 15200, trades: 49, vwap: 63.18, change: '-0.17', reference: '-' }
        ],
        'day-ahead': [
            { date: '2025-08-26', volume: 63641, trades: 209, vwap: 62.94, change: '+0.61', reference: '-' },
            { date: '2025-08-25', volume: 51759, trades: 151, vwap: 62.56, change: '+0.64', reference: 62.58 },
            { date: '2025-08-24', volume: 48932, trades: 134, vwap: 62.17, change: '+0.52', reference: 62.58 },
            { date: '2025-08-23', volume: 45123, trades: 128, vwap: 61.89, change: '+3.72', reference: 61.89 },
            { date: '2025-08-22', volume: 42567, trades: 119, vwap: 61.78, change: '0.00', reference: 61.78 },
            { date: '2025-08-21', volume: 39845, trades: 112, vwap: 61.95, change: '-0.18', reference: 61.95 },
            { date: '2025-08-20', volume: 37234, trades: 105, vwap: 62.12, change: '-0.17', reference: 62.12 }
        ],
        'weeks': [
            { date: 'Week 34', volume: 285000, trades: 850, vwap: 62.45, change: '+1.23', reference: 61.22 },
            { date: 'Week 33', volume: 272000, trades: 780, vwap: 61.22, change: '-0.85', reference: 62.07 },
            { date: 'Week 32', volume: 298000, trades: 920, vwap: 62.07, change: '+2.15', reference: 59.92 },
            { date: 'Week 31', volume: 265000, trades: 750, vwap: 59.92, change: '-1.08', reference: 61.00 },
            { date: 'Week 30', volume: 281000, trades: 820, vwap: 61.00, change: '+0.75', reference: 60.25 }
        ],
        'months': [
            { date: 'August 2025', volume: 1150000, trades: 3200, vwap: 62.15, change: '+3.45', reference: 58.70 },
            { date: 'July 2025', volume: 1080000, trades: 2900, vwap: 58.70, change: '-2.10', reference: 60.80 },
            { date: 'June 2025', volume: 1120000, trades: 3100, vwap: 60.80, change: '+1.85', reference: 58.95 },
            { date: 'May 2025', volume: 1050000, trades: 2800, vwap: 58.95, change: '-1.25', reference: 60.20 },
            { date: 'April 2025', volume: 1090000, trades: 3000, vwap: 60.20, change: '+2.75', reference: 57.45 }
        ]
    };
    
    const data = marketData[tabType] || marketData['day-ahead'];
    updateMarketTable(data);
    
    // Update chart if in chart view
    const activeView = document.querySelector('.view-btn.active');
    if (activeView && activeView.getAttribute('data-view') === 'chart') {
        updateMarketChart(data, tabType);
    }
}

function updateMarketTable(data) {
    const tbody = document.querySelector('#gas-market-table tbody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    data.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${row.date}</td>
            <td>${row.volume.toLocaleString()}</td>
            <td>${row.trades}</td>
            <td>${row.vwap}</td>
            <td class="${getChangeClass(row.change)}">${row.change} ${getChangeIcon(row.change)}</td>
            <td>${row.reference}</td>
        `;
        tbody.appendChild(tr);
    });
}

function getChangeClass(change) {
    if (change.startsWith('+')) return 'change-positive';
    if (change.startsWith('-')) return 'change-negative';
    return 'change-neutral';
}

function getChangeIcon(change) {
    if (change.startsWith('+')) return '↗';
    if (change.startsWith('-')) return '↘';
    return '=';
}

function toggleView(viewType) {
    const tableContainer = document.querySelector('.market-table-container');
    const chartContainer = document.querySelector('.market-chart-container');
    
    if (viewType === 'table') {
        tableContainer.style.display = 'block';
        if (chartContainer) chartContainer.style.display = 'none';
    } else if (viewType === 'chart') {
        tableContainer.style.display = 'none';
        if (chartContainer) chartContainer.style.display = 'block';
        
        // Get current active tab and load chart
        const activeTab = document.querySelector('.market-tab.active');
        const tabType = activeTab ? activeTab.getAttribute('data-tab') : 'day-ahead';
        loadMarketData(tabType);
    }
}

function updateMarketChart(data, tabType) {
    const canvas = document.getElementById('market-chart');
    if (!canvas) return;
    
    // Destroy existing chart if it exists
    if (window.marketChart) {
        window.marketChart.destroy();
    }
    
    const ctx = canvas.getContext('2d');
    
    // Prepare chart data
    const labels = data.map(item => item.date);
    const vwapData = data.map(item => item.vwap);
    const volumeData = data.map(item => item.volume / 1000); // Convert to thousands
    
    // Create color arrays based on change values
    const vwapColors = data.map(item => {
        const change = item.change;
        if (change.startsWith('+')) return '#28a745'; // Green for positive
        if (change.startsWith('-')) return '#dc3545'; // Red for negative
        return '#000000'; // Black for neutral/no change
    });
    
    // Create point colors for VWAP line
    const vwapPointColors = data.map(item => {
        const change = item.change;
        if (change.startsWith('+')) return '#28a745'; // Green for positive
        if (change.startsWith('-')) return '#dc3545'; // Red for negative
        return '#000000'; // Black for neutral/no change
    });
    
    // Create gradient for VWAP line (using average color)
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(0, 123, 255, 0.8)');
    gradient.addColorStop(1, 'rgba(0, 123, 255, 0.1)');
    
    window.marketChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'VWAP (BGN/MWh)',
                    data: vwapData,
                    borderColor: vwapColors,
                    backgroundColor: gradient,
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    yAxisID: 'y',
                    pointBackgroundColor: vwapPointColors,
                    pointBorderColor: vwapPointColors,
                    pointRadius: 6,
                    pointHoverRadius: 8
                },
                {
                    label: 'Volume (thousands MWh/d)',
                    data: volumeData,
                    borderColor: vwapColors,
                    backgroundColor: vwapColors.map(color => color + '20'), // Add transparency
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4,
                    yAxisID: 'y1',
                    type: 'bar'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            plugins: {
                title: {
                    display: true,
                    text: `${tabType.charAt(0).toUpperCase() + tabType.slice(1)} Market Data`,
                    color: getComputedStyle(document.documentElement).getPropertyValue('--text-primary'),
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                },
                legend: {
                    labels: {
                        color: getComputedStyle(document.documentElement).getPropertyValue('--text-primary')
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: getComputedStyle(document.documentElement).getPropertyValue('--text-secondary')
                    },
                    grid: {
                        color: getComputedStyle(document.documentElement).getPropertyValue('--border-color')
                    }
                },
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    title: {
                        display: true,
                        text: 'VWAP (BGN/MWh)',
                        color: getComputedStyle(document.documentElement).getPropertyValue('--text-primary')
                    },
                    ticks: {
                        color: getComputedStyle(document.documentElement).getPropertyValue('--text-secondary')
                    },
                    grid: {
                        color: getComputedStyle(document.documentElement).getPropertyValue('--border-color')
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: {
                        display: true,
                        text: 'Volume (thousands MWh/d)',
                        color: getComputedStyle(document.documentElement).getPropertyValue('--text-primary')
                    },
                    ticks: {
                        color: getComputedStyle(document.documentElement).getPropertyValue('--text-secondary')
                    },
                    grid: {
                        drawOnChartArea: false,
                    },
                }
            }
        }
    });
}

function initializeMarketChart() {
    // This function is now handled by updateMarketChart
    console.log('Chart initialization handled by updateMarketChart');
}

// ===== EXPORT FOR GLOBAL ACCESS =====
window.BGHApp = {
    setLanguage,
    getTranslation,
    currentLanguage: () => currentLanguage
};
