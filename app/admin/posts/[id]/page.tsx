 'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

interface Post {
  id: string;
  title: string;
  category: string | null;
  excerpt: string | null;
  image: string | null;
  content: string;
  published: boolean;
}

export default function EditPostPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [post, setPost] = useState<Post | null>(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [image, setImage] = useState('');
  const [content, setContent] = useState('');
  const [published, setPublished] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`/api/posts/${id}`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || 'Không thể tải bài viết');
        }

        const p = data.post as Post;
        setPost(p);
        setTitle(p.title || '');
        setCategory(p.category || '');
        setExcerpt(p.excerpt || '');
        setImage(p.image || '');
        setContent(p.content || '');
        setPublished(!!p.published);
      } catch (err: any) {
        setError(err.message || 'Có lỗi xảy ra khi tải bài viết');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPost();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      setError('Tiêu đề và nội dung là bắt buộc.');
      return;
    }

    try {
      setSaving(true);
      setError(null);

      const res = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title.trim(),
          content: content.trim(),
          excerpt: excerpt.trim() || null,
          image: image.trim() || null,
          category: category.trim() || null,
          published,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Không thể cập nhật bài viết');
      }

      router.push('/admin/posts');
    } catch (err: any) {
      setError(err.message || 'Có lỗi xảy ra khi cập nhật bài viết');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Đang tải dữ liệu bài viết...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <p className="text-red-600 mb-4">Không tìm thấy bài viết.</p>
          <button
            type="button"
            onClick={() => router.push('/admin/posts')}
            className="text-sm text-gray-600 hover:text-[#0A3D62]"
          >
            ← Quay lại danh sách
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#0A3D62]">
              Chỉnh sửa bài viết
            </h1>
            <p className="text-gray-600 mt-1 text-sm">
              Cập nhật thông tin bài viết và lưu lại.
            </p>
          </div>
          <button
            type="button"
            onClick={() => router.push('/admin/posts')}
            className="text-sm text-gray-600 hover:text-[#0A3D62]"
          >
            ← Quay lại danh sách
          </button>
        </div>

        {error && (
          <div className="mb-4 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tiêu đề *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0A3D62] focus:border-transparent text-sm"
              placeholder="Nhập tiêu đề bài viết"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Danh mục
              </label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0A3D62] focus:border-transparent text-sm"
                placeholder="Ví dụ: Tin tức, Dự án, ..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ảnh đại diện (URL)
              </label>
              <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0A3D62] focus:border-transparent text-sm"
                placeholder="/images/banner2.png hoặc URL ảnh"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mô tả ngắn
            </label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0A3D62] focus:border-transparent text-sm resize-none"
              placeholder="Tóm tắt ngắn gọn nội dung bài viết..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nội dung *
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={10}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0A3D62] focus:border-transparent text-sm font-mono"
              placeholder="Nhập nội dung bài viết (có thể dùng HTML đơn giản)..."
              required
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <label className="inline-flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
                className="rounded border-gray-300 text-[#0A3D62] focus:ring-[#0A3D62]"
              />
              Xuất bản (hiển thị trên website)
            </label>

            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center justify-center px-5 py-2 rounded-lg bg-[#0A3D62] text-white text-sm font-semibold hover:bg-[#082A47] transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Đang lưu...' : 'Lưu thay đổi'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


