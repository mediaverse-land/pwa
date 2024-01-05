import { Locale } from "@/types/dictionary-types";
import { redirect } from "next/navigation";

const Page = ({
  searchParams,
  params,
}: {
  searchParams: {
    [key: string]: string;
  };
  params: { lang: Locale };
}) => {
  redirect(`/${params.lang}/app/account/subscribe`);
  return <></>;
};

export default Page;
