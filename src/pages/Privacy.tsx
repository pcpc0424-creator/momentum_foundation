import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header Section */}
<section className="bg-[#E8F5E9] text-gray-800 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center ml-4 md:ml-16">
            <h1 className="text-2xl lg:text-3xl font-bold mr-4 whitespace-nowrap">
              개인정보 처리방침
            </h1>
            <span className="text-gray-400 mx-3 text-2xl hidden md:inline">|</span>
            <span className="text-sm lg:text-base text-gray-700 font-medium hidden md:inline">
              개인정보 보호를 위한 처리방침
            </span>
          </div>
        </div>
      </section>

      {/* Content Section */}
<section className="flex-grow py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="prose max-w-none">
              <p className="text-lg text-gray-700 mb-8">
                모멘텀파운데이션 주식회사(이하 '회사')는 이용자의 개인정보를 소중히 다루며, 관련 법령을 준수합니다.
              </p>

              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">1. 개인정보의 처리 목적 및 항목</h2>
                  <p className="text-gray-700 mb-4">
                    회사는 별도의 회원가입 없이 운영되며, 서비스 이용 과정에서 아래 정보가 자동으로 생성되어 수집될 수 있습니다.
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li><strong>수집항목:</strong> 접속 IP 정보, 쿠키, 방문 기록 등</li>
                    <li><strong>목적:</strong> 서비스 개선 및 통계 분석</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">2. 개인정보의 보유 및 이용기간</h2>
                  <p className="text-gray-700">
                    이용자의 개인정보는 원칙적으로 수집 및 이용목적이 달성되면 지체 없이 파기합니다.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">3. 개인정보의 파기절차 및 방법</h2>
                  <p className="text-gray-700">
                    전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제합니다.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">4. 이용자 및 법정대리인의 권리와 그 행사방법</h2>
                  <p className="text-gray-700">
                    이용자는 언제든지 자신의 개인정보를 열람하거나 수정을 요청할 수 있습니다.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">5. 개인정보 보호책임자</h2>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <ul className="text-gray-700 space-y-2">
                      <li><strong>성명/직함:</strong> 최서연 / 경영관리본부 경영지원팀장</li>
                      <li><strong>전화번호:</strong> (02)6949-3360</li>
                      <li><strong>E-mail:</strong> privacy@onemomentum.co.kr</li>
                    </ul>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <div className="text-sm text-gray-600 space-y-1">
                    <p><strong>공고일자:</strong> 2025년 12월 29일</p>
                    <p><strong>시행일자:</strong> 2025년 12월 29일</p>
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

export default Privacy;