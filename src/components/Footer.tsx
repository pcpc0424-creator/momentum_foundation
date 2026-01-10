import { MapPin, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#E8F5E9] text-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Company Info */}
          <div className="sm:col-span-2 md:col-span-1">
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">{t('footer.company.name')}</h3>
            <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
              {t('footer.company.desc')}
            </p>
            <div className="space-y-1.5 sm:space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-xs sm:text-sm text-gray-500">{t('footer.ceo.label')}</span>
                <span className="text-xs sm:text-sm">{t('footer.ceo.names')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs sm:text-sm text-gray-500">{t('footer.philosophy.label')}</span>
                <span className="text-xs sm:text-sm">{t('footer.philosophy.text')}</span>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">{t('footer.contact.title')}</h3>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center space-x-2">
                <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-500 flex-shrink-0" />
                <span className="text-xs sm:text-sm">{t('footer.contact.phone')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-500 flex-shrink-0" />
                <span className="text-xs sm:text-sm">{t('footer.contact.fax')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-500 flex-shrink-0" />
                <span className="text-xs sm:text-sm break-all">{t('footer.contact.email')}</span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-500 flex-shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm">{t('footer.contact.address')}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">{t('footer.links.title')}</h3>
            <div className="space-y-1.5 sm:space-y-2">
              <Link to="/about" className="block text-xs sm:text-sm text-gray-600 hover:text-gray-900 transition-colors py-1">
                {t('footer.links.about')}
              </Link>
              <Link to="/business" className="block text-xs sm:text-sm text-gray-600 hover:text-gray-900 transition-colors py-1">
                {t('footer.links.business')}
              </Link>
              <Link to="/careers" className="block text-xs sm:text-sm text-gray-600 hover:text-gray-900 transition-colors py-1">
                {t('footer.links.careers')}
              </Link>
              <Link to="/contact" className="block text-xs sm:text-sm text-gray-600 hover:text-gray-900 transition-colors py-1">
                {t('footer.links.contact')}
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-300 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center">
          <p className="text-xs sm:text-sm text-gray-500">
            {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;