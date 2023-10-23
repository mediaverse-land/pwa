import { getTerms } from "@/services/contactService";

async function getTermsData() {
    const terms = await getTerms();

    if (!terms.data) {
        throw new Error("Failed to fetch data");
    }
    return terms.data;
}

const Terms = async () => {

    const termsData = await getTermsData();
    return (<div className="w-full flex mt-36 pb-16 justify-center px-4">
        <div className="sm:w-6/12 w-full flex flex-col">
            <h1 className="text-white text-2xl">
                {termsData.name}
            </h1>
            <p className="text-base text-white uppercase">
                {termsData.content}
            </p>
        </div>
    </div>);
}

export default Terms;