import WebAppSearchForm from "@/components/Forms/WebAppSearchForm";
import {
  BACK_ICON,
  CHEVRON_LEFT,
  SEARCH_ICON,
  SEARCH_TEXT_ICON,
} from "@/components/SVG/svgs";
import { getDictionary } from "@/dictionary";
import { Locale } from "@/types/dictionary-types";

const WebAppSearchPage = async ({
  params: { lang },
}: {
  params: { lang: Locale };
}) => {
  const dic = await getDictionary(lang);
  return (
    <div className="flex flex-col items-stretch pl-8 pr-6 pt-6 gap-8">
      <div>
        <WebAppSearchForm dic={dic} />
      </div>
      <div className="grow flex flex-col items-center mt-16 text-[#666680] gap-4">
        <div>
          <SEARCH_TEXT_ICON fill="#666680" />
        </div>
        <div className="leading-5 max-w-[170px] text-center">
          {dic.generalApp.searchInMore}
        </div>
      </div>
    </div>
  );
};

export default WebAppSearchPage;
