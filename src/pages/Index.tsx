import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ArrowUp, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

// Image imports
import meatProductsImg from "/images/meat_products_20251219_072051.png";
import fmServicesImg from "/images/fm_outsourcing_services_20251223_070231.png";
import franchiseImg from "/images/franchise_meat_restaurant_1.jpeg";

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showTopButton, setShowTopButton] = useState(false);
  const { t, language } = useLanguage();

  // Hero slides data with translations
  const heroSlides = [
    {
      image: meatProductsImg,
      titleKey: "main.hero.slide1.title",
      subtitleKey: "main.hero.slide1.subtitle",
      desc1Key: "main.hero.slide1.desc1",
      desc2Key: "main.hero.slide1.desc2",
    },
    {
      image: franchiseImg,
      titleKey: "main.hero.slide2.title",
      subtitleKey: "main.hero.slide2.subtitle",
      desc1Key: "main.hero.slide2.desc1",
      desc2Key: "main.hero.slide2.desc2",
    },
    {
      image: fmServicesImg,
      titleKey: "main.hero.slide3.title",
      subtitleKey: "main.hero.slide3.subtitle",
      desc1Key: "main.hero.slide3.desc1",
      desc2Key: "main.hero.slide3.desc2",
    },
  ];

  // Fallback translations if keys don't exist
  const getSlideText = (key: string, fallback: string) => {
    const translated = t(key);
    return translated === key ? fallback : translated;
  };

  const slideTexts = {
    "main.hero.slide1.title": language === 'en' ? "MOMENTUM'S OWN BRAND" : "MOMENTUM'S OWN BRAND",
    "main.hero.slide1.subtitle": language === 'en' ? "Food & Service Brand that Enhances Customer Value" : "고객의 가치를 높이는 식자재 & 서비스 브랜드",
    "main.hero.slide1.desc1": language === 'en' ? "Discovering the inherent beauty within customers and challenging new areas of value," : "고객이 본래 지닌 내면의 아름다움을 발견하고 새로운 가치의 영역에 도전하며",
    "main.hero.slide1.desc2": language === 'en' ? "We aim to be a brand that communicates with customers." : "고객과 소통하는 브랜드를 지향합니다.",
    "main.hero.slide2.title": language === 'en' ? "FRANCHISE BUSINESS" : "FRANCHISE BUSINESS",
    "main.hero.slide2.subtitle": language === 'en' ? "Successful Franchise Partnership" : "성공적인 프랜차이즈 파트너십",
    "main.hero.slide2.desc1": language === 'en' ? "Supporting stable startups with proven brands and systems," : "검증된 브랜드와 시스템으로 안정적인 창업을 지원하며",
    "main.hero.slide2.desc2": language === 'en' ? "We create sustainable growth together." : "지속 가능한 성장을 함께 만들어갑니다.",
    "main.hero.slide3.title": language === 'en' ? "FM SERVICE" : "FM SERVICE",
    "main.hero.slide3.subtitle": language === 'en' ? "Professional Facility Management Service" : "전문 시설관리 서비스",
    "main.hero.slide3.desc1": language === 'en' ? "Providing professional management services for optimal facility environments," : "최적의 시설 환경을 위한 전문적인 관리 서비스를 제공하며",
    "main.hero.slide3.desc2": language === 'en' ? "We enhance the value of your business." : "고객의 비즈니스 가치를 높입니다.",
  };

  const missionTexts = {
    label: language === 'en' ? "Our Mission" : "우리의 미션",
    title: language === 'en' ? "Value Creator, MOMENTUM" : "가치 창조자, 모멘텀",
    desc: language === 'en'
      ? "Based on platform business strategy, we combine ideas and efforts while communicating with customers to create core value as a Food Platform Manager, generating brand value that leads customers' businesses to success."
      : "플랫폼 비즈니스 전략을 기반으로, 고객들과 소통하고 아이디어와 노력을 결합하여 핵심 가치를 창조하는 푸드 플랫폼 매니저 (Food Platform Manager)로써 고객의 비즈니스를 성공으로 이끌 브랜드 가치를 창출합니다.",
  };

  const statsData = [
    {
      label: language === 'en' ? "BUSINESS AREAS" : "사업 영역",
      number: "3+",
      desc: language === 'en' ? "Food distribution, franchise, FM service" : "식자재 유통, 프랜차이즈, FM 서비스"
    },
    {
      label: language === 'en' ? "PARTNERS" : "거래 업체",
      number: "100+",
      desc: language === 'en' ? "Network of over 100 partner companies nationwide" : "전국 100개 이상의 파트너사 네트워크"
    },
    {
      label: language === 'en' ? "SERVICE" : "서비스 운영",
      number: "24/7",
      desc: language === 'en' ? "24/7 customer support service" : "24시간 365일 고객지원 서비스"
    },
    {
      label: language === 'en' ? "EXPERIENCE" : "성장 연수",
      number: "10+",
      desc: language === 'en' ? "Over 10 years of industry experience and know-how" : "10년 이상의 업계 경험과 노하우"
    },
  ];

  const footerTexts = {
    companyName: language === 'en' ? "MOMENTUM Co., Ltd." : "(주)모멘텀",
    jobs: language === 'en' ? "Careers" : "채용",
    directions: language === 'en' ? "Directions" : "오시는 길",
    familySite: language === 'en' ? "Family site" : "Family site",
    address: language === 'en' ? "14, Seolleung-ro 90-gil, Gangnam-gu, Seoul (Daechi-dong, Momentum Building)" : "서울 강남구 선릉로90길 14(대치동, 모멘텀빌딩)",
    phone: language === 'en' ? "Tel: 02-6423-4122" : "대표번호 : 02-6423-4122",
    fax: language === 'en' ? "Fax: 02-6423-4123" : "팩스번호 : 02-6423-4123",
    copyright: language === 'en' ? "Copyright 2019 © MOMENTUM Co., Ltd. All rights reserved." : "Copyright 2019 © MOMENTUM Co., Ltd. All rights reserved.",
    privacy: language === 'en' ? "Privacy Policy" : "개인정보...",
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoaded(true);

    // Auto slide
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    // Scroll listener for TOP button
    const handleScroll = () => {
      setShowTopButton(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearInterval(slideInterval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section - Pastel Style with Slider */}
      <section className="relative h-screen overflow-hidden">
        {/* Pastel Background */}
        <div className="absolute inset-0 bg-[#E8F5E9]"></div>

        {/* Slides */}
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              currentSlide === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src={slide.image}
                alt={slideTexts[slide.titleKey as keyof typeof slideTexts]}
                className="w-full h-full object-cover mix-blend-multiply opacity-80"
              />
            </div>

            {/* Content */}
            <div className="relative z-10 flex items-center justify-center h-full px-4 sm:px-6 lg:px-8">
              <div className={`text-center max-w-4xl mx-auto transition-all duration-700 ${
                currentSlide === index && isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
                {/* English Title */}
                <p className="text-[#2D5A45] text-base sm:text-lg lg:text-xl tracking-[0.2em] font-light mb-4">
                  {slideTexts[slide.titleKey as keyof typeof slideTexts]}
                </p>

                {/* Korean Main Title */}
                <h1 className="text-[#1B3D2F] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-8">
                  {slideTexts[slide.subtitleKey as keyof typeof slideTexts]}
                </h1>

                {/* Description */}
                <p className="text-[#3D6B55] text-sm sm:text-base lg:text-lg leading-relaxed mb-2">
                  {slideTexts[slide.desc1Key as keyof typeof slideTexts]}
                </p>
                <p className="text-[#3D6B55] text-sm sm:text-base lg:text-lg leading-relaxed mb-8">
                  {slideTexts[slide.desc2Key as keyof typeof slideTexts]}
                </p>

                {/* CTA Button */}
                <Link to="/about/intro">
                  <Button
                    variant="link"
                    className="text-[#2D5A45] hover:text-[#1B3D2F] text-sm sm:text-base tracking-wider p-0 h-auto font-normal underline underline-offset-4"
                  >
                    Read More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}

        {/* Left Arrow */}
        <button
          onClick={prevSlide}
          className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 text-[#2D5A45]/60 hover:text-[#2D5A45] transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-8 h-8 sm:w-10 sm:h-10" strokeWidth={1} />
        </button>

        {/* Right Arrow */}
        <button
          onClick={nextSlide}
          className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 text-[#2D5A45]/60 hover:text-[#2D5A45] transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight className="w-8 h-8 sm:w-10 sm:h-10" strokeWidth={1} />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                currentSlide === index ? 'bg-[#5BA587] w-6' : 'bg-[#5BA587]/40'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-20 sm:py-28 lg:py-36 bg-[#F5F5F5]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Label */}
          <p className="text-[#5BA587] text-xs sm:text-sm tracking-[0.2em] uppercase font-medium mb-6">
            {missionTexts.label}
          </p>

          {/* Main Headline */}
          <h2 className="text-gray-900 text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold mb-10">
            {missionTexts.title}
          </h2>

          {/* Description */}
          <p className="text-gray-600 text-sm sm:text-base lg:text-lg leading-loose">
            {missionTexts.desc}
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {statsData.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-[#5BA587] text-[10px] sm:text-xs tracking-[0.15em] uppercase font-medium mb-4">
                  {stat.label}
                </p>
                <p className="text-gray-900 text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
                  {stat.number}
                </p>
                <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                  {stat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Footer */}
      <footer className="border-t border-gray-200 py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            {/* Left: Company Info */}
            <div>
              {/* Company Name & Links */}
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <span className="text-gray-900 font-bold text-lg">{footerTexts.companyName}</span>
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <Link to="/careers/jobs" className="hover:text-gray-900 transition-colors">{footerTexts.jobs}</Link>
                  <span className="text-gray-300">|</span>
                  <Link to="/contact/location" className="hover:text-gray-900 transition-colors">{footerTexts.directions}</Link>
                  <span className="text-gray-300">|</span>
                  <span className="text-gray-400">{footerTexts.familySite}</span>
                  <span className="text-[#5BA587]">+</span>
                </div>
              </div>

              {/* Address */}
              <p className="text-gray-500 text-sm mb-2">
                {footerTexts.address}
              </p>

              {/* Phone & Fax */}
              <div className="flex flex-wrap gap-4 sm:gap-6 text-sm text-gray-500 mb-4">
                <span>{footerTexts.phone}</span>
                <span>{footerTexts.fax}</span>
              </div>

              {/* Copyright */}
              <p className="text-gray-400 text-xs">
                {footerTexts.copyright}
              </p>
            </div>

            {/* Right: Buttons */}
            <div className="flex items-center gap-4">
              <Link
                to="/privacy"
                className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1"
              >
                {footerTexts.privacy}
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* TOP Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-50 w-12 h-12 bg-white border border-gray-300 rounded-full shadow-lg flex flex-col items-center justify-center transition-all duration-300 hover:shadow-xl ${
          showTopButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-4 h-4 text-gray-600" />
        <span className="text-[10px] text-gray-600 font-medium">TOP</span>
      </button>
    </div>
  );
};

export default Index;
