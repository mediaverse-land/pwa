import BackButton from "@/components/shared/BackButton";
import WalletMainPage from "../WalletComponents/WalletMainPage";
import SubSectionHeader from "../shared/SubSectionHeader";

const SettingWalletSection = () => {
  return (
    <div className="w-full h-full p-10 flex flex-col items-stretch gap-8 relative">
      <SubSectionHeader name="Wallet" />
      <WalletMainPage type="sub" />
    </div>
  );
};

export default SettingWalletSection;
