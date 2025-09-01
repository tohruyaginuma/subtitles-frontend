import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { RegisterDialog } from "@/features/auth/register/components/register-dialog";
import { LoginDialog } from "@/features/auth/token/components/login-dialog";
import { LogoutAlert } from "@/features/auth/token/components/logout-alert";
import { SideMenu } from "@/client/components/side-menu";
import { Toaster } from "@/client/components/ui/sonner";
import { AlertInvalidToken } from "@/client/components/alert-invalid-token";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Subtitles",
  description:
    "Real-time subtitles and notes to keep you engaged in conferences.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Subtitles",
    description:
      "Real-time subtitles and notes to keep you engaged in conferences.",
    url: "https://subtitles-frontend-production.up.railway.app/",
    siteName: "Subtitles",
    images: [
      {
        url: "https://subtitles-frontend-production.up.railway.app/og.png",
        width: 1200,
        height: 630,
        alt: "Subtitles OG Image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <main className="relative px-4 pb-16 md:px-6 min-h-screen flex flex-col">
          {children}
        </main>
        <SideMenu />
        <RegisterDialog />
        <LoginDialog />
        <LogoutAlert />
        <Toaster position="top-center" richColors />
        <AlertInvalidToken />
      </body>
    </html>
  );
}
