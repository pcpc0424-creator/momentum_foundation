import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { FileText, Users, CheckCircle, Award } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Process = () => {
  const { t } = useLanguage();
  
  const steps = [
    {
      step: "01",
      icon: <FileText className="h-8 w-8 text-white" />,
title: t('process.step1.title'),
      description: t('process.step1.desc'),
      details: ["이력서 및 자기소개서 제출", "경력증명서 (해당자)", "포트폴리오 (해당 직무)"]
    },
    {
      step: "02", 
      icon: <Users className="h-8 w-8 text-white" />,
title: t('process.step2.title'),
      description: t('process.step2.desc'),
      details: ["1차: 실무진 면접 (직무 적합성)", "2차: 임원 면접 (인성 및 비전)", "면접 일정은 개별 안내"]
    },
    {
      step: "03",
      icon: <CheckCircle className="h-8 w-8 text-white" />,
title: t('process.step3.title'),
      description: t('process.step3.desc'),
      details: ["합격자 개별 연락", "입사 서류 안내", "오리엔테이션 일정 공지"]
    },
    {
      step: "04",
      icon: <Award className="h-8 w-8 text-white" />,
title: t('process.step4.title'),
      description: t('process.step4.desc'),
      details: ["회사 소개 및 조직 문화", "직무별 전문 교육", "멘토링 프로그램 배정"]
    }
  ];

const requirements = [
    t('process.req1'),
    t('process.req2'),
    t('process.req3'),
    t('process.req4'),
    t('process.req5')
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
                              <section className="bg-cool-grey text-gray-800 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center ml-4 md:ml-16">
            <h1 className="text-2xl lg:text-3xl font-bold mr-4 whitespace-nowrap">
              채용절차
            </h1>
            <span className="text-gray-400 mx-3 text-2xl hidden md:inline">|</span>
<span className="text-sm lg:text-base font-medium hidden md:inline" style={{color: '#059669'}}>
              채용 프로세스
            </span>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
<h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 title-expand">
              {t('process.title')}
            </h2>
            <p className="text-xl text-gray-600">
{t('process.subtitle')}
            </p>
          </div>

          <div className="relative">
            {/* Process Line */}
            <div className="hidden md:block absolute top-20 left-0 right-0 h-0.5 bg-gray-300"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <div key={index} className="relative">
                  {/* Step Circle */}
                  <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-sage-green rounded-full flex items-center justify-center shadow-lg z-10">
                      {step.icon}
                    </div>
                  </div>
                  
                  {/* Step Content */}
                  <div className="text-center bg-gray-50 rounded-lg p-6 shadow-sm">
                    <div className="text-2xl font-bold text-sage-green mb-2">
                      {step.step}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 mb-3 text-sm">
                      {step.description}
                    </p>
                    <ul className="text-xs text-gray-500 space-y-1">
                      {step.details.map((detail, detailIndex) => (
                        <li key={detailIndex}>• {detail}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
<h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 title-expand">
              {t('process.requirements.title')}
            </h2>
            <p className="text-xl text-gray-600">
{t('process.requirements.subtitle')}
            </p>
          </div>

          <div className="bg-white rounded-lg p-8 shadow-sm">
            <ul className="space-y-4">
              {requirements.map((requirement, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-sage-green mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{requirement}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Process;