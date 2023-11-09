import LandingPageLayout from "../../components/landing/layout";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.secondaryUrl}`;

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    resetForm,
  } = useForm();

  const [loading, setLoading] = useState(false);
  const onSubmit = async (data) => {
    setLoading(true)
    data.first_name = data.firstName;
    data.last_name = data.lastName;
    data.subject  = 'Contact us'

    try {
      await axios.post(`${baseUrl}/contact`, data);
      setLoading(false)
      toast.success("Submitted", {
        position: toast.POSITION.TOP_RIGHT,
      });
      resetForm();
    } catch (error) {
      setLoading(false)
      toast.error(error, {
      position: toast.POSITION.TOP_RIGHT,
    });
    }

  };

  return (
    <LandingPageLayout>
      <div className="w-full bg-palette-one">
        <div className="max-w-[1200px] mx-auto pt-10 pb-20 flex justify-center gap-x-[100px]">
          <img
            src="/images/landing/Contact/Illustrate1.png"
            alt="illustration"
            className="hidden md:block"
          />
          <div className="">
            <p className="mb-2 text-[32px] font-bold">Get in Touch with Us</p>
            <p className="mb-4 font-medium text-[#4E4B66] text-xl">
              We will receive your request
            </p>
            <div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-2">
                  <label
                    htmlFor="firstName"
                    className="font-semibold text-lg block mb-2.5"
                  >
                    First Name
                  </label>
                  <input
                    {...register("firstName", {
                      required: true,
                      maxLength: 20,
                      minLength: 3,
                      pattern: {
                        value: /^[a-z,A-Z][A-Z,a-z\s]*$/,
                      },
                    })}
                    className={`w-full px-4 h-14 bg-white border border-[#979797] rounded-lg ${errors.firstName &&
                      "border-red-500"}`}
                  />
                  {errors.firstName && (
                    <span className="text-red-500">
                      {errors.firstName?.type === "required" &&
                        "First Name is required"}
                      {errors.firstName?.type === "minLength" &&
                        "First Name should be atleast 3 characters"}
                      {errors.firstName?.type === "maxLength" &&
                        "First Name should be less than 20 characters"}
                      {errors.firstName?.type === "pattern" &&
                        "Only alphabets is allowed"}
                    </span>
                  )}
                </div>

                <div className="mb-2">
                  <label
                    htmlFor="lastName"
                    className="font-semibold text-lg block mb-2.5"
                  >
                    Last Name
                  </label>
                  <input
                    {...register("lastName", {
                      required: true,
                      maxLength: 20,
                      minLength: 3,
                      pattern: {
                        value: /^[a-z,A-Z][A-Z,a-z\s]*$/,
                      },
                    })}
                    className={`w-full px-4 h-14 bg-white border border-[#979797] rounded-lg ${errors.lastName &&
                      "border-red-500"}`}
                  />
                  {errors.lastName && (
                    <span className="text-red-500">
                      {errors.lastName?.type === "required" &&
                        "Last Name is required"}
                      {errors.lastName?.type === "minLength" &&
                        "Last Name should be atleast 3 characters"}
                      {errors.lastName?.type === "maxLength" &&
                        "Last Name should be less than 20 characters"}
                      {errors.lastName?.type === "pattern" &&
                        "Only alphabets is allowed"}
                    </span>
                  )}
                </div>

                <div className="mb-2">
                  <label htmlFor="phone" className="font-semibold text-lg block mb-2.5">
                    Phone Number
                  </label>
                  <input
                    {...register("phone", {
                      required: true,
                      pattern: /^\d+$/i, // Only numbers
                    })}
                    type="tel"
                    className={`w-full px-4 h-14 bg-white border border-[#979797] rounded-lg ${errors.phone &&
                      "border-red-500"}`}
                  />
                  {errors.phone && (
                    <span className="text-red-500">
                      {errors.phone?.type === "required" &&
                        "Phone number is required"}
                      {errors.phone?.type === "pattern" &&
                        "Enter a valid phone number (numbers only)"}
                    </span>
                  )}
                </div>

                <div className="mb-[4px]">
                  <label htmlFor="email" className="font-semibold text-lg block mb-2.5">
                    Email
                  </label>
                  <input
                    {...register("email", {
                      required: true,
                      pattern: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i,
                    })}
                    type="email"
                    className={`w-full px-4 h-14 bg-white border border-[#979797] rounded-lg ${errors.email &&
                      "border-red-500"}`}
                  />
                  {errors.email && (
                    <span className="text-red-500">
                      {errors.email?.type === "required" && "Email is required"}
                      {errors.email?.type === "pattern" && "Invalid Email"}
                    </span>
                  )}
                </div>

                <div className="mb-[10px]">
                  <label htmlFor="message" className="font-semibold text-lg block mb-2.5">
                    Message
                  </label>
                  <textarea
                    {...register("message", { required: true })}
                    className={` p-4 w-full bg-white border border-[#979797] rounded-lg ${errors.message &&
                      "border-red-500"}`}
                    rows={6}
                  />
                  {errors.message && (
                    <span className="text-red-500">
                      {errors.message.message}
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  className="bg-palette-two font-bold w-full text-white rounded-[15px] h-[40px]"
                >
                  {loading ? (
                    <div role="status">
                      <svg
                        aria-hidden="true"
                        className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full">
        <div className="max-w-[1200px] mx-auto py-12 flex justify-between items-center">
          <div>
            <p className="mb-1 text-2xl font-bold">Our Locations</p>
            <p className="font-medium text-[#4E4B66]">
              You can come visit us in Our Offices
            </p>
          </div>
          <div>
            <p className="text-lg font-medium">
              4 Ayanboye Street,
              <br /> Anthony Village Lagos
            </p>
          </div>
        </div>
        <div className="w-full">
          {/* <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.9498687026503!2d3.3698703!3d6.528016099999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8dad91bd4f25%3A0xe373f3720272bf51!2s25%20Isaac%20John%20St%2C%20Igbobi%20102216%2C%20Lagos!5e0!3m2!1sen!2sng!4v1696573826867!5m2!1sen!2sng"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe> */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.6786129068432!2d3.3697865!3d6.5621903999999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8d860f5b2813%3A0xfeda8424f65ba37c!2s4%20Ayanboye%20St%2C%20Anthony%20100001%2C%20Lagos!5e0!3m2!1sen!2sng!4v1697738027460!5m2!1sen!2sng"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </LandingPageLayout>
  );
};

export default Contact;
