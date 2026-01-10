import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Users, Building2, Truck, Briefcase, ShoppingCart, Shield, Crown, UserCircle, Search } from "lucide-react";

const Organization = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoaded(true);
  }, []);

  const executives = [
    { title: "이사회", icon: <Users className="w-5 h-5" /> },
    { title: "회장", icon: <Crown className="w-5 h-5" />, highlight: true },
    { title: "감사", icon: <Search className="w-5 h-5" /> }
  ];

  const divisions = [
    {
      title: "경영관리본부",
      icon: <Briefcase className="w-8 h-8" />,
      color: "from-blue-500 to-blue-600",
      borderColor: "border-blue-400",
      bgColor: "bg-blue-50",
      teams: ["경영지원팀", "재경회계팀", "기획/IR팀"],
      description: "조직 운영 지원, 재무 관리, 사업 기획 및 인사 관리"
    },
    {
      title: "식자재사업본부",
      icon: <ShoppingCart className="w-8 h-8" />,
      color: "from-emerald-500 to-green-600",
      borderColor: "border-emerald-400",
      bgColor: "bg-emerald-50",
      teams: ["국내영업팀", "온라인사업팀", "물류팀", "상품개발팀", "품질관리팀"],
      description: "식자재 가공·유통, 품질 관리 및 공급망 관리"
    },
    {
      title: "프랜차이즈사업본부",
      icon: <Truck className="w-8 h-8" />,
      color: "from-amber-500 to-orange-600",
      borderColor: "border-amber-400",
      bgColor: "bg-amber-50",
      teams: ["가맹영업팀", "슈퍼바이징팀", "메뉴/상품기획팀"],
      description: "청년축산 브랜드 운영, 가맹점 관리 및 창업 지원"
    },
    {
      title: "FM/아웃소싱사업본부",
      icon: <Building2 className="w-8 h-8" />,
      color: "from-cyan-500 to-teal-600",
      borderColor: "border-cyan-400",
      bgColor: "bg-cyan-50",
      teams: ["사업영업팀", "현장운영팀"],
      description: "시설 관리, 경비용역, 아웃소싱 솔루션 제공"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Premium Hero Section */}
      <section className="relative min-h-[50vh] flex items-center bg-gradient-to-br from-gray-900 via-gray-800 to-emerald-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <div className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex items-center gap-2 text-emerald-400 mb-4">
              <span className="w-8 h-px bg-emerald-400"></span>
              <span className="text-sm font-medium tracking-wider uppercase">Organization</span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-4">
              조직도
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl">
              체계적이고 전문적인 조직 구성으로 최상의 서비스를 제공합니다
            </p>
          </div>
        </div>
      </section>

      {/* Organization Chart Section */}
      <section className="py-24 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-emerald-100/50 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-100/50 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Section Title */}
          <div className={`text-center mb-16 transition-all duration-700 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="inline-block px-4 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-4">CHART</span>
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
              회사 조직도
            </h2>
          </div>

          {/* Executive Level - 최고 경영진 */}
          <div className={`mb-12 transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex justify-center mb-6">
              <div className="inline-flex items-center gap-2 px-6 py-2 bg-gray-800 text-white rounded-full shadow-lg">
                <Shield className="w-5 h-5 text-emerald-400" />
                <span className="font-semibold">최고 경영진</span>
              </div>
            </div>

            {/* Executive Cards */}
            <div className="flex justify-center gap-4 lg:gap-8 flex-wrap">
              {executives.map((exec, index) => (
                <div
                  key={index}
                  className={`group flex items-center gap-3 px-6 py-4 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border-2 ${
                    exec.highlight ? 'border-emerald-400 bg-gradient-to-br from-emerald-50 to-green-50' : 'border-gray-200 hover:border-emerald-300'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    exec.highlight ? 'bg-gradient-to-br from-emerald-500 to-green-600 text-white' : 'bg-gray-100 text-gray-600 group-hover:bg-emerald-100 group-hover:text-emerald-600'
                  } transition-all duration-300`}>
                    {exec.icon}
                  </div>
                  <span className={`font-bold ${exec.highlight ? 'text-emerald-700' : 'text-gray-700'}`}>
                    {exec.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Connector Line */}
          <div className="flex justify-center mb-6">
            <div className="w-1 h-12 bg-gradient-to-b from-gray-300 to-emerald-400 rounded-full" />
          </div>

          {/* CEO Level - 대표이사 */}
          <div className={`flex justify-center mb-8 transition-all duration-700 delay-400 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity" />
              <div className="relative flex items-center gap-4 px-8 py-5 bg-gradient-to-br from-gray-800 to-gray-900 text-white rounded-2xl shadow-2xl">
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-green-500 rounded-xl flex items-center justify-center">
                  <UserCircle className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-2xl font-bold">대표이사</p>
                  <p className="text-emerald-400 text-sm">4개의 주요 사업 본부를 총괄</p>
                </div>
              </div>
            </div>
          </div>

          {/* Connector Lines to Divisions */}
          <div className="flex justify-center mb-8">
            <div className="relative w-full max-w-5xl">
              {/* Vertical line from CEO */}
              <div className="absolute left-1/2 -translate-x-1/2 w-1 h-8 bg-gradient-to-b from-emerald-400 to-emerald-300" />
              {/* Horizontal line */}
              <div className="absolute top-8 left-[12.5%] right-[12.5%] h-1 bg-gradient-to-r from-blue-400 via-emerald-400 to-cyan-400 rounded-full" />
              {/* Vertical lines to each division */}
              <div className="flex justify-between px-[12.5%] pt-8">
                {divisions.map((_, index) => (
                  <div key={index} className="w-1 h-8 bg-gradient-to-b from-emerald-300 to-gray-300 rounded-full" />
                ))}
              </div>
            </div>
          </div>

          {/* Divisions Grid */}
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-700 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {divisions.map((division, index) => (
              <div
                key={index}
                className={`group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border-t-4 ${division.borderColor} hover:-translate-y-2`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Header */}
                <div className={`${division.bgColor} p-6 pb-4`}>
                  <div className={`w-16 h-16 bg-gradient-to-br ${division.color} rounded-2xl flex items-center justify-center text-white shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    {division.icon}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">
                    {division.title}
                  </h3>
                </div>

                {/* Teams List */}
                <div className="p-6 pt-4">
                  <ul className="space-y-2 mb-4">
                    {division.teams.map((team, teamIndex) => (
                      <li
                        key={teamIndex}
                        className="flex items-center gap-2 text-gray-700 text-sm"
                      >
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${division.color}`} />
                        {team}
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-gray-500 leading-relaxed border-t border-gray-100 pt-4">
                    {division.description}
                  </p>
                </div>

                {/* Hover Effect Line */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${division.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
              </div>
            ))}
          </div>

          {/* Bottom Stats */}
          <div className={`mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 transition-all duration-700 delay-600 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {[
              { number: "4", label: "사업본부" },
              { number: "14", label: "전문팀" },
              { number: "100+", label: "임직원" },
              { number: "∞", label: "성장가능성" }
            ].map((stat, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                <div className="text-3xl font-bold text-emerald-600 mb-1">{stat.number}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Organization;
