import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Edit, Trash2, Eye, Save, X, LogOut, Key, Image as ImageIcon, Image } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Post {
  id: number;
  title: string;
  content: string;
  category: string;
  type: "notice" | "company" | "jobs";
  date: string;
  views: number;
  images?: string[];
  imageDescriptions?: string[];
attachmentFiles?: string[];
  attachmentFileNames?: string[];
  // 채용공고 전용 필드
  department?: string;
  location?: string;
  jobType?: "정규직" | "계약직";
  experience?: string;
  deadline?: string;
  status?: "채용중" | "채용마감" | "상시채용";
}

const ADMIN_USERNAME = "momentum";
const INITIAL_PASSWORD = "mf6090";

const AdminPanel = () => {
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [passwordChangeForm, setPasswordChangeForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [activeTab, setActiveTab] = useState<"notice" | "company" | "jobs" | "applications" | "inquiries">("notice");
  const [isEditing, setIsEditing] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    type: "notice" as "notice" | "company" | "jobs",
    date: new Date().toISOString().split('T')[0], // 오늘 날짜 기본값
    images: [] as string[],
    imageDescriptions: [] as string[],
    department: "",
    location: "",
    jobType: "",
    experience: "",
    deadline: "",
    status: "채용중" as "채용중" | "채용마감" | "상시채용",
attachmentFiles: ["", "", ""] as string[],
    attachmentFileNames: ["", "", ""] as string[]
  });
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [inquiries, setInquiries] = useState<any[]>([]);

  const [posts, setPosts] = useState<Post[]>([
    // 공지사항 예시
    {
      id: 1,
      title: "2025년 신규 사업 확장 계획 안내",
      content: "육류 가공 공장 설립 및 신규 유통 채널 확대에 대한 공지입니다.",
      category: "중요공지",
      type: "notice",
      date: "2024-12-15",
      views: 245
    },
    {
      id: 2,
      title: "품질관리 시스템 업그레이드 완료",
      content: "더욱 안전하고 신뢰할 수 있는 제품 공급을 위한 시스템 개선이 완료되었습니다.",
      category: "시스템",
      type: "notice",
      date: "2024-12-10",
      views: 189
    },
    {
      id: 3,
      title: "연말연시 배송 일정 안내",
      content: "연말연시 기간 중 배송 일정 변경 사항을 안내드립니다.",
      category: "배송공지",
      type: "notice",
      date: "2024-12-05",
      views: 156
    },
    // 회사소식 예시
    {
      id: 4,
      title: "프라임코어 창립 12주년 기념행사",
      content: "창립 12주년을 맞아 임직원 대상 기념행사를 개최합니다.",
      category: "행사소식",
      type: "company",
      date: "2024-12-10",
      views: 189
    },
    {
      id: 5,
      title: "신규 유통센터 오픈",
      content: "경기도 이천에 최첨단 유통센터가 새롭게 문을 열었습니다.",
      category: "사업확장",
      type: "company",
      date: "2024-12-01",
      views: 234
    },
    {
      id: 6,
      title: "지역사회 나눔 활동 실시",
      content: "송파구 지역 소외계층을 위한 식료품 지원 및 봉사활동을 진행했습니다.",
      category: "사회공헌",
      type: "company",
      date: "2024-11-25",
      views: 178
    },
    // 채용공고 예시
    {
      id: 7,
      title: "영업유통본부 국내영업팀 사원 모집",
      content: "국내 식자재 유통 영업 업무를 담당할 인재를 모집합니다.",
      category: "영업/마케팅",
      type: "jobs",
      date: "2024-12-08",
      views: 156,
      department: "영업유통본부",
      location: "서울 송파구",
      jobType: "",
      experience: "신입/경력 1-3년",
      deadline: "2024-12-31",
      status: "채용중"
    },
    {
      id: 8,
      title: "프랜차이즈본부 마케팅팀 대리 모집",
      content: "청년축산 브랜드 마케팅 업무를 담당할 인재를 모집합니다.",
      category: "영업/마케팅",
      type: "jobs",
      date: "2024-12-05",
      views: 134,
      department: "프랜차이즈본부",
      location: "서울 송파구",
      jobType: "",
      experience: "경력 3-5년",
      deadline: "2024-12-25",
      status: "채용중"
    }
  ]);

  // 로그인 상태 확인 및 게시글 불러오기
  useEffect(() => {
    const authStatus = sessionStorage.getItem("admin_authenticated");
    if (authStatus === "true") {
      setIsAuthenticated(true);
    }

    // localStorage에서 게시글 불러오기
    const savedPosts = localStorage.getItem("admin_posts");
    if (savedPosts) {
      try {
        setPosts(JSON.parse(savedPosts));
      } catch (error) {
        console.error("Failed to load posts:", error);
      }
    }
  }, []);

  // 게시글 변경 시 localStorage에 저장 (제거 - 각 함수에서 직접 저장)
  // useEffect(() => {
  //   if (posts.length > 0) {
  //     localStorage.setItem("admin_posts", JSON.stringify(posts));
  //     localStorage.setItem("notice_posts", JSON.stringify(posts.filter(p => p.type === "notice")));
  //     localStorage.setItem("company_posts", JSON.stringify(posts.filter(p => p.type === "company")));
  //     localStorage.setItem("jobs_posts", JSON.stringify(posts.filter(p => p.type === "jobs")));
  //   }
  // }, [posts]);

  // 입사지원 데이터 불러오기
  useEffect(() => {
    const savedApplications = localStorage.getItem("job_applications");
    if (savedApplications) {
      try {
        setApplications(JSON.parse(savedApplications));
      } catch (error) {
        console.error("Failed to load applications:", error);
      }
    }
  }, []);

  // 입사지원 실시간 업데이트
  useEffect(() => {
    const handleStorageChange = () => {
      const savedApplications = localStorage.getItem("job_applications");
      if (savedApplications) {
        try {
          setApplications(JSON.parse(savedApplications));
        } catch (error) {
          console.error("Failed to reload applications:", error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    const interval = setInterval(handleStorageChange, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  // 온라인문의 데이터 불러오기
  useEffect(() => {
    const savedInquiries = localStorage.getItem("inquiries");
    if (savedInquiries) {
      try {
        setInquiries(JSON.parse(savedInquiries));
      } catch (error) {
        console.error("Failed to load inquiries:", error);
      }
    }
  }, []);

  // 온라인문의 실시간 업데이트
  useEffect(() => {
    const handleStorageChange = () => {
      const savedInquiries = localStorage.getItem("inquiries");
      if (savedInquiries) {
        try {
          setInquiries(JSON.parse(savedInquiries));
        } catch (error) {
          console.error("Failed to reload inquiries:", error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    const interval = setInterval(handleStorageChange, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  // 저장된 비밀번호 가져오기
  const getStoredPassword = () => {
    return localStorage.getItem("admin_password") || INITIAL_PASSWORD;
  };

  // 로그인 처리
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const storedPassword = getStoredPassword();

    if (loginForm.username === ADMIN_USERNAME && loginForm.password === storedPassword) {
      setIsAuthenticated(true);
      sessionStorage.setItem("admin_authenticated", "true");
      toast({
        title: "로그인 성공",
        description: "관리자 페이지에 접속하였습니다.",
      });
    } else {
      toast({
        title: "로그인 실패",
        description: "아이디 또는 비밀번호가 올바르지 않습니다.",
        variant: "destructive",
      });
    }
  };

  // 로그아웃 처리
  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("admin_authenticated");
    setLoginForm({ username: "", password: "" });
    toast({
      title: "로그아웃",
      description: "로그아웃 되었습니다.",
    });
  };

  // 비밀번호 변경 처리
  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    const storedPassword = getStoredPassword();

    if (passwordChangeForm.currentPassword !== storedPassword) {
      toast({
        title: "비밀번호 변경 실패",
        description: "현재 비밀번호가 올바르지 않습니다.",
        variant: "destructive",
      });
      return;
    }

    if (passwordChangeForm.newPassword !== passwordChangeForm.confirmPassword) {
      toast({
        title: "비밀번호 변경 실패",
        description: "새 비밀번호가 일치하지 않습니다.",
        variant: "destructive",
      });
      return;
    }

    if (passwordChangeForm.newPassword.length < 6) {
      toast({
        title: "비밀번호 변경 실패",
        description: "비밀번호는 최소 6자 이상이어야 합니다.",
        variant: "destructive",
      });
      return;
    }

    localStorage.setItem("admin_password", passwordChangeForm.newPassword);
    setShowPasswordChange(false);
    setPasswordChangeForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    toast({
      title: "비밀번호 변경 완료",
      description: "비밀번호가 성공적으로 변경되었습니다.",
    });
  };

  // 이미지 업로드 핸들러 (여러 개)
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newImages: string[] = [];
    const newPreviews: string[] = [];
    let processedCount = 0;

    Array.from(files).forEach((file) => {
      // 파일 크기 체크 (5MB 제한)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "파일 크기 초과",
          description: `${file.name}은(는) 5MB를 초과합니다.`,
          variant: "destructive",
        });
        return;
      }

      // 이미지 파일 타입 체크
      if (!file.type.startsWith('image/')) {
        toast({
          title: "파일 형식 오류",
          description: `${file.name}은(는) 이미지 파일이 아닙니다.`,
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        newImages.push(base64String);
        newPreviews.push(base64String);
        processedCount++;

        if (processedCount === files.length) {
          setFormData({ 
            ...formData, 
            images: [...formData.images, ...newImages],
            imageDescriptions: [...formData.imageDescriptions, ...new Array(newImages.length).fill("")]
          });
          setImagePreviews([...imagePreviews, ...newPreviews]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // 이미지 삭제
  const handleRemoveImage = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    const newDescriptions = formData.imageDescriptions.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages, imageDescriptions: newDescriptions });
    setImagePreviews(newPreviews);
  };

// 이미지 설명 변경
  const handleImageDescriptionChange = (index: number, description: string) => {
    const newDescriptions = [...formData.imageDescriptions];
    newDescriptions[index] = description;
    setFormData({ ...formData, imageDescriptions: newDescriptions });
};

  // 테스트 데이터 생성 함수
  const generateTestData = () => {
    const testPosts: Post[] = [];
    
// 공지사항 테스트 데이터 25개
    const noticesTitles = [
      "2025년 신정 휴가 신청 안내",
      "사내 안전교육 실시 안내",
      "전사 시스템 점검 예정 안내",
      "직원 건강검진 실시 안내",
      "사내 주차장 이용 수칙 변경 안내",
      "연말정산 및 신년 휴무 안내",
      "사내 식당 운영시간 변경 안내",
      "정보보안 교육 실시 안내",
      "사내 금연 캐페인 실시 안내",
      "직원 대상 설문조사 실시 안내",
      "사내 도서관 신규 도서 입고 안내",
      "전사 워크샵 개최 안내",
      "사내 체육대회 개최 안내",
      "직원 교육 프로그램 신청 안내",
      "사내 제안 제도 운영 안내",
      "전사 회의실 예약 시스템 도입 안내",
      "사내 카페테리아 메뉴 변경 안내",
      "직원 대상 스트레스 관리 교육 안내",
      "사내 전산시스템 업그레이드 안내",
      "전사 비상연락망 업데이트 안내",
      "사내 에너지 절약 캐페인 안내",
      "직원 대상 인플루엔자 예방접종 안내",
      "사내 신규 복리제도 도입 안내",
      "전사 소방훈련 실시 안내",
      "사내 전직원 워크샵 개최 안내"
    ];
    
    for (let i = 1; i <= 25; i++) {
      testPosts.push({
        id: Date.now() + i,
        title: noticesTitles[i - 1] || `공지사항 ${i}`,
content: `${noticesTitles[i - 1] || `공지사항 ${i}`}에 대한 상세 내용입니다.\n\n자세한 사항은 첫부파일을 참고하시기 바랍니다.\n\n문의사항이 있으시면 인사팀으로 연락주시기 바랍니다.`,
        category: i % 3 === 0 ? "중요공지" : i % 3 === 1 ? "일반공지" : "시스템",
        type: "notice",
        date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        views: Math.floor(Math.random() * 800) + 100,
        attachmentFiles: i % 2 === 0 ? ["data:text/plain;base64,dGVzdCBmaWxl"] : [],
        attachmentFileNames: i % 2 === 0 ? [`공지사항_${String(i).padStart(3, '0')}.pdf`] : []
      });
    }
    
    // 회사소식 테스트 데이터 25개
    const newsTitles = [
      "프라임코어, 신규 사업장 건립 착공",
      "청년축산 프랜차이즈 100호점 달성",
      "식자재 유통 사업 대형 계약 체결",
      "ISO 22000 식품안전경영시스템 인증 획득",
      "지역사회 나눔 활동 실시",
      "전국 대학가 취업설명회 참가",
      "신선식품 콜드체인 시스템 구축 완료",
      "전사 디지털 트랜스포메이션 추진",
      "우수 협력업체 표창 식 개최",
      "신규 물류센터 건립 착공식 개최",
      "전국 식자재 전시회 참가",
      "사내 우수사원 표창 식 개최",
      "신제품 출시 및 마켓팅 전략 발표",
      "전사 품질경영 시스템 도입",
      "지역 농가와 상생 협력 협약 체결",
      "전국 가맹점 대회 개최",
      "신규 브랜드 론칭 및 마켓팅 캐페인",
      "전사 안전경영 시스템 강화",
      "우수 직원 해외연수 프로그램 실시",
      "전국 식품안전 세미나 참가",
      "신규 유통망 확장 및 인프라 강화",
      "전사 직원 만족도 조사 결과 발표",
      "신규 기술 도입 및 R&D 센터 설립",
      "전국 대학생 인턴십 프로그램 운영",
      "전사 친환경 경영 시스템 도입"
    ];
    
    for (let i = 1; i <= 25; i++) {
      testPosts.push({
        id: Date.now() + 1000 + i,
        title: newsTitles[i - 1] || `회사소식 ${i}`,
        content: `${newsTitles[i - 1] || `회사소식 ${i}`}에 대한 상세 내용입니다.\n\n자세한 사항은 첫부파일을 참고하시기 바랍니다.\n\n문의사항이 있으시면 홍보팀으로 연락주시기 바랍니다.`,
        category: i % 3 === 0 ? "사업확장" : i % 3 === 1 ? "언론보도" : "사회공헌",
        type: "company",
        date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        views: Math.floor(Math.random() * 600) + 80,
        attachmentFiles: i % 3 === 0 ? ["data:text/plain;base64,dGVzdCBmaWxl"] : [],
        attachmentFileNames: i % 3 === 0 ? [`회사소식_${String(i).padStart(3, '0')}.pdf`] : []
      });
    }
    
    // 채용공고 테스트 데이터 25개
    const jobTitles = [
      "영업유통본부 국내영업팀 사원 모집",
      "프랜차이즈본부 마켓팅팀 대리 모집",
      "경영관리본부 인사팀 주임 모집",
      "FM/아웃소싱본부 영업팀 사원 모집",
      "식자재사업본부 품질관리팀 대리 모집",
      "경영관리본부 재무팀 사원 모집",
      "프랜차이즈본부 상품개발팀 주임 모집",
      "영업유통본부 물류관리팀 대리 모집",
      "경영관리본부 기획팀 사원 모집",
      "FM/아웃소싱본부 운영관리팀 주임 모집",
      "식자재사업본부 영업팀 대리 모집",
      "프랜차이즈본부 점포개발팀 주임 모집",
      "경영관리본부 총무팀 사원 모집",
      "영업유통본부 해외영업팀 대리 모집",
      "FM/아웃소싱본부 고객서비스팀 사원 모집",
      "식자재사업본부 생산관리팀 주임 모집",
      "프랜차이즈본부 교육팀 대리 모집",
      "경영관리본부 전략기획팀 주임 모집",
      "영업유통본부 전자상거래팀 사원 모집",
      "FM/아웃소싱본부 시설관리팀 대리 모집",
      "식자재사업본부 연구개발팀 주임 모집",
      "프랜차이즈본부 브랜드관리팀 대리 모집",
      "경영관리본부 인사기획팀 사원 모집",
      "영업유통본부 고객관리팀 주임 모집",
      "2025년 상반기 대졸신입사원 공개채용"
    ];
    
    for (let i = 1; i <= 25; i++) {
      testPosts.push({
        id: Date.now() + 2000 + i,
        title: jobTitles[i - 1] || `채용공고 ${i}`,
        content: `${jobTitles[i - 1] || `채용공고 ${i}`}\n\n■ 모집부문: ${i % 4 === 0 ? "영업본부" : i % 4 === 1 ? "경영관리본부" : i % 4 === 2 ? "프랜차이즈본부" : "FM/아웃소싱본부"}\n■ 근무지: 서울 송파구\n■ 고용형태: ${i % 2 === 0 ? "정규직" : "계약직"}\n■ 경력: ${i % 3 === 0 ? "신입" : "경력 1-5년"}\n\n자세한 사항은 첫부파일을 참고하시기 바랍니다.`,
        category: "채용공고",
        type: "jobs",
        date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        views: Math.floor(Math.random() * 400) + 50,
        department: i % 3 === 0 ? "영업본부" : i % 3 === 1 ? "경영관리본부" : "프랜차이즈본부",
        location: "서울 송파구",
        jobType: i % 2 === 0 ? "정규직" : "계약직",
        experience: i % 3 === 0 ? "신입" : "경력 1-3년",
        deadline: "2025-12-31",
        status: i % 4 === 0 ? "채용마감" : i % 4 === 1 ? "상시채용" : "채용중",
attachmentFiles: i % 2 === 0 ? ["data:text/plain;base64,dGVzdCBmaWxl"] : [],
        attachmentFileNames: i % 2 === 0 ? [`채용공고_${String(i).padStart(3, '0')}.pdf`] : []
      });
    }
    
    const updatedPosts = [...posts, ...testPosts];
    setPosts(updatedPosts);
    
    // localStorage에 저장
    localStorage.setItem("admin_posts", JSON.stringify(updatedPosts));
    localStorage.setItem("notice_posts", JSON.stringify(updatedPosts.filter(p => p.type === "notice")));
    localStorage.setItem("company_posts", JSON.stringify(updatedPosts.filter(p => p.type === "company")));
    localStorage.setItem("jobs_posts", JSON.stringify(updatedPosts.filter(p => p.type === "jobs")));
    
    // 즉시 반영을 위한 storage 이벤트 트리거
    window.dispatchEvent(new Event('storage'));
    
    toast({
      title: "테스트 데이터 생성",
      description: "각 게시판에 30개씩 테스트 데이터가 생성되었습니다.",
    });
  };

  // 첨부파일 업로드 핸들러
  const handleAttachmentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 파일 크기 체크 (10MB 제한)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "파일 크기 초과",
        description: "첨부파일은 10MB를 초과할 수 없습니다.",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
const newFiles = [...formData.attachmentFiles];
      const newNames = [...formData.attachmentFileNames];
      
      // 첫 번째 빈 자리에 파일 추가
      const emptyIndex = newFiles.findIndex(file => !file);
      if (emptyIndex !== -1) {
        newFiles[emptyIndex] = base64String;
        newNames[emptyIndex] = file.name;
      } else {
        newFiles[0] = base64String;
        newNames[0] = file.name;
      }
      
      setFormData({ 
        ...formData, 
        attachmentFiles: newFiles,
        attachmentFileNames: newNames
      });
    };
    reader.readAsDataURL(file);
  };

  // 첨부파일 삭제
  const handleRemoveAttachment = () => {
setFormData({ 
      ...formData, 
      attachmentFiles: ["", "", ""],
      attachmentFileNames: ["", "", ""]
    });
  };

const handleAddPost = () => {
    // 최소 필수 항목 검증 (제목과 내용만)
    if (!formData.title || !formData.content) {
      toast({
        title: "입력 오류",
        description: "제목과 내용을 입력해주세요.",
        variant: "destructive",
      });
      return;
    }

const newPost: Post = {
      id: Date.now(),
      title: formData.title,
      content: formData.content,
      category: formData.category || "기본",
      type: activeTab,
      date: formData.date,
      views: 0,
attachmentFiles: formData.attachmentFiles || [],
      attachmentFileNames: formData.attachmentFileNames || [],
...(activeTab === "jobs" && {
        department: formData.department || "미지정",
        location: formData.location || "미지정",
        jobType: formData.jobType || "미지정",
        experience: formData.experience || "미지정",
        deadline: formData.deadline || "2025-12-31",
        status: formData.status || "채용중"
      })
    };

    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    
    // 즉시 localStorage에 저장
    localStorage.setItem("admin_posts", JSON.stringify(updatedPosts));
    localStorage.setItem("notice_posts", JSON.stringify(updatedPosts.filter(p => p.type === "notice")));
    localStorage.setItem("company_posts", JSON.stringify(updatedPosts.filter(p => p.type === "company")));
    localStorage.setItem("jobs_posts", JSON.stringify(updatedPosts.filter(p => p.type === "jobs")));
    
    // 즉시 반영을 위한 storage 이벤트 트리거
    window.dispatchEvent(new Event('storage'));
    
    setFormData({
      title: "",
      content: "",
      category: "",
      type: activeTab,
      date: new Date().toISOString().split('T')[0],
      images: [],
      imageDescriptions: [],
      department: "",
      location: "",
      jobType: "",
      experience: "",
      deadline: "",
      status: "채용중",
attachmentFiles: ["", "", ""],
      attachmentFileNames: ["", "", ""]
    });
    setImagePreviews([]);
    setIsEditing(false);
    toast({
      title: "게시글 등록",
      description: "게시글이 성공적으로 등록되었습니다.",
    });
  };

const handleEditPost = (post: Post) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      content: post.content,
      category: post.category,
      type: post.type,
      date: post.date,
      images: [],
      imageDescriptions: [],
      department: post.department || "",
      location: post.location || "",
      jobType: post.jobType || "정규직",
      experience: post.experience || "",
      deadline: post.deadline || "",
      status: post.status || "채용중",
attachmentFiles: post.attachmentFiles || ["", "", ""],
      attachmentFileNames: post.attachmentFileNames || ["", "", ""]
    });
    setIsEditing(true);
  };

const handleUpdatePost = () => {
    if (!editingPost) return;

    // 최소 필수 항목 검증 (제목과 내용만)
    if (!formData.title || !formData.content) {
      toast({
        title: "입력 오류",
        description: "제목과 내용을 입력해주세요.",
        variant: "destructive",
      });
      return;
    }

const updatedPosts = posts.map(post =>
      post.id === editingPost.id
        ? {
...post,
            title: formData.title,
            content: formData.content,
            category: formData.category || "기본",
            date: formData.date,
attachmentFiles: formData.attachmentFiles || [],
            attachmentFileNames: formData.attachmentFileNames || [],
...(post.type === "jobs" && {
              department: formData.department || "미지정",
              location: formData.location || "미지정",
              jobType: formData.jobType || "미지정",
              experience: formData.experience || "미지정",
              deadline: formData.deadline || "2025-12-31",
              status: formData.status || "채용중"
            })
          }
        : post
    );

    setPosts(updatedPosts);
    
    // 즉시 localStorage에 저장
    localStorage.setItem("admin_posts", JSON.stringify(updatedPosts));
    localStorage.setItem("notice_posts", JSON.stringify(updatedPosts.filter(p => p.type === "notice")));
    localStorage.setItem("company_posts", JSON.stringify(updatedPosts.filter(p => p.type === "company")));
    localStorage.setItem("jobs_posts", JSON.stringify(updatedPosts.filter(p => p.type === "jobs")));
    
    // 즉시 반영을 위한 storage 이벤트 트리거
    window.dispatchEvent(new Event('storage'));
    setFormData({
      title: "",
      content: "",
      category: "",
      type: activeTab,
      date: new Date().toISOString().split('T')[0],
      images: [],
      imageDescriptions: [],
      department: "",
      location: "",
      jobType: "",
      experience: "",
      deadline: "",
      status: "채용중",
attachmentFiles: ["", "", ""],
      attachmentFileNames: ["", "", ""]
    });
    setImagePreviews([]);
    setIsEditing(false);
    setEditingPost(null);
    toast({
      title: "게시글 수정",
      description: "게시글이 성공적으로 수정되었습니다.",
    });
  };

  const handleDeletePost = (id: number) => {
    const updatedPosts = posts.filter(post => post.id !== id);
    setPosts(updatedPosts);
    
    // 즉시 localStorage에 저장
    localStorage.setItem("admin_posts", JSON.stringify(updatedPosts));
    localStorage.setItem("notice_posts", JSON.stringify(updatedPosts.filter(p => p.type === "notice")));
    localStorage.setItem("company_posts", JSON.stringify(updatedPosts.filter(p => p.type === "company")));
    localStorage.setItem("jobs_posts", JSON.stringify(updatedPosts.filter(p => p.type === "jobs")));
    
    // 즉시 반영을 위한 storage 이벤트 트리거
    window.dispatchEvent(new Event('storage'));
    
    toast({
      title: "게시글 삭제",
      description: "게시글이 삭제되었습니다.",
    });
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditingPost(null);
    setFormData({
      title: "",
      content: "",
      category: "",
      type: activeTab,
      date: new Date().toISOString().split('T')[0],
      images: [],
      imageDescriptions: [],
      department: "",
      location: "",
      jobType: "",
      experience: "",
      deadline: "",
      status: "채용중",
attachmentFiles: ["", "", ""],
      attachmentFileNames: ["", "", ""]
    });
    setImagePreviews([]);
  };

  const filteredPosts = posts.filter(post => post.type === activeTab);

  // 입사지원 상태 변경
  const handleApplicationStatusChange = (id: string, newStatus: string) => {
    const updatedApplications = applications.map(app =>
      app.id === id ? { ...app, status: newStatus } : app
    );
    setApplications(updatedApplications);
    localStorage.setItem("job_applications", JSON.stringify(updatedApplications));
    
    // 즉시 반영을 위한 storage 이벤트 트리거
    window.dispatchEvent(new Event('storage'));
    
    toast({
      title: "상태 변경",
      description: "지원자 상태가 변경되었습니다.",
    });
  };

  // 입사지원 삭제
  const handleDeleteApplication = (id: string) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    
    const updatedApplications = applications.filter(app => app.id !== id);
    setApplications(updatedApplications);
    localStorage.setItem("job_applications", JSON.stringify(updatedApplications));
    
    // 즉시 반영을 위한 storage 이벤트 트리거
    window.dispatchEvent(new Event('storage'));
    
    toast({
      title: "삭제 완료",
      description: "지원서가 삭제되었습니다.",
    });
  };

  // 온라인문의 상태 변경
  const handleInquiryStatusChange = (id: string, newStatus: string) => {
    const updatedInquiries = inquiries.map(inq =>
      inq.id === id ? { ...inq, status: newStatus } : inq
    );
    setInquiries(updatedInquiries);
    localStorage.setItem("inquiries", JSON.stringify(updatedInquiries));
    
    // 즉시 반영을 위한 storage 이벤트 트리거
    window.dispatchEvent(new Event('storage'));
    
    toast({
      title: "상태 변경",
      description: "문의 상태가 변경되었습니다.",
    });
  };

  // 온라인문의 삭제
  const handleDeleteInquiry = (id: string) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    
    const updatedInquiries = inquiries.filter(inq => inq.id !== id);
    setInquiries(updatedInquiries);
    localStorage.setItem("inquiries", JSON.stringify(updatedInquiries));
    
    // 즉시 반영을 위한 storage 이벤트 트리거
    window.dispatchEvent(new Event('storage'));
    
    toast({
      title: "삭제 완료",
      description: "문의가 삭제되었습니다.",
    });
  };

  // 로그인 화면
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl text-center">관리자 로그인</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">아이디</label>
                <Input
                  type="text"
                  value={loginForm.username}
                  onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                  placeholder="아이디를 입력하세요"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">비밀번호</label>
                <Input
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  placeholder="비밀번호를 입력하세요"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                로그인
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  // 비밀번호 변경 모달
  if (showPasswordChange) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl text-center">비밀번호 변경</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">현재 비밀번호</label>
                <Input
                  type="password"
                  value={passwordChangeForm.currentPassword}
                  onChange={(e) => setPasswordChangeForm({ ...passwordChangeForm, currentPassword: e.target.value })}
                  placeholder="현재 비밀번호"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">새 비밀번호</label>
                <Input
                  type="password"
                  value={passwordChangeForm.newPassword}
                  onChange={(e) => setPasswordChangeForm({ ...passwordChangeForm, newPassword: e.target.value })}
                  placeholder="새 비밀번호 (최소 6자)"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">새 비밀번호 확인</label>
                <Input
                  type="password"
                  value={passwordChangeForm.confirmPassword}
                  onChange={(e) => setPasswordChangeForm({ ...passwordChangeForm, confirmPassword: e.target.value })}
                  placeholder="새 비밀번호 확인"
                  required
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit" className="flex-1">
                  변경
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowPasswordChange(false)} className="flex-1">
                  취소
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  // 관리자 페이지 메인
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">관리자 페이지</h1>
<div className="flex gap-2">
              <Button variant="secondary" onClick={generateTestData}>
                <Plus className="h-4 w-4 mr-2" />
                테스트 데이터 생성
              </Button>
              <Button variant="outline" onClick={() => setShowPasswordChange(true)}>
                <Key className="h-4 w-4 mr-2" />
                비밀번호 변경
              </Button>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                로그아웃
              </Button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-4 mb-6">
            <Button
              variant={activeTab === "notice" ? "default" : "outline"}
              onClick={() => setActiveTab("notice")}
            >
              공지사항
            </Button>
            <Button
              variant={activeTab === "company" ? "default" : "outline"}
              onClick={() => setActiveTab("company")}
            >
              회사소식
            </Button>
            <Button
              variant={activeTab === "jobs" ? "default" : "outline"}
              onClick={() => setActiveTab("jobs")}
            >
              채용공고
            </Button>
            <Button
              variant={activeTab === "applications" ? "default" : "outline"}
              onClick={() => setActiveTab("applications")}
            >
              입사지원 관리
            </Button>
            <Button
              variant={activeTab === "inquiries" ? "default" : "outline"}
              onClick={() => setActiveTab("inquiries")}
            >
              온라인문의 관리
            </Button>
          </div>

          {/* 입사지원 관리 탭 */}
          {activeTab === "applications" && (
            <Card>
              <CardHeader>
                <CardTitle>입사지원 목록</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {applications.length === 0 ? (
                    <p className="text-center text-gray-500 py-8">접수된 지원서가 없습니다.</p>
                  ) : (
                    <div className="overflow-x-auto">
<table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">접수번호</th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">지원포지션</th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">이름</th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">접수일</th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">상태</th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">관리</th>
                          </tr>
                        </thead>
<tbody className="bg-white divide-y divide-gray-200">
                          {applications.map((app) => (
                            <tr key={app.id} className="hover:bg-gray-50">
                              <td className="px-3 py-2 text-xs font-mono text-gray-900">
                                {app.applicationNumber}
                              </td>
                              <td className="px-3 py-2 text-xs text-gray-900">
                                {app.jobTitle}
                              </td>
                              <td className="px-3 py-2 text-xs text-gray-900">
                                {app.name}
                              </td>
                              <td className="px-3 py-2 text-xs text-gray-600">
                                {app.appliedDate}
                              </td>
                              <td className="px-3 py-2 text-xs">
                                <Select
                                  value={app.status}
                                  onValueChange={(value) => handleApplicationStatusChange(app.id, value)}
                                >
<SelectTrigger className="w-24 text-xs">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="접수완료">접수완료</SelectItem>
                                    <SelectItem value="서류검토">서류검토</SelectItem>
                                    <SelectItem value="면접대기">면접대기</SelectItem>
                                    <SelectItem value="최종합격">최종합격</SelectItem>
                                    <SelectItem value="불합격">불합격</SelectItem>
                                  </SelectContent>
                                </Select>
                              </td>
<td className="px-3 py-2 text-xs">
                                <div className="flex gap-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                      // 상세 정보를 보기 좋게 표시
                                      const detailsHtml = `
<div style="font-family: Arial, sans-serif; line-height: 1.6;">
  <h3 style="color: #333; border-bottom: 2px solid #4CAF50; padding-bottom: 10px;">입사지원 상세정보</h3>
  
  <div style="margin: 20px 0;">
<p><strong>접수번호:</strong> ${app.applicationNumber}</p>
    <p><strong>지원포지션:</strong> ${app.jobTitle}</p>
    <p><strong>지원분야:</strong> ${(app as any).division || '-'}</p>
    <p><strong>지원부서:</strong> ${app.department || '-'}</p>
    <p><strong>이름:</strong> ${app.name}</p>
    <p><strong>이메일:</strong> ${app.email}</p>
    <p><strong>연락처:</strong> ${app.phone}</p>
    <p><strong>주민등록번호:</strong> ${app.idNumber || '-'}</p>
    <p><strong>주소:</strong> ${app.address || '-'}</p>
    <p><strong>학력:</strong> ${app.education || '-'}</p>
  </div>
  
  <div style="margin: 20px 0;">
    <h4 style="color: #555;">경력사항</h4>
    <p style="white-space: pre-wrap; background: #f5f5f5; padding: 10px; border-radius: 5px;">${app.experience || '-'}</p>
  </div>
  
  <div style="margin: 20px 0;">
    <h4 style="color: #555;">지원동기</h4>
    <p style="white-space: pre-wrap; background: #f5f5f5; padding: 10px; border-radius: 5px;">${app.motivation}</p>
  </div>
  
  <div style="margin: 20px 0;">
    <h4 style="color: #555;">첨부파일</h4>
    ${app.resumeFile ? '<p>✅ 이력서: 첨부됨 <button onclick="window.downloadFile(\'' + app.resumeFile + '\', \'이력서.pdf\')">다운로드</button></p>' : '<p>❌ 이력서: 미첨부</p>'}
    ${app.portfolioFile ? '<p>✅ 포트폴리오: 첨부됨 <button onclick="window.downloadFile(\'' + app.portfolioFile + '\', \'포트폴리오.pdf\')">다운로드</button></p>' : '<p>❌ 포트폴리오: 미첨부</p>'}
  </div>
  
  <div style="margin: 20px 0; padding-top: 10px; border-top: 1px solid #ddd;">
    <p><strong>접수일:</strong> ${app.appliedDate}</p>
    <p><strong>현재상태:</strong> <span style="color: #4CAF50; font-weight: bold;">${app.status}</span></p>
  </div>
</div>
                                      `;
                                      
                                      // 다운로드 함수 정의
                                      (window as any).downloadFile = (dataUrl: string, filename: string) => {
                                        const link = document.createElement('a');
                                        link.href = dataUrl;
                                        link.download = filename;
                                        link.click();
                                      };
                                      
                                      // 새 창으로 열기
                                      const newWindow = window.open('', '_blank', 'width=800,height=600');
                                      if (newWindow) {
                                        newWindow.document.write(detailsHtml);
                                        newWindow.document.close();
                                      }
                                    }}
                                  >
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                  {app.resumeFile && (
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => {
                                        const link = document.createElement('a');
                                        link.href = app.resumeFile!;
                                        link.download = `${app.name}_이력서.pdf`;
                                        link.click();
                                      }}
                                      title="이력서 다운로드"
                                    >
                                      📄
                                    </Button>
                                  )}
                                  {app.portfolioFile && (
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => {
                                        const link = document.createElement('a');
                                        link.href = app.portfolioFile!;
                                        link.download = `${app.name}_포트폴리오.pdf`;
                                        link.click();
                                      }}
                                      title="포트폴리오 다운로드"
                                    >
                                      📁
                                    </Button>
                                  )}
                                  <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => handleDeleteApplication(app.id)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* 온라인문의 관리 탭 */}
          {activeTab === "inquiries" && (
            <Card>
              <CardHeader>
                <CardTitle>온라인문의 목록</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {inquiries.length === 0 ? (
                    <p className="text-center text-gray-500 py-8">접수된 문의가 없습니다.</p>
                  ) : (
                    <div className="overflow-x-auto">
<table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">문의번호</th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">문의유형</th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">이름</th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">접수일</th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">상태</th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">관리</th>
                          </tr>
                        </thead>
<tbody className="bg-white divide-y divide-gray-200">
                          {inquiries.map((inq) => (
                            <tr key={inq.id} className="hover:bg-gray-50">
                              <td className="px-3 py-2 text-xs font-mono text-gray-900">
                                {inq.inquiryNumber}
                              </td>
                              <td className="px-3 py-2 text-xs text-gray-900">
                                {inq.inquiryType}
                              </td>
                              <td className="px-3 py-2 text-xs text-gray-900">
                                {inq.name}
                              </td>
                              <td className="px-3 py-2 text-xs text-gray-600">
                                {inq.submittedDate}
                              </td>
                              <td className="px-3 py-2 text-xs">
                                <Select
                                  value={inq.status}
                                  onValueChange={(value) => handleInquiryStatusChange(inq.id, value)}
                                >
<SelectTrigger className="w-24 text-xs">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="접수완료">접수완료</SelectItem>
                                    <SelectItem value="처리중">처리중</SelectItem>
                                    <SelectItem value="답변완료">답변완료</SelectItem>
                                  </SelectContent>
                                </Select>
                              </td>
<td className="px-3 py-2 text-xs">
                                <div className="flex gap-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                      const details = `
문의번호: ${inq.inquiryNumber}
문의유형: ${inq.inquiryType}
이름: ${inq.name}
이메일: ${inq.email}
연락처: ${inq.phone || '-'}
회사명: ${inq.company || '-'}
제목: ${inq.subject || '-'}

문의내용:
${inq.message}

접수일: ${inq.submittedDate}
상태: ${inq.status}
                                      `.trim();
                                      alert(details);
                                    }}
                                  >
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => handleDeleteInquiry(inq.id)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* 게시글 관리 탭 */}
          {activeTab !== "applications" && activeTab !== "inquiries" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* Form Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{isEditing ? "게시글 수정" : "새 게시글 작성"}</span>
                  {isEditing && (
                    <Button variant="ghost" size="sm" onClick={handleCancelEdit}>
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
<label className="block text-sm font-bold mb-2">제목</label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="제목을 입력하세요"
                  />
                </div>

                <div>
<label className="block text-sm font-bold mb-2">카테고리</label>
                  <Input
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="카테고리를 입력하세요"
                  />
                </div>

                <div>
<label className="block text-sm font-bold mb-2">게시일자</label>
                  <Input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                </div>


                <div>
<label className="block text-sm font-bold mb-2">첨부파일 (선택사항)</label>
                  <div className="space-y-2">
                    <Input
                      type="file"
                      onChange={handleAttachmentUpload}
                      className="cursor-pointer"
                    />
{formData.attachmentFiles.some(file => file) && (
                      <div className="space-y-2">
                        {formData.attachmentFiles.map((file, index) => (
                          file && (
                            <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                              <span className="text-sm text-gray-700 flex-1">{formData.attachmentFileNames[index]}</span>
<Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={handleRemoveAttachment}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          )
                        ))}
                      </div>
                    )}
<p className="text-xs text-gray-500">
                        * 첨부파일은 최대 10MB까지 업로드 가능합니다.
                      </p>
                  </div>
                </div>

                {activeTab === "jobs" && (
                  <>
                    <div>
<label className="block text-sm font-bold mb-2">부서</label>
                      <Input
                        value={formData.department}
                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                        placeholder="부서명을 입력하세요"
                      />
                    </div>

                    <div>
<label className="block text-sm font-bold mb-2">근무지</label>
                      <Input
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        placeholder="근무지를 입력하세요"
                      />
                    </div>

                    <div>
<label className="block text-sm font-bold mb-2">모집 형태</label>
                      <Input
                        value={formData.jobType}
                        onChange={(e) => setFormData({ ...formData, jobType: e.target.value })}
                        placeholder="예: 정규직, 계약직, 모니터요원, 주부패널 등"
                      />
                    </div>

                    <div>
<label className="block text-sm font-bold mb-2">경력</label>
                      <Input
                        value={formData.experience}
                        onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                        placeholder="예: 신입/경력 1-3년"
                      />
                    </div>

                    <div>
<label className="block text-sm font-bold mb-2">마감일</label>
                      <Input
                        type="date"
                        value={formData.deadline}
                        onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                      />
                    </div>

                    <div>
<label className="block text-sm font-bold mb-2">채용 상태</label>
                      <Select
                        value={formData.status}
                        onValueChange={(value: "채용중" | "채용마감" | "상시채용") => setFormData({ ...formData, status: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="채용중">채용중</SelectItem>
                          <SelectItem value="채용마감">채용마감</SelectItem>
                          <SelectItem value="상시채용">상시채용</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>


                  </>
                )}

<div>
<label className="block text-sm font-bold mb-2">내용</label>
                  <Textarea
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="내용을 입력하세요.&#10;&#10;예시:&#10;자세한 내용은 첨부된 파일을 참고하시기 바랍니다.&#10;&#10;담당부서: OOO팀&#10;전화번호: 02-XXXX-XXXX"
                    rows={8}
                    className="resize-none"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    * 간단한 내용만 입력하고, 상세 내용은 첨부파일로 제공하세요.
                  </p>
                </div>

                <Button
                  onClick={isEditing ? handleUpdatePost : handleAddPost}
                  className="w-full"
                >
                  {isEditing ? (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      수정 완료
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4 mr-2" />
                      게시글 등록
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Posts List Section */}
            <Card>
              <CardHeader>
                <CardTitle>게시글 목록</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredPosts.length === 0 ? (
                    <p className="text-center text-gray-500 py-8">등록된 게시글이 없습니다.</p>
                  ) : (
                    filteredPosts.map((post) => (
                      <div key={post.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                        {post.images && post.images.length > 0 && (
                          <div className="grid grid-cols-2 gap-2 mb-3">
                            {post.images.map((img, idx) => (
                              <img 
                                key={idx}
                                src={img} 
                                alt={`${post.title} ${idx + 1}`} 
                                className="w-full h-24 object-cover rounded-lg"
                              />
                            ))}
                          </div>
                        )}
<div className="flex justify-between items-start mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <h3 className="font-semibold text-base">{post.title}</h3>
                              <Badge variant="secondary" className="whitespace-nowrap">{post.category}</Badge>
                              {post.status && (
                                <Badge
                                  variant={
                                    post.status === "채용중"
                                      ? "default"
                                      : post.status === "채용마감"
                                      ? "destructive"
                                      : "secondary"
                                  }
                                  className="whitespace-nowrap"
                                >
                                  {post.status}
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 line-clamp-2">{post.content}</p>
                            {post.type === "jobs" && (
                              <div className="mt-2 text-sm text-gray-500 space-y-1">
                                <p>부서: {post.department}</p>
                                <p>근무지: {post.location}</p>
                                <p>고용형태: {post.jobType}</p>
                                <p>경력: {post.experience}</p>
                                <p>마감일: {post.deadline}</p>
                              </div>
                            )}
                            <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                              <span>{post.date}</span>
                              <span className="flex items-center gap-1">
                                <Eye className="h-3 w-3" />
                                {post.views}
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-2 ml-4">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditPost(post)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeletePost(post.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminPanel;