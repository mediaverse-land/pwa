import Motion from "@/components/motion";
import { logoURL } from "@/configs/base";
import { getDictionary } from "@/dictionary";
import { getTerms } from "@/services/contactService";
import {
  FullLocaleNames,
  Locale,
  TFullLocales,
} from "@/types/dictionary-types";
import { Metadata } from "next";

async function getTermsData({ lang }: { lang: TFullLocales }) {
  try {
    const terms = await getTerms({
      lang,
    });
    if (terms.ok) {
      return terms.json();
    } else {
      throw new Error(`Failed to fetch data ${terms.status}`);
    }
  } catch (error) {
    console.error(error);
  }
}

export async function generateMetadata({
  params: { lang },
}: {
  params: { lang: Locale };
}): Promise<Metadata> {
  const termsData = await getTermsData({ lang: FullLocaleNames[lang] });

  const dic = await getDictionary(lang);

  return {
    description: termsData.description,
    title: dic.header.terms,
    keywords: termsData.keywords,
    openGraph: {
      title: dic.header.terms,
      description: termsData.description,
      images: `${process.env.NEXTAUTH_URL}${logoURL}`,
    },
  };
}

const Terms = async ({ params: { lang } }: { params: { lang: Locale } }) => {
  const termsData = await getTermsData({ lang: FullLocaleNames[lang] });
  const dic = await getDictionary(lang);
  return (
    <Motion>
      <div className="lg:w-[80rem] max-w-screen-lg mx-auto flex mt-28 lg:mt-36 pb-16 justify-center px-6 lg:px-4 min-h-[90vh]">
        <div className="w-full flex flex-col">
          <h1 className="text-white capitalize mb-6 lg:mb-[43px] font-bold text-[25px] text-center">
            {dic.header.terms}
          </h1>
          <article
            className="text-white max-w-full w-full prose"
            dangerouslySetInnerHTML={{ __html: termsData?.html || "" }}
          ></article>
        </div>
      </div>
    </Motion>
  );
};

export default Terms;
