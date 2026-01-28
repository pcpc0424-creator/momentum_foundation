import { useEffect, useState, useRef } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ChevronLeft, ChevronRight, Plus, ArrowUp } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const IndexNew = () => {
  const { language } = useLanguage();
  const [showIntro, setShowIntro] = useState(true);
  const [introStep, setIntroStep] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeCategory, setActiveCategory] = useState(0);
  const [showTopButton, setShowTopButton] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  // 인트로 애니메이션
  useEffect(() => {
    const timer1 = setTimeout(() => setIntroStep(1), 300);
    const timer2 = setTimeout(() => setIntroStep(2), 800);
    const timer3 = setTimeout(() => setIntroStep(3), 1500);
    const timer4 = setTimeout(() => setShowIntro(false), 2500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  // 슬라이드 자동 전환
  useEffect(() => {
    if (!showIntro) {
      const interval = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % heroSlides.length);
      }, 6000);
      return () => clearInterval(interval);
    }
  }, [showIntro]);

  // 스크롤 감지
  useEffect(() => {
    const handleScroll = () => {
      setShowTopButton(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 팝업 체크
  useEffect(() => {
    const hidePopup = localStorage.getItem('hidePopupToday');
    if (!hidePopup || new Date(hidePopup) < new Date()) {
      setTimeout(() => setShowPopup(true), 3000);
    }
  }, []);

  const hidePopupToday = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    localStorage.setItem('hidePopupToday', tomorrow.toISOString());
    setShowPopup(false);
  };

  // 히어로 슬라이드 데이터
  const heroSlides = [
    {
      video: "/momentum_foundation/videos/food.mp4",
      title: language === 'ko'
        ? "오랜 노하우와 전문 서비스로\n프라임코어는 식탁을 넘어\n비즈니스의 가치를 디자인합니다."
        : "With expertise and professional service,\nPRIMECORE designs business value\nbeyond the table.",
      subtitle: ""
    },
    {
      video: "/momentum_foundation/videos/franchise.mp4",
      title: language === 'ko'
        ? "공간을 넘어, 비즈니스의 가치를 디자인하다."
        : "Designing business value beyond space.",
      subtitle: language === 'ko'
        ? "30년의 노하우로, 식자재를 넘어\n프랜차이즈와 서비스의 가치를 디자인합니다."
        : "With 30 years of know-how,\nwe design franchise and service value."
    },
    {
      video: "/momentum_foundation/videos/fm.mp4",
      title: language === 'ko'
        ? "전문 시설관리로\n최적의 환경을 제공합니다."
        : "Providing optimal environments\nwith professional FM service.",
      subtitle: ""
    }
  ];

  // What We Do 카테고리 데이터
  const categories = [
    {
      title: language === 'ko' ? '식자재 유통' : 'Food Distribution',
      titleEn: 'Food Business',
      desc: language === 'ko'
        ? "신선하고 품질 좋은 식자재를\n안정적으로 공급합니다."
        : "Stably supplying fresh,\nhigh-quality ingredients.",
      link: '/business/food',
      image: '/momentum_foundation/images/food-distribution.png'
    },
    {
      title: language === 'ko' ? '프랜차이즈' : 'Franchise',
      titleEn: 'Franchise Business',
      desc: language === 'ko'
        ? "검증된 브랜드와 체계적인 시스템으로\n성공적인 창업을 지원합니다."
        : "Supporting successful startups\nwith proven brands and systems.",
      link: '/business/franchise',
      image: '/momentum_foundation/images/meat-restaurant.png'
    },
    {
      title: language === 'ko' ? '시설관리(FM)' : 'Facility Management',
      titleEn: 'FM Service',
      desc: language === 'ko'
        ? "전문적인 시설관리 서비스로\n최적의 환경을 제공합니다."
        : "Providing optimal environments\nwith professional management.",
      link: '/business/fm',
      image: '/momentum_foundation/images/fm-service.png'
    },
    {
      title: language === 'ko' ? '컨설팅' : 'Consulting',
      titleEn: 'Business Consulting',
      desc: language === 'ko'
        ? "맞춤형 비즈니스 솔루션을\n제안합니다."
        : "Proposing customized\nbusiness solutions.",
      link: '/contact/inquiry',
      image: '/momentum_foundation/images/consulting.png'
    }
  ];

  // 서비스 데이터
  const services = [
    { title: language === 'ko' ? '회사 소개' : 'About Us', link: '/about/intro', image: '/momentum_foundation/images/momentum-building.png' },
    { title: language === 'ko' ? '사업 문의' : 'Business Inquiry', link: '/contact/inquiry' },
    { title: language === 'ko' ? '오시는 길' : 'Location', link: '/contact/location' },
    { title: language === 'ko' ? '채용 정보' : 'Careers', link: '/careers/jobs' },
    { title: language === 'ko' ? '담당자 연락처' : 'Contact', link: '/contact/departments' },
  ];

  // 베스트 제품
  const bestProducts = [
    { title: language === 'ko' ? '프리미엄 식자재' : 'Premium Ingredients', image: '/momentum_foundation/images/food-distribution.png', link: '/business/food' },
    { title: language === 'ko' ? '정육식당 프랜차이즈' : 'Meat Restaurant', image: '/momentum_foundation/images/meat-restaurant.png', link: '/business/franchise' },
    { title: language === 'ko' ? 'FM 아웃소싱' : 'FM Outsourcing', image: '/momentum_foundation/images/fm-service.png', link: '/business/fm' },
    { title: language === 'ko' ? '비즈니스 컨설팅' : 'Business Consulting', image: '/momentum_foundation/images/consulting.png', link: '/contact/inquiry' },
  ];

  // 뉴스 데이터
  const newsItems = [
    {
      title: language === 'ko' ? '프라임코어, 2025년 신규 사업 확장 계획 발표' : 'PRIMECORE announces 2025 expansion plan',
      desc: language === 'ko' ? '식자재 유통을 넘어 프랜차이즈, FM 서비스까지 사업 영역 확대' : 'Expanding business from food distribution to franchise and FM services',
      date: '2025.01.10',
      image: '/momentum_foundation/images/momentum-building.png'
    },
    {
      title: language === 'ko' ? '프랜차이즈 가맹점 100호점 돌파' : 'Franchise reaches 100th store',
      desc: language === 'ko' ? '정육식당 프랜차이즈의 빠른 성장세 지속' : 'Rapid growth of meat restaurant franchise continues',
      date: '2025.01.05',
      image: '/momentum_foundation/images/meat-restaurant.png'
    },
    {
      title: language === 'ko' ? 'FM 서비스 고객사 확대' : 'FM service client expansion',
      desc: language === 'ko' ? '전문 시설관리 서비스로 고객 만족도 향상' : 'Improving customer satisfaction with professional FM service',
      date: '2024.12.20',
      image: '/momentum_foundation/images/fm-service.png'
    },
  ];

  return (
    <div className="min-h-screen bg-black">
      <Navigation />

      {/* 인트로 커버 */}
      <div className={`fixed inset-0 z-50 bg-black transition-all duration-1000 ${showIntro ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        {/* 상단 타이틀 */}
        <div className="absolute top-[20%] left-0 right-0 text-center px-4">
          <h2 className={`text-white text-2xl md:text-4xl lg:text-5xl font-bold transition-all duration-700 ${introStep >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {language === 'ko' ? '가치를 창출하는,' : 'Creating Value,'}
            <br />
            <span className="text-3xl md:text-5xl lg:text-6xl mt-2 block">
              {language === 'ko' ? '프라임코어' : 'PRIMECORE'}
            </span>
          </h2>
        </div>

        {/* 텍스트 라인 애니메이션 */}
        <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4">
            {/* Line 1 */}
            <div className="flex items-center justify-center gap-2 md:gap-4 mb-2 md:mb-4 overflow-hidden">
              <span className={`text-white text-2xl md:text-5xl lg:text-7xl font-black tracking-wider transition-all duration-700 ${introStep >= 2 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'}`} style={{transitionDelay: '0s'}}>
                PREMIUM
              </span>
              <div className={`w-16 md:w-24 lg:w-32 h-10 md:h-16 lg:h-20 bg-gray-700 rounded transition-all duration-700 ${introStep >= 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`} style={{transitionDelay: '0.1s'}} />
              <span className={`text-white text-2xl md:text-5xl lg:text-7xl font-black tracking-wider transition-all duration-700 ${introStep >= 2 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'}`} style={{transitionDelay: '0.15s'}}>
                SERVICE
              </span>
            </div>
            {/* Line 2 */}
            <div className="flex items-center justify-center gap-2 md:gap-4 mb-2 md:mb-4">
              <span className={`text-white text-2xl md:text-5xl lg:text-7xl font-black tracking-wider transition-all duration-700 ${introStep >= 2 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'}`} style={{transitionDelay: '0.3s'}}>
                INSPIRED BY
              </span>
              <div className={`w-20 md:w-32 lg:w-40 h-10 md:h-16 lg:h-20 bg-gray-700 rounded overflow-hidden transition-all duration-700 ${introStep >= 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`} style={{transitionDelay: '0.35s'}}>
                <img src="/momentum_foundation/images/momentum-building.png" alt="" className="w-full h-full object-cover" />
              </div>
            </div>
            {/* Line 3 */}
            <div className="flex items-center justify-center gap-2 md:gap-4">
              <div className={`w-20 md:w-32 lg:w-40 h-10 md:h-16 lg:h-20 bg-gray-700 rounded overflow-hidden transition-all duration-700 ${introStep >= 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`} style={{transitionDelay: '0.4s'}}>
                <img src="/momentum_foundation/images/food-distribution.png" alt="" className="w-full h-full object-cover" />
              </div>
              <span className={`text-white text-3xl md:text-6xl lg:text-8xl font-black tracking-wider transition-all duration-700 ${introStep >= 2 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'}`} style={{transitionDelay: '0.45s'}}>
                PRIMECORE
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <main className={`transition-opacity duration-1000 ${showIntro ? 'opacity-0' : 'opacity-100'}`}>

        {/* Section 1: 히어로 슬라이드 */}
        <section className="relative h-screen overflow-hidden">
          {/* 슬라이드 배경 */}
          {heroSlides.map((slide, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 transition-opacity duration-1000 ${currentSlide === idx ? 'opacity-100' : 'opacity-0'}`}
            >
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              >
                <source src={slide.video} type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30" />
            </div>
          ))}

          {/* 슬라이드 텍스트 */}
          <div className="absolute inset-0 flex items-end pb-32 md:pb-40">
            <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
              {heroSlides.map((slide, idx) => (
                <div
                  key={idx}
                  className={`transition-all duration-700 ${currentSlide === idx ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 absolute'}`}
                >
                  {currentSlide === idx && (
                    <>
                      <h1 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold leading-relaxed mb-4 whitespace-pre-line">
                        {slide.title}
                      </h1>
                      {slide.subtitle && (
                        <p className="text-white/70 text-sm md:text-base lg:text-lg whitespace-pre-line">
                          {slide.subtitle}
                        </p>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 슬라이드 컨트롤 */}
          <div className="absolute bottom-8 left-0 right-0 z-20">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
              <div className="flex items-center justify-between">
                {/* 진행 표시 */}
                <div className="flex items-center gap-3 md:gap-4">
                  <span className="text-white text-xl md:text-2xl font-bold">
                    {String(currentSlide + 1).padStart(2, '0')}
                  </span>
                  <div className="w-24 md:w-40 h-[2px] bg-white/30 relative">
                    <div
                      className="absolute top-0 left-0 h-full bg-white transition-all duration-500"
                      style={{ width: `${((currentSlide + 1) / heroSlides.length) * 100}%` }}
                    />
                  </div>
                  <span className="text-white/50 text-base md:text-lg">
                    {String(heroSlides.length).padStart(2, '0')}
                  </span>
                </div>

                {/* 좌우 버튼 */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setCurrentSlide(prev => prev === 0 ? heroSlides.length - 1 : prev - 1)}
                    className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center border border-white/40 text-white hover:bg-white hover:text-black transition-all duration-300"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setCurrentSlide(prev => prev === heroSlides.length - 1 ? 0 : prev + 1)}
                    className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center border border-white/40 text-white hover:bg-white hover:text-black transition-all duration-300"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: What We Do */}
        <section className="py-20 md:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-12 md:mb-16">
            <p className="text-green-600 text-sm font-medium tracking-wider mb-3">What We Do</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
              <span className="text-gray-400 block text-lg md:text-xl font-normal mb-2">
                {language === 'ko' ? '프라임코어이 제안하는' : 'PRIMECORE presents'}
              </span>
              {language === 'ko' ? '새로운 비즈니스 가치' : 'New Business Value'}
            </h2>
          </div>

          {/* 카테고리 플렉스 박스 */}
          <div className="relative h-[500px] md:h-[600px] overflow-hidden">
            {/* 배경 이미지 */}
            {categories.map((cat, idx) => (
              <img
                key={idx}
                src={cat.image}
                alt=""
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${activeCategory === idx ? 'opacity-100' : 'opacity-0'}`}
              />
            ))}
            <div className="absolute inset-0 bg-black/50" />

            {/* 카테고리 리스트 */}
            <div className="absolute inset-0 flex">
              {categories.map((cat, idx) => (
                <div
                  key={idx}
                  className={`flex-1 border-r border-white/20 last:border-r-0 transition-all duration-500 cursor-pointer ${activeCategory === idx ? 'flex-[2]' : 'flex-1'}`}
                  onMouseEnter={() => setActiveCategory(idx)}
                >
                  <div className="h-full flex flex-col justify-end p-6 md:p-10">
                    <p className="text-white font-bold text-xl md:text-2xl mb-2">{cat.title}</p>
                    <p className="text-white/60 text-xs md:text-sm mb-4">{cat.titleEn}</p>
                    <p className={`text-white/80 text-sm whitespace-pre-line transition-all duration-500 ${activeCategory === idx ? 'opacity-100 max-h-40' : 'opacity-0 max-h-0 overflow-hidden'}`}>
                      {cat.desc}
                      <Link to={cat.link} className="inline-flex items-center justify-center w-8 h-8 bg-white text-black rounded-full ml-4 hover:bg-green-500 hover:text-white transition-colors">
                        <Plus className="w-4 h-4" />
                      </Link>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 3: Our Service */}
        <section className="py-20 md:py-32 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="mb-12 md:mb-16">
              <p className="text-green-600 text-sm font-medium tracking-wider mb-3">Our Service</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
                <span className="text-gray-400 block text-lg md:text-xl font-normal mb-2">
                  {language === 'ko' ? '고객의 성공을 위한' : 'For your success'}
                </span>
                {language === 'ko' ? '프라임코어의 서비스' : "PRIMECORE's Service"}
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* 메인 서비스 카드 */}
              <div className="relative aspect-[4/3] md:row-span-2 bg-gray-900 overflow-hidden group">
                <img src={services[0].image} alt="" className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <p className="text-white text-2xl md:text-3xl font-bold mb-2">
                    {language === 'ko' ? '나에게 꼭 맞는' : 'Find the right'}
                    <br />
                    {language === 'ko' ? '프라임코어 서비스는?' : 'PRIMECORE service'}
                  </p>
                  <p className="text-white/70 text-sm mb-4">
                    {language === 'ko' ? '비즈니스에 맞춘 최적의 프라임코어 솔루션!' : 'Optimal PRIMECORE solution for your business!'}
                  </p>
                  <Link to="/about/intro" className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 text-sm font-medium hover:bg-green-700 transition-colors">
                    {language === 'ko' ? '서비스 찾아보기' : 'Find Service'}
                    <Plus className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* 서브 서비스 카드들 */}
              <div className="bg-green-600 p-6 md:p-8 flex flex-col justify-between min-h-[200px]">
                <div>
                  <p className="text-white text-xl font-bold mb-2">{language === 'ko' ? '사업 문의' : 'Business Inquiry'}</p>
                  <p className="text-white/80 text-sm">{language === 'ko' ? '간편하게 문의하고, 빠른 답변을 받아보세요.' : 'Inquire easily and get quick responses.'}</p>
                </div>
                <Link to="/contact/inquiry" className="self-end text-white text-sm hover:underline">view more</Link>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow">
                  <p className="text-gray-900 font-bold text-sm md:text-base mb-2">{language === 'ko' ? '오시는 길' : 'Location'}</p>
                  <p className="text-gray-500 text-xs mb-4">{language === 'ko' ? '위치 안내' : 'How to visit'}</p>
                  <Link to="/contact/location" className="text-gray-400 text-xs hover:text-green-600">view more</Link>
                </div>
                <div className="bg-white p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow">
                  <p className="text-gray-900 font-bold text-sm md:text-base mb-2">{language === 'ko' ? '채용 정보' : 'Careers'}</p>
                  <p className="text-gray-500 text-xs mb-4">{language === 'ko' ? '인재 채용' : 'Join our team'}</p>
                  <Link to="/careers/jobs" className="text-gray-400 text-xs hover:text-green-600">view more</Link>
                </div>
                <div className="bg-white p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow">
                  <p className="text-gray-900 font-bold text-sm md:text-base mb-2">{language === 'ko' ? '연락처' : 'Contact'}</p>
                  <p className="text-gray-500 text-xs mb-4">{language === 'ko' ? '담당자 안내' : 'Contact us'}</p>
                  <Link to="/contact/departments" className="text-gray-400 text-xs hover:text-green-600">view more</Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: The Best of PRIMECORE */}
        <section className="py-20 md:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-12">
            <p className="text-green-600 text-sm font-medium tracking-wider mb-3">The Best of PRIMECORE</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              <span className="text-gray-400 block text-lg md:text-xl font-normal mb-2">
                {language === 'ko' ? '프라임코어의 대표 서비스' : "PRIMECORE's Best Services"}
              </span>
            </h2>
          </div>

          {/* 제품 슬라이드 */}
          <div className="overflow-x-auto pb-8 scrollbar-hide">
            <div className="flex gap-6 px-6 lg:px-12 min-w-max">
              {bestProducts.map((product, idx) => (
                <Link
                  key={idx}
                  to={product.link}
                  className="group relative w-72 md:w-80 flex-shrink-0"
                >
                  <div className="aspect-[3/4] overflow-hidden bg-gray-100 mb-4">
                    <img src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <p className="text-gray-900 font-bold text-lg">{product.title}</p>
                  <div className="mt-4 inline-flex items-center gap-2 text-sm text-gray-500 group-hover:text-green-600 transition-colors">
                    view more
                    <Plus className="w-4 h-4" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Section 5: PR Center */}
        <section className="py-20 md:py-32 bg-gray-900">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-12">
            <p className="text-green-400 text-sm font-medium tracking-wider mb-3">PR Center</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              <span className="text-gray-500 block text-lg md:text-xl font-normal mb-2">
                {language === 'ko' ? '한눈에 보는 프라임코어 소식' : 'PRIMECORE News at a Glance'}
              </span>
            </h2>
            <p className="text-gray-400 mt-4">
              {language === 'ko' ? '프라임코어의 최신 소식과 정보를 확인하세요.' : 'Check out the latest news and information.'}
            </p>
          </div>

          {/* 뉴스 슬라이드 */}
          <div className="overflow-x-auto pb-8 scrollbar-hide">
            <div className="flex gap-6 px-6 lg:px-12 min-w-max">
              {newsItems.map((news, idx) => (
                <div key={idx} className="group w-80 md:w-96 flex-shrink-0">
                  <div className="relative aspect-[16/10] overflow-hidden mb-4">
                    <div className="absolute top-4 left-4 text-white text-4xl font-bold opacity-50">
                      {String(idx + 1).padStart(2, '0')}
                    </div>
                    <img src={news.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <p className="text-white font-bold text-lg mb-2 line-clamp-2">{news.title}</p>
                  <p className="text-gray-400 text-sm mb-3 line-clamp-2">{news.desc}</p>
                  <p className="text-gray-500 text-sm">{news.date}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 6: SNS */}
        <section className="py-20 md:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-12 text-center">
            <p className="text-green-600 text-sm font-medium tracking-wider mb-3">PRIMECORE SNS</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              <span className="text-gray-400 block text-lg md:text-xl font-normal mb-2">
                {language === 'ko' ? '프라임코어과 함께하는 이야기' : 'Stories with PRIMECORE'}
              </span>
            </h2>
          </div>

          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1,2,3,4].map((_, idx) => (
                <a key={idx} href="#" className="group relative aspect-square overflow-hidden bg-gray-100">
                  <img src={`/momentum_foundation/images/${idx === 0 ? 'momentum-building' : idx === 1 ? 'food-distribution' : idx === 2 ? 'meat-restaurant' : 'fm-service'}.png`} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white text-sm">{language === 'ko' ? '자세히 보기' : 'View More'}</span>
                  </div>
                </a>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link to="/news/company" className="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-4 font-medium hover:bg-green-700 transition-colors">
                view more
                <Plus className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />

      {/* 팝업 */}
      {showPopup && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50">
          <div className="bg-white w-[90%] max-w-md shadow-2xl">
            <div className="bg-green-600 text-white py-4 px-6 font-bold">
              {language === 'ko' ? '프라임코어에 오신 것을 환영합니다' : 'Welcome to PRIMECORE'}
            </div>
            <div className="p-6">
              <img src="/momentum_foundation/images/momentum-building.png" alt="" className="w-full aspect-video object-cover mb-4" />
              <p className="text-gray-600 text-sm">
                {language === 'ko' ? '고객의 가치를 높이는 식자재 & 서비스 브랜드, 프라임코어입니다.' : 'PRIMECORE - Food & Service brand that enhances customer value.'}
              </p>
            </div>
            <div className="flex border-t">
              <button onClick={hidePopupToday} className="flex-1 py-4 text-sm text-gray-600 hover:bg-gray-50">
                {language === 'ko' ? '오늘 열지 않기' : "Don't show today"}
              </button>
              <button onClick={() => setShowPopup(false)} className="flex-1 py-4 text-sm text-white bg-gray-800 hover:bg-gray-900">
                {language === 'ko' ? '닫기' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick 메뉴 */}
      <div className="fixed right-4 bottom-4 md:right-8 md:bottom-8 z-40 flex flex-col gap-2">
        <Link to="/contact/inquiry" className="w-14 h-14 md:w-16 md:h-16 bg-green-600 text-white flex flex-col items-center justify-center text-xs hover:bg-green-700 transition-colors shadow-lg">
          <span className="text-lg mb-1">📞</span>
          {language === 'ko' ? '문의' : 'Inquiry'}
        </Link>
        <Link to="/contact/location" className="w-14 h-14 md:w-16 md:h-16 bg-white text-gray-800 flex flex-col items-center justify-center text-xs hover:bg-gray-100 transition-colors shadow-lg border">
          <span className="text-lg mb-1">📍</span>
          {language === 'ko' ? '오시는길' : 'Location'}
        </Link>
        {showTopButton && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-14 h-14 md:w-16 md:h-16 bg-gray-800 text-white flex items-center justify-center hover:bg-gray-900 transition-colors shadow-lg"
          >
            <ArrowUp className="w-6 h-6" />
          </button>
        )}
      </div>
    </div>
  );
};

export default IndexNew;
