import { FiDribbble } from "react-icons/fi";
import { MdReduceCapacity } from "react-icons/md";
import { GiChart, GiBlackBook, GiPieChart, GiTeacher } from "react-icons/gi";

import { BiSolidBarChartAlt2, BiNews } from "react-icons/bi";

const benefits = [
  {
    icon: <GiChart size={30} />,
    title: "Realistic Trading Environment",
    content: `Trades Trek stock trading simulator replicates the actual stock market, providing you with a genuine trading experience. You'll have access to real-time market data and a user-friendly interface that mirrors popular trading platforms.
    `,
  },
  {
    icon: <GiBlackBook size={30} />,
    title: "Risk-Free Learning",
    content: `Worried about losing your hard-earned money while learning the ropes of stock trading? With our simulator, you can practice with virtual funds, eliminating the risk of financial loss. It's the perfect sandbox for honing your skills.
    `,
  },
  {
    icon: <GiPieChart size={30} />,
    title: "Comprehensive Stock Universe",
    content: `Our simulator features an extensive range of stocks, including top-performing companies from various industries. This allows you to diversify your portfolio and explore different trading strategies.
    `,
  },
  {
    icon: <BiSolidBarChartAlt2 size={30} />,
    title: "Advanced Charting Tools",
    content: `Make informed decisions using our powerful charting tools. You can analyze price trends, set indicators, and experiment with technical analysis to refine your trading strategies.`,
  },

  {
    icon: <GiTeacher size={30} />,
    title: "Educational Resources",
    content: ` Access a treasure trove of educational content, from beginner-friendly guides to advanced trading techniques. We're here to support your growth as a trader.
    `,
  },

  {
    icon: <BiNews size={30} />,
    title: "Real-Time News Feeds",
    content: ` Stay ahead of market movements with real-time news feeds and economic indicators. You'll receive up-to-the-minute information that can impact your trading decisions.`,
  },

  {
    icon: <MdReduceCapacity size={30} />,
    title: "Community and Support",
    content: `Join our active trading community, where you can exchange ideas, discuss strategies, and seek advice from experienced traders. Our support team is also available to assist you at any time`,
  },
];

const SectionThree = () => {
  return (
    <div className="w-full bg-palette-one">
      <div className="max-w-[1200px] mx-auto pb-24 px-4 md:px-0">
        <div className="pt-[52px]">
          <div className="flex justify-center">
            <div className="relative w-fit mb-14">
              <h2 className="text-2xl md:text-[32px] font-bold pb-3">
                Why Choose The Trades Trek Stock Trading Simulator?
              </h2>
              <div className="absolute bottom-0 w-[83px] h-[9px] bg-palette-two left-0 rounded-[40px]"></div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-[30px]">
          {benefits.map((benefit, id) => (
            <div
              key={id}
              className="bg-white rounded-[20px] shadow-xl px-2.5 pt-[30px] pb-[55px] "
            >
              <div className="flex justify-center">
                <div className="w-[72px] h-[72px] mb-[18px] rounded-full bg-[#EBEBEB] flex justify-center items-center">
                  {/* <img src={benefit.icon} alt="benefit" /> */}
                  {/* <SiSololearn size={40}/> */}
                  {benefit.icon}
                </div>
              </div>
              <p className="text-center font-medium text-[22px] mb-2">
                {benefit.title}
              </p>
              <p className="text-center font-light text-lg leading-[25px]">
                {benefit.content}{" "}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectionThree;
