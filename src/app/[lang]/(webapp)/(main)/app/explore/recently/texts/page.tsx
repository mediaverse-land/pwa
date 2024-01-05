import SubSectionHeader from "@/components/ExplorePageComponents/shared/SubSectionHeader";
import ExploreTextCard from "@/components/ExplorePageComponents/shared/TextCard";
import { getRecentlyTexts } from "@/services/contactService";
import { Locale } from "@/types/dictionary-types";

const getRecentlyTextsData = async () => {
  try {
    const liveData = await getRecentlyTexts();
    return {
      data: await liveData.json(),
      status: liveData.status,
    };
  } catch (error) {
    console.error(error);
  }
};

const WebAppRecentlyTexts = async ({
  params: { lang },
}: {
  params: { lang: Locale };
}) => {
  const rececentlyTextsData = await getRecentlyTextsData();
  return (
    <div className="h-full w-full p-10 overflow-y-auto">
      <SubSectionHeader name="Recently" />
      <div className="grid grid-cols-3 grid-flow-row gap-4 mt-8">
        {rececentlyTextsData?.data.map((item: any) => (
          <div key={item.id} className="max-w-[220px]">
            <ExploreTextCard lang={lang} data={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default WebAppRecentlyTexts;
