import { useLanguage } from "@/contexts/LanguageContext";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const About = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Main Content - No Hero Section, Empty space at top */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Empty space where headline used to be */}
          <div className="mb-16"></div>

          {/* Main Content with Headline at the very beginning of text content */}
          <div className="mb-16 max-w-4xl mx-auto">
            {/* Headline moved down to text content area */}
<h1 className="text-3xl lg:text-4xl font-bold text-primary-dark mb-8 title-expand text-center">
              {t('about.headline')}
            </h1>
            
            {/* Company Description starts right after headline */}
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              {t('company.desc1')}
            </p>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              {t('company.desc2')}
            </p>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              {t('company.desc3')}
            </p>
          </div>

          {/* Company Office Image */}
          <div className="mb-16 text-center">
            <img 
              src="/momentum_foundation/images/company_office_interior_20260105_150140.png" 
              alt={t('company.office.alt')}
              className="mx-auto rounded-lg shadow-lg max-w-3xl w-full"
            />
          </div>

          {/* Core Values Section */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-primary-dark mb-4 title-expand">
                {t('company.values.title')}
              </h2>
              <p className="text-xl text-gray-600">
                {t('company.values.subtitle')}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-white">🛡️</span>
                </div>
                <h3 className="text-xl font-bold text-primary-dark mb-3 title-expand">{t('company.values.trust.title')}</h3>
                <p className="text-gray-600">{t('company.values.trust.desc')}</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-white">🎯</span>
                </div>
                <h3 className="text-xl font-bold text-primary-dark mb-3 title-expand">{t('company.values.expertise.title')}</h3>
                <p className="text-gray-600">{t('company.values.expertise.desc')}</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-white">🚀</span>
                </div>
                <h3 className="text-xl font-bold text-primary-dark mb-3 title-expand">{t('company.values.innovation.title')}</h3>
                <p className="text-gray-600">{t('company.values.innovation.desc')}</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-white">🤝</span>
                </div>
                <h3 className="text-xl font-bold text-primary-dark mb-3 title-expand">{t('company.values.responsibility.title')}</h3>
                <p className="text-gray-600">{t('company.values.responsibility.desc')}</p>
              </div>
            </div>
          </div>

          {/* Our Promise Section */}
          <div className="bg-gray-50 rounded-2xl p-8 lg:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl lg:text-4xl font-bold text-primary-dark mb-4 title-expand">
                {t('company.promise.title')}
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                {t('company.promise.desc')}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl text-white">👥</span>
                </div>
                <h3 className="text-xl font-bold text-primary-dark mb-3 title-expand">{t('company.promise.customer.title')}</h3>
                <p className="text-gray-600">{t('company.promise.customer.desc')}</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-primary-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl text-white">✅</span>
                </div>
                <h3 className="text-xl font-bold text-primary-dark mb-3 title-expand">{t('company.promise.quality.title')}</h3>
                <p className="text-gray-600">{t('company.promise.quality.desc')}</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-primary-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl text-white">💎</span>
                </div>
                <h3 className="text-xl font-bold text-primary-dark mb-3 title-expand">{t('company.promise.value.title')}</h3>
                <p className="text-gray-600">{t('company.promise.value.desc')}</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;