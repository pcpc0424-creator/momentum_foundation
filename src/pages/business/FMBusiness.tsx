import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Shield, Building2, Users, Award, CheckCircle, Settings, Star, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const FMBusiness = () => {
  const { t } = useLanguage();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  const partnerFeatures = [
    {
      icon: <Award className="h-7 w-7 text-emerald-400" />,
      title: t('fm.partner.feature1.title'),
      description: t('fm.partner.feature1.desc')
    },
    {
      icon: <Settings className="h-7 w-7 text-emerald-400" />,
      title: t('fm.partner.feature2.title'),
      description: t('fm.partner.feature2.desc')
    },
    {
      icon: <CheckCircle className="h-7 w-7 text-emerald-400" />,
      title: t('fm.partner.feature3.title'),
      description: t('fm.partner.feature3.desc')
    }
  ];

  const securityFeatures = [
    {
      icon: <Shield className="h-7 w-7 text-emerald-400" />,
      title: t('fm.security.feature1.title'),
      description: t('fm.security.feature1.desc')
    },
    {
      icon: <Settings className="h-7 w-7 text-emerald-400" />,
      title: t('fm.security.feature2.title'),
      description: t('fm.security.feature2.desc')
    },
    {
      icon: <Award className="h-7 w-7 text-emerald-400" />,
      title: t('fm.security.feature3.title'),
      description: t('fm.security.feature3.desc')
    },
    {
      icon: <CheckCircle className="h-7 w-7 text-emerald-400" />,
      title: t('fm.security.feature4.title'),
      description: t('fm.security.feature4.desc')
    }
  ];

  const fmFeatures = [
    {
      icon: <Building2 className="h-7 w-7 text-emerald-400" />,
      title: t('fm.building.feature1.title'),
      description: t('fm.building.feature1.desc')
    },
    {
      icon: <Settings className="h-7 w-7 text-emerald-400" />,
      title: t('fm.building.feature2.title'),
      description: t('fm.building.feature2.desc')
    },
    {
      icon: <Users className="h-7 w-7 text-emerald-400" />,
      title: t('fm.building.feature3.title'),
      description: t('fm.building.feature3.desc')
    },
    {
      icon: <Award className="h-7 w-7 text-emerald-400" />,
      title: t('fm.building.feature4.title'),
      description: t('fm.building.feature4.desc')
    }
  ];

  return (
    <div className="min-h-screen bg-gray-950">
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

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
          <div className={`text-center transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Premium Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full mb-8 backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-emerald-400" />
              <span className="text-emerald-300 text-sm font-medium tracking-wide">PREMIUM FACILITY MANAGEMENT</span>
              <Sparkles className="h-4 w-4 text-emerald-400" />
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
              {t('fm.title')}
            </h1>

            <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-green-500 mx-auto mb-8 rounded-full" />

            <p className="text-xl md:text-2xl text-emerald-200/90 max-w-3xl mx-auto leading-relaxed font-light">
              {t('fm.subtitle')}
            </p>

            {/* Stats Bar */}
            <div className={`mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-emerald-400">20+</div>
                <div className="text-gray-400 text-sm mt-1">Years Experience</div>
              </div>
              <div className="text-center border-x border-gray-700">
                <div className="text-3xl md:text-4xl font-bold text-emerald-400">500+</div>
                <div className="text-gray-400 text-sm mt-1">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-emerald-400">99%</div>
                <div className="text-gray-400 text-sm mt-1">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-950 to-transparent" />
      </section>

      {/* Main Headline Section */}
      <section className={`py-20 bg-gray-950 transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-6">
              <Star className="h-4 w-4 text-emerald-400" />
              <span className="text-emerald-400 text-xs font-medium uppercase tracking-wider">Our Mission</span>
            </div>
            <p className="text-2xl md:text-3xl lg:text-4xl font-bold max-w-4xl mx-auto leading-relaxed bg-gradient-to-r from-emerald-300 via-green-400 to-emerald-300 bg-clip-text text-transparent">
              {t('fm.headline')}
            </p>
          </div>
        </div>
      </section>

      {/* Partner Services Section */}
      <section className="py-20 bg-gradient-to-b from-gray-950 to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-6">
              <Award className="h-4 w-4 text-emerald-400" />
              <span className="text-emerald-400 text-xs font-medium uppercase tracking-wider">Partner Network</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              {t('fm.partner.title')}
            </h2>
            <p className="text-lg text-gray-400 max-w-4xl mx-auto leading-relaxed">
              {t('fm.partner.desc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {partnerFeatures.map((feature, index) => (
              <div
                key={index}
                className={`group relative bg-gradient-to-b from-gray-800/50 to-gray-900/50 rounded-2xl p-8 border border-gray-700/50 hover:border-emerald-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-500/10 hover:-translate-y-2 backdrop-blur-sm ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative">
                  <div className="flex justify-center mb-6">
                    <div className="p-4 bg-emerald-500/10 rounded-xl group-hover:bg-emerald-500/20 transition-colors duration-300">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 text-center group-hover:text-emerald-300 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed text-center" dangerouslySetInnerHTML={{__html: feature.description.replace(/\n/g, '<br/>')}}></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Services Section */}
      <section className="py-20 bg-gray-900 relative overflow-hidden">
        {/* Background Orb */}
        <div className="absolute -left-40 top-1/2 -translate-y-1/2 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className={`relative group transition-all duration-700 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-2xl blur-2xl group-hover:blur-3xl transition-all duration-500" />
              <img
                src="/momentum_foundation/images/business_team_20251219_072051.png"
                alt={t('fm.security.alt')}
                className="relative rounded-2xl shadow-2xl w-full h-auto border border-gray-700/50 group-hover:border-emerald-500/30 transition-all duration-500"
              />
              {/* Premium Badge on Image */}
              <div className="absolute top-4 left-4 px-3 py-1 bg-emerald-500/90 backdrop-blur-sm rounded-full">
                <span className="text-white text-xs font-semibold">PREMIUM SERVICE</span>
              </div>
            </div>
            <div className={`transition-all duration-700 delay-200 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-6">
                <Shield className="h-4 w-4 text-emerald-400" />
                <span className="text-emerald-400 text-xs font-medium uppercase tracking-wider">Security Management</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                {t('fm.security.title')}
              </h2>
              <p className="text-lg text-gray-400 mb-6 leading-relaxed">
                {t('fm.security.desc')}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {securityFeatures.map((feature, index) => (
              <div
                key={index}
                className={`group bg-gradient-to-b from-emerald-900/30 to-gray-900/50 rounded-xl p-6 text-center border border-emerald-500/20 hover:border-emerald-400/50 transition-all duration-500 hover:shadow-lg hover:shadow-emerald-500/10 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${300 + index * 100}ms` }}
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-emerald-500/10 rounded-lg group-hover:bg-emerald-500/20 transition-colors duration-300">
                    {feature.icon}
                  </div>
                </div>
                <h4 className="font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors duration-300">
                  {feature.title}
                </h4>
                <p className="text-gray-400 text-sm whitespace-pre-line">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Building Management Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-950 relative overflow-hidden">
        {/* Background Orbs */}
        <div className="absolute right-0 top-20 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute left-20 bottom-40 w-72 h-72 bg-green-500/5 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-b from-gray-800/40 to-gray-900/40 rounded-3xl p-8 lg:p-12 border border-gray-700/50 backdrop-blur-sm">
            <div className={`text-center mb-12 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-6">
                <Building2 className="h-4 w-4 text-emerald-400" />
                <span className="text-emerald-400 text-xs font-medium uppercase tracking-wider">Total FM Solution</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                {t('fm.building.title')}
              </h2>
              <p className="text-lg text-gray-400 max-w-4xl mx-auto leading-relaxed whitespace-pre-line">
                {t('fm.building.desc')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {fmFeatures.map((feature, index) => (
                <div
                  key={index}
                  className={`group bg-gray-900/70 rounded-xl p-6 text-center border border-gray-700/50 hover:border-emerald-500/40 transition-all duration-500 hover:shadow-xl hover:shadow-emerald-500/5 hover:-translate-y-1 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  style={{ transitionDelay: `${400 + index * 100}ms` }}
                >
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-emerald-500/10 rounded-lg group-hover:bg-emerald-500/20 transition-colors duration-300">
                      {feature.icon}
                    </div>
                  </div>
                  <h4 className="font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors duration-300">
                    {feature.title}
                  </h4>
                  <p className="text-gray-400 text-sm whitespace-pre-line">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Service Areas */}
            <div className={`bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700/50 transition-all duration-700 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h3 className="text-2xl font-bold text-white mb-8 text-center">
                {t('fm.areas.title')}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="group text-center">
                  <div className="bg-gradient-to-b from-emerald-500/20 to-emerald-500/5 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 group-hover:from-emerald-500/30 group-hover:to-emerald-500/10 transition-all duration-300 border border-emerald-500/20">
                    <Shield className="h-10 w-10 text-emerald-400" />
                  </div>
                  <h4 className="font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors duration-300">{t('fm.areas.security.title')}</h4>
                  <p className="text-gray-400 text-sm">{t('fm.areas.security.desc')}</p>
                </div>
                <div className="group text-center">
                  <div className="bg-gradient-to-b from-emerald-500/20 to-emerald-500/5 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 group-hover:from-emerald-500/30 group-hover:to-emerald-500/10 transition-all duration-300 border border-emerald-500/20">
                    <Building2 className="h-10 w-10 text-emerald-400" />
                  </div>
                  <h4 className="font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors duration-300">{t('fm.areas.facility.title')}</h4>
                  <p className="text-gray-400 text-sm">{t('fm.areas.facility.desc')}</p>
                </div>
                <div className="group text-center">
                  <div className="bg-gradient-to-b from-emerald-500/20 to-emerald-500/5 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 group-hover:from-emerald-500/30 group-hover:to-emerald-500/10 transition-all duration-300 border border-emerald-500/20">
                    <Users className="h-10 w-10 text-emerald-400" />
                  </div>
                  <h4 className="font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors duration-300">{t('fm.areas.environment.title')}</h4>
                  <p className="text-gray-400 text-sm">{t('fm.areas.environment.desc')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-900 via-gray-900 to-emerald-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
        <div className="absolute left-1/4 top-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute right-1/4 bottom-0 w-64 h-64 bg-green-500/10 rounded-full blur-3xl" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Facility Management?
          </h2>
          <p className="text-lg text-emerald-200/80 mb-8">
            Experience premium FM services tailored to your business needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-500 text-white font-semibold rounded-xl hover:from-emerald-400 hover:to-green-400 transition-all duration-300 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40">
              Contact Us Today
            </button>
            <button className="px-8 py-4 bg-transparent border-2 border-emerald-500/50 text-emerald-300 font-semibold rounded-xl hover:bg-emerald-500/10 hover:border-emerald-400 transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FMBusiness;
