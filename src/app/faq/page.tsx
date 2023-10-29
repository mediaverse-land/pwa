import Accordion from "@/components/Accordion";
import Motion from "@/components/motion";
import { getFAQ } from "@/services/contactService";
import React from "react";

async function getFAQData() {
  const faq = await getFAQ();

  if (!faq.ok) {
    throw new Error("Failed to fetch data", { cause: `${faq.status} Error` });
  }
  return faq.json();
}

const Faq = async () => {
  const faqData = await getFAQData();

  return (
    <Motion>
      <div className="w-full flex mt-36 pb-16 justify-center px-4 min-h-[75vh]">
        <div className="sm:w-6/12 w-full flex flex-col">
          <h1 className="text-white text-2xl">MediaVers Features</h1>
          {/* <p className="text-base text-blue-500">{item.question}</p> */}
          <div></div>
          {faqData.data.map((item: any, i: number) => (
            <React.Fragment key={i}>
              <Accordion item={item} />
            </React.Fragment>
          ))}
        </div>
      </div>
    </Motion>
  );
};

export default Faq;
