import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Users, Target, Heart, Lightbulb, Sparkles, ArrowRight, Star, Briefcase, TrendingUp, Award, Clock, MapPin, Zap } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Careers = () => {
  const { t } = useLanguage();
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeValue, setActiveValue] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const companyValues = [
    {
      icon: <Users className="h-8 w-8" />,
      title: t('careers.values.communication.title'),
      description: t('careers.values.communication.desc'),
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: t('careers.values.growth.title'),
      description: t('careers.values.growth.desc'),
      color: "from-emerald-500 to-green-500"
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: t('careers.values.balance.title'),
      description: t('careers.values.balance.desc'),
      color: "from-rose-500 to-pink-500"
    }
  ];

  const benefits = [
    { icon: <Award className="w-6 h-6" />, title: t('careers.benefits.reward.title'), desc: t('careers.benefits.reward.desc') },
    { icon: <Clock className="w-6 h-6" />, title: t('careers.benefits.flexible.title'), desc: t('careers.benefits.flexible.desc') },
    { icon: <Heart className="w-6 h-6" />, title: t('careers.benefits.welfare.title'), desc: t('careers.benefits.welfare.desc') },
    { icon: <TrendingUp className="w-6 h-6" />, title: t('careers.benefits.growth.title'), desc: t('careers.benefits.growth.desc') }
  ];

  const positions = [
    { dept: t('careers.positions.management.dept'), role: t('careers.positions.management.role'), type: t('careers.positions.type.fulltime'), location: t('careers.positions.location.seoul') },
    { dept: t('careers.positions.food.dept'), role: t('careers.positions.food.role'), type: t('careers.positions.type.fulltime'), location: t('careers.positions.location.seoulgyeonggi') },
    { dept: t('careers.positions.franchise.dept'), role: t('careers.positions.franchise.role'), type: t('careers.positions.type.fulltime'), location: t('careers.positions.location.nationwide') },
    { dept: t('careers.positions.fm.dept'), role: t('careers.positions.fm.role'), type: t('careers.positions.type.fulltime'), location: t('careers.positions.location.seoul') }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Ultra Premium Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-emerald-900 to-gray-900"></div>

        {/* Animated Mesh Gradient */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,rgba(16,185,129,0.3),transparent_50%)]"></div>
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,rgba(6,182,212,0.2),transparent_50%)]"></div>
        </div>

        {/* Floating Orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-[10%] w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-[15%] w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-32 left-[30%] w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute -bottom-20 right-[20%] w-64 h-64 bg-teal-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        </div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:60px_60px]"></div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className={`text-center transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            {/* Premium Badge */}
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl mb-10">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              </div>
              <span className="text-emerald-300 text-sm font-medium tracking-wider uppercase">Join Our Team</span>
            </div>

            <h1 className="text-6xl lg:text-8xl font-black text-white mb-8 tracking-tight leading-tight">
              <span className="block">{t('careers.hero.title1')}</span>
              <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                {t('careers.hero.title2')}
              </span>
            </h1>

            <p className="text-xl lg:text-2xl text-gray-300 font-light max-w-3xl mx-auto mb-12 leading-relaxed">
              {t('careers.headline')}
            </p>

            {/* Animated Stats */}
            <div className="flex flex-wrap justify-center gap-8 mt-16">
              {[
                { number: "100+", label: t('careers.stats.employees') },
                { number: "4", label: t('careers.stats.divisions') },
                { number: "∞", label: t('careers.stats.growth') }
              ].map((stat, index) => (
                <div
                  key={index}
                  className={`text-center px-8 py-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm transform transition-all duration-700 hover:scale-105 hover:bg-white/10 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                  style={{ transitionDelay: `${300 + index * 100}ms` }}
                >
                  <div className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">{stat.number}</div>
                  <div className="text-gray-400 text-sm mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-8 h-12 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-white/50 rounded-full animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Company Values - Interactive Cards */}
      <section className="py-32 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-100/50 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-100/50 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-20 transform transition-all duration-700 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-semibold mb-6">
              <Lightbulb className="w-4 h-4" />
              Our Values
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              {t('careers.culture.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('careers.culture.desc')}
            </p>
          </div>

          {/* Interactive Value Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {companyValues.map((value, index) => (
              <div
                key={index}
                className={`group relative cursor-pointer transform transition-all duration-500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                style={{ transitionDelay: `${200 + index * 100}ms` }}
                onMouseEnter={() => setActiveValue(index)}
              >
                {/* Card */}
                <div className={`relative bg-white rounded-3xl p-10 shadow-xl transition-all duration-500 border-2 ${activeValue === index ? 'border-emerald-400 shadow-2xl shadow-emerald-500/20 -translate-y-2' : 'border-gray-100 hover:border-emerald-200'}`}>
                  {/* Gradient Overlay on Hover */}
                  <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>

                  {/* Icon */}
                  <div className={`relative w-20 h-20 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center text-white shadow-lg mb-8 group-hover:scale-110 transition-transform duration-500`}>
                    {value.icon}
                  </div>

                  {/* Number Badge */}
                  <div className="absolute top-6 right-6 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 font-bold text-lg group-hover:bg-emerald-100 group-hover:text-emerald-600 transition-all duration-300">
                    {String(index + 1).padStart(2, '0')}
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-emerald-700 transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{__html: value.description.replace(/\n/g, '<br/>')}}></p>

                  {/* Bottom Line */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${value.color} rounded-b-3xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-32 bg-gradient-to-br from-gray-900 via-emerald-900 to-gray-900 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-1/4 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-emerald-300 text-sm font-semibold mb-6 backdrop-blur-sm border border-white/10">
              <Zap className="w-4 h-4" />
              Benefits
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              {t('careers.benefits.title')}
            </h2>
            <p className="text-xl text-gray-300">
              {t('careers.benefits.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 hover:border-emerald-500/30 transition-all duration-500 hover:-translate-y-2"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-xl flex items-center justify-center text-white mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  {benefit.icon}
                </div>
                <h4 className="text-lg font-bold text-white mb-2">{benefit.title}</h4>
                <p className="text-gray-400 text-sm">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-semibold mb-6">
              <Briefcase className="w-4 h-4" />
              Open Positions
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              {t('careers.jobs.title')}
            </h2>
            <p className="text-xl text-gray-600">
              {t('careers.jobs.desc')}
            </p>
          </div>

          <div className="space-y-4">
            {positions.map((position, index) => (
              <div
                key={index}
                className="group relative bg-white border-2 border-gray-100 rounded-2xl p-6 lg:p-8 hover:border-emerald-400 hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-500 cursor-pointer"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
                        {position.dept}
                      </span>
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                        {position.type}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">
                      {position.role}
                    </h3>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 text-gray-500">
                      <MapPin className="w-4 h-4" />
                      <span>{position.location}</span>
                    </div>
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-emerald-500 transition-colors duration-300">
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <p className="text-gray-500 mb-4">{t('careers.positions.noMatch')}</p>
            <button className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-full font-semibold hover:bg-emerald-600 transition-colors duration-300">
              <Sparkles className="w-5 h-5" />
              {t('careers.positions.openApplication')}
            </button>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-32 bg-gradient-to-br from-emerald-600 via-emerald-500 to-cyan-500 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

        {/* Floating Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-6xl font-bold text-white mb-8">
            {t('careers.final.title')}
          </h2>
          <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
            {t('careers.final.desc')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-emerald-600 rounded-full font-bold hover:bg-gray-100 transition-colors duration-300 shadow-xl">
              <Briefcase className="w-5 h-5" />
              {t('careers.final.btn.jobs')}
            </button>
            <button className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white rounded-full font-bold hover:bg-white/20 transition-colors duration-300 border border-white/30">
              <Heart className="w-5 h-5" />
              {t('careers.final.btn.culture')}
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Careers;
