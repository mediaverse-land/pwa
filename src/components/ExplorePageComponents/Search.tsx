import Link from "next/link";
import { BACK_ICON } from "../SVG/svgs";
import SearchSectionResultFrom from "./SearchSectionComponents/ResultForm";
import SearchSectionFrom from "./SearchSectionComponents/SearchFrom";

const ExploreSearchSection = ({
  searchParams,
}: {
  searchParams: {
    [key: string]: string;
  };
}) => {
  const query = searchParams.q;
  return (
    <>
      {query ? (
        <SearchSectionResultFrom searchParams={searchParams} />
      ) : (
        <SearchSectionFrom />
      )}
    </>
  );
};

export default ExploreSearchSection;
