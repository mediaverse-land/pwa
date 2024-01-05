import Motion from "@/components/motion";
import { getDictionary } from "@/dictionary";
import { getPrivacy } from "@/services/contactService";
import {
  FullLocaleNames,
  Locale,
  TFullLocales,
} from "@/types/dictionary-types";
import { Metadata } from "next";

async function getPrivacyData(lang: TFullLocales) {
  try {
    const privacy = await getPrivacy(lang);
    if (privacy.ok) {
      return privacy.json();
    } else {
      throw new Error(`Failed to fetch data ${privacy.status}`);
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
  const privacyData = await getPrivacyData(FullLocaleNames[lang]);
  return {
    description: privacyData.description,
  };
}

const Privacy = async ({ params: { lang } }: { params: { lang: Locale } }) => {
  const privacyData = await getPrivacyData(FullLocaleNames[lang]);
  const dic = await getDictionary(lang);

  return (
    <Motion>
      <div className="w-[80rem] max-w-screen-lg mx-auto flex mt-36 pb-16 justify-center px-4 min-h-screen">
        <div className="w-full flex flex-col">
          <h1 className="text-white mt-8 sm:mt-0 mb-[43px] capitalize font-bold text-[25px]">
            {dic.header.privacy}
          </h1>
          <article
            className="text-white max-w-full w-full prose "
            dangerouslySetInnerHTML={{ __html: privacyData.html }}
          ></article>
        </div>
      </div>
    </Motion>
  );
};

export default Privacy;
