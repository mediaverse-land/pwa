"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

const GTMConsent = () => {
  const params = useParams();
  const [isShowable, setIsShowAble] = useState(true);
  // (function (w: Window, d: Document, s: string, l: string, i: string) {
  //   // @ts-ignore
  //   w[l] = w[l] || [];
  //   // @ts-ignore
  //   w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
  //   // @ts-ignore
  //   let f: HTMLScriptElement | null = d.getElementsByTagName(s)[0];
  //   let j: HTMLScriptElement = d.createElement(s) as HTMLScriptElement;
  //   let dl: string = l !== "dataLayer" ? "&l=" + l : "";
  //   j.async = true;
  //   j.src = `https://www.googletagmanager.com/gtm.js?id=${i}${dl}`;
  //   f?.parentNode?.insertBefore(j, f);
  // })(window, document, "script", "dataLayer", GTM_ID);
  return (
    <>
      {isShowable && (
        <div className="fixed bottom-0 left-0 lg:bottom-[50px] lg:left-[50px] text-white w-full lg:max-w-[400px] backdrop-blur-md bg-slate-600 border rounded-t-2xl lg:rounded-2xl overflow-hidden z-[9999]">
          <div className="p-6 flex flex-col md:flex-row md:justify-between lg:flex-col gap-8 md:gap-12">
            <p className="max-w-[600px] lg:max-w-none grow">
              We use cookies and other technologies to enhance your browsing
              experience, personalize content, and provide targeted advertising.
              By continuing to use our website, you consent to the use of these
              technologies. For more information, including how to manage your
              consent preferences, please visit out {""}
              <Link className="text-blue-500" href={`/${params.lang}/privacy`}>
                Privacy Policy
              </Link>
              .
            </p>
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-stretch gap-4 grow">
              <button
                onClick={() => {
                  setIsShowAble(false);
                }}
                className="flex-1 px-6 py-1 border rounded-md order-2 lg:order-1"
              >
                Decline
              </button>
              <button
                onClick={() => {
                  setIsShowAble(false);
                }}
                className="flex-1 px-6 py-1 border rounded-md order-1 lg:order-2 bg-blue-500"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GTMConsent;
