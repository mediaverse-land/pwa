import BackButton from "@/components/shared/BackButton";

const SubSectionHeader = ({ name }: { name: string }) => {
  return (
    <div className="flex items-center">
      <div>
        <BackButton fill="#666680" />
      </div>
      <div className="grow text-center font-semibold text-white mr-14 lg:mr-0">
        {name}
      </div>
    </div>
  );
};

export default SubSectionHeader;
