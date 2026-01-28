import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const IndexHaatz2 = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [introStep, setIntroStep] = useState(0);
  const [activeCategory, setActiveCategory] = useState(0);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [videoExpanded, setVideoExpanded] = useState(false);
  const { language } = useLanguage();

  const sectionRef = useRef<HTMLDivElement>(null);
  const bx2Ref = useRef<HTMLDivElement>(null);
  const bx3Ref = useRef<HTMLDivElement>(null);

  // 인트로 애니메이션
  useEffect(() => {
    const timer1 = setTimeout(() => setIntroStep(1), 300);
    const timer2 = setTimeout(() => setIntroStep(2), 800);
    const timer3 = setTimeout(() => setShowIntro(false), 2500);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  // GSAP ScrollTrigger 효과 - 영상 확대
  useEffect(() => {
    if (showIntro) return;

    const loadGSAP = async () => {
      try {
        const gsapModule = await import('gsap');
        const scrollTriggerModule = await import('gsap/ScrollTrigger');

        const gsap = gsapModule.default;
        const ScrollTrigger = scrollTriggerModule.ScrollTrigger;

        gsap.registerPlugin(ScrollTrigger);

        if (!sectionRef.current || !bx2Ref.current || !bx3Ref.current) return;

        // 초기 상태: 비디오는 작은 원형으로 시작
        gsap.set(bx3Ref.current, {
          clipPath: 'inset(35% 30% 35% 30% round 100px)',
          opacity: 0,
        });

        // 스크롤 애니메이션
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=250%',
            scrub: 1,
            pin: true,
            onUpdate: (self) => {
              setHeaderVisible(self.progress > 0.5);
              setVideoExpanded(self.progress > 0.15);
            }
          }
        });

        // 1. 텍스트 페이드아웃
        tl.to(bx2Ref.current, {
          opacity: 0,
          scale: 0.95,
          duration: 0.2,
        });

        // 2. 비디오 확대
        tl.to(bx3Ref.current, {
          opacity: 1,
          clipPath: 'inset(0% 0% 0% 0% round 0px)',
          duration: 0.4,
        }, '-=0.1');

        // 3. 전체화면 유지
        tl.to({}, { duration: 0.3 });

        // 4. 슬라이드 전환 시간
        tl.to({}, { duration: 0.3 });

      } catch (error) {
        console.log('GSAP not loaded, fallback mode');
        setHeaderVisible(true);
      }
    };

    loadGSAP();
  }, [showIntro]);

  // 슬라이드 자동 전환
  useEffect(() => {
    if (!videoExpanded) return;
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [videoExpanded]);

  // 슬라이드 데이터
  const slides = [
    {
      video: "/momentum_foundation/videos/food.mp4",
      number: "01",
      headline: language === 'ko' ? '식탁의 가치를 더하다' : 'Adding Value to Your Table',
      desc: language === 'ko' ? '보이지 않는 정직함이\n식탁 위의 신뢰로 이어집니다' : 'Invisible honesty\nleads to trust on your table'
    },
    {
      video: "/momentum_foundation/videos/hero.mp4",
      number: "02",
      headline: language === 'ko' ? '자연의 숨을 가치로 잇다' : 'Connecting Nature to Value',
      desc: language === 'ko' ? '자연의 신선한 활력을\n일상의 가치로 이어갑니다' : 'Fresh vitality of nature\nconnects to daily value'
    },
    {
      video: "/momentum_foundation/videos/franchise.mp4",
      number: "03",
      headline: language === 'ko' ? '상생의 가치를 더하다' : 'Adding Value of Coexistence',
      desc: language === 'ko' ? '내일을 여는 플랫폼\n파트너의 성공이 브랜드의 성공입니다' : 'Platform opening tomorrow\nPartner success is brand success'
    },
    {
      video: "/momentum_foundation/videos/fm.mp4",
      number: "04",
      headline: language === 'ko' ? '공간의 가치를 더하다' : 'Adding Value to Space',
      desc: language === 'ko' ? '공간은 기업의 자산\n전문 관리로 품격과 효율을 높입니다' : 'Space is corporate asset\nProfessional management enhances quality'
    }
  ];

  // 사업 분야
  const categories = [
    {
      title: language === 'ko' ? '식자재 유통' : 'Food Distribution',
      titleEn: 'Food Distribution',
      link: '/business/food',
      image: '/momentum_foundation/images/food_distribution.jpg'
    },
    {
      title: language === 'ko' ? '프랜차이즈' : 'Franchise',
      titleEn: 'Franchise',
      link: '/business/franchise',
      image: '/momentum_foundation/images/franchise_store.jpg'
    },
    {
      title: language === 'ko' ? 'FM 아웃소싱' : 'FM Outsourcing',
      titleEn: 'Facility Management',
      link: '/business/fm',
      image: '/momentum_foundation/images/fm_outsourcing_services_20251223_070231.png'
    }
  ];

  const t = {
    intro: {
      line1: language === 'ko' ? '가치를 창출하는' : 'Creating Value',
      line2: language === 'ko' ? '프라임코어' : 'PRIMECORE'
    },
    hero: {
      line1Left: language === 'ko' ? '식탁에서' : 'From Table',
      line1Right: language === 'ko' ? '시설까지' : 'To Facility',
      line2Left: language === 'ko' ? '일상의 가치를' : 'Daily Value',
      line3Right: language === 'ko' ? '더하다' : 'We Add'
    },
    final: {
      headline: language === 'ko' ? '가치에 가치를 더하다' : 'Adding Value to Value',
      subtitle: language === 'ko' ? '프라임코어가 제안하는 새로운 라이프스타일' : 'New Lifestyle Proposed by PRIMECORE'
    }
  };

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Pretendard', sans-serif" }}>
      {/* 헤더 */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'
        }`}
      >
        <Navigation />
      </div>

      {/* ========== 1. 인트로 화면 ========== */}
      <div
        className={`fixed inset-0 z-[60] bg-white flex items-center justify-center transition-all duration-1000 ${
          showIntro ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="text-center">
          {/* 가치를 창출하는 */}
          <p
            className={`text-xl md:text-2xl lg:text-3xl text-gray-500 mb-2 transition-all duration-700 ${
              introStep >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            {t.intro.line1}
          </p>
          {/* 모멘텀 + 이미지 */}
          <div className="flex items-center justify-center gap-4">
            <h1
              className={`text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 tracking-tight transition-all duration-700 ${
                introStep >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              {t.intro.line2}
            </h1>
            <div
              className={`w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full overflow-hidden transition-all duration-700 ${
                introStep >= 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
              }`}
            >
              <img
                src="/momentum_foundation/images/fruit_products_20251219_072051.png"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ========== 2. 메인 섹션 (히어로 + 영상 확대) ========== */}
      <section ref={sectionRef} className="relative h-screen overflow-hidden">

        {/* bx2: 텍스트 + 작은 이미지/영상 레이아웃 */}
        <div
          ref={bx2Ref}
          className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-white"
        >
          {/* 라인 1: 식탁에서 [영상] 시설까지 */}
          <div className="flex items-center gap-3 md:gap-5 mb-2 md:mb-3">
            <span className="text-4xl md:text-6xl lg:text-7xl font-black text-gray-900 tracking-tight">
              {t.hero.line1Left}
            </span>
            <div className="w-[100px] md:w-[160px] lg:w-[200px] h-[45px] md:h-[65px] lg:h-[80px] rounded-full overflow-hidden">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              >
                <source src="/momentum_foundation/videos/food.mp4" type="video/mp4" />
              </video>
            </div>
            <span className="text-4xl md:text-6xl lg:text-7xl font-black text-gray-900 tracking-tight">
              {t.hero.line1Right}
            </span>
          </div>

          {/* 라인 2: 일상의 가치를 [사진] */}
          <div className="flex items-center gap-3 md:gap-5 mb-2 md:mb-3 ml-8 md:ml-16">
            <span className="text-4xl md:text-6xl lg:text-7xl font-black text-gray-900 tracking-tight">
              {t.hero.line2Left}
            </span>
            <div className="w-[80px] md:w-[120px] lg:w-[150px] h-[50px] md:h-[70px] lg:h-[85px] rounded-[25px] md:rounded-[35px] overflow-hidden">
              <img
                src="/momentum_foundation/images/meat_products_20251219_072051.png"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* 라인 3: [사진] 더하다 */}
          <div className="flex items-center gap-3 md:gap-5 ml-16 md:ml-32">
            <div className="w-[80px] md:w-[120px] lg:w-[150px] h-[50px] md:h-[70px] lg:h-[85px] rounded-[25px] md:rounded-[35px] overflow-hidden">
              <img
                src="/momentum_foundation/images/fm_outsourcing_services_20251223_070231.png"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-4xl md:text-6xl lg:text-7xl font-black text-gray-900 tracking-tight">
              {t.hero.line3Right}
            </span>
          </div>

          {/* 스크롤 유도 */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce">
            <span className="text-gray-400 text-xs mb-2">SCROLL</span>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>

        {/* bx3: 전체화면 비디오 (영상 확대 인터랙션) */}
        <div
          ref={bx3Ref}
          className="absolute inset-0 z-20"
          style={{
            opacity: 0,
            clipPath: 'inset(35% 30% 35% 30% round 100px)',
          }}
        >
          {/* 비디오 슬라이드 */}
          {slides.map((slide, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                currentSlide === idx ? 'opacity-100' : 'opacity-0'
              }`}
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
            </div>
          ))}

          {/* 비디오 오버레이 */}
          <div className="absolute inset-0 bg-black/40" />

          {/* 슬라이드 텍스트 (영상 위 슬로건) */}
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12 w-full">
              {slides.map((slide, idx) => (
                <div
                  key={idx}
                  className={`transition-all duration-700 ${
                    currentSlide === idx ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 absolute'
                  }`}
                >
                  {currentSlide === idx && (
                    <>
                      {/* 슬라이드 번호 */}
                      <span className="text-white/50 text-sm md:text-base font-medium mb-4 block">
                        {slide.number}
                      </span>
                      {/* 헤드라인 */}
                      <h2 className="text-white text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
                        {slide.headline}
                      </h2>
                      {/* 설명 */}
                      <p className="text-white/80 text-lg md:text-xl lg:text-2xl whitespace-pre-line leading-relaxed">
                        {slide.desc}
                      </p>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 슬라이드 인디케이터 */}
          <div className="absolute bottom-8 left-0 right-0 z-30">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12">
              <div className="flex items-center gap-4">
                <span className="text-white text-xl md:text-2xl font-bold">
                  {String(currentSlide + 1).padStart(2, '0')}
                </span>
                <div className="flex-1 max-w-[200px] h-[2px] bg-white/30 relative">
                  <div
                    className="absolute top-0 left-0 h-full bg-white transition-all duration-500"
                    style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
                  />
                </div>
                <span className="text-white/50 text-lg">
                  {String(slides.length).padStart(2, '0')}
                </span>

                {/* 컨트롤 버튼 */}
                <div className="ml-auto flex gap-2">
                  <button
                    onClick={() => setCurrentSlide(prev => prev === 0 ? slides.length - 1 : prev - 1)}
                    className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center border border-white/40 text-white hover:bg-white hover:text-black transition-all"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setCurrentSlide(prev => prev === slides.length - 1 ? 0 : prev + 1)}
                    className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center border border-white/40 text-white hover:bg-white hover:text-black transition-all"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== 3. 사업 영역 선택 섹션 ========== */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 mb-12 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {t.final.headline}
          </h2>
          <p className="text-gray-500 text-lg md:text-xl">
            {t.final.subtitle}
          </p>
        </div>

        {/* 카테고리 플렉스 박스 */}
        <div className="relative h-[450px] md:h-[550px] lg:h-[650px] overflow-hidden">
          {categories.map((cat, idx) => (
            <img
              key={idx}
              src={cat.image}
              alt=""
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                activeCategory === idx ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}
          <div className="absolute inset-0 bg-black/50" />

          <div className="absolute inset-0 flex">
            {categories.map((cat, idx) => (
              <div
                key={idx}
                className={`flex-1 border-r border-white/20 last:border-r-0 transition-all duration-500 cursor-pointer ${
                  activeCategory === idx ? 'flex-[2]' : 'hover:bg-white/5'
                }`}
                onMouseEnter={() => setActiveCategory(idx)}
              >
                <div className="h-full flex flex-col justify-end p-6 md:p-10">
                  <p className="text-white font-bold text-xl md:text-2xl lg:text-3xl mb-1">
                    {cat.title}
                  </p>
                  <p className="text-white/60 text-xs md:text-sm mb-4">{cat.titleEn}</p>

                  <div className={`transition-all duration-500 overflow-hidden ${
                    activeCategory === idx ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    <Link
                      to={cat.link}
                      className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-white text-black rounded-full hover:bg-blue-500 hover:text-white transition-colors"
                    >
                      <span className="text-xl">+</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== 4. 서비스 안내 섹션 ========== */}
      <section className="py-20 md:py-32 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="mb-12">
            <p className="text-blue-600 text-sm font-medium mb-4">Our Service</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              {language === 'ko' ? '프라임코어의 파트너십' : 'PRIMECORE Partnership'}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* 메인 카드 */}
            <div className="relative aspect-[4/3] md:row-span-2 bg-gray-200 overflow-hidden group">
              <img
                src="/momentum_foundation/images/company_building_20251219_072052.png"
                alt=""
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <p className="text-white text-xl md:text-2xl font-bold mb-4">
                  {language === 'ko' ? '나에게 맞는 프라임코어 서비스는?' : 'Find your PRIMECORE service'}
                </p>
                <Link
                  to="/business/food"
                  className="inline-flex items-center gap-3 bg-blue-600 text-white px-6 py-3 text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  {language === 'ko' ? '서비스 찾기' : 'Find Service'}
                  <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-xs">+</span>
                </Link>
              </div>
            </div>

            {/* 문의 카드 */}
            <div className="bg-blue-600 p-8 flex flex-col justify-between min-h-[180px]">
              <div>
                <p className="text-white text-xl font-bold mb-2">
                  {language === 'ko' ? '사업 문의' : 'Business Inquiry'}
                </p>
                <p className="text-white/80 text-sm">
                  {language === 'ko' ? '빠른 답변을 받으세요' : 'Get quick response'}
                </p>
              </div>
              <Link to="/contact/inquiry" className="self-start text-white text-sm hover:underline">
                view more
              </Link>
            </div>

            {/* 하단 링크 */}
            <div className="grid grid-cols-3 gap-3">
              <Link to="/contact/location" className="bg-white p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow text-center">
                <p className="text-gray-900 font-bold text-sm">{language === 'ko' ? '오시는 길' : 'Location'}</p>
              </Link>
              <Link to="/contact/departments" className="bg-white p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow text-center">
                <p className="text-gray-900 font-bold text-sm">{language === 'ko' ? '부서 연락처' : 'Contacts'}</p>
              </Link>
              <Link to="/careers/jobs" className="bg-white p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow text-center">
                <p className="text-gray-900 font-bold text-sm">{language === 'ko' ? '채용 정보' : 'Careers'}</p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* 퀵메뉴 */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40 hidden md:block">
        <div className="bg-white shadow-lg py-4 px-3 rounded-l-xl flex flex-col gap-4">
          <Link to="/contact/inquiry" className="flex flex-col items-center text-gray-600 hover:text-blue-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <span className="text-[10px] mt-1">{language === 'ko' ? '문의' : 'Ask'}</span>
          </Link>
          <Link to="/contact/location" className="flex flex-col items-center text-gray-600 hover:text-blue-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            </svg>
            <span className="text-[10px] mt-1">{language === 'ko' ? '위치' : 'Map'}</span>
          </Link>
        </div>
      </div>

      {/* TOP 버튼 */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed right-4 bottom-4 w-12 h-12 bg-blue-500 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-600 z-40 transition-all duration-300 ${
          headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </div>
  );
};

export default IndexHaatz2;
