import { getPrivacy } from "@/services/contactService";

async function getPrivacyData() {
    const privacy = await getPrivacy();

    if (!privacy.data) {
        throw new Error("Failed to fetch data");
    }
    return privacy.data;
}
const Privacy = async () => {

    const privacyData = await getPrivacyData();

    return (<div className="w-full flex mt-36 pb-16 justify-center px-4">
        <div className="sm:w-6/12 w-full flex flex-col">
            {privacyData.map((item: any, index: number) => {
                return <>
                    <h1 key={index} className="text-white text-4xl mt-8 sm:mt-0">{item.name}</h1>
                    <p className="text-white w-full  mt-6">
                        {item.content}
                    </p>
                </>
            })}    
        </div>
    </div>);
}

export default Privacy;