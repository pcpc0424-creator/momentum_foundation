import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Mail, Phone, MapPin, Sparkles, Shield, Clock, HeadphonesIcon, Send, MessageCircle, Star, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Contact = () => {
  const { t } = useLanguage();
  const [isLoaded, setIsLoaded] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Ultra Premium Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-emerald-900 to-gray-900"></div>

        {/* Mesh Gradient */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,rgba(16,185,129,0.3),transparent_50%)]"></div>
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,rgba(6,182,212,0.2),transparent_50%)]"></div>
        </div>

        {/* Floating Orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-[10%] w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-[15%] w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-20 left-[30%] w-80 h-80 bg-teal-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute -bottom-10 right-[20%] w-64 h-64 bg-emerald-400/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        </div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:60px_60px]"></div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className={`text-center transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            {/* Premium Badge */}
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl mb-10">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              </div>
              <span className="text-emerald-300 text-sm font-medium tracking-wider uppercase">Premium Support</span>
              <HeadphonesIcon className="w-5 h-5 text-emerald-400" />
            </div>

            <h1 className="text-6xl lg:text-8xl font-black text-white mb-8 tracking-tight leading-tight">
              <span className="block">{t('contact.hero.title1')}</span>
              <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                {t('contact.hero.title2')}
              </span>
            </h1>

            <p className="text-xl lg:text-2xl text-gray-300 font-light max-w-3xl mx-auto mb-12 leading-relaxed">
              {t('contact.headline')}
            </p>

            {/* Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mt-8 sm:mt-12 max-w-2xl mx-auto">
              {[
                { icon: <Clock className="w-5 h-5" />, text: "24/7 Support" },
                { icon: <Shield className="w-5 h-5" />, text: "Secure & Private" },
                { icon: <Sparkles className="w-5 h-5" />, text: "Expert Team" }
              ].map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-center gap-2 sm:gap-3 bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl px-4 sm:px-6 py-3 sm:py-4 border border-white/10 transform transition-all duration-700 hover:scale-105 hover:bg-white/10 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                  style={{ transitionDelay: `${400 + index * 100}ms` }}
                >
                  <div className="text-emerald-400">{item.icon}</div>
                  <span className="text-gray-300 font-medium text-sm sm:text-base">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-8 h-12 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-white/50 rounded-full animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-100/40 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className={`text-center mb-16 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-semibold mb-6">
              <MessageCircle className="w-4 h-4" />
              Contact Us
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-gray-900 via-emerald-800 to-emerald-600 bg-clip-text text-transparent">
                {t('contact.info.title')}
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('contact.info.desc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Phone Card */}
            <div className={`group relative transition-all duration-700 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-3xl blur-lg opacity-0 group-hover:opacity-25 transition-all duration-500"></div>

              <div className="relative bg-white rounded-3xl p-10 shadow-xl border-2 border-gray-100 hover:border-emerald-300 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl text-center h-full">
                <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-xl shadow-emerald-500/25">
                  <Phone className="h-12 w-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-emerald-600 transition-colors">{t('contact.phone.title')}</h3>
                <p className="text-emerald-600 font-bold text-xl mb-2">{t('contact.phone.number')}</p>
                <p className="text-sm text-gray-500">{t('contact.phone.hours')}</p>

                {/* Hover Badge */}
                <div className="mt-8 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                    Available Now
                  </span>
                </div>

                {/* Bottom Line */}
                <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-b-3xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </div>
            </div>

            {/* Email Card */}
            <div className={`group relative transition-all duration-700 delay-400 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-3xl blur-lg opacity-0 group-hover:opacity-25 transition-all duration-500"></div>

              <div className="relative bg-white rounded-3xl p-10 shadow-xl border-2 border-gray-100 hover:border-cyan-300 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl text-center h-full">
                <div className="w-24 h-24 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500 shadow-xl shadow-cyan-500/25">
                  <Mail className="h-12 w-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-cyan-600 transition-colors">{t('contact.email.title')}</h3>
                <p className="text-cyan-600 font-bold text-xl mb-2">{t('contact.email.address')}</p>
                <p className="text-sm text-gray-500">{t('contact.email.hours')}</p>

                {/* Hover Badge */}
                <div className="mt-8 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-100 text-cyan-700 rounded-full text-sm font-medium">
                    <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></span>
                    Quick Response
                  </span>
                </div>

                {/* Bottom Line */}
                <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-b-3xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </div>
            </div>

            {/* Visit Card */}
            <div className={`group relative transition-all duration-700 delay-600 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-3xl blur-lg opacity-0 group-hover:opacity-25 transition-all duration-500"></div>

              <div className="relative bg-white rounded-3xl p-10 shadow-xl border-2 border-gray-100 hover:border-teal-300 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl text-center h-full">
                <div className="w-24 h-24 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-xl shadow-teal-500/25">
                  <MapPin className="h-12 w-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-teal-600 transition-colors">{t('contact.visit.title')}</h3>
                <p className="text-teal-600 font-bold text-xl mb-2">{t('contact.visit.address')}</p>
                <p className="text-sm text-gray-500">{t('contact.visit.note')}</p>

                {/* Hover Badge */}
                <div className="mt-8 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-teal-100 text-teal-700 rounded-full text-sm font-medium">
                    <span className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></span>
                    Visit Us
                  </span>
                </div>

                {/* Bottom Line */}
                <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-b-3xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-24 bg-gradient-to-br from-gray-900 via-emerald-900 to-gray-900 relative overflow-hidden">
        {/* Floating Orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-[10%] w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-[15%] w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
          <div className="absolute top-1/2 right-[30%] w-48 h-48 bg-teal-500/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '0.8s' }}></div>
        </div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:60px_60px]"></div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className={`text-center mb-12 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl mb-8">
              <Send className="w-5 h-5 text-emerald-400" />
              <span className="text-emerald-300 text-sm font-medium tracking-wider uppercase">Send Message</span>
            </div>

            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white via-emerald-100 to-emerald-300 bg-clip-text text-transparent">
                {t('contact.form.title')}
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              {t('contact.form.desc')}
            </p>
          </div>

          <div className={`transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 via-cyan-500 to-emerald-500 rounded-3xl blur-lg opacity-30 group-hover:opacity-40 transition duration-500"></div>

              <form onSubmit={handleSubmit} className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 lg:p-12 border border-white/20 shadow-2xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* Name Input */}
                  <div>
                    <label className="block text-emerald-300 text-sm font-medium mb-3">{t('contact.form.name')}</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-white/5 border-2 border-white/20 rounded-2xl px-5 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/20 transition-all duration-300 hover:border-white/40"
                      placeholder={t('contact.form.name.placeholder')}
                    />
                  </div>

                  {/* Email Input */}
                  <div>
                    <label className="block text-emerald-300 text-sm font-medium mb-3">{t('contact.form.email')}</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-white/5 border-2 border-white/20 rounded-2xl px-5 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/20 transition-all duration-300 hover:border-white/40"
                      placeholder={t('contact.form.email.placeholder')}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* Phone Input */}
                  <div>
                    <label className="block text-emerald-300 text-sm font-medium mb-3">{t('contact.form.phone')}</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full bg-white/5 border-2 border-white/20 rounded-2xl px-5 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/20 transition-all duration-300 hover:border-white/40"
                      placeholder={t('contact.form.phone.placeholder')}
                    />
                  </div>

                  {/* Subject Select */}
                  <div>
                    <label className="block text-emerald-300 text-sm font-medium mb-3">{t('contact.form.type')}</label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full bg-white/5 border-2 border-white/20 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/20 transition-all duration-300 hover:border-white/40 appearance-none cursor-pointer"
                    >
                      <option value="" className="bg-gray-800">{t('contact.form.type.placeholder')}</option>
                      <option value="general" className="bg-gray-800">{t('contact.form.type.general')}</option>
                      <option value="support" className="bg-gray-800">{t('contact.form.type.support')}</option>
                      <option value="partnership" className="bg-gray-800">{t('contact.form.type.partnership')}</option>
                      <option value="feedback" className="bg-gray-800">{t('contact.form.type.feedback')}</option>
                    </select>
                  </div>
                </div>

                {/* Message Textarea */}
                <div className="mb-8">
                  <label className="block text-emerald-300 text-sm font-medium mb-3">{t('contact.form.message')}</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    className="w-full bg-white/5 border-2 border-white/20 rounded-2xl px-5 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/20 transition-all duration-300 hover:border-white/40 resize-none"
                    placeholder={t('contact.form.message.placeholder')}
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full group/btn relative bg-gradient-to-r from-emerald-600 to-cyan-600 text-white font-bold py-5 px-8 rounded-2xl shadow-2xl hover:shadow-emerald-500/30 transition-all duration-500 overflow-hidden"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-cyan-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"></span>
                  <span className="relative flex items-center justify-center gap-3 text-lg">
                    <Send className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300" />
                    {t('contact.form.submit')}
                    <ArrowRight className="w-5 h-5 opacity-0 group-hover/btn:opacity-100 group-hover/btn:translate-x-1 transition-all duration-300" />
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
