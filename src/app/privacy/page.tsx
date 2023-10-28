import { getPrivacy } from "@/services/contactService";

async function getPrivacyData() {
    const privacy = await getPrivacy();

    if (!privacy.ok) {
        throw new Error("Failed to fetch data");
    }
    return privacy.json();
}
const Privacy = async () => {

    const privacyData = await getPrivacyData();

    return (
        <div className="w-full flex mt-36 pb-16 justify-center px-4 min-h-screen">
            <div className="sm:w-6/12 w-full flex flex-col">
                <h1 className="text-white mt-8 sm:mt-0 mb-[43px] capitalize  text-[25px]">{privacyData.name}</h1>
                <div className="text-white w-full prose lg:prose-xl prose-h1:text-white prose-h2:text-white prose-h3:text-white prose-h4:text-white prose-strong:text-white" dangerouslySetInnerHTML={{ __html: privacyData.content }}></div>
            </div>
        </div>);
}

export default Privacy;