import Navbar from "../navbar";
import Footer from "../footer";
import {  ToastContainer } from "react-toastify";
const LandingPageLayout = ({ children }) => {
  return (
    <div
      className='landing-page-layout'
    >
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
      <div className="w-full">
        <Navbar />
      </div>
      <div className="min-h-screen">
      { children }
      </div>
      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
};

export default LandingPageLayout;
