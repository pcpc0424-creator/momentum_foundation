import { useState, useEffect, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import logoImage from "/images/primecore_logo_horizontal_hd.png";

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

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveDropdown('all');
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

  const isDropdownOpen = activeDropdown === 'all';

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isDropdownOpen
        ? 'bg-white shadow-lg'
        : isScrolled || !isHomepage
          ? 'bg-black/50 backdrop-blur-md shadow-lg'
          : 'bg-gradient-to-b from-black/30 to-transparent backdrop-blur-sm'
    }`}
      style={{ transform: 'none', willChange: 'background-color, box-shadow' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center flex-shrink-0 group">
            <img
              src={logoImage}
              alt="프라임코어"
              className="h-8 sm:h-9 lg:h-10 w-auto transition-all duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center flex-1 justify-center">
            {isHomepage && !showRegularNav ? (
              // Homepage: Scroll navigation
              <div className="flex items-center space-x-8">
                {homepageNavItems.map((item) => (
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
                ))}
              </div>
            ) : (
              // Other pages: Regular navigation - 균등 배치
              <div
                className="flex items-center"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {navItems.map((item) => (
                  <div
                    key={item.label}
                    className="relative"
                  >
                    <Link
                      to={item.path}
                      className={`relative inline-flex items-center justify-center px-4 py-2 text-sm font-medium transition-all duration-300 ${
                        isDropdownOpen
                          ? isActive(item.path)
                            ? 'text-emerald-600'
                            : 'text-gray-700 hover:text-emerald-600'
                          : isActive(item.path)
                            ? 'text-white'
                            : 'text-white/90 hover:text-white'
                      }`}
                    >
                      {item.label}
                      {item.submenu && (
                        <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-300 ${
                          isDropdownOpen ? 'rotate-180' : ''
                        }`} />
                      )}

                      {/* Active indicator */}
                      {isActive(item.path) && (
                        <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${
                          isDropdownOpen ? 'bg-emerald-600' : 'bg-white'
                        }`}></span>
                      )}
                    </Link>

                    {/* 각 카테고리 아래 드롭다운 */}
                    {isDropdownOpen && item.submenu && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 pt-0.5 min-w-[120px]">
                        <ul className="py-0.5 text-center">
                          {item.submenu.map((subItem) => (
                            <li key={subItem.path}>
                              <Link
                                to={subItem.path}
                                className="block px-3 py-0.5 text-xs text-gray-600 hover:text-emerald-600 transition-colors whitespace-nowrap"
                                onClick={() => setActiveDropdown(null)}
                              >
                                {subItem.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Divider */}
            <div className={`w-px h-6 mx-2 ${
              isDropdownOpen ? 'bg-gray-300' : 'bg-white/20'
            }`}></div>

            {/* Language Toggle */}
            <div className="flex items-center ml-2">
              <div className={`flex items-center rounded-full p-1 transition-all duration-300 ${
                isDropdownOpen
                  ? 'bg-gray-100 border border-gray-200'
                  : 'bg-white/10 border border-white/20'
              }`}>
                <button
                  onClick={() => setLanguage('ko')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-all duration-300 ${
                    language === 'ko'
                      ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-md'
                      : isDropdownOpen
                        ? 'text-gray-500 hover:text-gray-700'
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
                      : isDropdownOpen
                        ? 'text-gray-500 hover:text-gray-700'
                        : 'text-white/70 hover:text-white'
                  }`}
                >
                  EN
                </button>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2.5 rounded-xl transition-all duration-300 ${
                isDropdownOpen
                  ? 'text-gray-700 hover:bg-gray-100'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* 드롭다운 흰색 배경 영역 */}
        {isDropdownOpen && (
          <div
            className="hidden lg:block absolute top-full left-0 right-0 bg-white shadow-lg z-[-1]"
            style={{ height: '100px' }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
        )}

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
