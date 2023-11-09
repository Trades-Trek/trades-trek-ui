import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

const baseUrl = `${publicRuntimeConfig.secondaryUrl}`;
const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const Footer = () => {
  const [companyData, setCompanyData] = useState({});
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {
          data: { status, message, data },
        } = await axios.get(`${baseUrl}/company-information`);

        if (status === "Success") {
          setCompanyData(data);
          return;
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleEmailSubmission = async () => {
    const res = regex.test(email);
    if (!res) return toast.error("Invalid email");
    try {
      const response = await axios.post(`${baseUrl}/subscribe`, { email });

      if (response.status === 200) {
        toast.success("Successfully subscribed");
      } else {
        toast.error("Failed to subscribe email");
      }
    } catch (error) {
      toast.error("Failed to subscribe email");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleEmailSubmission(); // Pass email to handleEmailSubmission function
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center gap-y-7 md:flex-row bg-palette-one gap-x-14">
        <div className="md:w-[579px] px-3 md:px-0">
          <h2 className="font-bold text-[32px] text-center md:text-left mb-2 pt-12 md:pt-0">
            Invest Smarter, Learn Faster!
          </h2>
          <p className=" mb-16 text-lg font-light text-center md:text-left leading-[25px]">
            The Trades Trek App - Your Path to Financial Mastery. <br />
            Download Today!
          </p>
          <div className="flex flex-col items-center md:flex-row gap-y-4 gap-x-3">
            <a
              href={companyData?.ios_download_url}
              target="_blank"
              rel="noreferrer"
            >
              <img src="/images/landing/appstore.png" alt="appstore" />
            </a>
            <a
              href={companyData?.android_download_url}
              target="_blank"
              rel="noreferrer"
            >
              <img src="/images/landing/playstore.png" alt="playstore" />
            </a>
            <a
              href="https://blog.tradestrek.com"
              target="_blank"
              rel="noreferrer"
              className="text-lg font-medium text-black"
            >
              <button
                className="text-white border-0 rounded-[px] bg-palette-two !px-14 !py-4 !font-semibold !text-2xl	"
                type="button"
              >
                See Blog
              </button>
            </a>
          </div>
        </div>
        <div className="flex justify-center md:block">
          <img
            src="/images/landing/Footer/Illustrate.png"
            alt="illustration of a boy"
          />
        </div>
      </div>

      <div className="2xl:mx-auto 2xl:container mx-4 py-16 bg-[#F6F7F8F7]">
        <div className="w-full relative flex items-center justify-center">
          <img
            src="https://shuffle.dev/saturn-assets/images/newsletter/light-left-top-double.png"
            alt="dining"
            className="w-full h-full absolute z-0 hidden xl:block"
          />
          <div className="bg-palette-one md:my-16 lg:py-16 py-10 w-full md:mx-24 md:px-12 px-4 flex flex-col items-center justify-center relative z-40">
            <h1 className="text-4xl font-semibold leading-9  text-center">
              Join our community
            </h1>
            <p className="text-base leading-normal text-center  mt-6">
              Subscribe to our telegram channel to stay in the loop.
            </p>
          </div>
        </div>
      </div>

      <div className="relative isolate overflow-hidden bg-gray-900 py-16 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
            <div className="max-w-xl lg:max-w-lg">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Subscribe to our newsletter.
              </h2>
              <p className="mt-4 text-lg leading-8 text-gray-300">
                Subscribe to our newsletter to stay in the loop. Our newsletter
                is sent once in a week on every friday so subscribe to get
                latest news and updates.
              </p>
              <div className="mt-6 flex max-w-md gap-x-4">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  placeholder="Enter your email"
                />
                <button
                  type="submit"
                  disabled={!regex.test(email)}
                  onClick={handleSubmit}
                  className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                  Subscribe
                </button>
              </div>
            </div>
            <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
              <div className="flex flex-col items-start">
                <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                  {/* <CalendarDaysIcon className="h-6 w-6 text-white" aria-hidden="true" /> */}
                </div>
                <dt className="mt-4 font-semibold text-white">
                  Weekly articles
                </dt>
                <dd className="mt-2 leading-7 text-gray-400">
                  Non laboris consequat cupidatat laborum magna. Eiusmod non
                  irure cupidatat duis commodo amet.
                </dd>
              </div>
              <div className="flex flex-col items-start">
                <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                  {/* <HandRaisedIcon className="h-6 w-6 text-white" aria-hidden="true" /> */}
                </div>
                <dt className="mt-4 font-semibold text-white">No spam</dt>
                <dd className="mt-2 leading-7 text-gray-400">
                  Officia excepteur ullamco ut sint duis proident non
                  adipisicing. Voluptate incididunt anim.
                </dd>
              </div>
            </dl>
          </div>
        </div>
        <div
          className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6"
          aria-hidden="true"
        >
          <div
            className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
      </div>

      <div className="px-3 py-20 md:px-0 bg-palette-two">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 gap-y-[35px] md:grid-cols-4">
          <div>
            <img
              src="/images/landing/Footer/LogoWhite.png"
              alt="Logo"
              className="mb-5"
            />
            <p className="font-bold text-white">
              © Copyright 2023 Trades Trek.
              <br />
              All rights reserved.
            </p>
          </div>
          <ul className="p-0 list-none">
            <li className="mb-4">
              <p className="font-bold text-white">Company</p>
            </li>
            <li className="mb-3">
              <Link href="/" className="font-medium text-white">
                Home
              </Link>
            </li>
            <li className="mb-3">
              <Link href="/about-us" className="font-medium text-white">
                About Us
              </Link>
            </li>
            <li className="mb-3">
              <a
                href="https://blog.tradestrek.com"
                target="_blank"
                rel="noreferrer"
                className="font-medium text-white"
              >
                Blog
              </a>
            </li>
            <li className="mb-3">
              <Link href="/contact" className="font-medium text-white">
                Contact
              </Link>
            </li>
            <li className="mb-3">
              <Link href="/faq" className="font-medium text-white">
                FAQ
              </Link>
            </li>
          </ul>
          <ul className="p-0 list-none">
            <li className="mb-4">
              <p className="font-bold text-white">Legal</p>
            </li>
            <li className="mb-3">
              <Link href="/terms-conditions" className="font-medium text-white">
                Terms & Conditions
              </Link>
            </li>
            <li className="mb-3">
              <Link href="/privacy-policy" className="font-medium text-white">
                Privacy Policy
              </Link>
            </li>
          </ul>

          <ul className="p-0 list-none">
            <li className="mb-4">
              <p className="font-bold text-white">Follow Us</p>
            </li>
            <li className="flex items-center gap-x-4">
              <a
                href={companyData?.facebook_url}
                target="_blank"
                rel="noreferrer"
              >
                <FaFacebook className="text-xl text-white" />
              </a>
              <a
                href={companyData?.twitter_url}
                target="_blank"
                rel="noreferrer"
              >
                <FaTwitter className="text-xl text-white" />
              </a>
              <a
                href={companyData?.instagram_url}
                target="_blank"
                rel="noreferrer"
              >
                <FaInstagram className="text-xl text-white" />
              </a>
              <a
                href={companyData?.linkedin_url}
                target="_blank"
                rel="noreferrer"
              >
                <FaLinkedin className="text-xl text-white" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
