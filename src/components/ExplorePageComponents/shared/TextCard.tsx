import "./styles.css";

const ExploreTextCard = () => {
  return (
    <div className="max-w-[200px] min-w-[190px] min-h-[155px] max-h-[155px] w-full h-full">
      <div className="text-card w-full h-full px-4 py-6 flex flex-col items-stretch leading-none">
        <div className="text-[#CCCCFF]">My thoughts</div>
        <div className="text-[#666680] line-clamp-3 mt-2 mb-3 grow">
          Amet minim mollit non deserunt ullamco est sit...
        </div>
        <div className="text-[#666680] text-[12px]">author</div>
      </div>
    </div>
  );
};

export default ExploreTextCard;
