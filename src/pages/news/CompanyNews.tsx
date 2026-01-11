import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, Paperclip, ChevronRight, Building2, Calendar, Eye, Sparkles, ArrowRight, Newspaper, TrendingUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface NewsPost {
  id: number;
  title: string;
  content: string;
  category: string;
  type?: string;
  date: string;
  views: number;
  images?: string[];
  imageDescriptions?: string[];
  attachmentFile?: string;
  attachmentFileName?: string;
}

const CompanyNews = () => {
  const { t, language } = useLanguage();

  const getDefaultCompanyNews = (): NewsPost[] => [
    {
      id: 1,
      title: t('news.company.empty.title'),
      content: t('news.company.empty.content'),
      category: t('news.company.empty.category'),
      type: "company",
      date: new Date().toISOString().split('T')[0],
      views: 0
    }
  ];
  const [news, setNews] = useState<NewsPost[]>([]);
  const [selectedNews, setSelectedNews] = useState<NewsPost | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);
  const itemsPerPage = 9;

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => setIsLoaded(true), 100);

    // localStorage에서 회사소식 불러오기
    const savedPosts = localStorage.getItem("company_posts");

    if (savedPosts) {
      try {
        const posts = JSON.parse(savedPosts);
        if (posts.length > 0) {
          setNews(posts.sort((a: NewsPost, b: NewsPost) => new Date(b.date).getTime() - new Date(a.date).getTime()));
        } else {
          setNews(getDefaultCompanyNews());
        }
      } catch (error) {
        console.error("Failed to parse notice posts:", error);
        setNews(getDefaultCompanyNews());
      }
    } else {
      setNews(getDefaultCompanyNews());
    }

    // localStorage에서 선택된 게시글 ID 확인
    const selectedPostId = localStorage.getItem("selectedCompanyNewsId");
    if (selectedPostId && savedPosts) {
      try {
        const posts = JSON.parse(savedPosts);
        const selectedPost = posts.find((post: NewsPost) => post.id.toString() === selectedPostId);
        if (selectedPost) {
          const updatedPosts = posts.map((post: NewsPost) =>
            post.id === selectedPost.id ? { ...post, views: post.views + 1 } : post
          );
          localStorage.setItem("company_posts", JSON.stringify(updatedPosts));
          setNews(updatedPosts.sort((a: NewsPost, b: NewsPost) => new Date(b.date).getTime() - new Date(a.date).getTime()));
          setSelectedNews({ ...selectedPost, views: selectedPost.views + 1 });
          localStorage.removeItem("selectedCompanyNewsId");
        }
      } catch (error) {
        console.error("Failed to process selected post:", error);
      }
    }

    // localStorage 변경 감지
    const handleStorageChange = () => {
      const savedPosts = localStorage.getItem("company_posts");
      if (savedPosts) {
        try {
          const posts = JSON.parse(savedPosts);
          if (posts.length > 0) {
            setNews(posts.sort((a: NewsPost, b: NewsPost) => new Date(b.date).getTime() - new Date(a.date).getTime()));
          } else {
            setNews(getDefaultCompanyNews());
          }
        } catch (error) {
          console.error("Failed to parse notice posts:", error);
          setNews(getDefaultCompanyNews());
        }
      } else {
        setNews(getDefaultCompanyNews());
      }
    };

    window.addEventListener('storage', handleStorageChange);
    const interval = setInterval(handleStorageChange, 1000);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [language]);

  const handleNewsClick = (newsItem: NewsPost) => {
    const updatedNews = news.map(n =>
      n.id === newsItem.id ? { ...n, views: n.views + 1 } : n
    );
    setNews(updatedNews);
    localStorage.setItem("company_posts", JSON.stringify(updatedNews));
    setSelectedNews({ ...newsItem, views: newsItem.views + 1 });
  };

  const handleBackToList = () => {
    setSelectedNews(null);
  };

  // 페이지네이션 계산
  const totalPages = Math.ceil(news.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentNews = news.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 상세 보기
  if (selectedNews) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Navigation />

        {/* Premium Hero Section - Detail View */}
        <section className="relative bg-gradient-to-br from-gray-900 via-emerald-900 to-gray-900 text-white py-24 overflow-hidden">
          {/* Floating Orbs */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-10 left-[10%] w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-10 right-[15%] w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>

          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:60px_60px]"></div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="flex items-center gap-2 text-emerald-400 mb-4">
                <span className="w-8 h-px bg-emerald-400"></span>
                <span className="text-sm font-medium tracking-wider uppercase">Company News</span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold mb-4">{t('news.company.title')}</h1>
              <p className="text-xl text-gray-300 max-w-2xl">
                {t('news.company.subtitle')}
              </p>
            </div>
          </div>
        </section>

        {/* Detail Content */}
        <section className="flex-grow py-16 bg-gradient-to-b from-gray-50 to-white">
          <div className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Button
              variant="outline"
              onClick={handleBackToList}
              className="mb-8 border-emerald-300 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-400 transition-all duration-300 group rounded-full px-6"
            >
              <ChevronLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
              {t('news.backToList')}
            </Button>

            <article className="bg-white rounded-3xl shadow-2xl shadow-emerald-500/10 overflow-hidden border border-gray-100">
              {/* Article Header */}
              <div className="bg-gradient-to-r from-emerald-500 to-cyan-500 h-2"></div>
              <div className="p-8 lg:p-12 border-b border-gray-100">
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <Badge className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white border-0 shadow-lg shadow-emerald-500/30 px-4 py-1.5 text-sm">
                    {selectedNews.category}
                  </Badge>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      {selectedNews.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Eye className="w-4 h-4" />
                      {selectedNews.views}
                    </span>
                  </div>
                </div>
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                  {selectedNews.title}
                </h1>
              </div>

              {/* Article Content */}
              <div className="p-8 lg:p-12">
                <div className="prose prose-lg max-w-none">
                  <div className="whitespace-pre-wrap text-gray-700 leading-relaxed text-lg">
                    {selectedNews.content}
                  </div>
                </div>

                {selectedNews.attachmentFile && (
                  <div className="mt-12 pt-8 border-t border-gray-100">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-gray-800">
                      <Paperclip className="w-5 h-5 text-emerald-500" />
                      {t('news.attachment')}
                    </h3>
                    <a
                      href={selectedNews.attachmentFile}
                      download={selectedNews.attachmentFileName || t('news.attachment')}
                      className="inline-flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-gray-50 to-emerald-50 hover:from-emerald-50 hover:to-emerald-100 rounded-2xl transition-all duration-300 group border border-emerald-200 hover:border-emerald-300"
                    >
                      <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
                        <Paperclip className="h-5 w-5 text-emerald-600" />
                      </div>
                      <span className="text-gray-700 font-medium">{selectedNews.attachmentFileName || t('news.attachment')}</span>
                    </a>
                  </div>
                )}
              </div>
            </article>
          </div>
        </section>

        <Footer />
      </div>
    );
  }

  // 목록 보기 - Card Layout
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navigation />

      {/* Ultra Premium Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
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
          <div className="absolute bottom-20 left-[30%] w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:60px_60px]"></div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className={`text-center transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            {/* Premium Badge */}
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl mb-10">
              <Newspaper className="w-5 h-5 text-emerald-400" />
              <span className="text-emerald-300 text-sm font-medium tracking-wider uppercase">Company News</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-black text-white mb-6 tracking-tight">
              <span className="bg-gradient-to-r from-white via-emerald-100 to-emerald-300 bg-clip-text text-transparent">
                {t('news.company.title')}
              </span>
            </h1>

            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              {t('news.company.hero.desc')}
            </p>

            {/* Stats */}
            <div className="flex justify-center gap-8 mt-12">
              <div className="text-center px-6 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="text-3xl font-bold text-emerald-400">{news.length}</div>
                <div className="text-gray-400 text-sm">{t('news.totalNews')}</div>
              </div>
              <div className="text-center px-6 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="text-3xl font-bold text-cyan-400">
                  <TrendingUp className="w-8 h-8 mx-auto" />
                </div>
                <div className="text-gray-400 text-sm">{t('news.growing')}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* News Cards Grid */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-100/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-100/30 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className={`flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-12 transition-all duration-700 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-semibold mb-4">
                <Sparkles className="w-4 h-4" />
                Latest Updates
              </span>
              <h2 className="text-3xl font-bold text-gray-900">{t('news.latestNews')}</h2>
            </div>
            <div className="text-gray-500">
              {t('news.total')} <span className="text-emerald-600 font-bold">{news.length}</span>{t('news.count')}
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentNews.map((newsItem, index) => (
              <div
                key={newsItem.id}
                onClick={() => handleNewsClick(newsItem)}
                className={`group cursor-pointer transform transition-all duration-500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                style={{ transitionDelay: `${300 + index * 100}ms` }}
              >
                <div className="relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-500 border border-gray-100 hover:border-emerald-200 h-full flex flex-col">
                  {/* Card Top Gradient */}
                  <div className="h-2 bg-gradient-to-r from-emerald-500 via-emerald-400 to-cyan-500"></div>

                  {/* Card Content */}
                  <div className="p-8 flex-1 flex flex-col">
                    {/* Category & Date */}
                    <div className="flex items-center justify-between mb-4">
                      <Badge className="bg-emerald-100 text-emerald-700 border-0 font-medium px-3 py-1">
                        {newsItem.category}
                      </Badge>
                      <span className="text-sm text-gray-400 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {newsItem.date}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-emerald-700 transition-colors line-clamp-2 flex-grow">
                      {newsItem.title}
                    </h3>

                    {/* Preview Text */}
                    <p className="text-gray-500 text-sm line-clamp-2 mb-6">
                      {newsItem.content}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {newsItem.views}
                        </span>
                        {newsItem.attachmentFile && (
                          <span className="flex items-center gap-1 text-emerald-500">
                            <Paperclip className="w-4 h-4" />
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-emerald-600 font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                        <span>{t('news.viewDetails')}</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>

                  {/* Hover Effect Line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-16 gap-2">
              {currentPage > 1 && (
                <Button
                  variant="outline"
                  onClick={() => handlePageChange(currentPage - 1)}
                  className="rounded-full border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-400"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              )}

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  onClick={() => handlePageChange(page)}
                  className={`rounded-full min-w-[40px] ${
                    currentPage === page
                      ? "bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 shadow-lg shadow-emerald-500/30"
                      : "border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-400"
                  }`}
                >
                  {page}
                </Button>
              ))}

              {currentPage < totalPages && (
                <Button
                  variant="outline"
                  onClick={() => handlePageChange(currentPage + 1)}
                  className="rounded-full border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-400"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CompanyNews;
