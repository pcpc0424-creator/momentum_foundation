import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Edit, Eye, Image as ImageIcon } from "lucide-react";

interface Post {
  id: number;
  title: string;
  content: string;
  category: string;
  type: "notice" | "company" | "jobs";
  date: string;
  views: number;
  department?: string;
  location?: string;
  jobType?: string;
  experience?: string;
  deadline?: string;
status?: "채용중" | "채용마감" | "상시채용";
  images?: string[];
  imageDescriptions?: string[];
  attachmentFile?: string;
  attachmentFileName?: string;
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

  const [posts, setPosts] = useState<Post[]>([]);
  const [formData, setFormData] = useState({
title: "",
    content: "",
    category: "",
    publishDate: new Date().toISOString().split('T')[0],
    department: "",
    location: "",
    jobType: "",
    experience: "",
    deadline: "",
status: "채용중" as "채용중" | "채용마감" | "상시채용",
    images: [],
    imageDescriptions: [],
    attachmentFile: "",
    attachmentFileName: ""
  });
  const [applications, setApplications] = useState<any[]>([]);
  const [inquiries, setInquiries] = useState<any[]>([]);

  // 인증 확인
  useEffect(() => {
    const authStatus = sessionStorage.getItem("admin_authenticated");
    if (authStatus === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  // 데이터 로드
useEffect(() => {
    if (isAuthenticated) {
      loadPosts();
      loadApplications();
      loadInquiries();
      
      // storage 이벤트 리스너 추가
      const handleStorageChange = () => {
        loadPosts();
        loadApplications();
        loadInquiries();
      };
      
      window.addEventListener('storage', handleStorageChange);
      const interval = setInterval(handleStorageChange, 1000);
      
      return () => {
        window.removeEventListener('storage', handleStorageChange);
        clearInterval(interval);
      };
    }
  }, [isAuthenticated]);

  const loadPosts = () => {
    const savedPosts = localStorage.getItem("admin_posts");
    if (savedPosts) {
      try {
        const parsedPosts = JSON.parse(savedPosts);
        setPosts(parsedPosts);
      } catch (error) {
        console.error("Failed to load posts:", error);
      }
    }
  };

  const loadApplications = () => {
    const savedApplications = localStorage.getItem("job_applications");
    if (savedApplications) {
      try {
        const parsedApplications = JSON.parse(savedApplications);
        setApplications(parsedApplications);
      } catch (error) {
        console.error("Failed to load applications:", error);
      }
    }
  };

  const loadInquiries = () => {
    const savedInquiries = localStorage.getItem("inquiries");
    if (savedInquiries) {
      try {
        const parsedInquiries = JSON.parse(savedInquiries);
        setInquiries(parsedInquiries);
      } catch (error) {
        console.error("Failed to load inquiries:", error);
      }
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginForm.username === ADMIN_USERNAME) {
      const storedPassword = localStorage.getItem("admin_password") || INITIAL_PASSWORD;
      if (loginForm.password === storedPassword) {
        setIsAuthenticated(true);
        sessionStorage.setItem("admin_authenticated", "true");
        toast({
          title: "로그인 성공",
          description: "관리자 페이지에 접속했습니다.",
        });
      } else {
        toast({
          title: "로그인 실패",
          description: "비밀번호가 올바르지 않습니다.",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "로그인 실패",
        description: "사용자명이 올바르지 않습니다.",
        variant: "destructive",
      });
    }
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    const currentPassword = localStorage.getItem("admin_password") || INITIAL_PASSWORD;
    
    if (passwordChangeForm.currentPassword !== currentPassword) {
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
        description: "새 비밀번호와 확인 비밀번호가 일치하지 않습니다.",
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

  const handleAttachmentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

// localStorage 사용량 체크 및 파일 크기 제한
    const checkStorageUsage = () => {
      let totalSize = 0;
      for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
          totalSize += localStorage[key].length;
        }
      }
      return totalSize;
    };
    
    const currentUsage = checkStorageUsage();
    const maxStorage = 5 * 1024 * 1024; // 5MB 한계
    const availableSpace = maxStorage - currentUsage;
    const estimatedFileSize = file.size * 1.4; // base64 인코딩 고려
    
    console.log('Storage check:', {
      currentUsage: (currentUsage / 1024 / 1024).toFixed(2) + 'MB',
      availableSpace: (availableSpace / 1024 / 1024).toFixed(2) + 'MB',
      fileSize: (file.size / 1024 / 1024).toFixed(2) + 'MB',
      estimatedSize: (estimatedFileSize / 1024 / 1024).toFixed(2) + 'MB'
    });
    
if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "파일 크기 초과",
description: `관리자 페이지 첫부파일은 5MB 이하여야 합니다.

현재 파일 크기: ${(file.size / 1024 / 1024).toFixed(2)}MB
최대 허용: 5MB

더 작은 파일로 다시 시도해주세요.`,
        variant: "destructive",
      });
      return;
    }
    
// localStorage 용량 체크 비활성화 (단순화)
    // if (estimatedFileSize > availableSpace) {
    //   const availableMB = (availableSpace / 1024 / 1024).toFixed(1);
    //   toast({
    //     title: "저장 공간 부족",
    //     description: "저장 공간이 부족합니다. 사용 가능: " + availableMB + "MB. '완전 초기화' 버튼을 사용해주세요.",
    //     variant: "destructive",
    //   });
    //   return;
    // }
    
    console.log('File upload - size:', file.size, 'name:', file.name);

const reader = new FileReader();
    
    reader.onloadend = () => {
      try {
        const result = reader.result as string;
        console.log('File read success:', file.name, 'Base64 length:', result.length);
        
        setFormData({
          ...formData,
          attachmentFile: result,
          attachmentFileName: file.name
        });
        
        toast({
          title: "파일 업로드 성공",
          description: file.name + " 파일이 업로드되었습니다.",
        });
      } catch (error) {
        console.error('File processing error:', error);
        toast({
          title: "파일 처리 오류",
          description: "파일 처리 중 오류가 발생했습니다.",
          variant: "destructive",
        });
      }
    };
    
    reader.onerror = () => {
      console.error('File read error:', reader.error);
      toast({
        title: "파일 읽기 오류",
        description: "파일을 읽는 중 오류가 발생했습니다.",
        variant: "destructive",
      });
    };
    
    reader.readAsDataURL(file);
  };

  const handleRemoveAttachment = () => {
    setFormData({
      ...formData,
      attachmentFile: "",
      attachmentFileName: ""
    });
  };

const handleAddPost = () => {
    console.log('Adding post - activeTab:', activeTab, 'formData:', formData);
    
    // 필수 항목 검증
    if (!formData.title.trim() || !formData.content.trim()) {
      toast({
        title: "입력 오류",
        description: "제목과 내용을 입력해주세요.",
        variant: "destructive",
      });
      return;
    }

    // 채용공고 필수 필드 검증
if (activeTab === "jobs" || activeTab === "company") {
      if (!formData.category.trim()) {
        toast({
          title: "입력 오류",
description: activeTab === "jobs" ? "채용공고는 카테고리를 선택해주세요." : "회사소식은 카테고리를 선택해주세요.",
          variant: "destructive",
        });
        return;
      }
    }

console.log('Creating new post with attachment:', {
      title: formData.title,
      hasAttachment: !!formData.attachmentFile,
      attachmentFileName: formData.attachmentFileName,
      attachmentSize: formData.attachmentFile ? formData.attachmentFile.length : 0
    });
    
    const newPost: Post = {
      id: Date.now(),
      title: formData.title.trim(),
      content: formData.content.trim(),
      category: formData.category || "기본",
      type: activeTab,
      date: formData.publishDate,
      views: 0,
      images: formData.images || [],
      imageDescriptions: formData.imageDescriptions || [],
      attachmentFile: formData.attachmentFile || "",
      attachmentFileName: formData.attachmentFileName || ""
    };

    // 채용공고인 경우 추가 필드
    if (activeTab === "jobs") {
      newPost.department = formData.department || "미지정";
      newPost.location = formData.location || "미지정";
      newPost.jobType = formData.jobType || "미지정";
      newPost.experience = formData.experience || "미지정";
      newPost.deadline = formData.deadline || "2025-12-31";
      newPost.status = formData.status || "채용중";
    }

const updatedPosts = [newPost, ...posts];
    
    // localStorage 저장 시도 및 실패 시 롤백
    try {
      localStorage.setItem("admin_posts", JSON.stringify(updatedPosts));
      localStorage.setItem("notice_posts", JSON.stringify(updatedPosts.filter(p => p.type === "notice")));
      localStorage.setItem("company_posts", JSON.stringify(updatedPosts.filter(p => p.type === "company")));
      localStorage.setItem("jobs_posts", JSON.stringify(updatedPosts.filter(p => p.type === "jobs")));
      
      // 저장 성공 시만 상태 업데이트
      setPosts(updatedPosts);
      
      // 즉시 반영을 위한 storage 이벤트 트리거
      window.dispatchEvent(new Event('storage'));
      
      toast({
        title: "게시글 작성 완료",
        description: "게시글이 성공적으로 등록되었습니다.",
      });
    } catch (error) {
      console.error('localStorage 저장 실패:', error);
      toast({
        title: "저장 실패",
description: "저장 공간이 부족합니다. 첫부파일 용량을 줄이거나 '완전 초기화'를 사용해주세요.",
        variant: "destructive",
      });
      return; // 저장 실패 시 게시글 등록 중단
    }
    
    // 폼 초기화
setFormData({
      title: "",
      content: "",
      category: "",
      publishDate: new Date().toISOString().split('T')[0],
      department: "",
      location: "",
      jobType: "",
      experience: "",
deadline: "",
      status: "채용중",
      images: [],
      imageDescriptions: [],
      attachmentFile: "",
      attachmentFileName: ""
    });

    toast({
      title: "게시글 추가 완료",
      description: "새 게시글이 성공적으로 추가되었습니다.",
    });
  };

  const handleEditPost = (post: Post) => {
setFormData({
      title: post.title,
      content: post.content,
      category: post.category,
      publishDate: post.date,
      department: post.department || "",
      location: post.location || "",
      jobType: post.jobType || "",
      experience: post.experience || "",
      deadline: post.deadline || "",
status: post.status || "채용중",
      images: post.images || [],
      imageDescriptions: post.imageDescriptions || [],
      attachmentFile: post.attachmentFile || "",
      attachmentFileName: post.attachmentFileName || ""
    });
    setEditingPost(post);
    setIsEditing(true);
  };

  const handleUpdatePost = () => {
    if (!editingPost) return;

    // 필수 항목 검증
    if (!formData.title.trim() || !formData.content.trim()) {
      toast({
        title: "입력 오류",
        description: "제목과 내용을 입력해주세요.",
        variant: "destructive",
      });
      return;
    }

const updatedPost: Post = {
      ...editingPost,
      title: formData.title.trim(),
      content: formData.content.trim(),
      category: formData.category || "기본",
date: formData.publishDate,
      images: formData.images || [],
      imageDescriptions: formData.imageDescriptions || [],
      attachmentFile: formData.attachmentFile,
      attachmentFileName: formData.attachmentFileName
    };

    // 채용공고인 경우 추가 필드
    if (activeTab === "jobs") {
      updatedPost.department = formData.department || "미지정";
      updatedPost.location = formData.location || "미지정";
      updatedPost.jobType = formData.jobType || "미지정";
      updatedPost.experience = formData.experience || "미지정";
      updatedPost.deadline = formData.deadline || "2025-12-31";
      updatedPost.status = formData.status || "채용중";
    }

    const updatedPosts = posts.map(p => p.id === editingPost.id ? updatedPost : p);
    setPosts(updatedPosts);
    
    // localStorage에 저장
    localStorage.setItem("admin_posts", JSON.stringify(updatedPosts));
    localStorage.setItem("notice_posts", JSON.stringify(updatedPosts.filter(p => p.type === "notice")));
    localStorage.setItem("company_posts", JSON.stringify(updatedPosts.filter(p => p.type === "company")));
    localStorage.setItem("jobs_posts", JSON.stringify(updatedPosts.filter(p => p.type === "jobs")));
    
    // 즉시 반영을 위한 storage 이벤트 트리거
    window.dispatchEvent(new Event('storage'));
    
    // 편집 모드 종료
    setIsEditing(false);
    setEditingPost(null);
setFormData({
      title: "",
      content: "",
      category: "",
      publishDate: new Date().toISOString().split('T')[0],
      department: "",
      location: "",
      jobType: "",
      experience: "",
      deadline: "",
      status: "채용중",
      images: [],
      imageDescriptions: [],
      attachmentFile: "",
      attachmentFileName: ""
    });

    toast({
      title: "게시글 수정 완료",
      description: "게시글이 성공적으로 수정되었습니다.",
    });
  };

  const handleDeletePost = (postId: number) => {
    if (confirm("정말로 이 게시글을 삭제하시겠습니까?")) {
      const updatedPosts = posts.filter(p => p.id !== postId);
      setPosts(updatedPosts);
      
      // localStorage에 저장
      localStorage.setItem("admin_posts", JSON.stringify(updatedPosts));
      localStorage.setItem("notice_posts", JSON.stringify(updatedPosts.filter(p => p.type === "notice")));
      localStorage.setItem("company_posts", JSON.stringify(updatedPosts.filter(p => p.type === "company")));
      localStorage.setItem("jobs_posts", JSON.stringify(updatedPosts.filter(p => p.type === "jobs")));
      
      // 즉시 반영을 위한 storage 이벤트 트리거
      window.dispatchEvent(new Event('storage'));

      toast({
        title: "게시글 삭제 완료",
        description: "게시글이 성공적으로 삭제되었습니다.",
      });
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditingPost(null);
setFormData({
      title: "",
      content: "",
      category: "",
      publishDate: new Date().toISOString().split('T')[0],
      department: "",
      location: "",
      jobType: "",
      experience: "",
      deadline: "",
status: "채용중",
      images: [],
      imageDescriptions: [],
      attachmentFile: "",
      attachmentFileName: ""
    });
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
      "업무용 차량 이용 규정 안내",
      "사내 금연 정책 시행 안내",
      "직원 복리후생 제도 개선 안내",
      "사내 교육 프로그램 신청 안내",
      "출입 보안 시스템 업그레이드 안내",
      "사내 회의실 예약 시스템 변경",
      "직원 제안 제도 운영 안내",
      "사내 동호회 활동 지원 안내",
      "업무 효율성 향상을 위한 시스템 도입",
      "사내 커뮤니케이션 툴 변경 안내",
      "직원 멘토링 프로그램 시행",
      "사내 환경 개선 프로젝트 안내",
      "업무 프로세스 개선 방안 공지",
      "사내 이벤트 개최 안내",
      "직원 역량 강화 교육 실시",
      "사내 소통 활성화 방안 안내",
      "업무 환경 개선을 위한 설문조사"
    ];

    for (let i = 0; i < 25; i++) {
      testPosts.push({
        id: Date.now() + i,
        title: noticesTitles[i],
        content: noticesTitles[i] + "에 대한 상세 내용입니다. 모든 직원은 해당 내용을 숙지하시기 바랍니다.",
        category: i % 3 === 0 ? "주요 공지" : i % 3 === 1 ? "시스템·정책" : "참여·이벤트",
        type: "notice",
        date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        views: Math.floor(Math.random() * 100),
        images: [],
        imageDescriptions: [],
        attachmentFile: "",
        attachmentFileName: ""
      });
    }

    // 회사소식 테스트 데이터 25개
    const companyTitles = [
      "모멘텀파운데이션, 2025년 신규 사업 확장 계획 발표",
      "청년축산 브랜드, 전국 100호점 돌파 기념 이벤트",
      "모멘텀파운데이션, 지역사회 봉사활동 실시",
      "식자재 유통 부문 매출 신기록 달성",
      "모멘텀파운데이션, 친환경 경영 인증 획득",
      "청년축산, 신메뉴 출시로 고객 만족도 상승",
      "모멘텀파운데이션, 우수 협력업체 시상식 개최",
      "FM/아웃소싱 부문 서비스 품질 개선 성과",
      "모멘텀파운데이션, 직원 복지 제도 확대",
      "청년축산, 가맹점주 교육 프로그램 강화",
      "모멘텀파운데이션, 디지털 전환 프로젝트 완료",
      "식자재 품질 관리 시스템 고도화 완료",
      "모멘텀파운데이션, 업계 최우수 기업상 수상",
      "청년축산, 고객 서비스 혁신 프로그램 도입",
      "모멘텀파운데이션, 신규 물류센터 준공",
      "FM 서비스 부문 고객 만족도 1위 달성",
      "모멘텀파운데이션, 사회공헌 활동 확대",
      "청년축산, 건강한 식단 캠페인 시작",
      "모멘텀파운데이션, 스마트 오피스 구축 완료",
      "식자재 공급망 최적화 프로젝트 성공",
      "모멘텀파운데이션, 글로벌 진출 계획 수립",
      "청년축산, 프리미엄 브랜드 라인 출시",
      "모멘텀파운데이션, 지속가능경영 보고서 발간",
      "FM 서비스 신기술 도입으로 효율성 증대",
      "모멘텀파운데이션, 창립 기념 감사 이벤트"
    ];

    for (let i = 0; i < 25; i++) {
      testPosts.push({
        id: Date.now() + 25 + i,
        title: companyTitles[i],
        content: companyTitles[i] + "에 대한 상세 보도 내용입니다. 자세한 사항은 관련 부서에 문의하시기 바랍니다.",
        category: i % 3 === 0 ? "언론보도" : i % 3 === 1 ? "사업·성과" : "사회공헌",
        type: "company",
        date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        views: Math.floor(Math.random() * 200),
        images: [],
        imageDescriptions: [],
        attachmentFile: "",
        attachmentFileName: ""
      });
    }

    // 채용공고 테스트 데이터 25개
    const jobTitles = [
      "경영관리본부 신입사원 모집",
      "식자재사업본부 영업담당자 채용",
      "프랜차이즈사업본부 매니저 모집",
      "FM/아웃소싱사업본부 현장관리자 채용",
      "마케팅팀 디지털 마케터 모집",
      "인사팀 HR 전문가 채용",
      "재무팀 회계담당자 모집",
      "구매팀 바이어 채용",
      "품질관리팀 QA 담당자 모집",
      "물류팀 물류관리자 채용",
      "IT팀 시스템 개발자 모집",
      "고객서비스팀 CS 담당자 채용",
      "기획팀 사업기획자 모집",
      "영업팀 지역 영업소장 채용",
      "생산관리팀 생산관리자 모집",
      "연구개발팀 R&D 연구원 채용",
      "법무팀 법무담당자 모집",
      "총무팀 총무담당자 채용",
      "교육팀 교육기획자 모집",
      "안전관리팀 안전관리자 채용",
      "환경관리팀 환경담당자 모집",
      "해외사업팀 해외영업 담당자 채용",
      "전략기획팀 전략기획자 모집",
      "브랜드팀 브랜드 매니저 채용",
      "데이터분석팀 데이터 분석가 모집"
    ];

for (let i = 0; i < 25; i++) {
      // 다양한 상태 설정: 진행중, 마감, 상시채용
      let jobStatus: "채용중" | "채용마감" | "상시채용";
      if (i % 4 === 0) {
        jobStatus = "채용마감"; // 25% 마감
      } else if (i % 4 === 1) {
        jobStatus = "상시채용"; // 25% 상시채용
      } else {
        jobStatus = "채용중"; // 50% 진행중
      }
      
      testPosts.push({
        id: Date.now() + 50 + i,
        title: jobTitles[i],
        content: jobTitles[i] + " 공고입니다. 자격요건과 우대사항을 확인하시고 지원해주시기 바랍니다.",
        category: i % 3 === 0 ? "신입채용" : i % 3 === 1 ? "경력채용" : "인턴채용",
        type: "jobs",
        date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        views: Math.floor(Math.random() * 150),
        department: "미지정",
        location: "미지정",
        jobType: "정규직",
        experience: "신입·경력 무관",
        deadline: "2025-12-31",
        status: jobStatus,
        images: [],
        imageDescriptions: [],
        attachmentFile: "",
        attachmentFileName: ""
      });
    }

    // 기존 데이터와 합치기
    const updatedPosts = [...testPosts, ...posts];
    setPosts(updatedPosts);
    localStorage.setItem("admin_posts", JSON.stringify(updatedPosts));

    // 각 타입별로 분리하여 저장
    const noticeData = updatedPosts.filter(post => post.type === "notice");
    const companyData = updatedPosts.filter(post => post.type === "company");
    const jobsData = updatedPosts.filter(post => post.type === "jobs");

    localStorage.setItem("notice_posts", JSON.stringify(noticeData));
    localStorage.setItem("company_posts", JSON.stringify(companyData));
    localStorage.setItem("jobs_posts", JSON.stringify(jobsData));

    // storage 이벤트 트리거
    window.dispatchEvent(new Event('storage'));

    console.log('Test data generated:', {
      total: updatedPosts.length,
      notices: noticeData.length,
      company: companyData.length,
      jobs: jobsData.length
    });

    toast({
      title: "테스트 데이터 생성 완료",
      description: "75개의 테스트 게시글이 생성되었습니다.",
});
  };
  
  // 저장 공간 정리 기능
  const clearStorageSpace = () => {
if (confirm("저장 공간 정리를 위해 첫부파일이 있는 오래된 게시글들을 삭제하시겠습니까?")) {
      const cleanPosts = posts.map(post => ({
        ...post,
        attachmentFile: "",
        attachmentFileName: ""
      }));
      
      setPosts(cleanPosts);
      localStorage.setItem("admin_posts", JSON.stringify(cleanPosts));
      
      // 각 타입별로 분리하여 저장
      const noticeData = cleanPosts.filter(post => post.type === "notice");
      const companyData = cleanPosts.filter(post => post.type === "company");
      const jobsData = cleanPosts.filter(post => post.type === "jobs");
      
      localStorage.setItem("notice_posts", JSON.stringify(noticeData));
      localStorage.setItem("company_posts", JSON.stringify(companyData));
      localStorage.setItem("jobs_posts", JSON.stringify(jobsData));
      
      // 이벤트 발생
      window.dispatchEvent(new Event('storage'));
      
      toast({
        title: "정리 완료",
description: "모든 게시글의 첫부파일이 삭제되어 저장 공간이 확보되었습니다.",
      });
    }
  };

  const handleApplicationStatusChange = (applicationId: string, newStatus: string) => {
    const updatedApplications = applications.map(app =>
      app.applicationNumber === applicationId ? { ...app, status: newStatus } : app
    );
    setApplications(updatedApplications);
    localStorage.setItem("job_applications", JSON.stringify(updatedApplications));
    window.dispatchEvent(new Event('storage'));
  };

  const handleDeleteApplication = (applicationId: string) => {
    if (confirm("정말로 이 지원서를 삭제하시겠습니까?")) {
      const updatedApplications = applications.filter(app => app.applicationNumber !== applicationId);
      setApplications(updatedApplications);
      localStorage.setItem("job_applications", JSON.stringify(updatedApplications));
      window.dispatchEvent(new Event('storage'));
    }
  };

  const handleInquiryStatusChange = (inquiryId: string, newStatus: string) => {
    const updatedInquiries = inquiries.map(inquiry =>
      inquiry.inquiryNumber === inquiryId ? { ...inquiry, status: newStatus } : inquiry
    );
    setInquiries(updatedInquiries);
    localStorage.setItem("inquiries", JSON.stringify(updatedInquiries));
    window.dispatchEvent(new Event('storage'));
  };

  const handleDeleteInquiry = (inquiryId: string) => {
    if (confirm("정말로 이 문의를 삭제하시겠습니까?")) {
      const updatedInquiries = inquiries.filter(inquiry => inquiry.inquiryNumber !== inquiryId);
      setInquiries(updatedInquiries);
      localStorage.setItem("inquiries", JSON.stringify(updatedInquiries));
      window.dispatchEvent(new Event('storage'));
    }
  };

  // 로그인하지 않은 경우
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">관리자 로그인</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Input
                  type="text"
                  placeholder="사용자명"
                  value={loginForm.username}
                  onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                  required
                />
              </div>
              <div>
                <Input
                  type="password"
                  placeholder="비밀번호"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
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

  // 비밀번호 변경 화면
  if (showPasswordChange) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">비밀번호 변경</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <Input
                  type="password"
                  placeholder="현재 비밀번호"
                  value={passwordChangeForm.currentPassword}
                  onChange={(e) => setPasswordChangeForm({ ...passwordChangeForm, currentPassword: e.target.value })}
                  required
                />
              </div>
              <div>
                <Input
                  type="password"
                  placeholder="새 비밀번호"
                  value={passwordChangeForm.newPassword}
                  onChange={(e) => setPasswordChangeForm({ ...passwordChangeForm, newPassword: e.target.value })}
                  required
                />
              </div>
              <div>
                <Input
                  type="password"
                  placeholder="새 비밀번호 확인"
                  value={passwordChangeForm.confirmPassword}
                  onChange={(e) => setPasswordChangeForm({ ...passwordChangeForm, confirmPassword: e.target.value })}
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

  const filteredPosts = posts.filter(post => post.type === activeTab);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">관리자 페이지</h1>
<div className="flex gap-2">
<Button onClick={generateTestData} variant="outline">
              테스트 데이터 생성
            </Button>
            
            <Button 
              onClick={() => {
                if (confirm("모든 데이터를 완전히 삭제하고 초기화하시겠습니까?")) {
                  // localStorage 완전 초기화
                  localStorage.clear();
                  
                  // 상태 초기화
                  setPosts([]);
                  setApplications([]);
                  setInquiries([]);
                  
                  toast({
                    title: "초기화 완료",
                    description: "모든 데이터가 삭제되고 저장 공간이 완전히 초기화되었습니다.",
                  });
                  
                  // 이벤트 발생
                  window.dispatchEvent(new Event('storage'));
                }
              }}
              variant="destructive"
            >
              완전 초기화
            </Button>

            <Button onClick={() => setShowPasswordChange(true)} variant="outline">
              비밀번호 변경
            </Button>
            <Button 
              onClick={() => {
                setIsAuthenticated(false);
                sessionStorage.removeItem("admin_authenticated");
              }}
              variant="destructive"
            >
              로그아웃
            </Button>
          </div>
        </div>

        {/* 탭 메뉴 */}
        <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
          <Button
            variant={activeTab === "notice" ? "default" : "ghost"}
            onClick={() => setActiveTab("notice")}
            className="flex-1"
          >
            공지사항 관리
          </Button>
          <Button
            variant={activeTab === "company" ? "default" : "ghost"}
            onClick={() => setActiveTab("company")}
            className="flex-1"
          >
            회사소식 관리
          </Button>
          <Button
            variant={activeTab === "jobs" ? "default" : "ghost"}
            onClick={() => setActiveTab("jobs")}
            className="flex-1"
          >
            채용공고 관리
          </Button>
          <Button
            variant={activeTab === "applications" ? "default" : "ghost"}
            onClick={() => setActiveTab("applications")}
            className="flex-1"
          >
            입사지원 관리
          </Button>
          <Button
            variant={activeTab === "inquiries" ? "default" : "ghost"}
            onClick={() => setActiveTab("inquiries")}
            className="flex-1"
          >
            온라인문의 관리
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 게시글 작성/수정 폼 */}
          {(activeTab === "notice" || activeTab === "company" || activeTab === "jobs") && (
            <Card>
              <CardHeader>
                <CardTitle>
                  {isEditing ? "게시글 수정" : "새 게시글 작성"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">제목</label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="제목을 입력하세요"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">카테고리</label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="카테고리 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      {activeTab === "notice" && (
                        <>
<SelectItem value="주요 공지">주요 공지</SelectItem>
                          <SelectItem value="시스템·정책">시스템·정책</SelectItem>
                          <SelectItem value="참여·이벤트">참여·이벤트</SelectItem>
                        </>
                      )}
                      {activeTab === "company" && (
                        <>
<SelectItem value="언론보도">언론보도</SelectItem>
                          <SelectItem value="사업·성과">사업·성과</SelectItem>
                          <SelectItem value="사회공헌">사회공헌</SelectItem>
                        </>
                      )}
                      {activeTab === "jobs" && (
                        <>
                          <SelectItem value="신입채용">신입채용</SelectItem>
                          <SelectItem value="경력채용">경력채용</SelectItem>
                          <SelectItem value="인턴채용">인턴채용</SelectItem>
                        </>
                      )}
</SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">게시일자</label>
                  <Input
                    type="date"
                    value={formData.publishDate}
                    onChange={(e) => setFormData({ ...formData, publishDate: e.target.value })}
                  />
                </div>

                {activeTab === "jobs" && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">부서명</label>
                        <Input
                          value={formData.department}
                          onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                          placeholder="부서명"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">근무지</label>
                        <Input
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          placeholder="근무지"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">고용형태</label>
                        <Input
                          value={formData.jobType}
                          onChange={(e) => setFormData({ ...formData, jobType: e.target.value })}
                          placeholder="정규직, 계약직 등"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">경력</label>
                        <Input
                          value={formData.experience}
                          onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                          placeholder="신입, 경력 등"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">마감일</label>
                        <Input
                          type="date"
                          value={formData.deadline}
                          onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">채용 상태</label>
                        <Select value={formData.status} onValueChange={(value: "채용중" | "채용마감" | "상시채용") => setFormData({ ...formData, status: value })}>
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
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">첨부파일 (선택사항)</label>
                  <Input
                    type="file"
                    onChange={handleAttachmentUpload}
                    accept="*/*"
/>
<p className="text-xs text-gray-500 mt-1">업로드 용량 5MB 이내 | PDF 형식 권장</p>
                  <p className="text-xs text-blue-600 mt-1">전체 저장공간 사용량: {Math.round((JSON.stringify(localStorage).length / 1024 / 1024) * 100) / 100}MB (localStorage 한계: 약 5-10MB)</p>
                  {formData.attachmentFile && (
                    <div className="mt-2 p-2 bg-gray-100 rounded flex items-center justify-between">
                      <span className="text-sm text-gray-600">{formData.attachmentFileName}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={handleRemoveAttachment}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">내용</label>
                  <Textarea
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="내용을 입력하세요"
                    rows={8}
                  />
                </div>

                <div className="flex gap-2">
                  {isEditing ? (
                    <>
                      <Button onClick={handleUpdatePost} className="flex-1">
                        수정 완료
                      </Button>
                      <Button onClick={handleCancelEdit} variant="outline" className="flex-1">
                        취소
                      </Button>
                    </>
                  ) : (
                    <Button onClick={handleAddPost} className="w-full">
                      게시글 추가
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* 게시글 목록 */}
          {(activeTab === "notice" || activeTab === "company" || activeTab === "jobs") && (
            <Card>
              <CardHeader>
                <CardTitle>
                  {activeTab === "notice" && "공지사항 목록"}
                  {activeTab === "company" && "회사소식 목록"}
                  {activeTab === "jobs" && "채용공고 목록"}
                  <Badge variant="secondary" className="ml-2">
                    {filteredPosts.length}개
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {filteredPosts.map((post) => (
                    <div key={post.id} className="p-3 border rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-medium text-base whitespace-nowrap overflow-hidden text-ellipsis">
                            {post.title}
                          </h3>
                          <div className="flex items-center gap-2 mt-1 flex-wrap">
                            <Badge variant="secondary" className="whitespace-nowrap">
                              {post.category}
                            </Badge>
                            <span className="text-xs text-gray-500">{post.date}</span>
                            <span className="text-xs text-gray-500">조회 {post.views}</span>
                            {post.attachmentFile && (
                              <Badge variant="outline" className="text-xs">첨부</Badge>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-1 ml-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEditPost(post)}
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDeletePost(post.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {filteredPosts.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      게시글이 없습니다.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* 입사지원 관리 */}
          {activeTab === "applications" && (
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>
                  입사지원 관리
                  <Badge variant="secondary" className="ml-2">
                    {applications.length}개
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
<th className="px-3 py-2 text-left text-xs">접수번호</th>
                        <th className="px-3 py-2 text-left text-xs">이름</th>
                        <th className="px-3 py-2 text-left text-xs">접수일</th>
<th className="px-3 py-2 text-left text-xs">첫부파일</th>
                        <th className="px-3 py-2 text-left text-xs">상태</th>
                        <th className="px-3 py-2 text-left text-xs">관리</th>
                      </tr>
                    </thead>
                    <tbody>
                      {applications.map((app) => (
                        <tr key={app.applicationNumber} className="border-b">
<td className="px-3 py-2 text-xs">{app.applicationNumber}</td>
                          <td className="px-3 py-2 text-xs">{app.name}</td>
                          <td className="px-3 py-2 text-xs">{app.submissionDate}</td>
                          <td className="px-3 py-2 text-xs">
                            {(app.resumeFile || app.portfolioFile) ? (
                              <div className="space-y-1">
                                {app.resumeFile && (
                                  <a href={app.resumeFile} download className="block text-blue-600 hover:underline text-xs">
                                    이력서
                                  </a>
                                )}
                                {app.portfolioFile && (
                                  <a href={app.portfolioFile} download className="block text-blue-600 hover:underline text-xs">
                                    포트폴리오
                                  </a>
                                )}
                              </div>
                            ) : (
                              <span className="text-gray-400 text-xs">-</span>
                            )}
                          </td>
                          <td className="px-3 py-2">
                            <Select
                              value={app.status}
                              onValueChange={(value) => handleApplicationStatusChange(app.applicationNumber, value)}
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
                          <td className="px-3 py-2">
                            <div className="flex gap-1">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  const newWindow = window.open('', '_blank');
                                  if (newWindow) {
                                    newWindow.document.write(`
                                      <html>
                                        <head><title>입사지원서 상세</title></head>
                                        <body style="font-family: Arial, sans-serif; padding: 20px;">
                                          <h2>입사지원서 상세 정보</h2>
                                          <p><strong>접수번호:</strong> ${app.applicationNumber}</p>
                                          <p><strong>지원분야:</strong> ${app.division}</p>
                                          <p><strong>지원부서:</strong> ${app.department}</p>
                                          <p><strong>이름:</strong> ${app.name}</p>
                                          <p><strong>이메일:</strong> ${app.email}</p>
                                          <p><strong>전화번호:</strong> ${app.phone}</p>
<p><strong>생년월일:</strong> ${app.birthDate || app.idNumber}</p>
                                          <p><strong>주소:</strong> ${app.address}</p>
                                          <p><strong>학력:</strong> ${app.education}</p>
                                          <p><strong>경력:</strong> ${app.experience}</p>
                                          <p><strong>지원동기:</strong></p>
                                          <div style="border: 1px solid #ccc; padding: 10px; white-space: pre-wrap;">${app.motivation}</div>
<p><strong>접수일:</strong> ${app.appliedDate || app.submissionDate || '미지정'}</p>
                                          <p><strong>상태:</strong> ${app.status}</p>
                                        </body>
                                      </html>
                                    `);
                                  }
                                }}
                              >
                                <Eye className="h-3 w-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleDeleteApplication(app.applicationNumber)}
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {applications.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      입사지원이 없습니다.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* 온라인문의 관리 */}
          {activeTab === "inquiries" && (
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>
                  온라인문의 관리
                  <Badge variant="secondary" className="ml-2">
                    {inquiries.length}개
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="px-3 py-2 text-left text-xs">문의번호</th>
                        <th className="px-3 py-2 text-left text-xs">이름</th>
                        <th className="px-3 py-2 text-left text-xs">문의일</th>
                        <th className="px-3 py-2 text-left text-xs">상태</th>
                        <th className="px-3 py-2 text-left text-xs">관리</th>
                      </tr>
                    </thead>
                    <tbody>
                      {inquiries.map((inquiry) => (
                        <tr key={inquiry.inquiryNumber} className="border-b">
                          <td className="px-3 py-2 text-xs">{inquiry.inquiryNumber}</td>
                          <td className="px-3 py-2 text-xs">{inquiry.name}</td>
                          <td className="px-3 py-2 text-xs">{inquiry.submissionDate}</td>
                          <td className="px-3 py-2">
                            <Select
                              value={inquiry.status}
                              onValueChange={(value) => handleInquiryStatusChange(inquiry.inquiryNumber, value)}
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
                          <td className="px-3 py-2">
                            <div className="flex gap-1">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  const newWindow = window.open('', '_blank');
                                  if (newWindow) {
                                    newWindow.document.write(`
                                      <html>
                                        <head><title>온라인문의 상세</title></head>
                                        <body style="font-family: Arial, sans-serif; padding: 20px;">
                                          <h2>온라인문의 상세 정보</h2>
                                          <p><strong>문의번호:</strong> ${inquiry.inquiryNumber}</p>
                                          <p><strong>문의유형:</strong> ${inquiry.type}</p>
                                          <p><strong>이름:</strong> ${inquiry.name}</p>
                                          <p><strong>이메일:</strong> ${inquiry.email}</p>
                                          <p><strong>전화번호:</strong> ${inquiry.phone}</p>
                                          <p><strong>제목:</strong> ${inquiry.subject}</p>
                                          <p><strong>문의내용:</strong></p>
                                          <div style="border: 1px solid #ccc; padding: 10px; white-space: pre-wrap;">${inquiry.message}</div>
                                          <p><strong>문의일:</strong> ${inquiry.submissionDate}</p>
                                          <p><strong>상태:</strong> ${inquiry.status}</p>
                                        </body>
                                      </html>
                                    `);
                                  }
                                }}
                              >
                                <Eye className="h-3 w-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleDeleteInquiry(inquiry.inquiryNumber)}
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {inquiries.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      온라인문의가 없습니다.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;