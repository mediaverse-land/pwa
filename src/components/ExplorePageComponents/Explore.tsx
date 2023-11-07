"use client";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import Motion from "../motion";
type IExploreSectionNavs = {
  id: 1;
  name: string;
  active_icon: JSX.Element;
  inactive_icon: JSX.Element;
  component: JSX.Element;
};
const ExploreSectionNavs: IExploreSectionNavs[] = [];

const ExploreSection = () => {
  const params = usePathname();
  console.log(params.concat("&hello"));
  return (
    <Motion key={"ExploreSection"}>
      <div className="w-full h-full relative">
        <div className="flex flex-col items-stretch gap-4 overflow-y-auto px-6 pt-28">
          {/* search section */}
          <div className="bg-[#0E0E124D] p-6 backdrop-blur rounded-b-[45px_35px] absolute top-0 left-0 w-full z-30">
            <div className="h-[40px] rounded-lg px-4 py-3 border border-[#353542] flex gap-8 items-center">
              <input
                className="outline-none grow bg-transparent text-[14px]"
                type="text"
                placeholder="Search"
              />
              <div>icon</div>
            </div>
          </div>
          {/* tabs */}
          <div className="rounded-lg">tabs</div>
        </div>
      </div>
    </Motion>
  );
};

export default ExploreSection;
