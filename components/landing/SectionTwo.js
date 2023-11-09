import { useState, useEffect } from "react";
import axios from "axios";

import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.secondaryUrl}`;

const SectionTwo = () => {
  const [features, setFeatures] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: { status, message, data } } = await axios.get(
          `${baseUrl}/features`
        );

        if (status === "Success") {
          setFeatures(data);
          return;
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="pt-[110px]">
        <div className="flex justify-center">
          <div className="relative w-fit mb-28">
            <h2 className="text-2xl md:text-[32px] font-bold pb-3">
              Key Features
            </h2>
            <div className="absolute bottom-0 w-[83px] h-[9px] bg-palette-two left-0 rounded-[40px]"></div>
          </div>
        </div>
      </div>
      <ul className="px-3 overflow-x-hidden list-none md:p-0">
        {features.map((feature, id) => (
          <li
            className={`flex flex-col justify-center gap-x-[52px] items-center ${
              id === 1 || id === 3 ? "md:flex-row-reverse" : "md:flex-row"
            } mb-14`}
            key={id}
          >
            <img
              src={feature.image}
              alt="feature"
              className="md:w-[420px] md:h-[442px]"
            />
            <div className="md:w-[470px]">
              <p className="font-medium text-xl text-center md:text-left md:text-[28px] pt-4 md:pt-0 mb-2 md:mb-[15px]">
                {feature.title}
              </p>
              <p className="text-sm text-center md:text-left md:text-lg font-light leading-[25px]">
                {feature.description}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SectionTwo;
