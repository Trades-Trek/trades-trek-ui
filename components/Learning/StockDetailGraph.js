import LineChart from "./LineChart";
import React, { useEffect, useState, Fragment } from "react";
import { stockService } from "../../services/stock.service";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

const defaultStockProperty = {
    Name: "Last",
    Symbol: "Price",
  }

const StockDetailGraph = ({  stockSelected }) => {
  const [graphData, setGraphData] = useState();
  const [typeData, setTypeData] = useState("week");
  const [propertySelected, setPropertySelected] = useState(defaultStockProperty);

  useEffect(() => {
    if (!propertySelected?.Name || !stockSelected) return;
    stockService.stockDetailGraph({
        stock: stockSelected,
        typeData,
        perSelected: propertySelected?.Name,
      })
      .then((res) => {
        if (res.success) {
          setGraphData(res.data);
        } else {
          setGraphData();
        }
      })
      .catch((err) => {
        setGraphData();
      });
  }, [typeData, stockSelected, propertySelected]);

  return (
    <div className="profileContainerRightGraph mt-8">
     
    
    { stockSelected &&  <div
        style={{
          display: "flex",
          gap: "30px",
          border: "1px solid grey",
          padding: "10px",
          marginBottom: "30px",
        }}
      > <DropDown
          handlerFunction={setPropertySelected}
          title="select property"
          stockData={[
            {
              Name: "EPS",
              Symbol: "EPS",
            },
            {
              Name: "PE",
              Symbol: "PE",
            },
            {
              Name: "Volume",
              Symbol: "Volume",
            },

            {
              Name: "Last",
              Symbol: "Price",
            },
          ]}
        /> </div>}
       


      

      {graphData && (
        <div>
          <span
            className={`tab-graph ${typeData == "week" && "tab-graph-active"}`}
            onClick={() => setTypeData("week")}
          >
            1W
          </span>
          <span
            className={`tab-graph ${typeData == "month" && "tab-graph-active"}`}
            onClick={() => setTypeData("month")}
          >
            1M
          </span>
          <span
            className={`tab-graph ${typeData == "threemonth" &&
              "tab-graph-active"}`}
            onClick={() => setTypeData("threemonth")}
          >
            3M
          </span>
          <span
            className={`tab-graph ${typeData == "sixmonth" &&
              "tab-graph-active"}`}
            onClick={() => setTypeData("sixmonth")}
          >
            6M
          </span>
          <span
            className={`tab-graph ${typeData == "year" && "tab-graph-active"}`}
            onClick={() => setTypeData("year")}
          >
            1Y
          </span>
        </div>
      )}
      {graphData && <LineChart graphData={graphData} stockProperty={propertySelected?.Name} />}
    </div>
  );
};
export default StockDetailGraph;

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const DropDown = ({ title, stockData, handlerFunction }) => {
  const [selected, setSelected] = useState(defaultStockProperty);

  return (
    <Listbox
      value={selected}
      onChange={(v) => {
        handlerFunction(v);
        setSelected(v);
      }}
    >
      {({ open }) => (
        <>
          <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">
            {title}
          </Listbox.Label>
          <div className="relative mt-2 w-1/5">
            <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
              <span className="flex items-center">
                <img
                  src=""
                  alt=""
                  className="h-5 w-5 flex-shrink-0 rounded-full"
                />
                <span className="ml-3 block truncate">{selected?.Name}</span>
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {stockData.map((stock) => (
                  <Listbox.Option
                    key={stock._id}
                    className={({ active }) =>
                      classNames(
                        active ? "bg-indigo-600 text-white" : "text-gray-900",
                        "relative cursor-default select-none py-2 pl-3 pr-9"
                      )
                    }
                    value={stock}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          <span
                            className={classNames(
                              selected ? "font-semibold" : "font-normal",
                              "ml-3 block truncate"
                            )}
                          >
                            {stock.Symbol}
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? "text-white" : "text-indigo-600",
                              "absolute inset-y-0 right-0 flex items-center pr-4"
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};
