import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { StockChangePercent } from "../../helpers/StockChangePercent";
import { DataConvert, TimeConverter } from "../../helpers/DateTimeConverter";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";


const StockInfo = ({ stockAllData, setSelectedStock_StockDetailsTab }) => {
  const router = useRouter();
  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(router.query?.symbol);
    return () => {};
  }, [router.query?.symbol]);

  const arrayOfSymbol = stockAllData.map((e) => e.Symbol);
  const arrayOfName = stockAllData.map((e) => e.Name);
  const selectedStockArray = stockAllData.filter(
    (e) => e.Symbol === value || e.Name === value
  );

  let stockData = {};
  if (selectedStockArray.length > 0) {
    stockData = selectedStockArray[0];
  }

  const searchArrays = [...arrayOfName, ...arrayOfSymbol];

  return (
    <div className="p-20">
      <div style={{ margin: 20, padding: 20 }}>
        <div style={{ marginBottom: 20 }}>
          <Autocomplete
            id="country-stock-demo"
            sx={{ width: "100%" }}
            options={stockAllData}
            onChange={(event, value) => {
              if(value){
                setValue(value.Symbol)
                setSelectedStock_StockDetailsTab(value.Symbol)
              }
            }}
            autoHighlight
            getOptionLabel={(option) => option.Symbol}
            renderOption={(props, option) => (
              <Box
                component="li"
                sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                {...props}
              >
                {option.Symbol} ({option.Name})
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Choose a stock"
                inputProps={{
                  ...params.inputProps,
                  autoComplete: "new-password", // disable autocomplete and autofill
                }}
              />
            )}
          />
        </div>
        {selectedStockArray.length > 0 && (
          <div className="showMax">
            <div className="grid--2">
              <div className="gridColLeft showMaxData">
                <div className="logoArea">
                  {/* <div className="trade-stock-icon">
                    <Image
                      src="/images/Apple_logo_black.png"
                      layout="responsive"
                      width={32}
                      height={40}
                      alt="Logo"
                    />
                  </div> */}
                  <div className="brandName">
                    <h4>
                      {stockData?.Name}
                      <span>{stockData?.Symbol}</span>
                    </h4>
                  </div>
                </div>
                <div className="titleRow">
                  <h3 className="font-30">
                    {stockData?.Last?.toFixed(2)
                      ?.toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    <sub>{stockData?.Currency}</sub>
                    <span>
                      <sub>
                        {stockData?.Change >= 0
                          ? `+ ${stockData?.Change?.toFixed(2)
                              ?.toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
                          : `- ${stockData?.Change?.toFixed(2)
                              ?.toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
                        (
                        {StockChangePercent(
                          stockData?.Change,
                          stockData?.Last,
                          stockData?.Open
                        ) + "%"}
                        ){" "}
                      </sub>
                    </span>
                    <span className="font-12">
                      At Close {DataConvert(stockData?.PrevCloseDate)}{" "}
                      {TimeConverter(stockData?.PrevCloseDate)}
                    </span>
                  </h3>
                  {/* <h3 className="font-16">
                    No trade
                    <span className="font-12 selected">+Pre Market</span>
                  </h3> */}
                  {/* <h3 className="font-16">
                    August 2<span className="font-12">Upcoming Earning</span>
                  </h3> */}
                  <h3 className="font-16">
                    {Number(stockData?.EPS)
                      ?.toFixed(2)
                      ?.toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",") || 0.0}
                    <span className="font-12">Eps</span>
                  </h3>
                  <h3 className="font-16">
                    {Number(stockData?.MktCap)
                      ?.toFixed(2)
                      ?.toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",") || 0.0}
                    <span className="font-12">Market Cap</span>
                  </h3>
                  {/* <h3 className="font-16">
                    2.1465
                    <span className="font-12">Div Yield</span>
                  </h3> */}
                  <h3 className="font-16">
                    {Number(stockData?.PE)
                      ?.toFixed(2)
                      ?.toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",") || 0.0}
                    <span className="font-12">P/E</span>
                  </h3>
                </div>
                <div className="innerRow grid--2">
                  <div className="volumeDataLeft">
                    <div className="currentData">
                      <p className="font-16">Volume(current)</p>
                      <p className="font-14">
                        {stockData?.Volume?.toString().replace(
                          /\B(?=(\d{3})+(?!\d))/g,
                          ","
                        )}
                      </p>
                    </div>
                    <div className="currentData">
                      <p className="font-16">Day&apos;s High(₦)</p>
                      <p className="font-14">
                        {Number(stockData?.High)
                          ?.toFixed(2)
                          ?.toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",") || 0.0}
                      </p>
                    </div>
                    <div className="currentData">
                      <p className="font-16">Day&apos;s LOW(₦)</p>
                      <p className="font-14">
                        {Number(stockData?.Low)
                          ?.toFixed(2)
                          ?.toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",") || 0.0}
                      </p>
                    </div>
                  </div>
                  <div className="volumeDataRight">
                    <div className="currentData">
                      <p className="font-16">52 Week High(₦)</p>
                      <p className="font-14">
                        {Number(stockData?.High52Week)
                          ?.toFixed(2)
                          ?.toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",") || 0.0}
                      </p>
                    </div>
                    <div className="currentData">
                      <p className="font-16">Bid/Ask price(₦)</p>
                      <p className="font-14">
                        {(
                          (Number(stockData?.Bid) || 0) /
                          (Number(stockData?.Ask) || 1)
                        )
                          .toFixed(2)
                          ?.toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",") || 0.0}
                      </p>
                    </div>
                    <div className="currentData">
                      <p className="font-16">52 Week Low(₦)</p>
                      <p className="font-14">
                        {Number(stockData?.Low52Week)
                          ?.toFixed(2)
                          ?.toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",") || 0.0}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="gridColRight">
         
                <iframe className="graphBox" src=''></iframe>
              </div> */}
            </div>
          </div>
        )}
        {value && (
          <div className="buttonGroup" style={{ width: "20%" }}>
            <div
              style={{ cursor: "pointer", padding: "10px 20px" }}
              onClick={() => {
                localStorage.setItem("stock", JSON.stringify(stockData));
                router.push(`/dashboard/trade-stocks`);
              }}
            >
              <a className="btn form--submit">Trade</a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StockInfo;
