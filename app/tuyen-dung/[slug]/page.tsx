'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { use } from 'react';
import Image from 'next/image';
import { useI18n } from '../../i18n/context';
import ScrollAnimation from '../../components/ScrollAnimation';

interface Position {
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

export default function RecruitmentDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { t } = useI18n();
  const router = useRouter();
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  
  const [position, setPosition] = useState<Position | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // CV Form state
  const [cvFormData, setCvFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    if (slug) {
      fetchPosition();
    }
  }, [slug]);

  const fetchPosition = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`/api/posts/${slug}?by=slug`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Không thể tải thông tin tuyển dụng');
      }

      if (!data.post || !data.post.published) {
        throw new Error('Vị trí tuyển dụng không tồn tại hoặc chưa được xuất bản');
      }

      // Kiểm tra category phải là "Tuyển dụng"
      if (data.post.category !== 'Tuyển dụng') {
        throw new Error('Trang không hợp lệ');
      }

      setPosition(data.post);
    } catch (err) {
      console.error('Error fetching position:', err);
      setError(err instanceof Error ? err.message : 'Có lỗi xảy ra khi tải thông tin tuyển dụng');
    } finally {
      setLoading(false);
    }
  };

  const handleCvFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      if (file.type !== 'application/pdf') {
        setSubmitError('Chỉ chấp nhận file PDF');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setSubmitError('File CV không được vượt quá 5MB');
        return;
      }
      setCvFile(file);
      setSubmitError(null);
    }
  };

  const handleSubmitCv = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!cvFile) {
      setSubmitError('Vui lòng chọn file CV (PDF)');
      return;
    }

    if (!cvFormData.name || !cvFormData.email) {
      setSubmitError('Vui lòng điền đầy đủ thông tin bắt buộc');
      return;
    }

    if (!position) return;

    try {
      setSubmitting(true);
      setSubmitError(null);

      const formData = new FormData();
      formData.append('name', cvFormData.name);
      formData.append('email', cvFormData.email);
      formData.append('phone', cvFormData.phone);
      formData.append('message', cvFormData.message);
      formData.append('positionId', position.id);
      formData.append('positionTitle', position.title);
      formData.append('cvFile', cvFile);

      const res = await fetch('/api/submit-cv', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Không thể gửi CV');
      }

      setSubmitSuccess(true);
      // Reset form
      setCvFormData({ name: '', email: '', phone: '', message: '' });
      setCvFile(null);
    } catch (err) {
      console.error('CV submission error:', err);
      setSubmitError(err instanceof Error ? err.message : 'Có lỗi xảy ra khi gửi CV');
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
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
          <p className="text-gray-600">Đang tải thông tin tuyển dụng...</p>
        </div>
      </div>
    );
  }

  if (error || !position) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || 'Vị trí tuyển dụng không tồn tại'}</p>
          <button
            onClick={() => router.push('/tuyen-dung')}
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
              onClick={() => router.push('/tuyen-dung')}
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
              Quay lại danh sách tuyển dụng
            </button>
            
            <span className="px-3 py-1 bg-[#0A3D62] text-white text-sm font-semibold rounded-full mb-4 inline-block">
              {t.recruitment.openPositions}
            </span>
            
            <h1 className="text-4xl md:text-5xl font-bold text-[#0A3D62] mb-4">
              {position.title}
            </h1>
            
            {position.excerpt && (
              <p className="text-xl text-gray-600 mb-6">{position.excerpt}</p>
            )}
            
            <div className="flex items-center text-gray-500 text-sm">
              <span>Ngày đăng: {formatDate(position.created_at)}</span>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation direction="up" delay={100}>
            {position.image && (
              <div className="relative h-96 w-full mb-8 rounded-xl overflow-hidden">
                <Image
                  src={position.image || '/images/logo-Thien-Nhat-Minh-Co.-Ltd.-moi-ko-nen-2048x928.png'}
                  alt={position.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            
            <div 
              className="prose prose-lg max-w-none mb-12"
              dangerouslySetInnerHTML={{ __html: position.content }}
              style={{
                color: '#374151',
                lineHeight: '1.75',
              }}
            />
          </ScrollAnimation>
        </div>
      </section>

      {/* CV Application Form */}
      <section className="py-12 bg-gradient-to-br from-[#E1E2E5] to-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation direction="up" delay={200}>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-[#0A3D62] mb-6 text-center">
                Ứng tuyển cho vị trí: {position.title}
              </h2>

              {submitSuccess ? (
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">✅</div>
                  <h3 className="text-xl font-semibold text-green-600 mb-2">
                    Gửi CV thành công!
                  </h3>
                  <p className="text-gray-600 mb-6">
                    CV của bạn đã được gửi. Chúng tôi sẽ liên hệ với bạn sớm nhất có thể.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitSuccess(false);
                      setCvFormData({ name: '', email: '', phone: '', message: '' });
                      setCvFile(null);
                    }}
                    className="px-6 py-2 bg-[#0A3D62] text-white rounded-lg font-semibold hover:bg-[#082A47]"
                  >
                    Gửi CV khác
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmitCv} className="space-y-6">
                  {submitError && (
                    <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                      {submitError}
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Họ và tên *
                    </label>
                    <input
                      type="text"
                      value={cvFormData.name}
                      onChange={(e) => setCvFormData({ ...cvFormData, name: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0A3D62] focus:border-transparent"
                      placeholder="Nhập họ và tên"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={cvFormData.email}
                      onChange={(e) => setCvFormData({ ...cvFormData, email: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0A3D62] focus:border-transparent"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Số điện thoại
                    </label>
                    <input
                      type="tel"
                      value={cvFormData.phone}
                      onChange={(e) => setCvFormData({ ...cvFormData, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0A3D62] focus:border-transparent"
                      placeholder="0123456789"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      File CV (PDF) *
                    </label>
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={handleCvFileChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0A3D62] focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-[#0A3D62] file:text-white hover:file:bg-[#082A47] cursor-pointer"
                      required
                    />
                    {cvFile && (
                      <p className="mt-2 text-sm text-gray-600">
                        Đã chọn: {cvFile.name} ({(cvFile.size / 1024 / 1024).toFixed(2)} MB)
                      </p>
                    )}
                    <p className="mt-1 text-xs text-gray-500">
                      Chỉ chấp nhận file PDF, tối đa 5MB
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Lời nhắn (tùy chọn)
                    </label>
                    <textarea
                      value={cvFormData.message}
                      onChange={(e) => setCvFormData({ ...cvFormData, message: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0A3D62] focus:border-transparent resize-none"
                      placeholder="Nhập lời nhắn của bạn..."
                    />
                  </div>

                  <div className="flex gap-3 justify-end pt-4">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="px-8 py-3 rounded-lg bg-[#0A3D62] text-white hover:bg-[#082A47] font-semibold disabled:opacity-50 transition-all"
                    >
                      {submitting ? 'Đang gửi...' : '📄 Gửi CV'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Back to list */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation direction="up" delay={300}>
            <button
              onClick={() => router.push('/tuyen-dung')}
              className="px-6 py-3 bg-[#0A3D62] text-white rounded-lg font-semibold hover:bg-[#082A47] transition-all"
            >
              ← Quay lại danh sách tuyển dụng
            </button>
          </ScrollAnimation>
        </div>
      </section>
    </div>
  );
}

