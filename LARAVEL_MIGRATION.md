# Миграция към Laravel Blade

Този документ описва как да портирате статичния HTML/CSS/JS проект към Laravel Blade.

## 📁 Структура на Laravel проекта

```
resources/
├── views/
│   ├── layouts/
│   │   └── app.blade.php
│   ├── partials/
│   │   ├── header.blade.php
│   │   ├── footer.blade.php
│   │   ├── cookie-banner.blade.php
│   │   ├── login-modal.blade.php
│   │   └── reset-password-modal.blade.php
│   └── pages/
│       ├── home.blade.php
│       ├── fees.blade.php
│       └── about/
│           └── management-statement.blade.php
├── css/
│   └── app.css (копирайте assets/css/styles.css)
├── js/
│   └── app.js (копирайте assets/js/app.js)
└── lang/
    ├── bg/
    │   └── app.php (конвертирайте i18n/bg.json)
    └── en/
        └── app.php (конвертирайте i18n/en.json)
```

## 🔧 Стъпки за миграция

### 1. Създаване на Layout файл

```php
<!-- resources/views/layouts/app.blade.php -->
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', 'Balkan Gas Hub')</title>
    <meta name="description" content="@yield('description', 'Централната газова борса за Югоизточна Европа')">
    
    <!-- Favicon -->
    <link rel="icon" type="image/x-icon" href="{{ asset('images/favicon.ico') }}">
    
    <!-- Preconnect to external resources -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    
    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">
    
    <!-- Vite -->
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    
    @stack('head')
</head>
<body>
    <!-- Skip to content link for accessibility -->
    <a href="#main-content" class="skip-link">{{ __('app.skip_to_content') }}</a>

    @include('partials.header')
    
    <main id="main-content">
        @yield('content')
    </main>
    
    @include('partials.footer')
    @include('partials.cookie-banner')
    @include('partials.login-modal')
    @include('partials.reset-password-modal')
    
    <!-- Chart.js for market data visualization -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    
    @stack('scripts')
</body>
</html>
```

### 2. Header Partial

```php
<!-- resources/views/partials/header.blade.php -->
<header class="header">
    <div class="header-container">
        <!-- Logo -->
        <div class="logo">
            <a href="{{ route('home') }}" aria-label="Balkan Gas Hub - {{ __('app.home') }}">
                <img src="https://www.balkangashub.bg/imgs/logo_2.png" alt="Balkan Gas Hub Logo" class="logo-img">
            </a>
        </div>

        <!-- Header Controls -->
        <div class="header-controls">
            <!-- Language Switcher -->
            <div class="language-switcher">
                <button id="lang-toggle" class="lang-toggle" aria-expanded="false" aria-label="{{ __('app.switch_language') }}">
                    <span id="current-lang">{{ strtoupper(app()->getLocale()) }}</span>
                    <svg class="lang-arrow" width="12" height="8" viewBox="0 0 12 8">
                        <path d="M1 1L6 6L11 1" stroke="currentColor" stroke-width="2" fill="none"/>
                    </svg>
                </button>
                <div class="lang-dropdown" id="lang-dropdown">
                    <button class="lang-option" data-lang="bg" data-i18n="languages.bg">{{ __('languages.bg') }}</button>
                    <button class="lang-option" data-lang="en" data-i18n="languages.en">{{ __('languages.en') }}</button>
                </div>
            </div>
            
            <!-- Login Button -->
            <div class="login-section">
                <button id="login-btn" class="btn btn-login" data-i18n="auth.login">
                    <svg class="login-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                        <polyline points="10,17 15,12 10,7"/>
                        <line x1="15" y1="12" x2="3" y2="12"/>
                    </svg>
                    <span class="login-text">{{ __('auth.login') }}</span>
                </button>
            </div>
            
            <!-- Mobile Menu Toggle -->
            <button id="mobile-menu-toggle" class="mobile-menu-toggle" aria-label="{{ __('app.open_menu') }}" data-i18n-aria="app.open_menu">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>
    </div>
    
    <!-- Navigation -->
    <nav class="main-nav" id="main-nav">
        <ul class="nav-list">
            @foreach($navigation as $item)
                <li class="nav-item {{ $item['has_dropdown'] ? 'has-dropdown' : '' }}">
                    <a href="{{ $item['url'] }}" class="nav-link {{ $item['active'] ? 'active' : '' }}">{{ $item['title'] }}</a>
                    @if($item['has_dropdown'])
                        <div class="dropdown-menu">
                            <ul>
                                @foreach($item['children'] as $child)
                                    <li><a href="{{ $child['url'] }}" class="{{ $child['active'] ? 'active' : '' }}">{{ $child['title'] }}</a></li>
                                @endforeach
                            </ul>
                        </div>
                    @endif
                </li>
            @endforeach
        </ul>
    </nav>
</header>
```

### 3. Login Modal Partial

```php
<!-- resources/views/partials/login-modal.blade.php -->
<div id="login-modal" class="modal">
    <div class="modal-content">
        <div class="modal-header">
            <h2>{{ __('auth.login') }}</h2>
            <button class="modal-close" id="login-modal-close" aria-label="{{ __('app.close') }}">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
        </div>
        <div class="modal-body">
            <form id="login-form" class="login-form" method="POST" action="{{ route('auth.login') }}">
                @csrf
                <div class="form-group">
                    <label for="login-email">{{ __('auth.email') }}</label>
                    <input type="email" id="login-email" name="email" required>
                </div>
                
                <div class="form-group">
                    <label for="login-password">{{ __('auth.password') }}</label>
                    <input type="password" id="login-password" name="password" required>
                </div>
                
                <div class="form-group checkbox-group">
                    <label class="checkbox-label">
                        <input type="checkbox" id="login-remember" name="remember">
                        <span class="checkmark"></span>
                        <span class="checkbox-text">{{ __('auth.remember_me') }}</span>
                    </label>
                </div>
                
                <div class="form-actions">
                    <button type="submit" class="btn btn-primary btn-login-submit">{{ __('auth.login') }}</button>
                    <a href="#" class="forgot-password" id="forgot-password-link">{{ __('auth.forgot_password') }}</a>
                </div>
            </form>
        </div>
    </div>
</div>
```

### 4. Reset Password Modal Partial

```php
<!-- resources/views/partials/reset-password-modal.blade.php -->
<div id="reset-password-modal" class="modal">
    <div class="modal-content">
        <div class="modal-header">
            <h2>{{ __('auth.reset_password') }}</h2>
            <button class="modal-close" id="reset-password-modal-close" aria-label="{{ __('app.close') }}">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
        </div>
        <div class="modal-body">
            <form id="reset-password-form" class="reset-password-form" method="POST" action="{{ route('auth.password.email') }}">
                @csrf
                <div class="form-group">
                    <label for="reset-email">{{ __('auth.email') }}</label>
                    <input type="email" id="reset-email" name="email" required>
                </div>
                
                <div class="form-actions">
                    <button type="submit" class="btn btn-primary btn-reset-submit">{{ __('auth.send_reset_link') }}</button>
                </div>
            </form>
        </div>
    </div>
</div>
```

### 5. Конфигурация на навигацията

```php
// config/navigation.php
return [
    'main' => [
        [
            'title' => __('nav.about'),
            'url' => route('about'),
            'has_dropdown' => true,
            'active' => request()->routeIs('about.*'),
            'children' => [
                ['title' => __('nav.about.management'), 'url' => route('about.management'), 'active' => request()->routeIs('about.management')],
                ['title' => __('nav.about.company'), 'url' => route('about.company'), 'active' => request()->routeIs('about.company')],
                ['title' => __('nav.about.ownership'), 'url' => route('about.ownership'), 'active' => request()->routeIs('about.ownership')],
                ['title' => __('nav.about.structure'), 'url' => route('about.structure'), 'active' => request()->routeIs('about.structure')],
                ['title' => __('nav.about.reports'), 'url' => route('about.reports'), 'active' => request()->routeIs('about.reports')],
                ['title' => __('nav.about.financial'), 'url' => route('about.financial'), 'active' => request()->routeIs('about.financial')],
                ['title' => __('nav.about.links'), 'url' => route('about.links'), 'active' => request()->routeIs('about.links')],
                ['title' => __('nav.about.data'), 'url' => route('about.data'), 'active' => request()->routeIs('about.data')],
                ['title' => __('nav.about.conditions'), 'url' => route('about.conditions'), 'active' => request()->routeIs('about.conditions')],
                ['title' => __('nav.about.contact'), 'url' => route('about.contact'), 'active' => request()->routeIs('about.contact')],
            ]
        ],
        [
            'title' => __('nav.products'),
            'url' => route('products'),
            'has_dropdown' => true,
            'active' => request()->routeIs('products.*'),
            'children' => [
                ['title' => __('nav.products.balancing'), 'url' => route('products.balancing'), 'active' => request()->routeIs('products.balancing')],
                ['title' => __('nav.products.grp'), 'url' => route('products.grp'), 'active' => request()->routeIs('products.grp')],
                ['title' => __('nav.products.short'), 'url' => route('products.short'), 'active' => request()->routeIs('products.short')],
                ['title' => __('nav.products.long'), 'url' => route('products.long'), 'active' => request()->routeIs('products.long')],
                ['title' => __('nav.products.auction'), 'url' => route('products.auction'), 'active' => request()->routeIs('products.auction')],
                ['title' => __('nav.products.chiren'), 'url' => route('products.chiren'), 'active' => request()->routeIs('products.chiren')],
                ['title' => __('nav.products.igb'), 'url' => route('products.igb'), 'active' => request()->routeIs('products.igb')],
                ['title' => __('nav.products.ip'), 'url' => route('products.ip'), 'active' => request()->routeIs('products.ip')],
                ['title' => __('nav.products.galata'), 'url' => route('products.galata'), 'active' => request()->routeIs('products.galata')],
                ['title' => __('nav.products.rulebook'), 'url' => route('products.rulebook'), 'active' => request()->routeIs('products.rulebook')],
                ['title' => __('nav.products.api'), 'url' => route('products.api'), 'active' => request()->routeIs('products.api')],
                ['title' => __('nav.products.fees'), 'url' => route('products.fees'), 'active' => request()->routeIs('products.fees')],
            ]
        ],
        [
            'title' => __('nav.membership'),
            'url' => route('membership'),
            'has_dropdown' => true,
            'active' => request()->routeIs('membership.*'),
            'children' => [
                ['title' => __('nav.membership.registration'), 'url' => route('membership.registration'), 'active' => request()->routeIs('membership.registration')],
                ['title' => __('nav.membership.members'), 'url' => route('membership.members'), 'active' => request()->routeIs('membership.members')],
                ['title' => __('nav.membership.remit'), 'url' => route('membership.remit'), 'active' => request()->routeIs('membership.remit')],
            ]
        ],
        [
            'title' => __('nav.news'),
            'url' => route('news'),
            'has_dropdown' => true,
            'active' => request()->routeIs('news.*'),
            'children' => [
                ['title' => __('nav.news.all'), 'url' => route('news.all'), 'active' => request()->routeIs('news.all')],
                ['title' => __('nav.news.press'), 'url' => route('news.press'), 'active' => request()->routeIs('news.press')],
                ['title' => __('nav.news.announcements'), 'url' => route('news.announcements'), 'active' => request()->routeIs('news.announcements')],
            ]
        ],
        [
            'title' => __('nav.surveillance'),
            'url' => route('surveillance'),
            'has_dropdown' => true,
            'active' => request()->routeIs('surveillance.*'),
            'children' => [
                ['title' => __('nav.surveillance.clearing'), 'url' => route('surveillance.clearing'), 'active' => request()->routeIs('surveillance.clearing')],
                ['title' => __('nav.surveillance.documents'), 'url' => route('surveillance.documents'), 'active' => request()->routeIs('surveillance.documents')],
                ['title' => __('nav.surveillance.procedure'), 'url' => route('surveillance.procedure'), 'active' => request()->routeIs('surveillance.procedure')],
            ]
        ],
    ]
];
```

### 6. Контролер за началната страница

```php
// app/Http/Controllers/HomeController.php
<?php

namespace App\Http\Controllers;

use App\Models\News;
use App\Models\MarketData;
use App\Models\Partner;

class HomeController extends Controller
{
    public function index()
    {
        $data = [
            'navigation' => config('navigation.main'),
            'latestNews' => News::latest()->take(3)->get(),
            'marketData' => MarketData::latest()->first(),
            'partners' => Partner::all(),
        ];
        
        return view('pages.home', $data);
    }
}
```

### 7. Контролер за Management Statement

```php
// app/Http/Controllers/AboutController.php
<?php

namespace App\Http\Controllers;

class AboutController extends Controller
{
    public function managementStatement()
    {
        $data = [
            'navigation' => config('navigation.main'),
        ];
        
        return view('pages.about.management-statement', $data);
    }
}
```

### 8. Home Page View

```php
<!-- resources/views/pages/home.blade.php -->
@extends('layouts.app')

@section('title', __('app.home_title'))
@section('description', __('app.home_description'))

@section('content')
    <!-- Hero Section -->
    <section class="hero">
        <div class="container">
            <div class="hero-content">
                <h1 class="hero-title">{{ __('hero.title') }}</h1>
                <p class="hero-subtitle">{{ __('hero.subtitle') }}</p>
                <div class="hero-buttons">
                    <a href="{{ route('membership.apply') }}" class="btn btn-primary btn-large">
                        {{ __('hero.cta.primary') }}
                    </a>
                    <a href="{{ route('about') }}" class="btn btn-secondary btn-large">
                        {{ __('hero.cta.secondary') }}
                    </a>
                </div>
            </div>
            <div class="hero-visual">
                <div class="hero-chart">
                    <canvas id="hero-chart" width="400" height="300"></canvas>
                </div>
            </div>
        </div>
    </section>

    <!-- Market Data Section -->
    <section class="market-data">
        <div class="container">
            <h2 class="section-title">{{ __('market.title') }}</h2>
            <div class="market-cards">
                @foreach($marketData->getCards() as $card)
                    <div class="market-card">
                        <div class="market-card-header">
                            <h3>{{ $card['title'] }}</h3>
                            <span class="market-date">{{ $card['date'] }}</span>
                        </div>
                        <div class="market-value">
                            <span class="price">{{ $card['price'] }}</span>
                            <span class="change {{ $card['change_type'] }}">{{ $card['change'] }}</span>
                        </div>
                        <div class="market-chart">
                            <canvas id="{{ $card['chart_id'] }}" width="200" height="100"></canvas>
                        </div>
                    </div>
                @endforeach
            </div>
        </div>
    </section>

    <!-- Services Section -->
    <section class="services">
        <div class="container">
            <h2 class="section-title">{{ __('services.title') }}</h2>
            <div class="services-grid">
                @foreach(config('services') as $service)
                    <div class="service-card">
                        <div class="service-icon">
                            {!! $service['icon'] !!}
                        </div>
                        <h3>{{ $service['title'] }}</h3>
                        <p>{{ $service['description'] }}</p>
                        <a href="{{ $service['url'] }}" class="service-link">{{ $service['link_text'] }}</a>
                    </div>
                @endforeach
            </div>
        </div>
    </section>

    <!-- News Section -->
    <section class="news">
        <div class="container">
            <div class="section-header">
                <h2 class="section-title">{{ __('news.title') }}</h2>
                <a href="{{ route('news.index') }}" class="view-all">{{ __('news.viewAll') }}</a>
            </div>
            <div class="news-grid">
                @foreach($latestNews as $news)
                    <article class="news-card">
                        <div class="news-date">
                            <span class="day">{{ $news->created_at->format('d') }}</span>
                            <span class="month">{{ __('calendar.months.' . strtolower($news->created_at->format('M'))) }}</span>
                        </div>
                        <div class="news-content">
                            <h3><a href="{{ route('news.show', $news) }}">{{ $news->title }}</a></h3>
                            <p>{{ $news->excerpt }}</p>
                        </div>
                    </article>
                @endforeach
            </div>
        </div>
    </section>

    <!-- Partners Section -->
    <section class="partners">
        <div class="container">
            <h2 class="section-title">{{ __('partners.title') }}</h2>
            <div class="partners-grid">
                @foreach($partners as $partner)
                    <div class="partner-logo">
                        @if($partner->logo)
                            <img src="{{ asset('storage/' . $partner->logo) }}" alt="{{ $partner->name }}">
                        @else
                            <div class="partner-placeholder">{{ $partner->name }}</div>
                        @endif
                    </div>
                @endforeach
            </div>
        </div>
    </section>
@endsection
```

### 9. Management Statement Page View

```php
<!-- resources/views/pages/about/management-statement.blade.php -->
@extends('layouts.app')

@section('title', __('management.statement') . ' - Balkan Gas Hub')
@section('description', __('management.statement_subtitle'))

@section('content')
    <!-- Page Header -->
    <section class="page-header">
        <div class="container">
            <nav class="breadcrumb" aria-label="Breadcrumb">
                <ol>
                    <li><a href="{{ route('home') }}">{{ __('breadcrumb.home') }}</a></li>
                    <li><a href="{{ route('about') }}">{{ __('nav.about') }}</a></li>
                    <li aria-current="page">{{ __('management.statement') }}</li>
                </ol>
            </nav>
            <h1 class="page-title">{{ __('management.statement') }}</h1>
            <p class="page-description">{{ __('management.statement_subtitle') }}</p>
        </div>
    </section>

    <!-- Management Statement Content -->
    <section class="content-section">
        <div class="container">
            <div class="content-wrapper">
                <!-- Statement Header -->
                <div class="statement-header">
                    <div class="statement-logo">
                        <img src="https://www.balkangashub.bg/imgs/logo_2.png" alt="Balkan Gas Hub Logo" class="statement-logo-img">
                    </div>
                    <div class="statement-title">
                        <h2 class="declaration-title">DECLARATION</h2>
                        <p class="declaration-subtitle">of BALKAN GAS HUB EAD Management</p>
                    </div>
                </div>

                <!-- Statement Subject -->
                <div class="statement-subject">
                    <p class="subject-label">SUBJECT:</p>
                    <h3 class="subject-title">INFORMATION SECURITY POLICY</h3>
                </div>

                <!-- Statement Body -->
                <div class="statement-body">
                    <p>BALKAN GAS HUB EAD maintains and operates an electronic platform, based on its own and leased infrastructure, that enables the conclusion of bilateral contracts and exchange-based trading with physical and non-physical products—natural gas, energy products, energy carriers, energy, green and white certificates, carbon emissions, and other products related to energy consumption.</p>

                    <p>Providing and maintaining reliable information solutions that meet the high demands of the company's clients is a key factor for the successful business operations of BALKAN GAS HUB EAD.</p>

                    <p>The electronic trading platform and its associated services offered by the company—including provision, operation, and maintenance of a specialized electronic platform for trading in energy and energy-related products (natural gas) through access to the platform; provision, maintenance, and administration of user access required for exchange trading—comply with all information security requirements.</p>

                    <p>Our objective and strategic goal is to meet the needs and expectations of our current and potential clients by delivering secure information services.</p>

                    <p>Recognizing the importance of information security and personal data protection, the management of BALKAN GAS HUB EAD is committed to:</p>

                    <ul class="commitment-list">
                        <li>Developing and maintaining information security policies and objectives aligned with the organization's development vision;</li>
                        <li>Creating the conditions for full and comprehensive integration of the Information Security Management System (ISMS) into the organization's operational processes;</li>
                        <li>Providing all necessary resources for the functioning, monitoring, review, maintenance, and continuous improvement of the ISMS, in accordance with the requirements of the international standard ISO 27001:2022;</li>
                        <li>Promoting the importance of effective management of the ISMS and compliance with its requirements by developing and implementing mechanisms to support and encourage employees to contribute to improving its effectiveness;</li>
                        <li>Affirming its leadership role in the continuous improvement of the ISMS within the organization.</li>
                    </ul>

                    <p>The Information Security Management System aims to ensure the protection of information in terms of:</p>

                    <div class="security-aspects">
                        <div class="security-aspect">
                            <h4 class="aspect-title">AVAILABILITY</h4>
                            <p class="aspect-description">Information processed and stored by BALKAN GAS HUB EAD and its associated assets must be available and accessible to authorized personnel whenever necessary.</p>
                        </div>

                        <div class="security-aspect">
                            <h4 class="aspect-title">INTEGRITY</h4>
                            <p class="aspect-description">BALKAN GAS HUB EAD ensures the protection of the integrity and completeness of the information it processes and stores, as well as of the methods used for its processing, in order to prevent intentional, accidental, partial, or complete destruction or unauthorized alteration of data, in both electronic and non-electronic form.</p>
                        </div>

                        <div class="security-aspect">
                            <h4 class="aspect-title">CONFIDENTIALITY</h4>
                            <p class="aspect-description">Information processed and stored by BALKAN GAS HUB EAD must only be provided or disclosed to authorized individuals.</p>
                        </div>
                    </div>

                    <p><strong>Protection of Personal Data and Individual Privacy</strong> - The company's personal data protection policy fully complies with the Personal Data Protection Act and the regulatory documents of the European Union (Regulation (EU) 2016/679 – General Data Protection Regulation, GDPR).</p>

                    <p>The management of BALKAN GAS HUB EAD declares its intent and responsibility to uphold the objectives and principles of information security and personal data protection in accordance with the organization's vision and business goals.</p>

                    <p>Identification and assessment of information security risks and their potential occurrence is carried out through a process-based approach, taking into account changes in security requirements, the risk environment, and priorities for risk treatment.</p>

                    <p>BALKAN GAS HUB EAD has established and approved risk acceptance criteria aligned with the nature of its operations, technical capabilities, regulatory requirements, and financial, social, and human factors.</p>

                    <p>Identified risks are treated by implementing appropriate control mechanisms in accordance with ISO 27001:2022 and its Annex A.</p>

                    <p>Legal requirements relevant to the Information Security Management System are determined in accordance with the Energy Act, Personal Data Protection Act, Cybersecurity Act, Electronic Document and Electronic Signature Act, Accounting Act, Classified Information Protection Act, Copyright and Related Rights Act, E-Commerce Act, Electronic Communications Act, Competition Protection Act, Disaster Protection Act, EU Regulations and Directives, and the international standard ISO 27001:2022.</p>

                    <p>To implement this Information Security Policy and ensure the operation of the ISMS at BALKAN GAS HUB EAD, an Information Security Management System Officer has been appointed, and an Information Security Council has been established.</p>

                    <p>All employees of BALKAN GAS HUB EAD are required to comply with all information security rules described in procedures, policies, instructions, and other documents from the ISMS.</p>

                    <p>This Information Security Policy states that disciplinary actions will be taken against individuals who violate its rules and provisions.</p>

                    <p>The current Information Security Policy will be reviewed regularly—at least once per year—or in the event of significant changes in the organizational environment, business circumstances, applicable legislation, or technical environment, to ensure its relevance, adequacy, and effectiveness.</p>

                    <p>This Information Security Policy is communicated to all employees of BALKAN GAS HUB EAD as well as to all interested parties.</p>
                </div>

                <!-- Statement Signature -->
                <div class="statement-signature">
                    <div class="signature-line">
                        <p class="signature-title">EXECUTIVE DIRECTOR OF BALKAN GAS HUB EAD</p>
                        <p class="signature-name">PETYA TODOROVA IVANOVA</p>
                    </div>
                    <div class="signature-date">
                        <p>Sofia, 19.03.2025</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
@endsection
```

### 10. Конфигурация на езиците

```php
// config/app.php
'available_locales' => [
    'bg' => 'Български',
    'en' => 'English',
],

// app/Http/Middleware/SetLocale.php
public function handle($request, Closure $next)
{
    $locale = $request->segment(1);
    
    if (in_array($locale, array_keys(config('app.available_locales')))) {
        app()->setLocale($locale);
    }
    
    return $next($request);
}
```

### 11. Routes

```php
// routes/web.php
Route::group(['prefix' => '{locale}', 'where' => ['locale' => 'bg|en']], function () {
    Route::get('/', [HomeController::class, 'index'])->name('home');
    
    // About routes
    Route::prefix('about')->name('about.')->group(function () {
        Route::get('/', [AboutController::class, 'index'])->name('index');
        Route::get('/management-statement', [AboutController::class, 'managementStatement'])->name('management');
        Route::get('/company', [AboutController::class, 'company'])->name('company');
        Route::get('/ownership', [AboutController::class, 'ownership'])->name('ownership');
        Route::get('/structure', [AboutController::class, 'structure'])->name('structure');
        Route::get('/reports', [AboutController::class, 'reports'])->name('reports');
        Route::get('/financial', [AboutController::class, 'financial'])->name('financial');
        Route::get('/links', [AboutController::class, 'links'])->name('links');
        Route::get('/data', [AboutController::class, 'data'])->name('data');
        Route::get('/conditions', [AboutController::class, 'conditions'])->name('conditions');
        Route::get('/contact', [AboutController::class, 'contact'])->name('contact');
    });
    
    // Products routes
    Route::prefix('products')->name('products.')->group(function () {
        Route::get('/', [ProductsController::class, 'index'])->name('index');
        Route::get('/fees', [ProductsController::class, 'fees'])->name('fees');
        Route::get('/balancing', [ProductsController::class, 'balancing'])->name('balancing');
        Route::get('/grp', [ProductsController::class, 'grp'])->name('grp');
        Route::get('/short', [ProductsController::class, 'short'])->name('short');
        Route::get('/long', [ProductsController::class, 'long'])->name('long');
        Route::get('/auction', [ProductsController::class, 'auction'])->name('auction');
        Route::get('/chiren', [ProductsController::class, 'chiren'])->name('chiren');
        Route::get('/igb', [ProductsController::class, 'igb'])->name('igb');
        Route::get('/ip', [ProductsController::class, 'ip'])->name('ip');
        Route::get('/galata', [ProductsController::class, 'galata'])->name('galata');
        Route::get('/rulebook', [ProductsController::class, 'rulebook'])->name('rulebook');
        Route::get('/api', [ProductsController::class, 'api'])->name('api');
    });
    
    // Membership routes
    Route::prefix('membership')->name('membership.')->group(function () {
        Route::get('/', [MembershipController::class, 'index'])->name('index');
        Route::get('/registration', [MembershipController::class, 'registration'])->name('registration');
        Route::get('/members', [MembershipController::class, 'members'])->name('members');
        Route::get('/remit', [MembershipController::class, 'remit'])->name('remit');
    });
    
    // News routes
    Route::prefix('news')->name('news.')->group(function () {
        Route::get('/', [NewsController::class, 'index'])->name('index');
        Route::get('/all', [NewsController::class, 'all'])->name('all');
        Route::get('/press', [NewsController::class, 'press'])->name('press');
        Route::get('/announcements', [NewsController::class, 'announcements'])->name('announcements');
        Route::get('/{news}', [NewsController::class, 'show'])->name('show');
    });
    
    // Surveillance routes
    Route::prefix('surveillance')->name('surveillance.')->group(function () {
        Route::get('/', [SurveillanceController::class, 'index'])->name('index');
        Route::get('/clearing', [SurveillanceController::class, 'clearing'])->name('clearing');
        Route::get('/documents', [SurveillanceController::class, 'documents'])->name('documents');
        Route::get('/procedure', [SurveillanceController::class, 'procedure'])->name('procedure');
    });
    
    // Auth routes
    Route::prefix('auth')->name('auth.')->group(function () {
        Route::post('/login', [AuthController::class, 'login'])->name('login');
        Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
        Route::post('/password/email', [AuthController::class, 'sendResetLinkEmail'])->name('password.email');
        Route::post('/password/reset', [AuthController::class, 'resetPassword'])->name('password.reset');
    });
});

// Redirect root to default locale
Route::get('/', function () {
    return redirect('/' . config('app.locale'));
});
```

### 12. Vite конфигурация

```javascript
// vite.config.js
import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.js'],
            refresh: true,
        }),
    ],
});
```

### 13. Адаптация на JavaScript

```javascript
// resources/js/app.js
// Заменете fetch заявките с Laravel routes
async function loadTranslations() {
    try {
        const response = await fetch(`/${currentLanguage}/api/translations`);
        translations[currentLanguage] = await response.json();
    } catch (error) {
        console.warn('Could not load translations, using fallback:', error);
        translations[currentLanguage] = getFallbackTranslations(currentLanguage);
    }
}

// Добавете CSRF token за AJAX заявки
function setLanguage(lang) {
    currentLanguage = lang;
    
    // Update via AJAX
    fetch(`/${lang}/api/set-language`, {
        method: 'POST',
        headers: {
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
            'Content-Type': 'application/json',
        },
    });
    
    // Update UI
    updateTranslations();
}

// Login form submission
function handleLoginSubmit() {
    const form = document.getElementById('login-form');
    const formData = new FormData(form);
    
    fetch('/auth/login', {
        method: 'POST',
        headers: {
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
        },
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            closeLoginModal();
            // Redirect or show success message
        } else {
            // Show error message
        }
    });
}

// Reset password form submission
function handleResetPasswordSubmit() {
    const form = document.getElementById('reset-password-form');
    const formData = new FormData(form);
    
    fetch('/auth/password/email', {
        method: 'POST',
        headers: {
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
        },
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            closeResetPasswordModal();
            // Show success message
        } else {
            // Show error message
        }
    });
}
```

## 🔄 Миграция на данните

### 1. Създаване на миграции

```bash
php artisan make:migration create_news_table
php artisan make:migration create_market_data_table
php artisan make:migration create_partners_table
php artisan make:migration create_users_table
```

### 2. Примерна миграция за новини

```php
// database/migrations/xxxx_create_news_table.php
public function up()
{
    Schema::create('news', function (Blueprint $table) {
        $table->id();
        $table->json('title');
        $table->json('excerpt');
        $table->json('content');
        $table->string('slug')->unique();
        $table->enum('type', ['news', 'press', 'announcement']);
        $table->boolean('is_published')->default(false);
        $table->timestamp('published_at')->nullable();
        $table->timestamps();
    });
}
```

### 3. Примерна миграция за потребители

```php
// database/migrations/xxxx_create_users_table.php
public function up()
{
    Schema::create('users', function (Blueprint $table) {
        $table->id();
        $table->string('name');
        $table->string('email')->unique();
        $table->timestamp('email_verified_at')->nullable();
        $table->string('password');
        $table->boolean('is_active')->default(true);
        $table->enum('role', ['admin', 'user', 'member'])->default('user');
        $table->rememberToken();
        $table->timestamps();
    });
}
```

## 🎨 Стилове и Assets

1. Копирайте `assets/css/styles.css` в `resources/css/app.css`
2. Копирайте `assets/js/app.js` в `resources/js/app.js`
3. Копирайте изображенията в `public/images/`
4. Обновете пътищата към изображенията с `{{ asset('images/...') }}`

## 🚀 Стартиране

```bash
# Инсталиране на зависимости
composer install
npm install

# Създаване на .env файл
cp .env.example .env
php artisan key:generate

# Миграция на базата данни
php artisan migrate

# Компилиране на assets
npm run dev

# Стартиране на сървъра
php artisan serve
```

## 📝 Допълнителни съображения

1. **SEO**: Използвайте `@section('meta')` за динамични meta тагове
2. **Кеширане**: Имплементирайте кеширане за навигацията и преводите
3. **Валидация**: Добавете валидация за формите
4. **Логване**: Имплементирайте логване за важни действия
5. **Тестване**: Създайте тестове за контролерите и моделите
6. **Автентикация**: Имплементирайте Laravel Breeze или Jetstream за автентикация

## 🔧 Оптимизации

1. **Lazy Loading**: Използвайте `loading="lazy"` за изображения
2. **Image Optimization**: Имплементирайте автоматично оптимизиране на изображения
3. **CDN**: Конфигурирайте CDN за статични файлове
4. **Caching**: Имплементирайте Redis кеширане
5. **Monitoring**: Добавете мониторинг с Laravel Telescope

## 🔐 Автентикация и сигурност

1. **CSRF Protection**: Всички форми трябва да включват CSRF token
2. **Password Reset**: Имплементирайте Laravel's built-in password reset
3. **Rate Limiting**: Добавете rate limiting за login и password reset
4. **Session Security**: Конфигурирайте сигурни session настройки
5. **Input Validation**: Валидирайте всички потребителски входове

Този подход осигурява плавна миграция от статичния HTML към пълнофункционално Laravel приложение, запазвайки всички функционалности и дизайн, включително новите login модали и management statement страница.
