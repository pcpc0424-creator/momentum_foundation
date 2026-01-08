import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, Paperclip, ChevronRight } from "lucide-react";

interface NewsPost {
  id: number;
  title: string;
  content: string;
  category: string;
  date: string;
  views: number;
  images?: string[];
  imageDescriptions?: string[];
  attachmentFiles?: string[];
  attachmentFileNames?: string[];
}

const Notice = () => {
  const [news, setNotices] = useState<NewsPost[]>([]);
  const [selectedNews, setSelectedNotice] = useState<NewsPost | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    // localStorage에서 회사소식 불러오기
    const savedPosts = localStorage.getItem("company_posts");
    if (savedPosts) {
      try {
        const posts = JSON.parse(savedPosts);
        setNotices(posts.sort((a: NewsPost, b: NewsPost) => new Date(b.date).getTime() - new Date(a.date).getTime()));
      } catch (error) {
        console.error("Failed to parse notice posts:", error);
      }
    }

    // localStorage에서 선택된 게시글 ID 확인
    const selectedPostId = localStorage.getItem("selectedPostId");
    if (selectedPostId && savedPosts) {
      try {
        const posts = JSON.parse(savedPosts);
        const selectedPost = posts.find((post: NewsPost) => post.id.toString() === selectedPostId);
        if (selectedPost) {
          // 조회수 증가
          const updatedPosts = posts.map((post: NewsPost) =>
            post.id === selectedPost.id ? { ...post, views: post.views + 1 } : post
          );
          localStorage.setItem("company_posts", JSON.stringify(updatedPosts));
          setNotices(updatedPosts.sort((a: NewsPost, b: NewsPost) => new Date(b.date).getTime() - new Date(a.date).getTime()));
          setSelectedNotice({ ...selectedPost, views: selectedPost.views + 1 });
          localStorage.removeItem("selectedPostId");
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
          setNotices(posts.sort((a: NewsPost, b: NewsPost) => new Date(b.date).getTime() - new Date(a.date).getTime()));
        } catch (error) {
          console.error("Failed to parse notice posts:", error);
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

  const handleNewsClick = (notice: NewsPost) => {
    // 조회수 증가
    const updatedNotices = news.map(n =>
      n.id === newsItem.id ? { ...n, views: n.views + 1 } : n
    );
    setNotices(updatedNotices);
    localStorage.setItem("company_posts", JSON.stringify(updatedNotices));
    
    setSelectedNotice({ ...newsItem, views: newsItem.views + 1 });
  };

  const handleBackToList = () => {
    setSelectedNotice(null);
  };

  // 페이지네이션 계산
  const totalPages = Math.ceil(news.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentNews = news.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const renderPagination = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // 이전 버튼
    if (currentPage > 1) {
      pages.push(
        <Button
          key="prev"
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(currentPage - 1)}
          className="mx-1"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      );
    }

    // 페이지 번호
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <Button
          key={i}
          variant={currentPage === i ? "default" : "outline"}
          size="sm"
          onClick={() => handlePageChange(i)}
          className="mx-1"
        >
          {i}
        </Button>
      );
    }

    // 다음 버튼
    if (currentPage < totalPages) {
      pages.push(
        <Button
          key="next"
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(currentPage + 1)}
          className="mx-1"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      );
    }

    return pages;
  };

  // 상세 보기
  if (selectedNews) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        
        <section className="bg-pastel-beige text-gray-800 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center ml-4 md:ml-16">
              <h1 className="text-2xl lg:text-3xl font-bold mr-4 whitespace-nowrap">
                회사소식
              </h1>
              <span className="text-gray-400 mx-3 text-2xl hidden md:inline">|</span>
              <span className="text-sm lg:text-base text-gray-700 font-medium hidden md:inline">
                모멘텀파운데이션의 중요한 회사소식을 확인하세요
              </span>
            </div>
          </div>
        </section>

        <section className="flex-grow py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Button 
              variant="outline" 
              onClick={handleBackToList}
              className="mb-6"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              목록으로
            </Button>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary">{selectedNews.category}</Badge>
                  <span className="text-sm text-gray-500">조회수: {selectedNews.views}</span>
                </div>
                <CardTitle className="text-2xl">{selectedNews.title}</CardTitle>
                <p className="text-gray-600">{selectedNews.date}</p>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                    {selectedNews.content}
                  </div>
                </div>

                {selectedNews.attachmentFiles && selectedNews.attachmentFiles.some(file => file) && (
                  <div className="mt-8 pt-6 border-t">
                    <h3 className="text-lg font-semibold mb-3">첨부파일</h3>
                    <div className="space-y-2">
                      {selectedNews.attachmentFiles.map((file, index) => (
                        file && (
                          <a
                            key={index}
                            href={file}
                            download={selectedNews.attachmentFileNames?.[index] || `첨부파일_${index + 1}`}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors mr-2 mb-2"
                          >
                            <Paperclip className="h-4 w-4" />
                            <span>{selectedNews.attachmentFileNames?.[index] || `첨부파일 ${index + 1}`}</span>
                          </a>
                        )
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </section>

        <Footer />
      </div>
    );
  }

  // 목록 보기
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <section className="bg-pastel-beige text-gray-800 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center ml-4 md:ml-16">
            <h1 className="text-2xl lg:text-3xl font-bold mr-4 whitespace-nowrap">
              회사소식
            </h1>
            <span className="text-gray-400 mx-3 text-2xl hidden md:inline">|</span>
            <span className="text-sm lg:text-base text-gray-700 font-medium hidden md:inline">
              모멘텀파운데이션의 중요한 회사소식을 확인하세요
            </span>
          </div>
        </div>
      </section>

      <section className="flex-grow py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow">
<table className="min-w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-300 bg-gray-50">
                  <th className="py-3 px-2 text-center text-sm font-semibold text-gray-700 w-16">
                    번호
                  </th>
                  <th className="py-3 px-3 text-center text-sm font-semibold text-gray-700 w-20">
                    구분
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                    제목
                  </th>
                  <th className="py-3 px-3 text-center text-sm font-semibold text-gray-700 w-24">
                    등록일
                  </th>
<th className="py-3 px-2 text-center text-sm font-semibold text-gray-700 w-12">
                    첨부
                  </th>
                  <th className="py-3 px-2 text-center text-sm font-semibold text-gray-700 w-16">
                    조회
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {currentNews.map((newsItem, index) => (
<tr 
                    key={newsItem.id}
                    onClick={() => handleNewsClick(newsItem)}
                    className="border-b border-gray-200 hover:bg-blue-50 cursor-pointer transition-colors"
                  >
                    <td className="py-3 px-2 text-center text-sm text-gray-600">
                      {news.length - (startIndex + index)}
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                        {newsItem.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-900 hover:text-blue-600">
                      <div className="flex items-center gap-1">
                        {newsItem.attachmentFiles && newsItem.attachmentFiles.some(file => file) && 
                          <Paperclip className="h-3 w-3 text-gray-400" />
                        }
                        <span className="truncate">{newsItem.title}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-center text-sm text-gray-500">
                      {newsItem.date}
                    </td>
<td className="py-3 px-2 text-center text-sm text-gray-500">
                      {newsItem.attachmentFiles && newsItem.attachmentFiles.some(file => file) ? 
                        <Paperclip className="h-3 w-3 mx-auto text-gray-400" /> : 
                        <span className="text-gray-300">-</span>
                      }
                    </td>
                    <td className="py-3 px-2 text-center text-sm text-gray-500">
                      {newsItem.views}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 페이지네이션 */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-8 space-x-2">
              {renderPagination()}
            </div>
          )}

          {/* 게시글 정보 */}
          <div className="mt-4 text-center text-sm text-gray-500">
            총 {news.length}개의 게시글 (페이지 {currentPage} / {totalPages})
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Notice;