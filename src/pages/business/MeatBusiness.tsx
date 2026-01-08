import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Beef, Award, Truck, Shield } from "lucide-react";

const MeatBusiness = () => {
  const features = [
    {
      icon: <Award className="h-8 w-8 text-sage-green" />,
      title: "프리미엄 국내산 한우와 한돈 취급",
      description: "엄선된 국내 최고급 한우와 한돈만을 공급합니다"
    },
    {
      icon: <Shield className="h-8 w-8 text-sage-green" />,
      title: "철저한 품질 관리",
      description: "HACCP 인증 시설에서 안전하게 관리되는 육류"
    },
    {
      icon: <Truck className="h-8 w-8 text-sage-green" />,
      title: "콜드체인 시스템",
      description: "신선도 유지를 위한 완벽한 냉장 유통 시스템"
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
              육류유통업
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              프리미엄 국내산 한우와 한돈의 전문 유통 서비스
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
                최고 품질의 육류 유통
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                모멘텀파운데이션은 국내 최고급 한우와 한돈을 엄선하여 고객에게 신선하고 안전한 육류를 공급합니다. 
                철저한 품질 관리와 완벽한 콜드체인 시스템을 통해 최상의 품질을 보장합니다.
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
                src="/momentum_foundation/images/meat_products_20251219_072051.png"
                alt="육류 제품"
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

export default MeatBusiness;