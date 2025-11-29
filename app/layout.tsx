import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientLayout from "./components/ClientLayout";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Thiên Nhật Minh - Giải pháp điện năng lượng chuyên nghiệp",
  description: "Chuyên cung cấp các giải pháp điện năng lượng, hệ thống trạm biến áp và các dịch vụ kỹ thuật chuyên nghiệp",
  keywords: "điện năng lượng, trạm biến áp, hệ thống điện, thiên nhật minh",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="scroll-smooth">
      <body
        className={`${inter.variable} font-sans antialiased bg-white text-gray-900`}
        suppressHydrationWarning
      >
        <ClientLayout>
        {children}
        </ClientLayout>
      </body>
    </html>
  );
}
