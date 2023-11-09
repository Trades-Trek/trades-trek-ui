import { useState } from "react";
import { BsPlusCircle, BsDashCircle } from "react-icons/bs";
import { useRouter } from 'next/router';

const faqs = [
  {
    question: "How do I sign up for Trades Trek?",
    answer: `Signing up is easy! Simply click the Sign Up button on our homepage and follow the instructions`,
  },
  {
    question: "What kind of support is available?",
    answer: `Our team of experts are always available to provide you with exceptional customer support via phone, email or live chat.`,
  },
  {
    question: "What kind of investment can I make?",
    answer: `This is completely up to you. We provide you guide and tools to understand the financial market.`,
  },
];

const SectionSix = () => {
  const router = useRouter();
  const [selectedFaq, setSelectedFaq] = useState(null);
  const handleSelect = (id) => {
    if (selectedFaq === id) {
      setSelectedFaq(null);
    } else {
      setSelectedFaq(id);
    }
  };
  return (
    <div className="faqPage pt-[77px] pb-[75px] px-2 md:px-0" id="faq">
      <div className="pt-[52px]">
        <div className="flex justify-center">
          <div className="relative w-fit mb-14">
            <h2 className="text-2xl text-center md:text-[32px] font-bold pb-3">
              Frequently Asked Questions(FAQs)
            </h2>
            <div className="absolute md:left-0 left-12 bottom-0 w-[83px] h-[9px] bg-palette-two rounded-[40px]"></div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-y-4">
        {faqs.map((faq, id) => (
          <div
            key={id}
            onClick={() => handleSelect(id)}
            className="w-full md:w-[740px] px-[25px] bg-white rounded-3xl"
          >
            <div className="flex items-center justify-between py-4 gap-x-2">
              <p className="text-base font-medium md:text-2xl">
                {faq.question}
              </p>
              {selectedFaq === id ? (
                <BsDashCircle
                  className="text-base font-bold cursor-pointer md:text-2xl"
                  onClick={() => handleSelect(id)}
                />
              ) : (
                <BsPlusCircle
                  className="text-base font-bold cursor-pointer md:text-2xl"
                  onClick={() => handleSelect(id)}
                />
              )}
            </div>
            <div
              className={`text-xl overflow-hidden transition-all duration-500 ${
                selectedFaq === id ? "max-h-96" : "max-h-0"
              }`}
            >
              <p className="pb-4 text-sm md:text-xl">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-[33px]">
        <button onClick={()=>router.push("/faq")} className="text-white font-bold border-none h-14 px-8 rounded-[15px] bg-palette-two">
          View All Questions
        </button>
      </div>
    </div>
  );
};

export default SectionSix;
