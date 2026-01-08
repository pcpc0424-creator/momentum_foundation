import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Heart, Users, Award, MessageCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Culture = () => {
  const { t } = useLanguage();
  
  const workingPrinciples = [
    {
      icon: <Heart className="h-8 w-8 text-sage-green" />,
title: t('culture.principle1.title'),
      description: t('culture.principle1.desc')
    },
    {
      icon: <MessageCircle className="h-8 w-8 text-sage-green" />,
title: t('culture.principle2.title'),
      description: t('culture.principle2.desc')
    },
    {
      icon: <Award className="h-8 w-8 text-sage-green" />,
title: t('culture.principle3.title'),
      description: t('culture.principle3.desc')
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-cool-grey text-gray-800 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<div className="flex items-center ml-4 md:ml-16">
            <h1 className="text-2xl lg:text-3xl font-bold mr-4 whitespace-nowrap">
              기업문화
            </h1>
            <span className="text-gray-400 mx-3 text-2xl hidden md:inline">|</span>
            <span className="text-sm lg:text-base text-gray-700 font-medium hidden md:inline">
              함께 성장하고 발전하는 모멘텀파운데이션의 기업문화를 소개합니다
            </span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">


          {/* Working Principles */}
          <div className="mb-16">
<h3 className="text-2xl font-bold text-gray-900 mb-4 text-center title-expand">{t('culture.principles.title')}</h3>
            <p className="text-gray-600 text-center mb-8 max-w-3xl mx-auto">
              {t('culture.principles.desc')}
            </p>
            
            <div className="grid md:grid-cols-3 gap-8">
              {workingPrinciples.map((principle, index) => (
                <div key={index} className="text-center p-6 bg-gray-50 rounded-lg">
                  <div className="flex justify-center mb-4">
                    {principle.icon}
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-3">
                    {principle.title}
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    {principle.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Work Environment */}
          <div className="mb-16">
<h3 className="text-2xl font-bold text-gray-900 mb-4 text-center title-expand">{t('culture.environment.title')}</h3>
            <div className="bg-gray-50 p-8 rounded-lg">
              <p className="text-gray-700 leading-relaxed text-lg text-center max-w-4xl mx-auto">
{t('culture.environment.desc')}
              </p>
            </div>
          </div>

          {/* Growth and Learning */}
          <div className="mb-16">
<h3 className="text-2xl font-bold text-gray-900 mb-4 text-center title-expand">{t('culture.growth.title')}</h3>
            <div className="bg-gray-50 p-8 rounded-lg">
              <p className="text-gray-700 leading-relaxed text-lg text-center max-w-4xl mx-auto">
{t('culture.growth.desc')}
              </p>
            </div>
          </div>

          {/* Participation and Trust */}
          <div className="mb-16">
<h3 className="text-2xl font-bold text-gray-900 mb-4 text-center title-expand">{t('culture.trust.title')}</h3>
            <div className="bg-gray-50 p-8 rounded-lg">
              <p className="text-gray-700 leading-relaxed text-lg text-center max-w-4xl mx-auto">
{t('culture.trust.desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Culture;