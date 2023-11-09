import { BsStarFill } from "react-icons/bs";
import getConfig from "next/config";
import { useState, useEffect } from "react";
import axios from "axios";

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.secondaryUrl}`;

const SectionFive = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {
          data: { status, message, data },
        } = await axios.get(`${baseUrl}/testimonials`);

        if (status === "Success") {
          setTestimonials(data);
          return;
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="w-full">
      <div className="max-w-[1200px] mx-auto pb-24">
        <div className="pt-[52px]">
          <div className="flex justify-center">
            <div className="relative w-fit mb-14">
              <h2 className="text-2xl md:text-[32px] font-bold pb-3">
                Testimonial
              </h2>
              <div className="absolute bottom-0 w-[83px] h-[9px] bg-palette-two left-0 rounded-[40px]"></div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 px-3 md:px-0 md:grid-cols-2 gap-x-5 gap-y-6">
          {testimonials.map((testimonial, id) => (
            <div
              key={id}
              className="px-[25px] pt-[27px] pb-[21px] bg-[#F6F7F8] rounded-[20px]"
            >
              <div className="flex items-center mb-4 gap-x-1">
                {Array.from({ length: testimonial.rating }).map(
                  (rate, index) => (
                    <BsStarFill
                      key={index}
                      className="text-[#E9FA1E] text-xl"
                    />
                  )
                )}
                {Array.from({ length: 5 - testimonial.rating }).map(
                  (rate, index) => (
                    <BsStarFill
                      key={index}
                      className="text-[#D9DBE9] text-xl"
                    />
                  )
                )}
              </div>
              <p className="font-light text-sm md:w-[500px] mb-9">
                {testimonial.review}
              </p>
              <div className="flex items-center gap-x-[30px]">
                <div className="w-[70px] h-[70px] rounded-full overflow-hidden">
                  <img src={testimonial.IMAGE} alt="profile" className="" />
                </div>
                <p className="text-xl">{testimonial.first_name} {testimonial.last_name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectionFive;
