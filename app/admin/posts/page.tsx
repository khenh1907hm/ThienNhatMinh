 'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Post {
  id: string;
  title: string;
  slug: string;
  category: string | null;
  published: boolean;
  created_at: string;
}

export default function AdminPostsPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/posts?published=false');
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Không thể tải danh sách bài viết');
      }

      setPosts(data.posts || []);
    } catch (err: any) {
      setError(err.message || 'Có lỗi xảy ra');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Bạn chắc chắn muốn xóa bài viết này?')) return;
    try {
      setDeletingId(id);
      const res = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Không thể xóa bài viết');
      }
      setPosts((prev) => prev.filter((p) => p.id !== id));
    } catch (err: any) {
      alert(err.message || 'Có lỗi xảy ra khi xóa');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#0A3D62]">
              Quản lý bài viết
            </h1>
            <p className="text-gray-600 mt-1 text-sm">
              Thêm, sửa, xóa bài viết hiển thị trên website.
            </p>
          </div>
          <button
            onClick={() => router.push('/admin/posts/new')}
            className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-[#0A3D62] text-white text-sm font-semibold hover:bg-[#082A47] transition-colors shadow-md"
          >
            + Thêm bài viết
          </button>
        </div>

        {error && (
          <div className="mb-4 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {loading ? (
          <div className="py-10 text-center text-gray-500">Đang tải dữ liệu...</div>
        ) : posts.length === 0 ? (
          <div className="py-10 text-center text-gray-500">
            Chưa có bài viết nào. Hãy bắt đầu bằng cách tạo bài viết mới.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-3 py-2 text-left font-semibold text-gray-700">Tiêu đề</th>
                  <th className="px-3 py-2 text-left font-semibold text-gray-700 hidden md:table-cell">
                    Danh mục
                  </th>
                  <th className="px-3 py-2 text-left font-semibold text-gray-700 hidden md:table-cell">
                    Trạng thái
                  </th>
                  <th className="px-3 py-2 text-left font-semibold text-gray-700 hidden md:table-cell">
                    Ngày tạo
                  </th>
                  <th className="px-3 py-2 text-right font-semibold text-gray-700">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post.id} className="border-t hover:bg-gray-50">
                    <td className="px-3 py-2 align-top">
                      <div className="font-semibold text-gray-900 line-clamp-2">
                        {post.title}
                      </div>
                      <div className="text-xs text-gray-500 mt-1 break-all">
                        slug: {post.slug}
                      </div>
                    </td>
                    <td className="px-3 py-2 align-top text-gray-700 hidden md:table-cell">
                      {post.category || '-'}
                    </td>
                    <td className="px-3 py-2 align-top hidden md:table-cell">
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          post.published
                            ? 'bg-green-50 text-green-700 border border-green-200'
                            : 'bg-yellow-50 text-yellow-700 border border-yellow-200'
                        }`}
                      >
                        {post.published ? 'Đã xuất bản' : 'Nháp'}
                      </span>
                    </td>
                    <td className="px-3 py-2 align-top text-xs text-gray-500 hidden md:table-cell">
                      {post.created_at
                        ? new Date(post.created_at).toLocaleString('vi-VN')
                        : '-'}
                    </td>
                    <td className="px-3 py-2 align-top">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => router.push(`/admin/posts/${post.id}`)}
                          className="px-3 py-1 rounded-md border border-gray-300 text-xs text-gray-700 hover:bg-gray-100"
                        >
                          Sửa
                        </button>
                        <button
                          onClick={() => handleDelete(post.id)}
                          disabled={deletingId === post.id}
                          className="px-3 py-1 rounded-md border border-red-300 text-xs text-red-700 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {deletingId === post.id ? 'Đang xóa...' : 'Xóa'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}


