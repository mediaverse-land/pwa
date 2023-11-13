import Image from "next/image";
import "./styles.css";

const ExploreTextCard = ({ data }: { data: any }) => {
  return (
    <div className="max-w-full min-w-[220px] w-full aspect-square">
      <div className="text-card w-full h-full px-4 py-6 flex flex-col items-stretch leading-none">
        <div className="text-[#CCCCFF] line-clamp-1 text-[14px] leading-4">
          {data.name}
        </div>
        <div className="text-[#666680] line-clamp-3 mt-2 mb-3 text-[14px] leading-4">
          {data.description}
        </div>
        <div className="text-[#666680] text-[12px] flex items-center gap-2 mt-auto">
          <div className="relative w-[16px] h-[16px] rounded-full overflow-hidden">
            <Image src={data.asset.user.image_url} alt="author image" fill />
          </div>
          <div>{data.asset.user.username}</div>
        </div>
      </div>
    </div>
  );
};

export default ExploreTextCard;
