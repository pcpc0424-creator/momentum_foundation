import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, Newspaper } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Post {
  id: number;
  title: string;
  content: string;
  category: string;
  date: string;
  views: number;
  images?: string[];
  imageDescriptions?: string[];
}

const News = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"notice" | "company">("notice");
  const [notices, setNotices] = useState<Post[]>([]);
  const [companyNews, setCompanyNews] = useState<Post[]>([]);

  useEffect(() => {
    // localStorage에서 공지사항 불러오기
    const savedNotices = localStorage.getItem("notice_posts");
    if (savedNotices) {
      try {
        const posts = JSON.parse(savedNotices);
        setNotices(posts.length > 0 ? posts : getDefaultNotices());
      } catch (error) {
        console.error("Failed to load notices:", error);
        setNotices(getDefaultNotices());
      }
    } else {
      setNotices(getDefaultNotices());
    }

    // localStorage에서 회사소식 불러오기
    const savedCompanyNews = localStorage.getItem("company_posts");
    if (savedCompanyNews) {
      try {
        const posts = JSON.parse(savedCompanyNews);
        setCompanyNews(posts.length > 0 ? posts : getDefaultCompanyNews());
      } catch (error) {
        console.error("Failed to load company news:", error);
        setCompanyNews(getDefaultCompanyNews());
      }
    } else {
      setCompanyNews(getDefaultCompanyNews());
    }
  }, []);

  // localStorage 변경 감지 (관리자 페이지에서 수정 시 자동 업데이트)
  useEffect(() => {
    const handleStorageChange = () => {
      const savedNotices = localStorage.getItem("notice_posts");
      if (savedNotices) {
        try {
          const posts = JSON.parse(savedNotices);
          setNotices(posts.length > 0 ? posts : getDefaultNotices());
        } catch (error) {
          console.error("Failed to reload notices:", error);
        }
      }

      const savedCompanyNews = localStorage.getItem("company_posts");
      if (savedCompanyNews) {
        try {
          const posts = JSON.parse(savedCompanyNews);
          setCompanyNews(posts.length > 0 ? posts : getDefaultCompanyNews());
        } catch (error) {
          console.error("Failed to reload company news:", error);
        }
      }
    };

    // storage 이벤트 리스너 (다른 탭에서 변경 시)
    window.addEventListener('storage', handleStorageChange);
    
    // 같은 탭에서 변경 감지를 위한 interval
    const interval = setInterval(() => {
      handleStorageChange();
    }, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const getDefaultNotices = (): Post[] => [
    {
      id: 1,
      title: "2025년 신규 사업 확장 계획 안내",
      content: "육류 가공 공장 설립 및 신규 유통 채널 확대에 대한 공지입니다.",
      category: "중요공지",
      date: "2024-12-15",
      views: 245
    },
    {
      id: 2,
      title: "품질관리 시스템 업그레이드 완료",
      content: "더욱 안전하고 신뢰할 수 있는 제품 공급을 위한 시스템 개선이 완료되었습니다.",
      category: "시스템",
      date: "2024-12-10",
      views: 189
    },
    {
      id: 3,
      title: "연말연시 배송 일정 안내",
      content: "연말연시 기간 중 배송 일정 변경 사항을 안내드립니다.",
      category: "배송공지",
      date: "2024-12-05",
      views: 156
    }
  ];

  const getDefaultCompanyNews = (): Post[] => [
    {
      id: 1,
      title: "프라임코어 창립 12주년 기념행사",
      content: "창립 12주년을 맞아 임직원 대상 기념행사를 개최합니다.",
      category: "행사소식",
      date: "2024-12-10",
      views: 189
    },
    {
      id: 2,
      title: "신규 유통센터 오픈",
      content: "경기도 이천에 최첨단 유통센터가 새롭게 문을 열었습니다.",
      category: "사업확장",
      date: "2024-12-01",
      views: 234
    }
  ];

  const handleRowClick = (post: Post, type: "notice" | "company") => {
    // 선택된 게시글 ID를 localStorage에 저장
    localStorage.setItem("selectedPostId", post.id.toString());
    
    if (type === "notice") {
      navigate("/news/notice");
    } else {
      navigate("/news/company");
    }
  };

  const currentPosts = activeTab === "notice" ? notices : companyNews;

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      {/* Hero Section */}
<section className="bg-dusty-blue text-gray-800 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center ml-4 md:ml-16">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mr-2 sm:mr-4">
{t('news.title')}
            </h1>
            <span className="text-gray-400 mx-3 text-2xl hidden md:inline">|</span>
            <span className="text-sm lg:text-base text-gray-700 font-medium hidden md:inline">
{t('news.subtitle')}
            </span>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
<section className="bg-dusty-blue border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-4 py-4">
            <Button
              variant={activeTab === "notice" ? "default" : "outline"}
              onClick={() => setActiveTab("notice")}
              className="flex items-center gap-2"
            >
              <Bell className="h-4 w-4" />
{t('news.notice.tab')}
            </Button>
            <Button
              variant={activeTab === "company" ? "default" : "outline"}
              onClick={() => setActiveTab("company")}
              className="flex items-center gap-2"
            >
              <Newspaper className="h-4 w-4" />
{t('news.company.tab')}
            </Button>
          </div>
        </div>
      </section>

      {/* Board List */}
<section className="flex-grow py-20 bg-cool-grey">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-20">
                    {t('news.table.no')}
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">
                    {t('news.table.category')}
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('news.table.title')}
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">
                    {t('news.table.date')}
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">
                    {t('news.table.views')}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentPosts.map((post, index) => (
                  <tr 
                    key={post.id}
                    onClick={() => handleRowClick(post, activeTab)}
                    className="hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {currentPosts.length - index}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant="secondary">{post.category}</Badge>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      <div className="flex items-center gap-2">
                        {post.images && post.images.length > 0 && (
                          activeTab === "notice" 
                            ? <Bell className="h-4 w-4 text-sage-green" />
                            : <Newspaper className="h-4 w-4 text-sage-green" />
                        )}
                        {post.title}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {post.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {post.views}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 상세보기 안내 */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              {activeTab === "notice" ? t('news.notice.hint') : t('news.company.hint')}
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default News;
