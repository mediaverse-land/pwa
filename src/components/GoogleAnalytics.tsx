"use client";

import { GTM_ID } from "@/data";
import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";
import React, { useEffect } from "react";

export const pageview = (GA_MEASUREMENT_ID: string, url: string) => {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("config", GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};

const GoogleTagManager = ({}) => {
  const pagePath = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // if (process.env.NEXT_PUBLIC_VERCEL_ENV !== "production") return;
    const url = pagePath + searchParams.toString();
    pageview(GTM_ID, url);
  }, [pagePath, searchParams, GTM_ID]);

  // if (process.env.NEXT_PUBLIC_VERCEL_ENV !== "production") {
  //   return null;
  // }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GTM_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('consent', 'default', {
                    'analytics_storage': 'denied',
                    'ad_storage': 'denied',
                    'analytics_storage': 'denied',
                    'functionality_storage': 'denied',
                    'personalization_storage': 'denied',
                    'security_storage': 'denied'
                });
                
                gtag('config', '${GTM_ID}', {
                    page_path: window.location.pathname,
                });
                `,
        }}
      />
    </>
  );
};

export default GoogleTagManager;
