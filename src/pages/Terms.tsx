import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const Terms = () => {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header Section */}
<section className="bg-[#E8F5E9] text-gray-800 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center ml-4 md:ml-16">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mr-2 sm:mr-4">
              {t('terms.hero.title')}
            </h1>
            <span className="text-gray-400 mx-3 text-2xl hidden md:inline">|</span>
            <span className="text-sm lg:text-base text-gray-700 font-medium hidden md:inline">
              {t('terms.hero.subtitle')}
            </span>
          </div>
        </div>
      </section>

      {/* Content Section */}
<section className="flex-grow py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="prose max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">홈페이지 이용약관</h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">제1조 (목적)</h3>
                  <p className="text-gray-700">
                    본 약관은 프라임코어 주식회사(이하 '회사')가 제공하는 홈페이지 서비스의 이용조건 및 절차에 관한 사항을 규정함을 목적으로 합니다.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">제2조 (용어의 정의)</h3>
                  <p className="text-gray-700">
                    '이용자'란 본 홈페이지에 접속하여 회사가 제공하는 콘텐츠를 이용하는 자를 말합니다.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">제3조 (저작권의 귀속)</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>회사가 작성한 저작물에 대한 저작권 및 기타 지식재산권은 회사에 귀속됩니다.</li>
                    <li>이용자는 홈페이지의 정보를 회사의 사전 승낙 없이 복제, 송신, 배포 등 상업적 목적으로 이용할 수 없습니다.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">제4조 (이용자의 의무)</h3>
                  <p className="text-gray-700 mb-3">이용자는 다음 행위를 하여서는 안 됩니다.</p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>홈페이지의 정상적인 운영을 방해하는 행위</li>
                    <li>회사 또는 타인의 명예를 훼손하거나 지식재산권을 침해하는 행위</li>
                    <li>기타 관련 법령에 위배되는 행위</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">제5조 (면책조항)</h3>
                  <p className="text-gray-700">
                    회사는 천재지변, 서비스 점검 등 불가항력적인 사유로 서비스 제공이 일시 중단됨에 따른 손해에 대해 책임을 지지 않습니다.
                  </p>
                </div>

                <div className="border-t pt-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">
                      <strong>부칙:</strong> 본 약관은 2025년 12월 29일부터 시행됩니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Terms;