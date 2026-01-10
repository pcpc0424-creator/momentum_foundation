import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Leaf, Award, Shield, Truck, Sparkles, Star } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const FoodBusiness = () => {
  const { t } = useLanguage();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      icon: <Leaf className="h-6 w-6" />,
      title: t('food.meat.feature1.title'),
      description: t('food.meat.feature1.desc')
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: t('food.meat.feature2.title'),
      description: t('food.meat.feature2.desc')
    },
    {
      icon: <Truck className="h-6 w-6" />,
      title: t('food.meat.feature3.title'),
      description: t('food.meat.feature3.desc')
    }
  ];

  const fruitFeatures = [
    {
      icon: <Leaf className="h-6 w-6" />,
      title: t('food.fruit.feature1.title'),
      description: t('food.fruit.feature1.desc')
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: t('food.fruit.feature2.title'),
      description: t('food.fruit.feature2.desc')
    },
    {
      icon: <Truck className="h-6 w-6" />,
      title: t('food.fruit.feature3.title'),
      description: t('food.fruit.feature3.desc')
    }
  ];

  const riceFeatures = [
    {
      icon: <Award className="h-6 w-6" />,
      title: t('food.rice.feature1.title'),
      description: t('food.rice.feature1.desc')
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: t('food.rice.feature2.title'),
      description: t('food.rice.feature2.desc')
    },
    {
      icon: <Leaf className="h-6 w-6" />,
      title: t('food.rice.feature3.title'),
      description: t('food.rice.feature3.desc')
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Premium Hero Section */}
      <section className="relative min-h-[50vh] flex items-center bg-gradient-to-br from-gray-900 via-gray-800 to-emerald-900 overflow-hidden">
        {/* Floating Blur Orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-40 right-20 w-96 h-96 bg-emerald-600/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-green-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-teal-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }} />
        </div>

        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
          <div className={`text-center transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Premium Badge */}
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-500/30 backdrop-blur-sm mb-8 transition-all duration-700 delay-200 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-300 text-sm font-medium tracking-wide">Premium Food Distribution</span>
              <Sparkles className="w-4 h-4 text-emerald-400" />
            </div>

            <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <span className="bg-gradient-to-r from-white via-emerald-200 to-emerald-400 bg-clip-text text-transparent">
                식자재가공·유통
              </span>
            </h1>

            <p className={`text-xl md:text-2xl text-emerald-200/80 max-w-3xl mx-auto transition-all duration-700 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              {t('food.subtitle')}
            </p>

            {/* Decorative Line */}
            <div className={`flex items-center justify-center gap-4 mt-10 transition-all duration-700 delay-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
              <div className="h-px w-20 bg-gradient-to-r from-transparent to-emerald-500" />
              <Star className="w-5 h-5 text-emerald-400 fill-emerald-400" />
              <div className="h-px w-20 bg-gradient-to-l from-transparent to-emerald-500" />
            </div>
          </div>
        </div>

        {/* Bottom Gradient Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 to-transparent" />
      </section>

      {/* Main Headline Section */}
      <section className={`py-16 bg-gray-50 transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-2xl md:text-3xl font-bold max-w-4xl mx-auto leading-relaxed bg-gradient-to-r from-emerald-600 to-emerald-800 bg-clip-text text-transparent">
              {t('food.headline')}
            </p>
          </div>
        </div>
      </section>

      {/* Korean Beef & Pork Section */}
      <section className={`py-20 bg-white transition-all duration-1000 delay-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image Container */}
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500 to-green-500 rounded-2xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src="/momentum_foundation/images/meat_products_20251219_072051.png"
                  alt="한우·한돈 제품"
                  className="w-full h-auto transform transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              {/* Floating Badge */}
              <div className="absolute -top-3 -right-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                <span className="flex items-center gap-1">
                  <Award className="w-4 h-4" />
                  Premium Quality
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium mb-4">
                  <Leaf className="w-4 h-4" />
                  한우·한돈
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                  {t('food.meat.title')}
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed text-justify">
                  {t('food.meat.desc')}
                </p>
              </div>

              {/* Feature Cards */}
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="group flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-gray-50 to-emerald-50/50 border border-gray-100 hover:border-emerald-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1 group-hover:text-emerald-700 transition-colors">
                        {feature.title}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fruit Distribution Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 via-white to-green-50 relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-green-200/30 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <div className="space-y-8 order-2 lg:order-1">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium mb-4">
                  <Sparkles className="w-4 h-4" />
                  청년나래
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                  {t('food.fruit.title')}
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed text-justify">
                  {t('food.fruit.desc')}
                </p>
              </div>

              {/* Feature Cards */}
              <div className="space-y-4">
                {fruitFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className="group flex items-start gap-4 p-4 rounded-xl bg-white/80 backdrop-blur-sm border border-emerald-100 hover:border-emerald-300 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1 group-hover:text-emerald-700 transition-colors">
                        {feature.title}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Image Container */}
            <div className="relative group order-1 lg:order-2">
              <div className="absolute -inset-4 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-2xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src="/momentum_foundation/images/fruit_products_20251219_072051.png"
                  alt="과일 제품"
                  className="w-full h-auto transform transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              {/* Floating Badge */}
              <div className="absolute -bottom-3 -left-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-current" />
                  Fresh & Natural
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rice & Grains Section */}
      <section className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image Container */}
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src="/momentum_foundation/images/rice_products_20251219_072051.png"
                  alt="쌀 제품"
                  className="w-full h-auto transform transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              {/* Floating Badge */}
              <div className="absolute -top-3 -left-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                <span className="flex items-center gap-1">
                  <Shield className="w-4 h-4" />
                  Certified Quality
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium mb-4">
                  <Award className="w-4 h-4" />
                  브랜드쌀
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                  {t('food.rice.title')}
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {t('food.rice.desc')}
                </p>
              </div>

              {/* Feature Cards */}
              <div className="space-y-4">
                {riceFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className="group flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-gray-50 to-green-50/50 border border-gray-100 hover:border-emerald-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1 group-hover:text-emerald-700 transition-colors">
                        {feature.title}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-emerald-900 relative overflow-hidden">
        {/* Floating Orbs */}
        <div className="absolute top-10 left-20 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-20 w-72 h-72 bg-green-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-500/30 backdrop-blur-sm mb-8">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-300 text-sm font-medium">Trust & Quality</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-white via-emerald-200 to-emerald-400 bg-clip-text text-transparent">
              최고 품질의 식자재를 약속합니다
            </span>
          </h2>

          <p className="text-lg text-emerald-200/70 mb-10 max-w-2xl mx-auto">
            모멘텀 재단은 철저한 품질 관리와 신뢰를 바탕으로 최상의 식자재를 공급합니다.
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            <div className="flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
              <Shield className="w-5 h-5 text-emerald-400" />
              <span className="text-white font-medium">품질 보증</span>
            </div>
            <div className="flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
              <Truck className="w-5 h-5 text-emerald-400" />
              <span className="text-white font-medium">신속 배송</span>
            </div>
            <div className="flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
              <Award className="w-5 h-5 text-emerald-400" />
              <span className="text-white font-medium">인증 제품</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FoodBusiness;
