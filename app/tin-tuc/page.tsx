'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useI18n } from '../i18n/context';
import ScrollAnimation from '../components/ScrollAnimation';

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

export default function NewsPage() {
  const { t } = useI18n();
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/posts?published=true');
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Không thể tải bài viết');
      }

      setPosts(data.posts || []);
    } catch (err) {
      console.error('Error fetching posts:', err);
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

  const getDefaultImage = () => '/images/logo-Thien-Nhat-Minh-Co.-Ltd.-moi-ko-nen-2048x928.png';

  // Featured post (first post)
  const featuredPost = posts[0];
  const otherPosts = posts.slice(1, 3);
  const gridPosts = posts;

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

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={fetchPosts}
            className="px-4 py-2 bg-[#0A3D62] text-white rounded-lg hover:bg-[#082A47]"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 text-lg">Chưa có bài viết nào được xuất bản.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Featured News */}
      {featuredPost && (
        <section className="py-8 md:py-12 bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
              <div className="lg:col-span-2">
                <ScrollAnimation direction="up" delay={0}>
                  <div 
                    className="bg-gradient-to-br from-[#E1E2E5] to-white rounded-xl overflow-hidden border border-gray-200 cursor-pointer hover:shadow-xl transition-all"
                    onClick={() => router.push(`/tin-tuc/${featuredPost.slug}`)}
                  >
                    <div className="relative h-64 w-full">
                      <Image
                        src={featuredPost.image || getDefaultImage()}
                        alt={featuredPost.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4 md:p-8">
                      {featuredPost.category && (
                        <span className="px-3 py-1 bg-[#0A3D62] text-white text-xs md:text-sm font-semibold rounded-full mb-3 md:mb-4 inline-block">
                          {featuredPost.category}
                        </span>
                      )}
                      <h2 className="text-2xl md:text-3xl font-bold text-[#0A3D62] mb-3 md:mb-4">
                        {featuredPost.title}
                      </h2>
                      <p className="text-gray-600 mb-6">
                        {featuredPost.excerpt || featuredPost.content.substring(0, 150) + '...'}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500 text-sm">
                          {formatDate(featuredPost.created_at)}
                        </span>
                        <button className="text-[#0A3D62] font-semibold hover:text-[#082A47] inline-flex items-center">
                          {t.news.readMore}
                          <svg
                            className="w-5 h-5 ml-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </ScrollAnimation>
              </div>
              <div className="space-y-6">
                {otherPosts.map((post, index) => (
                  <ScrollAnimation key={post.id} direction="up" delay={(index + 1) * 100}>
                    <div 
                      className="bg-gradient-to-br from-gray-50 to-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer"
                      onClick={() => router.push(`/tin-tuc/${post.slug}`)}
                    >
                      <div className="relative h-32 w-full">
                        <Image
                          src={post.image || getDefaultImage()}
                          alt={post.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="flex-1">
                            {post.category && (
                              <span className="text-xs text-[#0A3D62] font-semibold">
                                {post.category}
                              </span>
                            )}
                            <h3 className="text-lg font-semibold text-[#0A3D62] mt-1 mb-2">
                              {post.title}
                            </h3>
                            <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                              {post.excerpt || post.content.substring(0, 100) + '...'}
                            </p>
                            <span className="text-xs text-gray-500">
                              {formatDate(post.created_at)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </ScrollAnimation>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* News Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation direction="up" delay={0}>
            <h2 className="text-2xl md:text-3xl font-bold text-[#0A3D62] mb-6 md:mb-8">{t.news.allNews}</h2>
          </ScrollAnimation>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {gridPosts.map((post, index) => (
              <ScrollAnimation key={post.id} direction="up" delay={index * 100}>
                <article 
                  className="bg-gradient-to-br from-white to-gray-50 rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 cursor-pointer"
                  onClick={() => router.push(`/tin-tuc/${post.slug}`)}
                >
                  <div className="relative h-48 w-full">
                    <Image
                      src={post.image || getDefaultImage()}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      {post.category && (
                        <span className="px-3 py-1 bg-[#E1E2E5] text-[#0A3D62] text-xs font-semibold rounded-full">
                          {post.category}
                        </span>
                      )}
                      <span className="text-xs text-gray-500">
                        {formatDate(post.created_at)}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-[#0A3D62] mb-3">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt || post.content.substring(0, 150) + '...'}
                    </p>
                    <button className="text-[#0A3D62] font-semibold hover:text-[#082A47] inline-flex items-center text-sm">
                      {t.news.readMore}
                      <svg
                        className="w-4 h-4 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </div>
                </article>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
