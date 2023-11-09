// import SectionFive from "../components/landing/SectionFive"
// import SectionFour from "../components/landing/SectionFour"
// import SectionOne from "../components/landing/SectionOne"
// import SectionSix from "../components/landing/SectionSix"
// import SectionThree from "../components/landing/SectionThree"
// import SectionTwo from "../components/landing/SectionTwo"
// import LandingPageLayout from '../components/landing/layout';

// const Homepage = () => {
//   return (
//     <div>
//       <SectionOne />
//       <SectionTwo />
//       <SectionThree />
//       <SectionFour />
//       <SectionFive />
//       <SectionSix />
//     </div>
//   )
// }


// const LandingPage = () => <LandingPageLayout><Homepage/></LandingPageLayout>
// export default LandingPage


import Login from "./login";

export default function Index() {
  return (
    <>
      <Login />
    </>
  );
}
