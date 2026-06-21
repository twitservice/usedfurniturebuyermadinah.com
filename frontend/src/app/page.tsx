"use client";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Phone,
  MessageSquare,
  MapPin,
  Clock,
  CheckCircle,
  ChevronRight,
  Menu,
  X,
  ExternalLink,
  ShieldCheck,
  Send,
  Sparkles,
  Search,
  Grid,
  Languages,
  Copy,
  Mail,
  Smartphone
} from 'lucide-react';

// Import local translations
import enData from '../data/home-en.json';
import arData from '../data/home-arabic.json';

// Unsplash high-quality responsive CDN images for static product view
const PRODUCT_IMAGES: Record<string, string> = {
  "/assets/cooking_range.png": "/assets/cooking_range.png",
  "/assets/air_conditioner.png": "/assets/air_conditioner.png",
  "/assets/refrigerator.png": "/assets/refrigerator.png",
  "/assets/sofa_set.png": "/assets/sofa_set.png",
  "/assets/bedroom_set.png": "/assets/bedroom_set.png",
  "/madina/buy-furniture-from-madinah-50b20875-a17e-425a-ad7a-3f0c7259f65c.jpeg": "/madina/buy-furniture-from-madinah-50b20875-a17e-425a-ad7a-3f0c7259f65c.jpeg",
  "/assets/washing_machine.png": "/assets/washing_machine.png"
};

export default function App() {
  // Translate & Direction states (default: Arabic)
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const [activeView, setActiveView] = useState<'home' | 'products' | 'services' | 'how-it-works' | 'contact'>('home');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingMsg, setLoadingMsg] = useState<string>('');

  // Interactive UI states
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedNumber, setCopiedNumber] = useState<boolean>(false);
  const [showImoModal, setShowImoModal] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  // Form states for instant WhatsApp valuation
  const [sellerName, setSellerName] = useState<string>('');
  const [itemCategory, setItemCategory] = useState<string>('bedroom');
  const [itemCondition, setItemCondition] = useState<string>('Excellent');
  const [itemDescription, setItemDescription] = useState<string>('');
  const [sellerLocation, setSellerLocation] = useState<string>('');
  const [sellerPhone, setSellerPhone] = useState<string>('');

  const translations = (lang === 'ar' ? arData : enData) as any;

  // Listen to hash change to support direct URL simulation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (['products', 'services', 'how-it-works', 'contact'].includes(hash)) {
        triggerSimulatedReload(hash as any);
      } else {
        triggerSimulatedReload('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    // Initial check
    const initialHash = window.location.hash.replace('#', '');
    if (['products', 'services', 'how-it-works', 'contact'].includes(initialHash)) {
      setActiveView(initialHash as any);
    }

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Update document metadata direction on language change
  useEffect(() => {
    document.documentElement.dir = translations.dir;
    document.documentElement.lang = translations.lang;
  }, [lang, translations]);

  // Simulate premium location "loading refresh system" as requested
  const triggerSimulatedReload = (targetView: typeof activeView, newLang?: 'ar' | 'en') => {
    setIsLoading(true);
    setLoadingMsg(newLang
      ? (newLang === 'ar' ? (arData as any).loadingText : (enData as any).loadingText)
      : translations.loadingText
    );

    // Smooth scroll to top of page
    window.scrollTo({ top: 0, behavior: 'instant' });

    setTimeout(() => {
      if (newLang) {
        setLang(newLang);
      }
      setActiveView(targetView);
      window.location.hash = targetView === 'home' ? '' : `#${targetView}`;
      setIsLoading(false);
    }, 650);
  };

  // Switch Language directly
  const toggleLanguage = (selectedLang: 'ar' | 'en') => {
    if (lang !== selectedLang) {
      triggerSimulatedReload(activeView, selectedLang);
    }
  };

  // Copy telephone number function
  const copyNumberToClipboard = () => {
    navigator.clipboard.writeText('0579068424');
    setCopiedNumber(true);
    setTimeout(() => setCopiedNumber(false), 2500);
  };

  // Generate WhatsApp link dynamically with pre-filled text
  const getWhatsAppLink = (messageText: string) => {
    const encodedText = encodeURIComponent(messageText);
    return `https://wa.me/966579068424?text=${encodedText}`;
  };

  // Form submission handler: Converts inputs back into direct WhatsApp valuation message
  const handleValuationSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const categoryLabel = translations.categories.list.find(c => c.id === itemCategory)?.name || itemCategory;
    const arabicText = `مرحباً، أود الحصول على تسعير للأثاث المستعمل الخاص بي بالمدينة المنورة:
- الاسم: ${sellerName || 'غير محدد'}
- نوع الأثاث: ${categoryLabel}
- الحالة: ${itemCondition}
- الحي/المنطقة: ${sellerLocation || 'المدينة المنورة'}
- وصف الأغراض: ${itemDescription || 'لا يوجد'}
- رقم الجوال للتواصل: ${sellerPhone || '0579068424'}`;

    const englishText = `Hello, I would like to get a valuation for my used furniture in Madinah:
- Name: ${sellerName || 'Not specified'}
- Furniture Type: ${categoryLabel}
- Condition: ${itemCondition}
- Location/Area: ${sellerLocation || 'Madinah'}
- Description: ${itemDescription || 'No detailed description'}
- Contact Number: ${sellerPhone || '0579068424'}`;

    const finalMessage = lang === 'ar' ? arabicText : englishText;
    window.open(getWhatsAppLink(finalMessage), '_blank');
  };

  // Dynamic products filtering
  const filteredProducts = selectedCategory === 'all'
    ? translations.products
    : translations.products.filter(p => p.category === selectedCategory);

  return (
    <div id="app-root-container" className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 transition-all duration-300 antialiased selection:bg-blue-600 selection:text-white pb-safe">

      {/* Loading Refresh System Overlay */}
      {isLoading && (
        <div id="simulated-loader" className="fixed inset-0 bg-slate-900/90 z-50 flex flex-col items-center justify-center p-4 backdrop-blur-sm transition-all duration-300">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-6"></div>
          <p className="text-white text-lg font-bold tracking-wide animate-pulse text-center max-w-md">
            {loadingMsg}
          </p>
          <span className="text-xs text-slate-400 mt-2 tracking-widest uppercase">
            https://usedfurniturebuyermadinah.com
          </span>
        </div>
      )}

      {/* Primary Top Bar Info */}
      <div id="top-utility-bar" className="bg-slate-900 text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4 flex-wrap justify-center font-medium">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-blue-500" />
              {lang === 'ar' ? 'المدينة المنورة • تغطية شاملة' : 'Madinah Al-Munawwarah • All Neighborhoods'}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-green-500" />
              {translations.contact.workingHoursValue}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a href="mailto:Sabujhasan465@gmail.com" className="hover:text-white transition-colors duration-150 flex items-center gap-1 text-[11px]">
              <Mail className="w-3 h-3 text-blue-400" />
              Sabujhasan465@gmail.com
            </a>
            <span className="text-slate-600">|</span>
            <span className="text-[11px] font-bold text-yellow-500">
              {lang === 'ar' ? '★ دفع كاش فوري' : '★ Instant Cash Payment'}
            </span>
          </div>
        </div>
      </div>

      {/* Main Header / Navigation */}
      <header id="main-header" className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm backdrop-blur-md bg-white/95 transition-all duration-200">
        <div className="max-w-7xl mx-auto px-4 py-3.5 flex justify-between items-center">

          {/* Logo Brand Frame */}
          <div
            id="brand-logo-container"
            className="flex items-center gap-3 cursor-pointer select-none"
            onClick={() => triggerSimulatedReload('home')}
          >
            {/* Custom SVG logo with Minaret arches & Furniture Silhouette */}
            <div className="w-11 h-11 bg-gradient-to-tr from-blue-700 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold relative shadow-md">
              <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              {/* Medina Crescent overlay indicator */}
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center text-[8px] border border-white font-black">
                {lang === 'ar' ? 'م' : 'M'}
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <h1 className="text-base sm:text-lg font-black tracking-tight leading-none text-slate-800 uppercase font-sans">
                  {lang === 'ar' ? 'مشتري الأثاث المستعمل' : 'Used Furniture Buyer'}
                </h1>
              </div>
              <span className="text-[10px] sm:text-xs font-bold text-blue-600 tracking-wider">
                {lang === 'ar' ? 'المدينة المنورة • المدينة • Madinah' : 'MADINAH • المدينة المنورة'}
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav id="desktop-nav" className="hidden lg:flex items-center gap-1">
            <button
              id="nav-home"
              onClick={() => triggerSimulatedReload('home')}
              className={`px-3 py-2 text-sm font-bold rounded-md transition-all duration-150 ${activeView === 'home' ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}
            >
              {translations.nav.home}
            </button>
            <button
              id="nav-services"
              onClick={() => triggerSimulatedReload('services')}
              className={`px-3 py-2 text-sm font-bold rounded-md transition-all duration-150 ${activeView === 'services' ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}
            >
              {translations.nav.services}
            </button>
            <button
              id="nav-how"
              onClick={() => triggerSimulatedReload('how-it-works')}
              className={`px-3 py-2 text-sm font-bold rounded-md transition-all duration-150 ${activeView === 'how-it-works' ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}
            >
              {translations.nav.howItWorks}
            </button>
            <button
              id="nav-products"
              onClick={() => triggerSimulatedReload('products')}
              className={`px-3 py-2 text-sm font-bold rounded-md transition-all duration-150 ${activeView === 'products' ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}
            >
              {translations.nav.products}
            </button>
            <button
              id="nav-contact"
              onClick={() => triggerSimulatedReload('contact')}
              className={`px-3 py-2 text-sm font-bold rounded-md transition-all duration-150 ${activeView === 'contact' ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}
            >
              {translations.nav.contact}
            </button>
          </nav>

          {/* Quick Language Switch & Action Buttons */}
          <div id="header-actions" className="flex items-center gap-3">

            {/* Bilingual Switch Slider */}
            <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200">
              <button
                id="lang-ar-btn"
                onClick={() => toggleLanguage('ar')}
                className={`px-2.5 py-1 text-xs font-extrabold rounded-md transition-all ${lang === 'ar' ? 'bg-white text-slate-800 shadow-xs' : 'text-slate-500 hover:text-slate-800'}`}
              >
                عربي
              </button>
              <button
                id="lang-en-btn"
                onClick={() => toggleLanguage('en')}
                className={`px-2.5 py-1 text-xs font-extrabold rounded-md transition-all ${lang === 'en' ? 'bg-white text-slate-800 shadow-xs' : 'text-slate-500 hover:text-slate-800'}`}
              >
                EN
              </button>
            </div>

            {/* Direct Dial Header Link */}
            <a
              id="header-phone-action"
              href="tel:0579068424"
              className="hidden sm:flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-3.5 py-2 rounded-lg text-xs font-extrabold tracking-wide transition-colors duration-150 shadow-xs"
            >
              <Phone className="w-3.5 h-3.5 text-blue-400 animate-bounce" />
              <span>0579068424</span>
            </a>

            {/* Direct WhatsApp Call */}
            <a
              id="header-whatsapp-action"
              href={getWhatsAppLink(lang === 'ar' ? 'مرحبا، أرغب في بيع بعض الأثاث المستعمل بالمدينة المنورة.' : 'Hello, I want to sell used furniture in Madinah.')}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-3.5 py-2 rounded-lg text-xs font-extrabold transition-colors duration-150 shadow-xs"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'واتساب كاش' : 'WhatsApp Cash'}</span>
            </a>

            {/* Mobile Hamburger menu */}
            <button
              id="mobile-hamburger"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 lg:hidden text-slate-700 hover:bg-slate-100 rounded-lg"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div id="mobile-nav-panel" className="lg:hidden bg-white border-t border-slate-200 py-3 px-4 shadow-lg flex flex-col gap-2">
            <button
              id="mob-nav-home"
              onClick={() => { setMobileMenuOpen(false); triggerSimulatedReload('home'); }}
              className={`w-full text-start px-3 py-2.5 text-sm font-bold rounded-lg ${activeView === 'home' ? 'bg-blue-50 text-blue-700' : 'text-slate-700 hover:bg-slate-50'}`}
            >
              {translations.nav.home}
            </button>
            <button
              id="mob-nav-services"
              onClick={() => { setMobileMenuOpen(false); triggerSimulatedReload('services'); }}
              className={`w-full text-start px-3 py-2.5 text-sm font-bold rounded-lg ${activeView === 'services' ? 'bg-blue-50 text-blue-700' : 'text-slate-700 hover:bg-slate-50'}`}
            >
              {translations.nav.services}
            </button>
            <button
              id="mob-nav-how"
              onClick={() => { setMobileMenuOpen(false); triggerSimulatedReload('how-it-works'); }}
              className={`w-full text-start px-3 py-2.5 text-sm font-bold rounded-lg ${activeView === 'how-it-works' ? 'bg-blue-50 text-blue-700' : 'text-slate-700 hover:bg-slate-50'}`}
            >
              {translations.nav.howItWorks}
            </button>
            <button
              id="mob-nav-products"
              onClick={() => { setMobileMenuOpen(false); triggerSimulatedReload('products'); }}
              className={`w-full text-start px-3 py-2.5 text-sm font-bold rounded-lg ${activeView === 'products' ? 'bg-blue-50 text-blue-700' : 'text-slate-700 hover:bg-slate-50'}`}
            >
              {translations.nav.products}
            </button>
            <button
              id="mob-nav-contact"
              onClick={() => { setMobileMenuOpen(false); triggerSimulatedReload('contact'); }}
              className={`w-full text-start px-3 py-2.5 text-sm font-bold rounded-lg ${activeView === 'contact' ? 'bg-blue-50 text-blue-700' : 'text-slate-700 hover:bg-slate-50'}`}
            >
              {translations.nav.contact}
            </button>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
              <a
                href="tel:0579068424"
                className="flex items-center justify-center gap-1 bg-slate-900 text-white py-2 rounded-lg text-xs font-bold"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>0579068424</span>
              </a>
              <a
                href={getWhatsAppLink(lang === 'ar' ? 'مرحبا، أود بيع أثاثي المستعمل.' : 'Hi, I want to sell my used items.')}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1 bg-green-600 text-white py-2 rounded-lg text-xs font-bold"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>واتساب كاش</span>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* VIEW 1: HOME */}
      {activeView === 'home' && (
        <main id="home-view-container" className="flex-1">

          {/* Slogan Banner */}
          <div id="alert-slogan-bar" className="bg-yellow-50 text-yellow-950 px-4 py-2 text-center text-xs font-black border-b border-yellow-200">
            {translations.companySlogan}
          </div>

          {/* Hero Section (Based on High Density specs & Arabic preferences) */}
          <section id="hero-section" className="max-w-7xl mx-auto px-4 py-8 lg:py-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white border border-slate-200 rounded-2xl p-5 sm:p-8 lg:p-10 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 rounded-full blur-3xl opacity-50 -z-10"></div>

              <div className="lg:col-span-7 flex flex-col items-start text-start">
                <span id="hero-badge" className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full mb-4 uppercase tracking-wider border border-blue-100">
                  <Sparkles className="w-3 h-3 text-blue-600 animate-spin" />
                  {translations.hero.badge}
                </span>

                <h2 id="hero-title" className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-3 leading-tight tracking-tight">
                  {translations.hero.title} <span className="text-blue-600">{translations.hero.highlight}</span>
                </h2>

                <p id="hero-desc" className="text-slate-600 text-sm sm:text-base mb-6 sm:mb-8 leading-relaxed font-normal">
                  {translations.hero.description}
                </p>

                {/* Direct Action Hub */}
                <div id="hero-buttons-container" className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                  <a
                    id="hero-call-cta"
                    href="tel:0579068424"
                    className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-3.5 rounded-xl font-black text-sm text-center flex items-center justify-center gap-2 transition-all shadow-md hover:scale-[1.01]"
                  >
                    <Phone className="w-4 h-4 text-emerald-400" />
                    {translations.hero.ctaCall}
                  </a>
                  <a
                    id="hero-whatsapp-cta"
                    href={getWhatsAppLink(lang === 'ar' ? 'السلام عليكم، عندي أثاث مستعمل بالمدينة المنورة وأرغب في بيعه. أرجو تسعيره.' : 'Hello, I have used furniture in Madinah that I want to sell.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-600 hover:bg-green-500 text-white px-6 py-3.5 rounded-xl font-black text-sm text-center flex items-center justify-center gap-2 transition-all shadow-md hover:scale-[1.01]"
                  >
                    <MessageSquare className="w-4 h-4" />
                    {translations.hero.ctaWhatsapp}
                  </a>
                  <button
                    id="hero-imo-cta"
                    onClick={() => setShowImoModal(true)}
                    className="bg-blue-500 hover:bg-blue-400 text-white px-6 py-3.5 rounded-xl font-black text-sm text-center flex items-center justify-center gap-2 transition-all shadow-md hover:scale-[1.01]"
                  >
                    <Smartphone className="w-4 h-4" />
                    <span>{lang === 'ar' ? 'تواصل عبر إيمو (IMO)' : 'IMO Service'}</span>
                  </button>
                </div>

                {/* Quick Trust Statistics (High Density) */}
                <div id="hero-stats" className="grid grid-cols-3 gap-3 border-t border-slate-100 pt-6 mt-8 w-full">
                  {translations.hero.stats.map((stat, idx) => (
                    <div key={idx} className="bg-slate-50 p-3 rounded-xl border border-slate-150 flex flex-col justify-center text-center">
                      <span className="text-lg sm:text-xl font-black text-blue-600">{stat.value}</span>
                      <span className="text-[10px] sm:text-xs text-slate-500 font-bold">{stat.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cover Illustration & Local Mosque Minarets / Living Room Badge Collage */}
              <div id="hero-graphic" className="lg:col-span-5 h-full min-h-[240px] bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl relative flex flex-col items-center justify-center text-slate-500 overflow-hidden border border-slate-200">
                <img
                  src="/madina/buy-furniture-from-madinah-50b20875-a17e-425a-ad7a-3f0c7259f65c.jpeg"
                  alt="Furniture Showroom Madinah"
                  className="absolute inset-0 w-full h-full object-cover brightness-[0.95]"
                  loading="eager"
                />

                {/* Visual Label overlay */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 via-slate-900/60 to-transparent p-4 flex flex-col text-white">
                  <span className="text-xs font-black text-amber-400 uppercase tracking-wide">
                    {lang === 'ar' ? 'صالة الأثاث المستعمل والخدمة' : 'Used Furniture Trading Showcase'}
                  </span>
                  <span className="text-[10px] opacity-90 font-medium">
                    {lang === 'ar' ? 'الخدمة الأسرع في المدينة المنورة نقل مجاني فوري' : 'Fast pickup & transport in all districts of Madinah'}
                  </span>
                </div>

                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-[10px] font-black text-slate-800 px-2.5 py-1 rounded-full shadow-lg flex items-center gap-1.5 border border-slate-200">
                  <CheckCircle className="w-3.5 h-3.5 text-green-600" />
                  <span>{lang === 'ar' ? 'نشط بالمدينة الآن' : 'Active in Madinah Now'}</span>
                </div>
              </div>
            </div>
          </section>

          {/* Core Categories Section */}
          <section id="categories-grid-section" className="bg-white py-12 border-y border-slate-200">
            <div className="max-w-7xl mx-auto px-4">
              <div className="text-center max-w-2xl mx-auto mb-10">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block mb-1">
                  {lang === 'ar' ? 'دليل الشراء والتداول' : 'Our Professional Range'}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                  {translations.categories.title}
                </h3>
                <p className="text-sm text-slate-500 mt-1.5">
                  {translations.categories.subtitle}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {translations.categories.list.map((cat) => (
                  <div
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      triggerSimulatedReload('products');
                    }}
                    className="p-5 border border-slate-200 rounded-xl hover:border-blue-500 hover:shadow-md transition-all duration-200 bg-slate-50 cursor-pointer group hover:scale-[1.01]"
                  >
                    <div className="w-10 h-10 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center font-bold mb-4 group-hover:bg-blue-600 group-hover:text-white transition-all text-sm uppercase">
                      {cat.id.substring(0, 3)}
                    </div>
                    <h4 className="font-bold text-base text-slate-900 mb-1 flex items-center gap-2">
                      {cat.name}
                      <ChevronRight className={`w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-all ${lang === 'ar' ? 'rotate-180' : ''}`} />
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed font-normal">
                      {cat.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Interactive Direct Communication Hub Section (No Forms, Pure Instant Contact as Requested) */}
          <section id="valuation-direct-hub-section" className="max-w-7xl mx-auto px-4 py-12">
            <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl -z-10"></div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

                {/* Left explanation block */}
                <div className="lg:col-span-5 flex flex-col justify-between text-start">
                  <div>
                    <span className="text-amber-400 text-xs font-extrabold uppercase tracking-widest block mb-2">
                      {lang === 'ar' ? 'تواصل مباشر وسريع' : 'Direct Instant Channels'}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black mb-4 leading-tight">
                      {lang === 'ar' ? 'لا حاجة لملء نماذج - تواصل مباشر فوري!' : 'No Forms Required - Connect Instantly!'}
                    </h3>
                    <p className="text-slate-300 text-sm mb-6 leading-relaxed font-normal">
                      {lang === 'ar'
                        ? 'احصل على تثمين فوري مجاني لأثاثك وأجهزتك المستعملة بالمدينة المنورة دون أي تعقيد. اختر وسيلة التواصل المفضلة لديك بالأسفل لإرسال الصور أو التحدث للمندوب مباشرة.'
                        : 'Get a free, instant and fair cash estimation for your secondhand furniture and home electronics with absolute ease. Choose your preferred digital platform below to call or send photos.'}
                    </p>

                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-xs shrink-0">✓</div>
                        <span className="text-xs font-bold text-slate-100">
                          {lang === 'ar' ? 'تسعير مباشر وآمن خلال دقيقتين' : 'Direct fair estimates over chat'}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-xs shrink-0">✓</div>
                        <span className="text-xs font-bold text-slate-100">
                          {lang === 'ar' ? 'فك وتحميل مجاني بأيدي نجارين مختصين' : '100% Free towing & disassembly'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Physical Address Showcase */}
                  <div className="mt-8 pt-6 border-t border-slate-800 flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">
                        {lang === 'ar' ? 'عنوان مقرنا الرئيسي للمعاينة:' : 'Our main physical location:'}
                      </span>
                      <p className="text-xs font-bold text-slate-100 leading-normal">
                        {lang === 'ar' ? 'حي الصديقية، المدينة المنورة، المملكة العربية السعودية (As Sadiqiyyah, Madinah)' : 'As Sadiqiyyah, Madinah, Saudi Arabia'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Interactive Action buttons (WhatsApp, IMO, Direct Phone) */}
                <div className="lg:col-span-7 bg-white/5 backdrop-blur-xs p-5 sm:p-8 rounded-2xl border border-white/10 flex flex-col gap-4">
                  <h4 className="text-sm font-extrabold text-slate-200 mb-2 text-start">
                    {lang === 'ar' ? 'انقر على أي خيار للتواصل الفوري السلس:' : 'Click any option to connect with MD Sabuj Miah instantly:'}
                  </h4>

                  {/* Channel 1: WhatsApp */}
                  <a
                    id="hub-whatsapp-direct"
                    href={getWhatsAppLink(lang === 'ar' ? 'مرحبا، أريد بيع بعض قطع الأثاث المستعمل بالمدينة المنورة وحي الصديقية.' : 'Hello, I want to sell used furniture in Madinah, near As Sadiqiyyah.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 bg-green-600/90 hover:bg-green-600 rounded-xl transition-all border border-green-500 text-white group"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 bg-white/15 rounded-lg flex items-center justify-center font-bold">
                        <MessageSquare className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-start">
                        <span className="font-extrabold text-sm block">
                          {lang === 'ar' ? 'تواصل موثوق عبر تطبيق الواتساب' : 'Bilingual WhatsApp Chat'}
                        </span>
                        <span className="text-[11px] text-green-100 block mt-0.5">
                          {lang === 'ar' ? 'أرسل صور أثاثك وغرفك للحصول على عرض فوري عاجل' : 'Fast and easy way to send photos of your rooms & appliances'}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 text-white shrink-0 transition-transform group-hover:translate-x-1 ${lang === 'ar' ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
                  </a>

                  {/* Channel 2: IMO Messenger */}
                  <button
                    id="hub-imo-direct"
                    onClick={() => setShowImoModal(true)}
                    className="flex items-center justify-between p-4 bg-blue-600 hover:bg-blue-500 rounded-xl transition-all border border-blue-500 text-white group w-full text-start cursor-pointer"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 bg-white/15 rounded-lg flex items-center justify-center font-bold">
                        <Smartphone className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <span className="font-extrabold text-sm block">
                          {lang === 'ar' ? 'تواصل عبر تطبيق إيمو (IMO)' : 'IMO Call & Message Service'}
                        </span>
                        <span className="text-[11px] text-blue-100 block mt-0.5">
                          {lang === 'ar' ? 'تحدث معنا على إيمو مجاناً أو انسخ رقم الهاتف مباشرة للتواصل' : 'Free voice calling, lookup handle, or instantly duplicate local cell phone'}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 text-white shrink-0 transition-transform group-hover:translate-x-1 ${lang === 'ar' ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
                  </button>

                  {/* Channel 3: Direct Phone Call */}
                  <a
                    id="hub-phone-direct"
                    href="tel:0579068424"
                    className="flex items-center justify-between p-4 bg-slate-800 hover:bg-slate-700 rounded-xl transition-all border border-slate-700 text-white group"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 bg-white/15 rounded-lg flex items-center justify-center font-bold">
                        <Phone className="w-5 h-5 text-emerald-400 animate-pulse" />
                      </div>
                      <div className="text-start">
                        <span className="font-extrabold text-sm block">
                          {lang === 'ar' ? 'اتصال هاتفي خلوي فوري' : 'Direct Regular Cellular Hotline'}
                        </span>
                        <span className="text-[11px] text-slate-300 block mt-0.5">
                          0579068424 - {lang === 'ar' ? 'متواجدون للرد المباشر بجميع أحياء ومناطق المدينة' : 'Cellular service operational 24/7 for zero delay callbacks'}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 text-white shrink-0 transition-transform group-hover:translate-x-1 ${lang === 'ar' ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
                  </a>

                  <p className="text-[10px] text-slate-400 text-center leading-relaxed mt-2 font-normal">
                    {lang === 'ar'
                      ? 'جميع القنوات نشطة ومتاحة ٢٤ ساعة طوال أيام الأسبوع لخدمتك بالمدينة المنورة'
                      : 'All channels are active 24/7 for your direct assistance inside the holy city of Madinah.'}
                  </p>
                </div>

              </div>
            </div>
          </section>

          {/* How It Works Section */}
          <section id="how-it-works-highlight" className="bg-slate-100 py-12 border-t border-slate-250">
            <div className="max-w-7xl mx-auto px-4">
              <div className="text-center max-w-2xl mx-auto mb-10">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block mb-1">
                  {lang === 'ar' ? 'طريقة فك ونقل وضمان الكاش' : 'Transaction Protocol'}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                  {translations.howItWorks.title}
                </h3>
                <p className="text-sm text-slate-500 mt-1.5">
                  {translations.howItWorks.subtitle}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {translations.howItWorks.steps.map((step) => (
                  <div key={step.num} className="bg-white p-6 border border-slate-200 rounded-xl relative shadow-xs">
                    <span className="absolute top-4 right-4 w-10 h-10 bg-blue-50 text-blue-800 rounded-full flex items-center justify-center font-black text-base border border-blue-100">
                      {step.num}
                    </span>
                    <h4 className="font-extrabold text-base mb-2 text-slate-800 pt-6 pr-6">
                      {step.title}
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed font-normal">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Neighborhoods Area Map Grid */}
          <section id="neighborhoods-section" className="bg-white py-12 border-t border-slate-200">
            <div className="max-w-7xl mx-auto px-4">
              <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 relative overflow-hidden border border-slate-800">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  <div className="lg:col-span-7">
                    <h3 className="text-xl sm:text-2xl font-black text-amber-400 mb-2">
                      {lang === 'ar' ? 'نغطي كافة أحياء المدينة المنورة ومحافظاتها' : 'We Reach All Districts & Towns in Madinah'}
                    </h3>
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
                      {lang === 'ar'
                        ? 'أينما كنت في المدينة المنورة، يصلك طاقم سيارات النقل الخاص بنا والنجارين في غضون 30 دقيقة للمعاينة المجانية وشراء الأثاث بالكامل.'
                        : 'Wherever you are located inside the holy city of Madinah, our trucks and dismantling experts arrive at your doorstep in under 30 minutes.'}
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-slate-200 text-xs font-bold">
                      <span className="flex items-center gap-1.5 text-slate-300">
                        <MapPin className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                        {lang === 'ar' ? 'حي العزيزية' : 'Al-Aziziyah'}
                      </span>
                      <span className="flex items-center gap-1.5 text-slate-300">
                        <MapPin className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                        {lang === 'ar' ? 'حي سلطانة' : 'Sultana'}
                      </span>
                      <span className="flex items-center gap-1.5 text-slate-300">
                        <MapPin className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                        {lang === 'ar' ? 'حي الأزهري' : 'Al-Azhari'}
                      </span>
                      <span className="flex items-center gap-1.5 text-slate-300">
                        <MapPin className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                        {lang === 'ar' ? 'حي العريض' : 'Al-Areed'}
                      </span>
                      <span className="flex items-center gap-1.5 text-slate-300">
                        <MapPin className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                        {lang === 'ar' ? 'القبليين' : 'Al-Qiblatayn'}
                      </span>
                      <span className="flex items-center gap-1.5 text-slate-300">
                        <MapPin className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                        {lang === 'ar' ? 'الدويخة' : 'Al-Dowikha'}
                      </span>
                      <span className="flex items-center gap-1.5 text-slate-300">
                        <MapPin className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                        {lang === 'ar' ? 'حي الهدا' : 'Al-Hada'}
                      </span>
                      <span className="flex items-center gap-1.5 text-slate-300">
                        <MapPin className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                        {lang === 'ar' ? 'القبلتين وبقية الأحياء' : 'And all other areas'}
                      </span>
                    </div>
                  </div>

                  <div className="lg:col-span-5 flex flex-col items-center sm:items-start lg:items-end justify-center bg-slate-800 p-4 rounded-xl border border-slate-700">
                    <span className="text-[10px] text-blue-400 font-extrabold uppercase tracking-wide block mb-1">
                      {lang === 'ar' ? 'تحتاج فك مكيفات ومطابخ ونقل؟' : 'Need AC/Kitchen Dismantled Today?'}
                    </span>
                    <span className="text-xs text-white block mb-3 text-center sm:text-start lg:text-end">
                      {lang === 'ar' ? 'لدينا نجارون محترفون للتعامل مع المطابخ الصعبة وغرف ايكيا مجاناً.' : 'Experienced team for custom luxury kitchen cabinetry dismantling.'}
                    </span>
                    <a href="tel:0579068424" className="w-full sm:w-auto bg-green-600 hover:bg-green-500 text-white font-extrabold text-xs px-4 py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all">
                      <Phone className="w-3.5 h-3.5 text-amber-300" />
                      <span>{lang === 'ar' ? 'اتصل للفك الفوري: 0579068424' : 'Call Dispatch: 0579068424'}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </main>
      )}

      {/* VIEW 2: PRODUCTS STOCK */}
      {activeView === 'products' && (
        <main id="products-view-container" className="flex-1 max-w-7xl mx-auto px-4 py-8">

          {/* Section Heading */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4 pb-6 border-b border-slate-200">
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block mb-1">
                {lang === 'ar' ? 'أثاث وأجهزة مجددة ومضمونة بنظافة عالية' : 'Browse Verified Premium Inventory'}
              </span>
              <h2 className="text-3xl font-black text-slate-900 flex items-center gap-2">
                <Grid className="w-6 h-6 text-blue-600" />
                {translations.productsSection.title}
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                {translations.productsSection.subtitle}
              </p>
            </div>

            {/* Quick Category Tab Sorter (High Density) */}
            <div id="category-sorter" className="flex flex-wrap gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${selectedCategory === 'all' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-950'}`}
              >
                {lang === 'ar' ? 'الكل' : 'All Items'}
              </button>
              {translations.categories.list.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${selectedCategory === cat.id ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-950'}`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Grid Layout of Handled / Secondary Items */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredProducts.map((prod) => (
              <div
                key={prod.id}
                className="bg-white p-3 border border-slate-200 rounded-xl shadow-xs flex flex-col justify-between hover:scale-[1.01] hover:border-slate-350 transition-all cursor-pointer group"
                onClick={() => setSelectedProduct(prod)}
              >
                <div>
                  <div className="aspect-video bg-slate-100 rounded-lg mb-3 relative overflow-hidden border border-slate-150">
                    <img
                      src={PRODUCT_IMAGES[prod.image] || "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=600&q=80"}
                      alt={prod.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur-xs text-[9px] font-black text-amber-400 px-2.5 py-0.5 rounded-full">
                      {prod.condition}
                    </div>
                  </div>

                  <div className="flex justify-between items-start gap-1">
                    <h3 className="font-extrabold text-sm sm:text-base text-slate-800 leading-snug group-hover:text-blue-600 transition-colors">
                      {prod.title}
                    </h3>
                  </div>

                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {prod.specs}
                  </p>

                  <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                    {prod.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[9px] text-slate-400 uppercase tracking-wider block font-bold">
                      {translations.productsSection.priceLabel}
                    </span>
                    <span className="text-blue-600 font-black text-base">
                      {prod.price}
                    </span>
                  </div>

                  <span className="text-xs font-black text-blue-600 bg-blue-50 py-1 px-3 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-all">
                    {lang === 'ar' ? 'عرض تفاصيل' : 'View Details'}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Informational Notice (High Density style rules applied) */}
          <div className="mt-12 bg-blue-50/50 rounded-xl p-5 border border-blue-150 text-slate-700">
            <h4 className="font-extrabold text-sm text-blue-900 mb-1">
              {lang === 'ar' ? 'هل تملك أثاثاً مماثلاً وتريد بيعه فوراً؟' : 'Have similar furniture items to clear out?'}
            </h4>
            <p className="text-xs leading-relaxed text-slate-600 font-normal">
              {lang === 'ar'
                ? 'الصور أعلاه توضح قطعاً حقيقية قمنا بمعاينتها وشرائها من عملائنا بالمدينة المنورة. إذا كان ليدك أشياء مماثلة، أرسل صورها مباشرة عبر الواتساب وسنقوم بإرسال النجار الفني لشرائها وتحميلها بأسعار تفوق توقعاتك!'
                : 'The items listed show secondary equipment and premium wooden furniture sets we handle. If you want to sell similar materials, simply click the dispatch team button on the header to trade them in.'}
            </p>
          </div>

        </main>
      )}

      {/* VIEW 3: WHAT WE BUY / SERVICES */}
      {activeView === 'services' && (
        <main id="services-view-container" className="flex-1 max-w-7xl mx-auto px-4 py-8">

          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block mb-1">
              {lang === 'ar' ? 'تفاصيل أنواع المقتنيات المقبولة' : 'Acceptance Spectrum'}
            </span>
            <h2 className="text-3xl font-black text-slate-900">
              {lang === 'ar' ? 'الأثاث والأجهزة التي نقوم بشرائها وتداولها' : 'Items We Purchase at Premium Value'}
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              {lang === 'ar'
                ? 'نحن متخصصون في تداول كافة الأثاث المنزلي والديكور الخشبي والمعدني والأجهزة المنزلية الحديثة بالمدينة المنورة.'
                : 'We buy and dismantle residential and corporate inventory with top value guarantee in Madinah.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Service card 1 */}
            <div className="bg-white p-6 border border-slate-200 rounded-xl shadow-xs flex flex-col md:flex-row gap-6 hover:border-slate-350 transition-all">
              <div className="w-full md:w-36 h-36 bg-slate-100 rounded-lg overflow-hidden shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=400&q=80"
                  alt="Bedrooms"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-extrabold text-lg text-slate-900 mb-2">
                  {lang === 'ar' ? 'شراء غرف النوم والدواليب الخشبية' : 'Complete Bedrooms & Wardrobes'}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed font-normal mb-3">
                  {lang === 'ar'
                    ? 'نشتري غرف نوم ايكيا، غرف النوم الكلاسيك والتركي والصيني، المراتب الطبية، ودواليب الملابس بكافة مقاساتها. نجارونا المحترفون يقومون بالفك والتحميل السريع.'
                    : 'We purchase Ikea, Turkish, Classic & Chinese bedrooms including wardrobes, medical mattresses, and vanity drawers. Carpentry disassembly is on us.'}
                </p>
                <a href="tel:0579068424" className="text-xs font-extrabold text-blue-600 inline-flex items-center gap-1 hover:underline">
                  {lang === 'ar' ? 'اطلب تسعير غرفة نوم' : 'Quote Bedroom Set'} &rarr;
                </a>
              </div>
            </div>

            {/* Service card 2 */}
            <div className="bg-white p-6 border border-slate-200 rounded-xl shadow-xs flex flex-col md:flex-row gap-6 hover:border-slate-350 transition-all">
              <div className="w-full md:w-36 h-36 bg-slate-100 rounded-lg overflow-hidden shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=400&q=80"
                  alt="Sofas"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-extrabold text-lg text-slate-900 mb-2">
                  {lang === 'ar' ? 'شراء لو كنب، مجالس انتريه وصالونات' : 'Living Rooms, Sofas & Majlis'}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed font-normal mb-3">
                  {lang === 'ar'
                    ? 'نشتري الكنب الفاخر، صالونات الجلوس الكلاسيك والمودرن، أطقم المجالس العربية الأرضية والمرتفعة، السجاد النظيف والستائر والطاولات المتناسقة.'
                    : 'We buy high-end sofas, L-shapes corners, modern salon couches, full classical Arabic sitting arrangements, clean carpets, and coffee tables.'}
                </p>
                <a href="tel:0579068424" className="text-xs font-extrabold text-blue-600 inline-flex items-center gap-1 hover:underline">
                  {lang === 'ar' ? 'اطلب تسعير كنب ومجالس' : 'Quote Majlis/Sofas'} &rarr;
                </a>
              </div>
            </div>

            {/* Service card 3 */}
            <div className="bg-white p-6 border border-slate-200 rounded-xl shadow-xs flex flex-col md:flex-row gap-6 hover:border-slate-350 transition-all">
              <div className="w-full md:w-36 h-36 bg-slate-100 rounded-lg overflow-hidden shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1621905252507-b354bc25edac?auto=format&fit=crop&w=400&q=80"
                  alt="Electronics"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-extrabold text-lg text-slate-900 mb-2">
                  {lang === 'ar' ? 'شراء كافة الأجهزة الكهربائية المنزلية' : 'Electronics & Appliances'}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed font-normal mb-3">
                  {lang === 'ar'
                    ? 'شراء ثلاجات مستعملة بكافة المقاسات، غسالات حوضين وتوماتيك كامل، أفران غاز ذات ٤ و ٥ عيون، مكيفات سبليت وشباك تبريد متميز، شاشات وجاشات تلفاز.'
                    : 'We pay top value for double door refrigerators, washers, dryers, cooking ranges, window/split AC units, LED screens, and other home goods.'}
                </p>
                <a href="tel:0579068424" className="text-xs font-extrabold text-blue-600 inline-flex items-center gap-1 hover:underline">
                  {lang === 'ar' ? 'اطلب تسعير أجهزة' : 'Quote Home Appliances'} &rarr;
                </a>
              </div>
            </div>

            {/* Service card 4 */}
            <div className="bg-white p-6 border border-slate-200 rounded-xl shadow-xs flex flex-col md:flex-row gap-6 hover:border-slate-350 transition-all">
              <div className="w-full md:w-36 h-36 bg-slate-100 rounded-lg overflow-hidden shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=400&q=80"
                  alt="Kitchens"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-extrabold text-lg text-slate-900 mb-2">
                  {lang === 'ar' ? 'شراء وفك المطابخ المستعملة ألمنيوم وخشب' : 'Kitchen Cabinets & Fittings'}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed font-normal mb-3">
                  {lang === 'ar'
                    ? 'نشتري المطابخ الألمنيوم، كاونترات ستانلس ستيل، مطابخ خشبية فاخرة. نقوم بالفك والتحميل المجاني وإعادة التدوير بأسعار عادلة.'
                    : 'We buy custom commercial and residential aluminium kitchens, modular cabinetry sets, and countertops with premium prices paid.'}
                </p>
                <a href="tel:0579068424" className="text-xs font-extrabold text-blue-600 inline-flex items-center gap-1 hover:underline">
                  {lang === 'ar' ? 'اطلب تسعير مطابخ' : 'Quote Kitchen Cabinets'} &rarr;
                </a>
              </div>
            </div>

          </div>

          {/* Quick Notice Banner on Pricing Rules */}
          <div className="mt-10 bg-slate-900 text-white rounded-xl p-6 border border-slate-800 text-center">
            <h4 className="text-amber-400 font-extrabold text-base mb-1">
              {lang === 'ar' ? 'سياسة تسعير عادل وأعلى تقدير باليد كاش' : 'Realistic Valuation Standards'}
            </h4>
            <p className="text-xs text-slate-300 max-w-3xl mx-auto leading-relaxed">
              {lang === 'ar'
                ? 'فريق معاينة الأثاث لدينا يتمتع بأخلاقيات عمل عالية وتقدير حقيقي للأثاث الفاخر. لسنا مجرد خردة؛ إننا نعطي القطع النظيفة قيمتها الفعلية في السوق.'
                : 'We evaluate carefully according to structural integrity, brand value, and cosmetic condition. Clean items always fetch highest prices with immediate transport provided.'}
            </p>
          </div>

        </main>
      )}

      {/* VIEW 4: HOW IT WORKS PAGE */}
      {activeView === 'how-it-works' && (
        <main id="how-it-works-view-container" className="flex-1 max-w-7xl mx-auto px-4 py-8">

          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block mb-1">
              {lang === 'ar' ? 'الشفافية هي شعار مبيعاتنا' : 'Dismantling Protocol & Guarantee'}
            </span>
            <h2 className="text-3xl font-black text-slate-900">
              {translations.howItWorks.title}
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              {translations.howItWorks.subtitle}
            </p>
          </div>

          <div className="max-w-4xl mx-auto flex flex-col gap-8 relative mt-6">

            {/* Absolute timeline line decoration */}
            <div className={`hidden md:block absolute top-8 bottom-8 w-1 bg-blue-100 ${lang === 'ar' ? 'right-12' : 'left-12'}`}></div>

            {translations.howItWorks.steps.map((step, index) => (
              <div
                key={step.num}
                className={`flex flex-col md:flex-row gap-6 relative items-start ${lang === 'ar' ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Visual Step bubble item */}
                <div className="w-10 sm:w-12 h-10 sm:h-12 bg-blue-600 border-4 border-slate-50 rounded-full flex items-center justify-center font-black text-white text-base z-10 shrink-0 md:mx-6 shadow-sm">
                  {step.num}
                </div>

                <div className="bg-white p-6 border border-slate-200 rounded-xl shadow-xs flex-1">
                  <h3 className="font-extrabold text-base sm:text-lg text-blue-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}

          </div>

          {/* Detailed trust points (High Density style) */}
          <div className="max-w-4xl mx-auto mt-12 bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-slate-900">{lang === 'ar' ? 'لا توجد خصومات مخفية' : 'Zero Transport Deductions'}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed mt-0.5">
                    {lang === 'ar' ? 'السعر المتفق عليه هو السعر الفعلي الذي سنقوم بتسليمه لك. لا نخصم رسوم سيارات نقل أو فك دواليب.' : 'The price agreed over WhatsApp is what we hand you in physical bills. No loading, driving, or helper fees are ever subtracted.'}
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-slate-900">{lang === 'ar' ? 'أمان وسرية تامة لمعلوماتك' : 'Secure & Confidential Handling'}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed mt-0.5">
                    {lang === 'ar' ? 'نحترم خصوصية منزلك وعائلتك. عمالنا يتميزون بالأمانة والأخلاق ومستوى مهني رفيع يليق بالمدينة المنورة.' : 'We operate with ultimate respect for your domestic privacy. Our moving crew values clear, safe, and moral code of conduct inside residences.'}
                  </p>
                </div>
              </div>
            </div>
          </div>

        </main>
      )}

      {/* VIEW 5: CONTACT US */}
      {activeView === 'contact' && (
        <main id="contact-view-container" className="flex-1 max-w-7xl mx-auto px-4 py-8">

          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block mb-1">
              {lang === 'ar' ? 'خدمة سريعة في متناول يدك دائماً' : 'Get In Touch'}
            </span>
            <h2 className="text-3xl font-black text-slate-900">
              {lang === 'ar' ? 'الموقع والمعلومات وبيانات التواصل الرسمية' : 'Contact Information & Communication Hub'}
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              {translations.contact.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* Left direct contact details */}
            <div className="lg:col-span-5 bg-white p-6 border border-slate-200 rounded-xl shadow-xs flex flex-col gap-6">

              <div className="flex gap-4 items-start pb-4 border-b border-slate-100">
                <div className="w-9 h-9 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center font-bold shrink-0">
                  <Phone className="w-5 h-5 text-blue-700" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider block">
                    {translations.contact.phoneLabel}
                  </span>
                  <a href="tel:0579068424" className="text-lg font-black text-slate-800 hover:text-blue-600 transition-colors">
                    0579068424
                  </a>
                  <p className="text-[11px] text-slate-400 mt-1">
                    {lang === 'ar' ? 'اتصال مباشر أو مكالمة خلوية عادية' : 'Voice call available directly on local phone network'}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start pb-4 border-b border-slate-100">
                <div className="w-9 h-9 bg-green-100 text-green-700 rounded-lg flex items-center justify-center font-bold shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider block">
                    WhatsApp Chat
                  </span>
                  <a
                    href={getWhatsAppLink('السلام عليكم')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-black text-green-600 hover:underline"
                  >
                    0579068424
                  </a>
                  <p className="text-[11px] text-slate-400 mt-1">
                    {lang === 'ar' ? 'متصلون دائماً أرسل الصور هنا للحصول على عرض فوري' : 'Our main online channel. Photo submissions must go here.'}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start pb-4 border-b border-slate-100">
                <div className="w-9 h-9 bg-indigo-100 text-indigo-700 rounded-lg flex items-center justify-center font-bold shrink-0">
                  <Mail className="w-5 h-5 text-indigo-700" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider block">
                    {translations.contact.emailLabel}
                  </span>
                  <span className="text-sm font-bold text-slate-800 block">
                    Sabujhasan465@gmail.com
                  </span>
                  <a href="mailto:Sabujhasan465@gmail.com" className="text-[11px] text-blue-600 hover:underline mt-1 block">
                    {translations.contact.emailClick} &rarr;
                  </a>
                </div>
              </div>

              <div className="flex gap-4 items-start pb-4 border-b border-slate-100">
                <div className="w-9 h-9 bg-orange-100 text-orange-700 rounded-lg flex items-center justify-center font-bold shrink-0">
                  <MapPin className="w-5 h-5 text-orange-700" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider block">
                    {translations.contact.locationLabel}
                  </span>
                  <span className="text-xs font-bold text-slate-800 leading-normal block">
                    {translations.contact.locationValue}
                  </span>
                </div>
              </div>

            </div>

            {/* Right Map/Information & Communications Hub */}
            <div className="lg:col-span-7 bg-white p-6 border border-slate-200 rounded-xl shadow-xs">
              <h3 className="font-extrabold text-base sm:text-lg mb-2 text-slate-800 text-start">
                {lang === 'ar' ? 'ساعات المعاينة وجدولة مواعيد النقل بالموقع' : 'Instant Dispatch & Schedule Request'}
              </h3>
              <p className="text-xs text-slate-500 mb-6 leading-relaxed text-start font-normal">
                {lang === 'ar'
                  ? 'بمجرد الاتفاق هاتفياً على السعر المبدئي للأثاث أو كاش الأجهزة، نرسل سيارة النقل ومعها النجارون لتجهيز كاش المال والفك فوراً. تتوفر لدينا خدمة المعاينة في نفس اليوم.'
                  : 'As soon as a preliminary price range is proposed via digital channels, a dispatch truck is assigned to handle packaging. Dismantling carpenters arrive to assist on same-day service.'}
              </p>

              {/* Direct clickable panels */}
              <div className="flex flex-col gap-3">
                <a
                  id="contact-whatsapp-chat-action"
                  href={getWhatsAppLink('مرحباً أود بيع بعض قطع الأثاث.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 bg-green-50 hover:bg-green-100 border border-green-200 rounded-xl transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <MessageSquare className="w-5 h-5 text-green-600 animate-pulse" />
                    <div className="text-start">
                      <span className="font-black text-sm text-green-950 block">
                        {translations.contact.sendMsgBtn}
                      </span>
                      <span className="text-[11px] text-green-700">
                        {lang === 'ar' ? 'أسرع طريقة لإرسال الصور والحصول على عرض سعر فوري متميز' : 'Submit photo uploads directly for free quote approval.'}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className={`w-4 h-4 text-green-600 transition-all ${lang === 'ar' ? 'rotate-180' : ''} group-hover:translate-x-1`} />
                </a>

                <button
                  id="contact-imo-modal-action"
                  onClick={() => setShowImoModal(true)}
                  className="flex items-center justify-between p-4 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl transition-all group w-full text-start"
                >
                  <div className="flex items-center gap-3">
                    <Smartphone className="w-5 h-5 text-blue-600" />
                    <div>
                      <span className="font-black text-sm text-blue-950 block">
                        {translations.contact.imoBtn}
                      </span>
                      <span className="text-[11px] text-blue-700">
                        {lang === 'ar' ? 'اضغط للمعاينة ومعلومات إيمو ونسخ رقم الجوال المباشر' : 'Get details on IMO handle lookup, call directly, copy phone number.'}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className={`w-4 h-4 text-blue-600 transition-all ${lang === 'ar' ? 'rotate-180' : ''} group-hover:translate-x-1`} />
                </button>

                <a
                  id="contact-phone-call-action"
                  href="tel:0579068424"
                  className="flex items-center justify-between p-4 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-xl transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-slate-800" />
                    <div>
                      <span className="font-black text-sm text-slate-900 block">
                        {translations.contact.callBtn}
                      </span>
                      <span className="text-[11px] text-slate-600">
                        0579068424 - {lang === 'ar' ? 'اتصال صوتي فوري في أي وقت' : 'Receive instant audio consultation with coordinator.'}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className={`w-4 h-4 text-slate-900 transition-all ${lang === 'ar' ? 'rotate-180' : ''} group-hover:translate-x-1`} />
                </a>
              </div>

            </div>

          </div>

        </main>
      )}

      {/* FOOTER SECTION */}
      <footer id="global-footer" className="bg-slate-900 text-slate-100 border-t border-slate-800 pt-10 pb-6 shrink-0 mt-auto">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-slate-800">

            {/* Col 1: Brand Info */}
            <div className="flex flex-col items-start gap-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center font-bold text-sm text-white">
                  UF
                </div>
                <h4 className="font-extrabold text-sm text-slate-100 tracking-wider">
                  {translations.companyName}
                </h4>
              </div>
              <p className="text-xs text-slate-400 leading-normal font-normal">
                {lang === 'ar'
                  ? 'نعطي أفضل وأعلى الأسعار لشراء الأثاث المنزلي الفاخر، غرف النوم، الصالونات، المجالس العربية العريضة والمكيفات المستعملة بالمدينة المنورة.'
                  : 'The holy city of Madinah\'s leading used furniture & electronic buyer agency. High cash estimations, immediate transport, free carpenters.'}
              </p>

              {/* Trust certification line */}
              <div className="flex items-center gap-1.5 mt-2 text-[10px] text-slate-500 font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
                <span>{lang === 'ar' ? 'موثوق ومعتمد بالمدينة المنورة' : 'Licensed & Trusted Used Goods Dealer'}</span>
              </div>
            </div>

            {/* Col 2: High Density Sourced Links */}
            <div className="flex flex-col gap-3">
              <h5 className="text-[10px] text-blue-400 font-extrabold uppercase tracking-widest block pb-1 border-b border-slate-800 max-w-xs">
                {lang === 'ar' ? 'قائمة التنقل السريع' : 'Navigation Indexes'}
              </h5>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs font-bold">
                <button
                  onClick={() => triggerSimulatedReload('home')}
                  className="text-slate-400 hover:text-white text-start transition-colors"
                >
                  {translations.nav.home}
                </button>
                <button
                  onClick={() => triggerSimulatedReload('services')}
                  className="text-slate-400 hover:text-white text-start transition-colors"
                >
                  {translations.nav.services}
                </button>
                <button
                  onClick={() => triggerSimulatedReload('how-it-works')}
                  className="text-slate-400 hover:text-white text-start transition-colors"
                >
                  {translations.nav.howItWorks}
                </button>
                <button
                  onClick={() => triggerSimulatedReload('products')}
                  className="text-slate-400 hover:text-white text-start transition-colors"
                >
                  {translations.nav.products}
                </button>
                <button
                  onClick={() => triggerSimulatedReload('contact')}
                  className="text-slate-400 hover:text-white text-start transition-colors"
                >
                  {translations.nav.contact}
                </button>
              </div>
            </div>

            {/* Col 3: Contact & Social links */}
            <div className="flex flex-col items-start md:items-end gap-3">
              <h5 className="text-[10px] text-blue-400 font-extrabold uppercase tracking-widest block pb-1 border-b border-slate-800 max-w-xs w-full md:text-end">
                {lang === 'ar' ? 'قنوات تواصل إضافية ومعلومات' : 'Service Channels'}
              </h5>
              <p className="text-xs text-slate-300 text-start md:text-end font-normal">
                {lang === 'ar' ? 'البريد الإلكتروني الموحد:' : 'Direct email enquiries:'}<br />
                <span className="font-extrabold text-blue-400">Sabujhasan465@gmail.com</span>
              </p>

              {/* Responsive social block layout */}
              <div className="flex gap-2.5 mt-2">
                <a
                  href={getWhatsAppLink('مرحباً')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-green-600 transition-colors flex items-center justify-center text-white"
                  title="WhatsApp"
                >
                  <MessageSquare className="w-4 h-4" />
                </a>
                <a
                  href="tel:0579068424"
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-cyan-600 transition-colors flex items-center justify-center text-white"
                  title="Direct Phone Call"
                >
                  <Phone className="w-4 h-4" />
                </a>
                <button
                  onClick={() => setShowImoModal(true)}
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-blue-600 transition-colors flex items-center justify-center text-white cursor-pointer"
                  title="IMO Messenger"
                >
                  <Smartphone className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

          <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <span className="text-[10px] text-slate-500 font-bold tracking-wider text-center sm:text-start leading-normal">
              © 2026 USED FURNITURE BUYER MADINAH. ALL RIGHTS RESERVED.<br />
              {lang === 'ar'
                ? 'موقع شراء الأثاث المستعمل بالمدينة المنورة للتجارة وإعادة التدوير • هاتف 0579068424'
                : 'Secondhand items trade registry under Sabujhasan465@gmail.com. Serving Madina Holy District.'}
            </span>

            <span className="text-[10px] text-slate-500 bg-slate-800/50 px-2.5 py-1 rounded-full font-sans">
              https://usedfurniturebuyermadinah.com
            </span>
          </div>

        </div>
      </footer>

      {/* POPUP MODAL 1: IMO INFO & DIAL ACTION */}
      {showImoModal && (
        <div id="imo-modal" className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-md w-full p-6 shadow-xl relative animate-in fade-in zoom-in duration-100">

            <button
              onClick={() => setShowImoModal(false)}
              className="absolute top-4 right-4 bg-slate-100 hover:bg-slate-200 p-1.5 rounded-full text-slate-700"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex flex-col items-center justify-center text-center">
              <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
                <Smartphone className="w-8 h-8 text-blue-600" />
              </div>

              <h3 className="text-lg font-black text-slate-900">
                {lang === 'ar' ? 'تواصل معنا عبر تطبيق إيمو (IMO)' : 'Contact via IMO Messenger'}
              </h3>

              <p className="text-xs text-slate-500 leading-relaxed mt-2 max-w-sm font-normal">
                {lang === 'ar'
                  ? 'لتسريع التواصل ومعاينة غرف النوم الصعبة أو المطابخ والأجهزة، يمكنك الاتصال بنا مباشرة على تطبيق إيمو باستخدام رقم الجوال التالي:'
                  : 'To clear bedroom layouts or appliances fast, connect directly with our evaluators on the IMO messenger app by utilizing our number below:'}
              </p>

              {/* Number Copy Bar */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex justify-between items-center w-full mt-5">
                <span className="font-mono text-base font-black text-slate-800 select-all">
                  0579068424
                </span>
                <button
                  onClick={copyNumberToClipboard}
                  className={`px-3 py-1.5 rounded-lg text-xs font-extrabold flex items-center gap-1.5 transition-all text-white ${copiedNumber ? 'bg-emerald-600' : 'bg-blue-600 hover:bg-blue-500'}`}
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedNumber ? (lang === 'ar' ? 'تم النسخ!' : 'Copied!') : (lang === 'ar' ? 'نسخ الجوال' : 'Copy Number')}</span>
                </button>
              </div>

              {/* Instant Call backup */}
              <div className="grid grid-cols-2 gap-3 w-full mt-6 pt-5 border-t border-slate-100">
                <a
                  href="tel:0579068424"
                  className="bg-slate-900 hover:bg-slate-800 text-white p-2.5 rounded-xl text-xs font-extrabold text-center flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-blue-400" />
                  <span>{lang === 'ar' ? 'اتصال هاتفي' : 'Phone Call'}</span>
                </a>
                <button
                  onClick={() => setShowImoModal(false)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-800 p-2.5 rounded-xl text-xs font-extrabold text-center"
                >
                  {lang === 'ar' ? 'إغلاق النافذة' : 'Close and Back'}
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* POPUP MODAL 2: PRODUCT DESCRIPTION & INQUIRY MODAL */}
      {selectedProduct && (
        <div id="product-detail-modal" className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-lg w-full overflow-hidden shadow-xl relative animate-in fade-in duration-100 flex flex-col">

            {/* Modal Heading header bar */}
            <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <span className="text-[10px] bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full font-black uppercase">
                {selectedProduct.category}
              </span>
              <button
                onClick={() => setSelectedProduct(null)}
                className="bg-white hover:bg-slate-200 p-1 rounded-full text-slate-700 border border-slate-200"
                aria-label="Close product view"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Image display */}
            <div className="aspect-video relative overflow-hidden bg-slate-100 border-b border-slate-200">
              <img
                src={PRODUCT_IMAGES[selectedProduct.image] || "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=600&q=80"}
                alt={selectedProduct.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-xs text-xs font-black text-amber-400 px-3 py-1 rounded-full">
                {translations.productsSection.conditionLabel} {selectedProduct.condition}
              </div>
            </div>

            {/* Content Details */}
            <div className="p-5 flex flex-col gap-3 text-start">
              <h3 className="font-extrabold text-lg text-slate-900 leading-tight">
                {selectedProduct.title}
              </h3>

              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-150 text-xs font-mono text-slate-600">
                {selectedProduct.specs}
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                {selectedProduct.desc}
              </p>

              <div className="flex justify-between items-center py-3 border-t border-slate-100 mt-2 bg-slate-50/50 p-3 rounded-xl border border-dashed border-slate-200">
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">
                    {translations.productsSection.priceLabel}
                  </span>
                  <span className="text-blue-600 text-xl font-black">
                    {selectedProduct.price}
                  </span>
                </div>

                <span className="text-[11px] text-emerald-600 font-black flex items-center gap-1">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{lang === 'ar' ? 'فحص جودة وضمان' : 'Verified Quality'}</span>
                </span>
              </div>

              {/* Direct Buttons to inquire */}
              <div className="grid grid-cols-2 gap-3 pt-3">
                <a
                  id="modal-wa-ask-action"
                  href={getWhatsAppLink(lang === 'ar' ? `مرحباً، أود الاستفسار عن توفر: ${selectedProduct.title} بسعر المعاينة ${selectedProduct.price}. هل هو متاح حالياً؟` : `Hello, I want to inquire about availability for: ${selectedProduct.title} listed at ${selectedProduct.price}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-600 hover:bg-green-500 text-white p-3 rounded-lg text-xs font-black text-center flex items-center justify-center gap-1.5 transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{translations.productsSection.askBtn}</span>
                </a>

                <a
                  id="modal-phone-call-action"
                  href="tel:0579068424"
                  className="bg-slate-900 hover:bg-slate-800 text-white p-3 rounded-lg text-xs font-black text-center flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Phone className="w-4 h-4 text-emerald-400 animate-pulse" />
                  <span>{translations.productsSection.callBtn}</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
