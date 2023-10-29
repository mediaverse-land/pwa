import Motion from "@/components/motion";
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
    <Motion>
      <div className="w-full flex mt-36 pb-16 justify-center px-4 min-h-screen">
        <div className="sm:w-6/12 w-full flex flex-col">
          <h1 className="text-white mt-8 sm:mt-0 mb-[43px] capitalize  text-[25px]">
            {privacyData.name}
          </h1>
          <article
            className="text-white w-full prose "
            dangerouslySetInnerHTML={{ __html: privacyData.content }}
          ></article>
        </div>
      </div>
    </Motion>
  );
};

export default Privacy;
