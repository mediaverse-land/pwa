import { Locale } from "@/types/dictionary-types";

interface IProps {
  params: {
    lang: Locale;
  };
}

const CompleteInfo = ({ params: { lang } }: IProps) => {
  return (
    <div className="p-6">
      <h2 className="text-center font-bold text-[16px] lg:text-[18px]">
        Please Complete This Info To Continue
      </h2>
      <div></div>
    </div>
  );
};

export default CompleteInfo;
