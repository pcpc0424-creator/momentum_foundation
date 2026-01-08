import { MapPin, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#E8F5E9] text-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">{t('footer.company.name')}</h3>
            <p className="text-gray-600 mb-4">
              {t('footer.company.desc')}
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
<span className="text-sm text-gray-500">{t('footer.ceo.label')}</span>
                <span className="text-sm">{t('footer.ceo.names')}</span>
              </div>
              <div className="flex items-center space-x-2">
<span className="text-sm text-gray-500">{t('footer.philosophy.label')}</span>
                <span className="text-sm">{t('footer.philosophy.text')}</span>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.contact.title')}</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-gray-500" />
                <span className="text-sm">{t('footer.contact.phone')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-gray-500" />
                <span className="text-sm">{t('footer.contact.fax')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-gray-500" />
                <span className="text-sm">{t('footer.contact.email')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span className="text-sm">{t('footer.contact.address')}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.links.title')}</h3>
            <div className="space-y-2">
              <Link to="/about" className="block text-sm text-gray-600 hover:text-gray-900 transition-colors">
                {t('footer.links.about')}
              </Link>
              <Link to="/business" className="block text-sm text-gray-600 hover:text-gray-900 transition-colors">
                {t('footer.links.business')}
              </Link>
              <Link to="/careers" className="block text-sm text-gray-600 hover:text-gray-900 transition-colors">
                {t('footer.links.careers')}
              </Link>
              <Link to="/contact" className="block text-sm text-gray-600 hover:text-gray-900 transition-colors">
                {t('footer.links.contact')}
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-300 mt-8 pt-8 text-center">
          <p className="text-sm text-gray-500">
            {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;