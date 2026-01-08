import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Edit, Trash2, Eye, Save, X, LogOut, Key, Image as ImageIcon, Image, Paperclip } from "lucide-react";
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

  // 여러 첨부파일 업로드 핸들러
  const handleAttachmentUpload = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
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
      
      newFiles[index] = base64String;
      newNames[index] = file.name;
      
      setFormData({ 
        ...formData, 
        attachmentFiles: newFiles,
        attachmentFileNames: newNames
      });
    };
    reader.readAsDataURL(file);
  };

  // 첨부파일 삭제
  const handleRemoveAttachment = (index: number) => {
    const newFiles = [...formData.attachmentFiles];
    const newNames = [...formData.attachmentFileNames];
    
    newFiles[index] = "";
    newNames[index] = "";
    
    setFormData({ 
      ...formData, 
      attachmentFiles: newFiles,
      attachmentFileNames: newNames
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">관리자 페이지</h1>
        </div>

        {/* 첨부파일 업로드 UI */}
        <div className="space-y-4">
          <label className="block text-sm font-bold mb-2">첨부파일 (최대 3개)</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[0, 1, 2].map((index) => (
              <div key={index} className="space-y-2">
                <label className="block text-xs text-gray-600">첨부파일 {index + 1}</label>
                <Input
                  type="file"
                  onChange={(e) => handleAttachmentUpload(e, index)}
                  className="cursor-pointer"
                />
                {formData.attachmentFileNames[index] && (
                  <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                    <Paperclip className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-700 flex-1 truncate">
                      {formData.attachmentFileNames[index]}
                    </span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveAttachment(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500">
            * 각 첨부파일은 최대 10MB까지 업로드 가능합니다.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminPanel;