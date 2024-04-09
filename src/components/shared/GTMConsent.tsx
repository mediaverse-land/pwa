"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const GTMConsent = () => {
  const params = useParams();
  const router = useRouter();
  const [isShowable, setIsShowAble] = useState(false);
  useEffect(() => {
    const consent = localStorage.getItem("GTM_CONSENT");
    if (consent) {
      const consentData = JSON.parse(consent);
      // @ts-ignore
      if (!window.gtag) return;
      if (consentData.access === "granted") {
        // @ts-ignore
        window.gtag("consent", "update", {
          ad_storage: "granted",
          analytics_storage: "granted",
          functionality_storage: "granted",
          personalization_storage: "granted",
          security_storage: "granted",
        });
      } else {
        // @ts-ignore
        window.gtag("consent", "default", {
          ad_storage: "denied",
          analytics_storage: "denied",
          functionality_storage: "denied",
          personalization_storage: "denied",
          security_storage: "denied",
        });
      }
    }
  }, [isShowable]);
  useEffect(() => {
    const consent = localStorage.getItem("GTM_CONSENT");
    if (consent) {
      const consentData = JSON.parse(consent);
      // if (consentData?.expired_time > new Date().getTime()) {
      //   setIsShowAble(true);
      // }
      setIsShowAble(false);
    } else {
      setIsShowAble(true);
    }
  }, []);
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
                  localStorage.setItem(
                    "GTM_CONSENT",
                    JSON.stringify({
                      access: "denied",
                    })
                  );

                  setIsShowAble(false);
                  router.refresh();
                }}
                className="flex-1 px-6 py-1 border rounded-md order-2 lg:order-1"
              >
                Reject all
              </button>
              <button
                onClick={() => {
                  localStorage.setItem(
                    "GTM_CONSENT",
                    JSON.stringify({
                      access: "granted",
                    })
                  );
                  setIsShowAble(false);
                  router.refresh();
                }}
                className="flex-1 px-6 py-1 border rounded-md order-1 lg:order-2 bg-blue-500"
              >
                Accept all
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GTMConsent;
