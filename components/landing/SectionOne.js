

const SectionOne = () => {
  return (
    <div className="w-full bg-palette-one">
      <div className="max-w-[1200px] mx-auto px-3 md:px-0 pt-10">
        <div className="flex flex-col items-center w-full overflow-x-hidden gap-y-12 md:flex-row gap-x-6">
          <div className="md:w-[527px]">
            <h1 className="text-[28px] text-center md:text-left md:text-[40px] font-bold mb-3">
              Master Stock Trading With The Trades Trek Simulator App- The Best
              Stock Trading Simulator in Nigeria
              {/* Unlock your <span className="text-[#2525BB]" >financial</span> potentials with <span className="text-[#2525BB]" >Trades Trek</span> */}
            </h1>
            <p className="mb-10 text-lg font-light text-center md:text-left">
              Welcome to the ultimate stock trading simulator that will
              supercharge your investment journey. With our realistic,
              cutting-edge simulator application, you'll gain the skills and
              confidence needed to succeed in the Nigerian stock market.
            </p>
            <div className="flex items-center justify-center md:justify-start gap-x-3">
              <a
                href="https://apps.apple.com/ng/app/trades-trek/id6451382635"
                target="_blank"
                rel="noreferrer"
              >
                <img src="/images/landing/appstore.png" alt="appstore" />
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.tradestrek.tradestrek"
                target="_blank"
                rel="noreferrer"
              >
                <img src="/images/landing/playstore.png" alt="playstore" />
              </a>
            </div>
          </div>
          <div>
            <div className="flex items-end gap-14 ">
              <img
                src="/images/landing/Home/Illustrate1.png"
                alt="illustrate"
                className="w-full md:w-1/2"
              />
              <img
                src="/images/landing/Home/Illustrate2.png"
                alt="illustrate"
                className="hidden md:w-1/2 md:block md:h-[502px]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionOne;
