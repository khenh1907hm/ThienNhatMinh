'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import RichTextEditor from '../../components/RichTextEditor';
import {
  DocumentTextIcon,
  FolderOpenIcon,
  UsersIcon,
  ClipboardDocumentIcon,
  ArrowLeftIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';

interface Post {
  id: string;
  title: string;
  slug: string;
  category: string | null;
  project_type: string | null;
  excerpt: string | null;
  image: string | null;
  content: string;
  published: boolean;
  created_at: string;
}

type Mode = 'create' | 'edit' | null;

export default function AdminProjectsPage() {
  const router = useRouter();
  const pathname = usePathname();
  const CATEGORY = 'Dự án'; // Set cứng category

  // Menu items configuration
  const menuItems = [
    { path: '/admin', icon: DocumentTextIcon, title: 'Quản lý bài viết', label: 'Quản lý bài viết' },
    { path: '/admin/projects', icon: FolderOpenIcon, title: 'Quản lý Dự án', label: 'Quản lý Dự án' },
    { path: '/admin/recruitment', icon: UsersIcon, title: 'Quản lý Tuyển dụng', label: 'Quản lý Tuyển dụng' },
    { path: '/admin/cv-submissions', icon: ClipboardDocumentIcon, title: 'Quản lý CV', label: 'Quản lý CV' },
  ];

  const [posts, setPosts] = useState<Post[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [postsError, setPostsError] = useState<string | null>(null);

  const [formMode, setFormMode] = useState<Mode>(null);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [loadingImage, setLoadingImage] = useState(false);
  const [content, setContent] = useState('');
  const [published, setPublished] = useState(false);
  const [selectedProjectTypes, setSelectedProjectTypes] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Các loại dự án (bỏ option rỗng)
  const projectTypes = [
    { value: 'tieu-bieu', label: 'Dự án tiêu biểu' },
    { value: 'dang-thuc-hien', label: 'Dự án đang thực hiện' },
    { value: 'da-thuc-hien', label: 'Dự án đã thực hiện' },
  ];
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  
  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter by project type
  const [filterProjectType, setFilterProjectType] = useState<string>('all');

  const resetForm = () => {
    setTitle('');
    setExcerpt('');
    setImageUrl('');
    setImageFile(null);
    setImageUrlInput('');
    setContent('');
    setPublished(false);
    setSelectedProjectTypes([]);
    setEditingPost(null);
    setFormError(null);
    setLoadingImage(false);
  };

  const openCreate = () => {
    resetForm();
    setFormMode('create');
  };

  const openEdit = (post: Post) => {
    setEditingPost(post);
    setTitle(post.title || '');
    setExcerpt(post.excerpt || '');
    setImageUrl(post.image || '');
    setImageFile(null);
    setImageUrlInput('');
    setContent(post.content || '');
    setPublished(!!post.published);
    // Parse project_type từ string (có thể là single value hoặc comma-separated)
    const projectTypeStr = post.project_type || '';
    const types = projectTypeStr ? projectTypeStr.split(',').map(t => t.trim()).filter(Boolean) : [];
    setSelectedProjectTypes(types);
    setFormError(null);
    setFormMode('edit');
  };

  const closeForm = () => {
    setFormMode(null);
    resetForm();
  };

  const fetchPosts = async (): Promise<void> => {
    try {
      setLoadingPosts(true);
      setPostsError(null);
      
      // Filter theo category = "Dự án"
      const res = await fetch(`/api/posts?category=${encodeURIComponent(CATEGORY)}`);
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Không thể tải danh sách dự án');
      }

      setPosts(data.posts || []);
    } catch (err) {
      console.error('Error fetching projects:', err);
      const message =
        err instanceof Error ? err.message : 'Có lỗi xảy ra khi tải dự án';
      setPostsError(message);
    } finally {
      setLoadingPosts(false);
    }
  };

  // Filter posts based on search query and project type
  const filteredPosts = useMemo(() => {
    let filtered = posts;
    
    // Filter by project type first
    if (filterProjectType !== 'all') {
      filtered = filtered.filter((post) => {
        const projectTypeStr = post.project_type || '';
        const postTypes = projectTypeStr ? projectTypeStr.split(',').map(t => t.trim()) : [];
        return postTypes.includes(filterProjectType);
      });
    }
    
    // Then filter by search query
    const trimmedQuery = searchQuery.trim();
    if (!trimmedQuery) return filtered;
    
    const query = trimmedQuery.toLowerCase();
    return filtered.filter((post) => {
      const titleMatch = post.title?.toLowerCase().includes(query) ?? false;
      const excerptMatch = post.excerpt?.toLowerCase().includes(query) ?? false;
      // Check all project types in the post
      const projectTypeStr = post.project_type || '';
      const postTypes = projectTypeStr ? projectTypeStr.split(',').map(t => t.trim()) : [];
      const projectTypeMatch = postTypes.some(type => {
        const typeLabel = projectTypes.find(pt => pt.value === type)?.label || '';
        return typeLabel.toLowerCase().includes(query);
      });
      
      return titleMatch || excerptMatch || projectTypeMatch;
    });
  }, [posts, searchQuery, filterProjectType, projectTypes]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPosts = filteredPosts.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of list
    const listElement = document.querySelector('.flex-1.overflow-y-auto');
    if (listElement) {
      listElement.scrollTop = 0;
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Reset to page 1 when posts, search query, or filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [posts.length, searchQuery, filterProjectType]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      setFormError('Tiêu đề và nội dung là bắt buộc.');
      return;
    }

    try {
      setSaving(true);
      setFormError(null);

      let finalImageUrl = imageUrl;
      if (imageFile) {
        const formData = new FormData();
        formData.append('file', imageFile);
        formData.append('folder', 'posts');

        const uploadRes = await fetch('/api/upload-image', {
          method: 'POST',
          body: formData,
        });

        const uploadData = await uploadRes.json();
        if (!uploadRes.ok) {
          throw new Error(uploadData.error || 'Không thể upload ảnh');
        }
        finalImageUrl = uploadData.url;
      }

      // Join selected project types with comma
      const projectTypeValue = selectedProjectTypes.length > 0 
        ? selectedProjectTypes.join(',') 
        : null;

      const payload = {
        title: title.trim(),
        content: content.trim(),
        excerpt: excerpt.trim() || null,
        image: finalImageUrl || null,
        category: CATEGORY, // Set cứng category
        project_type: projectTypeValue,
        published,
      };

      const url =
        formMode === 'edit' && editingPost
          ? `/api/posts/${editingPost.id}`
          : '/api/posts';
      const method = formMode === 'edit' ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Không thể lưu dự án');
      }

      closeForm();
      await fetchPosts();
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : 'Có lỗi xảy ra khi lưu dự án';
      setFormError(message);
    } finally {
      setSaving(false);
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

  const handleDownloadImageFromUrl = async () => {
    if (!imageUrlInput.trim()) {
      setFormError('Vui lòng nhập URL ảnh');
      return;
    }

    try {
      setLoadingImage(true);
      setFormError(null);

      const formData = new FormData();
      formData.append('imageUrl', imageUrlInput.trim());
      formData.append('folder', 'posts');

      const res = await fetch('/api/upload-image', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Không thể tải ảnh từ URL');
      }

      setImageUrl(data.url);
      setImageUrlInput('');
      setImageFile(null); // Clear file if URL is used
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : 'Có lỗi xảy ra khi tải ảnh từ URL';
      setFormError(message);
    } finally {
      setLoadingImage(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bạn chắc chắn muốn xóa dự án này?')) return;
    try {
      setDeletingId(id);
      const res = await fetch(`/api/posts/${id}`, { method: 'DELETE' });
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Không thể xóa dự án');
      }
      
      setPosts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error('Delete error:', err);
      const message =
        err instanceof Error
          ? err.message
          : 'Có lỗi xảy ra khi xóa dự án';
      alert(message);
    } finally {
      setDeletingId(null);
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
              Quản lý Dự án
            </h1>
            <p className="text-sm text-[#8A5B46]">
              Tạo, chỉnh sửa và xóa các dự án hiển thị trên website.
            </p>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="flex-1 md:flex-none md:w-48">
              <select
                value={filterProjectType}
                onChange={(e) => {
                  setFilterProjectType(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full rounded-full bg-white/70 px-4 py-2 text-sm text-[#3A1308] focus:outline-none focus:ring-2 focus:ring-[#B44938] border border-transparent hover:border-gray-300 cursor-pointer"
              >
                <option value="all">Tất cả loại dự án</option>
                {projectTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1 md:flex-none md:w-72 relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1); // Reset to first page when searching
                }}
                placeholder="Tìm kiếm dự án..."
                className="w-full rounded-full bg-white/70 px-4 py-2 pr-10 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#B44938]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  title="Xóa tìm kiếm"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-[#FDF6EF] border border-white/60 shadow-sm flex flex-col h-[620px]">
          <div className="px-4 py-3 border-b border-white/60 flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-[#3A1308] text-base">
                Dự án mới nhất
              </h2>
              <p className="text-sm text-[#8A5B46]">
                Thêm, sửa, xóa trực tiếp tại đây.
              </p>
            </div>
            <button
              onClick={openCreate}
              className="text-sm px-4 py-2 rounded-full bg-[#3A1308] text-white hover:bg-[#4D1A0F] font-semibold"
            >
              + Thêm dự án
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            {loadingPosts ? (
              <div className="py-6 text-center text-sm text-[#8A5B46]">
                Đang tải danh sách dự án...
              </div>
            ) : postsError ? (
              <div className="py-4 px-4 text-sm text-red-700">
                {postsError}
              </div>
            ) : filteredPosts.length === 0 ? (
              <div className="py-6 text-center text-sm text-[#8A5B46]">
                {searchQuery ? (
                  <>
                    Không tìm thấy dự án nào phù hợp với &quot;{searchQuery}&quot;.
                    <button
                      onClick={() => setSearchQuery('')}
                      className="ml-2 text-[#B44938] hover:underline"
                    >
                      Xóa bộ lọc
                    </button>
                  </>
                ) : (
                  'Chưa có dự án nào. Bấm "Thêm dự án" để tạo mới.'
                )}
              </div>
            ) : (
              <>
                <ul className="divide-y divide-white/60">
                  {currentPosts.map((post) => (
                  <li
                    key={post.id}
                    className="px-4 py-4 flex items-start justify-between gap-3 hover:bg-white/60 cursor-pointer"
                    onClick={() => openEdit(post)}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            post.published
                              ? 'bg-green-100 text-green-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}
                        >
                          {post.published ? '✓ Đã xuất bản' : '○ Nháp'}
                        </span>
                      </div>
                      <p className="font-semibold text-[#3A1308] text-base mb-1 truncate">
                        {post.title}
                      </p>
                      {post.project_type && (
                        <div className="flex flex-wrap gap-1 mb-1">
                          {post.project_type.split(',').map((type, idx) => {
                            const trimmedType = type.trim();
                            const typeLabel = projectTypes.find(pt => pt.value === trimmedType)?.label || trimmedType;
                            return (
                              <span 
                                key={idx}
                                className="inline-block px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-700"
                              >
                                {typeLabel}
                              </span>
                            );
                          })}
                        </div>
                      )}
                      <p className="text-sm text-[#8A5B46] truncate mb-2">
                        {post.excerpt || '(Không có mô tả ngắn)'}
                      </p>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-[#8A5B46]">
                        <span>
                          {new Date(post.created_at).toLocaleDateString('vi-VN')}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(post.id);
                        }}
                        disabled={deletingId === post.id}
                        className="text-sm text-red-600 hover:text-red-800 disabled:opacity-50 px-2 py-1 rounded hover:bg-red-50"
                      >
                        {deletingId === post.id ? 'Đang xóa...' : 'Xóa'}
                      </button>
                    </div>
                  </li>
                  ))}
                </ul>
                
                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="px-4 py-3 border-t border-white/60 flex items-center justify-between">
                    <div className="text-sm text-[#8A5B46]">
                      {searchQuery ? (
                        <>
                          Hiển thị {startIndex + 1}-{Math.min(endIndex, filteredPosts.length)} trong tổng số {filteredPosts.length} kết quả
                          <span className="text-[#8A5B46]/60"> (từ {posts.length} dự án)</span>
                        </>
                      ) : (
                        `Hiển thị ${startIndex + 1}-${Math.min(endIndex, filteredPosts.length)} trong tổng số ${filteredPosts.length} dự án`
                      )}
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
                          // Show first page, last page, current page, and pages around current
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

          {/* Inline form panel */}
          {formMode && (
            <div className="border-t border-white/60 bg-white/90 backdrop-blur-sm px-4 py-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-base text-[#3A1308]">
                  {formMode === 'create'
                    ? 'Thêm dự án mới'
                    : 'Chỉnh sửa dự án'}
                </span>
                <button
                  onClick={closeForm}
                  className="text-sm text-[#8A5B46] hover:text-[#3A1308] px-3 py-1.5 rounded-lg hover:bg-white/60 font-medium"
                >
                  ← Quay lại danh sách
                </button>
              </div>

              {formError && (
                <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-2 text-sm text-red-700">
                  {formError}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-[#F6E8DC] rounded-lg border border-[#F0DCCF]">
                  <label className="inline-flex items-center gap-2 text-base font-semibold text-[#3A1308] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={published}
                      onChange={(e) => setPublished(e.target.checked)}
                      className="w-5 h-5 rounded border-gray-300 text-[#B44938] focus:ring-[#B44938] cursor-pointer"
                    />
                    <span className="text-lg">Xuất bản</span>
                  </label>
                  <span className="text-sm text-[#8A5B46]">
                    {published ? '(Dự án sẽ hiển thị công khai)' : '(Lưu dưới dạng nháp)'}
                  </span>
                </div>

                <div>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2.5 text-base rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#B44938] focus:border-transparent"
                    placeholder="Tiêu đề *"
                    required
                  />
                </div>
                <div className="space-y-3">
                  <div className="w-full flex flex-col gap-1">
                    <label className="text-sm font-semibold text-[#3A1308] mb-1">
                      Upload ảnh từ máy tính
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0] || null;
                        setImageFile(file);
                        if (file) {
                          setImageUrlInput(''); // Clear URL input when file is selected
                        }
                      }}
                      className="w-full text-sm text-[#3A1308] file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-sm file:bg-[#F6E8DC] file:text-[#3A1308] hover:file:bg-[#F0DCCF] cursor-pointer"
                    />
                  </div>
                  
                  <div className="relative">
                    <label className="text-sm font-semibold text-[#3A1308] mb-1 block">
                      Hoặc tải ảnh từ URL
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="url"
                        value={imageUrlInput}
                        onChange={(e) => {
                          setImageUrlInput(e.target.value);
                          if (e.target.value) {
                            setImageFile(null); // Clear file when URL is entered
                          }
                        }}
                        placeholder="https://example.com/image.jpg"
                        className="flex-1 px-4 py-2.5 text-base rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#B44938] focus:border-transparent"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleDownloadImageFromUrl();
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={handleDownloadImageFromUrl}
                        disabled={loadingImage || !imageUrlInput.trim()}
                        className="px-4 py-2.5 rounded-lg bg-[#B44938] text-white font-semibold hover:bg-[#9A3E2E] disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                      >
                        {loadingImage ? 'Đang tải...' : 'Tải về'}
                      </button>
                    </div>
                  </div>
                  
                  {imageUrl && (
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-xs text-green-700 font-semibold mb-1">Ảnh đã được tải:</p>
                      <p className="text-xs text-green-600 truncate">{imageUrl}</p>
                      {imageUrl && (
                        <div className="mt-2">
                          <img 
                            src={imageUrl} 
                            alt="Preview" 
                            className="max-w-full h-32 object-cover rounded border border-green-300"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div>
                  <input
                    type="text"
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    className="w-full px-4 py-2.5 text-base rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#B44938] focus:border-transparent"
                    placeholder="Mô tả ngắn"
                  />
                </div>
                <div>
                  <label className="block text-base font-semibold text-[#3A1308] mb-2">
                    Loại dự án (có thể chọn nhiều)
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {projectTypes.map((type) => {
                      const isSelected = selectedProjectTypes.includes(type.value);
                      return (
                        <div
                          key={type.value}
                          onClick={() => {
                            if (isSelected) {
                              setSelectedProjectTypes(prev => prev.filter(t => t !== type.value));
                            } else {
                              setSelectedProjectTypes(prev => [...prev, type.value]);
                            }
                          }}
                          className={`
                            relative cursor-pointer rounded-lg border-2 p-4 transition-all duration-200
                            ${isSelected 
                              ? 'bg-[#B44938] border-[#B44938] text-white' 
                              : 'bg-white border-gray-300 text-[#3A1308] hover:border-[#B44938] hover:bg-[#F6E8DC]'
                            }
                          `}
                        >
                          <div className="font-semibold text-base">{type.label}</div>
                          {isSelected && (
                            <div className="absolute top-2 right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                              <svg 
                                className="w-4 h-4 text-[#B44938]" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                              >
                                <path 
                                  strokeLinecap="round" 
                                  strokeLinejoin="round" 
                                  strokeWidth={3} 
                                  d="M5 13l4 4L19 7" 
                                />
                              </svg>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <label className="block text-base font-semibold text-[#3A1308] mb-2">
                    Nội dung *
                  </label>
                  <RichTextEditor
                    value={content}
                    onChange={setContent}
                    placeholder="Nhập nội dung dự án..."
                  />
                </div>
                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={closeForm}
                    className="px-5 py-2.5 rounded-lg bg-gray-200 text-gray-700 text-base font-semibold hover:bg-gray-300"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-6 py-2.5 rounded-lg bg-[#3A1308] text-white text-base font-semibold hover:bg-[#4D1A0F] disabled:opacity-50"
                  >
                    {saving ? 'Đang lưu...' : 'Lưu dự án'}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

