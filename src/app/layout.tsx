import CursorGlow from "@/components/ui/CursorGlow";
import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
  openGraph: {
    title: "Фронтенд-разработка | React, Next.js | SEO",
    description:
      "Разрабатываю современные веб-интерфейсы, SaaS-приложения и лендинги с SEO. Помогу упаковать ваш бизнес в качественный фронтенд.",
    url: "https://web-craft-falkone.ru",
    siteName: "WebCraft",
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Фронтенд-разработка | React, Next.js | SEO",
    description:
      "Создаю продающие интерфейсы и веб-приложения на React и Next.js. SEO, адаптивность, интеграции.",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/icons/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head />
      <body className={`${inter.variable} ${geistMono.variable}`}>
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
