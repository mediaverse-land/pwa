import SubSectionHeader from "../shared/SubSectionHeader";
import SettingAllMessages from "./AllMessages";
import SettingSingleMessage from "./SingleMessage";

const SettingMessages = ({
  searchParams,
}: {
  searchParams: {
    [key: string]: string;
  };
}) => {
  const id = searchParams.id;
  return (
    <div className="flex flex-col items-stretch gap-10 px-10 pt-10 h-full">
      <SubSectionHeader name="Messages" />
      {id ? <SettingSingleMessage id={+id} /> : <SettingAllMessages />}
    </div>
  );
};

export default SettingMessages;
