import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { useLanguage } from "@/contexts/LanguageContext";

const Index = () => {
  const [textStep, setTextStep] = useState(0);
  const [activeCategory, setActiveCategory] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const { language } = useLanguage();

  const sectionRef = useRef<HTMLDivElement>(null);
  const bx2Ref = useRef<HTMLDivElement>(null);
  const bx3Ref = useRef<HTMLDivElement>(null);

  // 슬라이드 데이터
  const slides = [
    {
      video: "/momentum_foundation/videos/hero.mp4",
      title: language === 'ko' ? '프리미엄 유통' : 'Premium Distribution',
      subtitle: language === 'ko' ? '프리미엄 유통 솔루션' : 'Premium Distribution Solution',
    },
    {
      video: "/momentum_foundation/videos/hero.mp4",
      title: language === 'ko' ? '신선한 식자재' : 'Fresh Ingredients',
      subtitle: language === 'ko' ? '최고 품질의 식자재' : 'Top Quality Ingredients',
    },
  ];

  // 로딩 애니메이션 (원형 프로그레스)
  useEffect(() => {
    const duration = 2000;
    const interval = 20;
    const steps = duration / interval;
    let current = 0;

    const timer = setInterval(() => {
      current++;
      setLoadingProgress((current / steps) * 100);
      if (current >= steps) {
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  // 텍스트 순차 등장
  useEffect(() => {
    const timers = [
      setTimeout(() => setTextStep(1), 500),
      setTimeout(() => setTextStep(2), 800),
      setTimeout(() => setTextStep(3), 1100),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  // GSAP ScrollTrigger 효과
  useEffect(() => {
    const loadGSAP = async () => {
      const gsapModule = await import('gsap');
      const scrollTriggerModule = await import('gsap/ScrollTrigger');

      const gsap = gsapModule.default;
      const ScrollTrigger = scrollTriggerModule.ScrollTrigger;

      gsap.registerPlugin(ScrollTrigger);

      if (!sectionRef.current || !bx2Ref.current || !bx3Ref.current) return;

      // 초기 상태
      gsap.set(bx3Ref.current, {
        clipPath: 'inset(35% 30% 35% 30% round 100px)',
        opacity: 0,
      });

      // 스크롤 애니메이션
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=300%',
          scrub: 1,
          pin: true,
          onUpdate: (self) => {
            // 60% 이상 스크롤 시 헤더 표시
            setHeaderVisible(self.progress > 0.6);
          }
        }
      });

      // 1. 텍스트 페이드아웃 (0 ~ 0.2)
      tl.to(bx2Ref.current, {
        opacity: 0,
        scale: 0.95,
        duration: 0.2,
      });

      // 2. 비디오 나타나면서 확대 (0.1 ~ 0.5)
      tl.to(bx3Ref.current, {
        opacity: 1,
        clipPath: 'inset(0% 0% 0% 0% round 0px)',
        duration: 0.4,
      }, '-=0.1');

      // 3. 전체화면 유지 (0.5 ~ 0.7)
      tl.to({}, { duration: 0.2 });

      // 4. 배너로 축소 (0.7 ~ 1.0)
      tl.to(bx3Ref.current, {
        clipPath: 'inset(0% 0% 60% 0% round 0px)',
        duration: 0.3,
      });
    };

    loadGSAP();
  }, []);

  // 슬라이드 전환
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const t = {
    line1: { left: 'PREMIUM', right: language === 'ko' ? '유통' : 'DIST' },
    line2: { text: 'INSPIRED BY' },
    line3: { text: 'MOMENTUM' },
    videoOverlay: {
      title: language === 'ko' ? '오랜 노하우와 앞선 기술로\n모멘텀은 유통을 넘어\n새로운 가치를 창출합니다.' : 'With expertise and advanced technology\nMOMENTUM creates new value\nbeyond distribution.',
    },
    whatwedo: {
      subtitle: 'What We Do',
      title: language === 'ko' ? '유통 파트너 모멘텀이 제안하는\n새로운 라이프스타일' : 'Distribution Partner MOMENTUM presents\nA New Lifestyle',
    },
    categories: [
      { title: language === 'ko' ? '식자재 유통' : 'Food Distribution', en: 'Food Business', link: '/business/food', image: '/momentum_foundation/images/meat_products_20251219_072051.png' },
      { title: language === 'ko' ? '프랜차이즈' : 'Franchise', en: 'Franchise', link: '/business/franchise', image: '/momentum_foundation/images/franchise_meat_restaurant_1.jpeg' },
      { title: language === 'ko' ? '시설관리' : 'FM Service', en: 'Facility Management', link: '/business/fm', image: '/momentum_foundation/images/fm_outsourcing_services_20251223_070231.png' },
      { title: language === 'ko' ? '컨설팅' : 'Consulting', en: 'Consulting', link: '/contact/inquiry', image: '/momentum_foundation/images/business_team_20251219_072051.png' },
    ],
  };

  // 원형 프로그레스 SVG 계산
  const circumference = 2 * Math.PI * 28;
  const strokeDashoffset = circumference - (loadingProgress / 100) * circumference;

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Pretendard', sans-serif" }}>
      {/* 헤더 - 조건부 표시 */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'
        }`}
      >
        <Navigation />
      </div>

      {/* 인트로 섹션 - HAATZ 스타일 */}
      <section ref={sectionRef} className="relative h-screen overflow-hidden">

        {/* bx2: 텍스트 + 작은 이미지 레이아웃 */}
        <div
          ref={bx2Ref}
          className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-white"
        >
          {/* 라인 1: PREMIUM [이미지+로딩] 유통 */}
          <div className="flex items-center gap-4 md:gap-6 mb-2 md:mb-4">
            <span
              className={`text-4xl md:text-6xl lg:text-8xl font-black text-gray-900 italic tracking-tight transition-all duration-700 ${textStep >= 1 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
              style={{ fontFamily: "'Noto Serif KR', serif" }}
            >
              {t.line1.left}
            </span>
            <div
              className={`relative w-[120px] md:w-[200px] lg:w-[280px] h-[50px] md:h-[70px] lg:h-[90px] rounded-full overflow-hidden transition-all duration-700 delay-100 ${textStep >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}
            >
              <img
                src="/momentum_foundation/images/fruit_products_20251219_072051.png"
                alt=""
                className="w-full h-full object-cover"
              />
              {/* 로딩 원형 프로그레스 */}
              {loadingProgress < 100 && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <svg className="w-12 h-12 md:w-16 md:h-16 -rotate-90" viewBox="0 0 60 60">
                    <circle
                      cx="30"
                      cy="30"
                      r="28"
                      stroke="rgba(255,255,255,0.3)"
                      strokeWidth="2"
                      fill="none"
                    />
                    <circle
                      cx="30"
                      cy="30"
                      r="28"
                      stroke="white"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      className="transition-all duration-100"
                    />
                  </svg>
                </div>
              )}
            </div>
            <span
              className={`text-4xl md:text-6xl lg:text-8xl font-black text-gray-900 italic tracking-tight transition-all duration-700 delay-150 ${textStep >= 1 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
              style={{ fontFamily: "'Noto Serif KR', serif" }}
            >
              {t.line1.right}
            </span>
          </div>

          {/* 라인 2: INSPIRED BY [이미지] */}
          <div className="flex items-center gap-4 md:gap-6 mb-2 md:mb-4">
            <span
              className={`text-3xl md:text-5xl lg:text-7xl font-black text-gray-400 italic tracking-tight transition-all duration-700 delay-300 ${textStep >= 2 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
              style={{ fontFamily: "'Noto Serif KR', serif" }}
            >
              {t.line2.text}
            </span>
            <div
              className={`w-[140px] md:w-[220px] lg:w-[300px] h-[50px] md:h-[70px] lg:h-[90px] rounded-full overflow-hidden transition-all duration-700 delay-300 ${textStep >= 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}
            >
              <img
                src="/momentum_foundation/images/meat_products_20251219_072051.png"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* 라인 3: [이미지] MOMENTUM */}
          <div className="flex items-center gap-4 md:gap-6">
            <div
              className={`w-[160px] md:w-[240px] lg:w-[320px] h-[60px] md:h-[80px] lg:h-[100px] rounded-[30px] md:rounded-[40px] overflow-hidden transition-all duration-700 delay-450 ${textStep >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}
            >
              <img
                src="/momentum_foundation/images/fm_outsourcing_services_20251223_070231.png"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <span
              className={`text-4xl md:text-6xl lg:text-8xl font-black text-gray-900 tracking-tight transition-all duration-700 delay-450 ${textStep >= 3 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
              style={{ fontFamily: "'Noto Serif KR', serif" }}
            >
              {t.line3.text}
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

        {/* bx3: 전체화면 비디오 (별도 레이어) */}
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
              className={`absolute inset-0 transition-opacity duration-700 ${currentSlide === idx ? 'opacity-100' : 'opacity-0'}`}
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

          {/* 손글씨 스타일 오버레이 텍스트 */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="container mx-auto px-6 md:px-12">
              <div className="max-w-4xl">
                {/* 작은 서브타이틀 */}
                <p
                  className="text-white/80 text-sm md:text-base mb-4"
                  style={{ fontFamily: "'Dancing Script', cursive" }}
                >
                  {slides[currentSlide].subtitle}
                </p>

                {/* 메인 타이틀 - 손글씨 스타일 */}
                <h2
                  className="text-white text-3xl md:text-5xl lg:text-6xl font-light leading-tight mb-6"
                  style={{ fontFamily: "'Dancing Script', cursive" }}
                >
                  {slides[currentSlide].title}
                </h2>

                {/* 설명 텍스트 */}
                <p className="text-white/90 text-lg md:text-xl lg:text-2xl whitespace-pre-line leading-relaxed">
                  {t.videoOverlay.title}
                </p>
              </div>
            </div>
          </div>

          {/* 슬라이더 컨트롤 - HAATZ 스타일 */}
          <div className="absolute bottom-8 left-0 right-0">
            <div className="container mx-auto px-6 md:px-12 flex items-center gap-4">
              {/* 슬라이드 번호 */}
              <span className={`text-sm font-medium transition-colors ${currentSlide === 0 ? 'text-white' : 'text-white/50'}`}>
                01
              </span>

              {/* 프로그레스 바 */}
              <div className="w-20 md:w-32 h-0.5 bg-white/30 relative overflow-hidden">
                <div
                  className="absolute left-0 top-0 h-full bg-white transition-all duration-500"
                  style={{ width: currentSlide === 0 ? '100%' : '0%' }}
                />
              </div>

              <span className="text-white/30">—</span>

              <div className="w-20 md:w-32 h-0.5 bg-white/30 relative overflow-hidden">
                <div
                  className="absolute left-0 top-0 h-full bg-white transition-all duration-500"
                  style={{ width: currentSlide === 1 ? '100%' : '0%' }}
                />
              </div>

              <span className={`text-sm font-medium transition-colors ${currentSlide === 1 ? 'text-white' : 'text-white/50'}`}>
                02
              </span>

              {/* 좌우 버튼 */}
              <div className="ml-6 flex gap-2">
                <button
                  onClick={prevSlide}
                  className="w-10 h-10 border border-white/30 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:border-white transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextSlide}
                  className="w-10 h-10 border border-white/30 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:border-white transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do 섹션 */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center mb-12">
          <p className="text-blue-600 text-sm font-medium mb-3">{t.whatwedo.subtitle}</p>
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 whitespace-pre-line">
            {t.whatwedo.title}
          </h2>
        </div>

        <div className="relative h-[500px] overflow-hidden">
          {t.categories.map((cat, idx) => (
            <img
              key={idx}
              src={cat.image}
              alt=""
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${activeCategory === idx ? 'opacity-100' : 'opacity-0'}`}
            />
          ))}
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 flex">
            {t.categories.map((cat, idx) => (
              <div
                key={idx}
                className={`flex-1 border-r border-white/20 last:border-r-0 cursor-pointer transition-all duration-500 ${activeCategory === idx ? 'flex-[2]' : 'hover:bg-white/5'}`}
                onMouseEnter={() => setActiveCategory(idx)}
              >
                <div className="h-full flex flex-col justify-end p-6 md:p-8">
                  <p className="text-white font-bold text-lg md:text-xl mb-1">{cat.title}</p>
                  <p className="text-white/60 text-xs md:text-sm mb-4">{cat.en}</p>
                  {activeCategory === idx && (
                    <Link
                      to={cat.link}
                      className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-black hover:bg-blue-500 hover:text-white transition-colors"
                    >
                      <span className="text-xl">+</span>
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Service */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-blue-600 text-sm mb-2">Our Service</p>
          <h2 className="text-2xl md:text-3xl font-bold mb-10">
            {language === 'ko' ? '모멘텀의 파트너십' : 'MOMENTUM Partnership'}
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative aspect-[4/3] md:row-span-2 overflow-hidden group">
              <img src="/momentum_foundation/images/company_building_20251219_072052.png" alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <p className="text-white text-xl font-bold mb-3">{language === 'ko' ? '나에게 맞는 모멘텀 서비스는?' : 'Find your service'}</p>
                <Link to="/business/food" className="inline-block bg-blue-600 text-white px-5 py-2 text-sm hover:bg-blue-700">
                  {language === 'ko' ? '서비스 찾기' : 'Find Service'}
                </Link>
              </div>
            </div>
            <div className="bg-blue-600 p-6 flex flex-col justify-between min-h-[140px]">
              <div>
                <p className="text-white font-bold text-lg">{language === 'ko' ? '사업 문의' : 'Inquiry'}</p>
                <p className="text-white/80 text-sm">{language === 'ko' ? '빠른 답변을 받으세요' : 'Get quick response'}</p>
              </div>
              <Link to="/contact/inquiry" className="text-white text-sm hover:underline">{language === 'ko' ? '자세히 보기' : 'View more'}</Link>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { title: language === 'ko' ? '오시는 길' : 'Location', link: '/contact/location' },
                { title: language === 'ko' ? '부서 연락처' : 'Contacts', link: '/contact/departments' },
                { title: language === 'ko' ? '채용 정보' : 'Careers', link: '/careers/jobs' },
              ].map((item, idx) => (
                <Link key={idx} to={item.link} className="bg-white p-4 shadow-sm hover:shadow-md text-center">
                  <p className="text-gray-900 font-bold text-sm">{item.title}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex gap-4 text-sm mb-6 pb-6 border-b border-gray-300">
            <Link to="/terms" className="text-gray-600 hover:text-gray-900">{language === 'ko' ? '이용약관' : 'Terms'}</Link>
            <Link to="/privacy" className="text-gray-900 font-bold">{language === 'ko' ? '개인정보처리방침' : 'Privacy'}</Link>
          </div>
          <div className="text-xs text-gray-500">
            <p>{language === 'ko' ? '(주)모멘텀파운데이션' : 'MOMENTUM Foundation Co., Ltd.'}</p>
            <p>{language === 'ko' ? '서울 송파구 송파대로 201 테라타워2 B동 1407호' : 'Terra Tower 2 B-1407, Seoul'}</p>
            <p>TEL: 02-6423-4122</p>
          </div>
          <p className="mt-6 text-xs text-gray-400">© 2025 MOMENTUM Foundation.</p>
        </div>
      </footer>

      {/* 퀵메뉴 */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40">
        <div className="bg-white shadow-lg py-4 px-3 rounded-l-xl flex flex-col gap-4">
          <Link to="/contact/inquiry" className="flex flex-col items-center text-gray-600 hover:text-blue-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
            <span className="text-[10px]">{language === 'ko' ? '문의' : 'Ask'}</span>
          </Link>
          <Link to="/contact/location" className="flex flex-col items-center text-gray-600 hover:text-blue-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
            <span className="text-[10px]">{language === 'ko' ? '위치' : 'Map'}</span>
          </Link>
        </div>
      </div>

      {/* TOP 버튼 */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed right-4 bottom-4 w-12 h-12 bg-blue-500 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-600 z-40"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
      </button>
    </div>
  );
};

export default Index;
