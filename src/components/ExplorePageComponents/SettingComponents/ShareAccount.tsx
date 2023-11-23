import { DELETE_ICON } from "@/components/SVG/svgs";
import SubSectionHeader from "../shared/SubSectionHeader";
import ShareAccountForm from "./ShareAccountForm";

const SettingShareAccount = () => {
  return (
    <div className="h-full relative">
      <div className="flex flex-col items-stretch gap-6 p-10 h-full overflow-y-auto">
        <SubSectionHeader name="Share account" />
        <div className="flex flex-col items-stretch gap-2 mt-4">
          <div className="flex justify-between items-center px-4 py-5 bg-[rgba(78,78,97,0.50)] backdrop-blur-sm rounded-2xl">
            <div className="flex items-center gap-3">
              <div>i</div>
              <div>nakhli</div>
            </div>
            <div>
              <DELETE_ICON />
            </div>
          </div>
        </div>
        <ShareAccountForm />
      </div>
    </div>
  );
};

export default SettingShareAccount;
