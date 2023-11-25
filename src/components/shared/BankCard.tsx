import { DELETE_ICON } from "../SVG/svgs";

const BanckCard = () => {
  return (
    <div className="p-8 relative rounded-2xl bg-[rgba(102,102,128,1)] overflow-hidden w-[482px] min-w-[482px]">
      {/* circle */}
      <div className="absolute z-10 bottom-[50px] right-[-5px] w-[300px] h-[300px] rounded-full bg-[rgba(117,117,140,1)] bg-opacity-10"></div>
      {/* circle */}
      <div
        style={{
          background:
            "linear-gradient(90deg, rgba(115,115,139,1) 50%, rgba(102,102,128,1) 81%)",
        }}
        className="absolute z-0 bottom-[-180px] left-[50px] w-[300px] h-[300px] rounded-full"
      ></div>
      {/* card data */}
      <div className="flex flex-col items-stretch relative z-20">
        <div className="flex items-center justify-between">
          <div className="h-[36px] flex">
            <div className="relative w-[36px] h-[36px] aspect-square bg-[#EB001B] rounded-full z-10 bg-opacity-70"></div>
            <div className="relative w-[36px] h-[36px] aspect-square bg-[#F79E1B] rounded-full left-[-12px]"></div>
          </div>
          <div className="p-2 rounded-[25%] border border-[#A2A2B5]">
            <DELETE_ICON
              style={{
                width: "14px",
                height: "14px",
              }}
            />
          </div>
        </div>
        <div className="mt-4 text-white font-semibold leading-5">
          Mastercard
        </div>
        <div className="mt-6 text-[#CCCCFF] text-[20px] flex items-center justify-between">
          <div>Ma Nackhli</div>
          <div>02/55</div>
        </div>
        <div className="mt-4 text-center flex items-center justify-center gap-4 text-[20px] text-white">
          <span>****</span>
          <span>****</span>
          <span>****</span>
          <span>2255</span>
        </div>
      </div>
    </div>
  );
};

export default BanckCard;
