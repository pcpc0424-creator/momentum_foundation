import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
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

      {/* Page Banner */}
      <PageBanner
        title={t('nav.about.ceo')}
        backgroundImage="/momentum_foundation/images/banner_about.jpg"
      />

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
