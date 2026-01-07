'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import {
  DocumentTextIcon,
  FolderOpenIcon,
  UsersIcon,
  ClipboardDocumentIcon,
  ArrowLeftIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';

interface CVSubmission {
  id: string;
  position_id: string | null;
  position_title: string | null;
  name: string;
  email: string;
  phone: string | null;
  cv_file_url: string;
  cv_file_name: string | null;
  message: string | null;
  status: string;
  created_at: string;
}

export default function AdminCVSubmissionsPage() {
  const router = useRouter();
  const pathname = usePathname();

  // Menu items configuration
  const menuItems = [
    { path: '/admin', icon: DocumentTextIcon, title: 'Quản lý bài viết', label: 'Quản lý bài viết' },
    { path: '/admin/projects', icon: FolderOpenIcon, title: 'Quản lý Dự án', label: 'Quản lý Dự án' },
    { path: '/admin/recruitment', icon: UsersIcon, title: 'Quản lý Tuyển dụng', label: 'Quản lý Tuyển dụng' },
    { path: '/admin/cv-submissions', icon: ClipboardDocumentIcon, title: 'Quản lý CV', label: 'Quản lý CV' },
  ];

  const [submissions, setSubmissions] = useState<CVSubmission[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  
  // Filter state
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const fetchSubmissions = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      
      const res = await fetch('/api/cv-submissions');
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Không thể tải danh sách CV');
      }

      setSubmissions(data.submissions || []);
    } catch (err) {
      console.error('Error fetching CV submissions:', err);
      const message =
        err instanceof Error ? err.message : 'Có lỗi xảy ra khi tải danh sách CV';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  // Filter submissions by status
  const filteredSubmissions = statusFilter === 'all' 
    ? submissions 
    : submissions.filter(s => s.status === statusFilter);

  // Pagination calculations
  const totalPages = Math.ceil(filteredSubmissions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentSubmissions = filteredSubmissions.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const listElement = document.querySelector('.flex-1.overflow-y-auto');
    if (listElement) {
      listElement.scrollTop = 0;
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter, submissions.length]);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/cv-submissions/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Không thể cập nhật trạng thái');
      }

      // Update local state
      setSubmissions(prev => 
        prev.map(s => s.id === id ? { ...s, status: newStatus } : s)
      );
    } catch (err) {
      console.error('Error updating status:', err);
      alert(err instanceof Error ? err.message : 'Có lỗi xảy ra');
    }
  };

  const handleLogout = async () => {
    if (!confirm('Bạn có chắc muốn đăng xuất?')) return;
    try {
      const res = await fetch('/api/auth/logout', { method: 'POST' });
      if (res.ok) {
        router.push('/login');
        router.refresh();
      }
    } catch (err) {
      console.error('Logout error:', err);
      alert('Có lỗi xảy ra khi đăng xuất');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'reviewed':
        return 'bg-blue-100 text-blue-700';
      case 'contacted':
        return 'bg-green-100 text-green-700';
      case 'rejected':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Chờ xử lý';
      case 'reviewed':
        return 'Đã xem';
      case 'contacted':
        return 'Đã liên hệ';
      case 'rejected':
        return 'Từ chối';
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-[#F6E8DC] flex">
      {/* Sidebar */}
      <div className="w-56 bg-[#3A1308] text-white flex flex-col py-6 space-y-6 relative z-50">
        <div className="px-4">
          <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center overflow-hidden">
            <Image
              src="/images/logo-Thien-Nhat-Minh-Co.-Ltd.-moi-ko-nen-2048x928.png"
              alt="Logo"
              width={40}
              height={40}
              className="object-contain"
            />
          </div>
        </div>
        <nav className="flex-1 flex flex-col space-y-2 mt-4 px-3">
          {menuItems.map((item) => {
            const isActive = pathname === item.path || (item.path !== '/admin' && pathname.startsWith(item.path));
            const IconComponent = item.icon;
            return (
              <button
                key={item.path}
                onClick={() => router.push(item.path)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
                  isActive
                    ? 'bg-white text-[#3A1308] shadow-sm'
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
                title={item.title}
              >
                <IconComponent className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm font-medium whitespace-nowrap">{item.label}</span>
              </button>
            );
          })}
        </nav>
        <div className="px-3 space-y-2">
          <button
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-white"
            onClick={() => router.push('/')}
          >
            <ArrowLeftIcon className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm font-medium whitespace-nowrap">Về trang chủ</span>
          </button>
          <button
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl bg-red-500/20 hover:bg-red-500/30 transition-colors text-white"
            onClick={handleLogout}
          >
            <ArrowRightOnRectangleIcon className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm font-medium whitespace-nowrap">Đăng xuất</span>
          </button>
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 px-4 md:px-8 py-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-2">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold text-[#3A1308]">
              Quản lý CV Submissions
            </h1>
            <p className="text-sm text-[#8A5B46]">
              Xem và quản lý các CV đã được gửi từ trang tuyển dụng.
            </p>
          </div>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-3">
          <label className="text-sm font-medium text-[#3A1308]">Lọc theo trạng thái:</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#B44938] focus:border-transparent bg-white"
          >
            <option value="all">Tất cả</option>
            <option value="pending">Chờ xử lý</option>
            <option value="reviewed">Đã xem</option>
            <option value="contacted">Đã liên hệ</option>
            <option value="rejected">Từ chối</option>
          </select>
        </div>

        <div className="rounded-2xl bg-[#FDF6EF] border border-white/60 shadow-sm flex flex-col h-[620px]">
          <div className="px-4 py-3 border-b border-white/60">
            <h2 className="font-semibold text-[#3A1308] text-base">
              Danh sách CV ({filteredSubmissions.length})
            </h2>
          </div>

          <div className="flex-1 overflow-y-auto">
            {loading ? (
              <div className="py-6 text-center text-sm text-[#8A5B46]">
                Đang tải danh sách CV...
              </div>
            ) : error ? (
              <div className="py-4 px-4 text-sm text-red-700">
                {error}
              </div>
            ) : currentSubmissions.length === 0 ? (
              <div className="py-6 text-center text-sm text-[#8A5B46]">
                Chưa có CV nào.
              </div>
            ) : (
              <>
                <ul className="divide-y divide-white/60">
                  {currentSubmissions.map((submission) => (
                    <li
                      key={submission.id}
                      className="px-4 py-4 hover:bg-white/60"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(submission.status)}`}
                            >
                              {getStatusLabel(submission.status)}
                            </span>
                            <span className="text-xs text-[#8A5B46]">
                              {new Date(submission.created_at).toLocaleString('vi-VN')}
                            </span>
                          </div>
                          <h3 className="font-semibold text-[#3A1308] text-base mb-1">
                            {submission.name}
                          </h3>
                          <p className="text-sm text-[#8A5B46] mb-1">
                            📧 {submission.email}
                          </p>
                          {submission.phone && (
                            <p className="text-sm text-[#8A5B46] mb-1">
                              📞 {submission.phone}
                            </p>
                          )}
                          {submission.position_title && (
                            <p className="text-sm text-[#8A5B46] mb-2">
                              💼 Vị trí: {submission.position_title}
                            </p>
                          )}
                          {submission.message && (
                            <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                              {submission.message}
                            </p>
                          )}
                          <a
                            href={submission.cv_file_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 font-medium"
                          >
                            📄 Xem CV: {submission.cv_file_name || 'CV.pdf'}
                          </a>
                        </div>
                        <div className="flex flex-col gap-2">
                          <select
                            value={submission.status}
                            onChange={(e) => handleStatusChange(submission.id, e.target.value)}
                            className="px-3 py-1.5 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-[#B44938] focus:border-transparent bg-white"
                          >
                            <option value="pending">Chờ xử lý</option>
                            <option value="reviewed">Đã xem</option>
                            <option value="contacted">Đã liên hệ</option>
                            <option value="rejected">Từ chối</option>
                          </select>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                
                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="px-4 py-3 border-t border-white/60 flex items-center justify-between">
                    <div className="text-sm text-[#8A5B46]">
                      Hiển thị {startIndex + 1}-{Math.min(endIndex, filteredSubmissions.length)} trong tổng số {filteredSubmissions.length} CV
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-3 py-1.5 rounded-lg bg-white/60 text-[#3A1308] text-sm font-semibold hover:bg-white/80 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        ← Trước
                      </button>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                          if (
                            page === 1 ||
                            page === totalPages ||
                            (page >= currentPage - 1 && page <= currentPage + 1)
                          ) {
                            return (
                              <button
                                key={page}
                                onClick={() => handlePageChange(page)}
                                className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${
                                  currentPage === page
                                    ? 'bg-[#3A1308] text-white'
                                    : 'bg-white/60 text-[#3A1308] hover:bg-white/80'
                                }`}
                              >
                                {page}
                              </button>
                            );
                          } else if (
                            page === currentPage - 2 ||
                            page === currentPage + 2
                          ) {
                            return (
                              <span key={page} className="px-2 text-[#8A5B46]">
                                ...
                              </span>
                            );
                          }
                          return null;
                        })}
                      </div>
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1.5 rounded-lg bg-white/60 text-[#3A1308] text-sm font-semibold hover:bg-white/80 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Sau →
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

