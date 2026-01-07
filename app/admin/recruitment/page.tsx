'use client';

import { useEffect, useState } from 'react';
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
  excerpt: string | null;
  image: string | null;
  content: string;
  published: boolean;
  created_at: string;
}

type Mode = 'create' | 'edit' | null;

export default function AdminRecruitmentPage() {
  const router = useRouter();
  const pathname = usePathname();
  const CATEGORY = 'Tuyển dụng'; // Set cứng category

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
  const [content, setContent] = useState('');
  const [published, setPublished] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const resetForm = () => {
    setTitle('');
    setExcerpt('');
    setImageUrl('');
    setImageFile(null);
    setContent('');
    setPublished(false);
    setEditingPost(null);
    setFormError(null);
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
    setContent(post.content || '');
    setPublished(!!post.published);
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
      
      // Filter theo category = "Tuyển dụng"
      const res = await fetch(`/api/posts?category=${encodeURIComponent(CATEGORY)}`);
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Không thể tải danh sách tuyển dụng');
      }

      setPosts(data.posts || []);
    } catch (err) {
      console.error('Error fetching recruitment:', err);
      const message =
        err instanceof Error ? err.message : 'Có lỗi xảy ra khi tải tuyển dụng';
      setPostsError(message);
    } finally {
      setLoadingPosts(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

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

      const payload = {
        title: title.trim(),
        content: content.trim(),
        excerpt: excerpt.trim() || null,
        image: finalImageUrl || null,
        category: CATEGORY, // Set cứng category
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
        throw new Error(data.error || 'Không thể lưu tuyển dụng');
      }

      closeForm();
      await fetchPosts();
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : 'Có lỗi xảy ra khi lưu tuyển dụng';
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

  const handleDelete = async (id: string) => {
    if (!confirm('Bạn chắc chắn muốn xóa tuyển dụng này?')) return;
    try {
      setDeletingId(id);
      const res = await fetch(`/api/posts/${id}`, { method: 'DELETE' });
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Không thể xóa tuyển dụng');
      }
      
      setPosts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error('Delete error:', err);
      const message =
        err instanceof Error
          ? err.message
          : 'Có lỗi xảy ra khi xóa tuyển dụng';
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
              Quản lý Tuyển dụng
            </h1>
            <p className="text-sm text-[#8A5B46]">
              Tạo, chỉnh sửa và xóa các vị trí tuyển dụng hiển thị trên website.
            </p>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="flex-1 md:flex-none md:w-72">
              <input
                type="text"
                placeholder="Tìm kiếm tuyển dụng..."
                className="w-full rounded-full bg-white/70 px-4 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#B44938]"
              />
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-[#FDF6EF] border border-white/60 shadow-sm flex flex-col h-[620px]">
          <div className="px-4 py-3 border-b border-white/60 flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-[#3A1308] text-base">
                Tuyển dụng mới nhất
              </h2>
              <p className="text-sm text-[#8A5B46]">
                Thêm, sửa, xóa trực tiếp tại đây.
              </p>
            </div>
            <button
              onClick={openCreate}
              className="text-sm px-4 py-2 rounded-full bg-[#3A1308] text-white hover:bg-[#4D1A0F] font-semibold"
            >
              + Thêm tuyển dụng
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            {loadingPosts ? (
              <div className="py-6 text-center text-sm text-[#8A5B46]">
                Đang tải danh sách tuyển dụng...
              </div>
            ) : postsError ? (
              <div className="py-4 px-4 text-sm text-red-700">
                {postsError}
              </div>
            ) : posts.length === 0 ? (
              <div className="py-6 text-center text-sm text-[#8A5B46]">
                Chưa có tuyển dụng nào. Bấm &quot;Thêm tuyển dụng&quot; để tạo mới.
              </div>
            ) : (
              <ul className="divide-y divide-white/60">
                {posts.map((post) => (
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
            )}
          </div>

          {/* Inline form panel */}
          {formMode && (
            <div className="border-t border-white/60 bg-white/90 backdrop-blur-sm px-4 py-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-base text-[#3A1308]">
                  {formMode === 'create'
                    ? 'Thêm tuyển dụng mới'
                    : 'Chỉnh sửa tuyển dụng'}
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
                    {published ? '(Tuyển dụng sẽ hiển thị công khai)' : '(Lưu dưới dạng nháp)'}
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
                <div className="flex gap-3">
                  <div className="w-full flex flex-col gap-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0] || null;
                        setImageFile(file);
                      }}
                      className="w-full text-sm text-[#3A1308] file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-sm file:bg-[#F6E8DC] file:text-[#3A1308] hover:file:bg-[#F0DCCF] cursor-pointer"
                    />
                    {imageUrl && !imageFile && (
                      <span className="text-xs text-[#8A5B46] truncate">
                        Ảnh hiện tại: {imageUrl}
                      </span>
                    )}
                  </div>
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
                    Nội dung *
                  </label>
                  <RichTextEditor
                    value={content}
                    onChange={setContent}
                    placeholder="Nhập nội dung tuyển dụng..."
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
                    {saving ? 'Đang lưu...' : 'Lưu tuyển dụng'}
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

