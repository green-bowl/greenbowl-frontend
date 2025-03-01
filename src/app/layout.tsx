import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import AuthSession from "@/providers/AuthSession";
import Alert from "@/components/alert/Alert";
import FullscreenModal from "@/components/fullscreenModal/FullscreenModal";

const myFont = localFont({
  src: [
    {
      path: "../fonts/SpoqaHanSansNeo-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/SpoqaHanSansNeo-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/SpoqaHanSansNeo-Regular.otf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-spoqa",
});

export const metadata: Metadata = {
  title: "메인",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${myFont.className} antialiased overflow-x-hidden  relative`}
      >
        <AuthSession>
          <div className="fixed inset-0 bg-black  z-0"></div>
          <div className="  flex justify-center items-center z-30">
            <div className="w-full max-w-[37.5rem] min-h-screen mx-auto relative text-content-secondary z-40 bg-white">
              <div>{children}</div>
            </div>
          </div>
          <Alert />
          <FullscreenModal />
        </AuthSession>
      </body>
    </html>
  );
}
