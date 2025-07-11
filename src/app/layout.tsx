import "./globals.css";
import CursorGlow from "@/components/ui/CursorGlow";
import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Фронтенд-разработка | React, Next.js | SEO",
  description:
    "Создаю интерфейсы, SaaS, лендинги и дашборды. Ваш фронтенд под ключ: от идеи до поддержки. SEO, визуал, код — всё работает и продаёт.",
  keywords: [
    "фронтенд разработка",
    "создание сайтов",
    "React",
    "Next.js",
    "TypeScript",
    "SEO оптимизация",
    "веб разработка",
    "дашборды",
    "SaaS",
    "адаптивная верстка",
  ],
  metadataBase: new URL("https://web-craft-falkone.ru"),
  authors: [{ name: "Aleksandr Falkone", url: "https://web-craft-falkone.ru" }],
  creator: "Aleksandr Falkone",
  icons: {
    icon: "/favicon.ico",
    apple: "/icons/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Фронтенд-разработка | React, Next.js | SEO",
    description:
      "Разрабатываю современные веб-интерфейсы, SaaS-приложения и лендинги с SEO. Помогу упаковать ваш бизнес в качественный фронтенд.",
    url: "https://web-craft-falkone.ru",
    siteName: "WebCraft",
    locale: "ru_RU",
    type: "website",
    images: [
      {
        url: "/icons/og-cover.png",
        width: 1200,
        height: 630,
        alt: "Фронтенд-разработка | React, Next.js | SEO",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Фронтенд-разработка | React, Next.js | SEO",
    description:
      "Создаю продающие интерфейсы и веб-приложения на React и Next.js. SEO, адаптивность, интеграции.",
    images: ["/icons/og-cover.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={`${inter.variable} ${geistMono.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="image_src" href="/icons/og-cover.png" />
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />

        {/* Telegram/VK preview fallback */}
        <meta property="og:image" content="/icons/og-cover.png" />
        <meta name="vk:image" content="/icons/og-cover.png" />
        <meta name="telegram:image" content="/icons/og-cover.png" />
      </head>
      <body>
        <CursorGlow />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        {children}
      </body>
    </html>
  );
}
