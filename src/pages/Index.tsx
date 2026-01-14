import { useEffect, useState, useRef } from "react";
import Navigation from "@/components/Navigation";
import { ArrowUp, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const Index = () => {
  // States
  const [showIntro, setShowIntro] = useState(true);
  const [introStep, setIntroStep] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [showTopButton, setShowTopButton] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [videoScale, setVideoScale] = useState(1);
  const [videoOpacity, setVideoOpacity] = useState(0);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const [currentProductSlide, setCurrentProductSlide] = useState(0);
  const { language } = useLanguage();

  // Refs
  const heroRef = useRef<HTMLDivElement>(null);
  const videoSectionRef = useRef<HTMLDivElement>(null);
  const expandVideoRef = useRef<HTMLVideoElement>(null);
  const sectionRefs = {
    whatwedo: useRef<HTMLDivElement>(null),
    service: useRef<HTMLDivElement>(null),
    best: useRef<HTMLDivElement>(null),
    news: useRef<HTMLDivElement>(null),
    sns: useRef<HTMLDivElement>(null),
  };

  // 동영상 URLs (Pixabay 무료 동영상)
  const heroVideos = [
    "https://cdn.pixabay.com/video/2020/05/25/40130-424930032_large.mp4",
    "https://cdn.pixabay.com/video/2019/06/18/24559-343612498_large.mp4",
    "https://cdn.pixabay.com/video/2021/02/11/64610-511233026_large.mp4",
  ];

  const expandVideo = "https://cdn.pixabay.com/video/2016/09/01/4766-181939873_large.mp4";

  // 다국어 텍스트
  const t = {
    intro: {
      line1: language === 'ko' ? '가치를 창출하는' : 'Creating Value',
      line2: language === 'ko' ? '모멘텀' : 'MOMENTUM',
    },
    popup: {
      title: language === 'ko' ? '모멘텀에 오신 것을 환영합니다' : 'Welcome to MOMENTUM',
      desc: language === 'ko'
        ? '고객의 가치를 높이는 식자재 & 서비스 브랜드, 모멘텀입니다.'
        : 'MOMENTUM - Food & Service brand that enhances customer value.',
      hideToday: language === 'ko' ? '오늘 하루 보지 않기' : "Don't show today",
      close: language === 'ko' ? '닫기' : 'Close',
    },
    hero: {
      slides: [
        {
          tag: 'FOOD BUSINESS',
          title: language === 'ko' ? '식탁의 가치를\n새롭게 창조합니다' : 'Creating New Value\nfor Your Table',
          desc: language === 'ko'
            ? '신선한 식자재와 전문 서비스로\n고객의 비즈니스를 성공으로 이끕니다'
            : 'Leading your business to success\nwith fresh ingredients and expert services',
        },
        {
          tag: 'FRANCHISE',
          title: language === 'ko' ? '함께 성장하는\n파트너십' : 'Partnership\nGrowing Together',
          desc: language === 'ko'
            ? '검증된 브랜드와 체계적인 시스템으로\n성공적인 창업을 지원합니다'
            : 'Supporting successful startups\nwith proven brands and systems',
        },
        {
          tag: 'FM SERVICE',
          title: language === 'ko' ? '공간의 가치를\n높이다' : 'Elevating\nSpace Value',
          desc: language === 'ko'
            ? '전문 시설관리 서비스로\n최적의 환경을 제공합니다'
            : 'Providing optimal environments\nwith professional FM services',
        },
      ],
    },
    videoSection: {
      title: language === 'ko' ? '고객과 함께\n성장합니다' : 'Growing Together\nWith Customers',
      desc: language === 'ko'
        ? '30년의 노하우로, 식탁을 넘어\n공간과 서비스의 가치를 디자인합니다'
        : 'With 30 years of know-how,\nwe design the value of space and service',
    },
    whatwedo: {
      title: 'What We Do',
      items: [
        {
          title: language === 'ko' ? '식자재 유통' : 'Food Distribution',
          subtitle: 'Food Business',
          desc: language === 'ko' ? '신선하고 품질 좋은 식자재를 안정적으로 공급합니다.' : 'Stably supplying fresh, high-quality ingredients.',
          link: '/business/food',
          image: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=600',
        },
        {
          title: language === 'ko' ? '프랜차이즈' : 'Franchise',
          subtitle: 'Franchise Business',
          desc: language === 'ko' ? '검증된 브랜드로 성공적인 창업을 지원합니다.' : 'Supporting successful startups with proven brands.',
          link: '/business/franchise',
          image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600',
        },
        {
          title: language === 'ko' ? '시설관리' : 'FM Service',
          subtitle: 'Facility Management',
          desc: language === 'ko' ? '전문적인 시설관리로 최적의 환경을 제공합니다.' : 'Providing optimal environments with professional management.',
          link: '/business/fm',
          image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600',
        },
        {
          title: language === 'ko' ? '컨설팅' : 'Consulting',
          subtitle: 'Business Consulting',
          desc: language === 'ko' ? '맞춤형 비즈니스 솔루션을 제안합니다.' : 'Proposing customized business solutions.',
          link: '/contact/inquiry',
          image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600',
        },
      ],
    },
    service: {
      title: 'Our Service',
      items: [
        { title: language === 'ko' ? '회사 소개' : 'About Us', link: '/about/intro', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=300' },
        { title: language === 'ko' ? '사업 문의' : 'Business Inquiry', link: '/contact/inquiry', image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=300' },
        { title: language === 'ko' ? '오시는 길' : 'Location', link: '/contact/location', image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=300' },
        { title: language === 'ko' ? '채용 정보' : 'Careers', link: '/careers/jobs', image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=300' },
        { title: language === 'ko' ? '자주 묻는 질문' : 'FAQ', link: '/contact/departments', image: 'https://images.unsplash.com/photo-1553028826-f4804a6dba3b?w=300' },
      ],
    },
    best: {
      title: 'The Best of MOMENTUM',
      items: [
        { title: language === 'ko' ? '프리미엄 식자재' : 'Premium Ingredients', image: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=500' },
        { title: language === 'ko' ? '프랜차이즈 브랜드' : 'Franchise Brand', image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=500' },
        { title: language === 'ko' ? 'FM 서비스' : 'FM Service', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=500' },
        { title: language === 'ko' ? '물류 시스템' : 'Logistics System', image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=500' },
        { title: language === 'ko' ? '고객 지원' : 'Customer Support', image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=500' },
      ],
    },
    news: {
      title: 'PR Center',
      items: [
        { title: language === 'ko' ? '모멘텀, 2025년 신규 사업 확장 계획 발표' : 'MOMENTUM announces 2025 expansion plan', date: '2025.01.10' },
        { title: language === 'ko' ? '프랜차이즈 가맹점 100호점 돌파' : 'Franchise reaches 100th store', date: '2025.01.05' },
        { title: language === 'ko' ? 'FM 서비스 품질 인증 획득' : 'FM Service certification obtained', date: '2024.12.20' },
        { title: language === 'ko' ? '연말 고객 감사 이벤트 진행' : 'Year-end appreciation event', date: '2024.12.15' },
      ],
    },
    sns: { title: 'MOMENTUM SNS' },
    footer: {
      company: language === 'ko' ? '(주)모멘텀' : 'MOMENTUM Co., Ltd.',
      address: language === 'ko' ? '서울 강남구 선릉로90길 14(대치동, 모멘텀빌딩)' : '14, Seolleung-ro 90-gil, Gangnam-gu, Seoul',
      tel: language === 'ko' ? '대표번호: 02-6423-4122' : 'Tel: 02-6423-4122',
      fax: language === 'ko' ? '팩스: 02-6423-4123' : 'Fax: 02-6423-4123',
      links: {
        about: language === 'ko' ? '회사소개' : 'About',
        business: language === 'ko' ? '사업소개' : 'Business',
        careers: language === 'ko' ? '채용' : 'Careers',
        contact: language === 'ko' ? '문의' : 'Contact',
      },
    },
    viewMore: language === 'ko' ? '자세히 보기' : 'view more',
  };

  const snsItems = [
    'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400',
    'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400',
    'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400',
    'https://images.unsplash.com/photo-1553028826-f4804a6dba3b?w=400',
    'https://images.unsplash.com/photo-1560472355-536de3962603?w=400',
    'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=400',
    'https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=400',
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400',
  ];

  // 인트로 애니메이션
  useEffect(() => {
    if (showIntro) {
      const timer1 = setTimeout(() => setIntroStep(1), 300);
      const timer2 = setTimeout(() => setIntroStep(2), 800);
      const timer3 = setTimeout(() => setIntroStep(3), 1500);
      const timer4 = setTimeout(() => {
        setShowIntro(false);
        // 팝업 체크
        const hideUntil = localStorage.getItem('popupHideUntil');
        if (!hideUntil || Date.now() > parseInt(hideUntil)) {
          setTimeout(() => setShowPopup(true), 500);
        }
      }, 2500);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
        clearTimeout(timer4);
      };
    }
  }, [showIntro]);

  // 스크롤 & 비디오 확대 효과
  useEffect(() => {
    const handleScroll = () => {
      setShowTopButton(window.scrollY > 300);

      // Video section 확대 효과
      if (videoSectionRef.current) {
        const rect = videoSectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // 섹션이 뷰포트에 들어오면 확대 시작
        if (rect.top < windowHeight && rect.bottom > 0) {
          const progress = Math.min(1, Math.max(0, 1 - rect.top / windowHeight));
          setScrollProgress(progress);

          // 0.7 -> 1.0 스케일 (0.7에서 시작해서 1.0까지)
          const scale = 0.7 + (progress * 0.3);
          setVideoScale(scale);

          // 투명도: 0 -> 1
          setVideoOpacity(progress);

          // 비디오 재생 제어
          if (expandVideoRef.current) {
            if (progress > 0.3) {
              expandVideoRef.current.play().catch(() => {});
            }
          }
        }
      }
    };

    // Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1 }
    );

    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  // Hero 슬라이드 자동 전환
  useEffect(() => {
    if (!showIntro) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % 3);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [showIntro]);

  const hidePopupToday = () => {
    localStorage.setItem('popupHideUntil', (Date.now() + 86400000).toString());
    setShowPopup(false);
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* 인트로 애니메이션 오버레이 */}
      {showIntro && (
        <div className="fixed inset-0 z-[200] bg-black flex items-center justify-center">
          <div className="text-center">
            {/* Line 1 */}
            <div className={`overflow-hidden mb-2 transition-all duration-700 ${introStep >= 1 ? 'opacity-100' : 'opacity-0'}`}>
              <h1
                className={`text-white text-3xl md:text-5xl lg:text-6xl font-light tracking-wider transition-transform duration-700 ${
                  introStep >= 1 ? 'translate-y-0' : 'translate-y-full'
                }`}
              >
                {t.intro.line1}
              </h1>
            </div>
            {/* Line 2 - Brand name */}
            <div className={`overflow-hidden transition-all duration-700 ${introStep >= 2 ? 'opacity-100' : 'opacity-0'}`}>
              <h1
                className={`text-white text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight transition-transform duration-700 ${
                  introStep >= 2 ? 'translate-y-0' : 'translate-y-full'
                }`}
              >
                {t.intro.line2}
              </h1>
            </div>
            {/* Decorative line */}
            <div className={`mt-8 mx-auto transition-all duration-1000 ${introStep >= 3 ? 'w-24 opacity-100' : 'w-0 opacity-0'}`}>
              <div className="h-px bg-white"></div>
            </div>
          </div>
        </div>
      )}

      <Navigation />

      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60" onClick={() => setShowPopup(false)} />
          <div className="relative bg-white max-w-md w-[90%] p-8 md:p-10 shadow-2xl animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">{t.popup.title}</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">{t.popup.desc}</p>
            <div className="flex gap-3">
              <button onClick={hidePopupToday} className="flex-1 py-3 text-sm text-gray-600 border border-gray-300 hover:bg-gray-50 transition-colors">
                {t.popup.hideToday}
              </button>
              <button onClick={() => setShowPopup(false)} className="flex-1 py-3 text-sm text-white bg-gray-900 hover:bg-gray-800 transition-colors">
                {t.popup.close}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section - 3개 동영상 배너 */}
      <section ref={heroRef} className="relative h-screen overflow-hidden">
        {/* 동영상 배경들 */}
        {heroVideos.map((video, idx) => (
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
              <source src={video} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/40" />
          </div>
        ))}

        {/* Hero 콘텐츠 */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
            {t.hero.slides.map((slide, idx) => (
              <div
                key={idx}
                className={`transition-all duration-700 ${
                  currentSlide === idx ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 absolute pointer-events-none'
                }`}
              >
                {currentSlide === idx && (
                  <>
                    <span className="inline-block px-5 py-2 bg-white/10 backdrop-blur-md text-white text-sm tracking-[0.2em] mb-6 border border-white/20">
                      {slide.tag}
                    </span>
                    <h1 className="text-white text-4xl md:text-5xl lg:text-7xl font-bold leading-[1.1] mb-6 whitespace-pre-line">
                      {slide.title}
                    </h1>
                    <p className="text-white/80 text-lg md:text-xl leading-relaxed whitespace-pre-line max-w-xl">
                      {slide.desc}
                    </p>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Hero 하단 탭 네비게이션 */}
        <div className="absolute bottom-0 left-0 right-0 z-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex">
              {t.hero.slides.map((slide, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`flex-1 py-6 text-sm font-medium tracking-[0.15em] transition-all duration-300 border-t-2 ${
                    currentSlide === idx
                      ? 'bg-white text-gray-900 border-gray-900'
                      : 'bg-black/40 backdrop-blur-sm text-white/80 border-transparent hover:bg-black/50'
                  }`}
                >
                  {slide.tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 슬라이드 인디케이터 */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-3">
          {[0, 1, 2].map((idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === idx ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      </section>

      {/* 스크롤 시 확대되는 동영상 섹션 */}
      <section
        ref={videoSectionRef}
        className="relative h-[150vh] bg-black"
      >
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
          {/* 확대되는 비디오 */}
          <div
            className="relative w-full h-full transition-transform duration-100"
            style={{
              transform: `scale(${videoScale})`,
              opacity: videoOpacity,
            }}
          >
            <video
              ref={expandVideoRef}
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            >
              <source src={expandVideo} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/30" />
          </div>

          {/* 텍스트 오버레이 */}
          <div
            className="absolute inset-0 flex items-center justify-center text-center transition-opacity duration-500"
            style={{ opacity: videoOpacity }}
          >
            <div className="max-w-4xl px-6">
              <h2 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 whitespace-pre-line">
                {t.videoSection.title}
              </h2>
              <p className="text-white/80 text-lg md:text-xl leading-relaxed whitespace-pre-line">
                {t.videoSection.desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section
        id="whatwedo"
        ref={sectionRefs.whatwedo}
        className={`py-24 md:py-32 bg-white transition-all duration-1000 ${
          visibleSections.has('whatwedo') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-16">{t.whatwedo.title}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.whatwedo.items.map((item, idx) => (
              <Link key={idx} to={item.link} className="group">
                <div className="aspect-[4/3] overflow-hidden mb-5">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <p className="text-sm text-gray-500 mb-1">{item.subtitle}</p>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-600 transition-colors">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{item.desc}</p>
                <span className="inline-flex items-center text-sm text-gray-500 group-hover:text-gray-900 transition-colors">
                  {t.viewMore} <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Our Service Section */}
      <section
        id="service"
        ref={sectionRefs.service}
        className={`py-24 md:py-32 bg-gray-50 transition-all duration-1000 ${
          visibleSections.has('service') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-16">{t.service.title}</h2>
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="relative aspect-[4/3] lg:aspect-auto lg:row-span-2 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800" alt="Service" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <h3 className="text-white text-3xl font-bold mb-2">MOMENTUM</h3>
                <p className="text-white/80">{language === 'ko' ? '고객의 가치를 높이는 파트너' : 'Partner enhancing customer value'}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              {t.service.items.map((item, idx) => (
                <Link key={idx} to={item.link} className="group bg-white p-4 hover:shadow-lg transition-shadow">
                  <div className="aspect-video overflow-hidden mb-3">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <h4 className="font-medium text-gray-900 text-sm mb-1">{item.title}</h4>
                  <span className="text-xs text-gray-500 group-hover:text-gray-900 transition-colors flex items-center">
                    {t.viewMore} <ArrowRight className="w-3 h-3 ml-1" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* The Best of MOMENTUM */}
      <section
        id="best"
        ref={sectionRefs.best}
        className={`py-24 md:py-32 bg-white transition-all duration-1000 ${
          visibleSections.has('best') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-16">{t.best.title}</h2>
          <div className="relative">
            <button onClick={() => setCurrentProductSlide(Math.max(0, currentProductSlide - 1))} className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white shadow-lg flex items-center justify-center hover:bg-gray-50" disabled={currentProductSlide === 0}>
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button onClick={() => setCurrentProductSlide(Math.min(t.best.items.length - 3, currentProductSlide + 1))} className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white shadow-lg flex items-center justify-center hover:bg-gray-50">
              <ChevronRight className="w-6 h-6" />
            </button>
            <div className="overflow-hidden">
              <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${currentProductSlide * (100 / 3)}%)` }}>
                {t.best.items.map((item, idx) => (
                  <div key={idx} className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 px-3">
                    <div className="group cursor-pointer">
                      <div className="aspect-[3/4] overflow-hidden mb-4">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                      <h4 className="font-medium text-gray-900 mb-2">{item.title}</h4>
                      <span className="text-sm text-gray-500 group-hover:text-gray-900 transition-colors flex items-center">
                        {t.viewMore} <ArrowRight className="w-4 h-4 ml-1" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PR Center */}
      <section
        id="news"
        ref={sectionRefs.news}
        className={`py-24 md:py-32 bg-gray-50 transition-all duration-1000 ${
          visibleSections.has('news') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{t.news.title}</h2>
            <Link to="/news/company" className="text-sm text-gray-500 hover:text-gray-900 flex items-center">
              {t.viewMore} <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.news.items.map((item, idx) => (
              <Link key={idx} to="/news/company" className="group bg-white p-6 hover:shadow-lg transition-shadow">
                <p className="text-xs text-gray-400 mb-3">{item.date}</p>
                <h4 className="font-medium text-gray-900 leading-relaxed group-hover:text-gray-600 transition-colors line-clamp-2">{item.title}</h4>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SNS Section */}
      <section
        id="sns"
        ref={sectionRefs.sns}
        className={`py-24 md:py-32 bg-white transition-all duration-1000 ${
          visibleSections.has('sns') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-16">{t.sns.title}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {snsItems.map((img, idx) => (
              <div key={idx} className="group relative aspect-square overflow-hidden cursor-pointer">
                <img src={img} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-16 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 gap-8 mb-8 pb-8 border-b border-gray-300">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{t.footer.company}</h3>
              <div className="space-y-1 text-sm text-gray-600">
                <p>{t.footer.address}</p>
                <p>{t.footer.tel} | {t.footer.fax}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-6 md:justify-end">
              <Link to="/about/intro" className="text-gray-600 hover:text-gray-900 transition-colors">{t.footer.links.about}</Link>
              <Link to="/business/food" className="text-gray-600 hover:text-gray-900 transition-colors">{t.footer.links.business}</Link>
              <Link to="/careers/jobs" className="text-gray-600 hover:text-gray-900 transition-colors">{t.footer.links.careers}</Link>
              <Link to="/contact/inquiry" className="text-gray-600 hover:text-gray-900 transition-colors">{t.footer.links.contact}</Link>
            </div>
          </div>
          <p className="text-xs text-gray-400">&copy; 2025 MOMENTUM Co., Ltd. All Rights Reserved.</p>
        </div>
      </footer>

      {/* Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-8 right-8 z-50 w-12 h-12 bg-gray-900 text-white rounded-full shadow-lg flex flex-col items-center justify-center transition-all duration-300 hover:bg-gray-800 ${
          showTopButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <ArrowUp className="w-4 h-4" />
        <span className="text-[9px]">TOP</span>
      </button>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Index;
