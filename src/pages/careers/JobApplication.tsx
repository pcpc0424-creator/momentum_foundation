import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface ApplicationData {
  id: string;
  applicationNumber: string;
  jobTitle: string;
  division: string;
  department: string;
  name: string;
  email: string;
  phone: string;
  birthDate: string;
  address: string;
  education: string;
  experience: string;
  motivation: string;
  resumeFile?: string;
  portfolioFile?: string;
  appliedDate: string;
  status: "접수완료" | "서류검토" | "면접대기" | "최종합격" | "불합격";
}

const JobApplication = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [applicationNumber, setApplicationNumber] = useState("");

  const jobTitle = (location.state as any)?.jobTitle || t('application.default.position');

  const [formData, setFormData] = useState({
    division: "",
    department: "",
    name: "",
    email: "",
    phone: "",
    birthDate: "",
    address: "",
    education: "",
    experience: "",
    motivation: "",
    resumeFile: "",
    portfolioFile: ""
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const generateApplicationNumber = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const dateStr = `${year}${month}${day}`;
    
    // 기존 지원서 수 확인
    const existingApps = JSON.parse(localStorage.getItem('applications') || '[]');
    const todayApps = existingApps.filter((app: any) => 
      app.applicationNumber && app.applicationNumber.startsWith(`APP${dateStr}`)
    );
    
    const nextNumber = String(todayApps.length + 1).padStart(4, '0');
    return `APP${dateStr}-${nextNumber}`;
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // File size and format validation
    const maxSize = field === 'resumeFile' ? 5 * 1024 * 1024 : 10 * 1024 * 1024;
    const fieldName = field === 'resumeFile' ? t('application.file.resume') : t('application.file.portfolio');
    const maxSizeMB = field === 'resumeFile' ? '5MB' : '10MB';

    if (file.size > maxSize) {
      toast({
        title: t('application.error.fileSize'),
        description: t('application.error.fileSizeDesc').replace('{field}', fieldName).replace('{max}', maxSizeMB).replace('{current}', (file.size / 1024 / 1024).toFixed(1)),
        variant: "destructive",
        duration: 5000,
      });

      if (e.target) {
        e.target.value = '';
      }
      return;
    }

    // PDF format recommended (not required)
    if (!file.type.includes('pdf') && !file.type.includes('image') && !file.type.includes('document')) {
      toast({
        title: t('application.info.fileFormat'),
        description: t('application.info.pdfRecommended').replace('{field}', fieldName),
        variant: "default",
      });
    }
      
    console.log('File upload attempt - size:', file.size, 'name:', file.name);

const reader = new FileReader();
    
    reader.onloadend = () => {
      try {
        setFormData({ ...formData, [field]: reader.result as string });

        toast({
          title: t('application.success.fileUpload'),
          description: t('application.success.fileUploadDesc').replace('{field}', fieldName).replace('{name}', file.name),
        });
      } catch (error) {
        console.error('File processing error:', error);
        toast({
          title: t('application.error.fileProcess'),
          description: t('application.error.fileProcessDesc'),
          variant: "destructive",
        });
      }
    };

    reader.onerror = () => {
      toast({
        title: t('application.error.fileRead'),
        description: t('application.error.fileReadDesc'),
        variant: "destructive",
      });
    };
    
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 필수 항목 검증
    console.log('Form validation - formData:', formData);
    
    if (!formData.name?.trim()) {
      toast({ title: t('application.error.input'), description: t('application.error.name'), variant: "destructive" });
      return;
    }
    if (!formData.email?.trim()) {
      toast({ title: t('application.error.input'), description: t('application.error.email'), variant: "destructive" });
      return;
    }
    if (!formData.phone?.trim()) {
      toast({ title: t('application.error.input'), description: t('application.error.phone'), variant: "destructive" });
      return;
    }
    if (!formData.birthDate?.trim()) {
      toast({ title: t('application.error.input'), description: t('application.error.birthDate'), variant: "destructive" });
      return;
    }
    // Birth date validation
    const today = new Date();
    const birthDate = new Date(formData.birthDate);
    if (birthDate > today) {
      toast({ title: t('application.error.input'), description: t('application.error.birthDateFuture'), variant: "destructive" });
      return;
    }
    if (!formData.motivation?.trim()) {
      toast({ title: t('application.error.input'), description: t('application.error.motivation'), variant: "destructive" });
      return;
    }

    // Division/Department validation
    if (!formData.division?.trim() || !formData.department?.trim()) {
      toast({
        title: t('application.error.input'),
        description: t('application.error.divisionDept'),
        variant: "destructive",
      });
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: t('application.error.emailFormat'),
        description: t('application.error.emailFormatDesc'),
        variant: "destructive",
      });
      return;
    }

    // Phone number format validation
    const phoneRegex = /^[0-9-]+$/;
    if (!phoneRegex.test(formData.phone)) {
      toast({
        title: t('application.error.phoneFormat'),
        description: t('application.error.phoneFormatDesc'),
        variant: "destructive",
      });
      return;
    }

    console.log('Submitting application - formData:', formData);
    
    const appNumber = generateApplicationNumber();
    const applicationData: ApplicationData = {
      id: Date.now().toString(),
      applicationNumber: appNumber,
      jobTitle: jobTitle,
      division: formData.division,
      department: formData.department,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      birthDate: formData.birthDate,
      address: formData.address,
      education: formData.education,
      experience: formData.experience,
      motivation: formData.motivation,
      resumeFile: formData.resumeFile,
      portfolioFile: formData.portfolioFile,
      appliedDate: new Date().toISOString().split('T')[0],
      status: "접수완료"
    };

    // localStorage에 저장
    const existingApplications = localStorage.getItem("job_applications");
    const applications = existingApplications ? JSON.parse(existingApplications) : [];
    const updatedApplications = [applicationData, ...applications];
    localStorage.setItem("job_applications", JSON.stringify(updatedApplications));

    // 즉시 반영을 위한 storage 이벤트 트리거
    window.dispatchEvent(new Event('storage'));

    setApplicationNumber(appNumber);
    setIsSubmitted(true);

    toast({
      title: t('application.success.submit'),
      description: t('application.success.submitDesc'),
    });
  };

  // Submission complete screen
  if (isSubmitted) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />

        <section className="bg-cool-grey text-gray-800 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center ml-4 md:ml-16">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mr-2 sm:mr-4">
                {t('application.hero.title')}
              </h1>
              <span className="text-gray-400 mx-3 text-2xl hidden md:inline">|</span>
              <span className="text-sm lg:text-base text-gray-700 font-medium hidden md:inline">
                {t('application.hero.subtitle')}
              </span>
            </div>
          </div>
        </section>

        <section className="flex-grow py-20 bg-white">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card>
              <CardContent className="p-12 text-center">
                <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6" />
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {t('application.complete.title')}
                </h2>
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <p className="text-sm text-gray-600 mb-2">{t('application.complete.appNumber')}</p>
                  <p className="text-2xl font-bold text-primary mb-4">
                    {applicationNumber}
                  </p>
                  <p className="text-sm text-gray-600">
                    {t('application.complete.remember')}<br/>
                    {t('application.complete.emailNotice')}
                  </p>
                </div>
                <div className="space-y-2 text-sm text-gray-600 mb-8">
                  <p>• {t('application.complete.position')}: <strong>{jobTitle}</strong></p>
                  <p>• {t('application.complete.applicant')}: <strong>{formData.name}</strong></p>
                  <p>• {t('application.complete.email')}: <strong>{formData.email}</strong></p>
                  <p>• {t('application.complete.date')}: <strong>{new Date().toLocaleString('ko-KR')}</strong></p>
                </div>
                <div className="flex gap-4 justify-center">
                  <Button onClick={() => navigate("/careers/jobs")}>
                    {t('application.complete.viewJobs')}
                  </Button>
                  <Button variant="outline" onClick={() => navigate("/")}>
                    {t('application.complete.home')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <Footer />
      </div>
    );
  }

  // Application form screen
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <section className="bg-cool-grey text-gray-800 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center ml-4 md:ml-16">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mr-2 sm:mr-4">
              {t('application.hero.title')}
            </h1>
            <span className="text-gray-400 mx-3 text-2xl hidden md:inline">|</span>
            <span className="text-sm lg:text-base text-gray-700 font-medium hidden md:inline">
              {t('application.hero.subtitle')}
            </span>
          </div>
        </div>
      </section>

      <section className="flex-grow py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">
                {t('application.form.title')}
              </CardTitle>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <p className="text-sm font-medium text-blue-800 mb-2">
                  {t('application.form.position')}: <span className="text-lg font-bold text-blue-900">{jobTitle}</span>
                </p>
                <p className="text-xs text-blue-600">
                  ※ {t('application.form.positionNote')}
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Info */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold border-b pb-2">{t('application.section.basicInfo')}</h3>

                  {/* Division & Department */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        {t('application.label.division')} <span className="text-red-500">*</span>
                      </label>
                      <Input
                        value={formData.division}
                        onChange={(e) => setFormData({ ...formData, division: e.target.value })}
                        placeholder={t('application.placeholder.division')}
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        {t('application.label.department')} <span className="text-red-500">*</span>
                      </label>
                      <Input
                        value={formData.department}
                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                        placeholder={t('application.placeholder.department')}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        {t('application.label.name')} <span className="text-red-500">*</span>
                      </label>
                      <Input
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={t('application.placeholder.name')}
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        {t('application.label.birthDate')} <span className="text-red-500">*</span>
                      </label>
                      <Input
                        type="date"
                        value={formData.birthDate}
                        onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        {t('application.label.email')} <span className="text-red-500">*</span>
                      </label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="example@email.com"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        {t('application.label.phone')} <span className="text-red-500">*</span>
                      </label>
                      <Input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="010-1234-5678"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">{t('application.label.address')}</label>
                    <Input
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder={t('application.placeholder.address')}
                    />
                  </div>
                </div>

                {/* Education & Experience */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold border-b pb-2">{t('application.section.education')}</h3>

                  <div>
                    <label className="block text-sm font-medium mb-2">{t('application.label.education')}</label>
                    <Input
                      value={formData.education}
                      onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                      placeholder={t('application.placeholder.education')}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">{t('application.label.experience')}</label>
                    <Textarea
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      placeholder={t('application.placeholder.experience')}
                      rows={6}
                    />
                  </div>
                </div>

                {/* Motivation */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold border-b pb-2">{t('application.section.motivation')}</h3>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {t('application.label.motivation')} <span className="text-red-500">*</span>
                    </label>
                    <Textarea
                      value={formData.motivation}
                      onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                      placeholder={t('application.placeholder.motivation')}
                      rows={8}
                      required
                    />
                  </div>
                </div>

                {/* File Attachments */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold border-b pb-2">{t('application.section.documents')}</h3>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {t('application.label.resume')}
                    </label>
                    <Input
                      type="file"
                      accept=".pdf,.doc,.docx,.hwp"
                      onChange={(e) => handleFileUpload(e, 'resumeFile')}
                      className="cursor-pointer"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {t('application.file.resumeNote')}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {t('application.label.portfolio')}
                    </label>
                    <Input
                      type="file"
                      accept=".pdf,.ppt,.pptx"
                      onChange={(e) => handleFileUpload(e, 'portfolioFile')}
                      className="cursor-pointer"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {t('application.file.portfolioNote')}
                    </p>
                  </div>
                </div>

                {/* Privacy Consent */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">
                    <strong>{t('application.privacy.title')}</strong><br/>
                    {t('application.privacy.items')}<br/>
                    {t('application.privacy.purpose')}<br/>
                    {t('application.privacy.retention')}
                  </p>
                </div>

                {/* Submit Button */}
                <div className="flex gap-4">
                  <Button type="submit" className="flex-1">
                    {t('application.button.submit')}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate(-1)}
                    className="flex-1"
                  >
                    {t('application.button.cancel')}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default JobApplication;