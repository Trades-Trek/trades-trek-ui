import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import React, { useState, useEffect } from "react";
import { Tabs, MultiSelect } from "@mantine/core";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import moment from "moment";
import { stockService } from "../../services/stock.service";
import { Loader } from "@mantine/core";
import { sort } from "fast-sort";

import {
  IconArrowsSort,
  IconHistoryToggle,
  IconArrowAutofitDown,
} from "@tabler/icons-react";

const Arrow = () => (
  <IconArrowsSort style={{ display: "inline-flex", width: 12, height: 12 }} />
);

const optionsNum = {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
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

const formatMarketCap = (value) => {
  if (value) {
    return Number(value).toLocaleString("en", optionsNum);
  } else {
    return value;
  }
};

const format_Num = (value) => {
  if (value) {
    try {
      const numberValue = Number(value);
      return numberValue.toFixed(2);
    } catch (error) {
      return value;
    }
  }
  return value;
};

const formatEPS = (value) => {
  if (value) {
    try {
      const numberValue = Number(value);
      return numberValue.toFixed(2);
    } catch (error) {
      return value;
    }
  }
  return value;
};

const menuItems = [
  { value: "Last", label: "Price/Last" },
  { value: "PerChange", label: "Per Change" },
  { value: "EPS", label: "EPS" },
  { value: "PE", label: "PE" },
  { value: "Volume", label: "Volume" },
  { value: "High52Week", label: "High 52 Week" },
  { value: "Low52Week", label: "Low 52 Week" },
  { value: "MktCap", label: "Mkt Cap" },
  { value: "Sector", label: "Sector" },
];

const defaultShowChild = { 1: true, 2: false, 3: false };
const defaultMenuItems = { 1: menuItems, 2: menuItems, 3: menuItems };
const defaultChildOptions = {
  1: {
    property: "",
    minValue: "",
    maxValue: "",
  },
  2: {
    property: "",
    minValue: "",
    maxValue: "",
  },
  3: {
    property: "",
    minValue: "",
    maxValue: "",
  },
};

const Screener = ({ stockAllData, switchToStockDetails }) => {
  const [stockSectors, setStocksectors] = useState([]);

  useEffect(() => {
    stockService
      .getAllStockSectors()
      .then((res) => {
        setStocksectors(res.data.length ? res.data : []);
      })
      .catch((err) => {
        setStocksectors([]);
      });
  }, []);

  const [value, setValue] = useState(["Name", "Symbol", "Sector", "Price"]);
  const [stockMenuItems, setStockMenuItems] = useState(defaultMenuItems);
  const [showChild, setShowChild] = useState(defaultShowChild);
  const [selectedChildOptions, setSelectedChildOptions] = useState(
    defaultChildOptions
  );

  const [selectOptions, setSelectOptions] = useState([
    "Select All",
    ...headers,
  ]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortColumn, setSortColumn] = useState(null);
  const [stocks, setStocks] = useState(stockAllData);
  const [isFilterSearchLoading, setIsFilterSearchLoading] = useState(false);

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

    if (newSortOrder === "desc") {
      if (["Bid", "PE", "MktCap"].includes(columnName)) {
      
        setStocks(
          stocks.sort((a, b) => {
            const aValue = isNaN(a[columnName]) ? a[columnName] : Number(a[columnName]);
            const bValue = isNaN(b[columnName]) ? b[columnName] : Number(b[columnName]);
            return bValue - aValue;
          })
        );


      } else {
        const sorted = sort(stocks).desc((val) => val[columnName]);
        setStocks(sorted);
      }
    } else {
      if (["Bid", "PE", "MktCap"].includes(columnName)) {
        setStocks(
          stocks.sort((a, b) => {
            const aValue = isNaN(a[columnName]) ? a[columnName] : Number(a[columnName]);
            const bValue = isNaN(b[columnName]) ? b[columnName] : Number(b[columnName]);
            return aValue - bValue;
          })
        );
      } else {
        const sorted = sort(stocks).asc((val) => val[columnName]);
        setStocks(sorted);
      }
    }
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

  const hasAnyValue = Object.values(selectedChildOptions).some(
    (option) =>
      option.property !== "" || option.minValue !== "" || option.maxValue !== ""
  );

  const searchStockByFilter = async () => {
    if (!hasAnyValue) return;
    setIsFilterSearchLoading(true);
    try {
      const response = await stockService.filterStocks(selectedChildOptions);
      setIsFilterSearchLoading(false);

      if (response?.data) {
        setStocks(response?.data);
      }
    } catch (error) {
      setIsFilterSearchLoading(false);
    }
  };

  const clearFilter = () => {
    setStocks(stockAllData);
    setSelectedChildOptions(defaultChildOptions);
    setShowChild(defaultShowChild);
  };

  return (
    <div>
      <Box
        sx={{
          textAlign: "center",
          border: "1px solid #D3D3D3",
          p: 4,
          m: 4,
          pb: 1,
        }}
      >
        {[1, 2, 3].map((level) => (
          <Filter
            level={level}
            stockMenuItems={stockMenuItems}
            setStockMenuItems={setStockMenuItems}
            setShowChild={setShowChild}
            showChild={showChild}
            selectedChildOptions={selectedChildOptions}
            setSelectedChildOptions={setSelectedChildOptions}
            stockSectors={stockSectors}
          />
        ))}

        <Button
          onClick={clearFilter}
          style={{
            background: "blue",
            height: "50px",
            width: "80px",
            marginRight: "5px",
          }}
          variant="contained"
        >
          Clear
        </Button>
        <Button
          onClick={searchStockByFilter}
          style={{
            background:
              hasAnyValue && !isFilterSearchLoading
                ? "forestgreen"
                : "darkseagreen",
            height: "50px",
            width: "80px",
          }}
          variant="contained"
        >
          {isFilterSearchLoading ? "Loading" : "Search"}
        </Button>
      </Box>

      <Box sx={{ mt: 4 }}>
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
        {isFilterSearchLoading ? (
          <Loader size={30} style={{ margin: "10px auto" }} />
        ) : (
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
                    <HeaderWrapper
                      title={header}
                      sortable={true}
                      column={header}
                    />
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
                      return (
                        <td key={column}>
                          {eachStock[column]
                            ? eachStock[column].toFixed(2)
                            : eachStock["Last"]?.toFixed(2)}
                        </td>
                      );
                    }

                    if (column === "MktCap") {
                      return (
                        <td key={column}>
                          {formatMarketCap(eachStock[column])}
                        </td>
                      );
                    }

                    if (
                      [
                        "PE",
                        "EPS",
                        "Change",
                        "PerChange",
                        "Ask",
                        "Bid",
                        "AskSize",
                        "BidSize",
                        "High52Week",
                        "Low52Week",
                      ].includes(column)
                    ) {
                      return (
                        <td key={column}>{format_Num(eachStock[column])}</td>
                      );
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
        )}
      </Box>
    </div>
  );
};

export default Screener;

const Filter = ({
  setShowChild,
  showChild,
  level,
  stockMenuItems,
  selectedChildOptions,
  setSelectedChildOptions,
  stockSectors,
  setStockMenuItems,
}) => {
  const parameter = selectedChildOptions[level]?.property || "";
  const minValue = selectedChildOptions[level]?.minValue || "";
  const maxValue = selectedChildOptions[level]?.maxValue || "";

  const handleChange = (event) => {
    if (level === 1) {
      const newMenuItems = menuItems.filter(
        (item) => item.value !== event.target.value
      );
      const newObj = { 1: menuItems, 2: newMenuItems, 3: newMenuItems };
      setStockMenuItems(newObj);

      setSelectedChildOptions({
        ...selectedChildOptions,
        2: {
          property: "",
          minValue: "",
          maxValue: "",
        },
        3: {
          property: "",
          minValue: "",
          maxValue: "",
        },
      });
    }

    if (level === 2) {
      const newMenuItems = stockMenuItems[2].filter(
        (item) => item.value !== event.target.value
      );
      const newObj = { 1: menuItems, 2: stockMenuItems[2], 3: newMenuItems };
      setStockMenuItems(newObj);

      setSelectedChildOptions({
        ...selectedChildOptions,
        3: {
          property: "",
          minValue: "",
          maxValue: "",
        },
      });
    }

    setSelectedChildOptions({
      ...selectedChildOptions,
      [level]: { property: event.target.value, minValue: "", maxValue: "" },
    });
  };

  const clickHandler = () => {
    if (level === 1) {
      setSelectedChildOptions({
        ...selectedChildOptions,
        2: {
          property: "",
          minValue: "",
          maxValue: "",
        },
        3: {
          property: "",
          minValue: "",
          maxValue: "",
        },
      });

      if (showChild[2]) {
        setShowChild(defaultShowChild);
        return;
      }
    }

    setSelectedChildOptions({
      ...selectedChildOptions,
      3: {
        property: "",
        minValue: "",
        maxValue: "",
      },
    });
    setShowChild({ ...showChild, [level + 1]: !showChild[level + 1] });
  };

  const handleMin = (event) => {
    setSelectedChildOptions({
      ...selectedChildOptions,
      [level]: { ...selectedChildOptions[level], minValue: event.target.value },
    });
  };

  const handleMax = (event) => {
    setSelectedChildOptions({
      ...selectedChildOptions,
      [level]: { ...selectedChildOptions[level], maxValue: event.target.value },
    });
  };

  const handleMinMaxSectors = (event) => {
    setSelectedChildOptions({
      ...selectedChildOptions,
      [level]: {
        ...selectedChildOptions[level],
        maxValue: event.target.value,
        minValue: event.target.value,
      },
    });
  };

  return showChild[level] ? (
    <Box
      component="form"
      sx={{
        display: "flex",
        "& > :not(style)": { mx: 4, width: "25ch", ml: 0, mb: 2 },
      }}
      autoComplete="off"
    >
      <FormControl>
        <InputLabel id="demo-simple-select-label">Parameter</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          value={parameter}
          label="Select Parameter"
          onChange={handleChange}
        >
          {stockMenuItems[level].map(({ label, value }) => (
            <MenuItem key={value} value={value}>
              {label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {parameter && (
        <>
          {parameter === "Sector" ? (
            <FormControl>
              <InputLabel id="demo-simple-select-label">Sector</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                value={minValue}
                label="Select Sector"
                onChange={handleMinMaxSectors}
              >
                {stockSectors.map((value) => (
                  <MenuItem key={value} value={value}>
                    {value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ) : (
            <>
              <TextField
                id="outlined-controlled"
                label={`Minimum ${parameter}`}
                value={minValue}
                onChange={handleMin}
              />
              <TextField
                id="outlined-uncontrolled"
                label={`Maximum ${parameter}`}
                value={maxValue}
                onChange={handleMax}
              />
            </>
          )}

          {level == 3 ? null : (
            <Button
              onClick={clickHandler}
              style={{ background: "blue", height: "50px", width: "80px" }}
              variant="contained"
            >
              <IconArrowAutofitDown />
            </Button>
          )}
        </>
      )}
    </Box>
  ) : null;
};
