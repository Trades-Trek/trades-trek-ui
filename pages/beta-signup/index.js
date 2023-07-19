import { useState, useRef } from "react";
import { List, Dialog, Alert } from "@mantine/core";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import getConfig from "next/config";
import { useRouter } from "next/router";

import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";

const schema = yup.object().shape({
  fullName: yup.string().required("Full name is required"),
  email: yup
    .string()
    .email("Invalid email")
    .required("Email is required"),
  phoneNumber: yup
    .string()
    .matches(/^\d+$/, "Phone number must contain only digits")
    .required("Phone number is required"),
  ageRange: yup.string().required("Age range is required"),
  gender: yup.string().required("Gender is required"),
  participateInBetaTesting: yup
    .boolean()
    .oneOf([true], "Please select an option"),
});

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}`;

const BetaForm = () => {
  const toastId = useRef(null);
  const router = useRouter();
  const [participateInBetaTesting, setParticipateInBetaTesting] = useState(
    true
  );
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
   
    try {
      const response = await axios.post(`${baseUrl}/betaUser/signup`, {...data, participateInBetaTesting });
      const {
        data: { success, message },
      } = response;
      setIsLoading(false);
      if (!success) {
        if (!toast.isActive(toastId.current)) {
          toastId.current = toast.error(message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }

        return;
      }

      toast.success("Submission Successful", {
        position: toast.POSITION.TOP_RIGHT,
      });

      localStorage.setItem("hasSignedUpForBetaTesting", "true");
      setTimeout(router.push("/"), 200000);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      toast.error('Failed to signup try again', {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const watchedValues = watch();

  return (
    <div className="bg-white py-10">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="text-center w-full  ">
        <img src="/images/newlogo.jpg" />
      </div>

      <div className="max-w-screen  grid gap-8 grid-cols-1 md:grid-cols-2 md:px-12 lg:px-16 xl:px-32 py-8 mx-auto bg-white text-gray-900 rounded-lg shadow-lg">
        <LeftSection />
        <div>
          <div className="text-center m-2">
            To join our Beta Testing Program, simply fill <br /> out the form
            below.
          </div>

          <div
            className="bg-[#2E2E2E]"
            style={{ width: "60%", margin: "0 auto", borderRadius: "30px" }}
          >
            <form onSubmit={handleSubmit(onSubmit)} className="px-8 py-8">
              <div>
                <span className="uppercase text-sm text-white font-bold">
                  Full Name
                </span>
                <input
                  className="w-full bg-[#3B3A3A] text-white mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="Enter your name"
                  {...register("fullName")}
                />
                {errors.fullName && (
                  <List className="text-red">{errors.fullName.message}</List>
                )}
              </div>
              <div className="mt-8">
                <span className="uppercase text-sm text-white font-bold">
                  Email
                </span>
                <input
                  placeholder="Enter your email address"
                  className="w-full bg-[#3B3A3A] text-white mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                  type="email"
                  {...register("email")}
                />
                {errors.email && (
                  <List className="text-red">{errors.email.message}</List>
                )}
              </div>
              <div className="mt-8">
                <span className="uppercase text-sm text-white font-bold">
                  Phone Number
                </span>
                <input
                  className="w-full bg-[#3B3A3A] text-white mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="Enter your whatsapp Phone Number"
                  {...register("phoneNumber")}
                />

                {errors.phoneNumber && (
                  <List className="text-red">{errors.phoneNumber.message}</List>
                )}
              </div>
              <div className="mt-8">
                <span className="uppercase text-sm text-white font-bold">
                  Age Range
                </span>
                <select
                  className="w-full bg-gray-300 text-white mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                  {...register("ageRange")}
                >
                  <option value="">Select Age Range</option>
                  <option value="18-25">18 - 25</option>
                  <option value="26-30">26 - 30</option>
                  <option value="31-40">31 - 40</option>
                </select>

                {errors.ageRange && (
                  <List className="text-red">{errors.ageRange.message}</List>
                )}
              </div>
              <div className="mt-8">
                <span className="uppercase text-sm text-white font-bold">
                  Gender
                </span>
                <div className="flex mt-2">
                  <label className="mr-4">
                    <input
                      {...register("gender")}
                      type="radio"
                      value="male"
                      checked={watchedValues.gender === "male"}
                    />
                    <span className="ml-2 text-white">Male</span>
                  </label>
                  <label>
                    <input
                      {...register("gender")}
                      type="radio"
                      value="female"
                      checked={watchedValues.gender === "female"}
                    />
                    <span className="ml-2 mr-2 text-white">Female</span>
                  </label>
                  <label>
                    <input
                      {...register("gender")}
                      type="radio"
                      value="not-specified"
                      checked={watchedValues.gender === "not-specified"}
                    />
                    <span className="ml-2 text-white">Prefer not to say</span>
                  </label>
                </div>
                {errors.gender && (
                  <List className="text-red">{errors.gender.message}</List>
                )}
              </div>
              <div className="mt-8">
                <span className="uppercase text-sm text-white font-bold">
                  Are you committing to actively participate in the beta testing
                  program?
                </span>
                <div className="flex mt-2">
                  <label>
                    <input
                      type="checkbox"
                      checked={participateInBetaTesting}
                      onChange={(e) =>
                        setParticipateInBetaTesting(e.target.checked)
                      }
                    />
                    <span className="ml-2 text-white">Yes</span>
                  </label>
                  <label className="ml-4">
                    <input
                      type="checkbox"
                      checked={!participateInBetaTesting}
                      onChange={(e) =>
                        setParticipateInBetaTesting(!e.target.checked)
                      }
                    />
                    <span className="ml-2 text-white">No</span>
                  </label>
                </div>
              </div>
              <div className="mt-8">
                <button className="uppercase text-sm font-bold tracking-wide bg-indigo-500 text-gray-100 p-3 rounded-lg w-full focus:outline-none focus:shadow-outline">
                  {isLoading ? "Loading.." : "Submit"}
                </button>
              </div>
              <div className="text-white mt-4">
                Note: By signing up for the beta testing program, you agree to
                our terms and conditions and understand the confidential nature
                of the pre-release software.
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BetaForm;

const LeftSection = () => (
  <div className="flex flex-col justify-between">
    <div>
      <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
        Welcome to Trades <br /> Trek’s Beta Testing <br />
        Program!
      </h2>
    </div>
    <div className="mt-8 text-center" style={{ width: "450px" }}>
      <img src="/images/beta-Test.png" />
    </div>

    <span className="mb-4 d-block">
      AS a <b>beta tester</b>, you'll get
    </span>
    <List spacing="xs" size="sm" center icon={""}>
      <List.Item>
        {" "}
        • &nbsp;
        <b>Early Access:</b> Get a first-hand experience of our cutting-edge app
        before anyone
      </List.Item>
      <List.Item style={{ lineHeight: 1.5 }}>
        {" "}
        • &nbsp;
        <b>Influence the Development:</b> Your feedback and suggestions will
        directly impact the app's development and help us create a better user
        experience.
      </List.Item>
      <List.Item style={{ lineHeight: 1.5 }}>
        {" "}
        • &nbsp;
        <b>Direct Communication: </b>
        Engage with our development team and share your thoughts, ideas, and
        concerns.
      </List.Item>
      <List.Item style={{ lineHeight: 1.5 }}>
        {" "}
        • &nbsp;
        <b>Insider Updates: </b>
        Stay informed about the latest updates, enhancements, and upcoming
        features of Trades Trek.
      </List.Item>
    </List>

    <span className="mt-4 d-block">
      {" "}
      Most importantly, you also stand a chance to win various prices
    </span>
  </div>
);
