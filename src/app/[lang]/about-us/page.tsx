import Motion from "@/components/motion";
import { logoURL } from "@/configs/base";
import { getDictionary } from "@/dictionary";
import { getAboutUs } from "@/services/contactService";
import {
  FullLocaleNames,
  Locale,
  TFullLocales,
} from "@/types/dictionary-types";
import { Metadata } from "next";
import Link from "next/link";

async function getAboutUsData(lang: TFullLocales) {
  const aboutUs = await getAboutUs(lang);

  if (!aboutUs.ok) {
    throw new Error(`Failed to fetch data with ${aboutUs.status}`, {
      cause: `${aboutUs.status} Error`,
    });
  }
  return aboutUs.json();
}

export async function generateMetadata({
  params: { lang },
}: {
  params: { lang: Locale };
}): Promise<Metadata> {
  const aboutUsData = await getAboutUsData(FullLocaleNames[lang]);
  const dic = await getDictionary(lang);
  return {
    keywords: aboutUsData.keywords,
    title: dic.header.about,
    description: aboutUsData.description,
    openGraph: {
      title: dic.header.about,
      description: aboutUsData.description,
      images: `${process.env.NEXTAUTH_URL}${logoURL}`,
    },
  };
}

const AboutUs = async ({ params: { lang } }: { params: { lang: Locale } }) => {
  const dic = await getDictionary(lang);
  const aboutUsData = await getAboutUsData(FullLocaleNames[lang]);

  return (
    <Motion>
      <div className="w-full flex flex-col justify-center items-center lg:items-start lg:gap-10 lg:flex-row mt-36 mb-10">
        <div className="flex flex-col px-4 lg:px-0">
          <div className="w-[320px] sm:w-[380px] md:w-[500px] lg:w-80 aspect-square">
            <iframe
              className="w-full h-full rounded-xl"
              src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.2189364946053!2d2.3144302419797746!3d48.87310274252804!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e1f06e2b70f%3A0x66ae4097ff6609bd!2sV8F8%2B6M!5e0!3m2!1str!2suk!4v1697876240547!5m2!1str!2suk&center=${aboutUsData.lat},${aboutUsData.lng}`}
              allowFullScreen={false}
              loading="lazy"
            ></iframe>
          </div>
          <div className="flex justify-between px-3 py-3 mt-10 rounded-lg">
            <p className="text-gray-400 text-xs">{dic.aboutUs.office}</p>
            <p className="text-white text-xs">{aboutUsData.address}</p>
          </div>
          <div className="flex justify-between px-3 py-3 bg-[#0F0F66] rounded-lg">
            <p className="text-gray-400 text-xs">{dic.aboutUs.phone}</p>
            <p className="text-white text-xs">{aboutUsData.phone}</p>
          </div>
          <div className="flex justify-between px-3 py-3 rounded-lg">
            <p className="text-gray-400 text-xs">{dic.aboutUs.email}</p>
            <p className="text-white text-xs">{aboutUsData.email}</p>
          </div>
          {aboutUsData.links.map(
            (
              item: {
                url: string;
                name: string;
              },
              index: number
            ) => (
              <div
                key={item.url}
                className={`flex justify-between px-3 py-3 ${
                  index % 2 === 0 ? "bg-[#0F0F66]" : ""
                } rounded-lg`}
              >
                <p className="text-gray-400 text-xs">{item.name}</p>
                <Link
                  href={item.url}
                  target="_blank"
                  className="text-white text-xs"
                >
                  {item.url.length > 35
                    ? item.url.slice(0, 30) + "..."
                    : item.url}
                </Link>
              </div>
            )
          )}
        </div>
        <div
          className="px-6 lg:px-8 mt-6 lg:mt-0 text-white w-full lg:w-[500px] xl:w-[650px]"
          dangerouslySetInnerHTML={{
            __html: aboutUsData?.html || "",
          }}
        ></div>
      </div>
    </Motion>
  );
};

export default AboutUs;
