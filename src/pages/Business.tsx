import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Building2, Truck, Users, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const Business = () => {
  const { t } = useLanguage();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const businessAreas = [
    {
title: t('business.area1.title'),
      description: t('business.area1.desc'),
      image: "/images/meat_products_20251219_072051.png",
      icon: <Building2 className="h-8 w-8" />,
      link: "/business/food",
features: [
        t('business.area1.feature1'),
        t('business.area1.feature2'),
        t('business.area1.feature3'),
        t('business.area1.feature4')
      ]
    },
{
title: t('business.area2.title'),
      description: t('business.area2.desc'),
      image: "https://skyagent-artifacts.skywork.ai/image/2001914996586934272/db7ed674-7238-439c-9b5c-b10bd2ecf3f7/prod_agent_2001914996586934272/meat_restaurant_separate_area_20251228081422_1.png",
      icon: <Truck className="h-8 w-8" />,
      link: "/business/franchise",
features: [
        t('business.area2.feature1'),
        t('business.area2.feature2'),
        t('business.area2.feature3'),
        t('business.area2.feature4')
      ]
    },
    {
title: t('business.area3.title'),
      description: t('business.area3.desc'),
      image: "/images/fm_outsourcing_services_20251223_070231.png",
      icon: <Users className="h-8 w-8" />,
      link: "/business/fm",
features: [
        t('business.area3.feature1'),
        t('business.area3.feature2'),
        t('business.area3.feature3'),
        t('business.area3.feature4')
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
                              <section className="bg-dusty-blue text-gray-800 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center ml-4 md:ml-16">
            <h1 className="text-2xl lg:text-3xl font-bold mr-4 whitespace-nowrap">
              사업영역
            </h1>
            <span className="text-gray-400 mx-3 text-2xl hidden md:inline">|</span>
            <span className="text-sm lg:text-base text-gray-700 font-medium hidden md:inline">
              다양한 분야에서 전문성을 바탕으로 고객에게 최상의 서비스를 제공합니다
            </span>
          </div>
        </div>
      </section>

      {/* Business Areas */}
<section className="py-20 bg-warm-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {businessAreas.map((area, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={area.image}
                    alt={area.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                  <div className="absolute top-4 left-4 bg-white/90 rounded-lg p-3">
                    <div className="text-sage-green">
                      {area.icon}
                    </div>
                  </div>
                </div>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-sage-green transition-colors whitespace-nowrap">
                    {area.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {area.description}
                  </p>
                  
                  <div className="space-y-3 mb-6">
                    {area.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-3">
<div className="w-2 h-2 bg-soft-green rounded-full flex-shrink-0"></div>
                        <span className="text-gray-600 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
<Button asChild className="w-full bg-soft-green hover:bg-warm-beige text-black hover:text-black">
                    <Link to={area.link}>
{t('business.viewMore')} <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Company Strength */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
{t('business.strengths.title')}
            </h2>
            <p className="text-xl text-gray-600">
{t('business.strengths.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="h-8 w-8 text-blue-600" />
              </div>
<h3 className="text-xl font-bold text-gray-900 mb-2">{t('business.strengths.expertise.title')}</h3>
              <p className="text-gray-600">{t('business.strengths.expertise.desc')}</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-green-600" />
              </div>
<h3 className="text-xl font-bold text-gray-900 mb-2">{t('business.strengths.efficiency.title')}</h3>
              <p className="text-gray-600 whitespace-pre-line">{t('business.strengths.efficiency.desc')}</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-yellow-600" />
              </div>
<h3 className="text-xl font-bold text-gray-900 mb-2">{t('business.strengths.reliability.title')}</h3>
              <p className="text-gray-600 whitespace-pre-line">{t('business.strengths.reliability.desc')}</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-purple-600" />
              </div>
<h3 className="text-xl font-bold text-gray-900 mb-2">{t('business.strengths.innovation.title')}</h3>
              <p className="text-gray-600">{t('business.strengths.innovation.desc')}</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Business;