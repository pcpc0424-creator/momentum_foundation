import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, Paperclip, ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface JobPost {
  id: number;
  title: string;
  content: string;
  category: string;
  type?: string;
  department: string;
  location: string;
  jobType: string;
  experience: string;
  deadline: string;
  date: string;
  views: number;
  status: "채용중" | "채용마감" | "상시채용";
  images?: string[];
  imageDescriptions?: string[];
attachmentFile?: string;
  attachmentFileName?: string;
}

const JobPostings = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<JobPost[]>([]);
const [selectedJob, setSelectedJob] = useState<JobPost | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [jobTypeFilter, setJobTypeFilter] = useState<string>("all");
  const itemsPerPage = 10;

  useEffect(() => {
const loadJobs = () => {
      console.log('Loading job posts from localStorage...');
      const savedPosts = localStorage.getItem("jobs_posts");
      console.log('Raw jobs_posts data:', savedPosts);
      
      if (savedPosts) {
        try {
          const posts = JSON.parse(savedPosts);
          setJobs(posts.sort((a: JobPost, b: JobPost) => new Date(b.date).getTime() - new Date(a.date).getTime()));
        } catch (error) {
          console.error("Failed to parse job posts:", error);
        }
      }
    };

    loadJobs();

    // localStorage에서 선택된 게시글 ID 확인
const selectedPostId = localStorage.getItem("selectedJobId");
    if (selectedPostId) {
      const savedPosts = localStorage.getItem("jobs_posts");
      if (savedPosts) {
        try {
          const posts = JSON.parse(savedPosts);
          const selectedPost = posts.find((post: JobPost) => post.id.toString() === selectedPostId);
          if (selectedPost) {
            // 조회수 증가
            const updatedPosts = posts.map((post: JobPost) =>
              post.id === selectedPost.id ? { ...post, views: post.views + 1 } : post
            );
            localStorage.setItem("jobs_posts", JSON.stringify(updatedPosts));
            setJobs(updatedPosts.sort((a: JobPost, b: JobPost) => new Date(b.date).getTime() - new Date(a.date).getTime()));
            setSelectedJob({ ...selectedPost, views: selectedPost.views + 1 });
localStorage.removeItem("selectedJobId");
          }
        } catch (error) {
          console.error("Failed to process selected post:", error);
        }
      }
    }

    // localStorage 변경 감지
    const handleStorageChange = () => {
      loadJobs();
    };

    window.addEventListener('storage', handleStorageChange);
    const interval = setInterval(handleStorageChange, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const handleJobClick = (job: JobPost) => {
    // 조회수 증가
    const updatedJobs = jobs.map(j =>
      j.id === job.id ? { ...j, views: j.views + 1 } : j
    );
    setJobs(updatedJobs);
    localStorage.setItem("jobs_posts", JSON.stringify(updatedJobs));
    
    setSelectedJob({ ...job, views: job.views + 1 });
  };

  const handleBackToList = () => {
    setSelectedJob(null);
  };

const handleApply = () => {
    if (selectedJob) {
      navigate('/careers/application', {
        state: { jobTitle: selectedJob.title }
      });
    }
  };

// 고용형태별 필터링
  const filteredJobs = jobTypeFilter === "all" 
    ? jobs 
    : jobs.filter(job => job.jobType === jobTypeFilter);

  // 페이지네이션 계산
  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
const currentJobs = filteredJobs.slice(startIndex, endIndex);

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
  if (selectedJob) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        
        <section className="bg-cool-grey text-gray-800 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center ml-4 md:ml-16">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mr-2 sm:mr-4">
                {t('careers.recruitment.title')}
              </h1>
              <span className="text-gray-400 mx-3 text-2xl hidden md:inline">|</span>
              <span className="text-sm lg:text-base text-gray-700 font-medium hidden md:inline">
                {t('careers.recruitment.subtitle')}
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
              {t('jobs.list')}
            </Button>

            <Card>
              <CardHeader>
<CardTitle className="text-2xl">{selectedJob.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                    {selectedJob.content}
                  </div>
                </div>

{selectedJob.attachmentFile && (
                  <div className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-semibold mb-4 text-gray-900">{t('jobs.attachment')}</h3>
                    <div className="space-y-2">
                      <Button
                        variant="outline"
                        onClick={() => {
                          const link = document.createElement('a');
                          link.href = selectedJob.attachmentFile!;
                          link.download = selectedJob.attachmentFileName || t('jobs.posting.file');
                          link.click();
                        }}
                        className="w-full justify-start mb-2"
                      >
                        <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        {selectedJob.attachmentFileName || t('jobs.posting')}
                      </Button>
                    </div>
                  </div>
                )}

                <div className="flex justify-center gap-4">
                  <Button
                    variant="outline"
                    onClick={handleBackToList}
                  >
                    {t('jobs.list')}
                  </Button>
                  {selectedJob.status !== "채용마감" && (
                    <Button onClick={handleApply}>
                      {t('jobs.apply')}
                    </Button>
                  )}
                </div>
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
      
      <section className="bg-cool-grey text-gray-800 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center ml-4 md:ml-16">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mr-2 sm:mr-4">
              {t('careers.recruitment.title')}
            </h1>
            <span className="text-gray-400 mx-3 text-2xl hidden md:inline">|</span>
            <span className="text-sm lg:text-base text-gray-700 font-medium hidden md:inline">
              {t('careers.recruitment.subtitle')}
            </span>
          </div>
        </div>
      </section>

      <section className="flex-grow py-20 bg-white">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Job type filter buttons */}
          <div className="mb-6 flex justify-center gap-2">
            <Button
              variant={jobTypeFilter === "all" ? "default" : "outline"}
              onClick={() => {
                setJobTypeFilter("all");
                setCurrentPage(1);
              }}
              size="sm"
            >
              {t('jobs.filter.all')}
            </Button>
            <Button
              variant={jobTypeFilter === "정규직" ? "default" : "outline"}
              onClick={() => {
                setJobTypeFilter("정규직");
                setCurrentPage(1);
              }}
              size="sm"
            >
              {t('jobs.filter.fulltime')}
            </Button>
            <Button
              variant={jobTypeFilter === "계약직" ? "default" : "outline"}
              onClick={() => {
                setJobTypeFilter("계약직");
                setCurrentPage(1);
              }}
              size="sm"
            >
              {t('jobs.filter.contract')}
            </Button>
          </div>
          
          <div className="bg-white rounded-lg shadow">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-300 bg-gray-50">
<th className="py-3 px-2 text-center text-sm font-semibold text-gray-700 w-16">
                    {t('jobs.table.no')}
                  </th>
<th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 w-96">
                    {t('jobs.table.title')}
                  </th>
                  <th className="py-3 px-3 text-center text-sm font-semibold text-gray-700 w-32">
                    {t('jobs.table.date')}
                  </th>
                  <th className="py-3 px-2 text-center text-sm font-semibold text-gray-700 w-12">
                    {t('jobs.table.attachment')}
                  </th>
                  <th className="py-3 px-2 text-center text-sm font-semibold text-gray-700 w-16">
                    {t('jobs.table.views')}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {currentJobs.map((job, index) => (
<tr 
                    key={job.id}
                    onClick={() => handleJobClick(job)}
                    className="border-b border-gray-200 hover:bg-blue-50 cursor-pointer transition-colors"
                  >
                    <td className="py-3 px-2 text-center text-sm text-gray-600">
{filteredJobs.length - (startIndex + index)}
                    </td>
<td className="py-3 px-4 text-sm text-gray-900 hover:text-blue-600">
                      <div className="flex items-center gap-2">
                        {job.jobType && (
                          <span className={`inline-block px-2 py-1 text-xs rounded font-medium ${
                            job.jobType === "정규직"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-orange-100 text-orange-800"
                          }`}>
                            ({job.jobType === "정규직" ? t('jobs.type.fulltime') : t('jobs.type.contract')})
                          </span>
                        )}
                        <span className="truncate">{job.title}</span>
                        <span className={`inline-block px-2 py-1 text-xs rounded ml-2 ${
                          job.status === "채용중" || job.status === "상시채용"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}>
                          {job.status === "채용중" || job.status === "상시채용" ? t('jobs.status.active') : t('jobs.status.closed')}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-center text-sm text-gray-500">
                      {job.date}
                    </td>
<td className="py-3 px-2 text-center text-sm text-gray-500">
{job.attachmentFile ? 
                        <Paperclip className="h-3 w-3 mx-auto text-gray-400" /> : 
                        <span className="text-gray-300">-</span>
                      }
                    </td>
                    <td className="py-3 px-2 text-center text-sm text-gray-500">
                      {job.views}
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

          {/* Post info */}
          <div className="mt-4 text-center text-sm text-gray-500">
            {t('jobs.pagination.info').replace('{total}', filteredJobs.length.toString()).replace('{current}', currentPage.toString()).replace('{pages}', totalPages.toString())}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default JobPostings;