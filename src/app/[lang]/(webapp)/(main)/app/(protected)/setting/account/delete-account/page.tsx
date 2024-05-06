import { getSessions } from "@/services/contactService";
import { getServerSession } from "next-auth";
import { authOptions } from "@/data/Auth";
import { convertISOToDateAndTime } from "@/lib/convertISOToDateAndTime";
import SubSectionHeader from "@/components/ExplorePageComponents/shared/SubSectionHeader";
import { Locale } from "@/types/dictionary-types";
import { getDictionary } from "@/dictionary";
import Link from "next/link";
import DeleteAccountButton from "@/components/Buttons/DeleteAccount";

const DeleteAccountPage = async ({
  params: { lang },
}: {
  params: { lang: Locale };
}) => {
  const session = await getServerSession(authOptions);
  const dic = await getDictionary(lang);
  const token = session?.user?.token || "";

  // console.log(sessionsData?.data.data);
  return (
    <div className="flex flex-col items-stretch gap-10 p-10 w-full h-full overflow-y-auto">
      <SubSectionHeader name={"Delete Account"} />
      <div className="mt-6">
        <h2 className="text-center text-[18px] font-bold mb-8">
          Are you sure you to delete your account?
        </h2>
        <div className="flex items-center justify-center gap-6 [&_>_*]:flex-1 max-w-[80%] mx-auto flex-col lg:flex-row">
          <Link
            href={`/setting`}
            className="border text-center rounded-2xl py-1 w-full"
          >
            No
          </Link>
          <DeleteAccountButton className="border text-center rounded-2xl py-1 w-full" />
        </div>
      </div>
    </div>
  );
};

export default DeleteAccountPage;
