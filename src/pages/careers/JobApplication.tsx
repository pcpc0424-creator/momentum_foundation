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
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [applicationNumber, setApplicationNumber] = useState("");
  
  const jobTitle = (location.state as any)?.jobTitle || "채용 포지션";

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

    // 파일 크기 제한 및 형식 검증
const maxSize = field === 'resumeFile' ? 5 * 1024 * 1024 : 10 * 1024 * 1024; // 이력서 5MB, 포트폴리오 10MB
    const fieldName = field === 'resumeFile' ? '이력서' : '포트폴리오';
const maxSizeMB = field === 'resumeFile' ? '5MB' : '10MB';
    
    if (file.size > maxSize) {
toast({
        title: "파일 크기 초과!",
        description: fieldName + " 파일 크기가 초과되었습니다!\n최대 허용: " + maxSizeMB + "\n현재 파일: " + (file.size / 1024 / 1024).toFixed(1) + "MB\n\n더 작은 파일로 다시 시도해주세요.",
        variant: "destructive",
        duration: 5000,
      });
      
      // 파일 입력 초기화
      if (e.target) {
        e.target.value = '';
      }
      return;
    }
    
    // PDF 형식 권장 (필수 아님)
    if (!file.type.includes('pdf') && !file.type.includes('image') && !file.type.includes('document')) {
      toast({
        title: "파일 형식 안내",
        description: fieldName + "은 PDF 형식을 권장합니다.",
        variant: "default",
      });
    }
      
    console.log('File upload attempt - size:', file.size, 'name:', file.name);

const reader = new FileReader();
    
    reader.onloadend = () => {
      try {
        setFormData({ ...formData, [field]: reader.result as string });
        
        // 성공 메시지
        toast({
          title: "파일 업로드 성공",
          description: fieldName + " 파일이 업로드되었습니다: " + file.name,
        });
      } catch (error) {
        console.error('File processing error:', error);
        toast({
          title: "파일 처리 오류",
          description: "파일 처리 중 오류가 발생했습니다. 다시 시도해주세요.",
          variant: "destructive",
        });
      }
    };
    
    reader.onerror = () => {
      toast({
        title: "파일 읽기 오류",
        description: "파일을 읽는 중 오류가 발생했습니다.",
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
      toast({ title: "입력 오류", description: "이름을 입력해주세요.", variant: "destructive" });
      return;
    }
    if (!formData.email?.trim()) {
      toast({ title: "입력 오류", description: "이메일을 입력해주세요.", variant: "destructive" });
      return;
    }
    if (!formData.phone?.trim()) {
      toast({ title: "입력 오류", description: "전화번호를 입력해주세요.", variant: "destructive" });
      return;
    }
if (!formData.birthDate?.trim()) {
      toast({ title: "입력 오류", description: "생년월일을 입력해주세요.", variant: "destructive" });
      return;
    }
    // 생년월일 유효성 검사 (미래 날짜 방지)
    const today = new Date();
    const birthDate = new Date(formData.birthDate);
    if (birthDate > today) {
      toast({ title: "입력 오류", description: "생년월일은 오늘 날짜보다 이전이어야 합니다.", variant: "destructive" });
      return;
    }
    if (!formData.motivation?.trim()) {
      toast({ title: "입력 오류", description: "지원동기를 입력해주세요.", variant: "destructive" });
      return;
    }

    // 지원분야/지원부서 검증
    if (!formData.division?.trim() || !formData.department?.trim()) {
      toast({
        title: "입력 오류",
        description: "지원분야와 지원부서를 입력해주세요.",
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

    // 전화번호 형식 검증
    const phoneRegex = /^[0-9-]+$/;
    if (!phoneRegex.test(formData.phone)) {
      toast({
        title: "전화번호 오류",
        description: "올바른 전화번호 형식을 입력해주세요.",
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
      title: "지원 완료",
      description: "입사지원이 성공적으로 접수되었습니다.",
    });
  };

  // 제출 완료 화면
  if (isSubmitted) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        
        <section className="bg-cool-grey text-gray-800 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center ml-4 md:ml-16">
              <h1 className="text-2xl lg:text-3xl font-bold mr-4 whitespace-nowrap">
                입사지원
              </h1>
              <span className="text-gray-400 mx-3 text-2xl hidden md:inline">|</span>
              <span className="text-sm lg:text-base text-gray-700 font-medium hidden md:inline">
                모멘텀파운데이션과 함께 성장할 우수한 인재를 찾습니다
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
                  입사지원이 완료되었습니다
                </h2>
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <p className="text-sm text-gray-600 mb-2">접수번호</p>
                  <p className="text-2xl font-bold text-primary mb-4">
                    {applicationNumber}
                  </p>
                  <p className="text-sm text-gray-600">
                    위 접수번호를 기억해주세요.<br/>
                    채용 진행 상황은 이메일로 안내드립니다.
                  </p>
                </div>
                <div className="space-y-2 text-sm text-gray-600 mb-8">
                  <p>• 지원하신 포지션: <strong>{jobTitle}</strong></p>
                  <p>• 지원자명: <strong>{formData.name}</strong></p>
                  <p>• 이메일: <strong>{formData.email}</strong></p>
                  <p>• 접수일시: <strong>{new Date().toLocaleString('ko-KR')}</strong></p>
                </div>
                <div className="flex gap-4 justify-center">
                  <Button onClick={() => navigate("/careers/jobs")}>
                    채용공고 목록
                  </Button>
                  <Button variant="outline" onClick={() => navigate("/")}>
                    홈으로
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

  // 지원서 작성 화면
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <section className="bg-cool-grey text-gray-800 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center ml-4 md:ml-16">
            <h1 className="text-2xl lg:text-3xl font-bold mr-4 whitespace-nowrap">
              입사지원
            </h1>
            <span className="text-gray-400 mx-3 text-2xl hidden md:inline">|</span>
            <span className="text-sm lg:text-base text-gray-700 font-medium hidden md:inline">
              모멘텀파운데이션과 함께 성장할 우수한 인재를 찾습니다
            </span>
          </div>
        </div>
      </section>

      <section className="flex-grow py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">
                입사지원서 작성
              </CardTitle>
<div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <p className="text-sm font-medium text-blue-800 mb-2">
지원 포지션: <span className="text-lg font-bold text-blue-900">{jobTitle}</span>
                </p>
                <p className="text-xs text-blue-600">
                  ※ 포지션 확인 후 작성해 주세요
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* 기본 정보 */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold border-b pb-2">기본 정보</h3>
                  
                  {/* 지원분야 & 지원부서 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* 지원분야 */}
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        지원분야 <span className="text-red-500">*</span>
                      </label>
                      <Input
                        value={formData.division}
                        onChange={(e) => setFormData({ ...formData, division: e.target.value })}
                        placeholder="예: 경영관리본부, 식자재사업본부 등"
                        required
                      />
                    </div>

                    {/* 지원부서 */}
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        지원부서 <span className="text-red-500">*</span>
                      </label>
                      <Input
                        value={formData.department}
                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                        placeholder="예: 인사/총무, 영업/마케팅 등"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        이름 <span className="text-red-500">*</span>
                      </label>
                      <Input
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="홍길동"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        생년월일 <span className="text-red-500">*</span>
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
                        이메일 <span className="text-red-500">*</span>
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
                        연락처 <span className="text-red-500">*</span>
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
                    <label className="block text-sm font-medium mb-2">주소</label>
                    <Input
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="서울시 송파구..."
                    />
                  </div>
                </div>

                {/* 학력 및 경력 */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold border-b pb-2">학력 및 경력</h3>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">최종 학력</label>
                    <Input
                      value={formData.education}
                      onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                      placeholder="예: OO대학교 경영학과 졸업"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">경력 사항</label>
                    <Textarea
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      placeholder="주요 경력 사항을 입력해주세요&#10;예:&#10;- 2020-2023: OO회사 영업팀 (3년)&#10;- 주요 업무: 신규 고객 개발, 매출 관리"
                      rows={6}
                    />
                  </div>
                </div>

                {/* 지원 동기 */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold border-b pb-2">지원 동기</h3>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      지원 동기 및 포부 <span className="text-red-500">*</span>
                    </label>
                    <Textarea
                      value={formData.motivation}
                      onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                      placeholder="지원 동기와 입사 후 포부를 작성해주세요"
                      rows={8}
                      required
                    />
                  </div>
                </div>

                {/* 파일 첨부 */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold border-b pb-2">서류 첨부</h3>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      이력서 (선택)
                    </label>
                    <Input
                      type="file"
                      accept=".pdf,.doc,.docx,.hwp"
                      onChange={(e) => handleFileUpload(e, 'resumeFile')}
                      className="cursor-pointer"
                    />
                    <p className="text-xs text-gray-500 mt-1">
업로드 용량 5MB 이내 | PDF 형식 권장
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      포트폴리오 (선택)
                    </label>
                    <Input
                      type="file"
                      accept=".pdf,.ppt,.pptx"
                      onChange={(e) => handleFileUpload(e, 'portfolioFile')}
                      className="cursor-pointer"
                    />
                    <p className="text-xs text-gray-500 mt-1">
업로드 용량 10MB 이내 | PDF 형식 권장
                    </p>
                  </div>
                </div>

                {/* 개인정보 동의 */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">
                    <strong>개인정보 수집 및 이용 동의</strong><br/>
                    수집 항목: 이름, 주민등록번호, 이메일, 연락처, 주소, 학력, 경력<br/>
                    이용 목적: 채용 전형 진행 및 결과 안내<br/>
                    보유 기간: 채용 종료 후 3개월
                  </p>
                </div>

                {/* 제출 버튼 */}
                <div className="flex gap-4">
                  <Button type="submit" className="flex-1">
                    지원서 제출
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => navigate(-1)}
                    className="flex-1"
                  >
                    취소
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