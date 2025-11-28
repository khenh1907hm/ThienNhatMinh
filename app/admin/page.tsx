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

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
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

  const handleDelete = async (id: string) => {
    if (!confirm('Bạn chắc chắn muốn xóa bài viết này?')) return;
    try {
      setDeletingId(id);
      const res = await fetch(`/api/posts/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Không thể xóa bài viết');
      }
      setPosts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
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
          className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-xs"
          onClick={() => router.push('/')}
        >
          ⬅
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
              <h2 className="font-semibold text-[#3A1308] text-sm">
                Bài viết mới nhất
              </h2>
              <p className="text-xs text-[#8A5B46]">
                Thêm, sửa, xóa trực tiếp tại đây.
              </p>
            </div>
            <button
              onClick={openCreate}
              className="text-xs px-3 py-1 rounded-full bg-[#3A1308] text-white hover:bg-[#4D1A0F]"
            >
              + Thêm
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto">
            {loadingPosts ? (
              <div className="py-6 text-center text-xs text-[#8A5B46]">
                Đang tải danh sách bài viết...
              </div>
            ) : postsError ? (
              <div className="py-4 px-4 text-xs text-red-700">
                {postsError}
              </div>
            ) : posts.length === 0 ? (
              <div className="py-6 text-center text-xs text-[#8A5B46]">
                Chưa có bài viết nào. Bấm &quot;Thêm&quot; để tạo mới.
              </div>
            ) : (
              <ul className="divide-y divide-white/60 text-sm">
                {posts.map((post) => (
                  <li
                    key={post.id}
                    className="px-4 py-3 flex items-start justify-between gap-2 hover:bg-white/60 cursor-pointer"
                    onClick={() => openEdit(post)}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-[#3A1308] text-sm truncate">
                        {post.title}
                      </p>
                      <p className="text-[11px] text-[#8A5B46] truncate">
                        {post.excerpt || '(Không có mô tả ngắn)'}
                      </p>
                      <div className="mt-1 flex flex-wrap items-center gap-2 text-[10px] text-[#8A5B46]">
                        {post.category && (
                          <span className="px-2 py-0.5 rounded-full bg-white/80">
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
                    <div className="flex flex-col items-end gap-1">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                          post.published
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {post.published ? 'Đã xuất bản' : 'Nháp'}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(post.id);
                        }}
                        disabled={deletingId === post.id}
                        className="text-[10px] text-red-600 hover:text-red-800 disabled:opacity-50"
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
            <div className="border-t border-white/60 bg-white/90 backdrop-blur-sm px-4 py-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-xs text-[#3A1308]">
                  {formMode === 'create'
                    ? 'Thêm bài viết mới'
                    : 'Chỉnh sửa bài viết'}
                </span>
                <button
                  onClick={closeForm}
                  className="text-xs text-[#8A5B46] hover:text-[#3A1308]"
                >
                  Đóng
                </button>
              </div>

              {formError && (
                <div className="rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-[11px] text-red-700">
                  {formError}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-2 text-[11px]">
                <div>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-gray-300 focus:ring-1 focus:ring-[#B44938] focus:border-transparent"
                    placeholder="Tiêu đề *"
                    required
                  />
                </div>
                <div className="flex gap-2">
                  <div className="w-1/2">
                    <input
                      type="text"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-gray-300 focus:ring-1 focus:ring-[#B44938] focus:border-transparent"
                      placeholder="Danh mục"
                    />
                  </div>
                  <div className="w-1/2 flex flex-col gap-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0] || null;
                        setImageFile(file);
                      }}
                      className="w-full text-[10px] text-[#3A1308] file:mr-2 file:py-1.5 file:px-2 file:rounded-lg file:border-0 file:text-[10px] file:bg-[#F6E8DC] file:text-[#3A1308] hover:file:bg-[#F0DCCF]"
                    />
                    {imageUrl && !imageFile && (
                      <span className="text-[10px] text-[#8A5B46] truncate">
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
                    className="w-full px-3 py-1.5 rounded-lg border border-gray-300 focus:ring-1 focus:ring-[#B44938] focus:border-transparent"
                    placeholder="Mô tả ngắn"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-[#3A1308] mb-1">
                    Nội dung *
                  </label>
                  <RichTextEditor
                    value={content}
                    onChange={setContent}
                    placeholder="Nhập nội dung bài viết..."
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label className="inline-flex items-center gap-1 text-[11px] text-[#3A1308]">
                    <input
                      type="checkbox"
                      checked={published}
                      onChange={(e) => setPublished(e.target.checked)}
                      className="rounded border-gray-300 text-[#B44938] focus:ring-[#B44938]"
                    />
                    Xuất bản
                  </label>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-4 py-1.5 rounded-full bg-[#3A1308] text-white text-[11px] font-semibold hover:bg-[#4D1A0F] disabled:opacity-50"
                  >
                    {saving ? 'Đang lưu...' : 'Lưu'}
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


