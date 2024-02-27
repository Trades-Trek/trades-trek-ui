import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import React, { useState, useEffect } from "react";
import { Tabs, MultiSelect } from "@mantine/core";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import {
  IconArrowsSort,
} from "@tabler/icons-react";

const Arrow = () => (
  <IconArrowsSort style={{ display: "inline-flex", width: 12, height: 12 }} />
);

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

const Screener = ({ stockAllData, switchToStockDetails }) => {
  const [value, setValue] = useState(["Name", "Symbol", "Sector", "Price"]);
  const [parameter, setParameter] = useState("");

  const [selectOptions, setSelectOptions] = useState([
    "Select All",
    ...headers,
  ]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortColumn, setSortColumn] = useState(null);
  const [stocks, setStocks] = useState(stockAllData);
  const [minValue, setMinValue] = useState("");
  const [maxValue, setMaxValue] = useState("");

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

  const handleChange = (event) => {
    setParameter(event.target.value);
  };

  return (
    <div>
      {/* <div className="" style={{ marginTop: 20, marginBottom: 20 }}> */}
      {/* <MultiSelect
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
          /> */}
      {/* </div> */}

      <Box sx={{ display: "flex" }}>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 4, width: "25ch", ml: 0 },
          }}
          autoComplete="off"
        >
          <FormControl>
            <InputLabel id="demo-simple-select-label">Parameter</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={parameter}
              label="Select Parameter"
              onChange={handleChange}
            >
              <MenuItem value="Last">Price/Last</MenuItem>,
              <MenuItem value="PerChange">Per Change</MenuItem>,
              <MenuItem value="EPS">EPS</MenuItem>,
              <MenuItem value="PE">PE</MenuItem>,
              <MenuItem value="Volume">Volume</MenuItem>,
              <MenuItem value="High52Week">High 52 Week</MenuItem>,
              <MenuItem value="Low52Week">Low 52 Week</MenuItem>,
              <MenuItem value="MktCap">Mkt Cap</MenuItem>
            </Select>
          </FormControl>

          {parameter && (
            <>
              <TextField
                id="outlined-controlled"
                label={`Minimum ${parameter}`}
                value={minValue}
                onChange={(event) => {
                  setMinValue(event.target.value);
                }}
              />
              <TextField
                id="outlined-uncontrolled"
                label={`Maximum ${parameter}`}
                value={maxValue}
                onChange={(event) => {
                  setMaxValue(event.target.value);
                }}
              />

              <Button
                style={{ background: "blue", height: "50px" }}
                variant="contained"
              >
                Search
              </Button>
            </>
          )}
        </Box>
      </Box>

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

export default Screener;
