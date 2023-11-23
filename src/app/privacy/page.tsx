import Motion from "@/components/motion";
import { getPrivacy } from "@/services/contactService";

async function getPrivacyData() {
  try {
    const privacy = await getPrivacy();
    if (privacy.ok) {
      return privacy.json();
    } else {
      throw new Error(`Failed to fetch data ${privacy.status}`);
    }
  } catch (error) {
    console.error(error);
  }
}
const Privacy = async () => {
  const privacyData = await getPrivacyData();

  return (
    <Motion>
      <div className="w-[80rem] max-w-screen-lg mx-auto flex mt-36 pb-16 justify-center px-4 min-h-screen">
        <div className="w-full flex flex-col">
          <h1 className="text-white mt-8 sm:mt-0 mb-[43px] capitalize font-bold text-[25px]">
            {privacyData.name}
          </h1>
          <article
            className="text-white max-w-full w-full prose "
            dangerouslySetInnerHTML={{ __html: privacyData.content }}
          ></article>
        </div>
      </div>
    </Motion>
  );
};

export default Privacy;
