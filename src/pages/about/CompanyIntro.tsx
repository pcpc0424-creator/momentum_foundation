import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import { Building2, Users, Shield, ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const CompanyIntro = () => {
  const { t } = useLanguage();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoaded(true);
  }, []);

  const businessAreas = [
    {
      icon: <Building2 className="h-8 w-8" />,
      title: t('business.food.title'),
      description: t('business.food.desc'),
      color: "emerald",
      details: [
        { name: t('business.meat.title'), desc: t('business.meat.desc') },
        { name: t('business.fruit.title'), desc: t('business.fruit.desc') },
        { name: t('business.rice.title'), desc: t('business.rice.desc') }
      ]
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: t('business.franchise.title'),
      subtitle: t('business.franchise.subtitle'),
      description: t('business.franchise.desc'),
      color: "teal"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: t('business.fm.title'),
      description: t('business.fm.desc'),
      color: "green"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Page Banner */}
      <PageBanner
        title={t('nav.about.intro')}
        backgroundImage="/momentum_foundation/images/banner_about.jpg"
      />

      {/* Company Overview - Premium */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-emerald-50/50 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className={`text-center mb-16 transition-all duration-700 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="inline-block px-4 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-4">OVERVIEW</span>
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 leading-tight">
              {t('companyintro.main.title')}
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className={`space-y-6 transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
              <p className="text-lg text-gray-600 leading-relaxed">
                {t('companyintro.desc1')}
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                {t('companyintro.desc2')}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-8">
                {[
                  { number: "3+", label: t('about.stats.business') },
                  { number: "100%", label: t('about.stats.satisfaction') },
                  { number: "24/7", label: t('about.stats.service') }
                ].map((stat, index) => (
                  <div key={index} className="text-center p-3 sm:p-4 bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl">
                    <div className="text-xl sm:text-2xl font-bold text-emerald-600">{stat.number}</div>
                    <div className="text-xs sm:text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className={`relative transition-all duration-700 delay-400 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
              <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl blur-2xl opacity-20" />
              <img
                src="/momentum_foundation/images/company_office_interior_20260105_150140.png"
                alt={t('company.office.alt')}
                className="relative rounded-2xl shadow-2xl w-full h-80 object-cover object-bottom"
                style={{objectPosition: '50% 70%'}}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Core Business - Premium Cards */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-4">BUSINESS</span>
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
              {t('companyintro.core.title')}
            </h2>
          </div>

          <div className="space-y-8">
            {businessAreas.map((area, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-emerald-200"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="p-6 sm:p-8 lg:p-10">
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 mb-6 text-center sm:text-left">
                    <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-500/25 group-hover:scale-110 transition-transform duration-300">
                      {area.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-center sm:justify-start gap-3">
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">
                          {area.title}
                        </h3>
                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all hidden sm:block" />
                      </div>
                      {area.subtitle && (
                        <p className="text-emerald-600 font-medium mt-1">{area.subtitle}</p>
                      )}
                    </div>
                  </div>

                  <p className="text-gray-600 leading-relaxed mb-8 text-center sm:text-left sm:pl-20">
                    {area.description}
                  </p>

                  {area.details && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:pl-20">
                      {area.details.map((detail, detailIndex) => (
                        <div
                          key={detailIndex}
                          className="relative bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-100 hover:border-emerald-200 hover:shadow-md transition-all duration-300 group/card"
                        >
                          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-emerald-500 to-green-500 rounded-l-xl opacity-0 group-hover/card:opacity-100 transition-opacity" />
                          <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover/card:text-emerald-600 transition-colors">
                            {detail.name}
                          </h4>
                          <p className="text-gray-600 text-sm leading-relaxed">
                            {detail.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CompanyIntro;
