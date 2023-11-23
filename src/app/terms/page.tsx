import Motion from "@/components/motion";
import { getTerms } from "@/services/contactService";

async function getTermsData() {
  try {
    const terms = await getTerms();
    if (terms.ok) {
      return terms.json();
    } else {
      throw new Error(`Failed to fetch data ${terms.status}`);
    }
  } catch (error) {
    console.error(error);
  }
}

const Terms = async () => {
  const termsData = await getTermsData();
  return (
    <Motion>
      <div className="w-[80rem] max-w-screen-lg mx-auto flex mt-36 pb-16 justify-center px-4 min-h-[90vh]">
        <div className="w-full flex flex-col">
          <h1 className="text-white capitalize mb-[43px] font-bold text-[25px]">
            {termsData.name}
          </h1>
          <article
            className="text-white max-w-full w-full prose"
            dangerouslySetInnerHTML={{ __html: termsData.content }}
          ></article>
        </div>
      </div>
    </Motion>
  );
};

export default Terms;
