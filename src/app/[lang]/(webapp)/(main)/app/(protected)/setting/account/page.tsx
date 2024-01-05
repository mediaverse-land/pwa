import SubSectionHeader from "@/components/ExplorePageComponents/shared/SubSectionHeader";
import { CHEVRON_LEFT } from "@/components/SVG/svgs";
import { Locale } from "@/types/dictionary-types";
import Link from "next/link";

const WebAppSettingAccount = ({
  searchParams,
  params: { lang },
}: {
  searchParams: {
    [key: string]: string;
  };
  params: { lang: Locale };
}) => {
  return (
    <div className="flex flex-col items-stretch gap-10 p-10">
      <SubSectionHeader name="Account" />
      <div className="flex flex-col items-stretch gap-2">
        <div className="bg-[rgba(78,78,97,0.30)] backdrop-blur-sm rounded-2xl p-6 flex flex-col items-stretch gap-4">
          <Link
            href={`/${lang}/app/setting/account/general-info`}
            className="flex items-center justify-between"
          >
            <div className="text-white">General information</div>
            <div>
              <CHEVRON_LEFT
                style={{
                  width: "20px",
                  height: "20px",
                }}
              />
            </div>
          </Link>
          <Link
            href={`/${lang}/app/setting/account/sign-ins`}
            className="flex items-center justify-between"
          >
            <div className="text-white">Sign ins</div>
            <div>
              <CHEVRON_LEFT
                style={{
                  width: "20px",
                  height: "20px",
                }}
              />
            </div>
          </Link>
          <Link
            href={`/${lang}/app/setting/account/sessions`}
            className="flex items-center justify-between"
          >
            <div className="text-white">Sessions</div>
            <div>
              <CHEVRON_LEFT
                style={{
                  width: "20px",
                  height: "20px",
                }}
              />
            </div>
          </Link>
        </div>
        <div className="bg-[rgba(78,78,97,0.30)] backdrop-blur-sm rounded-2xl p-6">
          <Link
            href={`/${lang}/app/logout`}
            className="flex items-center justify-between"
          >
            <div className="text-white">Log out</div>
            <div>
              <CHEVRON_LEFT
                style={{
                  width: "20px",
                  height: "20px",
                }}
              />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WebAppSettingAccount;
