import type { Metadata, Viewport } from "next";
import { Playfair_Display, Lora, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin", "vietnamese"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const lora = Lora({
  variable: "--font-body",
  subsets: ["latin", "vietnamese"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F9F6F0" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1a2e" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://contimkhatkhao.vercel.app"),
  title: "Con tim khát khao — Người của Chúa, Người cho mọi người",
  description:
    "Báo cáo nghiên cứu: Chiều kích Hữu thể học và Thực hành Mục vụ qua chủ đề Con tim khát khao — Linh đạo I-nhã và Dòng Tên Việt Nam",
  keywords: ["Linh đạo I-nhã", "Dòng Tên", "Công giáo", "Thần học", "Mục vụ", "Con tim khát khao"],
  authors: [{ name: "Nhà Ứng Sinh Dòng Tên Việt Nam" }],
  openGraph: {
    title: "Con tim khát khao — Người của Chúa, Người cho mọi người",
    description: "Báo cáo nghiên cứu thần học và mục vụ về Linh đạo I-nhã tại Dòng Tên Việt Nam.",
    type: "article",
    authors: ["Nhà Ứng Sinh Dòng Tên Việt Nam"],
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Con tim khát khao - Người của Chúa, Người cho mọi người",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Con tim khát khao — Người của Chúa",
    description: "Báo cáo nghiên cứu: Chiều kích Hữu thể học và Thực hành Mục vụ qua chủ đề Con tim khát khao",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const schemaOrg = {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    "headline": "Con tim khát khao - Người của Chúa, Người cho mọi người",
    "author": {
      "@type": "Organization",
      "name": "Nhà Ứng Sinh Dòng Tên Việt Nam"
    },
    "description": "Báo cáo nghiên cứu: Chiều kích Hữu thể học và Thực hành Mục vụ qua chủ đề Con tim khát khao — Linh đạo I-nhã và Dòng Tên Việt Nam",
    "inLanguage": "vi-VN",
  };

  return (
    <html
      lang="vi"
      className={`${playfair.variable} ${lora.variable} ${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Prevent FOUC for dark mode and font size */}
        <Script
          id="theme-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.getItem('theme') === 'dark' ||
                    (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                }
                const savedSize = localStorage.getItem('proseFontSize');
                if (savedSize) {
                  document.documentElement.style.setProperty('--prose-font-size', savedSize);
                }
              } catch (_) {}
            `,
          }}
        />
        <Script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300">
        {children}
      </body>
    </html>
  );
}
