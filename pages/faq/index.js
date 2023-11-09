import { useState } from "react";
import LandingPageLayout from "../../components/landing/layout";
import { BsPlusCircle, BsDashCircle } from "react-icons/bs";
import { BsSearch } from "react-icons/bs";

const Faq = () => {
    const [query, setQuery] = useState("");

    const [selectedFaq, setSelectedFaq] = useState(null);
    const handleSelect = (id) => {
      if (selectedFaq === id) {
        setSelectedFaq(null);
      } else {
        setSelectedFaq(id);
      }
    };

  return(
    <LandingPageLayout>
    <div className="w-full faqPage bg-palette-one">
    <div className="pb-[177px]" >
      <div className="pt-[45px]">
        <div className="flex justify-center">
          <div className="relative w-fit mb-[3.5rem]">
            <h2 className="text-2xl text-center md:text-[32px] font-black pb-6">
              Frequently Asked Questions(FAQs)
            </h2>
            <div className="absolute bottom-0 w-[83px] h-[9px] bg-palette-two left-20 md:left-0 rounded-[40px]"></div>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="md:w-[759px] h-[67px] flex items-center bg-white border-none drop-shadow-xl relative rounded-[15px]">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full h-full bg-transparent border-none focus:outline-none pl-14"
            placeholder="Search for questions"
          />
          <BsSearch className="absolute left-6 text-zinc-300" />
        </div>
      </div>
    </div>
  </div>


  <div className="bg-[#F9F9F9] pt-[77px] pb-[75px] px-2 md:px-0 faq" id="faq">
      <div className="flex flex-col items-center justify-center gap-y-4">
        {faqs.filter(faq => faq.question.toLocaleLowerCase().includes(query.toLocaleLowerCase())
        )?.map((faq, id) => (
          <div
            key={id}
            onClick={() => handleSelect(id)}
            className="w-full md:w-[740px] px-[25px] bg-white shadow rounded-3xl"
          >
            <div className="flex items-center justify-between py-8 gap-x-2">
              <p className="text-base font-semibold md:text-3xl">
                {faq.question}
              </p>
              {selectedFaq === id ? (
                <BsDashCircle
                  className="text-base font-bold cursor-pointer md:text-2xl"
                  onClick={() => handleSelect(id)}
                />
              ) : (
                <BsPlusCircle
                  className="text-base font-bold cursor-pointer md:text-2xl"
                  onClick={() => handleSelect(id)}
                />
              )}
            </div>
            <div
              className={`text-xl overflow-hidden transition-all duration-500 ${
                selectedFaq === id ? "max-h-[1500px]" : "max-h-0"
              }`}
            >
              <div className="pb-4 text-sm md:text-base" dangerouslySetInnerHTML={{__html:faq.answer}} />
            </div>
          </div>
        ))}
      </div>
    </div>
  </LandingPageLayout>
  )
}

export default Faq

const faqs = [
    {
      question: "What is Trades Trek about?",
      answer: `<p>Trades Trek Limited is an investment and financial education technology company. We are dedicated to helping individuals learn about investment strategies, investing terminologies, and opportunities. We aim to achieve this using a platform that teaches you how trading works.</p><br/>
      <p>Our company was founded with the belief that investing is not just for the wealthy, but for anyone who wants to grow their wealth and achieve their financial goals.</p>`,
    },
    {
      question: "How do I check my Trade History?",
      answer: `<b/>Open the App/Load the link:</b>Begin this process by loading the link for the Web App on any working browser of your choice or tap the icon that represents the Mobile Application on your phone.<br /><br/>
      <b>Login:</b>You should tap on the login button after correctly filling in your email/username and password in the corresponding fields once the Web App/Mobile loads or opens as expected.<br/><br/>
      <b>Click on "Portfolio"</b>: Navigate to the “Portfolio” section of the screen.<br/><br/>
      <b>Click on the “Trade History” button.</b>`,
    },
    {
      question: "How do I Download my Trade History?",
      answer: `<p><b>Open the App/Load the link:</b> Begin this process by loading the link for the Web App on any working browser of your choice or tap the icon that represents the Mobile Application on your phone.</p><br/>
      <p><b>Login:</b> You should tap on the login button after correctly filling in your email/username and password in the corresponding fields once the Web App/Mobile loads or opens as expected.</p><br/>
      <p><b>Click on "Portfolio":</b> Navigate to the “Portfolio” section of the screen.</p><br/>
      <bClick on the “Download Trade History” button.></bClick>`,
    },
    {
      question: "How to View Other Users' Portfolios",
      answer: `<p>To view other Users' Portfolios in a Competition, take the following steps</p><br/>
      <ul>
        <li>Go to Competition</li>
        <li>Click on Summary/Leaderboard</li>
        <li>Click on the User's name</li>
      </ul>`,
    },
    {
      question: "What are stocks?",
      answer: `<p>A stock, also known as a share or equity, represents ownership in a company. When you buy a stock, you become a partial owner of that company and are entitled to a portion of its assets and profits. Companies issue stocks as a way to raise capital for expansion, research, and development, or other business activities.</p><br/>
      <p>Investing in stocks can be a way to potentially grow wealth over the long term. Some investors buy stocks with the expectation that their value will increase over time, allowing them to sell the stocks at a higher price and make a profit. Additionally, some stocks pay dividends, which are regular cash payments made by the company to its shareholders as a share of its profits.</p><br/>
      <p>    <b>• Steps to picking a stock:</b>
      To get started with trading on the Web App/Mobile App, here are a few steps to placing
      trades:</p><br/>
      <ol >
        <li><b>Open the App:</b> The first step is to load the link for the Web App on any working browser of your choice or tap the icon that represents the Mobile Application on your phone.</li>
        <li><b>Login:</b> Once the Web App/Mobile loads or opens as expected, you should tap on the login button after filling in your email/username and password correctly in the corresponding fields.</li>
        <li><b>Click on "Trade":</b> Navigate to the “Trade” section of the screen, tap on it, and get the following actions done.</li>
        <li><b>Select a Symbol:</b> This represents the stocks of the Company you want to trade on</li>
        <li><b>Explanation of Trades Types</b></li>
      </ol>`,
    },
    // {
    //   question: "How can I download the User Manual?",
    //   answer: ``,
    // },
    // {
    //   question: "I'm new to trading. How do I get started?",
    //   answer: ``,
    // },
    {
      question: "How do I see my game rankings/leaderboard?",
      answer: `<p><b>To see your game rankings, kindly follow these instructions</b></p><br/>
      <ul>
        <li>Open the App/Visit (<a href="https://www.tradestrek.com" >www.tradestrek.com</a>)</li>
        <li>Click Competition (Click Competition from the Menu Icon)</li>
      </ul>
      <p>The Summary tab is automatically selected as the page opens</p>`,
    },
    {
      question: "How do I create a Private Competition?",
      answer: `<p>The following steps are required to create a Private Competition</p><br/>
      <ul>
        <li>Open the App/Website (www.tradestrek.com)</li>
        <li>Click on competition (Click competition from the Menu Icon)</li>
        <li>Click on Create competition</li>
        <li>Fill in the details:</li>
        <ol>
          <li>Competition name (should be at least 10 characters)</li>
          <li>Competition description (should be at least 20 characters)</li>
          <li>Select competition type (Select Private and fill in your desired password)</li>
          <li>Select start & end date</li>
          <li>Select starting cash</li>
          <li>Allow trading with margin (if needed)</li>
          <li>Allow short selling</li>
          <li>Allow late entry</li>
          <li>Allow portfolio viewing</li>
          <li>Allow portfolio setting</li>
          <li>Select market delay (minutes to take while trading)</li>
          <li>Select "daily volume" </li>
          <li>Select Quick Sell</li>
          <li>Select Minimum Price</li>
          <li>Select Minimum Price Short</li>
          <li>Select Minimum Stock for Margin</li>
          <li>Select Commission</li>
          <li>Margin Interest</li>
          <li>Click on Create Competition.</li>
        </ol>
      </ul>`,
    },
    {
      question: "How do I update my Private Competition Settings?",
      answer: `<ul>
        <li>Open the App/Visit (www.tradestrek.com)</li>
        <li>Click competition (Click competition from the Menu Icon)</li>
        <li>Select "My competition"</li>
        <li>Select "Competition setting" on any of the Private competitions created by you</li>
        <li>After resetting, select "Update competition rule".</li>
      </ul>`,
    },
    {
      question: "How do I join a game or Invite People to a game?",
      answer: `<ul>
        <li>Open the App/Visit the website (www.tradestrek.com)</li>
        <li>Click on competition (Click on competition from the menu icon)</li>
        <li>Select My competition</li>
        <li>Select invite to competition on the game you intend to invite a friend</li>
        <li>Add the email address & press enter on your keypad</li>
        <li>Then, send.</li>
      </ul>`,
    },
    {
      question: "How do I delete or leave a game?",
      answer: `<p>How to get started with deleting a competition on the Web App/Mobile App, follow these few steps accordingly:</p>
      <ul>
        <li>Open the App/Visit the website (www.tradestrek.com)</li>
        <li>Click on competition (Click on competition from the menu icon)</li>
        <li>Select My competition</li>
        <li>Click Delete Competition</li>
      </ul>`,
    },
    // {
    //   question: "How to leave a Competition on the Web App/Mobile App, follow these few steps accordingly:",
    //   answer: ``,
    // },
    // {
    //   question: "How do I resolve the billing issue?",
    //   answer: ``,
    // },
  ];