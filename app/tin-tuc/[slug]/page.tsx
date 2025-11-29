'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { use } from 'react';
import Image from 'next/image';
import { useI18n } from '../../i18n/context';
import ScrollAnimation from '../../components/ScrollAnimation';

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
  updated_at: string;
}

export default function PostDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { t } = useI18n();
  const router = useRouter();
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (slug) {
      fetchPost();
    }
  }, [slug]);

  const fetchPost = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`/api/posts/${slug}?by=slug`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Không thể tải bài viết');
      }

      if (!data.post || !data.post.published) {
        throw new Error('Bài viết không tồn tại hoặc chưa được xuất bản');
      }

      setPost(data.post);
    } catch (err) {
      console.error('Error fetching post:', err);
      setError(err instanceof Error ? err.message : 'Có lỗi xảy ra khi tải bài viết');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      // Ensure consistent formatting to avoid hydration mismatch
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    } catch {
      return dateString;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0A3D62] mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải bài viết...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || 'Bài viết không tồn tại'}</p>
          <button
            onClick={() => router.push('/tin-tuc')}
            className="px-4 py-2 bg-[#0A3D62] text-white rounded-lg hover:bg-[#082A47]"
          >
            Quay lại danh sách
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="py-12 bg-gradient-to-br from-[#E1E2E5] to-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation direction="up" delay={0}>
            <button
              onClick={() => router.push('/tin-tuc')}
              className="text-[#0A3D62] hover:text-[#082A47] inline-flex items-center mb-6"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Quay lại danh sách
            </button>
            
            {post.category && (
              <span className="px-3 py-1 bg-[#0A3D62] text-white text-sm font-semibold rounded-full mb-4 inline-block">
                {post.category}
              </span>
            )}
            
            <h1 className="text-4xl md:text-5xl font-bold text-[#0A3D62] mb-4">
              {post.title}
            </h1>
            
            {post.excerpt && (
              <p className="text-xl text-gray-600 mb-6">{post.excerpt}</p>
            )}
            
            <div className="flex items-center text-gray-500 text-sm">
              <span>{formatDate(post.created_at)}</span>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation direction="up" delay={100}>
            <div className="relative h-96 w-full mb-8 rounded-xl overflow-hidden">
              <Image
                src={post.image || '/images/logo-Thien-Nhat-Minh-Co.-Ltd.-moi-ko-nen-2048x928.png'}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
            
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
              style={{
                color: '#374151',
                lineHeight: '1.75',
              }}
            />
          </ScrollAnimation>
        </div>
      </section>

      {/* Back to list */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation direction="up" delay={200}>
            <button
              onClick={() => router.push('/tin-tuc')}
              className="px-6 py-3 bg-[#0A3D62] text-white rounded-lg font-semibold hover:bg-[#082A47] transition-all"
            >
              ← Quay lại danh sách bài viết
            </button>
          </ScrollAnimation>
        </div>
      </section>
    </div>
  );
}

