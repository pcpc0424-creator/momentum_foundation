import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Apple, Leaf, Truck, Award } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const FruitBusiness = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: <Leaf className="h-8 w-8 text-sage-green" />,
      title: t('fruit.feature1.title'),
      description: t('fruit.feature1.desc')
    },
    {
      icon: <Award className="h-8 w-8 text-sage-green" />,
      title: t('fruit.feature2.title'),
      description: t('fruit.feature2.desc')
    },
    {
      icon: <Truck className="h-8 w-8 text-sage-green" />,
      title: t('fruit.feature3.title'),
      description: t('fruit.feature3.desc')
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-dusty-blue text-gray-800 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
              {t('fruit.title')}
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-700 max-w-3xl mx-auto">
              {t('fruit.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-16">
            <div>
              <img
                src="/momentum_foundation/images/fruit_products_20251219_072051.png"
                alt={t('fruit.products.alt')}
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
            <div className="text-center lg:text-left">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
                {t('fruit.headline')}
              </h2>
              <p className="text-base sm:text-lg text-gray-600 mb-6">
                {t('fruit.desc')}
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
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FruitBusiness;
