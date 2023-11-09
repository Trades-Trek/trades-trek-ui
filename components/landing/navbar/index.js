import { useRouter } from "next/router";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";
import { useEffect, useState } from "react";

const Navbar = () => {
  const router = useRouter();
  const pathname = router.asPath;
  const [openMenu, setOpenMenu] = useState(false);

  useEffect(() => {
    setOpenMenu(false);
  }, [pathname]);

  return (
    <div className="w-full bg-palette-one">
      <div className="max-w-[1200px] mx-auto px-3 md:px-0">
        <div className="flex items-center justify-between w-full h-28 ">
          <Link href="/">
            <img src="/images/landing/Nav/Logo.png" alt="Logo" />
          </Link>
          <ul className="hidden md:flex p-0 gap-x-[35px] items-center list-none">
            <li>
              <a href="/" className="text-lg font-light text-black">
                Home
              </a>
            </li>
            <li>
              <Link href="/about-us" className="text-lg font-light text-black">
                About Us
              </Link>
            </li>
            <li>
              <a
                href="https://blog.tradestrek.com"
                target="_blank"
                rel="noreferrer"
                className="text-lg font-light text-black"
              >
                Blog
              </a>
            </li>
            <li>
              <Link href="/contact" className="text-lg font-light text-black">
                Contact Us
              </Link>
            </li>
            <li>
              <Link href="/faq" className="text-lg font-light text-black">
                FAQ
              </Link>
            </li>
            <li>
              <a
                href="https://play.google.com/store/apps/details?id=com.tradestrek.tradestrek"
                target="_blank"
                rel="noreferrer"
              >
                <button className="px-5 h-[57px] border-none bg-palette-two text-white rounded-[15px] text-lg font-semibold">
                  Get App Now
                </button>
              </a>
            </li>
          </ul>
          <FiMenu
            className="text-3xl font-semibold md:hidden"
            onClick={() => setOpenMenu(true)}
          />
          <div
            className={`md:hidden transition-all duration-500 right-0 top-0 fixed overflow-hidden bg-white z-[99999] h-screen ${
              openMenu ? "w-screen" : "w-0"
            }`}
          >
            <div>
              <div className="flex justify-end px-3 pt-6 pb-10">
                <FiX
                  onClick={() => setOpenMenu(false)}
                  className="text-3xl text-black"
                />
              </div>
              <ul className="list-none">
                <li className="px-4 py-3 border-y">
                  <Link href="/" className="text-lg font-medium text-black">
                    Home
                  </Link>
                </li>
                <li className="px-4 py-3 border-y">
                  <Link
                    href="/about-us"
                    className="text-lg font-medium text-black"
                  >
                    About Us
                  </Link>
                </li>
                <li className="px-4 py-3 border-y">
                  <a
                    href="https://blog.tradestrek.com"
                    target="_blank"
                    rel="noreferrer"
                    className="text-lg font-medium text-black"
                  >
                    Blog
                  </a>
                </li>
                <li className="px-4 py-3 border-y">
                  <Link
                    href="/contact"
                    className="text-lg font-medium text-black"
                  >
                    Contact Us
                  </Link>
                </li>
                <li className="px-4 py-3 border-y">
                  <Link href="/faq" className="text-lg font-medium text-black">
                    FAQ
                  </Link>
                </li>

                <li className="flex justify-center px-4 py-3 border-t">
                  <a
                    href="https://play.google.com/store/apps/details?id=com.tradestrek.tradestrek"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <button className="px-8 h-[47px] border-none bg-palette-two text-white rounded-[15px] font-semibold">
                      Get the App
                    </button>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
