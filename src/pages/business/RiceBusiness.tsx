import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import { Wheat, Award, Factory, Shield } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const RiceBusiness = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: <Award className="h-8 w-8 text-sage-green" />,
      title: t('rice.feature1.title'),
      description: t('rice.feature1.desc')
    },
    {
      icon: <Factory className="h-8 w-8 text-sage-green" />,
      title: t('rice.feature2.title'),
      description: t('rice.feature2.desc')
    },
    {
      icon: <Shield className="h-8 w-8 text-sage-green" />,
      title: t('rice.feature3.title'),
      description: t('rice.feature3.desc')
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Page Banner */}
      <PageBanner
        title={t('rice.title')}
        backgroundImage="/momentum_foundation/images/banner_business.png"
      />

      {/* Main Content */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-16">
            <div className="text-center lg:text-left">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
                {t('rice.headline')}
              </h2>
              <p className="text-base sm:text-lg text-gray-600 mb-6">
                {t('rice.desc')}
              </p>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex flex-col sm:flex-row items-center sm:items-start space-y-2 sm:space-y-0 sm:space-x-4 text-center sm:text-left">
                    <div className="flex-shrink-0">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">
                        {feature.title}
                      </h4>
                      <p className="text-gray-600 text-sm sm:text-base">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="order-first lg:order-last">
              <img
                src="/momentum_foundation/images/rice_products_20251219_072051.png"
                alt={t('rice.products.alt')}
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default RiceBusiness;
