import BackButton from "@/components/shared/BackButton";

const WalletHistory = () => {
  return (
    <div className="w-full h-full px-10 pt-10 overflow-y-auto flex flex-col items-stretch gap-10">
      <div className="flex items-center">
        <div>
          <BackButton fill="#666680" />
        </div>
        <div className="grow text-center font-semibold text-white">History</div>
      </div>
      <div className="flex flex-col items-stretch gap-2">
        <div className="bg-[rgba(78,78,97,0.50)] backdrop-blur-md rounded-2xl px-6 py-4 flex flex-col items-stretch gap-2 leading-none">
          <div className="flex items-center justify-between">
            <div className="text-white leading-[19px]">20$</div>
            <div className="text-[12px] text-[#666680] leading-[14.5px]">
              2020/03/26 13:23
            </div>
          </div>
          <div className="text-[14px] text-[#666680] leading-[17px]">
            Labeling
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletHistory;
