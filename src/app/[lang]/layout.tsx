import { Footer, Navbar } from "@/components";
import "./globals.scss";
import "./globalCSS.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextAuthSessionProvider } from "@/components/nextauthProvider";
import Script from "next/script";
import NextTopLoader from "nextjs-toploader";
import { getDictionary } from "@/dictionary";
import { Locale } from "@/types/dictionary-types";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MediaVerse",
};

export default async function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  const dic = await getDictionary(lang);
  return (
    <html lang={`${lang}`}>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=GTM-WPLNXH7D"
      ></Script>
      <Script>
        {`window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GTM-WPLNXH7D');`}
      </Script>
      <body
        className={`${inter.className} min-h-screen flex flex-col justify-between [&_>_*:nth-child(2)]:grow`}
      >
        <NextTopLoader showSpinner={false} />
        <NextAuthSessionProvider>
          <Navbar dic={dic} />
          {children}
          <Footer title={dic.footer.haveNotTriedTheAppYet} />
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
