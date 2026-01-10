import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Phone, Mail, Building2, Printer } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Departments = () => {
  const { t } = useLanguage();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const departments = [
    {
      icon: <Building2 className="h-8 w-8 text-sage-green" />,
name: t('departments.management.name'),
      description: t('departments.management.desc'),
phone: "",
email: t('departments.management.email')
    },
    {
      icon: <Building2 className="h-8 w-8 text-sage-green" />,
name: t('departments.food.name'),
      description: t('departments.food.desc'),
phone: "",
email: t('departments.food.email')
    },
    {
      icon: <Building2 className="h-8 w-8 text-sage-green" />,
name: t('departments.franchise.name'),
      description: t('departments.franchise.desc'),
phone: "",
email: t('departments.franchise.email')
    },
    {
      icon: <Building2 className="h-8 w-8 text-sage-green" />,
name: t('departments.fm.name'),
      description: t('departments.fm.desc'),
phone: "",
email: t('departments.fm.email')
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
<section className="bg-warm-beige text-gray-800 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center ml-4 md:ml-16">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mr-2 sm:mr-4">
              {t('departments.hero.title')}
            </h1>
            <span className="text-gray-400 mx-3 text-2xl hidden md:inline">|</span>
<span className="text-sm lg:text-base font-medium hidden md:inline" style={{color: '#059669'}}>
              {t('departments.hero.subtitle')}
            </span>
          </div>
        </div>
      </section>

      {/* Departments */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
<h2 className="text-3xl lg:text-4xl font-bold mb-4 title-expand" style={{color: '#047857'}}>
              {t('departments.title')}
            </h2>
            <p className="text-xl text-gray-600">
{t('departments.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {departments.map((dept, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-8 hover:shadow-lg transition-shadow">
                <div className="flex items-center space-x-4 mb-6">
                  {dept.icon}
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">
{dept.name}
                    </h3>
                    <p className="text-gray-600">
                      {dept.description}
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="space-y-4">
{dept.phone && (
                      <div className="flex items-center space-x-3">
                        <Phone className="h-5 w-5 text-sage-green" />
                        <div>
                          <span className="font-medium text-gray-900">{t('departments.phone.label')}: </span>
                          <span className="text-gray-600">{dept.phone}</span>
                        </div>
                      </div>
                    )}
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-sage-green" />
                      <div>
<span className="font-medium text-gray-900">{t('location.email.title')}: </span>
                        <span className="text-gray-600">{dept.email}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* General Contact */}
          <div className="mt-16 bg-sage-green/10 rounded-lg p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
{t('departments.main.contact')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center justify-center space-x-3">
                <Phone className="h-5 w-5 text-sage-green" />
<span className="text-gray-700">02-2138-1214</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <Mail className="h-5 w-5 text-sage-green" />
<span className="text-gray-700">info@onemomentum.co.kr</span>
              </div>
<div className="flex items-center justify-center space-x-3">
                <Printer className="h-5 w-5 text-sage-green" />
<span className="text-gray-700">02-2138-1215</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Departments;