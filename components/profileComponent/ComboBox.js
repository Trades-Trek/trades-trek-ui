import React, { useState, useEffect } from 'react';

const BankComboBox = ({ bankList, setBankCodeAndName }) => {
  const [selectedBankCode, setSelectedBankCode] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(true);
  const [filteredBankList, setFilteredBankList] = useState([]);

  useEffect(() => {
    setFilteredBankList(bankList);
  }, [bankList]);



  
  const handleBankSelection = (bank) => {
    setSelectedBankCode(bank.code);
    setIsDropdownOpen(false);
    setSearchValue(bank.name);
    setBankCodeAndName({bankName: bank.name,  bankCode: bank.code})
  };

  const handleSearch = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setSearchValue(searchValue);

    const filteredList = bankList.filter((bank) =>
      bank.name.toLowerCase().includes(searchValue)
    );
    setFilteredBankList(filteredList);
    setIsDropdownOpen(true);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="relative">
      <input
        type="text"
        className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        placeholder="Search bank by name"
        value={searchValue}
        onChange={handleSearch}
        onClick={toggleDropdown}
      />
      {isDropdownOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-sm h-44 overflow-scroll">
          {filteredBankList.map((bank) => (
            <div
              key={bank.id}
              className="py-2 px-3 cursor-pointer hover:bg-gray-100"
              onClick={() => handleBankSelection(bank)}
            >
              {bank.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BankComboBox;