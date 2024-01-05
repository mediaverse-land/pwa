import { getLives } from "@/services/contactService";
import {
  FullLocaleNames,
  Locale,
  TFullLocales,
} from "@/types/dictionary-types";

const getData = async ({ lang }: { lang: TFullLocales }) => {
  const liveData = await getLives({ params: "", lang });
  if (liveData.ok) {
    return liveData.json();
  }
};
const LiveSlider = async ({
  params: { lang },
}: {
  params: { lang: Locale };
}) => {
  const liveData = await getData({ lang: FullLocaleNames[lang] });

  return (
    <div className="flex space-x-0 sm:space-x-4 justify-center items-center mt-10 marquee w-full">
      <div className="item ">
        {liveData.map((item: any, index: any) => {
          return (
            <img
              key={index}
              src={item.thumbnail}
              className="rounded-xl w-[154px] h-[100px]"
              alt="video cover"
            />
          );
        })}
      </div>
    </div>
  );
};

export default LiveSlider;
