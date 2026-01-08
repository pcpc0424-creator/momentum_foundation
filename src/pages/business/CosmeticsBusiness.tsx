import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Sparkles, Award, Truck, Users } from "lucide-react";

const CosmeticsBusiness = () => {
  const features = [
    {
      icon: <Award className="h-8 w-8 text-sage-green" />,
      title: "프리미엄 화장품 브랜드",
      description: "엄선된 국내외 우수 화장품 브랜드 전문 도매"
    },
    {
      icon: <Sparkles className="h-8 w-8 text-sage-green" />,
      title: "다양한 제품군",
      description: "스킨케어, 메이크업, 바디케어 등 전 카테고리 취급"
    },
    {
      icon: <Truck className="h-8 w-8 text-sage-green" />,
      title: "안정적인 공급망",
      description: "체계적인 재고 관리와 신속한 배송 서비스"
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
              화장품도소매
            </h1>
            <span className="text-gray-400 mx-3 text-2xl hidden md:inline">|</span>
            <span className="text-sm lg:text-base text-gray-700 font-medium hidden md:inline">
              프리미엄 화장품 및 화장용품의 전문 도소매 서비스
            </span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <img
                src="/momentum_foundation/images/cosmetics_products_20251219_072054.png"
                alt="화장품 제품"
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                뷰티 트렌드를 선도하는 화장품
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                모멘텀파운데이션은 국내외 우수한 화장품 브랜드와 파트너십을 구축하여 
                최신 뷰티 트렌드를 반영한 다양한 화장품을 도매로 공급합니다.
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

export default CosmeticsBusiness;