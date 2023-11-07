import { Footer, Navbar } from "@/components";
import "./globals.scss";
import "./globalCSS.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextAuthSessionProvider } from "@/components/nextauthProvider";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MediaVerse",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-667BH3TKMH"
      ></Script>
      <Script>
        {`window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-667BH3TKMH');`}
      </Script>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <NextAuthSessionProvider>
          <Navbar />
          {children}
          <Footer />
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
