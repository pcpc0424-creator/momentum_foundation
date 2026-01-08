import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Award, Users, Truck, MapPin, Star, Sparkles, Crown, TrendingUp, Shield, Zap } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const FranchiseBusiness = () => {
  const { t } = useLanguage();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      icon: <Award className="h-6 w-6 text-emerald-400" />,
      title: t('franchise.feature1.title'),
      description: t('franchise.feature1.desc')
    },
    {
      icon: <Truck className="h-6 w-6 text-emerald-400" />,
      title: t('franchise.feature2.title'),
      description: t('franchise.feature2.desc')
    },
    {
      icon: <Users className="h-6 w-6 text-emerald-400" />,
      title: t('franchise.feature3.title'),
      description: t('franchise.feature3.desc')
    }
  ];

  const restaurantFeatures = [
    {
      icon: <Sparkles className="h-8 w-8 text-emerald-400" />,
      title: "젊고 세련된 공간",
      description: "청록색 브랜드 컬러를 활용한\n모던하고 쾌적한 인테리어"
    },
    {
      icon: <Users className="h-8 w-8 text-emerald-400" />,
      title: "셀프바 운영",
      description: "자유롭게 반찬을 추가할 수 있는\n시스템으로 고객 만족도 향상"
    },
    {
      icon: <Crown className="h-8 w-8 text-emerald-400" />,
      title: "시그니처 메뉴",
      description: "'큰돼지한판', '큰소한판' 등\n가성비와 구성이 뛰어난 세트 메뉴"
    }
  ];

  const advantages = [
    {
      icon: <Shield className="h-8 w-8 text-emerald-400" />,
      title: t('franchise.advantage1.title'),
      description: t('franchise.advantage1.desc')
    },
    {
      icon: <Truck className="h-8 w-8 text-emerald-400" />,
      title: t('franchise.advantage2.title'),
      description: t('franchise.advantage2.desc')
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-emerald-400" />,
      title: "체계적인 창업 지원",
      description: "오픈 초기 집중 마케팅, 정기 운영 컨설팅, 안정적 물류 시스템"
    },
    {
      icon: <Zap className="h-8 w-8 text-emerald-400" />,
      title: "가맹점과 동반 성장",
      description: "파트너와 함께 성장하는 건강한\n프랜차이즈 생태계 구축"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-950">
      <Navigation />

      {/* Premium Hero Section */}
      <section className="relative min-h-[60vh] bg-gradient-to-br from-gray-900 via-gray-800 to-emerald-900 overflow-hidden">
        {/* Floating Blur Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-emerald-600/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute -bottom-10 right-1/4 w-64 h-64 bg-emerald-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        </div>

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(16, 185, 129, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(16, 185, 129, 0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className={`text-center transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Premium Badge */}
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 backdrop-blur-sm mb-8 transition-all duration-700 delay-200 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
              <Star className="h-4 w-4 text-emerald-400" />
              <span className="text-emerald-300 text-sm font-medium tracking-wide">PREMIUM FRANCHISE</span>
              <Star className="h-4 w-4 text-emerald-400" />
            </div>

            <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
              <span className="bg-gradient-to-r from-white via-emerald-200 to-emerald-400 bg-clip-text text-transparent">
                프랜차이즈
              </span>
            </h1>

            <p className={`text-xl md:text-2xl text-emerald-300/90 font-medium mb-8 transition-all duration-700 delay-400 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
              {t('franchise.subtitle')}
            </p>

            <p className={`text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed transition-all duration-700 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
              {t('franchise.headline')}
            </p>

            {/* Decorative Line */}
            <div className={`mt-12 flex items-center justify-center gap-4 transition-all duration-700 delay-600 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
              <div className="h-px w-20 bg-gradient-to-r from-transparent to-emerald-500"></div>
              <Crown className="h-6 w-6 text-emerald-400" />
              <div className="h-px w-20 bg-gradient-to-l from-transparent to-emerald-500"></div>
            </div>
          </div>
        </div>

        {/* Bottom Gradient Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-950 to-transparent"></div>
      </section>

      {/* Brand Introduction Section */}
      <section className="relative py-24 bg-gray-950">
        {/* Background Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-0 w-96 h-96 bg-emerald-900/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-800/15 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center transition-all duration-1000 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Image Section */}
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative overflow-hidden rounded-2xl border border-emerald-500/20 shadow-2xl shadow-emerald-900/20">
                <img
                  src="https://skyagent-artifacts.skywork.ai/image/2001914996586934272/db7ed674-7238-439c-9b5c-b10bd2ecf3f7/prod_agent_2001914996586934272/meat_restaurant_separate_area_20251228081422_1.png"
                  alt="청년축산 매장"
                  className="w-full h-auto transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent"></div>
              </div>
              {/* Floating Badge */}
              <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white px-6 py-3 rounded-xl shadow-lg shadow-emerald-500/30 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300">
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  <span className="font-bold">Premium Quality</span>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 mb-6">
                <Sparkles className="h-4 w-4 text-emerald-400" />
                <span className="text-emerald-400 text-sm font-medium">BRAND STORY</span>
              </div>

              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-3">
                {t('franchise.brand.title')}
              </h2>
              <p className="text-2xl text-emerald-400 mb-4 font-bold">
                {t('franchise.brand.subtitle')}
              </p>
              <p className="text-lg text-emerald-300 mb-4">
                <strong>{t('franchise.brand.slogan')}</strong>
              </p>
              <p className="text-gray-400 mb-8 leading-relaxed text-justify">
                {t('franchise.brand.desc')}
              </p>

              <div className="space-y-6">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-4 p-4 rounded-xl bg-gray-900/50 border border-emerald-500/10 hover:border-emerald-500/30 hover:bg-gray-900/80 transition-all duration-300 group cursor-default"
                  >
                    <div className="flex-shrink-0 p-2 rounded-lg bg-emerald-500/10 group-hover:bg-emerald-500/20 transition-colors duration-300">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1 group-hover:text-emerald-300 transition-colors duration-300">
                        {feature.title}
                      </h4>
                      <p className="text-gray-400" dangerouslySetInnerHTML={{__html: feature.description.replace(/\n/g, '<br/>')}}></p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Restaurant Features Section */}
      <section className="relative py-24 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-teal-600/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 mb-6">
              <Crown className="h-4 w-4 text-emerald-400" />
              <span className="text-emerald-400 text-sm font-medium">NEW STANDARD</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              {t('franchise.model.title')}
            </h2>
            <p className="text-lg text-gray-400 max-w-4xl mx-auto leading-relaxed">
              {t('franchise.model.desc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {restaurantFeatures.map((feature, index) => (
              <div
                key={index}
                className="group relative"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative bg-gray-900/80 backdrop-blur-sm border border-emerald-500/20 rounded-2xl p-8 hover:border-emerald-500/40 transition-all duration-500 h-full">
                  <div className="flex justify-center mb-6">
                    <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 group-hover:from-emerald-500/30 group-hover:to-teal-500/30 transition-all duration-300">
                      {feature.icon}
                    </div>
                  </div>
                  <h4 className="font-bold text-xl text-white mb-3 text-center group-hover:text-emerald-300 transition-colors duration-300">
                    {feature.title}
                  </h4>
                  <p className="text-gray-400 text-center leading-relaxed" dangerouslySetInnerHTML={{__html: feature.description.replace(/\n/g, '<br/>')}}></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Startup Guide Section */}
      <section className="relative py-24 bg-gray-950">
        {/* Background Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 mb-6">
              <TrendingUp className="h-4 w-4 text-emerald-400" />
              <span className="text-emerald-400 text-sm font-medium">STARTUP GUIDE</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              {t('franchise.startup.title')}
            </h2>
            <h3 className="text-2xl font-bold text-emerald-400 mb-6">
              {t('franchise.competitive.title')}
            </h3>
            <p className="text-lg text-gray-400 max-w-4xl mx-auto leading-relaxed">
              {t('franchise.competitive.desc')}
            </p>
          </div>

          {/* Advantages Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {advantages.map((advantage, index) => (
              <div
                key={index}
                className="group relative"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative bg-gray-900/80 backdrop-blur-sm border border-emerald-500/20 rounded-2xl p-6 hover:border-emerald-500/40 transition-all duration-500 h-full text-center">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 group-hover:from-emerald-500/30 group-hover:to-teal-500/30 transition-all duration-300">
                      {advantage.icon}
                    </div>
                  </div>
                  <h4 className="font-bold text-lg text-white mb-2 group-hover:text-emerald-300 transition-colors duration-300">
                    {advantage.title}
                  </h4>
                  <p className="text-gray-400 text-sm leading-relaxed" dangerouslySetInnerHTML={{__html: advantage.description.replace(/\n/g, '<br/>')}}></p>
                </div>
              </div>
            ))}
          </div>

          {/* Process Steps */}
          <div className="bg-gradient-to-br from-gray-900 via-gray-900 to-emerald-900/30 border border-emerald-500/20 rounded-3xl p-10 shadow-2xl shadow-emerald-900/20">
            <h3 className="text-2xl font-bold text-white mb-10 text-center">
              {t('franchise.process.title')}
            </h3>
            <div className="flex flex-wrap justify-center items-stretch gap-4">
              {[
                { step: t('franchise.step1'), desc: t('franchise.step1.desc') },
                { step: t('franchise.step2'), desc: t('franchise.step2.desc') },
                { step: t('franchise.step3'), desc: t('franchise.step3.desc') },
                { step: t('franchise.step4'), desc: t('franchise.step4.desc') },
                { step: t('franchise.step5'), desc: t('franchise.step5.desc') },
                { step: t('franchise.step6'), desc: t('franchise.step6.desc') },
              ].map((item, index, arr) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="group bg-gray-800/80 hover:bg-gray-800 border border-emerald-500/30 hover:border-emerald-500/50 rounded-xl p-5 min-w-[160px] transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-500/10">
                    <div className="text-emerald-400 font-bold text-lg mb-2 group-hover:text-emerald-300 transition-colors duration-300">
                      {item.step}
                    </div>
                    <div className="text-sm text-gray-400" dangerouslySetInnerHTML={{__html: item.desc}}></div>
                  </div>
                  {index < arr.length - 1 && (
                    <div className="text-emerald-500 text-2xl font-light hidden lg:block">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Growth Section */}
      <section className="relative py-24 bg-gradient-to-b from-gray-950 via-emerald-950/30 to-gray-950 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-3xl"></div>
          <div className="absolute top-0 left-0 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-emerald-600/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 mb-8">
            <Users className="h-4 w-4 text-emerald-400" />
            <span className="text-emerald-400 text-sm font-medium">PARTNERSHIP</span>
          </div>

          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-8">
            가맹점과 <span className="text-emerald-400">동반 성장</span>
          </h2>

          <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed mb-12">
            {t('franchise.closing.desc')}
          </p>

          {/* Decorative Elements */}
          <div className="flex items-center justify-center gap-6">
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-emerald-500 to-transparent"></div>
            <div className="flex gap-2">
              <Star className="h-5 w-5 text-emerald-500 fill-emerald-500" />
              <Star className="h-5 w-5 text-emerald-400 fill-emerald-400" />
              <Star className="h-5 w-5 text-emerald-500 fill-emerald-500" />
            </div>
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-emerald-500 to-transparent"></div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FranchiseBusiness;
