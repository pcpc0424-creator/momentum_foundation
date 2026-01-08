import { useEffect, useState, useRef } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Building2, Truck, Users, Award, ChevronDown, Phone, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

// Image imports
import meatProductsImg from "/images/meat_products_20251219_072051.png";
import fmServicesImg from "/images/fm_outsourcing_services_20251223_070231.png";
import franchiseImg from "/images/franchise_meat_restaurant_1.jpeg";

const Index = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoaded(true);
    
    // Mouse tracking for parallax effects
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
          const sectionIndex = parseInt(entry.target.getAttribute('data-section') || '0');
          setActiveSection(sectionIndex);
        }
      });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('.scroll-section');
    sections.forEach((section) => observer.observe(section));

return () => {
      observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Counter animation hook
  const useCountUp = (end: number, duration: number = 2000) => {
    const [count, setCount] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    
    useEffect(() => {
      if (!isVisible) return;
      
      let startTime: number;
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        setCount(Math.floor(progress * end));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
    }, [isVisible, end, duration]);
    
    return { count, setIsVisible };
  };

  // Typing animation hook
  const useTypewriter = (text: string, speed: number = 100) => {
    const [displayText, setDisplayText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    
    const startTyping = () => {
      setIsTyping(true);
      let i = 0;
      const timer = setInterval(() => {
        if (i < text.length) {
          setDisplayText(text.slice(0, i + 1));
          i++;
        } else {
          clearInterval(timer);
          setIsTyping(false);
        }
      }, speed);
    };
    
return { displayText, isTyping, startTyping };
  };

  // Stats Card Component with counter animation
  const StatsCard = () => {
    const businessCount = useCountUp(3, 1500);
    const satisfactionCount = useCountUp(100, 2000);
    const [isStatsVisible, setIsStatsVisible] = useState(false);
    
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !isStatsVisible) {
            setIsStatsVisible(true);
            businessCount.setIsVisible(true);
            satisfactionCount.setIsVisible(true);
          }
        },
        { threshold: 0.5 }
      );
      
      if (statsRef.current) {
        observer.observe(statsRef.current);
      }
      
      return () => observer.disconnect();
    }, [isStatsVisible]);
    
    return (
      <div ref={statsRef} className="bg-gradient-to-br from-lawn-green to-green-600 rounded-2xl p-8 text-white shadow-2xl transform hover:scale-105 transition-all duration-300">
<h4 className="text-2xl font-bold mb-4">{t('home.stats.since')}</h4>
        <div className="grid grid-cols-2 gap-6">
          <div className="text-center group">
            <div className="text-3xl font-bold mb-2 transform group-hover:scale-110 transition-transform">
              {businessCount.count}+
            </div>
<div className="text-green-100">{t('home.stats.business')}</div>
          </div>
          <div className="text-center group">
            <div className="text-3xl font-bold mb-2 transform group-hover:scale-110 transition-transform">
              {satisfactionCount.count}%
            </div>
<div className="text-green-100">{t('home.stats.satisfaction')}</div>
          </div>
          <div className="text-center group">
            <div className="text-3xl font-bold mb-2 transform group-hover:scale-110 transition-transform">
              24/7
            </div>
<div className="text-green-100">{t('home.stats.service')}</div>
          </div>
          <div className="text-center group">
            <div className="text-3xl font-bold mb-2 transform group-hover:scale-110 transition-transform">
              ∞
            </div>
<div className="text-green-100">{t('home.stats.growth')}</div>
          </div>
        </div>
      </div>
    );
  };

const businessAreas = [
    {
      title: t('home.business.food.title'),
      description: t('home.business.food.desc'),
      image: meatProductsImg,
      icon: <Building2 className="h-8 w-8" />,
      link: "/business/food"
    },
    {
      title: t('home.business.franchise.title'),
      description: t('home.business.franchise.desc'),
      image: franchiseImg,
      icon: <Truck className="h-8 w-8" />,
      link: "/business/franchise"
    },
    {
      title: t('home.business.fm.title'),
      description: t('home.business.fm.desc'),
      image: fmServicesImg,
      icon: <Users className="h-8 w-8" />,
      link: "/business/fm"
    }
  ];

const companyValues = [
    { title: t('home.values.trust.title'), description: t('home.values.trust.desc'), icon: "🛡️" },
    { title: t('home.values.expertise.title'), description: t('home.values.expertise.desc'), icon: "🎯" },
    { title: t('home.values.innovation.title'), description: t('home.values.innovation.desc'), icon: "🚀" },
    { title: t('home.values.responsibility.title'), description: t('home.values.responsibility.desc'), icon: "🤝" },
  ];

  const navigationDots = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'business', label: 'Business' },
    { id: 'values', label: 'Values' },
    { id: 'news', label: 'News' },
    { id: 'careers', label: 'Careers' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <div className="min-h-screen bg-background relative">
      <Navigation />
      
      {/* Navigation Dots */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 hidden lg:block">
        <div className="flex flex-col space-y-3">
          {navigationDots.map((dot, index) => (
            <button
              key={dot.id}
              onClick={() => scrollToSection(dot.id)}
              className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 ${
                activeSection === index 
                  ? 'bg-lawn-green shadow-lg' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              title={dot.label}
            />
          ))}
        </div>
      </div>

      {/* Hero Section - Premium Design */}
      <section
        id="hero"
        ref={heroRef}
        className="scroll-section relative min-h-screen flex items-center overflow-hidden"
        data-section="0"
        style={{
          background: `linear-gradient(135deg, #0f172a 0%, #1e3a5f 25%, #134e4a 50%, #14532d 75%, #1a2e05 100%)`
        }}
      >
        {/* Animated Gradient Orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="floating-orb w-96 h-96 bg-emerald-500/30"
            style={{
              top: '10%',
              left: '10%',
              animationDelay: '0s'
            }}
          />
          <div
            className="floating-orb w-80 h-80 bg-teal-400/20"
            style={{
              top: '60%',
              right: '10%',
              animationDelay: '-5s'
            }}
          />
          <div
            className="floating-orb w-64 h-64 bg-green-400/25"
            style={{
              bottom: '20%',
              left: '30%',
              animationDelay: '-10s'
            }}
          />
        </div>

        {/* Subtle Grid Pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />

        {/* Mouse Follow Light Effect */}
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(16, 185, 129, 0.15) 0%, transparent 50%)`
          }}
        />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className={`transform transition-all duration-1000 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            {/* Badge */}
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`} style={{ transitionDelay: '0.2s' }}>
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
              <span className="text-emerald-300 text-sm font-medium tracking-wide">MOMENTUM FOUNDATION</span>
            </div>

            {/* Main Title */}
            <h1 className="hero-title-premium text-5xl lg:text-7xl xl:text-8xl font-bold mb-8 leading-tight">
              <span
                className={`block text-white mb-2 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: '0.3s' }}
              >
                {t('hero.title1')}
              </span>
              <span
                className={`block animate-text-gradient transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: '0.5s' }}
              >
                {t('hero.title2')}
              </span>
            </h1>

            {/* Subtitle */}
            <p
              className={`hero-subtitle text-lg lg:text-xl xl:text-2xl mb-12 text-gray-300 max-w-3xl mx-auto leading-relaxed transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: '0.7s' }}
            >
              {t('hero.subtitle')}
            </p>

            {/* CTA Buttons */}
            <div
              className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: '0.9s' }}
            >
              <Button
                size="lg"
                className="btn-premium bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white text-lg px-8 py-6 rounded-full shadow-2xl shadow-emerald-500/25 transform hover:scale-105 hover:-translate-y-1 transition-all duration-300"
                onClick={() => scrollToSection('about')}
              >
                {t('hero.btn1')} <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="btn-premium border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 text-lg px-8 py-6 rounded-full backdrop-blur-sm transform hover:scale-105 hover:-translate-y-1 transition-all duration-300"
                onClick={() => scrollToSection('business')}
              >
                {t('hero.btn2')}
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center gap-2 text-white/50">
            <span className="text-xs tracking-widest uppercase">Scroll</span>
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
              <div className="w-1.5 h-3 bg-white/50 rounded-full animate-bounce" />
            </div>
          </div>
        </div>
      </section>

      {/* About Section - Premium */}
      <section id="about" className="scroll-section min-h-screen bg-gradient-to-b from-slate-50 to-white py-24 flex items-center relative overflow-hidden" data-section="1">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-emerald-50/50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-100/30 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <span className="inline-block px-4 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-4">ABOUT US</span>
            <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              {t('home.about.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {t('home.about.desc')}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 rounded-full">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-emerald-700 text-sm font-medium">Our Mission</span>
              </div>
              <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">{t('home.mission.title')}</h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                {t('home.mission.desc')}
              </p>
              <div className="space-y-4 pt-4">
                {[t('home.vision.item1'), t('home.vision.item2'), t('home.vision.item3')].map((item, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl blur-2xl opacity-20 animate-pulse" />
              <StatsCard />
            </div>
          </div>
        </div>
      </section>

      {/* Business Areas Section - Premium */}
      <section id="business" className="scroll-section min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 py-24 flex items-center relative overflow-hidden" data-section="2">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-0 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <span className="inline-block px-4 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-sm font-medium mb-4 backdrop-blur-sm border border-emerald-500/30">OUR BUSINESS</span>
            <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              {t('home.business.title')}
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              {t('home.business.desc')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {businessAreas.map((area, index) => (
              <Card
                key={index}
                className="group relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:border-emerald-500/50 rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-500/10 transform hover:-translate-y-2"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Glow Effect on Hover */}
                <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/0 via-emerald-500/0 to-emerald-500/0 group-hover:from-emerald-500/5 group-hover:via-emerald-500/10 group-hover:to-emerald-500/5 transition-all duration-500" />

                <div className="relative h-56 overflow-hidden">
                  <img
                    src={area.image}
                    alt={area.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 p-3 bg-emerald-500/20 backdrop-blur-sm rounded-xl border border-emerald-500/30 text-emerald-400">
                    {area.icon}
                  </div>
                </div>

                <CardContent className="p-6 relative">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors duration-300">
                    {area.title}
                  </h3>
                  <p className="text-gray-400 mb-6 leading-relaxed line-clamp-2">
                    {area.description}
                  </p>
                  <Link to={area.link}>
                    <Button
                      variant="outline"
                      className="w-full border-gray-600 text-gray-300 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 transition-all duration-300 rounded-xl"
                    >
                      {t('home.business.btn')} <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Company Values Section - Premium */}
      <section id="values" className="scroll-section min-h-screen bg-gradient-to-b from-white to-slate-50 py-24 flex items-center relative overflow-hidden" data-section="3">
        {/* Decorative */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-emerald-300 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="inline-block px-4 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-4">CORE VALUES</span>
            <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              {t('home.values.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('home.values.desc')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {companyValues.map((value, index) => (
              <div
                key={index}
                className="group relative bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 hover:border-emerald-200 transform hover:-translate-y-2"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Number Badge */}
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg">
                  {String(index + 1).padStart(2, '0')}
                </div>

                <div className="w-16 h-16 mb-6 bg-gradient-to-br from-emerald-100 to-green-100 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {value.description}
                </p>

                {/* Bottom Accent Line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-green-500 rounded-b-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* News Section - Premium */}
      <section id="news" className="scroll-section min-h-screen bg-gradient-to-br from-gray-900 via-emerald-900 to-gray-900 py-24 flex items-center relative overflow-hidden" data-section="4">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-[10%] w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-[15%] w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl"></div>
        </div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:60px_60px]"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="text-center mb-16">
            {/* Premium Badge */}
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl mb-8">
              <Award className="w-5 h-5 text-emerald-400" />
              <span className="text-emerald-300 text-sm font-medium tracking-wider uppercase">News & Updates</span>
            </div>

            <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              {t('page.news.title')}
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {t('page.news.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Link to="/news/notice" className="group">
              <div className="relative h-full">
                {/* Glow Effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-3xl blur-lg opacity-0 group-hover:opacity-30 transition-all duration-500"></div>

                <div className="relative h-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 lg:p-10 hover:border-emerald-500/50 transition-all duration-500 hover:-translate-y-2">
                  {/* Icon */}
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-emerald-500/25">
                    <Award className="h-8 w-8 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-emerald-400 transition-colors">
                    {t('home.news.notice.title')}
                  </h3>
                  <p className="text-gray-400 mb-8 leading-relaxed">
                    {t('home.news.notice.desc')}
                  </p>

                  <div className="flex items-center gap-2 text-emerald-400 font-medium">
                    <span>{t('home.news.notice.btn')}</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                  </div>

                  {/* Bottom Gradient Line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-b-3xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </div>
              </div>
            </Link>

            <Link to="/news/company" className="group">
              <div className="relative h-full">
                {/* Glow Effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-3xl blur-lg opacity-0 group-hover:opacity-30 transition-all duration-500"></div>

                <div className="relative h-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 lg:p-10 hover:border-cyan-500/50 transition-all duration-500 hover:-translate-y-2">
                  {/* Icon */}
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-cyan-500/25">
                    <Building2 className="h-8 w-8 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">
                    {t('home.news.company.title')}
                  </h3>
                  <p className="text-gray-400 mb-8 leading-relaxed">
                    {t('home.news.company.desc')}
                  </p>

                  <div className="flex items-center gap-2 text-cyan-400 font-medium">
                    <span>{t('home.news.company.btn')}</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                  </div>

                  {/* Bottom Gradient Line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-b-3xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Careers Section - Premium */}
      <section id="careers" className="scroll-section min-h-screen bg-gradient-to-b from-white to-gray-50 py-24 flex items-center relative overflow-hidden" data-section="5">
        {/* Background Decorations */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-100/50 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-100/50 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-emerald-100/30 to-cyan-100/30 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="text-center mb-16">
            {/* Premium Badge */}
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-emerald-100 mb-8">
              <Users className="w-5 h-5 text-emerald-600" />
              <span className="text-emerald-700 text-sm font-semibold tracking-wider uppercase">Join Our Team</span>
            </div>

            <h2 className="text-4xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-gray-900 via-emerald-800 to-emerald-600 bg-clip-text text-transparent">
                {t('home.careers.title')}
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {t('home.careers.desc')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Jobs Card */}
            <Link to="/careers/jobs" className="group">
              <div className="relative h-full">
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-green-500 rounded-3xl blur-lg opacity-0 group-hover:opacity-25 transition-all duration-500"></div>

                <div className="relative h-full bg-white rounded-3xl p-10 shadow-xl border-2 border-gray-100 hover:border-emerald-300 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl overflow-hidden">
                  {/* Number Badge */}
                  <div className="absolute -top-3 -right-3 w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white text-2xl font-bold">01</span>
                  </div>

                  {/* Icon */}
                  <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-emerald-500/25">
                    <Users className="h-10 w-10 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-emerald-600 transition-colors">
                    {t('home.careers.jobs.title')}
                  </h3>
                  <p className="text-gray-600 mb-8 leading-relaxed">
                    {t('home.careers.jobs.desc')}
                  </p>

                  <div className="flex items-center gap-2 text-emerald-600 font-semibold">
                    <span>{t('home.careers.jobs.btn')}</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                  </div>

                  {/* Bottom Gradient Line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 to-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </div>
              </div>
            </Link>

            {/* Culture Card */}
            <Link to="/careers/culture" className="group">
              <div className="relative h-full">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-3xl blur-lg opacity-0 group-hover:opacity-25 transition-all duration-500"></div>

                <div className="relative h-full bg-white rounded-3xl p-10 shadow-xl border-2 border-gray-100 hover:border-cyan-300 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl overflow-hidden">
                  {/* Number Badge */}
                  <div className="absolute -top-3 -right-3 w-16 h-16 bg-gradient-to-br from-cyan-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white text-2xl font-bold">02</span>
                  </div>

                  {/* Icon */}
                  <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-cyan-500/25">
                    <Award className="h-10 w-10 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-cyan-600 transition-colors">
                    {t('home.careers.culture.title')}
                  </h3>
                  <p className="text-gray-600 mb-8 leading-relaxed">
                    {t('home.culture.desc')}
                  </p>

                  <div className="flex items-center gap-2 text-cyan-600 font-semibold">
                    <span>{t('home.careers.culture.btn')}</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                  </div>

                  {/* Bottom Gradient Line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-cyan-500 to-emerald-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </div>
              </div>
            </Link>
          </div>

          {/* CTA Banner */}
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 via-cyan-500 to-emerald-500 rounded-3xl blur opacity-20"></div>
            <div className="relative bg-gradient-to-r from-emerald-600 via-emerald-500 to-cyan-500 rounded-3xl p-10 text-center text-white overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

              <div className="relative z-10">
                <h3 className="text-2xl lg:text-3xl font-bold mb-4">Ready to Start Your Journey?</h3>
                <p className="text-white/80 mb-6 max-w-2xl mx-auto">모멘텀파운데이션과 함께 성장하세요</p>
                <Link to="/careers">
                  <Button className="bg-white text-emerald-600 hover:bg-gray-100 px-8 py-4 rounded-full font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                    모든 채용 공고 보기 <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section - Premium */}
      <section id="contact" className="scroll-section min-h-screen bg-gradient-to-br from-gray-900 via-emerald-900 to-gray-900 py-24 flex items-center relative overflow-hidden" data-section="6">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-[10%] w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 left-[15%] w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl"></div>
        </div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:60px_60px]"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="text-center mb-16">
            {/* Premium Badge */}
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl mb-8">
              <Phone className="w-5 h-5 text-emerald-400" />
              <span className="text-emerald-300 text-sm font-medium tracking-wider uppercase">Get In Touch</span>
            </div>

            <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              {t('page.contact.title')}
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {t('page.contact.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Phone Card */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-3xl blur-lg opacity-0 group-hover:opacity-30 transition-all duration-500"></div>

              <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 text-center hover:border-emerald-500/50 transition-all duration-500 hover:-translate-y-2">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-emerald-500/25">
                  <Phone className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{t('home.contact.phone')}</h3>
                <p className="text-emerald-400 font-semibold text-lg mb-2">{t('home.contact.phone.number')}</p>
                <p className="text-gray-500 text-sm">{t('home.contact.phone.hours')}</p>

                {/* Hover Indicator */}
                <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="inline-flex items-center gap-2 text-emerald-400 text-sm font-medium">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                    Available Now
                  </span>
                </div>
              </div>
            </div>

            {/* Email Card */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-3xl blur-lg opacity-0 group-hover:opacity-30 transition-all duration-500"></div>

              <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 text-center hover:border-cyan-500/50 transition-all duration-500 hover:-translate-y-2">
                <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-cyan-500/25">
                  <Mail className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{t('home.contact.email')}</h3>
                <p className="text-cyan-400 font-semibold text-lg mb-2">{t('home.contact.email.address')}</p>
                <p className="text-gray-500 text-sm">{t('home.contact.email.hours')}</p>

                {/* Hover Indicator */}
                <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="inline-flex items-center gap-2 text-cyan-400 text-sm font-medium">
                    <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
                    Quick Response
                  </span>
                </div>
              </div>
            </div>

            {/* Address Card */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-3xl blur-lg opacity-0 group-hover:opacity-30 transition-all duration-500"></div>

              <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 text-center hover:border-teal-500/50 transition-all duration-500 hover:-translate-y-2">
                <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-teal-500/25">
                  <MapPin className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{t('home.contact.address')}</h3>
                <p className="text-teal-400 font-semibold text-lg mb-2">{t('home.contact.address.detail')}</p>

                {/* Hover Indicator */}
                <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="inline-flex items-center gap-2 text-teal-400 text-sm font-medium">
                    <span className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"></span>
                    Visit Us
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <Link to="/contact/inquiry">
              <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white text-lg px-10 py-6 rounded-full shadow-2xl shadow-emerald-500/25 transform hover:scale-105 hover:-translate-y-1 transition-all duration-300">
                {t('home.contact.btn')} <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;