import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { StockChangePercent } from "../../helpers/StockChangePercent";
import { DataConvert, TimeConverter } from "../../helpers/DateTimeConverter";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { stockService } from "../../services/stock.service";
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import moment from "moment";

const PerformanceMetrics = ({ ratioData }) => {
  const timeframes = [
    { label: '1 day', value: ratioData?.oneDay?.ratio },
    { label: '5 days', value: ratioData?.fiveDays?.ratio },
    { label: '1 month', value: ratioData?.oneMonth?.ratio },
    { label: '6 months', value: ratioData?.sixMonths?.ratio  },
    { label: 'Year to date', value: ratioData?.yearToDate?.ratio },
    { label: '1 year', value: ratioData?.oneYear?.ratio },
  ];

  const formatValue = (value) => {
    if (!value) return '0.00%';
    const numericValue = parseFloat(value);
    return `${numericValue.toFixed(2)}%`;
  };

  const getValueColor = (value) => {
    if (!value) return 'text-gray-500';
    const numericValue = parseFloat(value);
    return numericValue >= 0 ? 'text-emerald-500' : 'text-red-500';
  };

  if (!ratioData) {
    return (
      <div className="flex justify-center items-center h-24 bg-gray-50 rounded-lg">
        <p className="text-gray-500">Select a stock to view performance metrics</p>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-4 p-4 bg-white rounded-lg shadow-sm">
      {timeframes.map((timeframe, index) => (
        <div
          key={timeframe.label}
          className={`flex flex-col items-center p-3 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors
            ${index === 0 ? 'bg-gray-100' : ''}`}
        >
          <div className="text-sm text-gray-600 mb-1">{timeframe.label}</div>
          <div className={`text-lg font-semibold ${getValueColor(timeframe.value)}`}>
            {formatValue(timeframe.value)}
          </div>
        </div>
      ))}
    </div>
  );
};

const StockInfo = ({ stockAllData, setSelectedStock_StockDetailsTab }) => {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [stockId, setStockId] = useState("");
  const [extraDetails, setExtraDetails] = useState([]);
  const [ratioData, setRatioData] = useState(null)
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    if (!value) return;
    setIsLoading(true);
    stockService
      .getStockRatios(value)
      .then((res) => {
        if (res.success) {
          setRatioData(res.data);
        } else {
          setRatioData(null);
        }
      })
      .catch(() => {
        setRatioData(null);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [value]);

  useEffect(() => {
    setValue(router.query?.symbol);
    return () => {};
  }, [router.query?.symbol]);

  useEffect(() => {
    if (!stockId) return;
    stockService
      .getExtraStockDetails(stockId)
      .then((res) => {
        if (res.success) {
          setExtraDetails([res.data]);
        } else {
          setExtraDetails([]);
        }
      })
      .catch(() => {
        setExtraDetails([]);
      });
    return () => {};
  }, [stockId]);

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
              if (value) {
                setValue(value.Symbol);
                setSelectedStock_StockDetailsTab(value.Symbol);
                setStockId(value._id);
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

        {isLoading ? (
          <div className="flex justify-center items-center h-24">
            <div className="animate-pulse text-gray-500">Loading metrics...</div>
          </div>
        ) : (
          <PerformanceMetrics ratioData={ratioData} />
        )}

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
      {extraDetails.length  > 0 && <ExtraDetailsTable data={extraDetails} />}

    </div>
  );
};

const ExtraDetailsTable = ({ data }) => {

  const extraDetails = data[0]?.extraDetails;
  const sector = data[0]?.sector;

  const tableData = [
    {
      key: "Exchange",
      label: "Exchange",
      value: extraDetails?.Exchange,
    },
    {
      key: "Description",
      label: "Description",
      value: extraDetails?.Description,
    },
    {
      key: "Subsector",
      label: "Subsector",
      value: extraDetails?.Subsector,
    },
    {
      key: "NatureOfBusiness",
      label: "Nature Of Business",
      value: extraDetails?.NatureOfBusiness,
    },
    {
      key: "CompanyAddress",
      label: "Company Address",
      value: extraDetails?.CompanyAddress,
    },
    {
      key: "ContactEmail",
      label: "Contact Email",
      value: extraDetails?.ContactEmail,
    },
    {
      key: "ContactNumber",
      label: "Contact Number",
      value: extraDetails?.ContactNumber,
    },

    {
      key: "Auditor",
      label: "Auditor",
      value: extraDetails?.Auditor,
    },

    {
      key: "Registrar",
      label: "Registrar",
      value: extraDetails?.Registrar,
    },
    {
      key: "CompanySecretary",
      label: "Company Secretary",
      value: extraDetails?.CompanySecretary,
    },
    {
      key: "Registrar",
      label: "Registrar",
      value: extraDetails?.Registrar,
    },
    {
      key: "Website",
      label: "Website",
      value: extraDetails?.Website,
    },

    {
      key: "BoardChairperson",
      label: "Board Chairperson",
      value: extraDetails?.BoardChairperson,
    },

    {
      key: "LegalStatus",
      label: "LegalStatus",
      value: extraDetails?.LegalStatus,
    },

    {
      key: "RegulatoryBody",
      label: "Regulatory Body",
      value: extraDetails?.RegulatoryBody,
    },

    {
      key: "PatentsOwned",
      label: "Patents Owned ",
      value: extraDetails?.PatentsOwned,
    },

    {
      key: "FoundedDate",
      label: "Founded Date",
      value: extraDetails?.FoundedDate ? moment(extraDetails?.FoundedDate).format("YYYY-MM-DD") : "-"
    },

    {
      key: "DateListed",
      label: "Date Listed",
      value: extraDetails?.DateListed ? moment(extraDetails?.DateListed).format("YYYY-MM-DD") : "-",
    },

    {
      key: "EmployeeCount",
      label: "EmployeeCount",
      value: extraDetails?.EmployeeCount,
    },

    {
      key: "Description",
      label: "Description",
      value: extraDetails?.Description,
    },

    {
      key: "MarketClassification",
      label: "Market Classification",
      value: extraDetails?.MarketClassification,
    },

    {
      key: "BoardOfDirectors",
      label: "Board Of Directors",
      value: extraDetails?.BoardOfDirectors.join(", "),
    },

    {
      key: "SharesOutstanding",
      label: "SharesOutstanding",
      value: extraDetails?.SharesOutstanding,
    },

    {
      key: "Instagram",
      label: "Instagram",
      value: extraDetails?.Instagram,
    },

    {
      key: "Instagram",
      label: "Instagram",
      value: extraDetails?.Instagram,
    },

    {
      key: "Twitter",
      label: "Twitter",
      value: extraDetails?.Twitter,
    },

    {
      key: "Facebook",
      label: "Facebook",
      value: extraDetails?.Facebook,
    },
    {
      key: "category",
      label: "category",
      value: sector?.category,
    },
  ];

  const rows = tableData.map((item, index) => (
    <TableRow key={index}>
      <TableCell>{item.label}</TableCell>
      <TableCell>{item.value}</TableCell>
    </TableRow>
  ));

  return (
    <TableContainer component={Paper}>
    <Table aria-label="extra details table">
      <tbody>
        {rows}
      </tbody>
    </Table>
  </TableContainer>
  );
};

export default StockInfo;
