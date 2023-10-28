import { getTerms } from "@/services/contactService";

async function getTermsData() {
    const terms = await getTerms();

    if (!terms.ok) {
        throw new Error("Failed to fetch data");
    }
    return terms.json();
}

const Terms = async () => {

    const termsData = await getTermsData();
    return (<div className="w-full flex mt-36 pb-16 justify-center px-4 min-h-[90vh]">
        <div className="sm:w-6/12 w-full flex flex-col">
            <h1 className="text-white capitalize mb-[43px] text-[25px]">
                {termsData.name}
            </h1>
            <article className="text-white w-full prose lg:prose-xl prose-h1:text-white prose-h2:text-white prose-h3:text-white prose-h4:text-white prose-strong:text-white" dangerouslySetInnerHTML={{ __html: termsData.content }}></article>
        </div>
    </div>);
}

export default Terms;