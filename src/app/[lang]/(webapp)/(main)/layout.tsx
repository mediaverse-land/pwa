import WebAppSideBar from "@/components/WebApp/WebAppSideBar/WebAppSideBar";
import Motion from "@/components/motion";
import { Locale } from "@/types/dictionary-types";

export default function Layout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  return (
    <Motion center>
      <div className="mt-[95px] lg:mt-28 mx-auto flex items-center justify-center w-full h-full">
        <div
          className="grid grid-cols-6 lg:grid-cols-8 grid-rows-1 gap-4 lg:h-[604px] w-full max-w-[600px] lg:max-w-[900px] xl:max-w-none
         xl:w-[1062px] text-[#C1C1CD]"
        >
          {/* sidebar */}
          <WebAppSideBar lang={lang} />
          <div
            key={"SettingSection"}
            className="col-span-6 lg:rounded-2xl xl:border border-[#CFCFFC] border-opacity-20 overflow-hidden flex flex-col items-stretch gap-4 lg:bg-[rgba(78,78,97,0.20)]"
          >
            {children}
          </div>
        </div>
      </div>
    </Motion>
  );
}
