import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import { Calendar, Building2, TrendingUp, Award, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const History = () => {
  const { t } = useLanguage();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const historyItems = [
    // 2025년 프랜차이즈 진출 및 사업 다각화
    {
      year: "2025",
      month: "12",
      title: t('history.2025.12.title'),
      description: t('history.2025.12.desc'),
      icon: <Building2 className="h-5 w-5 text-white" />
    },
    {
      year: "2025",
      month: "11",
      title: t('history.2025.11.title'),
      description: t('history.2025.11.desc'),
      icon: <Award className="h-5 w-5 text-white" />
    },
    {
      year: "2025",
      month: "10",
      title: t('history.2025.10a.title'),
      description: t('history.2025.10a.desc'),
      icon: <TrendingUp className="h-5 w-5 text-white" />
    },
    {
      year: "2025",
      month: "10",
      title: t('history.2025.10b.title'),
      description: t('history.2025.10b.desc'),
      icon: <Building2 className="h-5 w-5 text-white" />
    },
    {
      year: "2025",
      month: "10",
      title: t('history.2025.10c.title'),
      description: t('history.2025.10c.desc'),
      icon: <Award className="h-5 w-5 text-white" />
    },
    {
      year: "2025",
      month: "09",
      title: t('history.2025.09.title'),
      description: t('history.2025.09.desc'),
      icon: <TrendingUp className="h-5 w-5 text-white" />
    },
    {
      year: "2025",
      month: "05",
      title: t('history.2025.05.title'),
      description: t('history.2025.05.desc'),
      icon: <TrendingUp className="h-5 w-5 text-white" />
    },
    // 2024년 도전의 시작
    {
      year: "2024",
      month: "11",
      title: t('history.2024.11.title'),
      description: t('history.2024.11.desc'),
      icon: <TrendingUp className="h-5 w-5 text-white" />
    },
    {
      year: "2024",
      month: "08",
      title: t('history.2024.08.title'),
      description: t('history.2024.08.desc'),
      icon: <TrendingUp className="h-5 w-5 text-white" />
    },
    {
      year: "2024",
      month: "07",
      title: t('history.2024.07.title'),
      description: t('history.2024.07.desc'),
      icon: <Building2 className="h-5 w-5 text-white" />
    }
  ];

  // 연도별로 그룹화
  const groupedItems = historyItems.reduce((acc, item) => {
    if (!acc[item.year]) {
      acc[item.year] = [];
    }
    acc[item.year].push(item);
    return acc;
  }, {} as Record<string, typeof historyItems>);

  const years = Object.keys(groupedItems).sort((a, b) => parseInt(b) - parseInt(a));

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navigation />

      {/* Page Banner */}
      <PageBanner
        title={t('nav.about.history')}
        backgroundImage="/momentum_foundation/images/banner_about.jpg"
      />

      {/* History Timeline Section */}
      <section className="relative py-24 bg-gradient-to-b from-slate-50 to-white">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 right-0 w-96 h-96 bg-emerald-100/50 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-teal-100/50 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className={`text-center mb-20 transition-all duration-700 delay-600 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 border border-emerald-200 rounded-full mb-6">
              <Calendar className="w-4 h-4 text-emerald-600" />
              <span className="text-emerald-700 text-sm font-medium tracking-wider uppercase">Timeline</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
              {t('history.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('history.desc')}
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline line with gradient */}
            <div className="absolute left-8 md:left-12 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-500 via-emerald-600/50 to-emerald-900/30"></div>

            <div className="space-y-4">
              {years.map((year, yearIndex) => (
                <div key={year} className={`transition-all duration-700 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: `${700 + yearIndex * 200}ms` }}>
                  {/* Year Header */}
                  <div className="relative flex items-center mb-8">
                    {/* Glowing Year Circle */}
                    <div className="relative flex-shrink-0">
                      <div className={`absolute inset-0 w-20 h-20 md:w-24 md:h-24 rounded-full blur-lg ${
                        year === '2025'
                          ? 'bg-emerald-500/40'
                          : 'bg-teal-500/30'
                      }`}></div>
                      <div className={`relative w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center shadow-2xl z-10 border-2 ${
                        year === '2025'
                          ? 'bg-gradient-to-br from-emerald-400 via-emerald-500 to-emerald-700 border-emerald-300/50'
                          : 'bg-gradient-to-br from-teal-400 via-teal-500 to-teal-700 border-teal-300/50'
                      }`}>
                        <span className="text-white font-bold text-xl md:text-2xl drop-shadow-lg">{year}</span>
                      </div>
                    </div>
                    <div className="ml-8 md:ml-10">
                      <h3 className="text-3xl md:text-4xl font-bold text-gray-900">
                        {year === '2025' ? t('history.2025.title') : t('history.2024.title')}
                      </h3>
                    </div>
                  </div>

                  {/* Year Items */}
                  {groupedItems[year].map((item, itemIndex) => (
                    <div
                      key={`${year}-${itemIndex}`}
                      className={`relative flex items-start mb-6 group transition-all duration-500 ${isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}
                      style={{ transitionDelay: `${800 + yearIndex * 200 + itemIndex * 100}ms` }}
                    >
                      {/* Icon Circle */}
                      <div className="absolute left-3 md:left-7">
                        <div className={`relative w-10 h-10 md:w-10 md:h-10 rounded-full flex items-center justify-center shadow-lg z-10 border-2 transition-all duration-300 group-hover:scale-110 ${
                          year === '2025'
                            ? 'bg-gradient-to-br from-emerald-400 to-emerald-600 border-emerald-300/50 group-hover:shadow-emerald-500/50 group-hover:shadow-xl'
                            : 'bg-gradient-to-br from-teal-400 to-teal-600 border-teal-300/50 group-hover:shadow-teal-500/50 group-hover:shadow-xl'
                        }`}>
                          {item.icon}
                        </div>
                      </div>

                      {/* Content Card */}
                      <div className="ml-20 md:ml-24 flex-1 bg-white rounded-2xl p-6 md:p-8 border border-gray-200 hover:border-emerald-300 transition-all duration-500 group-hover:shadow-xl group-hover:-translate-y-1">
                        {/* Month Badge */}
                        <div className="flex items-center mb-4">
                          <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-lg font-bold ${
                            year === '2025'
                              ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                              : 'bg-teal-100 text-teal-700 border border-teal-200'
                          }`}>
                            {item.month}{t('history.month.suffix')}
                          </span>
                        </div>

                        {/* Title */}
                        <h4 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 group-hover:text-emerald-700 transition-colors duration-300">
                          {item.title}
                        </h4>

                        {/* Description */}
                        <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                          {item.description}
                        </p>

                        {/* Decorative Corner */}
                        <div className={`absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                          year === '2025' ? 'text-emerald-500/10' : 'text-teal-500/10'
                        }`}>
                          <svg viewBox="0 0 100 100" fill="currentColor">
                            <path d="M100 0v100H0C0 44.77 44.77 0 100 0z"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="relative py-20 bg-gradient-to-t from-emerald-50 to-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-emerald-100/50 rounded-full blur-3xl"></div>
        </div>
        <div className={`relative z-10 max-w-4xl mx-auto px-4 text-center transition-all duration-700 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '1200ms' }}>
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-emerald-500"></div>
            <Sparkles className="w-6 h-6 text-emerald-500" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-emerald-500"></div>
          </div>
          <p className="text-2xl md:text-3xl font-light text-gray-700">
            {t('history.cta.text')}
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default History;
