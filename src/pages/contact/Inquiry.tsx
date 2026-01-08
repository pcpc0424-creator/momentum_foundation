import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Mail, Phone, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Inquiry = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    inquiryType: "",
    subject: "",
    message: ""
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

const generateInquiryNumber = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const dateStr = `${year}${month}${day}`;
    
    // 기존 문의 수 확인
    const existingInquiries = JSON.parse(localStorage.getItem('inquiries') || '[]');
    const todayInquiries = existingInquiries.filter((inq: any) => 
      inq.inquiryNumber && inq.inquiryNumber.startsWith(`INQ${dateStr}`)
    );
    
    const nextNumber = String(todayInquiries.length + 1).padStart(4, '0');
    return `INQ${dateStr}-${nextNumber}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.inquiryType || !formData.message) {
      toast({
        title: "입력 오류",
        description: "필수 항목을 모두 입력해주세요.",
        variant: "destructive",
      });
      return;
    }

    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "이메일 오류",
        description: "올바른 이메일 형식을 입력해주세요.",
        variant: "destructive",
      });
      return;
    }

    const inquiryNumber = generateInquiryNumber();
    const inquiryData = {
      id: Date.now().toString(),
      inquiryNumber: inquiryNumber,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      company: formData.company,
      inquiryType: formData.inquiryType,
      subject: formData.subject,
      message: formData.message,
submissionDate: new Date().toISOString().split('T')[0],
      status: "접수완료" as "접수완료" | "처리중" | "답변완료"
    };

    // localStorage에 저장
    const existingInquiries = localStorage.getItem("inquiries");
    const inquiries = existingInquiries ? JSON.parse(existingInquiries) : [];
    const updatedInquiries = [inquiryData, ...inquiries];
    localStorage.setItem("inquiries", JSON.stringify(updatedInquiries));

    // 즉시 반영을 위한 storage 이벤트 트리거
    window.dispatchEvent(new Event('storage'));

    toast({
      title: "문의 접수 완료",
      description: `문의번호: ${inquiryNumber}\n문의사항이 정상적으로 접수되었습니다. 빠른 시일 내에 답변드리겠습니다.`,
    });
    // 폼 초기화
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      inquiryType: "",
      subject: "",
      message: ""
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
<section className="bg-warm-beige text-gray-800 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center ml-4 md:ml-16">
            <h1 className="text-2xl lg:text-3xl font-bold mr-4 whitespace-nowrap">
              온라인문의
            </h1>
            <span className="text-gray-400 mx-3 text-2xl hidden md:inline">|</span>
            <span className="text-sm lg:text-base text-gray-700 font-medium hidden md:inline">
              궁금한 사항이나 제안사항이 있으시면 언제든지 문의해 주세요
            </span>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-white rounded-lg shadow-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
{t('inquiry.form.name')} <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
placeholder={t('inquiry.form.name.placeholder')}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
{t('inquiry.form.email')} <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
placeholder={t('inquiry.form.email.placeholder')}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
{t('inquiry.form.phone')}
                  </label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
placeholder={t('inquiry.form.phone.placeholder')}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
{t('inquiry.form.company')}
                  </label>
                  <Input
                    type="text"
                    value={formData.company}
                    onChange={(e) => handleInputChange("company", e.target.value)}
placeholder={t('inquiry.form.company.placeholder')}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
{t('inquiry.form.type')} <span className="text-red-500">*</span>
                </label>
                <Select value={formData.inquiryType} onValueChange={(value) => handleInputChange("inquiryType", value)}>
                  <SelectTrigger>
<SelectValue placeholder={t('inquiry.form.type.placeholder')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="product">제품 문의</SelectItem>
                    <SelectItem value="partnership">입점/제휴 문의</SelectItem>
                    <SelectItem value="recruitment">채용 문의</SelectItem>
                    <SelectItem value="other">기타 문의</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
{t('inquiry.form.subject')}
                </label>
                <Input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => handleInputChange("subject", e.target.value)}
placeholder={t('inquiry.form.subject.placeholder')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
{t('inquiry.form.message')} <span className="text-red-500">*</span>
                </label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
placeholder={t('inquiry.form.message.placeholder')}
                  rows={6}
                  required
                />
              </div>

              <div className="text-center">
<Button type="submit" size="lg" className="bg-sage-green hover:bg-sage-green/90 px-8 text-black hover:text-black">
                  {t('inquiry.submit')}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
<h2 className="text-3xl font-bold text-gray-900 mb-4 title-expand">
              {t('contact.info.title')}
            </h2>
            <p className="text-gray-600">
{t('contact.info.desc')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Phone className="h-12 w-12 text-sage-green" />
              </div>
<h3 className="text-xl font-bold text-gray-900 mb-2">{t('contact.phone.title')}</h3>
<p className="text-gray-600">{t('contact.phone.number')}</p>
              <p className="text-sm text-gray-500 mt-1">{t('contact.phone.hours')}</p>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Mail className="h-12 w-12 text-sage-green" />
              </div>
<h3 className="text-xl font-bold text-gray-900 mb-2">{t('contact.email.title')}</h3>
<p className="text-gray-600">{t('contact.email.address')}</p>
              <p className="text-sm text-gray-500 mt-1">{t('contact.email.hours')}</p>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <MapPin className="h-12 w-12 text-sage-green" />
              </div>
<h3 className="text-xl font-bold text-gray-900 mb-2">{t('contact.visit.title')}</h3>
              <p className="text-gray-600">{t('contact.visit.address')}</p>
              <p className="text-sm text-gray-500 mt-1">{t('contact.visit.note')}</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Inquiry;