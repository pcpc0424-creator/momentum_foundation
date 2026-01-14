import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HaatzClone = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [introStep, setIntroStep] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeCategory, setActiveCategory] = useState(0);
  const [showTopButton, setShowTopButton] = useState(false);
  const [showPopup, setShowPopup] = useState(true);
  const [langOpen, setLangOpen] = useState(false);
  const [familyOpen, setFamilyOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  // 팝업 쿠키 체크
  useEffect(() => {
    const hidePopup = localStorage.getItem('haatzPopupHide');
    if (hidePopup) {
      const hideDate = new Date(hidePopup);
      if (hideDate > new Date()) {
        setShowPopup(false);
      }
    }
  }, []);

  const hidePopupToday = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    localStorage.setItem('haatzPopupHide', tomorrow.toISOString());
    setShowPopup(false);
  };

  // 히어로 슬라이드
  const heroSlides = [
    {
      type: 'video',
      src: 'https://www.haatz.com/upload/banner/202512/1766458836_m0349562_20251223120036.mp4',
      title: '오랜 노하우와 앞선 기술로\n하츠는 주방을 넘어\n삶의 공간을 디자인합니다.',
      subtitle: ''
    },
    {
      type: 'image',
      src: 'https://www.haatz.com/upload/banner/202512/1767141339_m0145653_20251231093539.jpg',
      title: '공간을 넘어, 삶의 가치를 디자인하다.',
      subtitle: '30년의 노하우로, 주방을 넘어 공기와 생활 전반까지,\n하츠가 당신의 공간을 완성합니다.'
    }
  ];

  // What We Do 카테고리
  const categories = [
    {
      title: '빌트인 주방가전',
      titleEn: 'Built-in Kitchen Appliances',
      desc: '세련된 디자인과 정교한 기술력으로\n주방의 새로운 기준을 제시합니다.',
      link: '#',
      image: 'https://www.haatz.com/assets/images/main/main2-1.jpg'
    },
    {
      title: '환기·공기질 솔루션',
      titleEn: 'Ventilation & Air Quality Solutions',
      desc: '효율적인 환기와 정교한 공기 제어로,\n조용하고 깨끗한 생활환경을 실현합니다.',
      link: '#',
      image: 'https://www.haatz.com/assets/images/main/main2-2.jpg'
    },
    {
      title: '욕실 솔루션',
      titleEn: 'Bathroom Solutions',
      desc: '감각적인 디자인과 섬세한 기능이 어우러져,\n욕실을 단순한 공간이 아닌 나만의 안식처로 바꿉니다.',
      link: '#',
      image: 'https://www.haatz.com/assets/images/main/main2-3.jpg'
    },
    {
      title: '생활 소형가전',
      titleEn: 'Home & Lifestyle Appliances',
      desc: '일상에 영감을 더하는 디자인과 실용성으로,\n더 편리하고 여유로운 라이프를 제안합니다.',
      link: '#',
      image: 'https://www.haatz.com/assets/images/main/main2-4.jpg'
    }
  ];

  // 베스트 제품
  const bestProducts = [
    { title: '부띠크 인덕션', image: 'https://www.haatz.com/upload/product/202512/1767140521_m0212636_20251231092201.jpg', link: '#' },
    { title: '부띠크 글라쎄', image: 'https://www.haatz.com/upload/product/202512/1767140899_m0298964_20251231092819.jpg', link: '#' },
    { title: '클레르 인덕션', image: 'https://www.haatz.com/upload/product/202601/1768178289_m0242690_20260112093809.jpg', link: '#' },
    { title: '휠라이트 인덕션', image: 'https://www.haatz.com/upload/product/202601/1768178300_m0270903_20260112093820.jpg', link: '#' },
    { title: '폰테 사각싱크볼', image: 'https://www.haatz.com/upload/product/202601/1768282562_m0242837_20260113143602.png', link: '#' },
    { title: '비데', image: 'https://www.haatz.com/upload/product/202601/1768282911_m0257110_20260113144151.png', link: '#' },
    { title: '마이티', image: 'https://www.haatz.com/upload/product/202601/1768282401_m0287592_20260113143321.png', link: '#' },
  ];

  // 뉴스
  const newsItems = [
    {
      title: '"아일랜드 주방의 기준을 다시 쓰다." 하츠, 역T 아일랜드 구조 적용 \'노바 후드\' 출시',
      desc: '(2025.12.19)빌트인 가전 전문 기업 하츠(Haatz, 대표이사 김성식)가 아일랜드형 주방 트렌드를 반영한 새로운 레...',
      date: '2025.12.31',
      image: 'https://www.haatz.com/upload/news/202512/1767155979_m0132913_20251231133939.png'
    },
    {
      title: '"국내 최초 플루티드 유리 적용 후드" 하츠, 프리미엄 후드 \'모아 후드\' 출시',
      desc: '(2025.11.26) 빌트인 가전 전문 기업 하츠(Haatz, 대표이사 김성식)가 주방 트렌드를 선도할 새로운 프리미엄...',
      date: '2025.12.17',
      image: 'https://www.haatz.com/upload/news/202512/1765937254_m0187588_20251217110734.png'
    },
    {
      title: '"국내 인덕션 시장 공략 강화" 하츠, 프리미엄 화이트 글라스 \'클레르 인덕션\' 신제품 출시',
      desc: '(2025.9.29)빌트인 가전 전문 기업 하츠(Haatz, 대표이사 김성식)...',
      date: '2025.12.31',
      image: 'https://www.haatz.com/upload/news/202512/1767155806_m0196618_20251231133646.png'
    },
    {
      title: '\'공간 크리에이터\' 하츠, 욕실 시장에서 프리미엄 브랜드 입지 강화',
      desc: '(2025.11.10) 빌트인 가전 전문 기업 하츠(Haatz, 대표이사 김성식)의 욕실 전문 브랜드 \'하츠바스(Haatz Bath...',
      date: '2025.12.17',
      image: 'https://www.haatz.com/upload/news/202512/1765937219_m0119766_20251217110659.png'
    },
    {
      title: '"국내 기술력으로 세계 무대 공략" 하츠, IFA 2025 참가 성공적으로 마무리',
      desc: '(2025.9.11) 실내 공기질 관리 전문 기업 하츠(대표이사 김성식)는 베를린 국제가전박람회인 IFA 2025...',
      date: '2025.12.31',
      image: 'https://www.haatz.com/upload/news/202512/1767155368_m0177833_20251231132928.png'
    }
  ];

  // SNS 미디어
  const snsItems = [
    { title: '온라인 하츠레터 22편', image: 'https://www.haatz.com/upload/media/202601/1767838830_m0151437_20260108112030.jpg', link: 'https://blog.naver.com/haatz_official/224135419329' },
    { title: '온라인 하츠레터 20편', image: 'https://www.haatz.com/upload/media/202601/1767255485_m0115972_20260101171805.jpg', link: 'https://blog.naver.com/haatz_official' },
    { title: '온라인 하츠레터 18편', image: 'https://www.haatz.com/upload/media/202601/1767255440_m0157737_20260101171720.jpg', link: 'https://blog.naver.com/haatz_official/224102415728' },
    { title: '온라인 하츠레터 17편', image: 'https://www.haatz.com/upload/media/202601/1767255415_m0140359_20260101171655.jpg', link: 'https://blog.naver.com/haatz_official' },
    { title: '온라인 하츠레터 16편', image: 'https://www.haatz.com/upload/media/202601/1767255350_m0165675_20260101171550.jpg', link: 'https://blog.naver.com/haatz_official' },
  ];

  // 네비게이션 메뉴
  const navMenus = [
    {
      title: '하츠이야기',
      link: '#',
      submenu: [
        { title: 'About 하츠', link: '#' },
        { title: '연혁', link: '#' },
        { title: 'CI', link: '#' },
        { title: '사업소', link: '#' },
        { title: '사업소개', link: '#' },
        { title: '투자정보', link: '#' },
        { title: '윤리경영', link: '#' },
      ]
    },
    {
      title: '제품소개',
      link: '#',
      submenu: [
        { title: '나에게 맞는 하츠 찾기', link: '#' },
        { title: '빌트인 주방가전', link: '#' },
        { title: '욕실 솔루션', link: '#' },
        { title: '환기·공기질 솔루션', link: '#' },
        { title: '생활 소형가전', link: '#' },
      ]
    },
    {
      title: '고객지원',
      link: '#',
      submenu: [
        { title: '자주 묻는 질문', link: '#' },
        { title: '유지관리 가이드', link: '#' },
        { title: 'A/S 신청&조회', link: '#' },
        { title: 'E - 카탈로그', link: '#' },
        { title: '사용설명서', link: '#' },
        { title: '서비스정책', link: '#' },
        { title: '구매처', link: '#' },
        { title: '고객의 소리', link: '#' },
        { title: '대리점 개설 문의', link: '#' },
      ]
    },
    {
      title: '홍보센터',
      link: '#',
      submenu: [
        { title: 'NEWS', link: '#' },
        { title: '홍보영상', link: '#' },
        { title: '하츠 미디어', link: '#' },
        { title: '공지사항', link: '#' },
      ]
    },
  ];

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Pretendard Std', sans-serif" }}>
      {/* 헤더 */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between">
          {/* 로고 */}
          <a href="#" className="flex items-center">
            <img src="https://www.haatz.com/assets/images/main/logo.png" alt="HAATZ" className="h-8" />
          </a>

          {/* 네비게이션 */}
          <nav className="hidden lg:flex items-center gap-12">
            {navMenus.map((menu, idx) => (
              <div key={idx} className="relative group">
                <a href={menu.link} className="text-gray-800 font-medium hover:text-blue-600 py-8">
                  {menu.title}
                </a>
                <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <div className="bg-white shadow-lg py-4 min-w-[200px]">
                    {menu.submenu.map((sub, subIdx) => (
                      <a key={subIdx} href={sub.link} className="block px-6 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-gray-50">
                        {sub.title}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </nav>

          {/* 우측 버튼들 */}
          <div className="flex items-center gap-4">
            {/* 언어 선택 */}
            <div className="relative hidden md:block">
              <button onClick={() => setLangOpen(!langOpen)} className="flex items-center gap-1 text-sm text-gray-600">
                KOR <span className="text-xs">▼</span>
              </button>
              {langOpen && (
                <div className="absolute top-full right-0 mt-2 bg-white shadow-lg py-2 min-w-[80px]">
                  <a href="#" className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50">KOR</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50">ENG</a>
                </div>
              )}
            </div>

            {/* 인재채용 */}
            <a href="#" className="hidden md:block px-4 py-2 bg-gray-900 text-white text-sm">
              인재채용
            </a>

            {/* 모바일 메뉴 버튼 */}
            <button onClick={() => setMobileMenuOpen(true)} className="lg:hidden">
              <img src="https://www.haatz.com/assets/images/main/menu.png" alt="menu" className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* 인트로 커버 */}
      <div className={`fixed inset-0 z-[60] bg-white transition-all duration-1000 ${showIntro ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        {/* 상단 타이틀 */}
        <div className="absolute top-[15%] left-0 right-0 px-6">
          <div className="max-w-[1400px] mx-auto">
            <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 transition-all duration-700 ${introStep >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              공간 크리에이터,<br />하츠
            </h2>
          </div>
        </div>

        {/* 텍스트 라인 */}
        <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 px-6">
          <div className="max-w-[1400px] mx-auto">
            {/* Line 1 */}
            <div className="flex items-center gap-4 mb-4 overflow-hidden">
              <span className={`text-4xl md:text-6xl lg:text-8xl font-black text-gray-900 tracking-tight transition-all duration-700 ${introStep >= 2 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'}`}>
                PREMIUM
              </span>
              <div className={`w-20 md:w-32 lg:w-40 h-12 md:h-20 lg:h-24 rounded overflow-hidden transition-all duration-700 ${introStep >= 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}>
                <img src="https://www.haatz.com/assets/images/main/main1-1.png" alt="" className="w-full h-full object-cover" />
              </div>
              <span className={`text-4xl md:text-6xl lg:text-8xl font-black text-gray-900 tracking-tight transition-all duration-700 ${introStep >= 2 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'}`} style={{transitionDelay: '0.1s'}}>
                LIVING
              </span>
            </div>
            {/* Line 2 */}
            <div className="flex items-center gap-4 mb-4">
              <span className={`text-4xl md:text-6xl lg:text-8xl font-black text-gray-900 tracking-tight transition-all duration-700 ${introStep >= 2 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'}`} style={{transitionDelay: '0.2s'}}>
                INSPIRED BY
              </span>
              <div className={`w-20 md:w-32 lg:w-40 h-12 md:h-20 lg:h-24 rounded overflow-hidden transition-all duration-700 ${introStep >= 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`} style={{transitionDelay: '0.25s'}}>
                <img src="https://www.haatz.com/assets/images/main/main1-2.png" alt="" className="w-full h-full object-cover" />
              </div>
            </div>
            {/* Line 3 */}
            <div className="flex items-center gap-4">
              <div className={`w-20 md:w-32 lg:w-40 h-12 md:h-20 lg:h-24 rounded overflow-hidden transition-all duration-700 ${introStep >= 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`} style={{transitionDelay: '0.3s'}}>
                <img src="https://www.haatz.com/assets/images/main/main1-2.png" alt="" className="w-full h-full object-cover" />
              </div>
              <span className={`text-5xl md:text-7xl lg:text-9xl font-black text-gray-900 tracking-tight transition-all duration-700 ${introStep >= 2 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'}`} style={{transitionDelay: '0.35s'}}>
                HAATZ
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <main className={`pt-20 transition-opacity duration-1000 ${showIntro ? 'opacity-0' : 'opacity-100'}`}>

        {/* Section 1: 히어로 슬라이드 */}
        <section className="relative h-screen overflow-hidden bg-black">
          {heroSlides.map((slide, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 transition-opacity duration-1000 ${currentSlide === idx ? 'opacity-100' : 'opacity-0'}`}
            >
              {slide.type === 'video' ? (
                <video autoPlay muted loop playsInline className="w-full h-full object-cover">
                  <source src={slide.src} type="video/mp4" />
                </video>
              ) : (
                <img src={slide.src} alt="" className="w-full h-full object-cover" />
              )}
              <div className="absolute inset-0 bg-black/30" />
            </div>
          ))}

          {/* 슬라이드 텍스트 */}
          <div className="absolute bottom-32 left-0 right-0 z-10">
            <div className="max-w-[1400px] mx-auto px-6">
              {heroSlides.map((slide, idx) => (
                <div
                  key={idx}
                  className={`transition-all duration-700 ${currentSlide === idx ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 absolute'}`}
                >
                  {currentSlide === idx && (
                    <>
                      <h2 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold leading-relaxed whitespace-pre-line mb-4">
                        {slide.title}
                      </h2>
                      {slide.subtitle && (
                        <p className="text-white/70 text-sm md:text-base whitespace-pre-line">
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
            <div className="max-w-[1400px] mx-auto px-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-white text-2xl font-bold">
                    {String(currentSlide + 1).padStart(2, '0')}
                  </span>
                  <div className="w-32 md:w-48 h-[2px] bg-white/30 relative">
                    <div
                      className="absolute top-0 left-0 h-full bg-white transition-all duration-500"
                      style={{ width: `${((currentSlide + 1) / heroSlides.length) * 100}%` }}
                    />
                  </div>
                  <span className="text-white/50 text-lg">
                    {String(heroSlides.length).padStart(2, '0')}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCurrentSlide(prev => prev === 0 ? heroSlides.length - 1 : prev - 1)}
                    className="w-12 h-12 flex items-center justify-center border border-white/40 text-white hover:bg-white hover:text-black transition-all"
                  >
                    <img src="https://www.haatz.com/assets/images/main/main1-left.png" alt="prev" className="w-4 h-4 invert" />
                  </button>
                  <button
                    onClick={() => setCurrentSlide(prev => prev === heroSlides.length - 1 ? 0 : prev + 1)}
                    className="w-12 h-12 flex items-center justify-center border border-white/40 text-white hover:bg-white hover:text-black transition-all"
                  >
                    <img src="https://www.haatz.com/assets/images/main/main1-right.png" alt="next" className="w-4 h-4 invert" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: What We Do */}
        <section className="py-20 md:py-32 bg-white">
          <div className="max-w-[1400px] mx-auto px-6 mb-12">
            <p className="text-blue-600 text-sm font-medium mb-4">What We Do</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
              <span className="text-gray-400 block text-lg md:text-xl font-normal mb-2">공간 크리에이터 하츠가 제안하는</span>
              새로운 라이프스타일
            </h2>
          </div>

          {/* 카테고리 플렉스 박스 */}
          <div className="relative h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
            {categories.map((cat, idx) => (
              <img
                key={idx}
                src={cat.image}
                alt=""
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${activeCategory === idx ? 'opacity-100' : 'opacity-0'}`}
              />
            ))}
            <div className="absolute inset-0 bg-black/40" />

            <div className="absolute inset-0 flex">
              {categories.map((cat, idx) => (
                <div
                  key={idx}
                  className={`flex-1 border-r border-white/20 last:border-r-0 transition-all duration-500 cursor-pointer hover:flex-[2] ${activeCategory === idx ? 'flex-[2]' : ''}`}
                  onMouseEnter={() => setActiveCategory(idx)}
                >
                  <div className="h-full flex flex-col justify-end p-6 md:p-10">
                    <p className="text-white font-bold text-lg md:text-2xl mb-1">{cat.title}</p>
                    <p className="text-white/60 text-xs md:text-sm mb-4">{cat.titleEn}</p>
                    <div className={`transition-all duration-500 overflow-hidden ${activeCategory === idx ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                      <p className="text-white/80 text-sm whitespace-pre-line mb-4">{cat.desc}</p>
                      <a href={cat.link} className="inline-flex items-center justify-center w-10 h-10 bg-white text-black rounded-full hover:bg-blue-500 hover:text-white transition-colors">
                        <span className="text-xl">+</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 3: Our Service */}
        <section className="py-20 md:py-32 bg-gray-50">
          <div className="max-w-[1400px] mx-auto px-6">
            <div className="mb-12">
              <p className="text-blue-600 text-sm font-medium mb-4">Our Service</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
                <span className="text-gray-400 block text-lg md:text-xl font-normal mb-2">당신의 공간을 더 오래, 더 편리하게</span>
                하츠의 안심케어 서비스
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* 메인 카드 */}
              <div className="relative aspect-[4/3] md:row-span-2 bg-gray-200 overflow-hidden group">
                <img src="https://www.haatz.com/assets/images/main/main3-1.jpg" alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <p className="text-white text-2xl md:text-3xl font-bold mb-2">
                    나에게 꼭 맞는<br />하츠 제품은?
                  </p>
                  <p className="text-white/70 text-sm mb-6">
                    공간과 라이프스타일에 맞춘 최적의 하츠 솔루션!
                  </p>
                  <a href="#" className="inline-flex items-center gap-3 bg-blue-600 text-white px-6 py-3 text-sm font-medium hover:bg-blue-700 transition-colors">
                    제품 찾아보기
                    <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-xs">+</span>
                  </a>
                </div>
              </div>

              {/* A/S 카드 */}
              <div className="bg-blue-600 p-8 flex flex-col justify-between min-h-[200px] relative overflow-hidden">
                <div className="relative z-10">
                  <p className="text-white text-xl font-bold mb-2">A/S 신청 및 확인</p>
                  <p className="text-white/80 text-sm">간편하게 접수하고, 진행상황까지 한눈에 확인하세요.</p>
                </div>
                <a href="#" className="relative z-10 self-start text-white text-sm hover:underline">view more</a>
                <img src="https://www.haatz.com/assets/images/main/main3-2.png" alt="" className="absolute bottom-0 right-0 h-32 object-contain" />
              </div>

              {/* 하단 3개 카드 */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
                  <p className="text-gray-900 font-bold mb-2">전국 대리점 찾기</p>
                  <p className="text-gray-500 text-xs mb-4">가까운 대리점을 쉽고 빠르게 확인하세요.</p>
                  <a href="#" className="text-gray-400 text-xs hover:text-blue-600">view more</a>
                  <img src="https://www.haatz.com/assets/images/main/main3-3.png" alt="" className="absolute bottom-2 right-2 h-16 object-contain opacity-50" />
                </div>
                <div className="bg-white p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
                  <p className="text-gray-900 font-bold mb-2">자주 묻는 질문</p>
                  <p className="text-gray-500 text-xs mb-4">고객님들이 가장 많이 찾는 답변을 한곳에 모았습니다.</p>
                  <a href="#" className="text-gray-400 text-xs hover:text-blue-600">view more</a>
                  <img src="https://www.haatz.com/assets/images/main/main3-4.png" alt="" className="absolute bottom-2 right-2 h-16 object-contain opacity-50" />
                </div>
                <div className="bg-white p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
                  <p className="text-gray-900 font-bold mb-2">사용 설명서</p>
                  <p className="text-gray-500 text-xs mb-4">제품 사용을 쉽고 정확하게 안내해드립니다.</p>
                  <a href="#" className="text-gray-400 text-xs hover:text-blue-600">view more</a>
                  <img src="https://www.haatz.com/assets/images/main/main3-5.png" alt="" className="absolute bottom-2 right-2 h-16 object-contain opacity-50" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: The Best of Haatz */}
        <section className="py-20 md:py-32 bg-white">
          <div className="max-w-[1400px] mx-auto px-6 mb-12">
            <p className="text-blue-600 text-sm font-medium mb-4">The Best of Haatz</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              <span className="text-gray-400 block text-lg md:text-xl font-normal mb-2">공간을 완성하는 하츠의 대표 제품</span>
            </h2>
          </div>

          {/* 제품 슬라이드 */}
          <div className="overflow-x-auto pb-8 scrollbar-hide cursor-grab active:cursor-grabbing">
            <div className="flex gap-8 px-6 min-w-max" style={{ paddingLeft: 'max(1.5rem, calc((100vw - 1400px) / 2 + 1.5rem))' }}>
              {bestProducts.map((product, idx) => (
                <a key={idx} href={product.link} className="group w-72 md:w-80 flex-shrink-0">
                  <div className="aspect-[3/4] overflow-hidden bg-gray-100 mb-6">
                    <img src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <p className="text-gray-900 font-bold text-lg mb-4">{product.title}</p>
                  <div className="inline-flex items-center gap-3 text-sm text-gray-500 group-hover:text-blue-600 transition-colors">
                    view more
                    <span className="w-8 h-8 border border-current rounded-full flex items-center justify-center">+</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Section 5: PR Center */}
        <section className="py-20 md:py-32 bg-gray-900">
          <div className="max-w-[1400px] mx-auto px-6 mb-12">
            <p className="text-blue-400 text-sm font-medium mb-4">PR Center</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              <span className="text-gray-500 block text-lg md:text-xl font-normal mb-2">한눈에 보는 하츠 소식</span>
            </h2>
            <p className="text-gray-400 mt-4">하츠의 최신 소식과 미디어 정보를 한눈에 확인하세요.</p>
          </div>

          {/* 뉴스 슬라이드 */}
          <div className="overflow-x-auto pb-8 scrollbar-hide">
            <div className="flex gap-6 px-6 min-w-max" style={{ paddingLeft: 'max(1.5rem, calc((100vw - 1400px) / 2 + 1.5rem))' }}>
              {newsItems.map((news, idx) => (
                <a key={idx} href="#" className="group w-80 md:w-96 flex-shrink-0">
                  <div className="relative aspect-[16/10] overflow-hidden mb-4">
                    <div className="absolute top-4 left-4 text-white text-4xl font-bold opacity-30 z-10">
                      {String(idx + 1).padStart(2, '0')}
                    </div>
                    <img src={news.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <p className="text-white font-bold text-lg mb-2 line-clamp-2">{news.title}</p>
                  <p className="text-gray-400 text-sm mb-3 line-clamp-2">{news.desc}</p>
                  <p className="text-gray-500 text-sm">{news.date}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Section 6: Haatz SNS */}
        <section className="py-20 md:py-32 bg-white">
          <div className="max-w-[1400px] mx-auto px-6 mb-12 text-center">
            <p className="text-blue-600 text-sm font-medium mb-4">Haatz SNS</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              <span className="text-gray-400 block text-lg md:text-xl font-normal mb-2">우리 생활 속 가까운 이야기</span>
            </h2>
          </div>

          {/* SNS 슬라이드 */}
          <div className="overflow-x-auto pb-8 scrollbar-hide">
            <div className="flex gap-6 px-6 min-w-max" style={{ paddingLeft: 'max(1.5rem, calc((100vw - 1400px) / 2 + 1.5rem))' }}>
              {snsItems.map((item, idx) => (
                <a key={idx} href={item.link} target="_blank" rel="noopener noreferrer" className="group w-64 md:w-72 flex-shrink-0">
                  <div className="aspect-square overflow-hidden bg-gray-100 mb-4">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <p className="text-gray-700 text-sm">{item.title}</p>
                </a>
              ))}
            </div>
          </div>

          <div className="text-center mt-8">
            <a href="#" className="inline-flex items-center gap-3 bg-blue-600 text-white px-8 py-4 font-medium hover:bg-blue-700 transition-colors">
              view more
              <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-xs">+</span>
            </a>
          </div>
        </section>
      </main>

      {/* 푸터 */}
      <footer className="bg-gray-100 py-12">
        <div className="max-w-[1400px] mx-auto px-6">
          {/* 상단 링크 */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-gray-300">
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-gray-600 hover:text-gray-900">이용약관</a>
              <a href="#" className="text-gray-900 font-bold hover:text-blue-600">개인정보처리방침</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">이메일무단수집거부</a>
            </div>
            <div className="relative">
              <button onClick={() => setFamilyOpen(!familyOpen)} className="flex items-center gap-2 text-sm text-gray-600 border border-gray-300 px-4 py-2">
                Family Site <span>▼</span>
              </button>
              {familyOpen && (
                <div className="absolute bottom-full left-0 mb-2 bg-white shadow-lg py-2 min-w-[150px]">
                  <a href="https://www.haatzmall.com" target="_blank" rel="noopener noreferrer" className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50">하츠몰</a>
                  <a href="http://www.byucksan.com" target="_blank" rel="noopener noreferrer" className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50">벽산</a>
                  <a href="https://www.byucksanpaint.com" target="_blank" rel="noopener noreferrer" className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50">벽산페인트</a>
                </div>
              )}
            </div>
          </div>

          {/* 하단 정보 */}
          <div className="pt-8 flex flex-wrap items-start justify-between gap-8">
            <div className="flex items-start gap-8">
              <img src="https://www.haatz.com/assets/images/main/logo.png" alt="HAATZ" className="h-8 opacity-50" />
              <div className="text-xs text-gray-500 leading-relaxed">
                <p>상호 : HAATZ | 대표자 : 김성식 | 사업자등록번호 : 128-81-06145</p>
                <p>주소 : 경기도 평택시 진위면 동부대로 202</p>
                <p>사업장주소 : 서울특별시 강남구 강남대로 456 한석타워 10~12층</p>
                <p>TEL : 1644-0806 (FAX : 031-376-1667) | FAX : 02-3438-6799</p>
                <p>수입/수출 문의 : haatz_export@bsco.co.kr</p>
              </div>
            </div>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/haatz_official" target="_blank" rel="noopener noreferrer">
                <img src="https://www.haatz.com/assets/images/main/icon-instargram.png" alt="Instagram" className="w-8 h-8" />
              </a>
              <a href="https://blog.naver.com/haatz_official" target="_blank" rel="noopener noreferrer">
                <img src="https://www.haatz.com/assets/images/main/icon-blog.png" alt="Blog" className="w-8 h-8" />
              </a>
              <a href="https://www.youtube.com/@_haatz" target="_blank" rel="noopener noreferrer">
                <img src="https://www.haatz.com/assets/images/main/icon-youtube.png" alt="YouTube" className="w-8 h-8" />
              </a>
            </div>
          </div>

          <div className="mt-8 text-xs text-gray-400">
            Copyright © 2025 HAATZ. ALL RIGHTS RESERVED.
          </div>
        </div>
      </footer>

      {/* Quick 메뉴 */}
      <div className="fixed right-4 bottom-4 md:right-8 md:bottom-8 z-40 flex flex-col gap-2">
        <a href="#" className="w-16 h-16 bg-blue-600 text-white flex flex-col items-center justify-center text-xs hover:bg-blue-700 transition-colors shadow-lg">
          <img src="https://www.haatz.com/assets/images/main/quick1.png" alt="" className="w-6 h-6 mb-1 invert" />
          A/S 신청
        </a>
        <a href="#" className="w-16 h-16 bg-white text-gray-800 flex flex-col items-center justify-center text-xs hover:bg-gray-100 transition-colors shadow-lg border">
          <img src="https://www.haatz.com/assets/images/main/quick2.png" alt="" className="w-6 h-6 mb-1" />
          사용설명서
        </a>
        <a href="#" className="w-16 h-16 bg-white text-gray-800 flex flex-col items-center justify-center text-xs hover:bg-gray-100 transition-colors shadow-lg border">
          <img src="https://www.haatz.com/assets/images/main/quick3.png" alt="" className="w-6 h-6 mb-1" />
          대리점<br />개설문의
        </a>
        {showTopButton && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-16 h-16 bg-gray-800 text-white flex items-center justify-center hover:bg-gray-900 transition-colors shadow-lg"
          >
            <img src="https://www.haatz.com/assets/images/main/top.png" alt="TOP" className="w-6 h-6 invert" />
          </button>
        )}
      </div>

      {/* 팝업 */}
      {showPopup && (
        <div className="fixed left-[100px] top-[100px] z-[70] bg-white shadow-2xl max-w-md">
          <div className="bg-gray-800 text-white py-3 px-4 font-medium">
            하츠 홈페이지 리뉴얼 오픈
          </div>
          <div className="p-4">
            <img src="https://www.haatz.com/upload/popup/202512/1767153980_m0117126_20251231130620.jpg" alt="" className="w-full" />
          </div>
          <div className="flex border-t">
            <label className="flex-1 flex items-center gap-2 px-4 py-3 cursor-pointer">
              <input type="checkbox" onChange={hidePopupToday} className="w-4 h-4" />
              <span className="text-sm text-gray-600">오늘 열지 않기</span>
            </label>
            <button onClick={() => setShowPopup(false)} className="px-6 py-3 text-sm text-gray-600 hover:bg-gray-100">
              닫기
            </button>
          </div>
        </div>
      )}

      {/* 모바일 메뉴 */}
      {mobileMenuOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 z-[80]" onClick={() => setMobileMenuOpen(false)} />
          <div className="fixed top-0 right-0 bottom-0 w-80 bg-white z-[90] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <img src="https://www.haatz.com/assets/images/main/logo.png" alt="HAATZ" className="h-6" />
              <button onClick={() => setMobileMenuOpen(false)} className="text-2xl">×</button>
            </div>
            <div className="p-6">
              {navMenus.map((menu, idx) => (
                <div key={idx} className="mb-6">
                  <a href={menu.link} className="block text-lg font-bold text-gray-900 mb-3">{menu.title}</a>
                  <div className="space-y-2">
                    {menu.submenu.map((sub, subIdx) => (
                      <a key={subIdx} href={sub.link} className="block text-sm text-gray-600 hover:text-blue-600">
                        {sub.title}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* 스타일 */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default HaatzClone;
