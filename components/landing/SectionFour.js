import { useState } from "react";
import { IoIosCheckbox } from "react-icons/io";
import { MdCheckBoxOutlineBlank } from "react-icons/md";

const pricing = [
  {
    title: "Basic Plan",
    monthly: 0,
    annually: 0,
    features: [
      {
        feature: "Virtual cash",
        valid: true,
      },
      {
        feature: "Two trades monthly",
        valid: true,
      },
      {
        feature: "Refer and earn",
        valid: true,
      },
      {
        feature: "Create competition",
        valid: false,
      },
      {
        feature: "Leader board reward ",
        valid: false,
      },
    ],
  },
  {
    title: "Standard Plan",
    monthly: 500,
    annually: 5400,
    features: [
      {
        feature: "Virtual cash",
        valid: true,
      },
      {
        feature: "Two trades monthly",
        valid: true,
      },
      {
        feature: "Refer and earn",
        valid: true,
      },
      {
        feature: "Create competition",
        valid: true,
      },
      {
        feature: "Leader board reward ",
        valid: false,
      },
    ],
  },
  {
    title: "Premium Plan",
    monthly: 1000,
    annually: 10800,
    features: [
      {
        feature: "Virtual cash",
        valid: true,
      },
      {
        feature: "Two trades monthly",
        valid: true,
      },
      {
        feature: "Refer and earn",
        valid: true,
      },
      {
        feature: "Create competition",
        valid: true,
      },
      {
        feature: "Leader board reward ",
        valid: true,
      },
    ],
  },
];

const SectionFour = () => {
  const [monthly, setMonthly] = useState(true);
  return (
    <div className="w-full bg-[#F6F7F8F7]">
      <div className="max-w-[1200px] mx-auto pb-24">
        <div className="pt-[52px]">
          <div className="flex justify-center">
            <div className="relative w-fit mb-14">
              <h2 className="text-2xl md:text-[32px] font-bold pb-3">
                Pricing
              </h2>
              <div className="absolute bottom-0 w-[83px] h-[9px] bg-[#9747FF] left-0 rounded-[40px]"></div>
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-x-6">
          <button
            className={`border-none h-[47px] md:h-[66px] font-semibold text-lg md:text-xl rounded-[20px] text-[15px] md:px-[30px] ${
              monthly ? "bg-palette-two text-white" : "bg-[#82828240]"
            }`}
            onClick={() => setMonthly(true)}
          >
            Billed Monthly
          </button>
          <button
            className={`border-none h-[47px] md:h-[66px] font-semibold text-lg md:text-xl rounded-[20px] text-[15px] md:px-[30px] ${
              !monthly ? "bg-palette-two text-white" : "bg-[#82828240]"
            }`}
            onClick={() => setMonthly(false)}
          >
            Billed Yearly
          </button>
        </div>
        <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-3 mt-14">
          {pricing.map((price, id) => (
            <div
              key={id}
              className="w-full bg-white px-[25px] pt-[25px] pb-14 rounded-lg"
            >
              <p className="mb-1 text-2xl font-medium">
                <span
                  className={
                    id === 1
                      ? " text-palette-three"
                      : id === 2
                      ? "text-palette-four"
                      : "text-[#2525BB]"
                  }
                >
                  {price.title}
                </span>
              </p>
              {monthly ? (
                price.monthly === 0 ? (
                  <p className="text-2xl font-medium">Free</p>
                ) : (
                  <p className="text-2xl font-medium">
                    N{price.monthly.toLocaleString("en-US")}{" "}
                    <span className="text-sm font-light">monthly</span>
                  </p>
                )
              ) : price.annually === 0 ? (
                <p className="text-2xl font-medium">Free</p>
              ) : (
                <p className="text-2xl font-medium">
                  N{price.annually.toLocaleString("en-US")}{" "}
                  <span className="text-sm font-light">annually</span>
                </p>
              )}
              {!monthly && price.annually !== 0 && (
                <p className="text-sm text-neutral-600">10% discount</p>
              )}
              <ul className="list-none mt-12 p-0 flex flex-col gap-y-3.5">
                {price.features.map((feature, index) => (
                  <li key={index} className="flex gap-[25px] items-center">
                    {feature.valid ? (
                      <IoIosCheckbox className="text-xl text-palette-two" />
                    ) : (
                      <MdCheckBoxOutlineBlank className="text-xl text-palette-two" />
                    )}
                    <p className="text-xl font-light">{feature.feature}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectionFour;
