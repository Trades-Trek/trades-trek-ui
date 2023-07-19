import { useState } from "react";
import { Dialog } from "@headlessui/react";
import {
  ArrowPathIcon,
  CloudArrowUpIcon,
  FingerPrintIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import { ServerIcon } from "@heroicons/react/20/solid";
import WebApp from './webappsvg'

const features2 = [
  {
    name: "Trade",
    description:
      "We Provide expert  educational resources on the basics of investing in the financial market, including terminology, different types of investments, and risk management strategies.",
    icon: <svg width={100} height={100} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M61.459 48.854C61.5284 48.854 61.8757 48.7498 62.5007 48.5415L75.0007 41.354C75.3479 41.1457 75.609 40.886 75.784 40.5748C75.959 40.2637 76.0451 39.9332 76.0423 39.5832C76.0423 39.236 75.9548 38.9068 75.7798 38.5957C75.6048 38.2846 75.3451 38.0235 75.0007 37.8123L62.5007 30.6248C62.4312 30.5554 62.084 30.4512 61.459 30.3123L60.4173 30.6248L47.9173 37.8123C47.5701 38.0207 47.309 38.2818 47.134 38.5957C46.959 38.9096 46.8729 39.2387 46.8757 39.5832C46.8757 39.9304 46.9632 40.261 47.1382 40.5748C47.3132 40.8887 47.5729 41.1485 47.9173 41.354L60.4173 48.5415C60.5562 48.611 60.9034 48.7151 61.459 48.854ZM61.459 61.2498C61.8062 61.2498 62.1534 61.1985 62.5007 61.0957C62.8479 60.9929 63.1951 60.836 63.5423 60.6248L70.834 56.4582C71.459 56.111 71.9632 55.6068 72.3465 54.9457C72.7298 54.2846 72.9201 53.5735 72.9173 52.8123V46.4582L61.459 53.1248L50.0007 46.4582V52.8123C50.0007 53.5762 50.1923 54.2887 50.5757 54.9498C50.959 55.611 51.4618 56.1137 52.084 56.4582L59.3757 60.6248C59.7229 60.8332 60.0701 60.9901 60.4173 61.0957C60.7646 61.2012 61.1118 61.2526 61.459 61.2498ZM16.6673 16.6665H83.334C85.6257 16.6665 87.5882 17.4832 89.2215 19.1165C90.8548 20.7498 91.6701 22.711 91.6673 24.9998V74.9998C91.6673 77.2915 90.8507 79.254 89.2173 80.8873C87.584 82.5207 85.6229 83.336 83.334 83.3332H66.6673C65.4868 83.3332 64.4965 82.9332 63.6965 82.1332C62.8965 81.3332 62.4979 80.3443 62.5007 79.1665C62.5007 77.986 62.9007 76.9957 63.7007 76.1957C64.5007 75.3957 65.4896 74.9971 66.6673 74.9998H83.334V24.9998H16.6673C16.6673 26.1804 16.2673 27.1707 15.4673 27.9707C14.6673 28.7707 13.6784 29.1693 12.5007 29.1665C11.3201 29.1665 10.3298 28.7665 9.52983 27.9665C8.72983 27.1665 8.33122 26.1776 8.334 24.9998C8.334 22.7082 9.15067 20.7457 10.784 19.1123C12.4173 17.479 14.3784 16.6637 16.6673 16.6665ZM10.4173 83.3332H17.709C18.6118 83.3332 19.3409 83.0026 19.8965 82.3415C20.4521 81.6804 20.6257 80.9693 20.4173 80.2082C19.8618 77.986 18.7854 76.0762 17.1882 74.479C15.5909 72.8818 13.6812 71.8054 11.459 71.2498C10.6951 71.0415 9.98261 71.2151 9.3215 71.7707C8.66039 72.3262 8.33122 73.0554 8.334 73.9582V81.2498C8.334 81.8054 8.54234 82.2915 8.959 82.7082C9.37567 83.1248 9.86178 83.3332 10.4173 83.3332ZM33.334 83.3332C34.5146 83.3332 35.4868 82.9165 36.2507 82.0832C37.0146 81.2498 37.3271 80.2776 37.1882 79.1665C36.2854 72.7082 33.559 67.204 29.009 62.654C24.459 58.104 18.9562 55.379 12.5007 54.479C11.3896 54.3401 10.4173 54.6526 9.584 55.4165C8.75067 56.1804 8.334 57.1526 8.334 58.3332C8.334 59.4443 8.71595 60.4165 9.47984 61.2498C10.2437 62.0832 11.2159 62.6387 12.3965 62.9165C16.5632 63.7498 20.1229 65.6429 23.0757 68.5957C26.0284 71.5485 27.9201 75.1054 28.7507 79.2665C29.0284 80.4471 29.584 81.4193 30.4173 82.1832C31.2507 82.9471 32.2229 83.3304 33.334 83.3332ZM50.0007 83.3332C51.1812 83.3332 52.1715 82.9165 52.9715 82.0832C53.7715 81.2498 54.1007 80.2776 53.959 79.1665C53.4729 73.6804 52.0673 68.5235 49.7423 63.6957C47.4173 58.8679 44.4132 54.6151 40.7298 50.9373C37.0493 47.2568 32.7951 44.254 27.9673 41.929C23.1396 39.604 17.984 38.1971 12.5007 37.7082C11.3896 37.5693 10.4173 37.8998 9.584 38.6998C8.75067 39.4998 8.334 40.4887 8.334 41.6665C8.334 42.7776 8.734 43.7498 9.534 44.5832C10.334 45.4165 11.3229 45.9026 12.5007 46.0415C21.2507 47.0137 28.7159 50.5901 34.8965 56.7707C41.0771 62.9512 44.6534 70.4165 45.6257 79.1665C45.7646 80.3471 46.234 81.3373 47.034 82.1373C47.834 82.9373 48.8229 83.336 50.0007 83.3332Z" fill="#050505" />
  </svg>,
  },
  {
    name: "Simulations",
    description:
      "We Offer simulated investing experiences to allow users to practice investing without risking real money.",
    icon: LockClosedIcon,
  },
  {
    name: "News and Insights",
    description:
      "We provide world class up-to-date news and insights on the financial market to help users make informed investment decisions.",
    icon: ArrowPathIcon,
  },
  {
    name: "Portfolio Tracking",
    description:
      " We allow users to track their investments and monitor their portfolio performance in real-time.",
    icon: FingerPrintIcon,
  },
  // {
  //   name: "Community",
  //   description:
  //     "Arcu egestas dolor vel iaculis in ipsum mauris. Tincidunt mattis aliquet hac quis. Id hac maecenas ac donec pharetra eget.",
  //   icon: FingerPrintIcon,
  // },
];

const features = [
  {
    name: "Push to deploy.",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
    icon: CloudArrowUpIcon,
  },
  {
    name: "SSL certificates.",
    description:
      "Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.",
    icon: LockClosedIcon,
  },
  {
    name: "Database backups.",
    description:
      "Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.",
    icon: ServerIcon,
  },
];

const navigation = [
  { name: "Home", href: "#" },
  { name: "Blog", href: "#" },
  { name: "About Us", href: "#" },
  { name: "FAQ", href: "#" },
  { name: "Support", href: "#" },
];
const Hero = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isYearlyBilling, setIsYearlyBilling] = useState(true);

  const handleSwitchToggle = () => {
    setIsYearlyBilling(!isYearlyBilling);
  };

  return (
    <WebApp />
    // <div className="bg-white">
    //   <header className="absolute inset-x-0 top-0 z-50">
    //     <nav
    //       className="flex items-center justify-between p-6 lg:px-8"
    //       aria-label="Global"
    //     >
    //       <div className="flex lg:flex-1">
    //         <a href="#" className="-m-1.5 p-1.5">
    //           <img className="h-8 w-auto" src="/images/tradestrek.png" alt="" />
    //         </a>
    //         <h3 className="flex items-center pl-2">Trade Trek</h3>
    //       </div>
    //       <div className="flex lg:hidden">
    //         <button
    //           type="button"
    //           className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
    //           onClick={() => setMobileMenuOpen(true)}
    //         >
    //           <span className="sr-only">Open main menu</span>
    //           <Bars3Icon className="h-6 w-6" aria-hidden="true" />
    //         </button>
    //       </div>
    //       <div className="hidden lg:flex lg:gap-x-12">
    //         {navigation.map((item) => (
    //           <a
    //             key={item.name}
    //             href={item.href}
    //             className="text-sm font-semibold leading-6 text-gray-900"
    //           >
    //             {item.name}
    //           </a>
    //         ))}
    //       </div>
    //       <div className="hidden lg:flex lg:flex-1 lg:justify-end">
    //         <a
    //           href="#"
    //           className="inline-block px-4 py-2 text-sm font-semibold leading-6 text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:bg-purple-700 active:bg-purple-800 rounded-none"
    //           style={{ width: "70px", height: "30px" }}
    //         >
    //           Sign in
    //         </a>
    //       </div>
    //     </nav>
    //     <Dialog
    //       as="div"
    //       className="lg:hidden"
    //       open={mobileMenuOpen}
    //       onClose={setMobileMenuOpen}
    //     >
    //       <div className="fixed inset-0 z-50" />
    //       <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
    //         <div className="flex items-center justify-between">
    //           <a href="#" className="-m-1.5 p-1.5">
    //             <span className="sr-only">Your Company</span>
    //             <img
    //               className="h-8 w-auto"
    //               src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
    //               alt=""
    //             />
    //           </a>
    //           <button
    //             type="button"
    //             className="-m-2.5 rounded-md p-2.5 text-gray-700"
    //             onClick={() => setMobileMenuOpen(false)}
    //           >
    //             <span className="sr-only">Close menu</span>
    //             <XMarkIcon className="h-6 w-6" aria-hidden="true" />
    //           </button>
    //         </div>
    //         <div className="mt-6 flow-root">
    //           <div className="-my-6 divide-y divide-gray-500/10">
    //             <div className="space-y-2 py-6">
    //               {navigation.map((item) => (
    //                 <a
    //                   key={item.name}
    //                   href={item.href}
    //                   className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
    //                 >
    //                   {item.name}
    //                 </a>
    //               ))}
    //             </div>
    //             <div className="py-6">
    //               <a
    //                 href="#"
    //                 className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
    //               >
    //                 Log in
    //               </a>
    //             </div>
    //           </div>
    //         </div>
    //       </Dialog.Panel>
    //     </Dialog>
    //   </header>

    //   <div className="relative isolate px-6 pt-14 lg:px-8">
    //     <div
    //       className="absolute inset-x-0 -top-40 -z-10  overflow-hidden  sm:-top-80"
    //       aria-hidden="true"
    //     >
    //       <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem]   sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
    //     </div>
    //     <div
    //       className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10  overflow-hidden  sm:top-[calc(100%-30rem)]"
    //       aria-hidden="true"
    //     >
    //       <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem]   sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" />
    //     </div>
    //   </div>
    //   <div className="overflow-hidden bg-white py-24 sm:py-32">
    //     <div className="mx-auto max-w-7xl px-6 lg:px-8">
    //       <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
    //         <div className="lg:pr-8 lg:pt-4">
    //           <div className="lg:max-w-lg">
    //             <h6 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
    //               Invest like a pro with <br />
    //               our financial market
    //               <br /> guide
    //             </h6>
    //             <p className="mt-6 text-lg leading-8 text-gray-600">
    //               Welcome to your financial future! Our homepage is your gateway
    //               to learning, investing, and achieving financial success.
    //             </p>
    //           </div>
    //         </div>
    //         <img
    //           src="/images/orange.png"
    //           alt="Product screenshot"
    //           //   className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
    //           //   width={2432}
    //           //   height={1442}
    //         />
    //       </div>
    //     </div>
    //   </div>

    //   {/* features */}
    //   <div className="bg-white py-24 sm:py-32">
    //     <div className="mx-auto max-w-7xl px-6 lg:px-8">
    //       <div className="mx-auto max-w-2xl lg:text-center">
    //         <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
    //           Features
    //         </p>
    //       </div>
    //       <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
    //         <dl className="grid grid-cols-1 gap-32 sm:grid-cols-2 lg:grid-cols-2">
    //           {features2.map((feature) => (
    //             <div
    //               key={feature.name}
    //               className="bg-white rounded-lg p-6 w-full h-full border rounded-[3px]  shadow-2xl"
    //             >
    //               <dt className="text-base font-bold leading-7 text-black text-center text-4xl">
    //               {feature.icon}
    //                 {feature.name}
    //               </dt>
    //               <dd className="mt-2 text-base leading-7 text-gray-600">
    //                 {feature.description}
    //               </dd>
    //             </div>
    //           ))}

    //           <div className="">
    //             <img
    //               style={{ height: "100%", width: "100%" }}
    //               src="/images/blackmansmile.png"
    //               className=" object-cover"
    //               alt="Smiling man"
    //             />
    //           </div>
    //         </dl>
    //       </div>
    //     </div>
    //   </div>
  


    // < WhyUse />
    //  <Testimonial />



    //   {/* Pricing */}
    //   <div className="min-h-screen pb-28 sm:pb-0">
    //     <div className="font-poppins font-bold text-6xl text-center ">
    //       Pricing
    //     </div>

    //     <div className="flex items-center justify-center mt-36">
    //     <div className="flex  p-1 h-[50px] w-max bg-[#000000] rounded-lg">
    //       <button
    //         className={`rounded-l-lg px-4 py-2 h-full ${
    //           isYearlyBilling
    //             ? "bg-blue-500 text-white"
    //             : "bg-[#000000] text-white"
    //         }`}
    //         onClick={handleSwitchToggle}
    //       >
    //         Billed Yearly
    //       </button>
    //       <button
    //         className={`rounded-r-lg px-4 py-2 h-full ${
    //           isYearlyBilling
    //             ? "bg-[#000000] text-white"
    //             : "bg-blue-500 text-white"
    //         }`}
    //         onClick={handleSwitchToggle}
    //       >
    //         Billed Quarterly
    //       </button>
    //     </div>
    //     </div>

    //     <div className="lg:h-[767px] bg-white">
    //       <div className="max-w-7xl min-h-screen mx-auto p-4 sm:p-10 lg:py-20">
    //         <div className="max-w-5xl mx-auto text-center text-white tracking-widest pb-10 lg:pb-20">
    //           <h1 className="text-3xl sm:text-5xl font-black"> Pricing </h1>
    //         </div>
    //         <div className="flex flex-col lg:flex-row justify-center items-center  gap-8 lg:gap-0 lg:mt-4">
    //           <div className="flex-1 w-full mb-6 bg-[#181818] text-white rounded-xl shadow-xl lg:scale-95 ">
    //             <div className="text-center p-12">
    //               <p className="text-3xl lg:text-2xl xl:text-3xl pb-4 text-[#F45531]">
    //                 Basic Plan
    //               </p>
    //               <div className="flex justify justify-center items-center">
    //                 <span className="font-extrabold text-5xl lg:text-4xl xl:text-6xl align-text-middle px-3">
    //                   ₦0
    //                 </span>
    //               </div>
    //             </div>
    //             <div className="-6 bg-[#181818] text-white rounded-b-xl p-10">
    //               <ul className="space-y-4 text-white">
    //                 {[
    //                   "Expert Insight",
    //                   "Master Guide",
    //                   "Basic Course",
    //                   "Simulation tool",
    //                   "premium support",
    //                 ].map((eachList) => (
    //                   <li className="flex" key={eachList}>
    //                     <svg
    //                       xmlns="http://www.w3.org/2000/svg"
    //                       className="h-6 w-6 mr-3 "
    //                       fill="none"
    //                       viewBox="0 0 24 24"
    //                       stroke="currentColor"
    //                     >
    //                       <path
    //                         strokeLinecap="round"
    //                         strokeLinejoin="round"
    //                         strokeWidth={2}
    //                         d="M5 13l4 4L19 7"
    //                       />
    //                     </svg>
    //                     <span className="">{eachList}</span>
    //                   </li>
    //                 ))}
    //               </ul>
    //               <button
    //                 type="button"
    //                 className="w-full text-center bg-[#181818] text-lg text-white mt-8 p-3 shadow-xl transition hover:text-white  border-2 border-[#8000FF] rounded-[40px] mb-6"
    //               >
    //                 Request Access
    //               </button>
    //               <span className="flex items-center justify-center text-center text-white font-medium text-lg">
    //                 It’s free so why not
    //               </span>
    //             </div>
    //           </div>

    //           <div className="lg:max-w-max mb-6 relative w-full bg-[#181818] rounded-xl shadow-xl border-2 border-indigo-600 lg:scale-110 z-10">
    //             <div className="text-center p-12">
    //               <p className="text-3xl lg:text-2xl xl:text-3xl pb-4 font-semibold text-[#8000FF]">
    //                 Standard Plan
    //               </p>
    //               <div className="flex justify justify-center items-center">
    //                 <span className="font-extrabold text-5xl lg:text-4xl xl:text-6xl align-text-middle px-3 text-white">
    //                   ₦2,800
    //                 </span>
    //               </div>
    //               <span className="font-normal text-xl text-gray-500 inline-block align-text-middle m-2 text-[#FCFCFC]">
    //                 Quarterly
    //               </span>
    //             </div>
    //             <div className="bg-[#181818] rounded-b-xl p-10">
    //               <ul className="space-y-4 text-white">
    //                 {[
    //                   "Expert Insight",
    //                   "Master Guide",
    //                   "Basic Course",
    //                   "Simulation tool",
    //                   "premium support",
    //                 ].map((eachList) => (
    //                   <li className="flex" key={eachList}>
    //                     <svg
    //                       xmlns="http://www.w3.org/2000/svg"
    //                       className="h-6 w-6 mr-3 "
    //                       fill="none"
    //                       viewBox="0 0 24 24"
    //                       stroke="currentColor"
    //                     >
    //                       <path
    //                         strokeLinecap="round"
    //                         strokeLinejoin="round"
    //                         strokeWidth={2}
    //                         d="M5 13l4 4L19 7"
    //                       />
    //                     </svg>
    //                     <span className="">{eachList}</span>
    //                   </li>
    //                 ))}
    //               </ul>
    //               <button
    //                 type="button"
    //                 className="w-full text-center bg-[#8000FF] text-lg text-white mt-8 p-3 shadow-xl transition hover:text-white  border-2 border-[#8000FF] rounded-[40px] mb-6"
    //               >
    //                 Request Access
    //               </button>

    //               <span className="flex items-center justify-center text-center text-white font-medium text-lg">
    //                 Save ₦23 per year
    //               </span>
    //             </div>
    //           </div>

    //           <div className="flex-1 w-full mb-6 bg-[#181818] rounded-xl shadow-xl lg:scale-95">
    //             <div className="text-center p-12">
    //               <p className="text-3xl lg:text-2xl xl:text-3xl pb-4 text-[#00FFA0]">
    //                 Premium Plan
    //               </p>
    //               <div className="flex justify justify-center items-center">
    //                 <span className="font-extrabold text-5xl lg:text-4xl xl:text-6xl align-text-middle px-3 text-white">
    //                   ₦3,800
    //                 </span>
    //               </div>
    //               <span className="font-normal text-xl text-gray-500 inline-block align-text-middle m-2 text-[#FCFCFC]">
    //                 Monthly
    //               </span>
    //             </div>
    //             <div className="bg-[#181818] rounded-b-xl p-10">
    //               <ul className="space-y-4 text-white">
    //                 {[
    //                   "Expert Insight",
    //                   "Master Guide",
    //                   "Basic Course",
    //                   "Simulation tool",
    //                   "premium support",
    //                 ].map((eachList) => (
    //                   <li className="flex" key={eachList}>
    //                     <svg
    //                       xmlns="http://www.w3.org/2000/svg"
    //                       className="h-6 w-6 mr-3 "
    //                       fill="none"
    //                       viewBox="0 0 24 24"
    //                       stroke="currentColor"
    //                     >
    //                       <path
    //                         strokeLinecap="round"
    //                         strokeLinejoin="round"
    //                         strokeWidth={2}
    //                         d="M5 13l4 4L19 7"
    //                       />
    //                     </svg>
    //                     <span className="">{eachList}</span>
    //                   </li>
    //                 ))}
    //               </ul>
    //               <button
    //                 type="button"
    //                 className="w-full text-center bg-[#181818] text-lg text-white mt-8 p-3 shadow-xl transition hover:text-white  border-2 border-[#8000FF] rounded-[40px] mb-6"
    //               >
    //                 Request Access
    //               </button>

    //               <span className="flex items-center justify-center text-center text-white font-medium text-lg">
    //                 Save ₦23 per year
    //               </span>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    //   {/* Pricing */}

    //   {/* FAQ */}

    //   <div className="py-24 sm:py-32 m-10 mb-96 px-10">
    //     <div className="font-poppins font-bold text-6xl text-center mb-36">
    //       Frequently Asked Questions
    //     </div>
    //     <section className="w-5/12">
    //       <div className="font-poppins font-bold text-4xl ">
    //         What kind of investment can I make?
    //       </div>
    //       <div className="font-poppins font-normal text-xl my-12">
    //         This is completely up to you. We provide you guides and tools to
    //         understand the financial market.
    //       </div>
    //       <div className="border-t-2 border-gray-300 "></div>
    //     </section>
    //   </div>

    //   {/* FAQ */}

    //   {/* ready to be investment pro */}
    //   <div className="bg-black text-white py-24 sm:py-32 m-10 mb-96">
    //     <div className="mx-auto max-w-7xl px-6 lg:px-8">
    //       <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-2">
    //         <div className="mx-auto flex flex-col gap-y-4">
    //           <dd
    //             style={{ lineHeight: "50px" }}
    //             className="order-first text-3xl font-semibold   sm:text-5xl"
    //           >
    //             ARE YOU READY TO BE AN INVESTMENT PRO?
    //           </dd>
    //         </div>

    //         <div className="mx-auto flex  gap-8">
    //           <button className="px-8 py-5 flex items-center justify-center gap-2 w-50 h-14 rounded bg-white text-black rounded-lg">
    //             GET STARTED
    //           </button>
    //           <button className="px-8 py-5 flex items-center justify-center gap-2 w-50 h-14 rounded bg-black text-white rounded-lg border-2 border-white">
    //             CONTACT US
    //           </button>
    //         </div>
    //       </dl>
    //     </div>
    //   </div>
    //   {/* ready to be investment pro */}

    //   {/* download app */}
    //   <div className="overflow-hidden bg-[#E9FA1E] ">
    //     <div className="mx-auto max-w-8xl px-6 lg:px-8">
    //       <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
    //         <div className="lg:pr-8 lg:pt-4 flex items-center justify-center">
    //           <div className="lg:max-w-lg div-to-be centered">
    //             <div
    //               className="mt-2 text-5xl font-bold tracking-tight  sm:text-5xl"
    //               style={{ lineHeight: "5rem" }}
    //             >
    //               Come let’s learn,
    //               <br />
    //               Earn and invest
    //               <br />
    //               Together with
    //               <div className="flex my-2 gap-5 items-center">
    //                 <div className="image-container h-[50px] w-[50px]">
    //                   <img src="/images/tradestrek.png" alt="Trade Trek" />
    //                 </div>
    //                 <span className="text-3xl">Trade Trek</span>
    //               </div>
    //               Mobile App
    //             </div>
    //           </div>
    //         </div>
    //         <div className="">
    //           <img
    //             src="/images/mobilephones.png"
    //             alt="Product screenshot"
    //             className="w-full h-full object-cover"
    //           />
    //         </div>
    //       </div>
    //     </div>
    //   </div>

    //   {/* download app */}

    //   {/* footer */}
    //   <footer className="bg-black text-white p-28">
    //     <div className="max-w-screen-xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
    //       <div className="flex flex-wrap md:flex-nowrap items-center justify-between mb-8">
    //         <div className="w-full md:w-2/5">
    //           <h2 className="text-xl font-bold">Trade Trek</h2>
    //           <p className="text-sm">Let’s help you grow, invest & earn</p>
    //         </div>
    //         <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 w-full md:w-3/5">
    //           <li>
    //             <ul className="mt-4 space-y-6">
    //               <li>Pricing</li>
    //               <li>Community</li>
    //               <li>Track Portfolio</li>
    //               <li>Expert Mentors</li>
    //             </ul>
    //           </li>
    //           <li>
    //             <ul className="mt-4 space-y-6">
    //               <li>About us</li>
    //               <li>Terms & Condition</li>
    //               <li>Portfolio Manager</li>
    //               <li>Services</li>
    //             </ul>
    //           </li>
    //           <li>
    //             <ul className="mt-4 space-y-6">
    //               <li>Support</li>
    //               <li>Privacy Policies</li>
    //               <li>Portfolio</li>
    //               <li>Stock</li>
    //             </ul>
    //           </li>
    //           <li>
    //             <ul className="mt-4 space-y-6">
    //               <li>Contact</li>
    //               <li>Blog</li>
    //               <li>Trade trak@gmail.org</li>
    //             </ul>
    //           </li>
    //         </ul>
    //       </div>
    //     </div>
    //   </footer>
    //   <div class="bg-black text-white text-center">
    //     &copy; <span class="font-bold">{new Date().getFullYear()}</span>. All
    //     rights reserved.
    //   </div>
    //   {/* footer */}
    // </div>
  );
};

export default Hero;
