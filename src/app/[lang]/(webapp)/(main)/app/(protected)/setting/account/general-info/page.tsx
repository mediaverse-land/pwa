import WebAppSettingGeneralInformation from "@/components/Forms/WebAppGeneralInformation";
import { getDictionary } from "@/dictionary";
import { Locale } from "@/types/dictionary-types";

const GeneralInfoPage = async ({
  params: { lang },
}: {
  params: { lang: Locale };
}) => {
  const dic = await getDictionary(lang);

  return (
    <div>
      <WebAppSettingGeneralInformation dic={dic} />
    </div>
  );
};

export default GeneralInfoPage;
