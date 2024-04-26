import Accordion from "@/components/Accordion";
import Motion from "@/components/motion";
import { logoURL } from "@/configs/base";
import { getDictionary } from "@/dictionary";
import { getFAQ } from "@/services/contactService";
import {
  FullLocaleNames,
  Locale,
  TFullLocales,
} from "@/types/dictionary-types";
import { Metadata } from "next";
import React from "react";

async function getFAQData(lang: TFullLocales) {
  const faq = await getFAQ(lang);

  if (!faq.ok) {
    throw new Error(`Failed to fetch data with ${faq.status}`, {
      cause: `${faq.status} Error`,
    });
  }
  return faq.json();
}

export async function generateMetadata({
  params: { lang },
}: {
  params: { lang: Locale };
}): Promise<Metadata> {
  const faqData = await getFAQData(FullLocaleNames[lang]);
  const dic = await getDictionary(lang);
  return {
    // keywords: faqData.keywords,
    title: dic.header.faq,
    // description: faqData.description,
    openGraph: {
      title: dic.header.faq,
      images: `${process.env.NEXTAUTH_URL}${logoURL}`,
    },
  };
}

const Faq = async ({ params: { lang } }: { params: { lang: Locale } }) => {
  const dic = await getDictionary(lang);
  const faqData = await getFAQData(FullLocaleNames[lang]);

  return (
    <Motion>
      <div className="w-full max-w-screen-xl mx-auto flex mt-28 lg:mt-36 pb-16 justify-center px-8 lg:px-4 min-h-[75vh]">
        <div className="max-w-[540px] lg:max-w-none w-full lg:w-6/12 flex flex-col">
          <h1 className="text-white text-2xl">{dic.faqSection.title}</h1>
          {/* <p className="text-base text-blue-500">{item.question}</p> */}
          <div></div>
          {faqData?.questions.map((item: any, i: number) => (
            <React.Fragment key={i}>
              <Accordion item={item} />
            </React.Fragment>
          ))}
        </div>
      </div>
    </Motion>
  );
};

export default Faq;
