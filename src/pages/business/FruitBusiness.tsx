import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Apple, Leaf, Truck, Award } from "lucide-react";

const FruitBusiness = () => {
  const features = [
    {
      icon: <Leaf className="h-8 w-8 text-sage-green" />,
      title: "신선한 계절 과일",
      description: "제철 과일을 엄선하여 최상의 신선도로 공급"
    },
    {
      icon: <Award className="h-8 w-8 text-sage-green" />,
      title: "프리미엄 품질",
      description: "까다로운 선별 기준을 통과한 고품질 과일만 취급"
    },
    {
      icon: <Truck className="h-8 w-8 text-sage-green" />,
      title: "신속한 배송",
      description: "수확 후 최단 시간 내 고객에게 전달하는 시스템"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-dusty-blue text-gray-800 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl lg:text-4xl font-bold">
              과일유통업
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              신선하고 달콤한 계절 과일의 전문 유통 서비스
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <img
                src="/momentum_foundation/images/fruit_products_20251219_072051.png"
                alt="과일 제품"
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                신선함이 살아있는 과일
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                모멘텀파운데이션은 전국 각지의 우수한 과일 농가와 직접 계약하여 
                가장 신선하고 맛있는 제철 과일을 고객에게 공급합니다.
              </p>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">
                        {feature.title}
                      </h4>
                      <p className="text-gray-600">
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