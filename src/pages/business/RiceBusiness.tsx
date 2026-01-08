import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Wheat, Award, Factory, Shield } from "lucide-react";

const RiceBusiness = () => {
  const features = [
    {
      icon: <Award className="h-8 w-8 text-sage-green" />,
      title: "브랜드 쌀 및 곡물류의 전문 유통 서비스",
      description: "엄선된 브랜드 쌀과 다양한 곡물류를 전문적으로 유통"
    },
    {
      icon: <Factory className="h-8 w-8 text-sage-green" />,
      title: "RPC 도정 시스템 활용한 신선한 쌀 제공",
      description: "최신 도정 기술로 가공된 신선하고 맛있는 쌀"
    },
    {
      icon: <Shield className="h-8 w-8 text-sage-green" />,
      title: "품질 보증",
      description: "철저한 품질 관리를 통한 안전하고 신뢰할 수 있는 곡물"
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
              미곡유통업
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              브랜드 쌀과 곡물류의 전문 유통 서비스
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                프리미엄 쌀과 곡물
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                모멘텀파운데이션은 전국 최고의 쌀 생산지에서 엄선된 브랜드 쌀과 
                다양한 곡물류를 RPC 도정 시스템을 통해 신선하게 가공하여 공급합니다.
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
            <div>
              <img
                src="/momentum_foundation/images/rice_products_20251219_072051.png"
                alt="쌌 제품"
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