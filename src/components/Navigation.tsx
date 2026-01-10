import { useState, useEffect, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import logoImage from "/images/logo-new.png";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { language, setLanguage, t } = useLanguage();

  // Check if we're on the homepage for one-page scroll navigation
  const isHomepage = location.pathname === "/";

  // Force show regular navigation for debugging
  const showRegularNav = true;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  // Homepage navigation items (scroll to sections)
  const homepageNavItems = [
    { id: "hero", label: t('nav.home') },
    { id: "about", label: t('nav.about') },
    { id: "business", label: t('nav.business') },
    { id: "values", label: t('nav.values') },
    { id: "news", label: t('nav.news') },
    { id: "careers", label: t('nav.careers') },
    { id: "contact", label: t('nav.contact') }
  ];

  // Regular navigation items (for other pages)
  const navItems = [
    { path: "/", label: t('nav.home') },
    {
      path: "/about",
      label: t('nav.about'),
      submenu: [
        { path: "/about/intro", label: t('nav.about.intro') },
        { path: "/about/ceo", label: t('nav.about.ceo') },
        { path: "/about/philosophy", label: t('nav.about.philosophy') },
        { path: "/about/history", label: t('nav.about.history') },
        { path: "/about/organization", label: t('nav.about.organization') }
      ]
    },
    {
      path: "/business",
      label: t('nav.business'),
      submenu: [
        { path: "/business/food", label: t('nav.business.food') },
        { path: "/business/franchise", label: t('nav.business.franchise') },
        { path: "/business/fm", label: t('nav.business.fm') }
      ]
    },
    {
      path: "/news",
      label: t('nav.news'),
      submenu: [
        { path: "/news/notice", label: t('nav.news.notice') },
        { path: "/news/company", label: t('nav.news.company') }
      ]
    },
    {
      path: "/careers",
      label: t('nav.careers'),
      submenu: [
        { path: "/careers/jobs", label: t('nav.careers.jobs') },
        { path: "/careers/culture", label: t('nav.careers.culture') },
        { path: "/careers/process", label: t('nav.careers.process') }
      ]
    },
    {
      path: "/contact",
      label: t('nav.contact'),
      submenu: [
        { path: "/contact/inquiry", label: t('nav.contact.inquiry') },
        { path: "/contact/location", label: t('nav.contact.location') },
        { path: "/contact/departments", label: t('nav.contact.departments') }
      ]
    }
  ];

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 300);
  };

  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled || !isHomepage
        ? 'bg-black/50 backdrop-blur-md shadow-lg'
        : 'bg-gradient-to-b from-black/30 to-transparent backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center flex-shrink-0 group gap-2">
            <div className={`relative p-1.5 sm:p-2 rounded-xl transition-all duration-300 ${
              isScrolled || !isHomepage
                ? 'bg-white/10 group-hover:bg-white/20'
                : 'bg-white/10 group-hover:bg-white/20'
            }`}>
              <img
                src={logoImage}
                alt="모멘텀파운데이션"
                className="h-8 sm:h-10 w-auto transition-all duration-300 group-hover:scale-105"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {isHomepage && !showRegularNav ? (
              // Homepage: Scroll navigation
              homepageNavItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                    isScrolled || !isHomepage
                      ? 'text-white/90 hover:text-white hover:bg-white/10'
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {item.label}
                </button>
              ))
            ) : (
              // Other pages: Regular navigation
              navItems.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.submenu && handleMouseEnter(item.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    to={item.path}
                    className={`relative flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                      isActive(item.path)
                        ? isScrolled || !isHomepage
                          ? 'text-white bg-white/20'
                          : 'text-white bg-white/20'
                        : isScrolled || !isHomepage
                          ? 'text-white/90 hover:text-white hover:bg-white/10'
                          : 'text-white/90 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {item.label}
                    {item.submenu && (
                      <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-300 ${
                        activeDropdown === item.label ? 'rotate-180' : ''
                      }`} />
                    )}

                    {/* Active indicator */}
                    {isActive(item.path) && (
                      <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${
                        isScrolled || !isHomepage ? 'bg-white' : 'bg-white'
                      }`}></span>
                    )}
                  </Link>

                  {/* Dropdown Menu */}
                  {item.submenu && activeDropdown === item.label && (
                    <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-[9999] overflow-hidden">
                      {/* Top gradient line */}
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-green-500"></div>

                      {item.submenu.map((subItem, index) => (
                        <Link
                          key={subItem.path}
                          to={subItem.path}
                          className="block px-5 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-green-50 hover:text-emerald-700 transition-all duration-200"
                          onClick={() => setActiveDropdown(null)}
                        >
                          <span className="flex items-center gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                            {subItem.label}
                          </span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))
            )}

            {/* Divider */}
            <div className={`w-px h-6 mx-2 ${
              isScrolled || !isHomepage ? 'bg-white/20' : 'bg-white/20'
            }`}></div>

            {/* Language Toggle */}
            <div className="flex items-center ml-2">
              <div className={`flex items-center rounded-full p-1 transition-all duration-300 ${
                isScrolled || !isHomepage
                  ? 'bg-white/10 border border-white/20'
                  : 'bg-white/10 border border-white/20'
              }`}>
                <button
                  onClick={() => setLanguage('ko')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-all duration-300 ${
                    language === 'ko'
                      ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-md'
                      : isScrolled || !isHomepage
                        ? 'text-white/70 hover:text-white'
                        : 'text-white/70 hover:text-white'
                  }`}
                >
                  KO
                </button>
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-all duration-300 ${
                    language === 'en'
                      ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-md'
                      : isScrolled || !isHomepage
                        ? 'text-white/70 hover:text-white'
                        : 'text-white/70 hover:text-white'
                  }`}
                >
                  EN
                </button>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2.5 rounded-xl transition-all duration-300 ${
                isScrolled || !isHomepage
                  ? 'text-white hover:bg-white/10'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden fixed top-20 left-0 right-0 bg-white border-t border-gray-100 shadow-2xl z-[9999]" style={{ maxHeight: 'calc(100vh - 80px)' }}>
            <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 80px)' }}>
              <div className="px-3 pt-3 pb-4 space-y-1">
                {isHomepage && !showRegularNav ? (
                  // Homepage: Scroll navigation
                  homepageNavItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className="block w-full text-left px-4 py-3 text-sm font-medium text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all duration-200"
                    >
                      {item.label}
                    </button>
                  ))
                ) : (
                  // Other pages: Regular navigation
                  navItems.map((item) => (
                    <div key={item.label}>
                      <Link
                        to={item.path}
                        className={`block px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 ${
                          isActive(item.path)
                            ? 'text-emerald-600 bg-emerald-50'
                            : 'text-gray-700 hover:text-emerald-600 hover:bg-emerald-50'
                        }`}
                        onClick={() => !item.submenu && setIsOpen(false)}
                      >
                        {item.label}
                      </Link>
                      {item.submenu && (
                        <div className="pl-3 mt-1 space-y-0.5 border-l-2 border-emerald-100 ml-4">
                          {item.submenu.map((subItem) => (
                            <Link
                              key={subItem.path}
                              to={subItem.path}
                              className="block px-3 py-2 text-xs text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all duration-200"
                              onClick={() => setIsOpen(false)}
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))
                )}

                {/* Mobile Language Toggle */}
                <div className="border-t border-gray-100 mt-3 pt-3 px-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 font-medium">Language</span>
                    <div className="flex items-center rounded-full p-1 bg-gray-100 border border-gray-200">
                      <button
                        onClick={() => { setLanguage('ko'); setIsOpen(false); }}
                        className={`px-3 py-1 text-xs font-semibold rounded-full transition-all duration-300 ${
                          language === 'ko'
                            ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-md'
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        KO
                      </button>
                      <button
                        onClick={() => { setLanguage('en'); setIsOpen(false); }}
                        className={`px-3 py-1 text-xs font-semibold rounded-full transition-all duration-300 ${
                          language === 'en'
                            ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-md'
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        EN
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
