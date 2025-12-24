'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useI18n } from '../i18n/context';
import ScrollAnimation from '../components/ScrollAnimation';

interface Project {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  image: string | null;
  content: string;
  project_type: string | null;
  created_at: string;
}

export default function ProjectsPage() {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState('featured');
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`/api/posts?category=${encodeURIComponent('Dự án')}&published=true`);
        const data = await res.json();
        
        if (!res.ok) {
          throw new Error(data.error || 'Không thể tải danh sách dự án');
        }

        setProjects(data.posts || []);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError(err instanceof Error ? err.message : 'Có lỗi xảy ra khi tải dự án');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Filter projects theo loại dự án dựa trên activeTab
  const getProjectsByTab = () => {
    if (!activeTab || activeTab === 'featured') {
      // Dự án tiêu biểu
      return projects.filter((p) => p.project_type === 'tieu-bieu');
    } else if (activeTab === 'inProgress') {
      // Dự án đang thực hiện
      return projects.filter((p) => p.project_type === 'dang-thuc-hien');
    } else if (activeTab === 'completed') {
      // Dự án đã thực hiện
      return projects.filter((p) => p.project_type === 'da-thuc-hien');
    }
    return [];
  };

  return (
    <div className="min-h-screen">
      {/* Tabs Section */}
      <section className="py-6 md:py-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 md:gap-4 justify-center">
            <button
              onClick={() => setActiveTab('featured')}
              className={`px-4 md:px-6 py-2 md:py-3 rounded-lg text-sm md:text-base font-semibold transition-all duration-200 ${
                activeTab === 'featured'
                  ? 'bg-[#0A3D62] text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {t.home.featuredProjects}
            </button>
            <button
              onClick={() => setActiveTab('inProgress')}
              className={`px-4 md:px-6 py-2 md:py-3 rounded-lg text-sm md:text-base font-semibold transition-all duration-200 ${
                activeTab === 'inProgress'
                  ? 'bg-[#0A3D62] text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {t.home.inProgressProjects}
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`px-4 md:px-6 py-2 md:py-3 rounded-lg text-sm md:text-base font-semibold transition-all duration-200 ${
                activeTab === 'completed'
                  ? 'bg-[#0A3D62] text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {t.home.completedProjects}
            </button>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">Đang tải danh sách dự án...</p>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-red-500 text-lg">{error}</p>
            </div>
          ) : getProjectsByTab().length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {getProjectsByTab().map((project, index) => (
                <ScrollAnimation key={project.id} direction="up" delay={index * 50}>
                  <Link href={`/du-an/${project.slug}`}>
                    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-[#0A3D62] flex flex-col h-full cursor-pointer">
                      <div className="relative w-full h-32 mb-4">
                        <Image
                          src={project.image || '/images/bannner-1.jpg'}
                          alt={project.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="px-4 pb-4 text-center flex-1 flex flex-col">
                        <h3 className="text-base font-semibold text-[#0A3D62] mb-2 line-clamp-2">
                          {project.title}
                        </h3>
                        {project.excerpt && (
                          <p className="text-sm text-gray-600 line-clamp-2 mt-auto">
                            {project.excerpt}
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>
                </ScrollAnimation>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">
                {activeTab === 'featured' && 'Chưa có dự án tiêu biểu'}
                {activeTab === 'inProgress' && 'Chưa có dự án đang thực hiện'}
                {activeTab === 'completed' && 'Chưa có dự án đã thực hiện'}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-[#0A3D62] to-[#082A47] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: '500+', label: t.projects.projectsCompleted },
              { number: '200+', label: t.projects.satisfiedClients },
              { number: '98%', label: t.projects.successRate },
              { number: '15+', label: t.projects.yearsExperience },
            ].map((stat, index) => (
              <ScrollAnimation key={index} direction="up" delay={index * 100}>
                <div>
                  <div className="text-5xl font-bold mb-2">{stat.number}</div>
                  <div className="text-gray-200">{stat.label}</div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
