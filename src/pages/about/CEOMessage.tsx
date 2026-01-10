import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Quote } from "lucide-react";

const CEOMessage = () => {
  const { t } = useLanguage();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoaded(true);
  }, []);

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
              <span className="text-sm font-medium tracking-wider uppercase">CEO Message</span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-4">
              {t('ceo.title')}
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl">
              {t('ceo.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* CEO Message Content */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/momentum_foundation/images/company_building_20251219_072052.png"
            alt="배경"
            className="w-full h-full object-cover opacity-5"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white/95 to-gray-50" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Quote Icon */}
          <div className={`flex justify-center mb-8 transition-all duration-700 delay-200 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center shadow-xl shadow-emerald-500/25">
              <Quote className="w-8 h-8 text-white" />
            </div>
          </div>

          {/* Headline */}
          <div className={`text-center mb-12 transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-2xl lg:text-4xl font-bold text-gray-900 leading-relaxed">
              {t('ceo.headline')}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-green-500 mx-auto mt-6 rounded-full" />
          </div>

          {/* Message Card */}
          <div className={`transition-all duration-700 delay-400 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl blur opacity-10" />
              <div className="relative bg-white rounded-2xl shadow-xl p-8 lg:p-12 border border-gray-100">
                <div className="space-y-6 text-lg text-gray-600 leading-loose">
                  <p className="first-letter:text-5xl first-letter:font-bold first-letter:text-emerald-600 first-letter:float-left first-letter:mr-3 first-letter:leading-none">
                    {t('ceo.message.para1')}
                  </p>

                  <p>{t('ceo.message.para2')}</p>

                  <p>{t('ceo.message.para3')}</p>

                  <p>{t('ceo.message.para4')}</p>

                  <p className="text-emerald-700 font-medium text-xl">{t('ceo.closing')}</p>

                  {/* Signature */}
                  <div className="mt-12 pt-8 border-t border-gray-200">
                    <div className="flex flex-col items-end">
                      <p className="text-2xl font-bold text-gray-900 mb-4">{t('ceo.company')}</p>
                      <div className="space-y-2 text-right">
                        <div className="flex items-center gap-3 justify-end">
                          <div className="w-12 h-px bg-emerald-500" />
                          <p className="text-lg text-gray-700 font-medium">{t('ceo.ceo1')}</p>
                        </div>
                        <div className="flex items-center gap-3 justify-end">
                          <div className="w-12 h-px bg-emerald-500" />
                          <p className="text-lg text-gray-700 font-medium">{t('ceo.ceo2')}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CEOMessage;
