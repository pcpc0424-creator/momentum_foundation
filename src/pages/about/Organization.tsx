import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import { Users, Building2, Truck, Briefcase, ShoppingCart, Shield, Crown, UserCircle, Search } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Organization = () => {
  const { t } = useLanguage();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoaded(true);
  }, []);

  const executives = [
    { title: t('org.board'), icon: <Users className="w-5 h-5" /> },
    { title: t('org.chairman'), icon: <Crown className="w-5 h-5" />, highlight: true },
    { title: t('org.auditor'), icon: <Search className="w-5 h-5" /> }
  ];

  const divisions = [
    {
      title: t('org.division.management.title'),
      icon: <Briefcase className="w-8 h-8" />,
      color: "from-blue-500 to-blue-600",
      borderColor: "border-blue-400",
      bgColor: "bg-blue-50",
      teams: [t('org.team.management1'), t('org.team.management2'), t('org.team.management3')],
      description: t('org.division.management.desc')
    },
    {
      title: t('org.division.food.title'),
      icon: <ShoppingCart className="w-8 h-8" />,
      color: "from-emerald-500 to-green-600",
      borderColor: "border-emerald-400",
      bgColor: "bg-emerald-50",
      teams: [t('org.team.food1'), t('org.team.food2'), t('org.team.food3'), t('org.team.food4'), t('org.team.food5')],
      description: t('org.division.food.desc')
    },
    {
      title: t('org.division.franchise.title'),
      icon: <Truck className="w-8 h-8" />,
      color: "from-amber-500 to-orange-600",
      borderColor: "border-amber-400",
      bgColor: "bg-amber-50",
      teams: [t('org.team.franchise1'), t('org.team.franchise2'), t('org.team.franchise3')],
      description: t('org.division.franchise.desc')
    },
    {
      title: t('org.division.fm.title'),
      icon: <Building2 className="w-8 h-8" />,
      color: "from-cyan-500 to-teal-600",
      borderColor: "border-cyan-400",
      bgColor: "bg-cyan-50",
      teams: [t('org.team.fm1'), t('org.team.fm2')],
      description: t('org.division.fm.desc')
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Page Banner */}
      <PageBanner
        title={t('nav.about.organization')}
        backgroundImage="/momentum_foundation/images/banner_about.jpg"
      />

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
              {t('org.chart.title')}
            </h2>
          </div>

          {/* CEO Level - 대표이사 */}
          <div className={`flex justify-center mb-8 transition-all duration-700 delay-400 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <div className="relative group">
              <div className="relative flex items-center gap-4 px-8 py-5 bg-gradient-to-br from-emerald-600 to-emerald-700 text-white rounded-2xl">
                <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                  <UserCircle className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{t('org.ceo')}</p>
                  <p className="text-emerald-200 text-sm">{t('org.ceo.desc')}</p>
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
              { number: "4", label: t('org.stats.divisions') },
              { number: "14", label: t('org.stats.teams') },
              { number: "100+", label: t('org.stats.employees') },
              { number: "∞", label: t('org.stats.growth') }
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
