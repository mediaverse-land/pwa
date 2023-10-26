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
            <div className="text-white w-full" dangerouslySetInnerHTML={{ __html: termsData.content }}></div>
        </div>
    </div>);
}

export default Terms;