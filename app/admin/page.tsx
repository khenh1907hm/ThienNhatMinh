'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import RichTextEditor from '../components/RichTextEditor';

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

export default function AdminDashboardPage() {
  const router = useRouter();

  // Posts state
  const [posts, setPosts] = useState<Post[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [postsError, setPostsError] = useState<string | null>(null);

  // Form state
  const [formMode, setFormMode] = useState<Mode>(null);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
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
    setCategory('');
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
    setCategory(post.category || '');
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
      console.log('🔄 Fetching posts...');
      setLoadingPosts(true);
      setPostsError(null);
      
      const res = await fetch('/api/posts');
      const data = await res.json();
      
      console.log('📥 API Response:', {
        ok: res.ok,
        status: res.status,
        postsCount: data.posts?.length || 0,
        error: data.error,
        details: data.details,
      });

      if (!res.ok) {
        const errorMsg = data.error || 'Không thể tải danh sách bài viết';
        const detailsMsg = data.details ? `\nChi tiết: ${data.details}` : '';
        throw new Error(errorMsg + detailsMsg);
      }

      console.log(`✅ Loaded ${data.posts?.length || 0} posts`);
      setPosts(data.posts || []);
    } catch (err) {
      console.error('❌ Error fetching posts:', err);
      const message =
        err instanceof Error ? err.message : 'Có lỗi xảy ra khi tải bài viết';
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

      // Upload image file (if selected) via API
      let finalImageUrl = imageUrl;

      if (imageFile) {
        console.log('=== Image Upload Debug ===');
        console.log('File selected:', {
          name: imageFile.name,
          size: imageFile.size,
          type: imageFile.type,
        });

        const formData = new FormData();
        formData.append('file', imageFile);
        formData.append('folder', 'posts');

        console.log('Uploading via API...');

        const uploadRes = await fetch('/api/upload-image', {
          method: 'POST',
          body: formData,
        });

        const uploadData = await uploadRes.json();

        if (!uploadRes.ok) {
          console.error('Upload error:', uploadData);
          throw new Error(
            uploadData.error || `Không thể upload ảnh: ${uploadData.details || 'Unknown error'}`
          );
        }

        finalImageUrl = uploadData.url;
        console.log('Upload successful, URL:', finalImageUrl);
        console.log('=== End Image Upload ===');
      }

      const payload = {
        title: title.trim(),
        content: content.trim(),
        excerpt: excerpt.trim() || null,
        image: finalImageUrl || null,
        category: category.trim() || null,
        published,
      };

      const url =
        formMode === 'edit' && editingPost
          ? `/api/posts/${editingPost.id}`
          : '/api/posts';
      const method = formMode === 'edit' ? 'PUT' : 'POST';

      console.log('=== Submitting Form ===');
      console.log('Mode:', formMode);
      console.log('URL:', url);
      console.log('Method:', method);
      console.log('Payload:', payload);
      if (formMode === 'edit' && editingPost) {
        console.log('Editing Post ID:', editingPost.id);
      }

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      
      console.log('Response status:', res.status);
      console.log('Response ok:', res.ok);
      
      const data = await res.json();
      console.log('Response data:', data);
      
      if (!res.ok) {
        throw new Error(data.error || 'Không thể lưu bài viết');
      }

      closeForm();
      await fetchPosts();
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : 'Có lỗi xảy ra khi lưu bài viết';
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
    if (!confirm('Bạn chắc chắn muốn xóa bài viết này?')) return;
    try {
      console.log('=== Deleting Post ===');
      console.log('Post ID:', id);
      
      setDeletingId(id);
      const res = await fetch(`/api/posts/${id}`, { method: 'DELETE' });
      
      console.log('Delete response status:', res.status);
      console.log('Delete response ok:', res.ok);
      
      const data = await res.json();
      console.log('Delete response data:', data);
      
      if (!res.ok) {
        throw new Error(data.error || 'Không thể xóa bài viết');
      }
      
      console.log('✅ Delete successful, removing from list');
      setPosts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error('❌ Delete error:', err);
      const message =
        err instanceof Error
          ? err.message
          : 'Có lỗi xảy ra khi xóa bài viết';
      alert(message);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#F6E8DC] flex">
      {/* Sidebar */}
      <aside className="w-[72px] md:w-20 bg-[#3A1308] text-white flex flex-col items-center py-6 space-y-6">
        <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center font-bold text-lg">
          A
        </div>
        <nav className="flex-1 flex flex-col items-center space-y-4 mt-4 text-xs">
          <button className="w-9 h-9 rounded-2xl bg-white text-[#3A1308] flex items-center justify-center shadow-sm">
            ◼
          </button>
          <button className="w-9 h-9 rounded-2xl bg-white/10 flex items-center justify-center">
            ≋
          </button>
          <button className="w-9 h-9 rounded-2xl bg-white/10 flex items-center justify-center">
            ₿
          </button>
          <button className="w-9 h-9 rounded-2xl bg-white/10 flex items-center justify-center">
            ⚙
          </button>
        </nav>
        <button
          className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-xs hover:bg-white/20 transition-colors"
          onClick={() => router.push('/')}
          title="Về trang chủ"
        >
          ⬅
        </button>
        <button
          className="w-9 h-9 rounded-full bg-red-500/20 hover:bg-red-500/30 flex items-center justify-center text-xs text-white transition-colors"
          onClick={handleLogout}
          title="Đăng xuất"
        >
          🚪
        </button>
      </aside>

      {/* Main content */}
      <main className="flex-1 px-4 md:px-8 py-6 space-y-6">
        {/* Top header đơn giản */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-2">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold text-[#3A1308]">
              Quản lý bài viết
            </h1>
            <p className="text-sm text-[#8A5B46]">
              Tạo, chỉnh sửa và xóa bài viết hiển thị trên website.
            </p>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="flex-1 md:flex-none md:w-72">
              <input
                type="text"
                placeholder="Tìm kiếm bài viết (chưa implement)..."
                className="w-full rounded-full bg-white/70 px-4 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#B44938]"
              />
            </div>
          </div>
        </div>

        {/* Khối bài viết chính */}
        <div className="rounded-2xl bg-[#FDF6EF] border border-white/60 shadow-sm flex flex-col h-[620px]">
          {/* Header */}
          <div className="px-4 py-3 border-b border-white/60 flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-[#3A1308] text-base">
                Bài viết mới nhất
              </h2>
              <p className="text-sm text-[#8A5B46]">
                Thêm, sửa, xóa trực tiếp tại đây.
              </p>
            </div>
            <button
              onClick={openCreate}
              className="text-sm px-4 py-2 rounded-full bg-[#3A1308] text-white hover:bg-[#4D1A0F] font-semibold"
            >
              + Thêm bài viết
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto">
            {loadingPosts ? (
              <div className="py-6 text-center text-sm text-[#8A5B46]">
                Đang tải danh sách bài viết...
              </div>
            ) : postsError ? (
              <div className="py-4 px-4 text-sm text-red-700">
                {postsError}
              </div>
            ) : posts.length === 0 ? (
              <div className="py-6 text-center text-sm text-[#8A5B46]">
                Chưa có bài viết nào. Bấm &quot;Thêm bài viết&quot; để tạo mới.
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
                        {post.category && (
                          <span className="px-2 py-1 rounded-full bg-white/80">
                            {post.category}
                          </span>
                        )}
                        <span>
                          {new Date(post.created_at).toLocaleDateString(
                            'vi-VN'
                          )}
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
                    ? 'Thêm bài viết mới'
                    : 'Chỉnh sửa bài viết'}
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
                {/* Xuất bản - đưa lên đầu */}
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
                    {published ? '(Bài viết sẽ hiển thị công khai)' : '(Lưu dưới dạng nháp)'}
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
                  <div className="w-1/2">
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-4 py-2.5 text-base rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#B44938] focus:border-transparent bg-white"
                    >
                      <option value="">Chọn danh mục</option>
                      <option value="Dự án">Dự án</option>
                      <option value="Dịch vụ">Dịch vụ</option>
                      <option value="Kiến thức">Kiến thức</option>
                      <option value="Khác">Khác</option>
                    </select>
                  </div>
                  <div className="w-1/2 flex flex-col gap-1">
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
                    placeholder="Nhập nội dung bài viết..."
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
                    {saving ? 'Đang lưu...' : 'Lưu bài viết'}
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


