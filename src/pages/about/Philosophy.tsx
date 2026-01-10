import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Heart, Users, Globe, Lightbulb, Target, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Philosophy = () => {
  const { t } = useLanguage();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoaded(true);
  }, []);

  const values = [
    {
      icon: <Target className="h-10 w-10" />,
      title: t('philosophy.mission.title'),
      subtitle: t('philosophy.mission.subtitle'),
      description: t('philosophy.mission.desc'),
      gradient: "from-emerald-500 to-green-600"
    },
    {
      icon: <Heart className="h-10 w-10" />,
      title: t('philosophy.values.title'),
      subtitle: t('philosophy.values.subtitle'),
      description: t('philosophy.values.desc'),
      gradient: "from-teal-500 to-emerald-600"
    },
    {
      icon: <Sparkles className="h-10 w-10" />,
      title: t('philosophy.vision.title'),
      subtitle: t('philosophy.vision.subtitle'),
      description: t('philosophy.vision.desc'),
      gradient: "from-green-500 to-teal-600"
    }
  ];

  const coreValues = [
    {
      icon: <Heart className="h-6 w-6" />,
      title: t('philosophy.core.happiness.title'),
      description: t('philosophy.core.happiness.desc'),
      number: "01"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: t('philosophy.core.sharing.title'),
      description: t('philosophy.core.sharing.desc'),
      number: "02"
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: t('philosophy.core.contribution.title'),
      description: t('philosophy.core.contribution.desc'),
      number: "03"
    },
    {
      icon: <Lightbulb className="h-6 w-6" />,
      title: t('philosophy.core.future.title'),
      description: t('philosophy.core.future.desc'),
      number: "04"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Premium Hero Section */}
      <section className="relative min-h-[50vh] flex items-center bg-gradient-to-br from-gray-900 via-gray-800 to-emerald-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <div className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex items-center gap-2 text-emerald-400 mb-4">
              <span className="w-8 h-px bg-emerald-400"></span>
              <span className="text-sm font-medium tracking-wider uppercase">Philosophy</span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-4">
              {t('about.philosophy.title')}
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl">
              {t('philosophy.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy Overview - Premium Cards */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-300 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-700 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="inline-block px-4 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-4">PHILOSOPHY</span>
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
              {t('philosophy.title1')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('philosophy.desc1')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className={`group relative transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${300 + index * 100}ms` }}
              >
                <div className="relative bg-white rounded-2xl p-8 h-full border border-gray-100 hover:border-emerald-200 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden">
                  {/* Gradient Background on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-green-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10">
                    {/* Icon */}
                    <div className={`w-16 h-16 bg-gradient-to-br ${value.gradient} rounded-2xl flex items-center justify-center text-white shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      {value.icon}
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-emerald-700 transition-colors">
                      {value.title}
                    </h3>
                    <p className="text-emerald-600 font-semibold mb-4">
                      {value.subtitle}
                    </p>
                    <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                      {value.description}
                    </p>
                  </div>

                  {/* Bottom Accent */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values Detail - Premium Grid */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-4">CORE VALUES</span>
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
              {t('philosophy.title2')}
            </h2>
            <p className="text-xl text-gray-600">
              {t('philosophy.desc2')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {coreValues.map((value, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 hover:border-emerald-200 overflow-hidden"
              >
                {/* Number Badge */}
                <div className="absolute -top-2 -right-2 w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                  {value.number}
                </div>

                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                    {value.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-700 transition-colors">
                      {value.title}
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>

                {/* Hover Effect Line */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Philosophy;
