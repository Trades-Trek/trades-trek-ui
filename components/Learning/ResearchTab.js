import { Tabs, MultiSelect } from "@mantine/core";
import moment from "moment";
import React, { useState, useEffect } from "react";
import {
  IconPhoto,
  IconMessageCircle,
  IconSettings,
  IconGitCommit,
  IconArrowsSort,
} from "@tabler/icons-react";
import StockInfo from "./StockDetailSearch";
import StockDetailGraph from "./StockDetailGraph";

import { useRouter } from "next/router";

import { stockService } from "../../services/stock.service";

const iconStyle = { width: 12, height: 12 };

const optionsNum = {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
};

const formatMarketCap = (value) => {
  return Number(value).toLocaleString("en", optionsNum);
};

const formatPE = (value) => {
  if (value) {
    try {
      const numberValue = Number(value);
      return numberValue.toFixed(2);
    } catch (error) {
      return value;
    }
  }
  return "";
};

const headers = [
  "Name",
  "Symbol",
  "Sector",
  "CSI",
  "Currency",
  "Price",
  "LastTradeTime",
  "Ask",
  "Bid",
  "AskSize",
  "BidSize",
  "PrevClose",
  "PrevCloseDate",
  "Change",
  "PerChange",
  "Open",
  "High",
  "Low",
  "Close",
  "EPS",
  "PE",
  "Volume",
  "High52Week",
  "Low52Week",
  "MktCap",
  "TradeDate",
  "Asset",
];

const Arrow = () => (
  <IconArrowsSort style={{ display: "inline-flex", width: 12, height: 12 }} />
);

const StockList = ({ stockAllData, switchToStockDetails }) => {
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortColumn, setSortColumn] = useState(null);
  const [stocks, setStocks] = useState(stockAllData);

  useEffect(() => {
    setStocks(stockAllData);
    return () => {};
  }, [stockAllData]);

  const handleSort = (columnName) => {
    let newSortOrder = sortOrder;
    if (sortColumn === columnName) {
      // If clicking on the same column, toggle the sort order
      newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    } else {
      // If clicking on a different column, default to ascending order
      newSortOrder = "asc";
    }
    setSortOrder(newSortOrder);
    setSortColumn(columnName);

    // Sort the stockAllData array based on the selected column and order
    const sortedData = [...stocks].sort((a, b) => {
      const aValue = a[columnName];
      const bValue = b[columnName];

      if (typeof aValue === "number" && typeof bValue === "number") {
        return newSortOrder === "asc" ? aValue - bValue : bValue - aValue;
      } else {
        const lowerAValue = String(aValue).toLowerCase();
        const lowerBValue = String(bValue).toLowerCase();
        return newSortOrder === "asc"
          ? lowerAValue.localeCompare(lowerBValue)
          : lowerBValue.localeCompare(lowerAValue);
      }
    });
    setStocks(sortedData);
  };

  const HeaderWrapper = ({ title, sortable, column }) => (
    <th
      onClick={() => {
        if (sortable) {
          handleSort(column);
        }
      }}
    >
      <span style={{ cursor: "pointer" }}>
        {title}
        &nbsp;&nbsp;
        {sortable && <Arrow />}{" "}
      </span>
    </th>
  );

  return (
    <table class="table-auto">
      <thead>
        <tr>
          <HeaderWrapper title="Stock Name" sortable={true} column="Name" />
          <HeaderWrapper title="Symbol" sortable={true} column="Symbol" />
          <HeaderWrapper title="Price ₦" sortable={true} column="Price" />
          <HeaderWrapper title="Change ₦" sortable={true} column="Change" />
          <HeaderWrapper title="Change %" sortable={true} column="PerChange" />
          <HeaderWrapper title="Sector" sortable={true} column="Sector" />
        </tr>
      </thead>
      <tbody>
        {stocks.map((eachStock) => (
          <tr>
            <td
              className="stock-name-td"
              style={{ cursor: "pointer" }}
              onClick={() => {
                switchToStockDetails(eachStock);
              }}
            >
              {eachStock.Name}
            </td>
            <td>{eachStock.Symbol}</td>
            <td>{eachStock?.Last?.toFixed(2)}</td>
            <td>{eachStock?.Change?.toFixed(2)} </td>
            <td>{eachStock?.PerChange?.toFixed(2)}</td>
            <td>{eachStock?.Sector}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const Screener = ({ stockAllData, switchToStockDetails }) => {
  const [value, setValue] = useState(["Name", "Symbol", "Sector", "Price"]);
  const [selectOptions, setSelectOptions] = useState([
    "Select All",
    ...headers,
  ]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortColumn, setSortColumn] = useState(null);
  const [stocks, setStocks] = useState(stockAllData);

  useEffect(() => {
    setStocks(stockAllData);
    return () => {};
  }, [stockAllData]);

  const handleSort = (columnName) => {
    let newSortOrder = sortOrder;
    if (sortColumn === columnName) {
      // If clicking on the same column, toggle the sort order
      newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    } else {
      // If clicking on a different column, default to ascending order
      newSortOrder = "asc";
    }
    setSortOrder(newSortOrder);
    setSortColumn(columnName);

    // Sort the stockAllData array based on the selected column and order
    const sortedData = [...stocks].sort((a, b) => {
      const aValue = a[columnName];
      const bValue = b[columnName];

      if (typeof aValue === "number" && typeof bValue === "number") {
        return newSortOrder === "asc" ? aValue - bValue : bValue - aValue;
      } else {
        const lowerAValue = String(aValue).toLowerCase();
        const lowerBValue = String(bValue).toLowerCase();
        return newSortOrder === "asc"
          ? lowerAValue.localeCompare(lowerBValue)
          : lowerBValue.localeCompare(lowerAValue);
      }
    });
    setStocks(sortedData);
  };

  const HeaderWrapper = ({ title, sortable, column }) => (
    <th
      onClick={() => {
        if (sortable) {
          handleSort(column);
        }
      }}
    >
      <span style={{ cursor: "pointer" }}>
        {title}
        &nbsp;&nbsp;
        {sortable && <Arrow />}{" "}
      </span>
    </th>
  );

  return (
    <div>
      <div className="" style={{ marginTop: 20, marginBottom: 20 }}>
        <MultiSelect
          label="Add/remove table column"
          placeholder="Add/remove table column"
          data={selectOptions}
          searchable
          value={value}
          onChange={(v) => {
            if (v[v.length - 1] === "Select All") {
              setValue(headers);
              setSelectOptions(headers);
              return;
            }

            if (
              v.length === headers.length - 1 &&
              !selectOptions.includes("Select All")
            ) {
              setSelectOptions(["Select All", ...headers]);
            }

            setValue(v);
          }}
        />
      </div>

      <table class="table-auto">
        <thead>
          <tr>
            {value.map((header) => {
              if (header === "Price") {
                return (
                  <HeaderWrapper
                    title="Price ₦"
                    sortable={true}
                    column={header}
                  />
                );
              }

              if (header === "PerChange") {
                return (
                  <HeaderWrapper
                    title="PerChange %"
                    sortable={true}
                    column={header}
                  />
                );
              }

              if (header === "Change") {
                return (
                  <HeaderWrapper
                    title="Change ₦"
                    sortable={true}
                    column={header}
                  />
                );
              }

              return (
                <HeaderWrapper title={header} sortable={true} column={header} />
              );
            })}
          </tr>
        </thead>
        <tbody>
          {stocks.map((eachStock) => (
            <tr key={eachStock.Symbol}>
              {value.map((column) => {
                if (column === "Name") {
                  return (
                    <td
                      key={column}
                      className="stock-name-td"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        switchToStockDetails(eachStock);
                      }}
                    >
                      {eachStock[column]}
                    </td>
                  );
                }

                if (column === "Price") {
                  return <td key={column}>{eachStock[column]?.toFixed(2)}</td>;
                }

                if (column === "MktCap") {
                  return (
                    <td key={column}>{formatMarketCap(eachStock[column])}</td>
                  );
                }

                if (column === "EPS") {
                  return <td key={column}>{eachStock[column]?.toFixed(2)}</td>;
                }

                if (column === "PE") {
                  return <td key={column}>{formatPE(eachStock[column])}</td>;
                }

                if (column === "LastTradeTime") {
                  return (
                    <td key={column}>
                      {eachStock[column]
                        ? moment(eachStock[column]).format(
                            "YYYY-MM-DD HH:mm:ss"
                          )
                        : ""}
                    </td>
                  );
                }

                if (column === "PrevCloseDate") {
                  return (
                    <td key={column}>
                      {eachStock[column]
                        ? moment(eachStock[column]).format(
                            "YYYY-MM-DD HH:mm:ss"
                          )
                        : ""}
                    </td>
                  );
                }

                if (column === "Change") {
                  return <td key={column}>{eachStock[column]?.toFixed(2)}</td>;
                }

                if (column === "PerChange") {
                  return <td key={column}>{eachStock[column]?.toFixed(2)}</td>;
                }

                if (column === "TradeDate") {
                  return (
                    <td key={column}>
                      {eachStock[column]
                        ? moment(eachStock[column]).format(
                            "YYYY-MM-DD HH:mm:ss"
                          )
                        : ""}
                    </td>
                  );
                }

                return <td key={column}>{eachStock[column]}</td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Research = () => {
  const router = useRouter();

  const [stockAllData, setStockAllData] = useState([]);
  const [activeTab, setActiveTab] = useState(router.query.tab || "pricelist");
  const [selectedStock, setSelectedStock] = useState({});
  const [
    selectedStock_StockDetailsTab,
    setSelectedStock_StockDetailsTab,
  ] = useState("");

  useEffect(() => {
    stockService
      .getAllStock()
      .then((res) => {
        setStockAllData(res.data.length ? res.data : []);
      })
      .catch((err) => {
        setStockAllData([]);
      });
  }, []);

  const switchToTab = (tabValue) => {
    router.push(`?tab=${tabValue}`);
  };

  useEffect(() => {
    setActiveTab(router.query.tab || "pricelist");
  }, [router.query.tab]);

  const switchToStockDetails = (selectedStock) => {
    setSelectedStock(selectedStock);
    setActiveTab("stockdetails");
    router.push(`?tab=stockdetails&symbol=${selectedStock.Symbol}`);
  };

  return (
    <Tabs value={activeTab} style={{ padding: 30 }}>
      <Tabs.List style={{ justifyContent: "center" }}>
        <Tabs.Tab
          value="pricelist"
          leftSection={<IconPhoto style={iconStyle} />}
          onClick={() => switchToTab("pricelist")}
        >
          Pricelist
        </Tabs.Tab>
        <Tabs.Tab
          value="stockdetails"
          leftSection={<IconMessageCircle style={iconStyle} />}
          onClick={() => switchToTab("stockdetails")}
        >
          Stock Details
        </Tabs.Tab>
        <Tabs.Tab
          value="screener"
          leftSection={<IconSettings style={iconStyle} />}
          onClick={() => switchToTab("screener")}
        >
          Screener
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="pricelist">
        {" "}
        <StockList
          stockAllData={stockAllData}
          switchToStockDetails={switchToStockDetails}
        />{" "}
      </Tabs.Panel>

      <Tabs.Panel value="stockdetails">
        <StockDetailGraph
          stockData={stockAllData}
          stockSelected={selectedStock_StockDetailsTab}
        />
        <StockInfo
          setSelectedStock_StockDetailsTab={setSelectedStock_StockDetailsTab}
          stockAllData={stockAllData}
        />
      </Tabs.Panel>

      <Tabs.Panel value="screener" style={{ overflow: "scroll" }}>
        {" "}
        <Screener
          stockAllData={stockAllData}
          switchToStockDetails={switchToStockDetails}
        />{" "}
      </Tabs.Panel>
    </Tabs>
  );
};

export default Research;
