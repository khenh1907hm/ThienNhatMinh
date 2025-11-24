'use client';

import { useState } from 'react';
import { useI18n } from '../i18n/context';
import ScrollAnimation from '../components/ScrollAnimation';

export default function ContactPage() {
  const { t } = useI18n();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert(t.contact.thankYou);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen">
      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <ScrollAnimation direction="up" delay={0}>
                <h2 className="text-3xl font-bold text-[#0A3D62] mb-6">
                  {t.contact.sendMessage}
                </h2>
              </ScrollAnimation>
              <form onSubmit={handleSubmit} className="space-y-6">
                <ScrollAnimation direction="up" delay={100}>
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      {t.contact.fullName} *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0A3D62] focus:border-transparent transition-all"
                      placeholder={t.contact.fullNamePlaceholder}
                    />
                  </div>
                </ScrollAnimation>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ScrollAnimation direction="up" delay={200}>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        {t.contact.email} *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0A3D62] focus:border-transparent transition-all"
                        placeholder={t.contact.emailPlaceholder}
                      />
                    </div>
                  </ScrollAnimation>
                  <ScrollAnimation direction="up" delay={300}>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        {t.contact.phone} *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0A3D62] focus:border-transparent transition-all"
                        placeholder={t.contact.phonePlaceholder}
                      />
                    </div>
                  </ScrollAnimation>
                </div>
                <ScrollAnimation direction="up" delay={400}>
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      {t.contact.subject} *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0A3D62] focus:border-transparent transition-all"
                    >
                      <option value="">{t.contact.selectSubject}</option>
                      <option value="service">{t.contact.serviceConsulting}</option>
                      <option value="project">{t.contact.projectConsulting}</option>
                      <option value="recruitment">{t.contact.recruitment}</option>
                      <option value="other">{t.contact.other}</option>
                    </select>
                  </div>
                </ScrollAnimation>
                <ScrollAnimation direction="up" delay={500}>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      {t.contact.message} *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0A3D62] focus:border-transparent transition-all resize-none"
                      placeholder={t.contact.messagePlaceholder}
                    />
                  </div>
                </ScrollAnimation>
                <ScrollAnimation direction="up" delay={600}>
                  <button
                    type="submit"
                    className="w-full px-8 py-4 bg-[#0A3D62] text-white rounded-lg font-semibold hover:bg-[#082A47] transform hover:scale-105 transition-all duration-200 shadow-lg"
                  >
                    {t.contact.send}
                  </button>
                </ScrollAnimation>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <ScrollAnimation direction="up" delay={0}>
                <h2 className="text-3xl font-bold text-[#0A3D62] mb-6">
                  {t.contact.contactInfo}
                </h2>
              </ScrollAnimation>
              <div className="space-y-8">
                <ScrollAnimation direction="up" delay={100}>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-[#E1E2E5] rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-[#0A3D62]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[#0A3D62] mb-1">
                        {t.contact.address}
                      </h3>
                      <p className="text-gray-600">
                        123 Đường ABC, Quận XYZ
                        <br />
                        Hà Nội, Việt Nam
                      </p>
                    </div>
                  </div>
                </ScrollAnimation>

                <ScrollAnimation direction="up" delay={200}>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-[#E1E2E5] rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-[#0A3D62]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[#0A3D62] mb-1">
                        {t.contact.phone}
                      </h3>
                      <p className="text-gray-600">
                        <a href="tel:+842412345678" className="hover:text-[#0A3D62]">
                          +84 24 1234 5678
                        </a>
                        <br />
                        <a href="tel:+84901234567" className="hover:text-[#0A3D62]">
                          +84 90 123 4567
                        </a>
                      </p>
                    </div>
                  </div>
                </ScrollAnimation>

                <ScrollAnimation direction="up" delay={300}>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-[#E1E2E5] rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-[#0A3D62]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[#0A3D62] mb-1">
                        {t.contact.email}
                      </h3>
                      <p className="text-gray-600">
                        <a
                          href="mailto:info@thiennhatminh.com"
                          className="hover:text-[#0A3D62]"
                        >
                          info@thiennhatminh.com
                        </a>
                        <br />
                        <a
                          href="mailto:support@thiennhatminh.com"
                          className="hover:text-[#0A3D62]"
                        >
                          support@thiennhatminh.com
                        </a>
                      </p>
                    </div>
                  </div>
                </ScrollAnimation>

                <ScrollAnimation direction="up" delay={400}>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-[#E1E2E5] rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-[#0A3D62]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[#0A3D62] mb-1">
                        {t.contact.workingHours}
                      </h3>
                      <p className="text-gray-600 whitespace-pre-line">
                        {t.contact.workingHoursText}
                      </p>
                    </div>
                  </div>
                </ScrollAnimation>
              </div>

              {/* Map Placeholder */}
              <ScrollAnimation direction="up" delay={500}>
                <div className="mt-8 rounded-xl overflow-hidden border border-gray-200">
                  <div className="aspect-video bg-gradient-to-br from-[#E1E2E5] to-gray-200 flex items-center justify-center">
                    <p className="text-gray-500">{t.contact.mapPlaceholder}</p>
                  </div>
                </div>
              </ScrollAnimation>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
