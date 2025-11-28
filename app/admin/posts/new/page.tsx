 'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewPostPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [image, setImage] = useState('');
  const [content, setContent] = useState('');
  const [published, setPublished] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      setError('Tiêu đề và nội dung là bắt buộc.');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const res = await fetch('/api/posts', {
        method: 'POST',
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
        throw new Error(data.error || 'Không thể tạo bài viết');
      }

      // Quay lại danh sách
      router.push('/admin/posts');
    } catch (err: any) {
      setError(err.message || 'Có lỗi xảy ra khi tạo bài viết');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#0A3D62]">
              Thêm bài viết mới
            </h1>
            <p className="text-gray-600 mt-1 text-sm">
              Nhập nội dung bài viết sau đó lưu lại.
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
              Xuất bản ngay (hiển thị trên website)
            </label>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center px-5 py-2 rounded-lg bg-[#0A3D62] text-white text-sm font-semibold hover:bg-[#082A47] transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Đang lưu...' : 'Lưu bài viết'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


