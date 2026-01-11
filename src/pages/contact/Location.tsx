import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Location = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
<section className="bg-warm-beige text-gray-800 pt-24 pb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center ml-4 md:ml-16">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mr-2 sm:mr-4">
{t('location.title')}
            </h1>
            <span className="text-gray-400 mx-3 text-2xl hidden md:inline">|</span>
            <span className="text-sm lg:text-base text-gray-700 font-medium hidden md:inline">
{t('location.subtitle')}
            </span>
          </div>
        </div>
      </section>

      {/* Location Info */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Map */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
{t('location.office.title')}
              </h2>
              <div className="bg-gray-100 rounded-lg p-6 mb-6 border border-gray-200">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3165.8234567890123!2d127.1258!3d37.4813!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDI4JzUyLjciTiAxMjfCsDA3JzMyLjkiRQ!5e0!3m2!1sko!2skr!4v1234567890123!5m2!1sko!2skr"
                  width="100%"
                  height="400"
                  style={{ border: 0, borderRadius: '8px' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="모멘텀파운데이션 본사 위치"
                ></iframe>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-sage-green mt-1" />
                  <div>
<p className="font-semibold text-gray-900">{t('location.address.title')}</p>
                    <p className="text-gray-600">{t('location.address.detail')}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Phone className="h-5 w-5 text-sage-green mt-1" />
                  <div>
<p className="font-semibold text-gray-900">{t('location.phone.title')}</p>
<p className="text-gray-600">{t('location.phone.number')}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 text-sage-green mt-1" />
                  <div>
<p className="font-semibold text-gray-900">{t('location.email.title')}</p>
<p className="text-gray-600">{t('location.email.address')}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-sage-green mt-1" />
                  <div>
<p className="font-semibold text-gray-900">{t('location.hours.title')}</p>
                    <p className="text-gray-600">{t('location.hours.detail')}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Transportation */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
{t('location.transport.title')}
              </h2>
              
              <div className="space-y-6">
                <div className="bg-blue-50 rounded-lg p-6">
<h3 className="text-lg font-bold text-blue-900 mb-3">{t('location.subway.title')}</h3>
                  <ul className="space-y-2 text-blue-800">
                    <li>• {t('location.subway.line8')}</li>
                    <li>• {t('location.subway.line9')}</li>
                  </ul>
                </div>

                <div className="bg-green-50 rounded-lg p-6">
<h3 className="text-lg font-bold text-green-900 mb-3">{t('location.bus.title')}</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="font-semibold text-green-800">{t('location.bus.main')}</p>
                      <p className="text-green-700">{t('location.bus.main.numbers')}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-green-800">{t('location.bus.branch')}</p>
                      <p className="text-green-700">{t('location.bus.branch.numbers')}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
<h3 className="text-lg font-bold text-gray-900 mb-3">{t('location.car.title')}</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• {t('location.car.route1')}</li>
                    <li>• {t('location.car.route2')}</li>
                    <li>• {t('location.car.parking')}</li>
                  </ul>
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

export default Location;