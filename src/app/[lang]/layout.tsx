import { Footer, Navbar } from "@/components";
import { NextAuthSessionProvider } from "@/components/nextauthProvider";
import { Toaster } from "@/components/ui/toaster";
import { getDictionary } from "@/dictionary";
import { locales } from "@/middleware";
import { getHome } from "@/services/contactService";
import { FullLocaleNames, Locale } from "@/types/dictionary-types";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import "./globalCSS.css";
import "./globals.scss";
import { GTM_ID } from "@/data";
import GTMConsent from "@/components/shared/GTMConsent";
import GoogleTagManager from "@/components/GoogleAnalytics";
import Script from "next/script";
import { logoURL, websiteTitle } from "@/configs/base";
const inter = Inter({ subsets: ["latin"] });

// export async function generateStaticParams() {
//   return locales.map((locale) => ({
//     lang: locale,
//   }));
// }

const getHomeData = async (lang: Locale) => {
  const homeDataReq = await getHome(FullLocaleNames[lang]);
  return await homeDataReq.json();
};

export async function generateMetadata({
  params: { lang },
}: {
  params: { lang: Locale };
}): Promise<Metadata> {
  const homeData = await getHomeData(lang);
  return {
    title: websiteTitle,
    description: homeData.description,
    keywords: homeData.keywords,
    openGraph: {
      description: homeData.description,
      images: `${process.env.NEXTAUTH_URL}${logoURL}`,
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
    <html lang={`${lang}`} dir={["fa", "ar"].includes(lang) ? "rtl" : "ltr"}>
      <Script id="google-tag-manager" strategy="afterInteractive">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${GTM_ID}');
          `}
      </Script>
      <body
        className={`${inter.className} min-h-screen flex flex-col justify-between [&_>_*:nth-child(2)]:grow`}
      >
        <NextTopLoader showSpinner={false} />
        <NextAuthSessionProvider>
          <Navbar dic={dic} />
          {children}
          <Footer title={dic.footer.copyright} lang={lang}/>
        </NextAuthSessionProvider>
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}" height="0" width="0" style="display: none; visibility: hidden;"></iframe>`,
          }}
        />
        <GoogleTagManager />
        <Toaster />
        <GTMConsent />
      </body>
    </html>
  );
}
