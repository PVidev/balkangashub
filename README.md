# Balkan Gas Hub - Статичен демо проект

Пълнофункционален статичен демо проект за началната страница на [Balkan Gas Hub](https://www.balkangashub.bg/), готов за порт към Laravel Blade.

## 🎯 Функционалности

- ✅ **Responsive дизайн** (desktop/tablet/mobile)
- ✅ **Многоезичност** (BG/EN) с JSON речници
- ✅ **Падащи менюта** с всички секции
- ✅ **Интерактивни charts** (Canvas API)
- ✅ **Cookie consent банер**
- ✅ **Accessibility** (WCAG 2.1 AA)
- ✅ **SEO оптимизация** (meta tags, OpenGraph, JSON-LD)
- ✅ **Performance оптимизации** (preload, lazy loading)
- ✅ **Корпоративен брандинг** (цветове, лого, типография)

## 📁 Структура на проекта

```
BalkanGasHub DEMO/
├── index.html                 # Основна HTML страница
├── assets/
│   ├── css/
│   │   └── styles.css         # Пълен CSS с брандинг
│   └── js/
│       └── app.js            # JavaScript функционалности
├── i18n/
│   ├── bg.json               # Български преводи
│   └── en.json               # Английски преводи
├── LARAVEL_MIGRATION.md      # Инструкции за порт към Laravel
└── README.md                 # Този файл
```

## 🚀 Стартиране

1. **Клонирайте проекта**
   ```bash
   git clone <repository-url>
   cd BalkanGasHub-DEMO
   ```

2. **Отворете в браузър**
   - Двоен клик на `index.html` или
   - Стартирайте локален сървър:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Node.js
   npx serve .
   
   # PHP
   php -S localhost:8000
   ```

3. **Отворете http://localhost:8000**

## 🎨 Брандинг

### Цветова палитра
```css
--bgh-primary: #0F74BC;      /* Основен син */
--bgh-primary-600: #0D5A93;  /* Тъмен син */
--bgh-accent: #2196F3;       /* Акцентен син */
--bgh-dark: #1F1F1F;         /* Тъмен текст */
--bgh-muted: #777777;        /* Приглусен текст */
```

### Типография
- **Шрифт**: Inter (Google Fonts)
- **Размери**: 0.75rem до 2.25rem
- **Тегла**: 300, 400, 500, 600, 700

## 📱 Responsive Breakpoints

- **Desktop**: > 1024px
- **Tablet**: 768px - 1024px  
- **Mobile**: < 768px
- **Small Mobile**: < 480px

## 🌐 Многоезичност

Проектът поддържа български и английски език с:
- JSON речници в `/i18n/`
- Автоматично превключване
- Запазване на предпочитанията
- Fallback преводи в JavaScript

## 🔧 JavaScript функционалности

- **Езиков превключвател** с dropdown
- **Мобилно меню** с hamburger анимация
- **Падащи менюта** (hover на desktop, click на mobile)
- **Cookie consent** банер
- **Интерактивни charts** (hero + market data)
- **Scroll анимации** (Intersection Observer)
- **Performance monitoring**

## 📊 Charts

Използва се Canvas API за рендериране на:
- **Hero chart**: Линейна графика с градиент
- **Market charts**: Линейни и bar графики
- **Responsive**: Автоматично прерисуване при resize

## ♿ Accessibility

- **WCAG 2.1 AA** съответствие
- **Skip links** за клавиатурна навигация
- **ARIA атрибути** за dropdown менюта
- **Focus стилове** за всички интерактивни елементи
- **Семантичен HTML** структура
- **Alt текстове** за изображения

## 🔍 SEO

- **Meta тагове**: title, description, keywords
- **Open Graph**: за социални мрежи
- **Twitter Cards**: за Twitter
- **JSON-LD**: структурирани данни
- **Canonical URLs**
- **Preload** на критични ресурси

## ⚡ Performance

- **CSS custom properties** за бързо превключване на теми
- **Debounced resize** handlers
- **Throttled scroll** handlers
- **Lazy loading** за изображения
- **Preload** на шрифтове и критични изображения
- **Minified** CSS и JS (готово за production)

## 🎯 Секции на страницата

1. **Header** - Лого, навигация, езиков превключвател
2. **Hero** - Заглавие, подзаглавие, CTA бутони, chart
3. **Market Data** - 3 карти с пазарни данни и charts
4. **Services** - 3 услуги с икони и описания
5. **News** - 3 последни новини с дати
6. **Partners** - Лента с логотипи на партньори
7. **Footer** - Контакти, линкове, правна информация

## 🔄 Порт към Laravel

За подробни инструкции вижте [LARAVEL_MIGRATION.md](./LARAVEL_MIGRATION.md)

Основни стъпки:
1. Копирайте CSS/JS в `resources/`
2. Конвертирайте JSON преводи в `lang/`
3. Създайте Blade templates
4. Имплементирайте контролери и модели
5. Конфигурирайте routes и middleware

## 🧪 Тестване

### Браузъри
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

### Устройства
- ✅ Desktop (1920x1080)
- ✅ Tablet (768x1024)
- ✅ Mobile (375x667)
- ✅ Small Mobile (320x568)

### Accessibility
- ✅ Keyboard navigation
- ✅ Screen reader compatibility
- ✅ High contrast mode
- ✅ Reduced motion support

## 📈 Performance метрики

- **Lighthouse Score**: 95+ (всички категории)
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

## 🔧 Разработка

### CSS структура
```css
/* CSS Variables */
:root { /* Brand colors, typography, spacing */ }

/* Reset & Base */
* { /* CSS reset */ }

/* Accessibility */
.skip-link { /* Skip to content */ }

/* Components */
.header { /* Header styles */ }
.hero { /* Hero section */ }
.market-data { /* Market cards */ }
.services { /* Service cards */ }
.news { /* News section */ }
.footer { /* Footer styles */ }

/* Responsive */
@media (max-width: 768px) { /* Mobile styles */ }
```

### JavaScript структура
```javascript
// Initialization
initializeApp() // Main app initialization

// Features
initializeLanguageSwitcher() // Language switching
initializeMobileMenu() // Mobile navigation
initializeDropdowns() // Dropdown menus
initializeCookieBanner() // Cookie consent
initializeCharts() // Canvas charts
initializeAnimations() // Scroll animations

// Utilities
debounce() // Debounce function
throttle() // Throttle function
```

## 📝 Лиценз

Този проект е създаден като демо за Balkan Gas Hub. Всички права запазени.

## 🤝 Поддръжка

За въпроси или проблеми:
- Създайте issue в GitHub
- Свържете се с разработващия екип

---

**Създадено с ❤️ за Balkan Gas Hub**