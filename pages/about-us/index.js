
import LandingPageLayout from '../../components/landing/layout';


const About = () => {
  return (
    <LandingPageLayout>
    <div>
      <div className=" bg-palette-one">
        <div className="max-w-[1200px] px-3 md:px-0 mx-auto pt-[72px] pb-[122px]">
          <h2 className="md:text-center capitalize text-[28px] md:text-[40px] font-bold mb-[25px]">
            We are your Pocket-sized investment adventure
          </h2>
          <p className="font-light md:font-normal md:text-center text-lg mb-[45px] leading-[25px]">
            At Trades Trek, we believe that financial success should be within
            everyone&apos;s reach. We&apos;re dedicated to providing you with
            the knowledge and tools you need to navigate the world of
            investments and achieve your financial goals.
          </p>
        </div>
      </div>
      <div className=" pt-[84px] pb-32 w-full">
        <div className="max-w-[1200px] mx-auto px-3 md:px-0">
          {/* Row 1 */}
          <div className="grid w-full grid-cols-1 overflow-hidden rounded-3xl purpleBg md:grid-cols-2 mb-14 md:items-center">
            <div>
              <img src="/images/landing/About/Illustrate1.png" alt="illustration" className="w-full" />
            </div>
            <div className="md:pl-[77px]">
              <div className="md:w-[473px] px-4 md:px-0">
                <p className="text-white font-bold text-2xl md:text-[32px] mt-[30px] mb-[15px] md:mt-0 md:mb-8">
                  Our Mission
                </p>
                <p className="font-medium text-white md:mb-0 mb-[43px]">
                  Building a household name through excellent services is our
                  core value: excellent services come through professionalism
                  and a dexterous approach to work hence our services target
                  maximum utilities to our various client&apos;s/customers and
                  contribute positively to social and environmental values.
                </p>
              </div>
            </div>
          </div>
          {/* Row 2 */}
          <div className="grid w-full grid-cols-1 overflow-hidden rounded-3xl purpleBg md:grid-cols-2 md:items-center">
            <div className="md:pl-[86px]">
              <div className="md:w-[473px] px-4 md:px-0">
                <p className="text-white font-bold text-2xl md:text-[32px] mt-[30px] mb-[15px] md:mt-0 md:mb-8">
                  Our Vision
                </p>
                <p className="font-medium text-white md:mb-0 mb-[43px]">
                  our vision is to set a standard that is worthy of emulation in
                  all areas of our and devil the standard that would speak for
                  us and represent who we are.
                </p>
              </div>
            </div>
            <div className="order-first md:order-last">
              <img src="/images/landing/About/Illustrate2.png" alt="illustration" className="w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
    </LandingPageLayout>
  );
};

export default About;
