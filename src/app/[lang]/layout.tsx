import { Footer, Navbar } from "@/components";
import "./globals.scss";
import "./globalCSS.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextAuthSessionProvider } from "@/components/nextauthProvider";
import Script from "next/script";
import NextTopLoader from "nextjs-toploader";
import { getDictionary } from "@/dictionary";
import { FullLocaleNames, Locale } from "@/types/dictionary-types";
import { locales } from "@/middleware";
import { getHome } from "@/services/contactService";

const inter = Inter({ subsets: ["latin"] });

// export async function generateStaticParams() {
//   return locales.map((locale) => ({
//     lang: locale,
//   }));
// }

const getHomeData = async (lang: Locale) => {
  const homeDataReq = await getHome(FullLocaleNames[lang]);
  const homeDataRes = await homeDataReq.json();
  return homeDataRes;
};

export async function generateMetadata({
  params: { lang },
}: {
  params: { lang: Locale };
}): Promise<Metadata> {
  const homeData = await getHomeData(lang);
  return {
    title: "MediaVerse",
    description: homeData.description,
    keywords: homeData.keywords,
    openGraph: {
      description: homeData.description,
      images: `${process.env.NEXTAUTH_URL}/images/media-verse-logo.png`,
    },
  };
}

export default async function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  const dic = await getDictionary(
    locales.find((item) => item === lang) ?? locales[0]
  );
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
